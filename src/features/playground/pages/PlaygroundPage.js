import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CodePlayground from '../components/CodePlayground';
import './PlaygroundPage.css';

export default function PlaygroundPage({ onToggleSidebar, sidebarOpen }) {
  const [searchParams] = useSearchParams();
  const initLang = searchParams.get('lang') || 'javascript';
  const initCode = searchParams.get('code')
    ? decodeURIComponent(searchParams.get('code'))
    : undefined;

  return (
    <div className="playground-page">
      <div className="playground-page-header">
        <div className="pph-top">
          <h1><span className="pph-icon">⬡</span> Code Playground</h1>
          <p className="pph-sub">
            Every language now opens its own connected IDE workspace. Switching preserves code, console, and preview per language.
          </p>
        </div>
        <div className="pph-current">
          Current IDE: <strong>{initLang}</strong>. Use the language chips inside the IDE panel below to switch quickly.
        </div>
      </div>

      <div className="playground-page-body">
        <CodePlayground
          initialLanguage={initLang}
          initialCode={initCode}
          onToggleSidebar={onToggleSidebar}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </div>
  );
}
