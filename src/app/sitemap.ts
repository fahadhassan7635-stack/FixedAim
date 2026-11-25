import type { MetadataRoute } from 'next';

const SITE_URL = 'https://fixedaim.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-11-25');

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

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...highPriorityTools.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...hubPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  return entries;
}
