import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import "./styles/stack-picker-dark.css";
import "./styles/responsive.css";

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
const NumpyHub = lazyWithChunkRetry(
  () => import("./features/learn/numpy-py/pages/NumpyHub"),
);
const NumpyLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/numpy-py/pages/NumpyLessonPage"),
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
const JsFundamentalsHub = lazyWithChunkRetry(
  () => import("./features/learn/js-fundamentals/pages/JsFundamentalsHub"),
);
const JsFundamentalsLessonPage = lazyWithChunkRetry(
  () =>
    import("./features/learn/js-fundamentals/pages/JsFundamentalsLessonPage"),
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
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <a
          className="app-footer-brand"
          href="https://www.quantumlogicslimited.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Quantum Logics"
        >
          <img
            src="https://www.quantumlogicslimited.com/logo.png"
            alt="Quantum Logics logo"
            className="app-footer-logo"
          />
          <span>Quantum Logics</span>
        </a>
        <span className="app-footer-divider" />
        <span className="app-footer-project">Polycode</span>
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
  onToggleTheme,
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
        onToggleTheme={onToggleTheme}
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
  onToggleTheme,
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
        onToggleTheme={onToggleTheme}
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
  onToggleTheme,
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
          onToggleTheme={onToggleTheme}
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
          onToggleTheme={onToggleTheme}
        />
      ) : (
        <Navigate to="/select-language" replace />
      )}
    </ThemedShell>
  );
}

function ThemedShell({ theme, children }) {
  return (
    <div className={`app ${theme === "light" ? "theme-light" : ""}`}>
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

/** Language picker is always dark — overrides global light theme on html/body */
function StackPickerShell({ children, savedTheme }) {
  React.useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.setAttribute("data-theme", "dark");
    body.classList.remove("light-theme");
    html.style.backgroundColor = "#03050a";
    body.style.backgroundColor = "#03050a";

    return () => {
      html.style.backgroundColor = "";
      body.style.backgroundColor = "";
      // Restore the real theme when leaving the stack picker
      html.setAttribute("data-theme", savedTheme);
      body.classList.toggle("light-theme", savedTheme === "light");
    };
  }, [savedTheme]);

  return (
    <div className="app stack-picker-dark">
      {children}
      <AppFooter />
    </div>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    () => localStorage.getItem("selectedLanguage") || null,
  );
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem("theme") || "dark",
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

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  React.useEffect(() => {
    const path = location.pathname;
    if (
      path.startsWith("/learn/numpy-py") ||
      path.startsWith("/learn/pandas-py") ||
      path.startsWith("/learn/matplotlib-py")
    ) {
      handleLanguageSelect("Python", { stay: true });
    } else if (path.startsWith("/learn/js-fundamentals")) {
      handleLanguageSelect("JavaScript", { stay: true });
    } else if (path.startsWith("/learn/c-sharp-fundamentals")) {
      handleLanguageSelect("C#", { stay: true });
    } else if (
      path.startsWith("/learn/oops-cpp") ||
      path.startsWith("/learn/pointers-cpp")
    ) {
      handleLanguageSelect("C++", { stay: true });
    }
  }, [location.pathname, handleLanguageSelect]);

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    // LandingShell and StackPickerShell manage document theme while mounted.
    if (location.pathname === "/" || location.pathname === "/select-language") {
      return;
    }
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("light-theme", theme === "light");
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
              footer={<AppFooter />}
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
            <StackPickerShell savedTheme={theme}>
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PointersLessonPage />
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <PandasLessonPage />
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <JsFundamentalsLessonPage />
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
                onToggleTheme={toggleTheme}
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
                onToggleTheme={toggleTheme}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <CsharpLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route path="/profile" element={<ProfileRedirect />} />
        <Route
          path="/*"
          element={
            <ProfileOrMainFallback
              theme={theme}
              onToggleTheme={toggleTheme}
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
