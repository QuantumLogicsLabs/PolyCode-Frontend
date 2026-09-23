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
const FunctionsHub = lazyWithChunkRetry(
  () => import("./features/learn/functions-cpp/pages/FunctionsHub"),
);
const FunctionsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/functions-cpp/pages/FunctionsLessonPage"),
);
const StlHub = lazyWithChunkRetry(
  () => import("./features/learn/stl-cpp/pages/StlHub"),
);
const StlLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/stl-cpp/pages/StlLessonPage"),
);
const DsaHub = lazyWithChunkRetry(
  () => import("./features/learn/dsa-cpp/pages/DsaHub"),
);
const DsaLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/dsa-cpp/pages/DsaLessonPage"),
);
const ModernCppHub = lazyWithChunkRetry(
  () => import("./features/learn/modern-cpp/pages/ModernCppHub"),
);
const ModernCppLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/modern-cpp/pages/ModernCppLessonPage"),
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
  () => import("./features/learn/pytorch-py/pages/PytorchHub"),
);
const PyTorchLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/pytorch-py/pages/PytorchLessonPage"),
);
const ScipyHub = lazyWithChunkRetry(
  () => import("./features/learn/scipy-py/pages/ScipyHub"),
);
const ScipyLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/scipy-py/pages/ScipyLessonPage"),
);
const OpencvHub = lazyWithChunkRetry(
  () => import("./features/learn/opencv-py/pages/OpencvHub"),
);
const OpencvLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/opencv-py/pages/OpencvLessonPage"),
);
const RustFundamentalsHub = lazyWithChunkRetry(
  () => import("./features/learn/rust-fundamentals-course/pages/RustFundamentalsHub"),
);
const RustFundamentalsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/rust-fundamentals-course/pages/RustFundamentalsLessonPage"),
);
const RustConcurrencyHub = lazyWithChunkRetry(
  () => import("./features/learn/rust-concurrency-course/pages/RustConcurrencyHub"),
);
const RustConcurrencyLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/rust-concurrency-course/pages/RustConcurrencyLessonPage"),
);
const RustCollectionsHub = lazyWithChunkRetry(
  () => import("./features/learn/rust-collections-course/pages/RustCollectionsHub"),
);
const RustCollectionsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/rust-collections-course/pages/RustCollectionsLessonPage"),
);
const RustMemoryHub = lazyWithChunkRetry(
  () => import("./features/learn/rust-memory-course/pages/RustMemoryHub"),
);
const RustMemoryLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/rust-memory-course/pages/RustMemoryLessonPage"),
);
const RustProjectsHub = lazyWithChunkRetry(
  () => import("./features/learn/rust-projects/pages/RustProjectsHub"),
);
const RustProjectsLessonPage = lazyWithChunkRetry(
  () => import("./features/learn/rust-projects/pages/RustProjectsLessonPage"),
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
const CoursesPage = lazyWithChunkRetry(
  () => import("./features/language/pages/CoursesPage"),
);

/** Learn courses declared as data instead of hand-written <Route> triples.
 *  Every entry gets /learn/<slug>, /learn/<slug>/lesson/:lessonId and the
 *  /learn/<slug>/:lessonId alias, plus the language the sidebar switches to.
 *  Keep in sync with the hrefs in features/language/courseCatalog.js. */
const LEARN_COURSE_ROUTES = [
  {
    slug: "c-fundamentals",
    language: "C",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/c-fundamentals/pages/CFundamentalsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import("./features/learn/c-fundamentals/pages/CFundamentalsLessonPage"),
    ),
  },
  {
    slug: "c-functions",
    language: "C",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/c-functions/pages/CFunctionsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/c-functions/pages/CFunctionsLessonPage"),
    ),
  },
  {
    slug: "c-pointers",
    language: "C",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/c-pointers/pages/CPointersHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/c-pointers/pages/CPointersLessonPage"),
    ),
  },
  {
    slug: "c-memory-management",
    language: "C",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/c-memory-management/pages/CMemoryManagementHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/c-memory-management/pages/CMemoryManagementLessonPage"
        ),
    ),
  },
  {
    slug: "c-data-structures",
    language: "C",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/c-data-structures/pages/CDataStructuresHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/c-data-structures/pages/CDataStructuresLessonPage"
        ),
    ),
  },
  {
    slug: "c-file-handling",
    language: "C",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/c-file-handling/pages/CFileHandlingHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/c-file-handling/pages/CFileHandlingLessonPage"
        ),
    ),
  },
  {
    slug: "c-projects",
    language: "C",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/c-projects/pages/CProjectsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/c-projects/pages/CProjectsLessonPage"),
    ),
  },
  {
    slug: "cpp-fundamentals",
    language: "C++",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/cpp-fundamentals/pages/CppFundamentalsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/cpp-fundamentals/pages/CppFundamentalsLessonPage"
        ),
    ),
  },
  {
    slug: "cpp-data-structures",
    language: "C++",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/cpp-data-structures/pages/CppDataStructuresHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/cpp-data-structures/pages/CppDataStructuresLessonPage"
        ),
    ),
  },
  {
    slug: "sql-fundamentals",
    language: "SQL",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/sql-fundamentals/pages/SqlFundamentalsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/sql-fundamentals/pages/SqlFundamentalsLessonPage"
        ),
    ),
  },
  {
    slug: "sql-queries",
    language: "SQL",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/sql-queries/pages/SqlQueriesHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/sql-queries/pages/SqlQueriesLessonPage"),
    ),
  },
  {
    slug: "sql-joins",
    language: "SQL",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/sql-joins/pages/SqlJoinsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/sql-joins/pages/SqlJoinsLessonPage"),
    ),
  },
  {
    slug: "sql-aggregate-functions",
    language: "SQL",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/sql-aggregate-functions/pages/SqlAggregateFunctionsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/sql-aggregate-functions/pages/SqlAggregateFunctionsLessonPage"
        ),
    ),
  },
  {
    slug: "sql-subqueries",
    language: "SQL",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/sql-subqueries/pages/SqlSubqueriesHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/sql-subqueries/pages/SqlSubqueriesLessonPage"
        ),
    ),
  },
  {
    slug: "sql-views",
    language: "SQL",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/sql-views/pages/SqlViewsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/sql-views/pages/SqlViewsLessonPage"),
    ),
  },
  {
    slug: "sql-indexes",
    language: "SQL",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/sql-indexes/pages/SqlIndexesHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/sql-indexes/pages/SqlIndexesLessonPage"),
    ),
  },
  {
    slug: "sql-stored-procedures",
    language: "SQL",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/sql-stored-procedures/pages/SqlStoredProceduresHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/sql-stored-procedures/pages/SqlStoredProceduresLessonPage"
        ),
    ),
  },
  {
    slug: "sql-projects",
    language: "SQL",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/sql-projects/pages/SqlProjectsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/sql-projects/pages/SqlProjectsLessonPage"),
    ),
  },
  {
    slug: "python-oop-py",
    language: "Python",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/python-oop-py/pages/PythonOopHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/python-oop-py/pages/PythonOopLessonPage"),
    ),
  },
  {
    slug: "python-file-handling-py",
    language: "Python",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/python-file-handling-py/pages/PythonFileHandlingHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/python-file-handling-py/pages/PythonFileHandlingLessonPage"
        ),
    ),
  },
  {
    slug: "js-dom",
    language: "JavaScript",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/js-dom/pages/JsDomHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/js-dom/pages/JsDomLessonPage"),
    ),
  },
  {
    slug: "js-web-dev",
    language: "JavaScript",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/js-web-dev/pages/JsWebDevHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/js-web-dev/pages/JsWebDevLessonPage"),
    ),
  },
  {
    slug: "js-es6-plus",
    language: "JavaScript",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/js-es6-plus/pages/JsEs6Hub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/js-es6-plus/pages/JsEs6LessonPage"),
    ),
  },
  {
    slug: "js-apis",
    language: "JavaScript",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/js-apis/pages/JsApisHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/js-apis/pages/JsApisLessonPage"),
    ),
  },
  {
    slug: "js-async",
    language: "JavaScript",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/js-async/pages/JsAsyncHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/js-async/pages/JsAsyncLessonPage"),
    ),
  },
  {
    slug: "node-npm",
    language: "JavaScript",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/node-npm/pages/NodeNpmHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/node-npm/pages/NodeNpmLessonPage"),
    ),
  },
  {
    slug: "html-css-foundation",
    language: "HTML & CSS",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/html-css-foundation/pages/HtmlCssFoundationHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/html-css-foundation/pages/HtmlCssFoundationLessonPage"
        ),
    ),
  },

  {
    slug: "css-layouts",
    language: "HTML & CSS",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/css-layouts-course/pages/CssLayoutsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/css-layouts-course/pages/CssLayoutsLessonPage"
        ),
    ),
  },
  {
    slug: "responsive-design",
    language: "HTML & CSS",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/responsive-design-course/pages/ResponsiveDesignHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/responsive-design-course/pages/ResponsiveDesignLessonPage"
        ),
    ),
  },
  {
    slug: "css-animations",
    language: "HTML & CSS",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/css-animations-course/pages/CssAnimationsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/css-animations-course/pages/CssAnimationsLessonPage"
        ),
    ),
  },
  {
    slug: "forms-semantic-html",
    language: "HTML & CSS",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/forms-semantic-html-course/pages/FormsSemanticHtmlHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/forms-semantic-html-course/pages/FormsSemanticHtmlLessonPage"
        ),
    ),
  },
  {
    slug: "web-accessibility",
    language: "HTML & CSS",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/web-accessibility-course/pages/WebAccessibilityHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/web-accessibility-course/pages/WebAccessibilityLessonPage"
        ),
    ),
  },
  {
    slug: "css-modern-features",
    language: "HTML & CSS",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/css-modern-features-course/pages/CssModernFeaturesHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/css-modern-features-course/pages/CssModernFeaturesLessonPage"
        ),
    ),
  },
  {
    slug: "sass-scss",
    language: "HTML & CSS",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/sass-scss-course/pages/SassScssHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import("./features/learn/sass-scss-course/pages/SassScssLessonPage"),
    ),
  },
  {
    slug: "batchfile-fundamentals",
    language: "Batchfile",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/batchfile-fundamentals/pages/BatchfileFundamentalsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/batchfile-fundamentals/pages/BatchfileFundamentalsLessonPage"
        ),
    ),
  },
  {
    slug: "batchfile-automation",
    language: "Batchfile",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/batchfile-automation/pages/BatchfileAutomationHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/batchfile-automation/pages/BatchfileAutomationLessonPage"
        ),
    ),
  },
  {
    slug: "windows-scripting",
    language: "Batchfile",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/windows-scripting/pages/WindowsScriptingHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/windows-scripting/pages/WindowsScriptingLessonPage"
        ),
    ),
  },
  {
    slug: "batchfile-projects",
    language: "Batchfile",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/batchfile-projects/pages/BatchfileProjectsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/batchfile-projects/pages/BatchfileProjectsLessonPage"
        ),
    ),
  },
  {
    slug: "php-projects",
    language: "PHP",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/php-projects/pages/phpProjectsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/php-projects/pages/phpProjectsLessonPage"),
    ),
  },
  {
    slug: "laravel-basics",
    language: "PHP",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/laravel-basics/pages/laravelBasicsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/laravel-basics/pages/laravelBasicsLessonPage"
        ),
    ),
  },
  {
    slug: "ruby-fundamentals",
    language: "Ruby",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/ruby-fundamentals/pages/rubyFundamentalsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/ruby-fundamentals/pages/rubyFundamentalsLessonPage"
        ),
    ),
  },
  {
    slug: "ruby-oop",
    language: "Ruby",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/ruby-oop/pages/rubyOopHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/ruby-oop/pages/rubyOopLessonPage"),
    ),
  },
  {
    slug: "ruby-blocks-modules",
    language: "Ruby",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/ruby-blocks-modules/pages/rubyBlocksModulesHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/ruby-blocks-modules/pages/rubyBlocksModulesLessonPage"
        ),
    ),
  },
  {
    slug: "ruby-file-handling",
    language: "Ruby",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/ruby-file-handling/pages/RubyFileHandlingHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/ruby-file-handling/pages/RubyFileHandlingLessonPage"
        ),
    ),
  },
  {
    slug: "ruby-gems",
    language: "Ruby",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/ruby-gems/pages/RubyGemsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/ruby-gems/pages/RubyGemsLessonPage"),
    ),
  },
  {
    slug: "ruby-on-rails",
    language: "Ruby",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/ruby-on-rails/pages/rubyOnRailsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/ruby-on-rails/pages/rubyOnRailsLessonPage"),
    ),
  },
  {
    slug: "golang-fundamentals",
    language: "Go",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/golang-fundamentals/pages/GoFundamentalsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/golang-fundamentals/pages/GoFundamentalsLessonPage"
        ),
    ),
  },
  {
    slug: "go-functions",
    language: "Go",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/go-functions/pages/GoFunctionsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/go-functions/pages/GoFunctionsLessonPage"),
    ),
  },
  {
    slug: "go-concurrency",
    language: "Go",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/go-concurrency/pages/GoConcurrencyHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/go-concurrency/pages/GoConcurrencyLessonPage"),
    ),
  },
  {
    slug: "go-web-development",
    language: "Go",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/go-web-development/pages/GoWebDevelopmentHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/go-web-development/pages/GoWebDevelopmentLessonPage"),
    ),
  },
  {
    slug: "go-modules",
    language: "Go",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/go-modules/pages/GoModulesHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/go-modules/pages/GoModulesLessonPage"),
    ),
  },
  {
    slug: "go-apis",
    language: "Go",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/go-apis/pages/GoApisHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/go-apis/pages/GoApisLessonPage"),
    ),
  },
  {
    slug: "ml-py",
    language: "Go",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/ml-py/pages/MlPyHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/ml-py/pages/MlPyLessonPage"),
    ),
  },
  {
    slug: "powershell-fundamentals",
    language: "PowerShell",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/powershell-fundamentals/pages/PowershellFundamentalsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/powershell-fundamentals/pages/PowershellFundamentalsLessonPage"
        ),
    ),
  },
  {
    slug: "powershell-scripting",
    language: "PowerShell",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/powershell-scripting/pages/PowershellScriptingHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/powershell-scripting/pages/PowershellScriptingLessonPage"
        ),
    ),
  },
  {
    slug: "powershell-administration",
    language: "PowerShell",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/powershell-administration/pages/PowershellAdministrationHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/powershell-administration/pages/PowershellAdministrationLessonPage"
        ),
    ),
  },
  {
    slug: "powershell-projects",
    language: "PowerShell",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/powershell-projects/pages/PowershellProjectsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/powershell-projects/pages/PowershellProjectsLessonPage"
        ),
    ),
  },
  {
    slug: "quantum-computing-fundamentals",
    language: "Quantum",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/quantum-computing-fundamentals/pages/QuantumComputingFundamentalsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/quantum-computing-fundamentals/pages/QuantumComputingFundamentalsLessonPage"
        ),
    ),
  },
  {
    slug: "quantum-mechanics-for-programmers",
    language: "Quantum",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/quantum-mechanics-for-programmers/pages/QuantumMechanicsForProgrammersHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/quantum-mechanics-for-programmers/pages/QuantumMechanicsForProgrammersLessonPage"
        ),
    ),
  },
  {
    slug: "quantum-algorithms",
    language: "Quantum",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/quantum-algorithms/pages/QuantumAlgorithmsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/quantum-algorithms/pages/QuantumAlgorithmsLessonPage"
        ),
    ),
  },
  {
    slug: "quantum-programming-projects",
    language: "Quantum",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/quantum-programming-projects/pages/QuantumProgrammingProjectsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/quantum-programming-projects/pages/QuantumProgrammingProjectsLessonPage"
        ),
    ),
  },
  {
    slug: "quantum-multi-syntax",
    language: "Quantum",
    Hub: lazyWithChunkRetry(() => import("./features/learn/quantum-multi-syntax/pages/QuantumMultiSyntaxHub")),
    Lesson: lazyWithChunkRetry(() => import("./features/learn/quantum-multi-syntax/pages/QuantumMultiSyntaxLessonPage")),
  },
  {
    slug: "quantum-paradigm-coding",
    language: "Quantum",
    Hub: lazyWithChunkRetry(() => import("./features/learn/quantum-paradigm-coding/pages/QuantumParadigmCodingHub")),
    Lesson: lazyWithChunkRetry(() => import("./features/learn/quantum-paradigm-coding/pages/QuantumParadigmCodingLessonPage")),
  },
  {
    slug: "qsharp-fundamentals",
    language: "Q#",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/qsharp-fundamentals/pages/QsharpFundamentalsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/qsharp-fundamentals/pages/QsharpFundamentalsLessonPage"
        ),
    ),
  },
  {
    slug: "qsharp-quantum-programming-basics",
    language: "Q#",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/qsharp-quantum-programming-basics/pages/QsharpQuantumProgrammingBasicsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/qsharp-quantum-programming-basics/pages/QsharpQuantumProgrammingBasicsLessonPage"
        ),
    ),
  },
  {
    slug: "qsharp-quantum-gates",
    language: "Q#",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/qsharp-quantum-gates/pages/QsharpQuantumGatesHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/qsharp-quantum-gates/pages/QsharpQuantumGatesLessonPage"
        ),
    ),
  },
  {
    slug: "qsharp-quantum-algorithms",
    language: "Q#",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/qsharp-quantum-algorithms/pages/QsharpQuantumAlgorithmsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/qsharp-quantum-algorithms/pages/QsharpQuantumAlgorithmsLessonPage"
        ),
    ),
  },
  {
    slug: "qsharp-quantum-projects",
    language: "Q#",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/qsharp-quantum-projects/pages/QsharpQuantumProjectsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/qsharp-quantum-projects/pages/QsharpQuantumProjectsLessonPage"
        ),
    ),
  },
  {
    slug: "csharp-oop",
    language: "C#",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/csharp-oop/pages/CsharpOopHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () => import("./features/learn/csharp-oop/pages/CsharpOopLessonPage"),
    ),
  },
  {
    slug: "huggingface-py",
    language: "Python",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/huggingface-py/pages/HuggingfaceHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import("./features/learn/huggingface-py/pages/HuggingfaceLessonPage"),
    ),
  },
  {
    slug: "csharp-collections",
    language: "C#",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/csharp-collections/pages/CsharpCollectionsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/csharp-collections/pages/CsharpCollectionsLessonPage"
        ),
    ),
  },
  {
    slug: "csharp-linq",
    language: "C#",
    Hub: lazyWithChunkRetry(
      () => import("./features/learn/csharp-linq/pages/CsharpLinqHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import("./features/learn/csharp-linq/pages/CsharpLinqLessonPage"),
    ),
  },
  {
    slug: "csharp-file-handling",
    language: "C#",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/csharp-file-handling/pages/CsharpFileHandlingHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/csharp-file-handling/pages/CsharpFileHandlingLessonPage"
        ),
    ),
  },
  {
    slug: "csharp-aspnet-basics",
    language: "C#",
    Hub: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/csharp-aspnet-basics/pages/CsharpAspnetBasicsHub"
        ),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/csharp-aspnet-basics/pages/CsharpAspnetBasicsLessonPage"
        ),
    ),
  },
  {
    slug: "csharp-projects",
    language: "C#",
    Hub: lazyWithChunkRetry(
      () =>
        import("./features/learn/csharp-projects/pages/CsharpProjectsHub"),
    ),
    Lesson: lazyWithChunkRetry(
      () =>
        import(
          "./features/learn/csharp-projects/pages/CsharpProjectsLessonPage"
        ),
    ),
  },
];

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

/** The ThemedShell + LearnShell pair every /learn/* route renders. */
function LearnRoute({
  theme,
  onThemeChange,
  onGoToStackPicker,
  selectedLanguage,
  children,
}) {
  return (
    <ThemedShell theme={theme}>
      <LearnShell
        theme={theme}
        onThemeChange={onThemeChange}
        onGoToStackPicker={onGoToStackPicker}
        selectedLanguage={selectedLanguage}
      >
        {children}
      </LearnShell>
    </ThemedShell>
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
    const tableRoute = LEARN_COURSE_ROUTES.find((route) =>
      path.startsWith(`/learn/${route.slug}`),
    );
    if (tableRoute) {
      handleLanguageSelect(tableRoute.language, { stay: true });
      return;
    }
    if (
      path.startsWith("/learn/python-fundamentals") ||
      path.startsWith("/learn/numpy-py") ||
      path.startsWith("/learn/pandas-py") ||
      path.startsWith("/learn/matplotlib-py") ||
      path.startsWith("/learn/fastapi-py") ||
      path.startsWith("/learn/matplotlib-py") ||
      path.startsWith("/learn/ai_ml-py") ||
      path.startsWith("/learn/pytorch-py") ||
      path.startsWith("/learn/scipy-py") ||
      path.startsWith("/learn/opencv-py")
    ) {
      handleLanguageSelect("Python", { stay: true });
    } else if (
      path.startsWith("/learn/rust-fundamentals") ||
      path.startsWith("/learn/rust-concurrency") ||
      path.startsWith("/learn/rust-collections") ||
      path.startsWith("/learn/rust-memory") ||
      path.startsWith("/learn/rust-projects")
    ) {
      handleLanguageSelect("Rust", { stay: true });
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
      path.startsWith("/learn/functions-cpp") ||
      path.startsWith("/learn/stl-cpp") ||
      path.startsWith("/learn/modern-cpp")
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
          path="/learn/functions-cpp"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <FunctionsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/functions-cpp/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <FunctionsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/functions-cpp/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <FunctionsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/stl-cpp"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <StlHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/stl-cpp/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <StlLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/stl-cpp/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <StlLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/modern-cpp"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <ModernCppHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/modern-cpp/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <ModernCppLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/modern-cpp/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <ModernCppLessonPage />
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
        {/* SciPy Course Routes */}
        <Route
          path="/learn/scipy-py"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <ScipyHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/scipy-py/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <ScipyLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        {/* OpenCV Course Routes */}
        <Route
          path="/learn/opencv-py"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <OpencvHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/opencv-py/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <OpencvLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        {/* Rust Fundamentals Course Routes */}
        <Route
          path="/learn/rust-fundamentals"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RustFundamentalsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/rust-fundamentals/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RustFundamentalsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        {/* Rust Concurrency Course Routes */}
        <Route
          path="/learn/rust-concurrency"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RustConcurrencyHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/rust-concurrency/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RustConcurrencyLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        {/* Rust Collections Course Routes */}
        <Route
          path="/learn/rust-collections"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RustCollectionsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/rust-collections/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RustCollectionsLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        {/* Rust Memory Course Routes */}
        <Route
          path="/learn/rust-memory"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RustMemoryHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/rust-memory/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RustMemoryLessonPage />
              </LearnShell>
            </ThemedShell>
          }
        />
        {/* Rust Projects Course Routes */}
        <Route
          path="/learn/rust-projects"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RustProjectsHub />
              </LearnShell>
            </ThemedShell>
          }
        />
        <Route
          path="/learn/rust-projects/lesson/:lessonId"
          element={
            <ThemedShell theme={theme}>
              <LearnShell
                theme={theme}
                onThemeChange={handleThemeChange}
                onGoToStackPicker={goToStackPicker}
                selectedLanguage={selectedLanguage}
              >
                <RustProjectsLessonPage />
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
        {LEARN_COURSE_ROUTES.flatMap(({ slug, Hub, Lesson }) => {
          const shell = (children) => (
            <LearnRoute
              theme={theme}
              onThemeChange={handleThemeChange}
              onGoToStackPicker={goToStackPicker}
              selectedLanguage={selectedLanguage}
            >
              {children}
            </LearnRoute>
          );

          return [
            <Route
              key={slug}
              path={`/learn/${slug}`}
              element={shell(<Hub />)}
            />,
            <Route
              key={`${slug}-lesson`}
              path={`/learn/${slug}/lesson/:lessonId`}
              element={shell(<Lesson />)}
            />,
            <Route
              key={`${slug}-lesson-alias`}
              path={`/learn/${slug}/:lessonId`}
              element={shell(<Lesson />)}
            />,
          ];
        })}
        <Route
          path="/courses"
          element={
            <LearnRoute
              theme={theme}
              onThemeChange={handleThemeChange}
              onGoToStackPicker={goToStackPicker}
              selectedLanguage={selectedLanguage}
            >
              <CoursesPage />
            </LearnRoute>
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