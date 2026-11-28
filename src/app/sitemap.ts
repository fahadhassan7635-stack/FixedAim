import type { MetadataRoute } from 'next';
import { withLangPath } from '@/lib/i18n';
import { ALL_LANGS, buildHreflangLanguages, SITE_URL } from '@/lib/seo-i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-11-27');

  const highPriorityTools = [
    '/cps-test',
    '/typing-test',
    '/reaction-time',
    '/aim-trainer',
    '/3d-aim-trainer',
    '/key-visualizer',
    '/spacebar',
    '/double-click',
    '/scroll-test',
    '/mouse-accuracy',
    '/accuracy',
    '/internet-speed',
    '/speaker-test',
    '/dead-pixel-test',
    '/hz-test',
    '/memory-test',
    '/space-defense',
    '/voyager-game',
    '/f1-reaction',
    '/cps-rush',
    '/apm-drill',
    '/space-waves',
  ];

  const hubPages = [
    '/mouse',
    '/keyboard',
    '/aim',
    '/games',
    '/device',
    '/benchmark',
  ];

  const editorialPages: Array<{
    path: string;
    changeFrequency: 'weekly' | 'monthly';
    priorityEn: number;
    priorityLocalized: number;
  }> = [
    { path: '/blog', changeFrequency: 'weekly', priorityEn: 0.7, priorityLocalized: 0.65 },
    { path: '/contact', changeFrequency: 'monthly', priorityEn: 0.4, priorityLocalized: 0.35 },
    { path: '/privacy-policy', changeFrequency: 'monthly', priorityEn: 0.3, priorityLocalized: 0.25 },
    { path: '/terms', changeFrequency: 'monthly', priorityEn: 0.3, priorityLocalized: 0.25 },
  ];

  const localizedHomeEntries: MetadataRoute.Sitemap = ALL_LANGS.map((lang) => ({
    url: `${SITE_URL}${withLangPath('/', lang)}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: lang === 'en' ? 1.0 : 0.9,
    alternates: {
      languages: buildHreflangLanguages('/'),
    },
  }));

  const localizedToolEntries: MetadataRoute.Sitemap = highPriorityTools.flatMap((path) =>
    ALL_LANGS.map((lang) => ({
      url: `${SITE_URL}${withLangPath(path, lang)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: lang === 'en' ? 0.9 : 0.85,
      alternates: {
        languages: buildHreflangLanguages(path),
      },
    }))
  );

  const localizedHubEntries: MetadataRoute.Sitemap = hubPages.flatMap((path) =>
    ALL_LANGS.map((lang) => ({
      url: `${SITE_URL}${withLangPath(path, lang)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: lang === 'en' ? 0.8 : 0.75,
      alternates: {
        languages: buildHreflangLanguages(path),
      },
    }))
  );

  const localizedEditorialEntries: MetadataRoute.Sitemap = editorialPages.flatMap(
    ({ path, changeFrequency, priorityEn, priorityLocalized }) =>
      ALL_LANGS.map((lang) => ({
        url: `${SITE_URL}${withLangPath(path, lang)}`,
        lastModified: now,
        changeFrequency,
        priority: lang === 'en' ? priorityEn : priorityLocalized,
        alternates: {
          languages: buildHreflangLanguages(path),
        },
      }))
  );

  return [
    ...localizedHomeEntries,
    ...localizedToolEntries,
    ...localizedHubEntries,
    ...localizedEditorialEntries,
  ];
}
