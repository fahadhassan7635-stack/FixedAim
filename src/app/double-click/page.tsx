import type { Metadata } from 'next';
import DoubleClickPage from '@/views/DoubleClickPage';

export const metadata: Metadata = {
  title: "Mouse Double Click Test - Detect Switch Chatter | FixedAim",
  description: "Test your mouse switches for accidental double-clicking defects. Detect faulty microswitches in real time and verify debounce timings with live diagnostics.",
  alternates: {
    canonical: "https://fixedaim.com/double-click",
  },
  openGraph: {
    title: "Mouse Double Click Test - Detect Switch Chatter | FixedAim",
    description: "Test your mouse switches for accidental double-clicking defects. Detect faulty microswitches in real time and verify debounce timings with live diagnostics.",
    url: "https://fixedaim.com/double-click",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mouse Double Click Test - Detect Switch Chatter | FixedAim",
    description: "Test your mouse switches for accidental double-clicking defects. Detect faulty microswitches in real time and verify debounce timings with live diagnostics.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <DoubleClickPage />;
}
