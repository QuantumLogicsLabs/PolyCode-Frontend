import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Settings, Volume2, VolumeX } from "lucide-react";
import { THEMES, getThemeById } from "../../../shared/theme/themes";
import { useAppSettings } from "../../../shared/settings/AppSettingsContext";
import { playSound } from "../../../shared/sound/soundEffects";

export default function PlaygroundSettingsMenu({ ideTheme, onIdeThemeChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const [panelStyle, setPanelStyle] = useState(null);
  const { soundEnabled, toggleSound } = useAppSettings();

  const updatePanelPosition = useCallback(() => {
    const anchor = rootRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const panelWidth = 280;
    const left = Math.min(
      Math.max(12, rect.right - panelWidth),
      window.innerWidth - panelWidth - 12,
    );
    setPanelStyle({
      position: "fixed",
      top: rect.bottom + 8,
      left,
      width: panelWidth,
      zIndex: 10000,
    });
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    updatePanelPosition();
    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);
    return () => {
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [open, updatePanelPosition]);

  const handleThemeChange = useCallback(
    (nextTheme) => {
      playSound("toggle", soundEnabled);
      onIdeThemeChange?.(nextTheme);
    },
    [onIdeThemeChange, soundEnabled],
  );

  useEffect(() => {
    if (!open) return undefined;

    const handlePointer = (event) => {
      const target = event.target;
      if (
        rootRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("mousedown", handlePointer);
    return () => document.removeEventListener("mousedown", handlePointer);
  }, [open]);

  const activeTheme = getThemeById(ideTheme);

  const panel = open ? (
    <div
      ref={panelRef}
      className="pg-settings-panel pg-settings-panel--portal"
      style={panelStyle}
      role="dialog"
      aria-label="IDE settings"
    >
      <p className="pg-settings-heading">Settings</p>

      <div className="pg-settings-section">
        <div className="pg-settings-section-head">
          <p className="pg-settings-label">IDE theme</p>
          <span className="pg-settings-current">{activeTheme.label}</span>
        </div>
        <p className="pg-settings-note">
          IDE colors only — does not change the rest of the site.
        </p>
        <div className="pg-theme-grid" role="listbox" aria-label="IDE theme">
          {THEMES.map((item) => {
            const active = item.id === ideTheme;
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={active}
                className={`pg-theme-option${active ? " is-active" : ""}`}
                onClick={() => handleThemeChange(item.id)}
              >
                <span
                  className="pg-theme-swatch"
                  style={{ background: item.swatch }}
                  aria-hidden
                />
                <span className="pg-theme-copy">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>
                {active ? <Check size={14} aria-hidden /> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pg-settings-section">
        <p className="pg-settings-label">IDE sound effects</p>
        <button
          type="button"
          className={`pg-settings-toggle${soundEnabled ? " is-on" : ""}`}
          onClick={() => {
            toggleSound();
            playSound("toggle", !soundEnabled);
          }}
          aria-pressed={soundEnabled}
        >
          {soundEnabled ? (
            <Volume2 size={16} aria-hidden />
          ) : (
            <VolumeX size={16} aria-hidden />
          )}
          <span>{soundEnabled ? "On" : "Off"}</span>
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="pg-settings-menu" ref={rootRef}>
      <button
        type="button"
        className="pg-icon-btn pg-settings-btn"
        onClick={() => {
          playSound("toggle", soundEnabled);
          setOpen((value) => !value);
        }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="IDE settings"
        title="IDE settings"
        data-no-sound="true"
      >
        <Settings size={16} aria-hidden />
      </button>

      {typeof document !== "undefined" && panel
        ? createPortal(
            panel,
            // In fullscreen only the fullscreen element is rendered, so portal into it.
            document.fullscreenElement ||
              document.webkitFullscreenElement ||
              document.body,
          )
        : null}
    </div>
  );
}
