import type { Metadata } from 'next';
import SpeakerTestPage from '@/views/SpeakerTestPage';

export const metadata: Metadata = {
  title: "Speaker Test Online – Left, Right, Bass & Frequency Check | FixedAim",
  description: "Free online speaker test. Check left and right channels, bass, frequency sweep, pink noise and phase in seconds. Works for speakers and headphones.",
  keywords: [
    "speaker test",
    "online speaker test",
    "left right speaker test",
    "stereo test",
    "headphone test",
    "bass test",
    "subwoofer test",
    "sound test",
    "frequency test",
    "tone generator",
    "pink noise",
    "phase test",
    "free audio test",
  ],
  alternates: {
    canonical: "https://fixedaim.com/speaker-test",
  },
  openGraph: {
    title: "Speaker Test Online – Left, Right, Bass & Frequency Check | FixedAim",
    description: "Free online speaker test for left and right channels, bass, frequency sweep, noise and phase. No sign-up.",
    url: "https://fixedaim.com/speaker-test",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speaker Test Online – Left, Right, Bass & Frequency Check | FixedAim",
    description: "Free online speaker test. Check stereo channels, bass, frequency range and phase.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <SpeakerTestPage />;
}
