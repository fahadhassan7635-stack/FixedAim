'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, LANGS } from '../lib/i18n';
import type { Lang, T } from '../lib/i18n';

const STORAGE_KEY = 'fixedaim-lang';

interface LanguageContextValue {
  lang: Lang;
  t: T;
  setLang: (lang: Lang) => void;
  langs: typeof LANGS;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // Hydrate from localStorage on mount (SSR-safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && stored in translations) {
        setLangState(stored);
      }
    } catch {
      // localStorage not available (SSR / privacy mode) — keep default 'en'
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  }, []);

  const value: LanguageContextValue = {
    lang,
    t: translations[lang],
    setLang,
    langs: LANGS,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}
