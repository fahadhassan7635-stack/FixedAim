"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const mouseIcon = '/gun-pfp.png';

interface ToolItem {
  to: string;
  label: string;
  category: 'mouse' | 'keyboard' | 'aim' | 'benchmark' | 'games' | 'misc';
}

const NAV_ITEMS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/keyboard', label: 'Keyboard' },
  { to: '/mouse', label: 'Mouse' },
  { to: '/aim', label: 'Aim & Reaction' },
  { to: '/benchmark', label: 'Benchmark' },
  { to: '/games', label: 'Games' },
  { to: '/blog', label: 'Blog' },
];

const TOOLS_LIST: (ToolItem & { icon: string })[] = [
  { to: '/cps-test', label: 'CPS Test', category: 'mouse', icon: '⚡' },
  { to: '/double-click', label: 'Double Click Test', category: 'mouse', icon: '🖱️' },
  { to: '/scroll-test', label: 'Scroll Wheel Test', category: 'mouse', icon: '📜' },
  { to: '/mouse-accuracy', label: 'Mouse Accuracy', category: 'mouse', icon: '🎯' },
  { to: '/cps-rush', label: 'CPS Rush', category: 'mouse', icon: '🔥' },

  { to: '/typing-test', label: 'Typing Speed Test', category: 'keyboard', icon: '⌨️' },
  { to: '/key-visualizer', label: 'Key Visual', category: 'keyboard', icon: '🖥️' },
  { to: '/spacebar', label: 'Spacebar Counter', category: 'keyboard', icon: '➖' },
  { to: '/accuracy', label: 'Accuracy Test', category: 'keyboard', icon: '✔️' },

  { to: '/reaction-time', label: 'Reaction Time Test', category: 'aim', icon: '⏱️' },
  { to: '/aim-trainer', label: '2D Aim Trainer', category: 'aim', icon: '🎯' },
  { to: '/3d-aim-trainer', label: '3D Aim Trainer', category: 'aim', icon: '🎯' },
  { to: '/f1-reaction', label: 'F1 Reaction', category: 'aim', icon: '🏎️' },

  { to: '/space-defense', label: 'Space Defense', category: 'games', icon: '🚀' },
  { to: '/voyager-game', label: 'Voyager Game', category: 'games', icon: '🛸' },
  { to: '/space-waves', label: 'Space Waves', category: 'games', icon: '🌊' },
  { to: '/apm-drill', label: 'APM Drill', category: 'games', icon: '⚡' },

  { to: '/blog', label: 'Blog', category: 'misc', icon: '📝' },
  { to: '/benchmark', label: 'Benchmark Hub', category: 'benchmark', icon: '📊' },
  { to: '/internet-speed', label: 'Internet Speed Test', category: 'benchmark', icon: '🌐' },
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTool, setHoveredTool] = useState<{ label: string; top: number; left: number } | null>(null);
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const filteredTools = useMemo(() => {
    if (selectedCategory === 'all') return TOOLS_LIST;
    return TOOLS_LIST.filter(tool => tool.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <div className="grid-bg" />

      {/* TOP NAVIGATION BAR — NEUBRUTALISM BLACK & YELLOW */}
      <nav className="top-nav" style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#000000',
        borderBottom: '3px solid #000000',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        height: '66px',
        width: '100%',
        padding: '0 0.85rem',
        boxSizing: 'border-box'
      }}>
        {/* LOGO BOX — CANONICAL NEUBRUTALISM */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            background: '#FFE033',
            border: '3px solid #000000',
            boxShadow: '4px 4px 0 0 #FFFFFF',
            padding: '6px 14px 6px 10px',
            transition: 'transform 0.1s ease, box-shadow 0.1s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
            e.currentTarget.style.boxShadow = '6px 6px 0 0 #FFFFFF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '4px 4px 0 0 #FFFFFF';
          }}
          >
            <div style={{
              width: '32px', height: '32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Image src={mouseIcon} alt="Logo" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'contain' }} priority />
            </div>
            <span style={{
              fontFamily: "'Public Sans', 'Barlow Condensed', 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: '1.45rem',
              color: '#000000',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              FIXED AIM.
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">
          {NAV_ITEMS.map(item => {
            const isActive = item.exact ? pathname === item.to : pathname?.startsWith(item.to);
            return (
              <li key={item.to}>
                <Link
                  href={item.to}
                  className="top-nav-link"
                  style={{
                    padding: '0.45rem 0.95rem',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: isActive ? '#000000' : '#FFFFFF',
                    background: isActive ? '#FFE033' : 'transparent',
                    border: isActive ? '2px solid #000000' : '2px solid transparent',
                    boxShadow: isActive ? '3px 3px 0 0 #FFE033' : 'none',
                    transition: 'all 0.15s ease',
                    display: 'block',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#FFE033';
                      e.currentTarget.style.color = '#000000';
                      e.currentTarget.style.border = '2px solid #000000';
                      e.currentTarget.style.boxShadow = '3px 3px 0 0 #FFE033';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#FFFFFF';
                      e.currentTarget.style.border = '2px solid transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >{item.label}</Link>
              </li>
            );
          })}
          <li>
            <Link href="/cps-test" style={{
              padding: '0.48rem 1.15rem',
              textDecoration: 'none',
              fontSize: '0.88rem',
              fontWeight: 900,
              color: '#000000',
              background: '#FF6B6B',
              border: '3px solid #000000',
              boxShadow: '3px 3px 0 0 #FFE033',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              whiteSpace: 'nowrap',
              marginLeft: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '5px 5px 0 0 #FFE033';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '3px 3px 0 0 #FFE033';
            }}
            >⚡ CPS TEST</Link>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeToggle />

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: '#FFE033',
              border: '2px solid #000000',
              boxShadow: '2px 2px 0 0 #FFFFFF',
              cursor: 'pointer',
              padding: '8px',
              marginLeft: '8px',
            }}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'block', width: '22px', height: '3px', background: '#000000', transition: 'all 0.3s' }} />
            ))}
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div className="mobile-menu-overlay" style={{
          position: 'fixed', top: '66px', left: 0, right: 0,
          background: '#000000',
          borderBottom: '3px solid #000000',
          zIndex: 99,
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
          padding: '1.25rem',
          maxHeight: 'calc(100vh - 66px)', overflowY: 'auto',
          boxSizing: 'border-box'
        }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.exact ? pathname === item.to : pathname?.startsWith(item.to);
            return (
              <Link
                key={item.to} href={item.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: '0.75rem 1rem',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: isActive ? '#000000' : '#FFFFFF',
                  background: isActive ? '#FFE033' : 'rgba(255,255,255,0.06)',
                  border: '2px solid #000000',
                  boxShadow: isActive ? '3px 3px 0 0 #FFFFFF' : 'none',
                }}
              >{item.label}</Link>
            );
          })}
          <Link
            href="/cps-test" onClick={() => setMenuOpen(false)}
            style={{
              padding: '0.85rem 1rem',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 900,
              color: '#000000',
              background: '#FF6B6B',
              border: '3px solid #000000',
              boxShadow: '4px 4px 0 0 #FFE033',
              textAlign: 'center',
              marginTop: '0.5rem',
              textTransform: 'uppercase',
            }}
          >⚡ Start CPS Test</Link>
        </div>
      )}

      {/* BODY SECTION */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', width: '100%', alignItems: 'flex-start' }}>

        {/* SIDEBAR PANEL — NEUBRUTALISM */}
        <aside className="sidebar-pannel" style={{
          width: sidebarOpen ? '280px' : '85px',
          opacity: 1,
          visibility: 'visible',
          background: '#FFFDF5',
          borderRight: '3px solid #000000',
          height: 'calc(100vh - 66px)',
          position: 'sticky',
          top: '66px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
          padding: sidebarOpen ? '1.25rem' : '1.25rem 0.5rem',
          transition: 'width 0.2s ease, padding 0.2s ease',
          overflow: 'visible',
          boxSizing: 'border-box'
        }}>

          {/* IN-SIDEBAR HEADER */}
          <div style={{
            display: 'flex',
            justifyContent: sidebarOpen ? 'space-between' : 'center',
            alignItems: 'center',
            marginBottom: '1rem',
            paddingRight: sidebarOpen ? '0.5rem' : '0'
          }}>
            {sidebarOpen && (
              <div style={{
                background: '#FFE033',
                color: '#000000',
                fontSize: '0.9rem',
                fontWeight: 900,
                padding: '0.35rem 0.75rem',
                border: '2px solid #000000',
                boxShadow: '3px 3px 0 0 #000000',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}>
                🛠️ ALL TOOLS
              </div>
            )}

            {/* TOGGLE BUTTON */}
            <div className="sidebar-toggle-wrap">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                style={{
                  background: '#FFE033',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 0 #000000',
                  cursor: 'pointer',
                  color: '#000000',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  padding: '6px',
                  transition: 'transform 0.1s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-1px, -1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0, 0)'; }}
              >
                {sidebarOpen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* FILTER DROPDOWN */}
          <div style={{ display: sidebarOpen ? 'flex' : 'none', alignItems: 'center', marginBottom: '1.25rem' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                flex: 1,
                padding: '0.55rem 0.75rem',
                background: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0 0 #000000',
                color: '#000000',
                fontSize: '0.82rem',
                fontWeight: 800,
                outline: 'none',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              <option value="all">⚡ ALL TOOLS (17)</option>
              <option value="mouse">🖱️ MOUSE TOOLS</option>
              <option value="keyboard">⌨️ KEYBOARD TOOLS</option>
              <option value="aim">🎯 AIM & REACTION</option>
              <option value="benchmark">🌐 BENCHMARKS</option>
              <option value="games">🎮 ARCADE GAMES</option>
              <option value="misc">📝 OTHER SECTIONS</option>
            </select>
          </div>

          {/* SCROLLABLE TOOLS LIST */}
          <div className="sidebar-scroll" style={{
            flex: 1, overflowY: 'auto', overflowX: 'hidden',
            display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingRight: '4px'
          }}>
            {filteredTools.map((tool) => {
              const isCurrentActive = pathname === tool.to;
              const isPinned = tool.to === '/cps-test';
              const showLabel = sidebarOpen || isPinned;
              return (
                <div key={tool.to} style={{ position: 'relative' }}>
                  <Link
                    href={tool.to}
                    className={`sidebar-tool-btn ${isCurrentActive ? 'active' : ''}`}
                    style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: sidebarOpen ? 'flex-start' : 'center',
                      gap: sidebarOpen ? '0.65rem' : '0.4rem',
                      padding: sidebarOpen ? '0.6rem 0.85rem' : '0.6rem 0.25rem',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                    }}
                    onMouseEnter={() => {
                      if (!sidebarOpen) {
                        const rect = document.querySelector(`[href="${tool.to}"]`)?.getBoundingClientRect();
                        if (rect) {
                          setHoveredTool({ label: tool.label, top: rect.top + rect.height / 2, left: rect.right + 10 });
                        }
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredTool(null);
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{tool.icon}</span>
                    <span style={{
                      display: showLabel ? 'block' : 'none',
                      textTransform: 'uppercase',
                      fontSize: (!sidebarOpen && isPinned) ? '0.65rem' : '0.78rem',
                      fontWeight: 800,
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {tool.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </aside>

        {/* FIXED GLOBAL TOOLTIP */}
        <span
          style={{
            position: 'fixed',
            top: hoveredTool ? hoveredTool.top : 0,
            left: hoveredTool ? hoveredTool.left : 0,
            transform: hoveredTool ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-6px)',
            background: '#FFE033',
            border: '2px solid #000000',
            boxShadow: '3px 3px 0 0 #000000',
            color: '#000000',
            fontSize: '0.78rem',
            fontWeight: 800,
            padding: '6px 10px',
            whiteSpace: 'nowrap',
            opacity: hoveredTool ? 1 : 0,
            visibility: hoveredTool ? 'visible' : 'hidden',
            pointerEvents: 'none',
            zIndex: 200,
            textTransform: 'uppercase'
          }}
        >
          {hoveredTool ? hoveredTool.label : ''}
        </span>

        {/* MAIN BODY CONTENT */}
        <main className="main-content" style={{ flex: 1, minWidth: 0, padding: '2rem 1.5rem', width: '100%', boxSizing: 'border-box' }}>
          {children}
        </main>

      </div>
    </>
  );
}
