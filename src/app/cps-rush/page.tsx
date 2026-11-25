import type { Metadata } from 'next';
import CpsRush from '@/views/CpsRush';

export const metadata: Metadata = {
  title: "CPS Rush - Click Speed Platformer Game | FixedAim",
  description: "Play CPS Rush online — power your runner's speed and jump height with your CPS. Master jitter clicking and butterfly clicking in this intense click speed game.",
  alternates: {
    canonical: "https://fixedaim.com/cps-rush",
  },
  openGraph: {
    title: "CPS Rush - Click Speed Platformer Game | FixedAim",
    description: "Play CPS Rush online — power your runner's speed and jump height with your CPS. Master jitter clicking and butterfly clicking in this intense click speed game.",
    url: "https://fixedaim.com/cps-rush",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPS Rush - Click Speed Platformer Game | FixedAim",
    description: "Play CPS Rush online — power your runner's speed and jump height with your CPS. Master jitter clicking and butterfly clicking in this intense click speed game.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <CpsRush />;
}
