import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { Maximize, Minimize } from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";
import { runPlaygroundCode } from "../services/playgroundExecutor";
import { codeNeedsStdin, resolveEngine } from "../services/BrowserExecutor";
import {
  suggestStdinSample,
} from "../lib/playgroundStdin";
import PlaygroundExplorer from "./PlaygroundExplorer";
import {
  createPlaygroundFile,
  fetchPlaygroundFiles,
  deletePlaygroundFile,
  updatePlaygroundFile,
  savePlaygroundRun,
  savePlaygroundWorkspace,
  importPlaygroundWorkspace,
  fetchPlaygroundRuns,
  deletePlaygroundRun,
  clearPlaygroundRuns,
} from "../services/playgroundApi";
import {
  buildRunFileKey,
  appendLocalRunHistory,
  clearLocalRunHistory,
  loadLocalRunHistory,
  makeLocalRunId,
  removeLocalRunHistory,
} from "../lib/playgroundRunHistory";
import {
  createFile,
  createWorkspace,
  defaultMainFileName,
  defaultStarterContent,
  getActiveFile,
  mergeLocalWorkspace,
  monacoLanguageForFile,
  nextFileNameInFolder,
  saveLocalWorkspaces,
} from "../lib/playgroundFiles";
import {
  buildFileTree,
  basename,
  dirname,
  joinPath,
  normalizePath,
} from "../lib/playgroundFileTree";
import {
  definePolycodeMonacoTheme,
  definePolycodeMonacoLightTheme,
  definePolycodePlaygroundThemes,
  getVSCodeEditorOptions,
  POLYCODE_PLAYGROUND_DARK_THEME,
  POLYCODE_PLAYGROUND_LIGHT_THEME,
} from "../../../shared/utils/monacoTheme";
import { isLightTheme } from "../../../shared/theme/themes";
import { attachMonacoPasteNormalizer } from "../../../shared/utils/normalizeBrokenCodePaste";
import useIdeTheme from "../hooks/useIdeTheme";
import PlaygroundSettingsMenu from "./PlaygroundSettingsMenu";
import { useAppSettings } from "../../../shared/settings/AppSettingsContext";
import { playSound } from "../../../shared/sound/soundEffects";
import { recordPlaygroundRunXp } from "../../learn/shared/recordLessonXp";
import PolyGuardPlaygroundTab from "../../polyguard/components/PolyGuardPlaygroundTab";
import PolyGuardAnalyzeButton from "../../polyguard/components/PolyGuardAnalyzeButton";
import "./CodePlayground.css";

const LANG_GROUPS = [
  {
    label: "Browser IDEs",
    langs: [
      "javascript",
      "typescript",
      "python",
      "html",
      "css",
      "sql",
      "json",
      "xml",
      "markdown",
      "brainfuck",
      "regex",
      "php",
    ],
  },
  {
    label: "Server IDEs",
    langs: [
      "c",
      "cpp",
      "java",
      "go",
      "rust",
      "ruby",
      "bash",
      "kotlin",
      "swift",
      "csharp",
      "r",
      "lua",
      "powershell",
      "batch",
      "dart",
      "perl",
      "scala",
    ],
  },
];

const EXPLORER_OPEN_KEY = "polycode_playground_explorer_open";

const ALL_LANGUAGES = LANG_GROUPS.flatMap((group) => group.langs);
const DEFAULT_LANGUAGE = "javascript";
const CONSOLE_RATIO_KEY = "polycode_playground_console_ratio";
const DEFAULT_CONSOLE_RATIO = 0.38;
const MIN_CONSOLE_PX = 100;
const MIN_EDITOR_PX = 160;

function loadExplorerOpen() {
  try {
    return localStorage.getItem(EXPLORER_OPEN_KEY) !== "false";
  } catch {
    return true;
  }
}

function loadConsoleRatio() {
  try {
    const stored = Number(localStorage.getItem(CONSOLE_RATIO_KEY));
    if (Number.isFinite(stored) && stored >= 0.15 && stored <= 0.8) {
      return stored;
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_CONSOLE_RATIO;
}

function clampConsoleRatio(ratio, panesHeight) {
  if (!panesHeight) return ratio;
  const minRatio = MIN_CONSOLE_PX / panesHeight;
  const maxRatio = 1 - MIN_EDITOR_PX / panesHeight;
  return Math.min(Math.max(ratio, minRatio), Math.max(minRatio, maxRatio));
}

function normalizeLanguage(lang) {
  return ALL_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
}

function logPlaygroundSyncError(action, err) {
  const message = err instanceof Error ? err.message : String(err);
  console.warn(`[Playground] ${action}:`, message);
}

function formatRunTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function runPreviewText(run) {
  const line = run?.output?.find(
    (entry) => entry.type === "stdout" || entry.type === "stderr",
  );
  const text = line?.text || run?.output?.[0]?.text || "(no output)";
  return text.length > 72 ? `${text.slice(0, 72)}…` : text;
}

function buildInitialWorkspaces(initialLanguage, initialCode) {
  const activeLanguage = normalizeLanguage(initialLanguage);
  return ALL_LANGUAGES.reduce((acc, lang) => {
    const workspace = mergeLocalWorkspace(lang);
    if (lang === activeLanguage && typeof initialCode === "string") {
      const active = getActiveFile(workspace);
      if (active) {
        workspace.files = workspace.files.map((file) =>
          file.id === active.id
            ? { ...file, content: initialCode, dirty: true }
            : file,
        );
      }
    }
    acc[lang] = workspace;
    return acc;
  }, {});
}

function mapCloudFiles(files) {
  return files.map((file) => ({
    id: file.id,
    serverId: file.id,
    name: file.name,
    content: file.content || "",
    dirty: false,
  }));
}

function applyCloudWorkspace(cloudWorkspace, mappedFiles) {
  const activeId =
    mappedFiles.find((file) => file.id === cloudWorkspace?.activeFileId)?.id ||
    mappedFiles[0]?.id;

  return {
    files: mappedFiles,
    folders: cloudWorkspace?.folders || [],
    expandedFolders: cloudWorkspace?.expandedFolders || { "": true },
    selectedFolder: cloudWorkspace?.selectedFolder || "",
    activeFileId: activeId,
    cloudLoaded: true,
  };
}

function shouldImportLocalToCloud(language, localWorkspace, cloudFiles) {
  if (!localWorkspace?.files?.length || !cloudFiles?.length) return false;
  if (cloudFiles.length > 1) return false;

  if (localWorkspace.files.length > 1) return true;
  if ((localWorkspace.folders?.length ?? 0) > 0) return true;

  const mainName = defaultMainFileName(language);
  const localMain =
    localWorkspace.files.find((file) => file.name === mainName) ||
    localWorkspace.files[0];
  const cloudMain = cloudFiles[0];
  const starter = defaultStarterContent(language);

  if (!localMain || !cloudMain) return false;
  if (localMain.content !== starter && localMain.content !== (cloudMain.content ?? "")) {
    return true;
  }

  return false;
}

export default function CodePlayground({
  initialCode,
  initialLanguage = "javascript",
}) {
  const { token } = useAuth();
  const { soundEnabled } = useAppSettings();
  const { ideTheme, setIdeTheme } = useIdeTheme();
  const editorTheme = isLightTheme(ideTheme)
    ? POLYCODE_PLAYGROUND_LIGHT_THEME
    : POLYCODE_PLAYGROUND_DARK_THEME;
  const normalizedInitialLanguage = normalizeLanguage(initialLanguage);
  const [language, setLanguage] = useState(normalizedInitialLanguage);
  const [workspaces, setWorkspaces] = useState(() =>
    buildInitialWorkspaces(normalizedInitialLanguage, initialCode),
  );
  const [runningLanguage, setRunningLanguage] = useState(null);
  const [fontSize, setFontSize] = useState(15);
  const [wordWrap, setWordWrap] = useState(false);
  const [consoleRatio, setConsoleRatio] = useState(loadConsoleRatio);
  const [isResizingPanes, setIsResizingPanes] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(loadExplorerOpen);
  const [runHistory, setRunHistory] = useState([]);
  const [runHistoryLoading, setRunHistoryLoading] = useState(false);
  const [historyScope, setHistoryScope] = useState("all");
  const rootRef = useRef(null);
  const outputRef = useRef(null);
  const panesRef = useRef(null);
  const paneDragRef = useRef(null);
  const detachPasteNormalizerRef = useRef(null);
  const consoleRatioRef = useRef(consoleRatio);
  const workspacesRef = useRef(workspaces);
  const saveTimerRef = useRef(null);
  const workspaceSaveTimerRef = useRef(null);
  const prevTokenRef = useRef(token);
  const visitedLanguagesRef = useRef(new Set([normalizedInitialLanguage]));

  const currentWorkspace = workspaces[language] || createWorkspace(language);
  const activeFile = getActiveFile(currentWorkspace);
  const code = activeFile?.content || "";
  const { files, output, previewHTML, activeTab, stdin = "" } = currentWorkspace;
  const needsStdin = useMemo(
    () => codeNeedsStdin(code, language),
    [code, language],
  );
  const stdinPlaceholder = useMemo(
    () => suggestStdinSample(code, language),
    [code, language],
  );
  const folders = useMemo(
    () => currentWorkspace.folders || [],
    [currentWorkspace.folders],
  );
  const expandedFolders = currentWorkspace.expandedFolders || { "": true };
  const selectedFolder = currentWorkspace.selectedFolder || "";
  const fileTree = useMemo(
    () => buildFileTree(files, folders),
    [files, folders],
  );
  const currentIsRunning = runningLanguage === language;

  const refreshRunHistory = useCallback(async () => {
    const workspace = workspacesRef.current[language];
    const file = getActiveFile(workspace);
    const fileKey = buildRunFileKey(file);
    const fileId = file?.serverId || null;
    const scopeFileOnly = historyScope === "file";

    setRunHistoryLoading(true);
    try {
      if (token) {
        const data = await fetchPlaygroundRuns(token, {
          language,
          fileId: scopeFileOnly && fileId ? fileId : undefined,
          limit: 40,
        });
        setRunHistory(Array.isArray(data.runs) ? data.runs : []);
        return;
      }

      setRunHistory(
        loadLocalRunHistory({
          language,
          fileKey: scopeFileOnly ? fileKey : undefined,
          limit: 40,
        }),
      );
    } catch (err) {
      logPlaygroundSyncError("Could not load run history", err);
      setRunHistory(
        loadLocalRunHistory({
          language,
          fileKey: scopeFileOnly ? fileKey : undefined,
          limit: 40,
        }),
      );
    } finally {
      setRunHistoryLoading(false);
    }
  }, [token, language, historyScope]);

  useEffect(() => {
    refreshRunHistory();
  }, [token, language, activeFile?.id, historyScope, refreshRunHistory]);

  useEffect(() => {
    workspacesRef.current = workspaces;
  }, [workspaces]);

  useEffect(() => {
    consoleRatioRef.current = consoleRatio;
  }, [consoleRatio]);

  useEffect(() => {
    if (!isResizingPanes) return undefined;
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizingPanes]);

  useEffect(() => {
    saveLocalWorkspaces(workspaces);
  }, [workspaces]);

  useEffect(() => {
    const prev = prevTokenRef.current;
    prevTokenRef.current = token;
    if (Boolean(prev) === Boolean(token)) return;

    setWorkspaces((prevWs) => {
      const next = {};
      for (const [lang, ws] of Object.entries(prevWs)) {
        next[lang] = { ...ws, cloudLoaded: false };
      }
      return next;
    });
  }, [token]);

  useEffect(() => {
    if (!token) return undefined;

    let cancelled = false;
    const workspace = workspacesRef.current[language];
    if (workspace?.cloudLoaded) return undefined;

    async function loadCloudFiles() {
      setSyncing(true);
      try {
        const localWs =
          workspacesRef.current[language] || mergeLocalWorkspace(language);
        let data = await fetchPlaygroundFiles(token, language);

        if (shouldImportLocalToCloud(language, localWs, data.files)) {
          data = await importPlaygroundWorkspace(token, {
            language,
            files: localWs.files.map((file) => ({
              id: file.id,
              name: file.name,
              content: file.content,
            })),
            workspace: {
              folders: localWs.folders || [],
              expandedFolders: localWs.expandedFolders || { "": true },
              selectedFolder: localWs.selectedFolder || "",
              activeFileId: localWs.activeFileId,
            },
          });
        }

        if (cancelled || !data.files?.length) return;

        const mapped = mapCloudFiles(data.files);
        const cloudPatch = applyCloudWorkspace(data.workspace, mapped);

        setWorkspaces((prev) => ({
          ...prev,
          [language]: {
            ...(prev[language] || createWorkspace(language)),
            ...cloudPatch,
            output: prev[language]?.output || [],
            previewHTML: prev[language]?.previewHTML ?? null,
            activeTab: prev[language]?.activeTab || "output",
          },
        }));
      } catch (err) {
        if (!cancelled) {
          logPlaygroundSyncError("Could not load files from cloud", err);
          setWorkspaces((prev) => ({
            ...prev,
            [language]: {
              ...(prev[language] || createWorkspace(language)),
              cloudLoaded: true,
            },
          }));
        }
      } finally {
        if (!cancelled) setSyncing(false);
      }
    }

    loadCloudFiles();
    return () => {
      cancelled = true;
    };
  }, [token, language]);

  const persistDirtyFiles = useCallback(async () => {
    if (!token) return;

    const workspace = workspacesRef.current[language];
    if (!workspace?.files?.length) return;

    const dirtyFiles = workspace.files.filter((file) => file.dirty);
    if (!dirtyFiles.length) return;

    setSyncing(true);

    try {
      for (const file of dirtyFiles) {
        if (file.serverId) {
          await updatePlaygroundFile(token, file.serverId, {
            name: file.name,
            content: file.content,
          });
        } else {
          const created = await createPlaygroundFile(token, {
            language,
            name: file.name,
            content: file.content,
          });
          const serverId = created.file?.id;
          if (serverId) {
            setWorkspaces((prev) => {
              const current = prev[language];
              if (!current) return prev;
              return {
                ...prev,
                [language]: {
                  ...current,
                  files: current.files.map((entry) =>
                    entry.id === file.id
                      ? {
                          ...entry,
                          id: serverId,
                          serverId,
                          dirty: false,
                        }
                      : entry,
                  ),
                  activeFileId:
                    current.activeFileId === file.id
                      ? serverId
                      : current.activeFileId,
                },
              };
            });
            continue;
          }
        }

        setWorkspaces((prev) => {
          const current = prev[language];
          if (!current) return prev;
          return {
            ...prev,
            [language]: {
              ...current,
              files: current.files.map((entry) =>
                entry.id === file.id || entry.serverId === file.serverId
                  ? { ...entry, dirty: false }
                  : entry,
              ),
            },
          };
        });
      }
    } catch (err) {
      logPlaygroundSyncError("Could not save to cloud", err);
    } finally {
      setSyncing(false);
    }
  }, [token, language]);

  const persistWorkspaceMetadata = useCallback(async () => {
    if (!token) return;

    const workspace = workspacesRef.current[language];
    if (!workspace?.cloudLoaded) return;

    try {
      await savePlaygroundWorkspace(token, {
        language,
        folders: workspace.folders || [],
        expandedFolders: workspace.expandedFolders || { "": true },
        selectedFolder: workspace.selectedFolder || "",
        activeFileId: workspace.activeFileId,
      });
    } catch (err) {
      logPlaygroundSyncError("Could not save workspace layout", err);
    }
  }, [token, language]);

  useEffect(() => {
    if (!token || !currentWorkspace.cloudLoaded) return undefined;

    if (workspaceSaveTimerRef.current) {
      window.clearTimeout(workspaceSaveTimerRef.current);
    }

    workspaceSaveTimerRef.current = window.setTimeout(() => {
      persistWorkspaceMetadata();
    }, 900);

    return () => {
      if (workspaceSaveTimerRef.current) {
        window.clearTimeout(workspaceSaveTimerRef.current);
      }
    };
  }, [
    token,
    language,
    currentWorkspace.cloudLoaded,
    currentWorkspace.folders,
    currentWorkspace.expandedFolders,
    currentWorkspace.selectedFolder,
    currentWorkspace.activeFileId,
    persistWorkspaceMetadata,
  ]);

  useEffect(() => {
    if (!token) return undefined;

    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }

    const hasDirty = currentWorkspace.files?.some((file) => file.dirty);
    if (!hasDirty) return undefined;

    saveTimerRef.current = window.setTimeout(() => {
      persistDirtyFiles();
    }, 900);

    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [token, language, currentWorkspace.files, persistDirtyFiles]);

  const saveConsoleRatio = useCallback((ratio) => {
    try {
      localStorage.setItem(CONSOLE_RATIO_KEY, String(ratio));
    } catch {
      /* ignore */
    }
  }, []);

  const updateWorkspace = useCallback((lang, nextValue) => {
    setWorkspaces((prev) => {
      const current = prev[lang] || createWorkspace(lang);
      const patch =
        typeof nextValue === "function" ? nextValue(current) : nextValue;
      return {
        ...prev,
        [lang]: {
          ...current,
          ...patch,
        },
      };
    });
  }, []);

  const updateActiveFileContent = useCallback(
    (nextContent) => {
      if (!activeFile) return;
      updateWorkspace(language, (current) => ({
        files: current.files.map((file) =>
          file.id === activeFile.id
            ? { ...file, content: nextContent, dirty: true }
            : file,
        ),
      }));
    },
    [activeFile, language, updateWorkspace],
  );

  const selectFile = useCallback(
    (fileId) => {
      const workspace = workspacesRef.current[language];
      const file = workspace?.files?.find((entry) => entry.id === fileId);
      updateWorkspace(language, {
        activeFileId: fileId,
        selectedFolder: file ? normalizePath(dirname(file.name)) : selectedFolder,
      });
    },
    [language, selectedFolder, updateWorkspace],
  );

  const applyRunHistory = useCallback(
    (run) => {
      if (!run) return;
      updateWorkspace(language, {
        output: run.output || [],
        previewHTML: run.previewHTML || null,
        activeTab: run.previewHTML ? "preview" : "output",
      });
    },
    [language, updateWorkspace],
  );

  const restoreRunCode = useCallback(
    (run) => {
      if (!run?.code) return;
      updateActiveFileContent(run.code);
      updateWorkspace(language, { activeTab: "output" });
    },
    [language, updateWorkspace, updateActiveFileContent],
  );

  const deleteRunHistoryItem = useCallback(
    async (run) => {
      if (!run?.id) return;
      const isLocal = String(run.id).startsWith("local-");

      if (token && !isLocal) {
        try {
          await deletePlaygroundRun(token, run.id);
        } catch (err) {
          logPlaygroundSyncError("Could not delete run", err);
          return;
        }
      } else {
        removeLocalRunHistory(run.id);
      }

      setRunHistory((prev) => prev.filter((entry) => entry.id !== run.id));
    },
    [token],
  );

  const clearAllRunHistory = useCallback(async () => {
    const workspace = workspacesRef.current[language];
    const file = getActiveFile(workspace);
    const fileId = file?.serverId || null;
    const fileKey = buildRunFileKey(file);
    const scopeFileOnly = historyScope === "file";

    if (
      !window.confirm(
        scopeFileOnly
          ? "Clear run history for this file?"
          : `Clear all ${resolveEngine(language).label} run history?`,
      )
    ) {
      return;
    }

    if (token) {
      try {
        await clearPlaygroundRuns(token, {
          language,
          fileId: scopeFileOnly && fileId ? fileId : undefined,
        });
      } catch (err) {
        logPlaygroundSyncError("Could not clear run history", err);
        return;
      }
    }

    clearLocalRunHistory({
      language,
      fileKey: scopeFileOnly ? fileKey : undefined,
    });
    setRunHistory([]);
  }, [token, language, historyScope]);

  const addFile = useCallback(
    async (folderPath) => {
      const workspace =
        workspacesRef.current[language] || createWorkspace(language);
      const targetFolder = normalizePath(
        folderPath ?? workspace.selectedFolder ?? "",
      );
      const defaultPath = nextFileNameInFolder(
        language,
        workspace.files,
        targetFolder,
      );
      const input = window.prompt(
        "Enter file name",
        basename(defaultPath) || defaultMainFileName(language),
      );
      if (input === null) return;

      const trimmed = input.trim();
      if (!trimmed) return;

      const name = joinPath(targetFolder, trimmed);
      const exists = workspace.files.some(
        (file) => normalizePath(file.name) === normalizePath(name),
      );
      if (exists) {
        window.alert("A file with that name already exists.");
        return;
      }

      const localFile = createFile(language, { name });

      if (token) {
        try {
          setSyncing(true);
          const created = await createPlaygroundFile(token, {
            language,
            name,
            content: localFile.content,
          });
          const serverId = created.file?.id;
          const cloudFile = createFile(language, {
            name: created.file?.name || name,
            content: created.file?.content || localFile.content,
            serverId,
          });
          updateWorkspace(language, (current) => ({
            files: [...current.files, cloudFile],
            activeFileId: cloudFile.id,
            selectedFolder: targetFolder,
            expandedFolders: {
              ...(current.expandedFolders || {}),
              [targetFolder]: true,
              ...(targetFolder ? { [dirname(targetFolder)]: true } : {}),
              "": true,
            },
          }));
        } catch (err) {
          logPlaygroundSyncError("Could not create file in cloud", err);
        } finally {
          setSyncing(false);
        }
        return;
      }

      updateWorkspace(language, (current) => ({
        files: [...current.files, localFile],
        activeFileId: localFile.id,
        selectedFolder: targetFolder,
        expandedFolders: {
          ...(current.expandedFolders || {}),
          [targetFolder]: true,
          "": true,
        },
      }));
    },
    [language, token, updateWorkspace],
  );

  const addFolder = useCallback(
    (parentPath) => {
      const workspace =
        workspacesRef.current[language] || createWorkspace(language);
      const parent = normalizePath(parentPath ?? workspace.selectedFolder ?? "");
      const label = window.prompt("New folder name", "src");
      if (!label?.trim()) return;

      const folderName = normalizePath(label.trim()).split("/").pop();
      if (!folderName) return;

      const fullPath = joinPath(parent, folderName);
      updateWorkspace(language, (current) => {
        const nextFolders = new Set(current.folders || []);
        nextFolders.add(fullPath);
        return {
          folders: [...nextFolders],
          selectedFolder: fullPath,
          expandedFolders: {
            ...(current.expandedFolders || {}),
            [parent]: true,
            [fullPath]: true,
          },
        };
      });
    },
    [language, updateWorkspace],
  );

  const toggleExplorer = useCallback(() => {
    setExplorerOpen((open) => {
      const next = !open;
      try {
        localStorage.setItem(EXPLORER_OPEN_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const toggleFolder = useCallback(
    (folderPath) => {
      const path = normalizePath(folderPath);
      updateWorkspace(language, (current) => {
        const expanded = { ...(current.expandedFolders || {}) };
        const isOpen = expanded[path] !== false;
        expanded[path] = isOpen ? false : true;
        return { expandedFolders: expanded };
      });
    },
    [language, updateWorkspace],
  );

  const selectFolder = useCallback(
    (folderPath) => {
      updateWorkspace(language, { selectedFolder: normalizePath(folderPath) });
    },
    [language, updateWorkspace],
  );

  const deleteFile = useCallback(
    async (fileId) => {
      const workspace = workspacesRef.current[language];
      const target = workspace?.files?.find((file) => file.id === fileId);
      if (!target) return;

      if (
        !window.confirm(
          `Delete "${target.name}"? This cannot be undone.`,
        )
      ) {
        return;
      }

      if (token && target.serverId) {
        try {
          setSyncing(true);
          await deletePlaygroundFile(token, target.serverId);
        } catch (err) {
          logPlaygroundSyncError("Could not delete file from cloud", err);
          setSyncing(false);
          return;
        } finally {
          setSyncing(false);
        }
      }

      updateWorkspace(language, (current) => {
        const nextFiles = current.files.filter((file) => file.id !== fileId);
        if (nextFiles.length === 0) {
          const replacement = createFile(language);
          return {
            files: [replacement],
            activeFileId: replacement.id,
          };
        }
        return {
          files: nextFiles,
          activeFileId:
            current.activeFileId === fileId
              ? nextFiles[0]?.id
              : current.activeFileId,
        };
      });
    },
    [language, token, updateWorkspace],
  );

  const handlePaneResizePointerDown = (event) => {
    if (event.button !== 0) return;
    event.preventDefault();

    const panes = panesRef.current;
    if (!panes) return;

    paneDragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startRatio: consoleRatioRef.current,
      panesHeight: panes.getBoundingClientRect().height,
    };
    setIsResizingPanes(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePaneResizePointerMove = (event) => {
    const drag = paneDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();

    const deltaRatio = (event.clientY - drag.startY) / drag.panesHeight;
    const nextRatio = clampConsoleRatio(
      drag.startRatio + deltaRatio,
      drag.panesHeight,
    );
    setConsoleRatio(nextRatio);
  };

  const finishPaneResize = (event) => {
    const drag = paneDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    paneDragRef.current = null;
    setIsResizingPanes(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
    saveConsoleRatio(consoleRatioRef.current);
  };

  const resetConsoleRatio = () => {
    setConsoleRatio(DEFAULT_CONSOLE_RATIO);
    saveConsoleRatio(DEFAULT_CONSOLE_RATIO);
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [language, output]);

  useEffect(() => {
    const nextLanguage = normalizeLanguage(initialLanguage);
    setLanguage((prev) => (prev === nextLanguage ? prev : nextLanguage));
    setWorkspaces((prev) => {
      const next = { ...prev };
      ALL_LANGUAGES.forEach((lang) => {
        if (!next[lang]) {
          next[lang] = mergeLocalWorkspace(lang);
        }
      });
      if (typeof initialCode === "string") {
        const workspace = next[nextLanguage] || createWorkspace(nextLanguage);
        const active = getActiveFile(workspace);
        if (active) {
          next[nextLanguage] = {
            ...workspace,
            files: workspace.files.map((file) =>
              file.id === active.id
                ? { ...file, content: initialCode, dirty: true }
                : file,
            ),
          };
        }
      }
      return next;
    });
  }, [initialLanguage, initialCode]);

  const handleLangChange = (lang) => {
    visitedLanguagesRef.current.add(lang);
    setLanguage(lang);
  };

  const handleRun = useCallback(async () => {
    const currentLanguage = language;
    const workspace = workspacesRef.current[currentLanguage] || createWorkspace(currentLanguage);
    const file = getActiveFile(workspace);
    const currentCode = file?.content || "";
    if (runningLanguage || !currentCode.trim()) return;

    setRunningLanguage(currentLanguage);
    playSound("run", soundEnabled);
    updateWorkspace(currentLanguage, {
      output: [
        {
          type: "system",
          text: `▶ Running ${resolveEngine(currentLanguage).label}...`,
        },
      ],
      previewHTML: null,
      activeTab: "output",
    });

    const t0 = performance.now();
    let resultOutput = [];
    let resultPreview = null;
    let activeTabAfter = "output";

    try {
      const result = await runPlaygroundCode(currentCode, currentLanguage, {
        stdin: workspacesRef.current[currentLanguage]?.stdin || "",
      });
      const ms = ((performance.now() - t0) / 1000).toFixed(2);

      if (result.previewHTML) {
        resultPreview = result.previewHTML;
        activeTabAfter = "preview";
        resultOutput = [{ type: "system", text: `✓ Rendered in ${ms}s` }];
      } else {
        const lines = [{ type: "system", text: `✓ Done in ${ms}s` }];
        if (result.stdout) lines.push({ type: "stdout", text: result.stdout });
        if (result.stderr) lines.push({ type: "stderr", text: result.stderr });
        if (result.error) lines.push({ type: "stderr", text: result.error });
        if (!result.stdout && !result.stderr && !result.error) {
          lines.push({ type: "stdout", text: "(no output)" });
        }
        resultOutput = lines;
      }

      updateWorkspace(currentLanguage, {
        output: resultOutput,
        previewHTML: resultPreview,
        activeTab: activeTabAfter,
      });
      playSound(result.error ? "error" : "success", soundEnabled);

      if (!result.error && token) {
        recordPlaygroundRunXp(token, currentLanguage, file).then((data) => {
          if (data && !data.alreadyRecorded && data.xpAwarded) {
            updateWorkspace(currentLanguage, {
              output: [
                ...resultOutput,
                {
                  type: "system",
                  text: `+${data.xpAwarded} XP — IDE run recorded`,
                },
              ],
              previewHTML: resultPreview,
              activeTab: activeTabAfter,
            });
          }
        });
      }

      const durationMs = Math.round(performance.now() - t0);

      if (token) {
        savePlaygroundRun(token, {
          language: currentLanguage,
          fileId: file?.serverId || null,
          fileName: file?.name || "",
          code: currentCode,
          output: resultOutput,
          previewHTML: resultPreview,
          durationMs,
        })
          .then(() => {
            refreshRunHistory();
          })
          .catch(() => {
            /* non-blocking */
          });
      } else {
        const localRun = appendLocalRunHistory({
          id: makeLocalRunId(),
          language: currentLanguage,
          fileKey: buildRunFileKey(file),
          fileName: file?.name || "",
          code: currentCode,
          output: resultOutput,
          previewHTML: resultPreview,
          durationMs,
          createdAt: new Date().toISOString(),
        });
        setRunHistory((prev) =>
          [localRun, ...prev.filter((r) => r.id !== localRun.id)].slice(0, 40),
        );
      }
    } catch (e) {
      resultOutput = [{ type: "stderr", text: e.message }];
      playSound("error", soundEnabled);
      updateWorkspace(currentLanguage, {
        output: resultOutput,
        previewHTML: null,
        activeTab: "output",
      });
    } finally {
      setRunningLanguage(null);
    }
  }, [language, runningLanguage, token, updateWorkspace, refreshRunHistory, soundEnabled]);

  const handleEditorKeyDown = useCallback(
    (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    },
    [handleRun],
  );

  const handleEditorMount = useCallback((editor, monaco) => {
    definePolycodeMonacoTheme(monaco);
    definePolycodeMonacoLightTheme(monaco);
    definePolycodePlaygroundThemes(monaco);
    detachPasteNormalizerRef.current?.();
    detachPasteNormalizerRef.current = attachMonacoPasteNormalizer(editor);
  }, []);

  useEffect(
    () => () => {
      detachPasteNormalizerRef.current?.();
    },
    [],
  );

  // Fullscreen: the same button enters and exits, like a video player.
  // Esc (handled by the browser) also exits; the listener keeps the icon in sync.
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenSupported =
    typeof document !== "undefined" &&
    Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled);

  useEffect(() => {
    const syncFullscreen = () => {
      const current = document.fullscreenElement || document.webkitFullscreenElement;
      setIsFullscreen(Boolean(current) && current === rootRef.current);
    };
    document.addEventListener("fullscreenchange", syncFullscreen);
    document.addEventListener("webkitfullscreenchange", syncFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
      document.removeEventListener("webkitfullscreenchange", syncFullscreen);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const root = rootRef.current;
    if (!root) return;
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        await (document.exitFullscreen || document.webkitExitFullscreen).call(document);
      } else {
        await (root.requestFullscreen || root.webkitRequestFullscreen).call(root);
      }
    } catch (error) {
      console.error("Unable to toggle fullscreen:", error?.message || error);
    }
  }, []);

  const langInfo = resolveEngine(language);
  const isServerBased = langInfo.engine === "server";
  const hasPreview = previewHTML !== null;
  const editorLanguage = monacoLanguageForFile(activeFile?.name, langInfo.mono);

  return (
    <div ref={rootRef} className="playground-root" data-ide-theme={ideTheme}>
      <div className="pg-toolbar">
        <div className="pg-toolbar-left">
          <span className="pg-logo">⬡ IDE</span>
          <select
            className="pg-lang-select"
            value={language}
            onChange={(e) => handleLangChange(e.target.value)}
          >
            {ALL_LANGUAGES.map((l) => {
              const info = resolveEngine(l);
              return (
                <option key={l} value={l}>
                  {info.icon} {info.label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="pg-toolbar-center">
          {token ? (
            <span className={`pg-sync-badge${syncing ? " pg-sync-badge--busy" : ""}`}>
              {syncing ? "Saving…" : "Files saved to your account"}
            </span>
          ) : (
            <span className="pg-sync-badge pg-sync-badge--local">
              Files saved in this browser — sign in to sync
            </span>
          )}
          {isServerBased ? (
            <span className="pg-server-badge">
              {needsStdin
                ? "Uses server compiler when available · stdin panel below"
                : "Tries server compiler · print simulation fallback"}
            </span>
          ) : (
            <span className="pg-browser-badge">✓ Browser runtime (JS / Pyodide)</span>
          )}
        </div>

        <div className="pg-toolbar-right">
          <span className="pg-font-size">{fontSize}px</span>
          <button
            type="button"
            className="pg-icon-btn"
            onClick={() => setFontSize((f) => Math.max(10, f - 1))}
            title="Decrease font size"
          >
            A-
          </button>
          <button
            type="button"
            className="pg-icon-btn"
            onClick={() => setFontSize((f) => Math.min(24, f + 1))}
            title="Increase font size"
          >
            A+
          </button>
          <button
            type="button"
            className={`pg-icon-btn ${wordWrap ? "active" : ""}`}
            onClick={() => setWordWrap((w) => !w)}
            title="Toggle word wrap"
          >
            ↵
          </button>
          <PlaygroundSettingsMenu
            ideTheme={ideTheme}
            onIdeThemeChange={setIdeTheme}
          />
          {fullscreenSupported && (
            <button
              type="button"
              className={`pg-icon-btn pg-fullscreen-btn ${isFullscreen ? "active" : ""}`}
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit full screen (Esc)" : "Full screen"}
              aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
              aria-pressed={isFullscreen}
            >
              {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            </button>
          )}
          <button
            type="button"
            className={`pg-run-btn ${currentIsRunning ? "running" : ""}`}
            onClick={handleRun}
            disabled={currentIsRunning}
            title="Run code (Ctrl+Enter)"
          >
            {currentIsRunning ? (
              <>
                <span className="pg-spinner">⟳</span> Running…
              </>
            ) : (
              "▶ Run"
            )}
          </button>
          <PolyGuardAnalyzeButton
            variant="playground"
            onClick={() =>
              updateWorkspace(language, { activeTab: "polyguard" })
            }
            disabled={!String(code || "").trim()}
            title="Open PolyGuard security analysis"
          />
        </div>
      </div>

      <div className="pg-workspace">
        <PlaygroundExplorer
          tree={fileTree}
          expandedFolders={expandedFolders}
          activeFileId={activeFile?.id}
          selectedFolder={selectedFolder}
          explorerOpen={explorerOpen}
          signedIn={Boolean(token)}
          fileCount={files.length}
          onToggleExplorer={toggleExplorer}
          onToggleFolder={toggleFolder}
          onSelectFolder={selectFolder}
          onSelectFile={selectFile}
          onNewFile={addFile}
          onNewFolder={addFolder}
          onDeleteFile={deleteFile}
        />

        <div
          ref={panesRef}
          className={`pg-panes${isResizingPanes ? " pg-panes--resizing" : ""}`}
          onKeyDown={handleEditorKeyDown}
        >
        <div
          className="pg-editor-pane"
          style={{ flex: `1 1 ${(1 - consoleRatio) * 100}%` }}
        >
          <div className="pg-file-tabs" role="tablist" aria-label="Open files">
            {files.map((file) => (
              <div
                key={file.id}
                className={`pg-file-tab${file.id === activeFile?.id ? " active" : ""}`}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={file.id === activeFile?.id}
                  className="pg-file-tab-btn"
                  onClick={() => selectFile(file.id)}
                >
                  {file.name}
                  {file.dirty ? <span className="pg-file-dirty">•</span> : null}
                </button>
                {files.length > 1 ? (
                  <button
                    type="button"
                    className="pg-file-tab-close"
                    onClick={() => deleteFile(file.id)}
                    aria-label={`Delete ${file.name}`}
                    title={`Delete ${file.name}`}
                  >
                    ×
                  </button>
                ) : null}
              </div>
            ))}
            <button
              type="button"
              className="pg-file-tab-add"
              onClick={() => addFile(selectedFolder)}
              aria-label="New file"
              title="New file"
            >
              +
            </button>
          </div>

          <div className="pg-pane-header">
            <span className="pg-pane-title">
              {langInfo.icon} {activeFile?.name || langInfo.label}
            </span>
            <span className="pg-pane-hint">
              Ctrl+Enter to run the active file.
            </span>
          </div>

          <div className="pg-editor-body">
            <Editor
              height="100%"
              language={editorLanguage}
              value={code}
              onMount={handleEditorMount}
              onChange={(v) => updateActiveFileContent(v || "")}
              theme={editorTheme}
              key={`editor-${language}-${activeFile?.id}-${editorLanguage}-${editorTheme}`}
              options={{
                ...getVSCodeEditorOptions({ fontSize, wordWrap }),
                fontSize,
              }}
            />
          </div>
        </div>

        <div
          className="pg-pane-resizer"
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize console panel"
          aria-valuemin={15}
          aria-valuemax={80}
          aria-valuenow={Math.round(consoleRatio * 100)}
          onPointerDown={handlePaneResizePointerDown}
          onPointerMove={handlePaneResizePointerMove}
          onPointerUp={finishPaneResize}
          onPointerCancel={finishPaneResize}
          onDoubleClick={resetConsoleRatio}
          title="Drag to resize console. Double-click to reset."
        />

        <div
          className="pg-output-pane"
          style={{ flex: `0 0 ${consoleRatio * 100}%` }}
        >
          <div className="pg-pane-header">
            <div className="pg-output-tabs">
              <button
                type="button"
                className={`pg-tab ${activeTab === "output" ? "active" : ""}`}
                onClick={() =>
                  updateWorkspace(language, { activeTab: "output" })
                }
              >
                ⬡ Console
              </button>
              <button
                type="button"
                className={`pg-tab ${activeTab === "history" ? "active" : ""}`}
                onClick={() =>
                  updateWorkspace(language, { activeTab: "history" })
                }
              >
                History
                {runHistory.length ? (
                  <span className="pg-tab-count">{runHistory.length}</span>
                ) : null}
              </button>
              {hasPreview && (
                <button
                  type="button"
                  className={`pg-tab ${activeTab === "preview" ? "active" : ""}`}
                  onClick={() =>
                    updateWorkspace(language, { activeTab: "preview" })
                  }
                >
                  🌐 Preview
                </button>
              )}
              <button
                type="button"
                className={`pg-tab ${activeTab === "polyguard" ? "active" : ""}`}
                onClick={() =>
                  updateWorkspace(language, { activeTab: "polyguard" })
                }
              >
                🛡️ PolyGuard
              </button>
            </div>
            <button
              type="button"
              className="pg-clear-btn"
              onClick={() => {
                if (activeTab === "history") {
                  clearAllRunHistory();
                  return;
                }
                if (activeTab === "polyguard") {
                  updateWorkspace(language, { activeTab: "output" });
                  return;
                }
                updateWorkspace(language, {
                  output: [],
                  previewHTML: null,
                  activeTab: "output",
                });
              }}
            >
              {activeTab === "history"
                ? "CLEAR ALL"
                : activeTab === "polyguard"
                  ? "BACK"
                  : "CLEAR"}
            </button>
          </div>

          <div className="pg-output-body" ref={outputRef}>
            {activeTab === "output" && needsStdin ? (
              <div className="pg-stdin-panel">
                <label className="pg-stdin-label" htmlFor="pg-stdin-input">
                  Program input (stdin)
                </label>
                <p className="pg-stdin-hint">
                  One value per line — matches each <code>input()</code> or{" "}
                  <code>cin &gt;&gt;</code> call in order.
                </p>
                <textarea
                  id="pg-stdin-input"
                  className="pg-stdin-input"
                  value={stdin}
                  onChange={(e) =>
                    updateWorkspace(language, { stdin: e.target.value })
                  }
                  placeholder={stdinPlaceholder}
                  spellCheck={false}
                  rows={4}
                />
              </div>
            ) : null}
            {activeTab === "output" && (
              <>
                {output.length === 0 ? (
                  <div className="pg-empty-state">
                    <span className="pg-empty-icon">▶</span>
                    <p>
                      Hit <strong>Run</strong> or press <kbd>Ctrl+Enter</kbd>
                    </p>
                    <p className="pg-unsupported-note">
                      Open <strong>History</strong> to revisit past runs, restore
                      code, or delete entries you do not need.
                      {token
                        ? " Runs sync to your PolyCode account."
                        : " Runs are saved in this browser until you clear them."}
                    </p>
                    {isServerBased && (
                      <p className="pg-unsupported-note">
                        {langInfo.label} runs here in local simulation mode.
                        <br />
                        Use print-style statements to view output instantly.
                      </p>
                    )}
                  </div>
                ) : (
                  output.map((line, i) => (
                    <pre key={i} className={`pg-line ${line.type}`}>
                      {line.text}
                    </pre>
                  ))
                )}
                {currentIsRunning && (
                  <div className="pg-loader">
                    <span className="pg-pulse" />
                  </div>
                )}
              </>
            )}
            {activeTab === "history" && (
              <div className="pg-run-history">
                <div className="pg-run-history-toolbar">
                  <span className="pg-run-history-label">Saved runs</span>
                  <div className="pg-run-history-filters">
                    <button
                      type="button"
                      className={`pg-history-filter${historyScope === "all" ? " active" : ""}`}
                      onClick={() => setHistoryScope("all")}
                    >
                      All {langInfo.label}
                    </button>
                    <button
                      type="button"
                      className={`pg-history-filter${historyScope === "file" ? " active" : ""}`}
                      onClick={() => setHistoryScope("file")}
                    >
                      This file
                    </button>
                  </div>
                </div>
                {runHistoryLoading ? (
                  <p className="pg-empty-state">Loading saved runs…</p>
                ) : runHistory.length === 0 ? (
                  <p className="pg-empty-state">
                    No saved runs yet. Hit <strong>Run</strong> to build your
                    console history — click a run to view output, restore code, or
                    delete entries you do not need.
                  </p>
                ) : (
                  runHistory.map((run) => (
                    <div key={run.id} className="pg-run-history-item">
                      <button
                        type="button"
                        className="pg-run-history-main"
                        onClick={() => applyRunHistory(run)}
                        title="View this run's output"
                      >
                        <span className="pg-run-history-time">
                          {formatRunTime(run.createdAt)}
                          {run.fileName ? ` · ${run.fileName}` : ""}
                        </span>
                        <span className="pg-run-history-preview">
                          {runPreviewText(run)}
                        </span>
                        {run.durationMs ? (
                          <span className="pg-run-history-meta">
                            {(run.durationMs / 1000).toFixed(2)}s
                          </span>
                        ) : null}
                      </button>
                      <div className="pg-run-history-actions">
                        {run.code ? (
                          <button
                            type="button"
                            className="pg-run-history-action"
                            onClick={() => restoreRunCode(run)}
                            title="Restore code into editor"
                          >
                            Code
                          </button>
                        ) : null}
                        <button
                          type="button"
                          className="pg-run-history-action pg-run-history-action--danger"
                          onClick={() => deleteRunHistoryItem(run)}
                          title="Delete this run"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
            {activeTab === "preview" && hasPreview && (
              <iframe
                className="pg-preview-frame"
                srcDoc={previewHTML}
                title="Preview"
                sandbox="allow-scripts"
              />
            )}
            {activeTab === "polyguard" && (
              <PolyGuardPlaygroundTab
                code={code}
                language={language}
                isActive={activeTab === "polyguard"}
              />
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
