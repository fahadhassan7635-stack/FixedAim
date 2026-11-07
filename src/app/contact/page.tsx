import type { Metadata } from 'next';
import ContactPage from '@/views/ContactPage';

export const metadata: Metadata = {
  title: "Contact Us - Feedback, Inquiries & Support | FixedAim",
  description: "Have questions, suggestions, or bug reports? Contact the FixedAim team to get support, share feedback, or inquire about our free gaming benchmark suite.",
  alternates: {
    canonical: "https://fixedaim.com/contact",
  },
  openGraph: {
    title: "Contact Us - Feedback, Inquiries & Support | FixedAim",
    description: "Have questions, suggestions, or bug reports? Contact the FixedAim team to get support, share feedback, or inquire about our free gaming benchmark suite.",
    url: "https://fixedaim.com/contact",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Feedback, Inquiries & Support | FixedAim",
    description: "Have questions, suggestions, or bug reports? Contact the FixedAim team to get support, share feedback, or inquire about our free gaming benchmark suite.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <ContactPage />;
}
