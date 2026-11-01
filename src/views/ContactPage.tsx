"use client";

import Link from 'next/link';
import { useEffect } from 'react';

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact Us | FixedAim';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get in touch with the FixedAim team. Have questions, feedback, or a bug report? We typically respond within 1–3 business days.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Get in touch with the FixedAim team. Have questions, feedback, or a bug report? We typically respond within 1–3 business days.';
      document.head.appendChild(meta);
    }
    return () => {
      document.title = 'Fixed Aim – Free CPS Test, Aim Trainer & Gaming Tools';
    };
  }, []);

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 1.5rem', color: '#000000' }}>
      <Link href="/" className="btn" style={{
        background: '#FFE033',
        color: '#000000',
        textDecoration: 'none',
        fontSize: '0.85rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '2rem',
        fontWeight: 900,
        padding: '8px 16px',
        border: '3px solid #000000',
        boxShadow: '3px 3px 0 0 #000000',
      }}>
        ← BACK TO HOME
      </Link>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="section-label">GET IN TOUCH</div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#000000', textTransform: 'uppercase' }}>
          CONTACT US
        </h1>
        <p style={{ color: '#2D3436', fontWeight: 600, lineHeight: '1.7', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
          Have a question, bug report, or feedback about our tools? We'd love to hear from you.
        </p>
      </div>

      {/* Email Card */}
      <div className="card" style={{
        background: '#FFFFFF',
        border: '3px solid #000000',
        boxShadow: '6px 6px 0 0 #000000',
        padding: '2rem',
        textAlign: 'center',
        marginBottom: '1.75rem',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📧</div>
        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#485460', marginBottom: '0.5rem', fontWeight: 800 }}>
          OFFICIAL SUPPORT EMAIL
        </div>
        <a
          href="mailto:supportfixedaim@gmail.com"
          style={{
            fontSize: '1.35rem',
            fontWeight: 900,
            color: '#000000',
            textDecoration: 'underline',
            background: '#FFE033',
            padding: '4px 10px',
            border: '2px solid #000000',
            display: 'inline-block',
            boxShadow: '3px 3px 0 0 #000000',
          }}
        >
          supportfixedaim@gmail.com
        </a>
        <p style={{ color: '#485460', fontSize: '0.88rem', marginTop: '1rem', marginBottom: 0, fontWeight: 600 }}>
          We typically respond within 1–3 business days.
        </p>
      </div>

      {/* What to include */}
      <div className="card" style={{
        background: '#FFFDF5',
        border: '3px solid #000000',
        boxShadow: '6px 6px 0 0 #000000',
        padding: '2rem',
        marginBottom: '1.75rem'
      }}>
        <h2 style={{ color: '#000000', fontSize: '1.15rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem', marginTop: 0, borderBottom: '2px solid #000', paddingBottom: '4px', display: 'inline-block' }}>
          💡 WHAT TO INCLUDE IN YOUR MESSAGE
        </h2>
        <ul style={{ color: '#1E272E', fontWeight: 600, paddingLeft: '1.25rem', lineHeight: '2', margin: 0, fontSize: '0.95rem' }}>
          <li>Your browser and operating system (e.g. Chrome on Windows 11)</li>
          <li>The tool or page where you experienced the issue</li>
          <li>A brief description of the problem or suggestion</li>
          <li>Any screenshots if relevant</li>
        </ul>
      </div>

      {/* Topics grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { icon: '🐛', title: 'Bug Reports', desc: 'Found something broken? Let us know immediately.' },
          { icon: '💬', title: 'Feedback', desc: 'Suggestions to sharpen and improve our tools.' },
          { icon: '🤝', title: 'Partnerships', desc: 'Collaboration or tournament sponsorships.' },
          { icon: '⚖️', title: 'Legal & Privacy', desc: 'DMCA, data inquiries, or policy requests.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="card" style={{
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '4px 4px 0 0 #000000',
            padding: '1.25rem',
          }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>{icon}</div>
            <div style={{ color: '#000000', fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{title}</div>
            <div style={{ color: '#2D3436', fontSize: '0.85rem', fontWeight: 500, lineHeight: '1.5' }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p style={{ color: '#485460', fontSize: '0.85rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.7' }}>
        Fixed Aim is a free, independent platform. We appreciate your feedback and use it to build better tools for everyone. ⚡
      </p>
    </div>
  );
}
