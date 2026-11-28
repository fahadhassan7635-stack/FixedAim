"use client";

import { usePageI18n } from '../lib/page-i18n';
import pageDict from '../locales/pages/PrivacyPolicy.json';
import Link from 'next/link';
import { useLang } from '../contexts/LanguageContext';

const PrivacyPolicy = () => {
  const { tr } = usePageI18n(pageDict);
  const { localeHref } = useLang();


  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem', color: 'var(--text-primary)', lineHeight: '1.8' }}>
      <Link href={localeHref("/")} style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: '600' }}>
        {tr("← Back to Home\r\n      ")}</Link>

      <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        {tr("Privacy Policy\r\n      ")}</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>{tr("Last updated: July 2026")}</p>

      <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>

        <p>
          {tr("At ")}<strong style={{ color: 'var(--text-primary)' }}>{tr("Fixed Aim")}</strong>{tr(", accessible from")}{' '}
          <a href="https://fixedaim.com" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>https://fixedaim.com</a>{tr(",\r\n          one of our top priorities is the privacy of our visitors. This Privacy Policy document\r\n          describes what information we collect, how we use it, and what rights you have regarding your data.\r\n        ")}</p>
        <p>
          {tr("Fixed Aim is a completely free platform — no sign-up, no login, and no account is required\r\n          to use any of our tools. We do not collect any personal information from our visitors.\r\n        ")}</p>

        {/* ── 1. Information We Collect ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("1. Information We Collect\r\n        ")}</h2>
        <p>
          {tr("We do not require you to provide any personal information to use Fixed Aim. However, like\r\n          all websites, our hosting provider automatically records standard server log data when you\r\n          visit. This may include:\r\n        ")}</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>{tr("Internet Protocol (IP) address")}</li>
          <li>{tr("Browser type and version")}</li>
          <li>{tr("Operating system")}</li>
          <li>{tr("Internet Service Provider (ISP)")}</li>
          <li>{tr("Date and time of visit")}</li>
          <li>{tr("Referring and exit pages")}</li>
          <li>{tr("Number of page clicks")}</li>
        </ul>
        <p>
          {tr("We do not sell your personal information. Server logs may be processed by our hosting\r\n          provider only for security, maintenance, and legal compliance.\r\n        ")}</p>

        {/* ── 2. Local Data Storage ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("2. Local Data Storage\r\n        ")}</h2>
        <p>
          {tr("Some of our tools — such as the CPS Test, Aim Trainer, and arcade games — save your scores\r\n          and preferences locally in your browser using")}{' '}
          <code style={{ color: 'var(--neon-cyan)', background: 'rgba(0,245,255,0.08)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>localStorage</code>{tr(".\r\n          This data is stored entirely on your own device and is never transmitted to our servers.\r\n          You can clear it at any time by clearing your browser's site data.\r\n        ")}</p>

        {/* ── 3. Third-Party Services ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("3. Third-Party Services\r\n        ")}</h2>
        <p>{tr("We may use the following third-party services to help us understand site usage and support advertising:")}</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong style={{ color: 'var(--text-primary)' }}>{tr("Google Analytics")}</strong> {tr("— We configure\r\n            Google Analytics to help us understand website usage. Data is collected according to\r\n            Google's privacy practices and may include anonymized usage information.\r\n          ")}</li>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>{tr("Google AdSense")}</strong> {tr("— may display\r\n            relevant advertisements on our site. Google and its partners may use cookies to\r\n            personalize ads and measure advertising performance. You can opt out via")}{' '}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>
              {tr("Google's Ad Settings\r\n            ")}</a>.
          </li>
        </ul>
        <p>
          {tr("These services operate under their own privacy policies. We have no control over and assume\r\n          no responsibility for their data practices.\r\n        ")}</p>

        {/* ── 4. Cookies ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("4. Cookies\r\n        ")}</h2>
        <p>
          {tr("Fixed Aim may use cookies and similar technologies to improve functionality, remember\r\n          preferences, analyze traffic, and support advertising through third-party services such\r\n          as Google AdSense and Google Analytics.\r\n        ")}</p>
        <p>
          {tr("You can disable cookies through your browser settings at any time. Note that disabling\r\n          cookies may affect the functionality of some features on the site.\r\n        ")}</p>

        {/* ── 5. Children's Privacy ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("5. Children's Privacy\r\n        ")}</h2>
        <p>
          {tr("Fixed Aim does not knowingly collect any personal information from children under the age of 13.\r\n          Our tools are general-purpose gaming utilities suitable for all ages. Since no account or\r\n          personal data is required, children can use our tools safely. If you believe a child has\r\n          somehow submitted personal information to us, please contact us and we will promptly\r\n          remove it.\r\n        ")}</p>

        {/* ── 6. Your Rights ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("6. Your Rights\r\n        ")}</h2>
        <p>
          {tr("Since we do not collect or store personal data, there is very little data to manage.\r\n          However, you always have the right to:\r\n        ")}</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>{tr("Clear your locally stored scores and preferences via your browser settings")}</li>
          <li>
            {tr("Opt out of Google Analytics via the")}{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>
              {tr("Google Analytics Opt-out Add-on\r\n            ")}</a>
          </li>
          <li>{tr("Contact us with any privacy-related concerns or questions")}</li>
        </ul>

        {/* ── 7. Changes ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("7. Changes to This Policy\r\n        ")}</h2>
        <p>
          {tr("We may update this Privacy Policy from time to time. Any changes will be reflected on this\r\n          page with an updated revision date. We encourage you to review this page periodically.\r\n          Continued use of the website after any changes constitutes your acceptance of the updated policy.\r\n        ")}</p>

        {/* ── 8. Cookies (AdSense requirement) ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("8. Consent\r\n        ")}</h2>
        <p>
          {tr("By using Fixed Aim, you agree to this Privacy Policy.\r\n        ")}</p>

        <hr style={{ borderColor: 'var(--border)', margin: '2.5rem 0' }} />

        {/* ── Contact ── */}
        <h2 style={{ color: 'var(--neon-cyan)', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("Contact Us\r\n        ")}</h2>
        <p>
          {tr("Have a question or concern about this Privacy Policy? We're happy to help.\r\n        ")}</p>

        <div style={{
          background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px',
          marginTop: '1rem', border: '1px solid var(--border)'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
            <strong>{tr("Website:")}</strong>{' '}
            <a href="https://fixedaim.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>
              {tr("fixedaim.com\r\n            ")}</a>
          </p>
          <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
            <strong>{tr("Email:")}</strong>{' '}
            <a href="mailto:supportfixedaim@gmail.com" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>
              {tr("supportfixedaim@gmail.com\r\n            ")}</a>
          </p>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            <strong>{tr("Response Time:")}</strong> {tr("We typically respond within 1–3 business days.\r\n          ")}</p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
