import type { Metadata } from 'next';
import AccuracyTestPage from '@/views/AccuracyTestPage';

export const metadata: Metadata = {
  title: "Keyboard Accuracy Test - Stop Typos & Track Errors | FixedAim",
  description: "Test and improve your keyboard typing precision with our free Keyboard Accuracy Test. Track per-key error rates and eliminate typos with actionable data.",
  alternates: {
    canonical: "https://fixedaim.com/accuracy",
  },
  openGraph: {
    title: "Keyboard Accuracy Test - Stop Typos & Track Errors | FixedAim",
    description: "Test and improve your keyboard typing precision with our free Keyboard Accuracy Test. Track per-key error rates and eliminate typos with actionable data.",
    url: "https://fixedaim.com/accuracy",
    siteName: "FixedAim",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keyboard Accuracy Test - Stop Typos & Track Errors | FixedAim",
    description: "Test and improve your keyboard typing precision with our free Keyboard Accuracy Test. Track per-key error rates and eliminate typos with actionable data.",
    images: ["/og-image.jpg"],
  },
};

export default function Page() {
  return <AccuracyTestPage />;
}
