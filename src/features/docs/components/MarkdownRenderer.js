import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

function normalizeDocLanguage(lang = '') {
  const key = String(lang).toLowerCase().trim();
  const aliases = {
    'c++': 'cpp',
    cpp: 'cpp',
    cc: 'cpp',
    cxx: 'cpp',
    'c#': 'csharp',
    cs: 'csharp',
    shell: 'bash',
    sh: 'bash',
    ps1: 'powershell',
    bat: 'batch',
    batchfile: 'batch',
    md: 'markdown',
    py: 'python',
    js: 'javascript',
    ts: 'typescript',
  };
  return aliases[key] || key || 'python';
}

function extensionFromLanguage(lang) {
  const map = {
    python: 'py',
    javascript: 'js',
    typescript: 'ts',
    csharp: 'cs',
    cpp: 'cpp',
    powershell: 'ps1',
    batch: 'bat',
    markdown: 'md',
  };
  return map[lang] || lang;
}

export default function MarkdownRenderer({ content, fileType, relatedCode, title }) {
  if (fileType !== 'markdown' && fileType !== 'md') {
    const normalizedFileType = normalizeDocLanguage(fileType);
    return (
      <div className="doc-body">
        <CodeBlock
          language={normalizedFileType}
          code={content}
          filename={title && normalizedFileType ? `${title}.${extensionFromLanguage(normalizedFileType)}` : title}
        />
      </div>
    );
  }

  return (
    <div className="doc-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-([a-zA-Z0-9#+-]+)/.exec(className || '');
            const lang = normalizeDocLanguage(match ? match[1] : 'python');
            const codeStr = String(children).replace(/\n$/, '');

            if (!inline && (match || codeStr.length > 60)) {
              return <CodeBlock language={lang} code={codeStr} />;
            }
            return <code className={className} {...props}>{children}</code>;
          },
          // Open links in new tab
          a({ href, children, ...props }) {
            return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
          },
        }}
      >
        {content}
      </ReactMarkdown>

      {relatedCode && relatedCode.length > 0 && (
        <div className="related-code-section">
          <div style={{ textAlign: 'left', marginBottom: '40px', paddingLeft: '20px', borderLeft: '4px solid var(--accent)' }}>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              display: 'block',
              marginBottom: '8px'
            }}>
              Core Implementation
            </span>
            <h2 style={{ fontSize: '1.6rem', margin: 0, fontWeight: 800 }}>
              {relatedCode.length === 1 ? 'Source Code Reference' : 'Integrated Logic Modules'}
            </h2>
          </div>

          {relatedCode.map((codeDoc, index) => (
            (() => {
              const rawLang = codeDoc.fileType || codeDoc.language || 'python';
              const codeLang = normalizeDocLanguage(rawLang);
              const ext = extensionFromLanguage(codeLang);
              return (
                <div key={index} className="related-code-item" style={{ marginBottom: '32px' }}>
                  <div style={{
                    background: 'rgba(5, 8, 16, 0.5)',
                    border: '1px solid var(--border)',
                    padding: '0',
                    borderRadius: 'var(--radius)'
                  }}>
                    <CodeBlock
                      language={codeLang}
                      code={codeDoc.content}
                      filename={`${codeDoc.title}.${ext}`}
                    />
                  </div>
                </div>
              );
            })()
          ))}
        </div>
      )}
    </div>
  );
}
