import Link from 'next/link';

const deviceTools = [
  {
    to: '/hz-test',
    title: 'Screen Refresh Rate (Hz) & Speed Test',
    desc: 'Measure your monitor refresh rate (Hz), frame time jitter, UFO motion smoothness, FPS, Core Web Vitals, and CPU performance.',
    color: '#2B4EDB',
    tag: 'DISPLAY & CPU'
  },
  {
    to: '/dead-pixel-test',
    title: 'Dead Pixel Test',
    desc: 'Inspect your monitor, laptop, or phone screen for dead, stuck, or hot pixels across 22 patterns with a built-in pixel fixer.',
    color: '#FF6B6B',
    tag: 'SCREEN TEST'
  },
  {
    to: '/speaker-test',
    title: 'Speaker & Audio Test',
    desc: 'Check stereo left & right channels, bass depth, frequency sweep, pink noise, and phase polarity in seconds.',
    color: '#FFE033',
    tag: 'AUDIO TEST'
  },
  {
    to: '/internet-speed',
    title: 'Internet Speed Test',
    desc: 'Measure your real-time download bandwidth, upload speed, ping latency, jitter variation, and packet loss in seconds.',
    color: '#00F5FF',
    tag: 'NETWORK TEST'
  },
  {
    to: '/double-click',
    title: 'Mouse Double Click Test',
    desc: 'Diagnose mouse microswitch chatter, register accidental double-clicks, and measure switch debounce timing in real time.',
    color: '#55EFC4',
    tag: 'MOUSE TEST'
  },
  {
    to: '/key-visualizer',
    title: 'Keyboard Visualizer & Matrix Test',
    desc: 'Test 104-key rollover (NKRO), ghosting, dead keys, and view live keystroke overlays without downloading software.',
    color: '#A29BFE',
    tag: 'KEYBOARD TEST'
  },
];

export default function DevicePage() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fixedaim.com/' },
              { '@type': 'ListItem', position: 2, name: 'Device Test', item: 'https://fixedaim.com/device' },
            ],
          }),
        }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');
        .cod-hub-card {
          background: #FFFFFF;
          border: 3px solid #000000;
          box-shadow: 5px 5px 0 0 #000000;
          border-radius: 0;
          padding: 1.75rem 1.75rem 1.5rem 1.75rem;
          text-decoration: none;
          color: #000000;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          position: relative;
        }
        .cod-hub-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 0 #000000;
          border-color: #000000;
        }
        .cod-hub-title {
          font-family: 'Public Sans', 'Barlow Condensed', sans-serif;
          font-size: 1.35rem;
          font-weight: 900;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          line-height: 1.15;
          margin-bottom: 0.5rem;
          color: #000000;
        }
        .cod-hub-tag {
          position: absolute;
          top: 1rem; right: 1rem;
          padding: 0.25rem 0.65rem;
          border-radius: 0;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          background: #FFE033;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0 0 #000000;
          color: #000000;
        }
        .cod-hub-desc {
          color: #2D3436;
          font-size: 0.9rem;
          line-height: 1.55;
          margin-bottom: 1.25rem;
          font-weight: 500;
        }
        .cod-hub-cta {
          font-family: 'Public Sans', 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #000000;
        }
        .cod-tip-box {
          background: #FFFFFF;
          border: 3px solid #000000;
          box-shadow: 6px 6px 0 0 #000000;
          border-radius: 0;
          padding: 2rem;
          margin-top: 3rem;
        }
        .cod-tip-title {
          font-family: 'Public Sans', 'Barlow Condensed', sans-serif;
          font-size: 1.35rem;
          font-weight: 900;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #000000;
          margin-bottom: 0.75rem;
        }
        .cod-tip-item {
          background: #FFFDF5;
          border: 2px solid #000000;
          box-shadow: 3px 3px 0 0 #000000;
          border-radius: 0;
          padding: 1.1rem;
        }
        .cod-tip-item-title {
          font-family: 'Public Sans', 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 1.05rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          color: #000000;
          margin-bottom: 0.4rem;
        }
      `}</style>

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="section-label">Category</div>
        <h1 className="tool-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
          Device &amp; Hardware <span style={{ color: '#2B4EDB' }}>Diagnostics</span>
        </h1>
        <p className="tool-subtitle">
          Test, benchmark, and calibrate your monitor refresh rate, screen pixels, audio channels, network, keyboard, and mouse online without downloading any software.
        </p>
      </div>

      {/* TOOLS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        {deviceTools.map((tool) => (
          <Link key={tool.to} href={tool.to} className="cod-hub-card" style={{ ['--ch-accent' as string]: tool.color }}>
            {tool.tag && (
              <span className="cod-hub-tag" style={{ background: tool.color + '25', borderColor: '#000' }}>
                {tool.tag}
              </span>
            )}
            <div>
              <div className="cod-hub-title" style={{ color: '#000000' }}>{tool.title}</div>
              <p className="cod-hub-desc">{tool.desc}</p>
            </div>
            <span className="cod-hub-cta" style={{ color: tool.color }}>Launch Diagnostics →</span>
          </Link>
        ))}
      </div>

      {/* HARDWARE DIAGNOSTICS TIPS */}
      <div className="cod-tip-box">
        <div className="cod-tip-title">Hardware Calibration &amp; Optimization Tips</div>
        <p style={{ color: '#2D3436', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.5rem', fontWeight: 600 }}>
          Accurate hardware testing requires zero interference. Follow these calibration tips before diagnosing your peripherals:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { t: 'DisplayPort vs HDMI', d: 'Use DisplayPort 1.4 or HDMI 2.1 to enable 144Hz+ without color compression.' },
            { t: 'Clean Screen First', d: 'Wipe your screen with a dry microfiber cloth to avoid confusing dust with dead pixels.' },
            { t: 'Disable Sound Enhancements', d: 'Turn off Windows Sonic or Dolby Atmos when testing stereo channels & phase.' },
            { t: 'Close GPU Overlays', d: 'Third-party capture overlays can cap frame pacing or cause false stutter in UFO tests.' },
          ].map((tip) => (
            <div key={tip.t} className="cod-tip-item">
              <div className="cod-tip-item-title">{tip.t}</div>
              <div style={{ color: '#2D3436', fontSize: '0.85rem', lineHeight: '1.55', fontWeight: 500 }}>{tip.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
