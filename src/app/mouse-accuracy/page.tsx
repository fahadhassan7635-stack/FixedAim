import type { Metadata } from 'next';
import MouseAccuracyPage from '@/views/MouseAccuracyPage';

export const metadata: Metadata = {
  title: "Mouse Accuracy Test - Aim Precision & DPI Tracker | FixedAim",
  description: "Measure your mouse tracking precision, cursor tremor, and path efficiency. Discover your ideal DPI setting and elevate your gaming aim consistency online.",
  alternates: {
    canonical: "https://fixedaim.com/mouse-accuracy",
  },
  openGraph: {
    title: "Mouse Accuracy Test - Aim Precision & DPI Tracker | FixedAim",
    description: "Measure your mouse tracking precision, cursor tremor, and path efficiency. Discover your ideal DPI setting and elevate your gaming aim consistency online.",
    url: "https://fixedaim.com/mouse-accuracy",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mouse Accuracy Test - Aim Precision & DPI Tracker | FixedAim",
    description: "Measure your mouse tracking precision, cursor tremor, and path efficiency. Discover your ideal DPI setting and elevate your gaming aim consistency online.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <MouseAccuracyPage />;
}
