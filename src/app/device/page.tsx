import type { Metadata } from 'next';
import DevicePage from '@/views/DevicePage';

export const metadata: Metadata = {
  title: "Device Test & Hardware Diagnostics Hub | FixedAim",
  description: "Test your PC, monitor, laptop, and smartphone hardware online. Free tests for screen refresh rate (Hz), dead pixels, speakers, mic, mouse, and keyboard.",
  keywords: [
    "device test",
    "hardware test",
    "screen test",
    "monitor test",
    "hz test",
    "speaker test",
    "mouse test",
    "keyboard test",
    "pc diagnostics online",
    "hardware diagnostics",
  ],
  alternates: {
    canonical: "https://fixedaim.com/device",
  },
  openGraph: {
    title: "Device Test & Hardware Diagnostics Hub | FixedAim",
    description: "Test your PC, monitor, laptop, and smartphone hardware online. Free tests for screen refresh rate (Hz), dead pixels, speakers, mic, mouse, and keyboard.",
    url: "https://fixedaim.com/device",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Device Test & Hardware Diagnostics Hub | FixedAim",
    description: "Test your PC, monitor, laptop, and smartphone hardware online. Free tests for screen refresh rate (Hz), dead pixels, speakers, mic, mouse, and keyboard.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <DevicePage />;
}
