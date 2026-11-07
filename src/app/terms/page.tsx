import type { Metadata } from 'next';
import TermsPage from '@/views/TermsPage';

export const metadata: Metadata = {
  title: "Terms of Service - User Agreement & Rules | FixedAim",
  description: "Read the FixedAim Terms of Service. Understand the rules, user agreements, and acceptable use policies governing our free online gaming benchmark tools.",
  alternates: {
    canonical: "https://fixedaim.com/terms",
  },
  openGraph: {
    title: "Terms of Service - User Agreement & Rules | FixedAim",
    description: "Read the FixedAim Terms of Service. Understand the rules, user agreements, and acceptable use policies governing our free online gaming benchmark tools.",
    url: "https://fixedaim.com/terms",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service - User Agreement & Rules | FixedAim",
    description: "Read the FixedAim Terms of Service. Understand the rules, user agreements, and acceptable use policies governing our free online gaming benchmark tools.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <TermsPage />;
}
