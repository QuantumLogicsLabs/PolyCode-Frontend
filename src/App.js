import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import VerifyCertificatePage from "./features/learn/shared/VerifyCertificatePage";

import Navbar from "./features/navigation/components/Navbar";
import Sidebar from "./features/navigation/components/Sidebar";
import { PlaygroundProvider } from "./features/playground/context/PlaygroundContext";
import { AuthProvider, useAuth } from "./features/auth/context/AuthContext";
import SelectionPins from "./shared/components/SelectionPins";
import { LearnNavProvider } from "./features/learn/shared/LearnNavContext";
import GlobalAssistant from "./features/assistant/components/GlobalAssistant";
import { AssistantProvider } from "./features/assistant/context/AssistantContext";
import "./App.css";
import "./styles/theme-light.css";
import "./styles/theme-palettes.css";
import "./styles/theme-assistant.css";
import "./styles/theme-learn-surfaces.css";
import {
  applyDocumentTheme,
  clearDocumentThemeInlineStyles,
  getAppThemeClass,
  isLightTheme,
  normalizeThemeId,
} from "./shared/theme/themes";
import "./styles/stack-picker-dark.css";
import "./styles/responsive.css";
import "./styles/theme-dark.css";
import "./styles/theme-profile.css";
import "./styles/theme-light-complete.css";

import LandingShell from "./features/landing/LandingShell";

function lazyWithChunkRetry(importer) {
  return lazy(() =>
    importer()
      .then((module) => {
        sessionStorage.removeItem("polycode_chunk_reload");
        return module;
      })
      .catch((error) => {
        const message = error?.message || "";
        const isChunkError =
          error?.name === "ChunkLoadError" ||
          /Loading chunk .* failed|Failed to fetch dynamically imported module/i.test(
            message,
          );

        if (
          isChunkError &&
          typeof window !== "undefined" &&
          sessionStorage.getItem("polycode_chunk_reload") !== "1"
        ) {
          sessionStorage.setItem("polycode_chunk_reload", "1");
          window.location.reload();
          return new Promise(() => {});
        }

        throw error;
      }),
  );
}

const LandingPage = lazyWithChunkRetry(
  () => import("./features/landing/pages/LandingPage"),
);
const LanguageLandingPage = lazyWithChunkRetry(
  () => import("./features/language/pages/LanguageLandingPage"),
);
const HomePage = lazyWithChunkRetry(
  () => import("./features/docs/pages/Home/HomePage"),
);
const DocumentPage = lazyWithChunkRetry(
  () => import("./features/docs/pages/DocumentPage"),
);
const CategoryPage = lazyWithChunkRetry(
  () => import("./features/docs/pages/CategoryPage"),
);
const SearchPage = lazyWithChunkRetry(
  () => import("./features/docs/pages/SearchPage"),
);
const PlaygroundPage = lazyWithChunkRetry(
  () => import("./features/playground/pages/PlaygroundPage"),
);
const LoginPage = lazyWithChunkRetry(
  () => import("./features/auth/pages/LoginPage"),
);
const SignupPage = lazyWithChunkRetry(
  () => import("./features/auth/pages/SignupPage"),
);
const DailyChallenge = lazyWithChunkRetry(
  () => import("./pages/DailyChallenges"),
);
const ProfilePage = lazyWithChunkRetry(
  () => import("./features/profile/ProfilePage"),
);


const AllCoursesPage = lazyWithChunkRetry(
  () => import("./features/courses/pages/AllCoursesPage"),
);

// Learn — newly wired courses (were missing routes)
const CDataStructuresHub = lazyWithChunkRetry(
  () => import("./features/learn/c-data-structures/pages/CDataStructuresHub"),
);
const CDataStructuresLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/c-data-structures/pages/CDataStructuresLessonPage"),
);
const CFileHandlingHub = lazyWithChunkRetry(
  () => import("./features/learn/c-file-handling/pages/CFileHandlingHub"),
);
const CFileHandlingLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/c-file-handling/pages/CFileHandlingLessonPage"),
);
const CFunctionsHub = lazyWithChunkRetry(
  () => import("./features/learn/c-functions/pages/CFunctionsHub"),
);
const CFunctionsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/c-functions/pages/CFunctionsLessonPage"),
);
const CFundamentalsHub = lazyWithChunkRetry(
  () => import("./features/learn/c-fundamentals/pages/CFundamentalsHub"),
);
const CFundamentalsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/c-fundamentals/pages/CFundamentalsLessonPage"),
);
const CMemoryManagementHub = lazyWithChunkRetry(
  () => import("./features/learn/c-memory-management/pages/CMemoryManagementHub"),
);
const CMemoryManagementLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/c-memory-management/pages/CMemoryManagementLessonPage"),
);
const CPointersHub = lazyWithChunkRetry(
  () => import("./features/learn/c-pointers/pages/CPointersHub"),
);
const CPointersLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/c-pointers/pages/CPointersLessonPage"),
);
const CProjectsHub = lazyWithChunkRetry(
  () => import("./features/learn/c-projects/pages/CProjectsHub"),
);
const CProjectsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/c-projects/pages/CProjectsLessonPage"),
);
const CppFundamentalsHub = lazyWithChunkRetry(
  () => import("./features/learn/cpp-fundamentals/pages/CppFundamentalsHub"),
);
const CppFundamentalsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/cpp-fundamentals/pages/CppFundamentalsLessonPage"),
);
const GoFundamentalsHub = lazyWithChunkRetry(
  () => import("./features/learn/golang-fundamentals/pages/GoFundamentalsHub"),
);
const GoFundamentalsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/golang-fundamentals/pages/GoFundamentalsLessonPage"),
);
const HtmlCssFoundationHub = lazyWithChunkRetry(
  () => import("./features/learn/html-css-foundation/pages/HtmlCssFoundationHub"),
);
const HtmlCssFoundationLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/html-css-foundation/pages/HtmlCssFoundationLessonPage"),
);
const JsDomHub = lazyWithChunkRetry(
  () => import("./features/learn/js-dom/pages/JsDomHub"),
);
const JsDomLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/js-dom/pages/JsDomLessonPage"),
);
const JsWebDevHub = lazyWithChunkRetry(
  () => import("./features/learn/js-web-dev/pages/JsWebDevHub"),
);
const JsWebDevLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/js-web-dev/pages/JsWebDevLessonPage"),
);
const NodeNpmHub = lazyWithChunkRetry(
  () => import("./features/learn/node-npm/pages/NodeNpmHub"),
);
const NodeNpmLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/node-npm/pages/NodeNpmLessonPage"),
);
const PythonFileHandlingHub = lazyWithChunkRetry(
  () => import("./features/learn/python-file-handling-py/pages/PythonFileHandlingHub"),
);
const PythonFileHandlingLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/python-file-handling-py/pages/PythonFileHandlingLessonPage"),
);
const PythonOopHub = lazyWithChunkRetry(
  () => import("./features/learn/python-oop-py/pages/PythonOopHub"),
);
const PythonOopLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/python-oop-py/pages/PythonOopLessonPage"),
);
const RubyFundamentalsHub = lazyWithChunkRetry(
  () => import("./features/learn/ruby-fundamentals/pages/RubyFundamentalsHub"),
);
const RubyFundamentalsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/ruby-fundamentals/pages/RubyFundamentalsLessonPage"),
);
const RubyGemsHub = lazyWithChunkRetry(
  () => import("./features/learn/ruby-gems/pages/RubyGemsHub"),
);
const RubyGemsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/ruby-gems/pages/RubyGemsLessonPage"),
);

// Learn — OOP C++ pages
const OopsHub = lazyWithChunkRetry(
  () => import("./features/learn/oops-cpp/pages/OopsHub"),
);
const LessonPage = lazyWithChunkRetry(
  () => import("./features/learn/oops-cpp/pages/LessonPage"),
);
const PointersHub = lazyWithChunkRetry(
  () => import("./features/learn/pointers-cpp/pages/PointersHub"),
);
const PointersLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/pointers-cpp/pages/PointersLessonPage"),
);
const DsaHub = lazyWithChunkRetry(
  () => import("./features/learn/dsa-cpp/pages/DsaHub"),
);
const DsaLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/dsa-cpp/pages/DsaLessonPage"),
);
const NumpyHub = lazyWithChunkRetry(
  () => import("./features/learn/numpy-py/pages/NumpyHub"),
);
const NumpyLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/numpy-py/pages/NumpyLessonPage"),
);
const PythonFundamentalsHub = lazyWithChunkRetry(
  () =>
    import("./features/learn/python-fundamentals/pages/PythonFundamentalsHub"),
);
const PythonFundamentalsLessonPage = lazyWithChunkRetry(
  () =>
    import(
      "./features/learn/python-fundamentals/pages/PythonFundamentalsLessonPage"
    ),
);
const MatplotlibHub = lazyWithChunkRetry(
  () => import("./features/learn/matplotlib-py/pages/MatplotlibHub"),
);
const MatplotlibLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/matplotlib-py/pages/MatplotlibLessonPage"),
);
const PandasHub = lazyWithChunkRetry(
  () => import("./features/learn/pandas-py/pages/PandasHub"),
);
const PandasLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/pandas-py/pages/PandasLessonPage"),
);
const FastapiHub = lazyWithChunkRetry(
  () => import("./features/learn/fastapi-py/pages/FastapiHub"),
);
const FastapiLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/fastapi-py/pages/FastapiLessonPage"),
);
const AiHub = lazyWithChunkRetry(
  () => import("./features/learn/ai_ml-py/pages/aiHub"),
);
const AiLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/ai_ml-py/pages/aiLessonPage"),
);
const PyTorchHub = lazyWithChunkRetry(
  () => import("./features/learn/pytorch-py/pages/PyTorchHub"),
);
const PyTorchLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/pytorch-py/pages/PyTorchLessonPage"),
);
const JsFundamentalsHub = lazyWithChunkRetry(
  () => import("./features/learn/js-fundamentals/pages/JsFundamentalsHub"),
);
const JsFundamentalsLessonPage = lazyWithChunkRetry(
  () =>
    import("./features/learn/js-fundamentals/pages/JsFundamentalsLessonPage"),
);
const JavaIntermediateHub = lazyWithChunkRetry(
  () => import('./features/learn/java-intermediate/pages/JavaIntermediateHub'),
);
const JavaIntermediateLessonPage = lazyWithChunkRetry(
  () =>
    import(
      './features/learn/java-intermediate/pages/JavaIntermediateLessonPage'
    ),
);
const JavaExceptionHub = lazyWithChunkRetry(
  () => import('./features/learn/java-exception/pages/JavaExceptionHub'),
);
const JavaExceptionLessonPage = lazyWithChunkRetry(
  () =>
    import(
      './features/learn/java-exception/pages/JavaExceptionLessonPage'
    ),
);
const JavaMultithreadingHub = lazyWithChunkRetry(
  () => import('./features/learn/java-multithreading/pages/JavaMultithreadingHub'),
);
const JavaMultithreadingLessonPage = lazyWithChunkRetry(
  () =>
    import(
      './features/learn/java-multithreading/pages/JavaMultithreadingLessonPage'
    ),
);
const JavaJdbcHub = lazyWithChunkRetry(
  () => import('./features/learn/java-jdbc/pages/JavaJdbcHub'),
);
const JavaJdbcLessonPage = lazyWithChunkRetry(
  () => import('./features/learn/java-jdbc/pages/JavaJdbcLessonPage'),
);
const JavaSpringBootHub = lazyWithChunkRetry(
  () => import('./features/learn/java-spring-boot/pages/JavaSpringBootHub'),
);
const JavaSpringBootLessonPage = lazyWithChunkRetry(
  () =>
    import(
      './features/learn/java-spring-boot/pages/JavaSpringBootLessonPage'
    ),
);
const JavaProjectsHub = lazyWithChunkRetry(
  () => import('./features/learn/java-projects/pages/JavaProjectsHub'),
);
const JavaProjectsLessonPage = lazyWithChunkRetry(
  () =>
    import('./features/learn/java-projects/pages/JavaProjectsLessonPage'),
);
const PhpFundamentalsHub = lazyWithChunkRetry(
  () => import('./features/learn/php-fundamentals/pages/phpFundamentalsHub'),
);
const PhpFundamentalsLessonPage = lazyWithChunkRetry(
  () =>
    import(
      './features/learn/php-fundamentals/pages/phpFundamentalsLessonPage'
    ),
);
const PhpFormsHub = lazyWithChunkRetry(
  () => import('./features/learn/php-forms/pages/phpFormsHub'),
);
const PhpFormsLessonPage = lazyWithChunkRetry(
  () => import('./features/learn/php-forms/pages/phpFormsLessonPage'),
);
const PhpSessionsHub = lazyWithChunkRetry(
  () => import('./features/learn/php-sessions/pages/phpSessionsHub'),
);
const PhpSessionsLessonPage = lazyWithChunkRetry(
  () => import('./features/learn/php-sessions/pages/phpSessionsLessonPage'),
);
const PhpMysqlHub = lazyWithChunkRetry(
  () => import('./features/learn/php-mysql/pages/phpMysqlHub'),
);
const PhpMysqlLessonPage = lazyWithChunkRetry(
  () => import('./features/learn/php-mysql/pages/phpMysqlLessonPage'),
);
const PhpOopHub = lazyWithChunkRetry(
  () => import('./features/learn/php-oop/pages/phpOopHub'),
);
const PhpOopLessonPage = lazyWithChunkRetry(
  () => import('./features/learn/php-oop/pages/phpOopLessonPage'),
);
const JavaFundamentalsHub = lazyWithChunkRetry(
  () => import("./features/learn/java-fundamentals/pages/JavaFundamentalsHub"),
);
const JavaFundamentalsLessonPage = lazyWithChunkRetry(
  () =>
    import(
      "./features/learn/java-fundamentals/pages/JavaFundamentalsLessonPage"
    ),
);
const CsharpHub = lazyWithChunkRetry(
  () => import("./features/learn/csharp-fundamentals/pages/CsharpHub"),
);
const CsharpLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/csharp-fundamentals/pages/CsharpLessonPage"),
);

const PageFallback = () => (
  <div className="loading">
    <div className="spinner-container">
      <div className="spinner" />
    </div>
  </div>
);

function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <div className="app-footer-meta">
          <Link to="/" className="app-footer-home" aria-label="PolyCode home">
            <img
              src="/images/polycode-logo.png"
              alt=""
              className="app-footer-polycode-logo"
              width={28}
              height={28}
              decoding="async"
            />
          </Link>
          <span className="app-footer-copy">© {year}</span>
          <span className="app-footer-project">PolyCode</span>
        </div>
        <a
          className="app-footer-brand"
          href="https://www.quantumlogicslimited.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Quantum Logics"
        >
          <img
            src="/images/logo.png"
            alt=""
            className="app-footer-logo"
            aria-hidden
          />
          <span>Powered by Quantum Logics</span>
        </a>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname, search } = useLocation();

  React.useLayoutEffect(() => {
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document
      .querySelectorAll(".main-content, .learn-content")
      .forEach((node) => {
        node.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });

    return () => {
      html.style.scrollBehavior = previousScrollBehavior;
    };
  }, [pathname, search]);

  return null;
}

function MainApp({
  selectedLanguage,
  onLanguageSelect,
  onGoToStackPicker,
  theme,
  onThemeChange,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const toggleSidebar = () => setIsSidebarOpen((o) => !o);
  const closeSidebar = () => setIsSidebarOpen(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const lock = isSidebarOpen && mq.matches;
    document.body.classList.toggle("sidebar-open", lock);
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.classList.remove("sidebar-open");
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      <Navbar
        toggleSidebar={toggleSidebar}
        theme={theme}
        onThemeChange={onThemeChange}
        onGoToStackPicker={onGoToStackPicker}
        selectedLanguage={selectedLanguage}
      />
      <div className="layout">
        {isSidebarOpen && <div className="backdrop" onClick={closeSidebar} />}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
          selectedLanguage={selectedLanguage}
          onLanguageSelect={onLanguageSelect}
          onGoToStackPicker={onGoToStackPicker}
        />
        <main className="main-content">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route
                path="/hub"
                element={<HomePage selectedLanguage={selectedLanguage} />}
              />
              <Route
                path="/doc/*"
                element={
                  <DocumentPage
                    selectedLanguage={selectedLanguage}
                    theme={theme}
                  />
                }
              />
              <Route
                path="/category/*"
                element={<CategoryPage selectedLanguage={selectedLanguage} />}
              />
              <Route
                path="/search"
                element={<SearchPage selectedLanguage={selectedLanguage} />}
              />
              <Route
                path="/playground"
                element={
                  <PlaygroundPage
                    theme={theme}
                    onToggleSidebar={toggleSidebar}
                    sidebarOpen={isSidebarOpen}
                  />
                }
              />

              <Route
                path="/daily-challenge"
                element={<DailyChallenge theme={theme} />}
              />
              <Route path="*" element={<Navigate to="/hub" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </>
  );
}

function LearnShell({
  theme,
  onThemeChange,
  onGoToStackPicker,
  selectedLanguage,
  children,
}) {
  const location = useLocation();
  const [learnMenuOpen, setLearnMenuOpen] = React.useState(false);
  const isLessonRoute = /\/lesson\//.test(location.pathname);
  const toggleLearnMenu = () => setLearnMenuOpen((open) => !open);
  const closeLearnMenu = () => setLearnMenuOpen(false);

  React.useEffect(() => {
    if (!location.pathname.startsWith("/learn/")) return;

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.querySelector(".main-content.learn-content")?.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  }, [location.pathname]);

  React.useEffect(() => {
    closeLearnMenu();
  }, [location.pathname]);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const lock = learnMenuOpen && mq.matches && isLessonRoute;
    document.body.classList.toggle("learn-sidebar-open", lock);
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.classList.remove("learn-sidebar-open");
      document.body.style.overflow = "";
    };
  }, [learnMenuOpen, isLessonRoute]);

  return (
    <LearnNavProvider menuOpen={learnMenuOpen} closeMenu={closeLearnMenu}>
      <Navbar
        toggleSidebar={isLessonRoute ? toggleLearnMenu : undefined}
        showMobileMenu={isLessonRoute}
        mobileMenuOpen={learnMenuOpen}
        theme={theme}
        onThemeChange={onThemeChange}
        onGoToStackPicker={onGoToStackPicker}
        selectedLanguage={selectedLanguage}
      />
      {learnMenuOpen && isLessonRoute && (
        <div
          className="backdrop learn-backdrop"
          onClick={closeLearnMenu}
          aria-hidden="true"
        />
      )}
      <main className="main-content learn-content">{children}</main>
    </LearnNavProvider>
  );
}

function ProfileOrMainFallback({
  theme,
  onThemeChange,
  onGoToStackPicker,
  selectedLanguage,
  onLanguageSelect,
}) {
  const location = useLocation();

  if (/^\/@[^/]+(?:\/certificates\/[^/]+)?$/.test(location.pathname)) {
    return (
      <ThemedShell theme={theme}>
        <LearnShell
          theme={theme}
          onThemeChange={onThemeChange}
          onGoToStackPicker={onGoToStackPicker}
          selectedLanguage={selectedLanguage}
        >
          <ProfilePage />
        </LearnShell>
      </ThemedShell>
    );
  }

  return (
    <ThemedShell theme={theme}>
      {selectedLanguage ? (
        <MainApp
          selectedLanguage={selectedLanguage}
          onLanguageSelect={onLanguageSelect}
          onGoToStackPicker={onGoToStackPicker}
          theme={theme}
          onThemeChange={onThemeChange}
        />
      ) : (
        <Navigate to="/select-language" replace />
      )}
    </ThemedShell>
  );
}

function ThemedShell({ theme, children }) {
  const themeClass = getAppThemeClass(theme);
  return (
    <div className={`app${themeClass ? ` ${themeClass}` : ""}`}>
      {children}
      <AppFooter />
    </div>
  );
}

function ProfileRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageFallback />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user?.username) {
    return <Navigate to={`/@${user.username}`} replace />;
  }

  return <Navigate to="/hub" replace />;
}

/** Language picker respects global theme (dark styling only when theme is dark). */
function StackPickerShell({ children, savedTheme, onThemeChange }) {
  React.useLayoutEffect(() => {
    applyDocumentTheme(savedTheme);
    return () => clearDocumentThemeInlineStyles();
  }, [savedTheme]);

  const shellClass = [
    "app",
    isLightTheme(savedTheme) ? "theme-light" : "stack-picker-dark",
    getAppThemeClass(savedTheme),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={shellClass}>
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            theme: savedTheme,
            onThemeChange,
          })
        : children}
    </div>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    () => localStorage.getItem("selectedLanguage") || null,
  );
  const [theme, setTheme] = React.useState(() =>
    normalizeThemeId(localStorage.getItem("theme")),
  );

  const handleLanguageSelect = React.useCallback(
    (language, options = {}) => {
      setSelectedLanguage(language);
      localStorage.setItem("selectedLanguage", language);
      if (!options.stay) {
        navigate(`/language/${encodeURIComponent(language)}`, {
          replace: true,
        });
      }
    },
    [navigate],
  );

  const goToStackPicker = React.useCallback(() => {
    navigate("/select-language");
  }, [navigate]);

  const handleThemeChange = React.useCallback((nextTheme) => {
    setTheme(normalizeThemeId(nextTheme));
  }, []);

  React.useEffect(() => {
    const path = location.pathname;
    if (
      path.startsWith("/learn/python-fundamentals") ||
      path.startsWith("/learn/numpy-py") ||
      path.startsWith("/learn/pandas-py") ||
      path.startsWith("/learn/matplotlib-py") ||
      path.startsWith("/learn/fastapi-py") ||
      path.startsWith("/learn/matplotlib-py") ||
      path.startsWith("/learn/ai_ml-py") ||
      path.startsWith("/learn/pytorch-py")
    ) {
      handleLanguageSelect("Python", { stay: true });
    } else if (path.startsWith("/learn/js-fundamentals")) {
      handleLanguageSelect("JavaScript", { stay: true });
    } else if (path.startsWith("/learn/c-sharp-fundamentals")) {
      handleLanguageSelect("C#", { stay: true });
    } else if (
      path.startsWith("/learn/java-fundamentals") ||
      path.startsWith("/learn/java-intermediate") ||
      path.startsWith("/learn/java-exception") ||
      path.startsWith("/learn/java-multithreading") ||
      path.startsWith("/learn/java-jdbc") ||
      path.startsWith("/learn/java-spring-boot") ||
      path.startsWith("/learn/java-projects")
    ) {
      handleLanguageSelect("Java", { stay: true });
    } else if (
      path.startsWith("/learn/php-fundamentals") ||
      path.startsWith("/learn/php-forms") ||
      path.startsWith("/learn/php-sessions") ||
      path.startsWith("/learn/php-mysql") ||
      path.startsWith("/learn/php-oop")
    ) {
      handleLanguageSelect("PHP", { stay: true });
    } else if (
      path.startsWith("/learn/oops-cpp") ||
      path.startsWith("/learn/pointers-cpp") ||
      path.startsWith("/learn/cpp-fundamentals")
    ) {
      handleLanguageSelect("C++", { stay: true });
    } else if (
      path.startsWith("/learn/c-fundamentals") ||
      path.startsWith("/learn/c-functions") ||
      path.startsWith("/learn/c-pointers") ||
      path.startsWith("/learn/c-data-structures") ||
      path.startsWith("/learn/c-file-handling") ||
      path.startsWith("/learn/c-memory-management") ||
      path.startsWith("/learn/c-projects")
    ) {
      handleLanguageSelect("C", { stay: true });
    } else if (path.startsWith("/learn/golang-fundamentals")) {
      handleLanguageSelect("Go", { stay: true });
    } else if (path.startsWith("/learn/html-css-foundation")) {
      handleLanguageSelect("HTML & CSS", { stay: true });
    } else if (
      path.startsWith("/learn/js-dom") ||
      path.startsWith("/learn/js-web-dev") ||
      path.startsWith("/learn/node-npm")
    ) {
      handleLanguageSelect("JavaScript", { stay: true });
    } else if (
      path.startsWith("/learn/python-oop-py") ||
      path.startsWith("/learn/python-file-handling-py")
    ) {
      handleLanguageSelect("Python", { stay: true });
    } else if (
      path.startsWith("/learn/ruby-fundamentals") ||
      path.startsWith("/learn/ruby-gems")
    ) {
      handleLanguageSelect("Ruby", { stay: true });
    }
  }, [location.pathname, handleLanguageSelect]);

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    // LandingShell and StackPickerShell manage document theme while mounted.
    if (location.pathname === "/" || location.pathname === "/select-language") {
      return;
    }
    applyDocumentTheme(theme);
  }, [theme, location.pathname]);

  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route
          path="/login"
          element={
            <ThemedShell theme={theme}>
              <LoginPage />
            </ThemedShell>
          }
        />
        <Route
          path="/"
          element={
            <LandingShell
              savedTheme={theme}
              onThemeChange={setTheme}
              onLanguageSelect={handleLanguageSelect}
              continueLanguage={selectedLanguage}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <ThemedShell theme={theme}>
              <SignupPage />
            </ThemedShell>
          }
        />
        <Route
          path="/verify-certificate"
          element={
            <ThemedShell theme={theme}>
              <VerifyCertificatePage />
            </ThemedShell>
          }
        />
        <Route
          path="/select-language"
          element={
            <StackPickerShell savedTheme={theme} onThemeChange={handleThemeChange}>
              <LandingPage
                onLanguageSelect={handleLanguageSelect}
                continueLanguage={selectedLanguage}
              />
            </StackPickerShell>
          }
        />
        <Route
          path="/language/:language"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <LanguageLandingPage
                  selectedLanguage={selectedLanguage}
                  onLanguageSelect={handleLanguageSelect}
                />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/oops-cpp"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <OopsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/oops-cpp/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <LessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/oops-cpp/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <LessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/pointers-cpp"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PointersHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/pointers-cpp/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PointersLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/pointers-cpp/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PointersLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/dsa-cpp"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <DsaHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/dsa-cpp/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <DsaLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/dsa-cpp/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <DsaLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/python-fundamentals"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PythonFundamentalsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/python-fundamentals/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PythonFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/numpy-py"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <NumpyHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/numpy-py/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <NumpyLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/numpy-py/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <NumpyLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/pandas-py"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PandasHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/pandas-py/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PandasLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/pandas-py/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PandasLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        {/* FastAPI Python Course Routes */}
        <Route
          path="/learn/fastapi-py"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <FastapiHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/fastapi-py/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <FastapiLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/fastapi-py/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <FastapiLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        {/* AI/ML Python Course Routes */}
        <Route
          path="/learn/ai_ml-py"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <AiHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/ai_ml-py/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <AiLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/ai_ml-py/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <AiLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        {/* PyTorch Course Routes */}
        <Route
          path="/learn/pytorch-py"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PyTorchHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/pytorch-py/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PyTorchLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        {/* ✅ CORRECT: Route is the direct child, ThemedShell is inside the element prop */}
        <Route
          path="/learn/matplotlib-py"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <MatplotlibHub />
              </LearnShell>
            </ThemedShell>
          }
        />

        <Route
          path="/learn/matplotlib-py/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <MatplotlibLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/js-fundamentals"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JsFundamentalsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/js-fundamentals/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JsFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/js-fundamentals/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JsFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── Java Intermediate ── */}
        <Route
          path="/learn/java-intermediate"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JavaIntermediateHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-intermediate/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JavaIntermediateLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-intermediate/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JavaIntermediateLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── Java Exception Handling ── */}
        <Route
          path="/learn/java-exception"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaExceptionHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-exception/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaExceptionLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-exception/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaExceptionLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── Java Multithreading ── */}
        <Route
          path="/learn/java-multithreading"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaMultithreadingHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-multithreading/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaMultithreadingLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-multithreading/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaMultithreadingLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── Java JDBC ── */}
        <Route
          path="/learn/java-jdbc"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaJdbcHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-jdbc/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaJdbcLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-jdbc/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaJdbcLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── Java Spring Boot ── */}
        <Route
          path="/learn/java-spring-boot"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaSpringBootHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-spring-boot/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaSpringBootLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-spring-boot/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaSpringBootLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── Java Projects ── */}
        <Route
          path="/learn/java-projects"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaProjectsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-projects/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaProjectsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-projects/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <JavaProjectsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── PHP Fundamentals ── */}
        <Route
          path="/learn/php-fundamentals"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpFundamentalsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/php-fundamentals/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/php-fundamentals/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }A
        />

        {/* ── PHP Forms ── */}
        <Route
          path="/learn/php-forms"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpFormsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/php-forms/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpFormsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/php-forms/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpFormsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── PHP Sessions & Cookies ── */}
        <Route
          path="/learn/php-sessions"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpSessionsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/php-sessions/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpSessionsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/php-sessions/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpSessionsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── PHP MySQL ── */}
        <Route
          path="/learn/php-mysql"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpMysqlHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/php-mysql/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpMysqlLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/php-mysql/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpMysqlLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── PHP OOP ── */}
        <Route
          path="/learn/php-oop"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpOopHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/php-oop/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpOopLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/php-oop/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell theme={theme} onThemeChange={handleThemeChange} onGoToStackPicker={goToStackPicker} selectedLanguage={selectedLanguage}>
                <PhpOopLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        {/* ── Java Fundamentals ── */}
        <Route
          path="/learn/java-fundamentals"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JavaFundamentalsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-fundamentals/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JavaFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/java-fundamentals/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JavaFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />

        <Route
          path="/learn/c-sharp-fundamentals"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CsharpHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-sharp-fundamentals/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CsharpLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-data-structures"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CDataStructuresHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-data-structures/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CDataStructuresLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-file-handling"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CFileHandlingHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-file-handling/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CFileHandlingLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-functions"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CFunctionsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-functions/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CFunctionsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-fundamentals"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CFundamentalsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-fundamentals/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-memory-management"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CMemoryManagementHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-memory-management/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CMemoryManagementLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-pointers"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CPointersHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-pointers/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CPointersLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-projects"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CProjectsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/c-projects/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CProjectsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/cpp-fundamentals"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CppFundamentalsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/cpp-fundamentals/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CppFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/golang-fundamentals"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <GoFundamentalsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/golang-fundamentals/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <GoFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/html-css-foundation"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <HtmlCssFoundationHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/html-css-foundation/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <HtmlCssFoundationLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/js-dom"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JsDomHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/js-dom/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JsDomLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/js-web-dev"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JsWebDevHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/js-web-dev/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JsWebDevLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/node-npm"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <NodeNpmHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/node-npm/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <NodeNpmLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/python-file-handling-py"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PythonFileHandlingHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/python-file-handling-py/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PythonFileHandlingLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/python-oop-py"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PythonOopHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/python-oop-py/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PythonOopLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/ruby-fundamentals"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RubyFundamentalsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/ruby-fundamentals/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RubyFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/ruby-gems"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RubyGemsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/ruby-gems/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RubyGemsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/courses"
          element={
            <ThemedShell theme={theme}>
              <AllCoursesPage />
            </ThemedShell>
          }
        />
        <Route path="/profile" element={<ProfileRedirect />} />
        <Route
          path="/*"
          element={
            <ProfileOrMainFallback
              theme={theme}
              onThemeChange={handleThemeChange}
              onGoToStackPicker={goToStackPicker}
              selectedLanguage={selectedLanguage}
              onLanguageSelect={handleLanguageSelect}
            />
          }
        />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <PlaygroundProvider>
        <Router>
          <AssistantProvider>
            <SelectionPins />
            <ScrollToTop />
            <AppRoutes />
            <GlobalAssistant />
          </AssistantProvider>
        </Router>
      </PlaygroundProvider>
    </AuthProvider>
  );
}

export default App;