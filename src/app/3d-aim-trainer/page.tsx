import type { Metadata } from 'next';
import AimTrainer3D from '@/views/3DAimTrainer';

export const metadata: Metadata = {
  title: "3D Aim Trainer - Free Browser FPS Aim Practice | FixedAim",
  description: "Practice flicking, tracking, and target precision in a true 3D spatial FPS environment online. Boost your aim in Valorant, CS2, and Apex with zero download.",
  alternates: {
    canonical: "https://fixedaim.com/3d-aim-trainer",
  },
  openGraph: {
    title: "3D Aim Trainer - Free Browser FPS Aim Practice | FixedAim",
    description: "Practice flicking, tracking, and target precision in a true 3D spatial FPS environment online. Boost your aim in Valorant, CS2, and Apex with zero download.",
    url: "https://fixedaim.com/3d-aim-trainer",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Aim Trainer - Free Browser FPS Aim Practice | FixedAim",
    description: "Practice flicking, tracking, and target precision in a true 3D spatial FPS environment online. Boost your aim in Valorant, CS2, and Apex with zero download.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <AimTrainer3D />;
}
