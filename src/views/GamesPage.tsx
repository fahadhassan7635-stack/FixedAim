import Link from 'next/link';

export default function GamesPage() {
  const games = [
    { to: '/space-defense', title: 'Space Defense', desc: 'Defend your base from incoming asteroids. Trains tracking precision, reaction time, and clicking speed in high-pressure scenarios.', color: '#ff6b35', badge: 'SKILL BUILDER' },
    { to: '/voyager-game', title: 'Voyager Game', desc: 'Navigate through the asteroid field using your spacebar or clicking speed. Test your endurance and boost your reflexes.', color: '#a855f7', badge: 'MOST POPULAR' },
    { to: '/cps-rush', title: 'CPS Rush', desc: 'The faster you click or smash the spacebar, the faster you bounce. Avoid obstacles and reach the final Cyber Gate.', color: '#06b6d4', badge: 'NEW REFLEX' },
    { to: '/space-waves', title: 'Space Waves', desc: 'Hold Space or click to soar, release to dive through a neon obstacle course. How far can you push your reflexes?', color: '#2dd4bf', badge: 'SIDE-SCROLLER' },
    { to: '/apm-drill', title: 'APM Drill', desc: 'Measure and train your actions per minute with surgical precision. Choose from 3×3, 4×4, 5×5 grids or 26-letter keyboard drill.', color: '#00f5ff', badge: 'NEW DRILL' },
  ];

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
              { '@type': 'ListItem', position: 2, name: 'Games', item: 'https://fixedaim.com/games' },
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
        <h1 className="tool-title">Arcade <span style={{ color: '#ff6b35' }}>Games</span></h1>
        <p className="tool-subtitle">Play interactive skill games to improve your reaction time, clicking speed, and keyboard accuracy.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        {games.map((game) => (
          <Link key={game.to} href={game.to} className="cod-hub-card" style={{ ['--ch-accent' as string]: game.color }}>
            {game.badge && <span className="cod-hub-tag" style={{ background: game.color + '18', color: game.color, borderColor: game.color + '40' }}>{game.badge}</span>}
            <div>
              <div className="cod-hub-title" style={{ color: game.color }}>{game.title}</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>{game.desc}</p>
            </div>
            <span className="cod-hub-cta" style={{ color: game.color }}>Play Now →</span>
          </Link>
        ))}
      </div>

      <div className="cod-tip-box">
        <div className="cod-tip-title" style={{ color: '#ff6b35' }}>Skill Development Tips</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
          These games are designed to genuinely improve your gaming performance. Play deliberately to see real results.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { t: 'Warm Up Daily', d: 'Even 5–10 min of aim/reflex training before sessions sharpens performance.' },
            { t: 'Track Progress', d: 'Note your scores each session. Improvement is most visible over 2–4 weeks.' },
            { t: 'Low Sensitivity', d: 'Training with lower DPI builds muscle memory for precise aiming.' },
            { t: 'Consistent Setup', d: 'Same chair, monitor distance, and grip every session = repeatable results.' },
          ].map(tip => (
            <div key={tip.t} className="cod-tip-item">
              <div className="cod-tip-item-title" style={{ color: '#ff6b35' }}>{tip.t}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>{tip.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}