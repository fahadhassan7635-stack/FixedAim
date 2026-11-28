"use client";
import { usePageI18n } from '../lib/page-i18n';
import pageDict from '../locales/pages/TermsPage.json';

import Link from 'next/link';
import { useLang } from '../contexts/LanguageContext';

export default function TermsPage() {
  const { tr } = usePageI18n(pageDict);
  const { localeHref } = useLang();


  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem', color: 'var(--text-primary)', lineHeight: '1.8' }}>
      <Link href={localeHref("/")} style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: '600' }}>
        {tr("← Back to Home\r\n      ")}</Link>

      <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        {tr("Terms of Service\r\n      ")}</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>{tr("Last updated: July 2026")}</p>

      <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>

        <p>
          {tr("Welcome to ")}<strong style={{ color: 'var(--text-primary)' }}>{tr("Fixed Aim")}</strong>{tr(", accessible\r\n          at")}{' '}
          <a href="https://fixedaim.com" style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>
            https://fixedaim.com
          </a>{tr(". By accessing or using our website, you agree to be bound by these Terms of Service.\r\n          Please read them carefully before using any of our tools or features.\r\n        ")}</p>
        <p>
          {tr("If you do not agree with any part of these terms, you must discontinue use of the website immediately.\r\n        ")}</p>

        {/* ── 1. Acceptance ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("1. Acceptance of Terms\r\n        ")}</h2>
        <p>
          {tr("By using Fixed Aim — including all tools, games, and content available on the website —\r\n          you confirm that you have read, understood, and agree to these Terms of Service, as well as\r\n          our")}{' '}
          <Link href={localeHref("/privacy-policy")} style={{ color: 'var(--neon-cyan)', textDecoration: 'none' }}>
            {tr("Privacy Policy\r\n          ")}</Link>{tr(". These terms apply to all visitors and users of the website.\r\n        ")}</p>

        {/* ── 2. Use of the Website ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("2. Use of the Website\r\n        ")}</h2>
        <p>{tr("Fixed Aim is provided free of charge for personal, non-commercial use. You agree to use the website only for lawful purposes. You must not:")}</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>{tr("Use auto-clickers, bots, scripts, or any automated tools to manipulate test results or leaderboard scores")}</li>
          <li>{tr("Attempt to exploit, reverse-engineer, or interfere with any part of the website")}</li>
          <li>{tr("Use the website in any way that could damage, disable, or overburden our servers or infrastructure")}</li>
          <li>{tr("Scrape, copy, or reproduce any content from the website without prior written permission")}</li>
          <li>{tr("Use the website for any illegal, harmful, or fraudulent activity")}</li>
        </ul>

        {/* ── 3. No Account Required ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("3. No Account Required\r\n        ")}</h2>
        <p>
          {tr("Fixed Aim does not require registration or login to use any of its tools. All features are\r\n          freely accessible without creating an account. Any scores or preferences saved locally in\r\n          your browser are stored on your device only and are not linked to any user profile.\r\n        ")}</p>

        {/* ── 4. Intellectual Property ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("4. Intellectual Property\r\n        ")}</h2>
        <p>
          {tr("All content on Fixed Aim — including but not limited to UI design, layout, graphics, tool\r\n          logic, game code, and written content — is the intellectual property of Fixed Aim and is\r\n          protected under applicable copyright laws. You may not reproduce, distribute, or create\r\n          derivative works from any part of this website without explicit written permission from\r\n          the site owner.\r\n        ")}</p>

        {/* ── 5. Disclaimer ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("5. Disclaimer of Warranties\r\n        ")}</h2>
        <p>
          {tr("Fixed Aim is provided on an ")}<strong style={{ color: 'var(--text-primary)'}}>{tr("\"as is\"")}</strong> {tr("and")}{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{tr("\"as available\"")}</strong> {tr("basis without any\r\n          warranties of any kind, either express or implied. We do not guarantee that:\r\n        ")}</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
          <li>{tr("The website will be available at all times without interruption")}</li>
          <li>{tr("Test results will be accurate across all devices, browsers, or network conditions")}</li>
          <li>{tr("The website will be free from errors, bugs, or security vulnerabilities")}</li>
        </ul>
        <p>
          {tr("Use of the website and reliance on any results is entirely at your own risk.\r\n        ")}</p>

        {/* ── 6. Limitation of Liability ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("6. Limitation of Liability\r\n        ")}</h2>
        <p>
          {tr("To the fullest extent permitted by law, Fixed Aim and its owner shall not be liable for\r\n          any direct, indirect, incidental, or consequential damages arising from your use of — or\r\n          inability to use — the website, its tools, or any content hosted on it.\r\n        ")}</p>

        {/* ── 7. Third-Party Links & Services ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("7. Third-Party Links & Services\r\n        ")}</h2>
        <p>
          {tr("Our website may contain links to third-party websites or display ads served by third-party\r\n          providers such as Google AdSense. These are governed by their own terms and privacy policies.\r\n          We have no control over and accept no responsibility for any third-party content, products,\r\n          or services.\r\n        ")}</p>

        {/* ── 8. Changes to Terms ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("8. Changes to These Terms\r\n        ")}</h2>
        <p>
          {tr("We reserve the right to update or modify these Terms of Service at any time. Any changes\r\n          will be posted on this page with an updated revision date. Continued use of the website\r\n          after changes are posted constitutes your acceptance of the revised terms. We encourage\r\n          you to review this page periodically.\r\n        ")}</p>

        {/* ── 9. Governing Law ── */}
        <h2 style={{ color: 'var(--neon-cyan)', marginTop: '2.5rem', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("9. Governing Law\r\n        ")}</h2>
        <p>
          {tr("These Terms of Service shall be governed by and construed in accordance with applicable\r\n          laws. Any disputes arising from the use of this website shall be subject to the exclusive\r\n          jurisdiction of the relevant courts.\r\n        ")}</p>

        <hr style={{ borderColor: 'var(--border)', margin: '2.5rem 0' }} />

        {/* ── Contact ── */}
        <h2 style={{ color: 'var(--neon-cyan)', fontSize: '1.3rem', fontWeight: '700' }}>
          {tr("Contact Us\r\n        ")}</h2>
        <p>
          {tr("If you have any questions about these Terms of Service, feel free to reach out.\r\n        ")}</p>

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
}

