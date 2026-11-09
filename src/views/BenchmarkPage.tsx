import Link from 'next/link';

const benchmarks = [
  {
    to: '/internet-speed',
    title: 'Internet Speed Test',
    desc: 'Measure your real-time download speed, upload speed, ping latency, jitter, and packet loss in seconds.',
    color: '#00f5ff',
  },
  {
    to: '/speaker-test',
    title: 'Speaker Test Online',
    desc: 'Test stereo left & right channels, bass response, frequency sweep, pink noise, and phase polarity in seconds.',
    color: '#2B4EDB',
  },
  {
    to: '/dead-pixel-test',
    title: 'Dead Pixel Test',
    desc: 'Detect stuck, hot, and dead pixels across 22 solid colors and subpixel matrices with built-in pixel fixer.',
    color: '#FF6B6B',
  },
  {
    to: '/hz-test',
    title: 'Screen Refresh Rate (Hz) & Page Speed',
    desc: 'Measure your monitor refresh rate (Hz), frame time jitter, UFO motion smoothness, FPS, Core Web Vitals, and CPU performance.',
    color: '#00F5FF',
  },
  {
    to: '/memory-test',
    title: 'Memory Test: 4 Brain Games',
    desc: 'Train and measure your visual, sequence, short-term, and spatial recall across 4 cognitive memory games with difficulty modes.',
    color: '#6C4AB6',
  },
];

export default function BenchmarkPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem', minHeight: '80vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fixedaim.com/' },
              { '@type': 'ListItem', position: 2, name: 'Benchmark', item: 'https://fixedaim.com/benchmark' },
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
        html[data-theme="dark"] .cod-hub-card {
          background: #181A20 !important;
          border: 3px solid #000000 !important;
          box-shadow: 5px 5px 0 0 #FFE033 !important;
        }
        html[data-theme="dark"] .cod-hub-card:hover {
          box-shadow: 7px 7px 0 0 #FFE033 !important;
        }
        .cod-hub-title {
          font-family: 'Public Sans', 'Barlow Condensed', sans-serif;
          font-size: 1.4rem;
          font-weight: 900;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          line-height: 1.2;
          margin-bottom: 0.65rem;
          color: #000000;
        }
        html[data-theme="dark"] .cod-hub-title {
          color: #FFFFFF !important;
        }
        .cod-hub-desc {
          color: #4A5568;
          font-size: 0.9rem;
          line-height: 1.55;
          margin-bottom: 1.25rem;
          font-weight: 500;
        }
        html[data-theme="dark"] .cod-hub-desc {
          color: #94A3B8 !important;
        }
        .cod-hub-cta {
          font-family: 'Public Sans', 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .cod-tip-box {
          background: #FFFFFF;
          border: 3px solid #000000;
          box-shadow: 6px 6px 0 0 #000000;
          border-radius: 0;
          padding: 2rem;
          margin-top: 3rem;
          color: #000000;
        }
        html[data-theme="dark"] .cod-tip-box {
          background: #181A20 !important;
          box-shadow: 6px 6px 0 0 #FFE033 !important;
          color: #FFFFFF !important;
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
        html[data-theme="dark"] .cod-tip-title {
          color: #FFFFFF !important;
        }
        .cod-tip-item {
          background: #FFFDF5;
          border: 2px solid #000000;
          box-shadow: 3px 3px 0 0 #000000;
          border-radius: 0;
          padding: 1.1rem;
        }
        html[data-theme="dark"] .cod-tip-item {
          background: #232730 !important;
          box-shadow: 3px 3px 0 0 #FFE033 !important;
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
        html[data-theme="dark"] .cod-tip-item-title {
          color: #FFFFFF !important;
        }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="section-label">Category</div>
        <h1 className="tool-title">Benchmark <span style={{ color: '#00f5ff' }}>Hub</span></h1>
        <p className="tool-subtitle">
          Benchmark your network speed, ping latency, jitter, audio, screen, and cognitive memory with real-time analytics.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        {benchmarks.map((tool) => (
          <Link key={tool.to} href={tool.to} className="cod-hub-card">
            <div>
              <div className="cod-hub-title">{tool.title}</div>
              <p className="cod-hub-desc">{tool.desc}</p>
            </div>
            <span className="cod-hub-cta" style={{ color: tool.color }}>Start Benchmark →</span>
          </Link>
        ))}
      </div>

      <div className="cod-tip-box">
        <div className="cod-tip-title" style={{ color: '#00f5ff' }}>System &amp; Network Benchmark Tips</div>
        <p style={{ color: 'inherit', opacity: 0.85, fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
          Reliable benchmark numbers require a clean testing environment. Follow these guidelines before testing your network.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { t: 'Close Background Apps', d: 'Background downloads and game updates introduce ping jitter and reduce bandwidth.' },
            { t: 'Use Ethernet', d: 'Wired Ethernet provides 0% packet loss and lowest latency vs 2.4GHz Wi-Fi.' },
            { t: 'Monitor Polling Rate', d: 'Ensure your mouse and keyboard run at 1000Hz+ for sub-millisecond input.' },
            { t: 'Run Multiple Passes', d: 'Run tests 2–3 times to compute a representative average.' },
          ].map((tip) => (
            <div key={tip.t} className="cod-tip-item">
              <div className="cod-tip-item-title" style={{ color: '#00f5ff' }}>{tip.t}</div>
              <div style={{ opacity: 0.85, fontSize: '0.8rem', lineHeight: '1.5' }}>{tip.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
