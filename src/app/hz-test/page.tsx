import type { Metadata } from 'next';
import HzTestPage from '@/views/HzTestPage';

export const metadata: Metadata = {
  title: "Screen Refresh Rate (Hz) & Page Speed Test Online | FixedAim",
  description: "Free online screen refresh rate (Hz) test and page speed audit. Test monitor Hz, FPS, input delay, reaction time, Core Web Vitals, and CPU performance.",
  keywords: [
    "hz test",
    "screen refresh rate test",
    "monitor hz test",
    "144hz test",
    "240hz test",
    "ufo test",
    "page speed test",
    "fps test",
    "input delay test",
    "core web vitals test",
  ],
  alternates: {
    canonical: "https://fixedaim.com/hz-test",
  },
  openGraph: {
    title: "Screen Refresh Rate (Hz) & Page Speed Test Online | FixedAim",
    description: "Free online screen refresh rate (Hz) test and page speed audit. Test monitor Hz, FPS, input delay, reaction time, Core Web Vitals, and CPU performance.",
    url: "https://fixedaim.com/hz-test",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Screen Refresh Rate (Hz) & Page Speed Test Online | FixedAim",
    description: "Free online screen refresh rate (Hz) test and page speed audit. Test monitor Hz, FPS, input delay, reaction time, Core Web Vitals, and CPU performance.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <HzTestPage />;
}
