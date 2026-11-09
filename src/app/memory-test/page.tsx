import type { Metadata } from 'next';
import MemoryTestPage from '@/views/MemoryTestPage';

export const metadata: Metadata = {
  title: "Free Online Memory Test: 4 Brain Games to Train Memory | FixedAim",
  description: "Take the free memory test on FixedAim. Play four online memory games: card match, pattern echo, number span and spatial recall. Track your best scores and train your focus.",
  keywords: [
    "memory test",
    "online memory test",
    "free memory test",
    "brain games",
    "memory games",
    "short term memory test",
    "visual memory test",
    "pattern echo game",
    "number span test",
    "spatial recall test",
    "card match game",
    "working memory test",
    "focus trainer",
    "brain test"
  ],
  alternates: {
    canonical: "https://fixedaim.com/memory-test",
  },
  openGraph: {
    title: "Free Online Memory Test: 4 Brain Games to Train Memory | FixedAim",
    description: "Four free memory games with three difficulty levels. Test short-term, visual and sequence memory and beat your best score.",
    url: "https://fixedaim.com/memory-test",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Memory Test: 4 Brain Games to Train Memory | FixedAim",
    description: "Four free memory games with three difficulty levels. Test short-term, visual and sequence memory and beat your best score.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <MemoryTestPage />;
}
