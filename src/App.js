import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./features/navigation/components/Navbar";
import Sidebar from "./features/navigation/components/Sidebar";
import LanguageSelectPage from "./features/language/pages/LanguageSelectPage";
import HomePage from "./features/docs/pages/Home/HomePage";
import DocumentPage from "./features/docs/pages/DocumentPage";
import CategoryPage from "./features/docs/pages/CategoryPage";
import SearchPage from "./features/docs/pages/SearchPage";
import PlaygroundPage from "./features/playground/pages/PlaygroundPage";
import { PlaygroundProvider } from "./features/playground/context/PlaygroundContext";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    () => localStorage.getItem("selectedLanguage") || null,
  );
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem("theme") || "dark",
  );

  const toggleSidebar = () => setIsSidebarOpen((o) => !o);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLanguageSelect = (language) => {
    localStorage.setItem("selectedLanguage", language);
    setSelectedLanguage(language);
  };

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("light-theme", theme === "light");
  }, [theme]);

  return (
    <PlaygroundProvider>
      <Router>
        <div className={`app ${theme === "light" ? "theme-light" : ""}`}>
          {selectedLanguage ? (
            <>
              <Navbar
                toggleSidebar={toggleSidebar}
                theme={theme}
                onToggleTheme={toggleTheme}
              />
              <div className="layout">
                {isSidebarOpen && (
                  <div className="backdrop" onClick={closeSidebar}></div>
                )}
                <Sidebar
                  isOpen={isSidebarOpen}
                  onClose={closeSidebar}
                  selectedLanguage={selectedLanguage}
                  onLanguageSelect={handleLanguageSelect}
                />
                <main className="main-content">
                  <Routes>
                    <Route
                      path="/"
                      element={<HomePage selectedLanguage={selectedLanguage} />}
                    />
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
                      element={
                        <CategoryPage selectedLanguage={selectedLanguage} />
                      }
                    />
                    <Route
                      path="/search"
                      element={
                        <SearchPage selectedLanguage={selectedLanguage} />
                      }
                    />
                    {/* Playground — passes sidebar controls so hamburger works inside IDE */}
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
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </main>
              </div>
            </>
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <LanguageSelectPage onLanguageSelect={handleLanguageSelect} />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )}
        </div>
      </Router>
    </PlaygroundProvider>
  );
}

export default App;
