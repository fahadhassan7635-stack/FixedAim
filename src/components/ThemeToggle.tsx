'use client';

import React, { useEffect, useState } from 'react';

type ThemeSetting = 'system' | 'dark' | 'light';

export default function ThemeToggle() {
  const [themeSetting, setThemeSetting] = useState<ThemeSetting>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('fixedaim-theme') as ThemeSetting | null;
    const initialSetting: ThemeSetting =
      saved === 'dark' || saved === 'light' || saved === 'system' ? saved : 'system';
    setThemeSetting(initialSetting);

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = () => {
      const activeSetting =
        (localStorage.getItem('fixedaim-theme') as ThemeSetting | null) || 'system';
      let effectiveTheme: 'dark' | 'light';
      if (activeSetting === 'system') {
        effectiveTheme = mql.matches ? 'dark' : 'light';
      } else {
        effectiveTheme = activeSetting;
      }
      setResolvedTheme(effectiveTheme);
      document.documentElement.setAttribute('data-theme', effectiveTheme);
      document.documentElement.setAttribute('data-theme-setting', activeSetting);
    };

    updateTheme();
    mql.addEventListener('change', updateTheme);
    return () => mql.removeEventListener('change', updateTheme);
  }, []);

  const cycleTheme = () => {
    let nextSetting: ThemeSetting;
    if (themeSetting === 'system') {
      nextSetting = resolvedTheme === 'dark' ? 'light' : 'dark';
    } else if (themeSetting === 'dark') {
      nextSetting = 'light';
    } else {
      nextSetting = 'system';
    }

    setThemeSetting(nextSetting);
    localStorage.setItem('fixedaim-theme', nextSetting);

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const effectiveTheme: 'dark' | 'light' =
      nextSetting === 'system' ? (mql.matches ? 'dark' : 'light') : nextSetting;
    setResolvedTheme(effectiveTheme);
    document.documentElement.setAttribute('data-theme', effectiveTheme);
    document.documentElement.setAttribute('data-theme-setting', nextSetting);
  };

  const getLabel = () => {
    if (themeSetting === 'system') {
      return resolvedTheme === 'dark' ? 'System (Dark)' : 'System (Light)';
    }
    return themeSetting === 'dark' ? 'Dark' : 'Light';
  };

  const getIcon = () => {
    if (!mounted) {
      return (
        <span style={{ fontSize: '1.05rem', lineHeight: 1 }} aria-hidden="true">
          ☀️
        </span>
      );
    }
    if (themeSetting === 'system') {
      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="0" ry="0" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <span
            style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-6px',
              fontSize: '8px',
              fontWeight: 900,
              background: '#FF6B6B',
              color: '#000000',
              border: '1px solid #000000',
              padding: '0 2px',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            AUTO
          </span>
        </span>
      );
    }
    if (themeSetting === 'dark') {
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#000000"
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    }
    return (
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={`Theme: ${getLabel()} (Click to toggle: Auto -> Dark -> Light)`}
      aria-label={`Toggle website theme. Current setting: ${getLabel()}`}
      style={{
        width: '38px',
        height: '38px',
        background: '#FFE033',
        border: '3px solid #000000',
        boxShadow: '3px 3px 0 0 #FFFFFF',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000000',
        marginLeft: '10px',
        flexShrink: 0,
        transition: 'transform 0.1s ease, box-shadow 0.1s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-2px, -2px)';
        e.currentTarget.style.boxShadow = '5px 5px 0 0 #FFFFFF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = '3px 3px 0 0 #FFFFFF';
      }}
    >
      {getIcon()}
    </button>
  );
}
