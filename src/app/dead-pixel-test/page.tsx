import type { Metadata } from 'next';
import DeadPixelTestPage from '@/views/DeadPixelTestPage';

export const metadata: Metadata = {
  title: "Dead Pixel Test - Check Stuck, Hot & Dead Screen Pixels | FixedAim",
  description: "Free online dead pixel test for monitors, laptops, and phones. Inspect stuck, hot, and dead pixels with solid color screens and a built-in pixel fixer.",
  keywords: [
    "dead pixel test",
    "stuck pixel test",
    "screen pixel test",
    "monitor test",
    "dead pixel checker",
    "hot pixel test",
    "pixel fixer online",
    "oled dead pixel test",
    "display test",
    "screen color test",
  ],
  alternates: {
    canonical: "https://fixedaim.com/dead-pixel-test",
  },
  openGraph: {
    title: "Dead Pixel Test - Check Stuck, Hot & Dead Screen Pixels | FixedAim",
    description: "Free online dead pixel test for monitors, laptops, and phones. Inspect stuck, hot, and dead pixels with solid color screens and a built-in pixel fixer.",
    url: "https://fixedaim.com/dead-pixel-test",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dead Pixel Test - Check Stuck, Hot & Dead Screen Pixels | FixedAim",
    description: "Free online dead pixel test for monitors, laptops, and phones. Inspect stuck, hot, and dead pixels with solid color screens and a built-in pixel fixer.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <DeadPixelTestPage />;
}
