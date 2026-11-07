import type { Metadata } from 'next';
import BlogPage from '@/views/BlogPage';

export const metadata: Metadata = {
  title: "FixedAim Blog - Gaming Guides, Reflex Tips & Benchmark Updates",
  description: "Explore pro gaming guides, reflex improvement strategies, hardware calibration tips, and benchmark updates from the esports engineering team at FixedAim.",
  alternates: {
    canonical: "https://fixedaim.com/blog",
  },
  openGraph: {
    title: "FixedAim Blog - Gaming Guides, Reflex Tips & Benchmark Updates",
    description: "Explore pro gaming guides, reflex improvement strategies, hardware calibration tips, and benchmark updates from the esports engineering team at FixedAim.",
    url: "https://fixedaim.com/blog",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FixedAim Blog - Gaming Guides, Reflex Tips & Benchmark Updates",
    description: "Explore pro gaming guides, reflex improvement strategies, hardware calibration tips, and benchmark updates from the esports engineering team at FixedAim.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <BlogPage />;
}
