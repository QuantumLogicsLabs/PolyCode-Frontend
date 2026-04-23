import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const PlaygroundContext = createContext(null);

export function PlaygroundProvider({ children }) {
  const pyodideRef = useRef(null);
  const [pyodideStatus, setPyodideStatus] = useState('idle'); // idle | loading | ready | error
  const [pyodideError, setPyodideError] = useState(null);

  const loadPyodide = useCallback(async () => {
    if (pyodideRef.current) return pyodideRef.current;
    if (pyodideStatus === 'loading') return null;

    setPyodideStatus('loading');
    try {
      if (!window.loadPyodide) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load Pyodide'));
          document.head.appendChild(script);
        });
      }
      const pyodide = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
      });
      pyodide.runPython(`
import sys, io
class _Cap(io.StringIO): pass
sys.stdout = _Cap()
sys.stderr = _Cap()
      `);
      pyodideRef.current = pyodide;
      setPyodideStatus('ready');
      return pyodide;
    } catch (e) {
      setPyodideError(e.message);
      setPyodideStatus('error');
      return null;
    }
  }, [pyodideStatus]);

  const runPython = useCallback(async (code, stdin = '') => {
    // Load Pyodide if not already loaded
    if (!window.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Pyodide'));
        document.head.appendChild(script);
      });
    }
    
    // Initialize Pyodide if not already initialized
    if (!pyodideRef.current) {
      setPyodideStatus('loading');
      try {
        const pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
        });
        pyodide.runPython(`
import sys, io
class _Cap(io.StringIO): pass
sys.stdout = _Cap()
sys.stderr = _Cap()
        `);
        pyodideRef.current = pyodide;
        setPyodideStatus('ready');
      } catch (e) {
        setPyodideError(e.message);
        setPyodideStatus('error');
        throw new Error('Python runtime not available');
      }
    }
    
    const py = pyodideRef.current;
    
    // Reset stdout/stderr
    py.runPython('sys.stdout = _Cap()\nsys.stderr = _Cap()');
    
    let error = null;
    try {
      py.runPython(code);
    } catch (e) {
      error = e.message;
    }
    
    const stdout = py.runPython('sys.stdout.getvalue()');
    const stderr = py.runPython('sys.stderr.getvalue()');
    
    return { stdout, stderr, error };
  }, []);

  return (
    <PlaygroundContext.Provider value={{ pyodideStatus, pyodideError, loadPyodide, runPython }}>
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) throw new Error('usePlayground must be inside PlaygroundProvider');
  return ctx;
}