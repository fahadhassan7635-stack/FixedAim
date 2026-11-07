import type { Metadata } from 'next';
import MousePage from '@/views/MousePage';

export const metadata: Metadata = {
  title: "Mouse Testing Tools - CPS, Scroll & Double-Click | FixedAim",
  description: "Test your mouse switch latency, double-click chatter, scroll wheel speed, and clicking speed (CPS). Free browser diagnostics for competitive gamers.",
  alternates: {
    canonical: "https://fixedaim.com/mouse",
  },
  openGraph: {
    title: "Mouse Testing Tools - CPS, Scroll & Double-Click | FixedAim",
    description: "Test your mouse switch latency, double-click chatter, scroll wheel speed, and clicking speed (CPS). Free browser diagnostics for competitive gamers.",
    url: "https://fixedaim.com/mouse",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mouse Testing Tools - CPS, Scroll & Double-Click | FixedAim",
    description: "Test your mouse switch latency, double-click chatter, scroll wheel speed, and clicking speed (CPS). Free browser diagnostics for competitive gamers.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <MousePage />;
}
