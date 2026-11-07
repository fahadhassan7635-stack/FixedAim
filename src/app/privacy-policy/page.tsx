import type { Metadata } from 'next';
import PrivacyPolicy from '@/views/PrivacyPolicy';

export const metadata: Metadata = {
  title: "Privacy Policy - Data Protection & Security | FixedAim",
  description: "Read the FixedAim Privacy Policy to understand how we collect, use, and protect your information across our free gaming benchmark and reflex test platform.",
  alternates: {
    canonical: "https://fixedaim.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - Data Protection & Security | FixedAim",
    description: "Read the FixedAim Privacy Policy to understand how we collect, use, and protect your information across our free gaming benchmark and reflex test platform.",
    url: "https://fixedaim.com/privacy-policy",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Data Protection & Security | FixedAim",
    description: "Read the FixedAim Privacy Policy to understand how we collect, use, and protect your information across our free gaming benchmark and reflex test platform.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <PrivacyPolicy />;
}
