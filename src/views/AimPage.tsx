import Link from 'next/link';

const tools = [
  { to: '/reaction-time', title: 'Reaction Time Test', desc: 'Click when the screen turns green. Measure your average reaction time across 5 rounds.', color: '#fb923c', tag: 'Most Popular' },
  { to: '/aim-trainer', title: '2D Aim Trainer', desc: 'Click moving targets as fast as possible. Track your hits, misses, and accuracy.', color: '#ef4444', tag: '' },
  { to: '/3d-aim-trainer', title: '3D Aim Trainer', desc: 'Step into a first-person shooting range and sharpen your mouse accuracy. Track moving targets and dominate your aim game.', color: '#4fc3f7', tag: 'FPS Trainer' },
  { to: '/f1-reaction', title: 'F1 Reaction Test', desc: 'Test your visual reflexes with the Formula 1 lights-out sequence.', color: '#dc2626', tag: 'New' },
];

export default function AimPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fixedaim.com/' },
              { '@type': 'ListItem', position: 2, name: 'Aim & Reaction', item: 'https://fixedaim.com/aim' },
            ],
          }),
        }}
      />
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=swap');
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
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    line-height: 1.1;
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
    background: #0d0d0d;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px;
    padding: 1.75rem;
  }
  .cod-tip-title {
    font-family: 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif;
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .cod-tip-item {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 4px;
    padding: 1rem;
  }
  .cod-tip-item-title {
    font-family: 'Barlow Condensed', 'Arial Narrow', Arial, sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-bottom: 0.4rem;
  }
`}</style>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="section-label">Category</div>
        <h1 className="tool-title">Aim &amp; Reaction</h1>
        <p className="tool-subtitle">Sharpen your reflexes and precision for competitive gaming</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        {tools.map(tool => (
          <Link key={tool.to} href={tool.to} className="cod-hub-card" style={{ ['--ch-accent' as string]: tool.color }}>
            {tool.tag && <span className="cod-hub-tag" style={{ background: tool.color + '18', color: tool.color, borderColor: tool.color + '40' }}>{tool.tag}</span>}
            <div>
              <div className="cod-hub-title" style={{ color: tool.color }}>{tool.title}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>{tool.desc}</p>
            </div>
            <span className="cod-hub-cta" style={{ color: tool.color }}>Start Test →</span>
          </Link>
        ))}
      </div>

      <div className="cod-tip-box">
        <div className="cod-tip-title" style={{ color: '#fb923c' }}>Reaction Time Science</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
          Human reaction time averages ~250ms for visual stimuli. Elite gamers achieve 150–200ms through training, proper sleep, and warm-up routines.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { t: 'Sleep Quality', d: '7–9 hours improves reaction by up to 30%.' },
            { t: 'Warm-Up', d: '10 min of aim training before matches reduces reaction time.' },
            { t: 'Caffeine', d: 'Small doses improve alertness and reaction speed.' },
            { t: 'Hydration', d: 'Even mild dehydration slows reaction time significantly.' },
          ].map(tip => (
            <div key={tip.t} className="cod-tip-item">
              <div className="cod-tip-item-title" style={{ color: '#fb923c' }}>{tip.t}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>{tip.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}