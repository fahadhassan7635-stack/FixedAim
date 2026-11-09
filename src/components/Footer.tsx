import Link from 'next/link';
import Image from 'next/image';

const mouseIcon = '/gun-pfp.png';

export default function Footer() {
  return (
    <footer className="main-footer" style={{
      background: '#FFE033',
      borderTop: '3px solid #000000',
      position: 'relative',
      zIndex: 1,
      marginTop: 'auto',
      width: '100%',
      boxSizing: 'border-box',
      color: '#000000',
      padding: '3.5rem 2rem 2rem'
    }}>
      {/* Brand Header Banner */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 2.25rem auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        borderBottom: '2px solid #000000',
        paddingBottom: '1.75rem'
      }}>
        <div style={{ maxWidth: '580px' }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            background: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '4px 4px 0 0 #000000',
            padding: '6px 12px',
            marginBottom: '0.85rem',
          }}>
            <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image src={mouseIcon} alt="Logo" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <span style={{
              fontWeight: '900',
              fontSize: '1.35rem',
              color: '#000000',
              fontFamily: "'Public Sans', 'Barlow Condensed', sans-serif",
              letterSpacing: '-0.02em',
              textTransform: 'uppercase'
            }}>
              FIXED AIM.
            </span>
          </Link>
          <p style={{ color: '#1E272E', fontSize: '0.95rem', fontWeight: 600, lineHeight: '1.6', margin: 0 }}>
            The ultimate free platform for competitive gamers and typists to test, train, and dominate. Zero signup required.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <a href="#" className="social-btn" aria-label="Twitter">𝕏</a>
          <a href="#" className="social-btn" aria-label="Discord">💬</a>
          <a href="#" className="social-btn" aria-label="YouTube">▶</a>
          <a href="#" className="social-btn" aria-label="Bot">🤖</a>
        </div>
      </div>

      {/* 6 Balanced Column Navigation Grid */}
      <div className="footer-nav-grid" style={{ maxWidth: '1200px', margin: '0 auto 2.5rem auto' }}>

        {/* 1. KEYBOARD */}
        <div>
          <h4 className="footer-col-title">KEYBOARD</h4>
          <ul className="footer-col-list">
            {[
              { to: '/keyboard', label: 'All Keyboard Tools' },
              { to: '/typing-test', label: 'Typing Speed Test' },
              { to: '/key-visualizer', label: 'Key Visualizer' },
              { to: '/spacebar', label: 'Spacebar Counter' },
              { to: '/accuracy', label: 'Accuracy Test' }
            ].map(l => (
              <li key={l.to}><Link href={l.to} className="footer-link">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* 2. MOUSE */}
        <div>
          <h4 className="footer-col-title">MOUSE</h4>
          <ul className="footer-col-list">
            {[
              { to: '/mouse', label: 'All Mouse Tools' },
              { to: '/cps-test', label: 'CPS Test' },
              { to: '/double-click', label: 'Double Click Test' },
              { to: '/scroll-test', label: 'Scroll Wheel Test' },
              { to: '/mouse-accuracy', label: 'Mouse Accuracy' },
              { to: '/cps-rush', label: 'CPS Rush' }
            ].map(l => (
              <li key={l.to}><Link href={l.to} className="footer-link">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* 3. AIM & REACTION */}
        <div>
          <h4 className="footer-col-title">AIM &amp; REACTION</h4>
          <ul className="footer-col-list">
            {[
              { to: '/aim', label: 'Aim & Reflex Hub' },
              { to: '/aim-trainer', label: '2D Aim Trainer' },
              { to: '/3d-aim-trainer', label: '3D Aim Trainer' },
              { to: '/reaction-time', label: 'Reaction Time Test' },
              { to: '/f1-reaction', label: 'F1 Reaction Test' }
            ].map(l => (
              <li key={l.to}><Link href={l.to} className="footer-link">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* 4. GAMES */}
        <div>
          <h4 className="footer-col-title">GAMES</h4>
          <ul className="footer-col-list">
            {[
              { to: '/games', label: 'All Games Center' },
              { to: '/space-defense', label: 'Space Defense' },
              { to: '/voyager-game', label: 'Voyager Game' },
              { to: '/space-waves', label: 'Space Waves' },
              { to: '/apm-drill', label: 'APM Drill' }
            ].map(l => (
              <li key={l.to}><Link href={l.to} className="footer-link">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* 5. BENCHMARK */}
        <div>
          <h4 className="footer-col-title">BENCHMARK</h4>
          <ul className="footer-col-list">
            {[
              { to: '/benchmark', label: 'Benchmark Hub' },
              { to: '/internet-speed', label: 'Internet Speed Test' },
              { to: '/memory-test', label: 'Memory Test' },
              { to: '/blog', label: 'Gaming Blog' }
            ].map(l => (
              <li key={l.to}><Link href={l.to} className="footer-link">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* 6. DEVICE TEST */}
        <div>
          <h4 className="footer-col-title">DEVICE TEST</h4>
          <ul className="footer-col-list">
            {[
              { to: '/device', label: 'Device Test Hub' },
              { to: '/hz-test', label: 'Screen Refresh Rate (Hz)' },
              { to: '/speaker-test', label: 'Speaker Test Online' },
              { to: '/dead-pixel-test', label: 'Dead Pixel Test' }
            ].map(l => (
              <li key={l.to}><Link href={l.to} className="footer-link">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* SEO Gaming Links */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 2rem auto', borderTop: '2px solid #000000', paddingTop: '1.75rem', textAlign: 'center' }}>
        <h4 style={{ color: '#000000', fontSize: '0.95rem', marginBottom: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          🔥 POPULAR GAMES &amp; GAMING PLATFORMS
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem 0.85rem', fontSize: '0.88rem', fontWeight: 700, color: '#1E272E' }}>
          <a href="https://www.counter-strike.net/" target="_blank" rel="noopener noreferrer" className="footer-link">CS2</a>
          <span>·</span>
          <a href="https://playvalorant.com/" target="_blank" rel="noopener noreferrer" className="footer-link">VALORANT</a>
          <span>·</span>
          <a href="https://www.minecraft.net/" target="_blank" rel="noopener noreferrer" className="footer-link">Minecraft</a>
          <span>·</span>
          <a href="https://pubg.com/" target="_blank" rel="noopener noreferrer" className="footer-link">PUBG</a>
          <span>·</span>
          <a href="https://www.callofduty.com/warzone" target="_blank" rel="noopener noreferrer" className="footer-link">Warzone</a>
          <span>·</span>
          <a href="https://www.rockstargames.com/VI" target="_blank" rel="noopener noreferrer" className="footer-link">GTA VI</a>
          <span>·</span>
          <a href="https://www.crazygames.com/" target="_blank" rel="noopener noreferrer" className="footer-link">CrazyGames</a>
          <span>·</span>
          <a href="https://zone.msn.com/" target="_blank" rel="noopener noreferrer" className="footer-link">MSN Games</a>
          <span>·</span>
          <a href="https://geometrydash.io/" target="_blank" rel="noopener noreferrer" className="footer-link">Geometry Dash</a>
        </div>
      </div>

      <div style={{ borderTop: '2px solid #000000', paddingTop: '1.25rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontWeight: 700, fontSize: '0.88rem' }}>
        <p style={{ margin: 0, color: '#000000' }}>© FixedAim — All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/privacy-policy" style={{ color: '#000000', textDecoration: 'none' }} className="footer-link">Privacy Policy</Link>
          <Link href="/terms" style={{ color: '#000000', textDecoration: 'none' }} className="footer-link">Terms of Service</Link>
          <Link href="/contact" style={{ color: '#000000', textDecoration: 'none' }} className="footer-link">Contact</Link>
        </div>
        <p style={{ margin: 0, color: '#000000' }}>Built for gamers, by gamers. ⚡</p>
      </div>
    </footer>
  );
}
