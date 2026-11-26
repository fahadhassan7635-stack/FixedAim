'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLang } from '../contexts/LanguageContext';
import type { Lang } from '../lib/i18n';

const SKIP_TAGS = new Set([
  'SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'SELECT',
  'CODE', 'PRE', 'SVG', 'CANVAS', 'IFRAME',
]);

const SKIP_EXACT = new Set([
  'FIXED AIM.', 'FixedAim', 'CPS', 'WPM', 'CPM', 'FPS', 'APM', 'MS', 'HZ', 'Hz', 'KB', 'MB', 'GB', 'OK', 'VS',
]);

interface NodeRecord {
  original: string;
  lastSet: string;
}

const nodeRecords = new WeakMap<Text, NodeRecord>();
const trackedNodes = new Set<Text>();
const memoryCache = new Map<Lang, Map<string, string>>();

function getLangCache(lang: Lang): Map<string, string> {
  let map = memoryCache.get(lang);
  if (map) return map;
  map = new Map<string, string>();
  try {
    const raw = localStorage.getItem(`fixedaim-tr-v1-${lang}`);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, string>;
      for (const [k, v] of Object.entries(parsed)) {
        map.set(k, v);
      }
    }
  } catch {
    // ignore storage errors
  }
  memoryCache.set(lang, map);
  return map;
}

function saveLangCache(lang: Lang, map: Map<string, string>) {
  try {
    // Keep at most 1500 entries per language to stay well within localStorage limits
    const entries = Array.from(map.entries());
    const trimmed = entries.length > 1500 ? entries.slice(entries.length - 1500) : entries;
    localStorage.setItem(`fixedaim-tr-v1-${lang}`, JSON.stringify(Object.fromEntries(trimmed)));
  } catch {
    // ignore storage quota errors
  }
}

function shouldTranslateText(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed || trimmed.length < 2) return false;
  if (SKIP_EXACT.has(trimmed)) return false;
  // Must contain at least 2 consecutive Latin letters (skip pure numbers, timers, symbols, emojis)
  if (!/[a-zA-Z]{2,}/.test(trimmed)) return false;
  // Skip URLs or emails
  if (/^(https?:\/\/|mailto:|www\.)/i.test(trimmed)) return false;
  return true;
}

function isSkippedElement(el: Element | null): boolean {
  let curr: Element | null = el;
  while (curr) {
    if (SKIP_TAGS.has(curr.tagName)) return true;
    if (curr.getAttribute('translate') === 'no' || curr.getAttribute('data-no-translate') === 'true') {
      return true;
    }
    if (curr.classList?.contains('notranslate')) return true;
    curr = curr.parentElement;
  }
  return false;
}

function collectTextNodes(roots: Element[]): Text[] {
  const result: Text[] = [];
  for (const root of roots) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || isSkippedElement(parent)) return NodeFilter.FILTER_REJECT;
        const val = node.nodeValue ?? '';
        const rec = nodeRecords.get(node as Text);
        if (rec) {
          // Already tracked: accept if it's still our translated text or updated English text
          if (shouldTranslateText(rec.original) || shouldTranslateText(val)) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        }
        return shouldTranslateText(val) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    let current = walker.nextNode();
    while (current) {
      result.push(current as Text);
      current = walker.nextNode();
    }
  }
  return result;
}

async function fetchTranslations(texts: string[], targetLang: Lang): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  if (texts.length === 0) return out;

  // Normalize internal newlines so each item maps 1:1 to a single line in batch mode
  const normalized = texts.map(t => t.replace(/\s+/g, ' ').trim());
  const query = normalized.join('\n');

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) return out;
    const data = await res.json();
    const segments: string[] = Array.isArray(data?.[0])
      ? data[0].map((seg: unknown[]) => (typeof seg?.[0] === 'string' ? seg[0] : ''))
      : [];
    const joined = segments.join('');
    const lines = joined.split('\n');

    if (lines.length === texts.length) {
      texts.forEach((orig, idx) => {
        const translated = lines[idx]?.trim();
        if (translated) out.set(orig, translated);
      });
      return out;
    }
  } catch {
    // Fallback below if batch fails
  }

  // Individual fallback for mismatched line counts
  await Promise.all(
    texts.map(async (orig) => {
      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(orig.trim())}`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        const translated = Array.isArray(data?.[0])
          ? data[0].map((seg: unknown[]) => (typeof seg?.[0] === 'string' ? seg[0] : '')).join('').trim()
          : '';
        if (translated) out.set(orig, translated);
      } catch {
        // ignore individual errors
      }
    })
  );

  return out;
}

function applyTranslation(node: Text, original: string, translated: string) {
  // Preserve leading/trailing whitespace from original nodeValue
  const lead = original.match(/^\s*/)?.[0] ?? '';
  const trail = original.match(/\s*$/)?.[0] ?? '';
  const finalStr = `${lead}${translated}${trail}`;
  if (node.nodeValue !== finalStr) {
    node.nodeValue = finalStr;
  }
  nodeRecords.set(node, { original, lastSet: finalStr });
  trackedNodes.add(node);
}

export default function AutoPageTranslator() {
  const { lang } = useLang();
  const pathname = usePathname();
  const activeLangRef = useRef<Lang>(lang);
  activeLangRef.current = lang;

  useEffect(() => {
    document.documentElement.lang = lang;

    // Restore original English text when switching back to 'en'
    if (lang === 'en') {
      trackedNodes.forEach((node) => {
        if (!node.isConnected) {
          trackedNodes.delete(node);
          return;
        }
        const rec = nodeRecords.get(node);
        if (rec && node.nodeValue === rec.lastSet) {
          node.nodeValue = rec.original;
          nodeRecords.delete(node);
        }
      });
      trackedNodes.clear();
      return;
    }

    let cancelled = false;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    let isTranslating = false;

    const runTranslation = async () => {
      if (cancelled || isTranslating || activeLangRef.current !== lang) return;
      isTranslating = true;

      try {
        const roots: Element[] = [];
        const mainEl = document.querySelector('main');
        const asideEl = document.querySelector('aside');
        const footerEl = document.querySelector('footer');
        if (mainEl) roots.push(mainEl);
        if (asideEl) roots.push(asideEl);
        if (footerEl) roots.push(footerEl);
        if (roots.length === 0) return;

        const nodes = collectTextNodes(roots);
        const cache = getLangCache(lang);
        const missingMap = new Map<string, Text[]>();

        for (const node of nodes) {
          const currentVal = node.nodeValue ?? '';
          let rec = nodeRecords.get(node);

          if (!rec) {
            rec = { original: currentVal, lastSet: currentVal };
            nodeRecords.set(node, rec);
            trackedNodes.add(node);
          } else if (currentVal !== rec.lastSet) {
            // React updated this node with new English text
            rec = { original: currentVal, lastSet: currentVal };
            nodeRecords.set(node, rec);
          }

          const key = rec.original.trim();
          const cached = cache.get(key);
          if (cached) {
            applyTranslation(node, rec.original, cached);
          } else {
            const list = missingMap.get(key) ?? [];
            list.push(node);
            missingMap.set(key, list);
          }
        }

        const missingKeys = Array.from(missingMap.keys());
        if (missingKeys.length === 0) return;

        // Chunk missing keys into ~1100-char batches
        const batches: string[][] = [];
        let currentBatch: string[] = [];
        let currentLen = 0;

        for (const key of missingKeys) {
          if (currentBatch.length >= 25 || (currentLen + key.length > 1100 && currentBatch.length > 0)) {
            batches.push(currentBatch);
            currentBatch = [];
            currentLen = 0;
          }
          currentBatch.push(key);
          currentLen += key.length + 1;
        }
        if (currentBatch.length > 0) batches.push(currentBatch);

        // Process batches in parallel (3 at a time)
        for (let i = 0; i < batches.length; i += 3) {
          if (cancelled || activeLangRef.current !== lang) break;
          const slice = batches.slice(i, i + 3);
          const results = await Promise.all(slice.map(b => fetchTranslations(b, lang)));
          if (cancelled || activeLangRef.current !== lang) break;

          let addedToCache = false;
          for (const resMap of results) {
            resMap.forEach((translated, key) => {
              cache.set(key, translated);
              addedToCache = true;
              const targetNodes = missingMap.get(key) ?? [];
              for (const n of targetNodes) {
                if (n.isConnected) {
                  const rec = nodeRecords.get(n);
                  if (rec) applyTranslation(n, rec.original, translated);
                }
              }
            });
          }
          if (addedToCache) saveLangCache(lang, cache);
        }
      } finally {
        isTranslating = false;
      }
    };

    // Initial run after route render settles
    const initTimer = setTimeout(() => {
      void runTranslation();
    }, 60);

    // Observe dynamic DOM updates (tabs, modals, results, lazy content)
    const observer = new MutationObserver(() => {
      if (cancelled || isTranslating) return;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        void runTranslation();
      }, 250);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      cancelled = true;
      clearTimeout(initTimer);
      if (debounceTimer) clearTimeout(debounceTimer);
      observer.disconnect();
    };
  }, [lang, pathname]);

  return null;
}
