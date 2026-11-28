'use client';

import { useCallback } from 'react';
import { useLang } from '@/contexts/LanguageContext';
import type { Lang } from '@/lib/i18n';

export type NonEnLang = Exclude<Lang, 'en'>;
export type PageDict = Partial<Record<NonEnLang, Record<string, string>>>;

export function normalizeKey(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

export function translateWithDict(dict: PageDict, lang: Lang, text: string): string {
  if (lang === 'en') return text;
  const key = normalizeKey(text);
  if (!key) return text;
  const translated = dict[lang]?.[key];
  if (!translated) return text;
  const leading = text.match(/^\s*/)?.[0] ?? '';
  const trailing = text.match(/\s*$/)?.[0] ?? '';
  return `${leading}${translated}${trailing}`;
}

export function usePageI18n(dict: PageDict) {
  const { lang, localeHref, t } = useLang();
  const tr = useCallback(
    (text: string) => translateWithDict(dict, lang, text),
    [dict, lang]
  );
  return { lang, localeHref, t, tr };
}
