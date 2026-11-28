'use client';

import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations, LANGS, getLangFromPathname, withLangPath } from '../lib/i18n';
import type { Lang, T } from '../lib/i18n';

const STORAGE_KEY = 'fixedaim-lang';

interface LanguageContextValue {
  lang: Lang;
  t: T;
  setLang: (lang: Lang) => void;
  localeHref: (path: string) => string;
  langs: typeof LANGS;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lang = getLangFromPathname(pathname);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const setLang = useCallback((newLang: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
    const targetUrl = withLangPath(pathname || '/', newLang);
    const search = typeof window !== 'undefined' ? window.location.search : '';
    router.push(`${targetUrl}${search}`);
  }, [pathname, router]);

  const localeHref = useCallback((path: string) => {
    return withLangPath(path, lang);
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    t: translations[lang],
    setLang,
    localeHref,
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
