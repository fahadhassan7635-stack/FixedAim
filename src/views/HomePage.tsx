"use client";

import Link from 'next/link';

import { useEffect, useState } from 'react';


const tools = [
  { to: '/typing-test', icon: '⌨️', name: 'Typing Speed', tag: 'WPM Test', accent: 'var(--neon-cyan)' },
  { to: '/cps-test', icon: '🖱️', name: 'CPS Test', tag: 'Click Speed', accent: 'var(--neon-green)' },
  { to: '/reaction-time', icon: '⚡', name: 'Reaction Time', tag: 'Reflex Test', accent: 'var(--neon-orange)' },
  { to: '/aim-trainer', icon: '🎯', name: '2D Aim Trainer', tag: 'FPS Skills', accent: 'var(--neon-red)' },
  { to: '/spacebar', icon: '▭', name: 'Spacebar Counter', tag: 'Key Smash', accent: 'var(--neon-cyan)' },
  { to: '/key-visualizer', icon: '👁️', name: 'Key Visualizer', tag: 'Real-Time', accent: 'var(--neon-purple)' },
  { to: '/double-click', icon: '🖱️', name: 'Double Click', tag: 'Mouse Test', accent: 'var(--neon-green)' },
  { to: '/accuracy', icon: '📏', name: 'Accuracy Test', tag: 'Precision', accent: 'var(--neon-yellow)' },
  { to: '/scroll-test', icon: '↕️', name: 'Scroll Test', tag: 'Scroll Speed', accent: 'var(--neon-cyan)' },
  { to: '/mouse-accuracy', icon: '🖲️', name: 'Mouse Accuracy', tag: 'Tracking', accent: 'var(--neon-green)' },
  { to: '/3d-aim-trainer', icon: '🎯', name: '3D Aim Trainer', tag: 'Full 3D Aim', accent: 'var(--neon-red)' },
  { to: '/space-defense', icon: '🚀', name: 'Space Defense', tag: 'Skill Game', accent: 'var(--neon-purple)' },
  { to: '/voyager-game', icon: '🌌', name: 'Voyager Game', tag: 'Endless', accent: 'var(--neon-cyan)' },
  { to: '/cps-rush', icon: '💥', name: 'CPS Rush', tag: 'Speed Rush', accent: 'var(--neon-red)' },
  { to: '/space-waves', icon: '🌊', name: 'Space Waves', tag: 'Dodge Game', accent: 'var(--neon-cyan)' },
  { to: '/apm-drill', icon: '⚡', name: 'APM Drill', tag: 'Speed Drill', accent: 'var(--neon-cyan)' },
  { to: '/f1-reaction', icon: '🏎️', name: 'F1 Reaction Test', tag: 'Racing Reflex', accent: 'var(--neon-orange)' },
];

export default function HomePage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 0.5rem', paddingBottom: '3rem' }}>

      {/* ── 1. HERO SECTION — CANONICAL NEUBRUTALISM SHOWCASE ── */}
      <section className="hero-section" style={{
        position: 'relative',
      }}>
        <div className="hero-grid">
          
          {/* Left Hero Column */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              background: '#FF6B6B',
              border: '3px solid #000000',
              boxShadow: '3px 3px 0 0 #000000',
              fontSize: '0.8rem',
              fontWeight: 900,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1.5rem',
            }}>
              <span className="hero-pulse-dot" style={{ background: '#000000', boxShadow: 'none' }} />
              EST. 2026 // FIXED AIM 2.0
            </div>

            <h1 style={{
              fontSize: 'clamp(2.75rem, 7.5vw, 5.8rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#000000',
              marginBottom: '1.25rem',
              fontFamily: "'Public Sans', 'Barlow Condensed', 'Arial Black', sans-serif"
            }}>
              TEST.<br />
              TRAIN.<br />
              DOMINATE.
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#000000',
              fontWeight: 600,
              maxWidth: '520px',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}>
              The definitive gaming benchmark platform that refuses to be invisible. 17 high-precision tools. Zero sign-up. Pure raw performance.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/cps-test" className="btn btn-primary" style={{
                background: '#FF6B6B',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0 0 #000000',
                fontSize: '1.05rem',
                padding: '14px 28px',
                fontWeight: 900,
              }}>
                ⚡ START CPS TEST
              </Link>
              <Link href="/typing-test" className="btn btn-secondary" style={{
                background: '#74B9FF',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0 0 #000000',
                fontSize: '1.05rem',
                padding: '14px 28px',
                fontWeight: 900,
              }}>
                ⌨️ TYPING SPEED
              </Link>
              <button 
                onClick={() => {
                  const element = document.getElementById('all-tools');
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="btn"
                style={{
                  background: '#FFFFFF',
                  color: '#000000',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0 0 #000000',
                  fontSize: '0.95rem',
                  padding: '13px 20px',
                  fontWeight: 800,
                }}
              >
                VIEW ALL 17 TOOLS ↓
              </button>
            </div>
          </div>

          {/* Right Hero Column — 3 Tilted Sticker Cards directly matching user reference image */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 0' }}>
            
            {/* Sticker 1: 3D Aim Trainer Button (Black Card) */}
            <Link
              href="/3d-aim-trainer"
              className="hero-sticker-btn"
              style={{
                display: 'block',
                background: '#18181B',
                color: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0 0 #000000',
                padding: '1.25rem 2rem',
                width: 'min(320px, 100%)',
                transform: 'rotate(2.5deg)',
                textDecoration: 'none',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'rotate(2.5deg) translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '7px 7px 0 0 #000000';
                e.currentTarget.style.background = '#27272A';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'rotate(2.5deg)';
                e.currentTarget.style.boxShadow = '5px 5px 0 0 #000000';
                e.currentTarget.style.background = '#18181B';
              }}
            >
              <div style={{
                fontFamily: "'Public Sans', 'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: '1.35rem',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: '#FFE033',
                lineHeight: 1.2,
              }}>
                3D AIM TRAINER
              </div>
            </Link>

            {/* Sticker 2: 2D Aim Trainer Button (Pink Card) */}
            <Link
              href="/aim-trainer"
              className="hero-sticker-btn"
              style={{
                display: 'block',
                background: '#FF6B6B',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0 0 #000000',
                padding: '1.25rem 2rem',
                width: 'min(320px, 100%)',
                transform: 'rotate(-2.5deg)',
                textDecoration: 'none',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'rotate(-2.5deg) translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '7px 7px 0 0 #000000';
                e.currentTarget.style.background = '#FF5252';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'rotate(-2.5deg)';
                e.currentTarget.style.boxShadow = '5px 5px 0 0 #000000';
                e.currentTarget.style.background = '#FF6B6B';
              }}
            >
              <div style={{
                fontFamily: "'Public Sans', 'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: '1.35rem',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: '#000000',
                lineHeight: 1.2,
              }}>
                2D AIM TRAINER
              </div>
            </Link>

            {/* Sticker 3: Key Visualizer Button (Mint/Blue Card) */}
            <Link
              href="/key-visualizer"
              className="hero-sticker-btn"
              style={{
                display: 'block',
                background: '#74B9FF',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0 0 #000000',
                padding: '1.25rem 2rem',
                width: 'min(320px, 100%)',
                transform: 'rotate(1.5deg)',
                textDecoration: 'none',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'rotate(1.5deg) translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '7px 7px 0 0 #000000';
                e.currentTarget.style.background = '#58A6FF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'rotate(1.5deg)';
                e.currentTarget.style.boxShadow = '5px 5px 0 0 #000000';
                e.currentTarget.style.background = '#74B9FF';
              }}
            >
              <div style={{
                fontFamily: "'Public Sans', 'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: '1.35rem',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: '#000000',
                lineHeight: 1.2,
              }}>
                KEY VISUALIZER
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* ── 2. CATEGORY CARDS — CHOOSE YOUR ARENA ── */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-label">ARENA CATEGORIES</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, marginBottom: '0.5rem' }}>CHOOSE YOUR ARENA</h2>
        <p style={{ color: '#2D3436', fontWeight: 600, marginBottom: '2rem' }}>Precision tools and skill games. Free, instant, zero signup required.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            {
              to: '/keyboard', title: 'Keyboard Tools',
              desc: 'Test and improve your typing speed, accuracy, and keyboard rollover mastery. From WPM sprints to live key visualizers.',
              color: '#74B9FF',
              pills: [
                { to: '/typing-test', label: 'Typing Speed' },
                { to: '/key-visualizer', label: 'Key Visualizer' },
                { to: '/spacebar', label: 'Spacebar' },
              ],
            },
            {
              to: '/mouse', title: 'Mouse Tools',
              desc: 'Measure clicks per second, test double-click bounce intervals, and challenge your overall mouse tracking precision.',
              color: '#55EFC4',
              pills: [
                { to: '/cps-test', label: 'CPS Test' },
                { to: '/double-click', label: 'Double Click' },
                { to: '/cps-rush', label: 'CPS Rush' },
              ],
            },
            {
              to: '/aim', title: 'Aim & Reaction',
              desc: 'Train your reflexes, sharpen your flicks, and simulate competitive FPS-style shootouts with dynamic moving targets.',
              color: '#FF9F43',
              pills: [
                { to: '/reaction-time', label: 'Reaction Time' },
                { to: '/aim-trainer', label: 'Aim Trainer' },
                { to: '/f1-reaction', label: 'F1 Reflex' },
              ],
            },
            {
              to: '/benchmark', title: 'Benchmark Hub',
              desc: 'Benchmark your network speed, real-time ping latency, jitter variation, and packet loss with live telemetry.',
              color: '#FFE033',
              pills: [
                { to: '/benchmark', label: 'Benchmark Hub' },
                { to: '/internet-speed', label: 'Speed Test' },
                { to: '/speaker-test', label: 'Speaker Test' },
              ],
            },
            {
              to: '/games', title: 'Skill Games',
              desc: 'Challenge yourself with interactive reflex arcade games to develop your reaction time and clicking endurance.',
              color: '#A29BFE',
              pills: [
                { to: '/space-defense', label: 'Space Defense' },
                { to: '/voyager-game', label: 'Voyager Game' },
                { to: '/space-waves', label: 'Space Waves' },
              ],
            },
          ].map(cat => (
            <Link
              key={cat.to}
              href={cat.to}
              className="card"
              style={{
                background: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0 0 #000000',
                padding: '1.75rem',
                textDecoration: 'none',
                color: '#000000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '7px 7px 0 0 #000000';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '5px 5px 0 0 #000000';
              }}
            >
              <div>
                <div style={{
                  display: 'inline-block',
                  background: cat.color,
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 0 #000000',
                  padding: '2px 8px',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}>
                  {cat.title}
                </div>
                <div className="category-title" style={{
                  fontFamily: "'Public Sans', 'Barlow Condensed', sans-serif",
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  marginBottom: '0.6rem',
                }}>{cat.title}</div>
                <p className="category-desc" style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.55, marginBottom: '1.5rem' }}>{cat.desc}</p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', borderTop: '2px dashed #000000', paddingTop: '1rem' }}>
                {cat.pills.map(p => (
                  <span key={p.label} className="category-pill" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.65rem',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    border: '2px solid #000000',
                    boxShadow: '2px 2px 0 0 #000000',
                  }}>{p.label}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. QUICK LAUNCH GRID (ALL 17 TOOLS) ── */}
      <section id="all-tools" style={{ marginBottom: '4rem' }}>
        <div className="section-label">QUICK LAUNCH</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, marginBottom: '0.5rem' }}>JUMP IN INSTANTLY</h2>
        <p className="section-desc" style={{ fontWeight: 600, marginBottom: '2rem' }}>No setup required. Click any tool and start testing in under 2 seconds.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '1.25rem',
        }}>
          {tools.map(tool => (
            <Link
              key={tool.to}
              href={tool.to}
              className="quick-launch-card"
              style={{
                padding: '1.1rem 1.25rem',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '85px',
              }}
            >
              <div className="tool-card-title" style={{
                fontFamily: "'Public Sans', 'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: '1.05rem',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}>{tool.name}</div>
              
              <div style={{ marginTop: '0.5rem' }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.68rem',
                  background: '#FFE033',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 0 #000000',
                  color: '#000000',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  padding: '1px 6px',
                }}>{tool.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 4. INTERNET SPEED MINI WIDGET — NEUBRUTALISM ── */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>

          {/* LEFT: Mini Speed Dashboard Card */}
          <div>
            <div className="section-label">BENCHMARK</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              INTERNET SPEED<br /><span style={{ background: '#FFE033', padding: '0 6px', border: '2px solid #000' }}>MONITOR</span>
            </h2>

            <div className="card" style={{
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '6px 6px 0 0 #000000',
              padding: '2rem',
            }}>
              {/* Gauge */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <svg width="180" height="100" viewBox="0 0 180 100" fill="none">
                  <path d="M 20 90 A 70 70 0 0 1 160 90" stroke="#000000" strokeWidth="12" strokeLinecap="square" fill="none"/>
                  <path d="M 20 90 A 70 70 0 0 1 160 90" stroke="#FFE033" strokeWidth="8" strokeLinecap="square" fill="none"
                    strokeDasharray="220" strokeDashoffset="130" />
                  <line x1="90" y1="90" x2="55" y2="45" stroke="#FF4757" strokeWidth="4" strokeLinecap="square"/>
                  <circle cx="90" cy="90" r="7" fill="#000000"/>
                  <text x="16" y="100" fill="#000000" fontSize="12" fontWeight="900">0</text>
                  <text x="145" y="100" fill="#000000" fontSize="12" fontWeight="900">250</text>
                </svg>
              </div>

              {/* Speed value */}
              <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
                <span className="speed-metric-num" style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 900, fontSize: '2.8rem', lineHeight: 1 }}>—</span>
                <span className="speed-metric-unit" style={{ fontSize: '1.1rem', fontWeight: 800, marginLeft: '6px' }}>Mbps</span>
              </div>
              <div className="speed-sub-status" style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Ready to benchmark connection
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '1rem' }}>
                <div className="speed-stat-box" style={{ padding: '0.75rem' }}>
                  <div className="speed-stat-label" style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>↓ Download</div>
                  <div className="speed-stat-val" style={{ fontSize: '1.35rem', fontWeight: 900 }}>—</div>
                </div>
                <div className="speed-stat-box" style={{ padding: '0.75rem' }}>
                  <div className="speed-stat-label" style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>↑ Upload</div>
                  <div className="speed-stat-val" style={{ fontSize: '1.35rem', fontWeight: 900 }}>—</div>
                </div>
                <div className="speed-stat-box" style={{ padding: '0.75rem' }}>
                  <div className="speed-stat-label" style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>Ping Latency</div>
                  <div className="speed-stat-val" style={{ fontSize: '1.35rem', fontWeight: 900 }}>—</div>
                </div>
                <div className="speed-stat-box" style={{ padding: '0.75rem' }}>
                  <div className="speed-stat-label" style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>Jitter</div>
                  <div className="speed-stat-val" style={{ fontSize: '1.35rem', fontWeight: 900 }}>—</div>
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                <Link href="/internet-speed" className="btn btn-primary" style={{
                  background: '#FFE033',
                  color: '#000000',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0 0 #000000',
                  padding: '12px',
                  fontWeight: 900,
                  textAlign: 'center',
                }}>
                  RUN FULL SPEED TEST →
                </Link>
                <Link href="/benchmark" className="btn btn-secondary" style={{
                  background: '#FFFFFF',
                  color: '#000000',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0 0 #000000',
                  padding: '10px',
                  fontWeight: 800,
                  textAlign: 'center',
                }}>
                  VIEW BENCHMARK HUB
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Why It Matters */}
          <div>
            <div className="section-label">WHY IT MATTERS</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              KNOW YOUR<br /><span style={{ background: '#74B9FF', padding: '0 6px', border: '2px solid #000' }}>CONNECTION</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Download Speed', color: '#74B9FF', desc: 'How fast data arrives to you — affects streaming, website rendering, and large game updates.' },
                { label: 'Upload Speed',   color: '#55EFC4', desc: 'How fast you send data — critical for Twitch streaming, voice channels, and uploading files.' },
                { label: 'Ping / Latency', color: '#FF9F43', desc: 'Round-trip delay in ms. Sub-30ms gives you decisive competitive advantage in FPS matches.' },
                { label: 'Jitter',         color: '#A29BFE', desc: 'Variation in ping over time. High jitter causes rubberbanding and erratic input spikes.' },
                { label: 'Packet Loss',    color: '#FF6B6B', desc: 'Percentage of packets dropped by your ISP. Even 1% loss triggers stutters and missed hits.' },
              ].map(item => (
                <div key={item.label} className="why-matter-card" style={{
                  padding: '1rem 1.25rem',
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: item.color,
                    border: '2px solid #000000',
                    padding: '2px 8px',
                    fontWeight: 900,
                    fontSize: '0.82rem',
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem',
                    color: '#000000'
                  }}>{item.label}</div>
                  <div className="why-matter-desc" style={{ fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.55 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

          </div>
  );
}
