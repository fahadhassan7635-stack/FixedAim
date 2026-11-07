import type { Metadata } from 'next';
import AimPage from '@/views/AimPage';

export const metadata: Metadata = {
  title: "Aim & Reaction Tools - Free Reflex Trainers | FixedAim",
  description: "Improve your flicking, tracking, and reaction times with free browser aim trainers. Benchmark your FPS reflexes and motor precision with zero download.",
  alternates: {
    canonical: "https://fixedaim.com/aim",
  },
  openGraph: {
    title: "Aim & Reaction Tools - Free Reflex Trainers | FixedAim",
    description: "Improve your flicking, tracking, and reaction times with free browser aim trainers. Benchmark your FPS reflexes and motor precision with zero download.",
    url: "https://fixedaim.com/aim",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aim & Reaction Tools - Free Reflex Trainers | FixedAim",
    description: "Improve your flicking, tracking, and reaction times with free browser aim trainers. Benchmark your FPS reflexes and motor precision with zero download.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <AimPage />;
}
