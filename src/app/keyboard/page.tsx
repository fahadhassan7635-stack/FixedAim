import type { Metadata } from 'next';
import KeyboardPage from '@/views/KeyboardPage';

export const metadata: Metadata = {
  title: "Keyboard Testing Tools - WPM, NKRO & Accuracy | FixedAim",
  description: "Test and benchmark your keyboard performance online. Free typing speed tests, N-Key Rollover ghosting detector, spacebar counter, and accuracy drills.",
  alternates: {
    canonical: "https://fixedaim.com/keyboard",
  },
  openGraph: {
    title: "Keyboard Testing Tools - WPM, NKRO & Accuracy | FixedAim",
    description: "Test and benchmark your keyboard performance online. Free typing speed tests, N-Key Rollover ghosting detector, spacebar counter, and accuracy drills.",
    url: "https://fixedaim.com/keyboard",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keyboard Testing Tools - WPM, NKRO & Accuracy | FixedAim",
    description: "Test and benchmark your keyboard performance online. Free typing speed tests, N-Key Rollover ghosting detector, spacebar counter, and accuracy drills.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <KeyboardPage />;
}
