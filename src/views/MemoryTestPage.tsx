"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, RotateCcw, Volume2, VolumeX, ArrowLeft, Trophy, Sparkles, Brain, Check, RefreshCw } from 'lucide-react';

interface ToolLink { label: string; href: string; icon: React.ReactNode; }
const MORE_TOOLS: ToolLink[] = [
  { label: 'CPS Test', href: '/cps-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/><circle cx="12" cy="14" r="1" fill="currentColor"/></svg> },
  { label: 'Speaker Test', href: '/speaker-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg> },
  { label: 'Dead Pixel Test', href: '/dead-pixel-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { label: 'Screen Hz Test', href: '/hz-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
  { label: 'Internet Speed', href: '/internet-speed', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="m16 8-4 4"/></svg> },
  { label: 'Reaction Time', href: '/reaction-time', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { label: 'F1 Reaction', href: '/f1-reaction', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { label: 'Aim Trainer', href: '/aim-trainer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { label: 'Key Visualizer', href: '/key-visualizer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h1m4 0h1m4 0h1M6 13h1m4 0h1m4 0h1"/></svg> },
  { label: 'APM Drill', href: '/apm-drill', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { label: 'Double Click', href: '/double-click', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/></svg> },
  { label: 'Device Test Hub', href: '/device', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg> },
];

const FAQS = [
  { q: "What is a memory test?", a: "A memory test is a short task that asks you to remember and recall information such as images, numbers, positions or sequences. The FixedAim memory test uses four games that each focus on a different type of memory, so you can see where you are strongest." },
  { q: "Is this memory test free?", a: "Yes. The FixedAim memory test is completely free. You do not need an account, and you can replay every game as many times as you like." },
  { q: "Is this a medical or IQ test?", a: "No. These games are for fun, practice and self-tracking. They cannot diagnose any condition or measure intelligence. If you are worried about your memory, speak to a doctor or another qualified health professional." },
  { q: "How is my score calculated?", a: "Each game has its own score. Card Match counts the moves you need to find every pair, and fewer moves is better. Pattern Echo records the last round you completed. Number Span records the longest number you recalled. Spot the Tiles records the highest level you cleared." },
  { q: "Are my scores saved?", a: "Your best score for each game and difficulty is saved in your own browser using LocalStorage. It is not uploaded anywhere. Clearing your browser data or using the Reset scores button removes it." },
  { q: "What is a good score on the number memory test?", a: "Many adults can hold about five to nine digits in short-term memory, though results change with focus, sleep and distraction. Treat your result as a personal benchmark and try to beat it, rather than comparing yourself with others." },
  { q: "How can I improve my memory score?", a: "Practise regularly in short sessions, sleep well, reduce distractions and use strategies such as chunking, visual imagery and repeating patterns in your head. The tips section above explains each one." },
  { q: "Which difficulty level should I choose?", a: "Start on Normal. Move to Hard when you can finish a game comfortably without losing lives, or choose Easy if you want a relaxed warm-up." },
  { q: "Does the memory test work on mobile?", a: "Yes. The games are built for phones, tablets and desktop screens. Sound can be switched off with the Sound button if you play in a quiet place." },
  { q: "Can playing memory games help with aim and gaming?", a: "Memory games train focus, pattern recognition and quick recall, which many players find useful alongside regular practice. They are a helpful warm-up, but results vary from person to person." },
];

type Difficulty = 'easy' | 'normal' | 'hard';
type GameId = 'match' | 'seq' | 'digits' | 'grid';

interface GameDef {
  id: GameId;
  name: string;
  badge: string;
  color: string;
  desc: string;
  fmt: (v: number) => string;
}

const GAMES: GameDef[] = [
  { id: 'match', name: 'Card Match', badge: 'Visual Memory', color: '#6C4AB6', desc: 'Flip cards and find every pair in as few moves as you can.', fmt: (v) => `${v} moves` },
  { id: 'seq', name: 'Pattern Echo', badge: 'Sequence Memory', color: '#2B4EDB', desc: 'Watch the colours light up, then repeat the pattern. It grows each round.', fmt: (v) => `Round ${v}` },
  { id: 'digits', name: 'Number Span', badge: 'Short-Term Memory', color: '#E8577A', desc: 'A number flashes briefly. Type it back from memory.', fmt: (v) => `${v} digits` },
  { id: 'grid', name: 'Spot the Tiles', badge: 'Spatial Memory', color: '#10B981', desc: 'Tiles light up on a grid. Tap the same ones once they hide.', fmt: (v) => `Level ${v}` },
];

export default function MemoryTestPage() {
  const [diff, setDiff] = useState<Difficulty>('normal');
  const [sound, setSound] = useState<boolean>(true);
  const [bestScores, setBestScores] = useState<Record<string, number>>({});
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playBeep = useCallback((freq: number, duration: number, type: OscillatorType = 'sine') => {
    if (!sound) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // ignore audio errors
    }
  }, [sound, getAudioContext]);

  const playSuccess = useCallback(() => {
    playBeep(660, 0.12);
    setTimeout(() => playBeep(880, 0.16), 90);
  }, [playBeep]);

  const playError = useCallback(() => {
    playBeep(160, 0.3, 'sawtooth');
  }, [playBeep]);

  // Load / Save localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('memlab');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.best) setBestScores(parsed.best);
        if (parsed.diff && ['easy', 'normal', 'hard'].includes(parsed.diff)) setDiff(parsed.diff);
        if (typeof parsed.sound === 'boolean') setSound(parsed.sound);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveState = useCallback((newBest: Record<string, number>, newDiff: Difficulty, newSound: boolean) => {
    try {
      localStorage.setItem('memlab', JSON.stringify({ diff: newDiff, sound: newSound, best: newBest }));
    } catch {
      // ignore
    }
  }, []);

  const updateBestScore = useCallback((gameId: GameId, value: number, lowerIsBetter: boolean = false): boolean => {
    const key = `${gameId}:${diff}`;
    const curBest = bestScores[key];
    const isNew = curBest === undefined || (lowerIsBetter ? value < curBest : value > curBest);
    if (isNew) {
      const updated = { ...bestScores, [key]: value };
      setBestScores(updated);
      saveState(updated, diff, sound);
    }
    return isNew;
  }, [diff, bestScores, sound, saveState]);

  const handleDiffChange = (newDiff: Difficulty) => {
    setDiff(newDiff);
    saveState(bestScores, newDiff, sound);
  };

  const handleSoundToggle = () => {
    const next = !sound;
    setSound(next);
    saveState(bestScores, diff, next);
  };

  const handleResetScores = () => {
    if (window.confirm('Are you sure you want to clear all your saved high scores?')) {
      setBestScores({});
      saveState({}, diff, sound);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '1.5rem 1rem 3.5rem', minHeight: '80vh', color: 'var(--text-color, #111)' }}>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "Free Online Memory Test",
                "url": "https://fixedaim.com/memory-test",
                "applicationCategory": "EducationalApplication",
                "operatingSystem": "Any",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                "description": "Take the free memory test on FixedAim. Four cognitive brain games: card match, pattern echo, number span and spatial recall with 3 difficulty modes."
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fixedaim.com/" },
                  { "@type": "ListItem", "position": 2, "name": "Benchmark", "item": "https://fixedaim.com/benchmark" },
                  { "@type": "ListItem", "position": 3, "name": "Memory Test", "item": "https://fixedaim.com/memory-test" }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": FAQS.map(f => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
              }
            ]
          })
        }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', fontWeight: 700, marginBottom: '1.25rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#000', background: '#FFE033', padding: '3px 8px', border: '2px solid #000', boxShadow: '2px 2px 0 #000' }}>
          <Home size={14} /> Home
        </Link>
        <ChevronRight size={14} />
        <Link href="/benchmark" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: '#000', background: '#FFE033', padding: '3px 8px', border: '2px solid #000', boxShadow: '2px 2px 0 #000' }}>
          Benchmark
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: '#000', background: '#FFF', padding: '3px 8px', border: '2px solid #000', boxShadow: '2px 2px 0 #000' }}>
          Memory Test
        </span>
      </nav>

      {/* Header Bar */}
      <header style={{
        background: 'var(--card-bg, #FFFFFF)',
        border: '3px solid #000',
        boxShadow: '6px 6px 0 0 #000',
        padding: '1.5rem',
        marginBottom: '1.75rem',
        borderRadius: '12px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#6C4AB6', color: '#FFF', border: '2px solid #000', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '6px' }}>
              <Brain size={14} /> 4 Cognitive Brain Games
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', fontWeight: 900, margin: '2px 0 6px', fontFamily: "'Barlow Condensed', 'Public Sans', sans-serif", letterSpacing: '-0.02em' }}>
              Free Online Memory Test
            </h1>
            <p style={{ margin: 0, color: '#555', fontSize: '0.95rem', fontWeight: 600 }}>
              Test and train your visual, sequence, short-term, and spatial memory with instant scoring.
            </p>
          </div>

          {/* Controls Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            {/* Difficulty Toggle */}
            <div style={{ display: 'flex', border: '2px solid #000', background: '#FFF', boxShadow: '3px 3px 0 #000', overflow: 'hidden' }}>
              {(['easy', 'normal', 'hard'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => handleDiffChange(d)}
                  style={{
                    border: 'none',
                    borderRight: d !== 'hard' ? '2px solid #000' : 'none',
                    background: diff === d ? '#000' : '#FFF',
                    color: diff === d ? '#FFF' : '#000',
                    fontWeight: 800,
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    textTransform: 'capitalize',
                    cursor: 'pointer'
                  }}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Sound Toggle */}
            <button
              onClick={handleSoundToggle}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                border: '2px solid #000',
                background: sound ? '#A7F3D0' : '#FEE2E2',
                color: '#000',
                fontWeight: 800,
                fontSize: '0.85rem',
                padding: '6px 12px',
                boxShadow: '3px 3px 0 #000',
                cursor: 'pointer'
              }}
              title="Toggle Audio Feedback"
            >
              {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{sound ? 'Sound On' : 'Sound Off'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={handleResetScores}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                border: '2px solid #000',
                background: '#FFF',
                color: '#000',
                fontWeight: 800,
                fontSize: '0.85rem',
                padding: '6px 12px',
                boxShadow: '3px 3px 0 #000',
                cursor: 'pointer'
              }}
              title="Reset All High Scores"
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <section style={{ marginBottom: '2.5rem' }}>
        {activeGame === null ? (
          /* Hub Grid of 4 Games */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {GAMES.map((g) => {
              const bestKey = `${g.id}:${diff}`;
              const bestVal = bestScores[bestKey];
              return (
                <div
                  key={g.id}
                  onClick={() => setActiveGame(g.id)}
                  style={{
                    background: 'var(--card-bg, #FFFFFF)',
                    border: '3px solid #000',
                    borderLeft: `10px solid ${g.color}`,
                    boxShadow: '5px 5px 0 0 #000',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.12s, box-shadow 0.12s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                    e.currentTarget.style.boxShadow = '7px 7px 0 0 #000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = '5px 5px 0 0 #000';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        background: g.color,
                        color: '#FFF',
                        padding: '3px 8px',
                        border: '2px solid #000'
                      }}>
                        {g.badge}
                      </span>
                    </div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '6px 0 6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
                      {g.name}
                    </h2>
                    <p style={{ margin: '0 0 16px', fontSize: '0.9rem', color: '#555', lineHeight: 1.45 }}>
                      {g.desc}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '2px dashed #000',
                    paddingTop: '12px',
                    marginTop: '8px'
                  }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#333' }}>
                      Best ({diff}): <strong style={{ color: g.color }}>{bestVal !== undefined ? g.fmt(bestVal) : 'Not played'}</strong>
                    </span>
                    <button
                      style={{
                        background: '#FFE033',
                        color: '#000',
                        border: '2px solid #000',
                        boxShadow: '2px 2px 0 #000',
                        fontWeight: 900,
                        fontSize: '0.85rem',
                        padding: '6px 14px',
                        cursor: 'pointer'
                      }}
                    >
                      PLAY →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Active Game Component Container */
          <div style={{
            background: 'var(--card-bg, #FFFFFF)',
            border: '3px solid #000',
            boxShadow: '6px 6px 0 0 #000',
            borderRadius: '12px',
            padding: '1.5rem',
            position: 'relative'
          }}>
            {/* Top Navigation in Game */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderBottom: '2px solid #000', paddingBottom: '12px', marginBottom: '1.25rem' }}>
              <button
                onClick={() => setActiveGame(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '2px solid #000',
                  background: '#FFF',
                  boxShadow: '3px 3px 0 #000',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  padding: '6px 14px',
                  cursor: 'pointer'
                }}
              >
                <ArrowLeft size={16} /> All Games
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', background: '#000', color: '#FFF', padding: '3px 10px', borderRadius: '4px' }}>
                  Mode: {diff}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', background: '#FFE033', color: '#000', border: '2px solid #000', padding: '2px 8px' }}>
                  {GAMES.find(g => g.id === activeGame)?.name}
                </span>
              </div>
            </div>

            {/* Render Specific Game */}
            {activeGame === 'match' && (
              <CardMatchGame
                diff={diff}
                onFinish={(moves) => updateBestScore('match', moves, true)}
                bestScore={bestScores[`match:${diff}`]}
                playBeep={playBeep}
                playSuccess={playSuccess}
                playError={playError}
                onBack={() => setActiveGame(null)}
              />
            )}

            {activeGame === 'seq' && (
              <PatternEchoGame
                diff={diff}
                onFinish={(round) => updateBestScore('seq', round, false)}
                bestScore={bestScores[`seq:${diff}`]}
                playBeep={playBeep}
                playSuccess={playSuccess}
                playError={playError}
                onBack={() => setActiveGame(null)}
              />
            )}

            {activeGame === 'digits' && (
              <NumberSpanGame
                diff={diff}
                onFinish={(digits) => updateBestScore('digits', digits, false)}
                bestScore={bestScores[`digits:${diff}`]}
                playBeep={playBeep}
                playSuccess={playSuccess}
                playError={playError}
                onBack={() => setActiveGame(null)}
              />
            )}

            {activeGame === 'grid' && (
              <SpotTheTilesGame
                diff={diff}
                onFinish={(level) => updateBestScore('grid', level, false)}
                bestScore={bestScores[`grid:${diff}`]}
                playBeep={playBeep}
                playSuccess={playSuccess}
                playError={playError}
                onBack={() => setActiveGame(null)}
              />
            )}
          </div>
        )}
      </section>

      {/* SEO Article & Educational Guide */}
      <section style={{
        background: 'var(--card-bg, #FFFFFF)',
        border: '3px solid #000',
        boxShadow: '6px 6px 0 0 #000',
        borderRadius: '12px',
        padding: '2rem 1.75rem',
        marginBottom: '2.5rem',
        lineHeight: 1.7
      }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0 0 12px', fontFamily: "'Barlow Condensed', sans-serif" }}>
          Test Your Memory Online with FixedAim
        </h2>
        <p style={{ margin: '0 0 16px', color: '#333', fontSize: '1rem' }}>
          Welcome to the FixedAim memory test, a free set of online cognitive memory games that lets you check how well you remember pictures, numbers, positions and patterns. Each round takes only a few minutes, making it ideal as a daily mental warm-up before competitive gaming, esports practice, or study sessions. Choose a game above, pick Easy, Normal or Hard, and try to beat your own best score.
        </p>
        <p style={{ margin: '0 0 24px', color: '#333', fontSize: '1rem' }}>
          Memory is not a single isolated muscle. Your brain relies on distinct neural pathways to hold a phone number for several seconds (working short-term memory), to memorize coordinates and map layouts (spatial recall), or to repeat complex ability combos (sequential memory). That is why our test is divided into four distinct cognitive disciplines rather than a generic puzzle.
        </p>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '24px 0 12px', fontFamily: "'Barlow Condensed', sans-serif", borderTop: '2px solid #000', paddingTop: '18px' }}>
          The Four Memory Games Explained
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', margin: '16px 0 24px' }}>
          <div style={{ background: '#F8FAFC', border: '2px solid #000', padding: '14px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, margin: '0 0 6px', color: '#6C4AB6' }}>
              1. Card Match: Visual Memory
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#444' }}>
              Flip two cards at a time and find every matching pair. To finish in fewer moves, you need to remember which symbol was where. This game trains visual memory and the habit of paying attention to what you have already seen.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', border: '2px solid #000', padding: '14px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, margin: '0 0 6px', color: '#2B4EDB' }}>
              2. Pattern Echo: Sequence Memory
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#444' }}>
              Watch a sequence of coloured pads light up, then repeat it in the same order. Every round adds one more step. It is a classic test of sequence memory and concentration, because one lost step breaks the whole pattern.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', border: '2px solid #000', padding: '14px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, margin: '0 0 6px', color: '#E8577A' }}>
              3. Number Span: Short-Term Recall
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#444' }}>
              A number appears for a short time and then disappears. Type it back exactly. Number span tasks are widely used in psychology to explore working memory capacity (Miller&apos;s Law of 7±2 chunks).
            </p>
          </div>

          <div style={{ background: '#F8FAFC', border: '2px solid #000', padding: '14px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, margin: '0 0 6px', color: '#10B981' }}>
              4. Spot the Tiles: Spatial Recall
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#444' }}>
              Several tiles on a grid flash and hide. Tap the same tiles from memory. The grid grows as you level up, which makes this an exceptional challenge for spatial orientation and visual coordinate tracking.
            </p>
          </div>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '24px 0 12px', fontFamily: "'Barlow Condensed', sans-serif", borderTop: '2px solid #000', paddingTop: '18px' }}>
          How to Get a Better Memory Test Score
        </h2>
        <ol style={{ paddingLeft: '1.25rem', margin: '0 0 24px', fontSize: '0.95rem', color: '#333' }}>
          <li style={{ marginBottom: '8px' }}><strong>Use Chunking:</strong> Split long digit chains into small groups (e.g. &apos;48 27 91&apos; instead of individual isolated digits).</li>
          <li style={{ marginBottom: '8px' }}><strong>Visualize and Create Stories:</strong> Link colors, positions, and emojis into a rapid mental scene. Images are recalled far faster than raw symbols.</li>
          <li style={{ marginBottom: '8px' }}><strong>Rehearse Sub-vocally:</strong> Quietly whisper or repeat numbers in your mind while the input screen loads.</li>
          <li style={{ marginBottom: '8px' }}><strong>Eliminate Distractions:</strong> Close background tabs, silence notifications, and play in a steady, calm environment.</li>
          <li style={{ marginBottom: '8px' }}><strong>Play in Short, Focused Sessions:</strong> 5 to 10 minutes of intense focus beats hours of fatigue.</li>
          <li style={{ marginBottom: '8px' }}><strong>Support Physical Well-being:</strong> Hydration, adequate sleep, and brief eye breaks directly improve cognitive processing speeds.</li>
        </ol>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '24px 0 12px', fontFamily: "'Barlow Condensed', sans-serif", borderTop: '2px solid #000', paddingTop: '18px' }}>
          Why Memory & Focus Matter in Gaming & Daily Life
        </h2>
        <p style={{ margin: '0 0 14px', color: '#333', fontSize: '0.95rem' }}>
          In competitive esports (FPS, MOBA, RTS), players constantly track enemy cooldowns, minimap rotations, bullet counts, and team positions while reacting under millisecond time frames. A short cognitive warm-up sharpens situational awareness and prevents mental lag during clutch situations.
        </p>
        <p style={{ margin: '0 0 14px', color: '#333', fontSize: '0.95rem' }}>
          Because your best scores are recorded locally per difficulty, you can return daily to benchmark your focus, identify fatigue, and track personal cognitive consistency.
        </p>

        <p style={{ fontSize: '0.85rem', color: '#777', marginTop: '20px', borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
          <em>Disclaimer: These online games are created for entertainment, practice, and personal skill tracking. They are not intended as clinical diagnostic or IQ measurement tools.</em>
        </p>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{
        background: 'var(--card-bg, #FFFFFF)',
        border: '3px solid #000',
        boxShadow: '6px 6px 0 0 #000',
        borderRadius: '12px',
        padding: '2rem 1.75rem',
        marginBottom: '2.5rem'
      }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0 0 16px', fontFamily: "'Barlow Condensed', sans-serif" }}>
          Frequently Asked Questions (FAQ)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {FAQS.map((faq, idx) => (
            <details
              key={idx}
              style={{
                border: '2px solid #000',
                background: '#F8FAFC',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <summary style={{ fontWeight: 800, fontSize: '1rem', color: '#111', outline: 'none' }}>
                {faq.q}
              </summary>
              <p style={{ margin: '10px 0 0', fontSize: '0.9rem', color: '#444', lineHeight: 1.55 }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Cross-Link Hub & More Tools */}
      <section style={{
        background: 'var(--card-bg, #FFFFFF)',
        border: '3px solid #000',
        boxShadow: '6px 6px 0 0 #000',
        borderRadius: '12px',
        padding: '2rem 1.75rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0 0 16px', fontFamily: "'Barlow Condensed', sans-serif" }}>
          Explore More Speed, Aim & Benchmark Tools
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
          {MORE_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px 8px',
                background: '#F8FAFC',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#000',
                fontWeight: 800,
                fontSize: '0.85rem',
                textAlign: 'center',
                gap: '6px'
              }}
            >
              <div style={{ color: '#000' }}>{tool.icon}</div>
              <span>{tool.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   SUB-GAME 1: CARD MATCH (Visual Memory)
   ========================================================================= */
interface CardMatchProps {
  diff: Difficulty;
  onFinish: (moves: number) => boolean;
  bestScore?: number;
  playBeep: (freq: number, duration: number) => void;
  playSuccess: () => void;
  playError: () => void;
  onBack: () => void;
}

interface CardItem {
  id: number;
  symbol: string;
  isUp: boolean;
  isDone: boolean;
}

function CardMatchGame({ diff, onFinish, bestScore, playBeep, playSuccess, playError, onBack }: CardMatchProps) {
  const pairsCount = diff === 'easy' ? 6 : diff === 'normal' ? 8 : 12;
  const [cards, setCards] = useState<CardItem[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Tap a card to begin.');
  const [firstPick, setFirstPick] = useState<number | null>(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);

  const initGame = useCallback(() => {
    const symbols = ['🦊', '🐙', '🌵', '🚀', '🍉', '🎸', '🦉', '🍄', '⚓', '🔮', '🐝', '🧊'].slice(0, pairsCount);
    const deck = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((sym, idx) => ({ id: idx, symbol: sym, isUp: false, isDone: false }));
    setCards(deck);
    setMoves(0);
    setTime(0);
    setTimerRunning(false);
    setStatusMsg('Tap a card to begin.');
    setFirstPick(null);
    setLockBoard(false);
    setIsGameOver(false);
    setIsNewBest(false);
  }, [pairsCount]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const handleCardClick = (idx: number) => {
    if (lockBoard || cards[idx].isUp || cards[idx].isDone || isGameOver) return;

    if (!timerRunning) setTimerRunning(true);
    playBeep(440, 0.08);

    const updated = [...cards];
    updated[idx].isUp = true;
    setCards(updated);

    if (firstPick === null) {
      setFirstPick(idx);
    } else {
      const newMoves = moves + 1;
      setMoves(newMoves);

      const firstCard = cards[firstPick];
      const secondCard = updated[idx];

      if (firstCard.symbol === secondCard.symbol) {
        // MATCH
        updated[firstPick].isDone = true;
        updated[idx].isDone = true;
        setCards(updated);
        setFirstPick(null);
        playSuccess();

        const foundPairs = updated.filter((c) => c.isDone).length / 2;
        setStatusMsg(`${foundPairs} of ${pairsCount} pairs found!`);

        if (foundPairs === pairsCount) {
          setTimerRunning(false);
          setIsGameOver(true);
          const isRecord = onFinish(newMoves);
          setIsNewBest(isRecord);
        }
      } else {
        // MISMATCH
        setLockBoard(true);
        playError();
        setStatusMsg('Not a match.');
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c, i) => (i === firstPick || i === idx ? { ...c, isUp: false } : c))
          );
          setFirstPick(null);
          setLockBoard(false);
        }, 800);
      }
    }
  };

  const cols = pairsCount === 12 ? 6 : 4;

  if (isGameOver) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <Trophy size={48} color="#FFE033" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
          All Pairs Found!
        </h3>
        <p style={{ fontSize: '1.1rem', margin: '0 0 12px', color: '#444' }}>
          Completed in <strong>{moves} moves</strong> ({Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}).
        </p>
        {isNewBest ? (
          <p style={{ color: '#10B981', fontWeight: 900, fontSize: '1.2rem', margin: '0 0 20px' }}>
            🎉 New Best Record for {diff.toUpperCase()} mode!
          </p>
        ) : (
          <p style={{ color: '#555', fontSize: '0.95rem', margin: '0 0 20px' }}>
            Best on {diff}: {bestScore !== undefined ? `${bestScore} moves` : 'None'}
          </p>
        )}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={initGame}
            style={{
              background: '#6C4AB6',
              color: '#FFF',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              fontWeight: 800,
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Play Again
          </button>
          <button
            onClick={onBack}
            style={{
              background: '#FFF',
              color: '#000',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              fontWeight: 800,
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            All Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontWeight: 700, fontSize: '0.95rem' }}>
        <div>Moves: <span style={{ color: '#6C4AB6', fontWeight: 900 }}>{moves}</span></div>
        <div>Time: <span style={{ color: '#333', fontWeight: 900 }}>{Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</span></div>
        <div>Best: <span>{bestScore !== undefined ? `${bestScore} moves` : 'None'}</span></div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: '8px',
        maxWidth: cols === 6 ? '540px' : '400px',
        margin: '0 auto 16px'
      }}>
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            disabled={card.isDone || lockBoard}
            style={{
              aspectRatio: '1',
              border: '2px solid #000',
              borderRadius: '8px',
              background: card.isDone ? '#A7F3D0' : card.isUp ? '#FFFFFF' : '#6C4AB6',
              color: card.isUp || card.isDone ? '#000' : '#FFF',
              fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: card.isDone ? 'default' : 'pointer',
              boxShadow: card.isDone ? 'none' : '3px 3px 0 #000',
              transform: card.isUp ? 'scale(1.02)' : 'none',
              transition: 'all 0.15s ease'
            }}
            aria-label={card.isUp || card.isDone ? card.symbol : 'Hidden card'}
          >
            {card.isUp || card.isDone ? card.symbol : '?'}
          </button>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: '#666', fontWeight: 600, margin: 0, minHeight: '1.5em' }}>
        {statusMsg}
      </p>
    </div>
  );
}

/* =========================================================================
   SUB-GAME 2: PATTERN ECHO (Sequence Memory)
   ========================================================================= */
interface PatternEchoProps {
  diff: Difficulty;
  onFinish: (round: number) => boolean;
  bestScore?: number;
  playBeep: (freq: number, duration: number) => void;
  playSuccess: () => void;
  playError: () => void;
  onBack: () => void;
}

const PAD_COLORS = [
  { name: 'Red', color: '#E8577A', activeColor: '#FF8BA7', freq: 262 },
  { name: 'Blue', color: '#2B4EDB', activeColor: '#7BA2FF', freq: 330 },
  { name: 'Green', color: '#10B981', activeColor: '#6EE7B7', freq: 392 },
  { name: 'Yellow', color: '#F59E0B', activeColor: '#FDE68A', freq: 523 }
];

function PatternEchoGame({ diff, onFinish, bestScore, playBeep, playSuccess, playError, onBack }: PatternEchoProps) {
  const speed = diff === 'easy' ? 650 : diff === 'normal' ? 480 : 300;
  const [seq, setSeq] = useState<number[]>([]);
  const [playerPos, setPlayerPos] = useState(0);
  const [round, setRound] = useState(0);
  const [activePad, setActivePad] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(true);
  const [statusMsg, setStatusMsg] = useState('Get ready…');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);

  const startNextRound = useCallback((currentSeq: number[]) => {
    const nextPad = Math.floor(Math.random() * 4);
    const updatedSeq = [...currentSeq, nextPad];
    setSeq(updatedSeq);
    setPlayerPos(0);
    setIsLocked(true);
    setRound(updatedSeq.length);
    setStatusMsg('Watch closely…');

    // Playback sequence
    updatedSeq.forEach((padIndex, i) => {
      setTimeout(() => {
        setActivePad(padIndex);
        playBeep(PAD_COLORS[padIndex].freq, speed / 1000);
        setTimeout(() => setActivePad(null), speed * 0.75);
      }, 600 + i * (speed + 120));
    });

    setTimeout(() => {
      setIsLocked(false);
      setStatusMsg(`Your turn: Repeat ${updatedSeq.length} step${updatedSeq.length > 1 ? 's' : ''}`);
    }, 600 + updatedSeq.length * (speed + 120));
  }, [playBeep, speed]);

  const initGame = useCallback(() => {
    setSeq([]);
    setPlayerPos(0);
    setRound(0);
    setActivePad(null);
    setIsGameOver(false);
    setIsNewBest(false);
    setTimeout(() => {
      startNextRound([]);
    }, 400);
  }, [startNextRound]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handlePadPress = (padIndex: number) => {
    if (isLocked || isGameOver) return;

    // Flash pressed pad
    setActivePad(padIndex);
    playBeep(PAD_COLORS[padIndex].freq, 0.15);
    setTimeout(() => setActivePad(null), 150);

    if (padIndex !== seq[playerPos]) {
      // Mistake
      playError();
      setIsLocked(true);
      const finalRound = Math.max(0, round - 1);
      const isRecord = onFinish(finalRound);
      setIsNewBest(isRecord);
      setTimeout(() => {
        setIsGameOver(true);
      }, 600);
      return;
    }

    const nextPos = playerPos + 1;
    if (nextPos === seq.length) {
      // Completed round
      playSuccess();
      setIsLocked(true);
      setStatusMsg('Correct! Well done.');
      setTimeout(() => {
        startNextRound(seq);
      }, 800);
    } else {
      setPlayerPos(nextPos);
    }
  };

  if (isGameOver) {
    const finalScore = Math.max(0, round - 1);
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <Sparkles size={48} color="#E8577A" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
          Pattern Broken!
        </h3>
        <p style={{ fontSize: '1.1rem', margin: '0 0 12px', color: '#444' }}>
          You reached <strong>Round {finalScore}</strong>.
        </p>
        {isNewBest && finalScore > 0 ? (
          <p style={{ color: '#10B981', fontWeight: 900, fontSize: '1.2rem', margin: '0 0 20px' }}>
            🎉 New Best Record for {diff.toUpperCase()} mode!
          </p>
        ) : (
          <p style={{ color: '#555', fontSize: '0.95rem', margin: '0 0 20px' }}>
            Best on {diff}: {bestScore !== undefined ? `Round ${bestScore}` : 'None'}
          </p>
        )}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={initGame}
            style={{
              background: '#2B4EDB',
              color: '#FFF',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              fontWeight: 800,
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
          <button
            onClick={onBack}
            style={{
              background: '#FFF',
              color: '#000',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              fontWeight: 800,
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            All Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontWeight: 700, fontSize: '0.95rem' }}>
        <div>Current Round: <span style={{ color: '#2B4EDB', fontWeight: 900 }}>{round}</span></div>
        <div>Best Record: <span>{bestScore !== undefined ? `Round ${bestScore}` : 'None'}</span></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '340px', margin: '0 auto 16px' }}>
        {PAD_COLORS.map((pad, idx) => {
          const isActive = activePad === idx;
          return (
            <button
              key={pad.name}
              onClick={() => handlePadPress(idx)}
              disabled={isLocked}
              style={{
                aspectRatio: '1.2',
                border: '3px solid #000',
                borderRadius: '14px',
                background: isActive ? pad.activeColor : pad.color,
                boxShadow: isActive ? 'none' : '4px 4px 0 #000',
                transform: isActive ? 'scale(0.96)' : 'none',
                opacity: isLocked && !isActive ? 0.75 : 1,
                cursor: isLocked ? 'default' : 'pointer',
                transition: 'background 0.1s, transform 0.1s'
              }}
              aria-label={pad.name}
            />
          );
        })}
      </div>

      <p style={{ textAlign: 'center', color: '#444', fontWeight: 700, margin: 0, minHeight: '1.5em' }}>
        {statusMsg}
      </p>
    </div>
  );
}

/* =========================================================================
   SUB-GAME 3: NUMBER SPAN (Short-Term Memory)
   ========================================================================= */
interface NumberSpanProps {
  diff: Difficulty;
  onFinish: (digits: number) => boolean;
  bestScore?: number;
  playBeep: (freq: number, duration: number) => void;
  playSuccess: () => void;
  playError: () => void;
  onBack: () => void;
}

function NumberSpanGame({ diff, onFinish, bestScore, playBeep, playSuccess, playError, onBack }: NumberSpanProps) {
  const initialLen = diff === 'easy' ? 3 : diff === 'normal' ? 4 : 5;
  const displayMs = diff === 'hard' ? 300 : diff === 'normal' ? 450 : 650;

  const [len, setLen] = useState(initialLen);
  const [lives, setLives] = useState(3);
  const [maxRecalled, setMaxRecalled] = useState(0);
  const [targetNumber, setTargetNumber] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Memorize it…');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const startRound = useCallback((currentLen: number) => {
    let numStr = '';
    for (let i = 0; i < currentLen; i++) {
      numStr += Math.floor(Math.random() * 10).toString();
    }
    setTargetNumber(numStr);
    setDisplayText(numStr);
    setInputVal('');
    setIsInputActive(false);
    setStatusMsg('Memorize it…');

    const totalShowTime = displayMs + currentLen * displayMs * 0.6;
    setTimeout(() => {
      setDisplayText('•'.repeat(currentLen));
      setStatusMsg('Type what you saw:');
      setIsInputActive(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    }, totalShowTime);
  }, [displayMs]);

  const initGame = useCallback(() => {
    setLen(initialLen);
    setLives(3);
    setMaxRecalled(0);
    setIsGameOver(false);
    setIsNewBest(false);
    startRound(initialLen);
  }, [initialLen, startRound]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCheck = () => {
    if (!isInputActive || isGameOver) return;
    setIsInputActive(false);

    if (inputVal.trim() === targetNumber) {
      // Correct
      playSuccess();
      const newMax = Math.max(maxRecalled, len);
      setMaxRecalled(newMax);
      setDisplayText('✓ Correct');
      setStatusMsg('Great recall!');
      const nextLen = len + 1;
      setLen(nextLen);
      setTimeout(() => {
        startRound(nextLen);
      }, 900);
    } else {
      // Wrong
      playError();
      const remainingLives = lives - 1;
      setLives(remainingLives);
      setDisplayText(targetNumber);
      setStatusMsg(`Oops! The number was ${targetNumber}`);

      if (remainingLives <= 0) {
        const isRecord = maxRecalled > 0 && onFinish(maxRecalled);
        setIsNewBest(isRecord);
        setTimeout(() => {
          setIsGameOver(true);
        }, 1500);
      } else {
        const nextLen = Math.max(3, len - 1);
        setLen(nextLen);
        setTimeout(() => {
          startRound(nextLen);
        }, 1600);
      }
    }
  };

  if (isGameOver) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <Trophy size={48} color="#E8577A" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
          Out of Lives!
        </h3>
        <p style={{ fontSize: '1.1rem', margin: '0 0 12px', color: '#444' }}>
          Longest number recalled: <strong>{maxRecalled} digits</strong>.
        </p>
        {isNewBest && maxRecalled > 0 ? (
          <p style={{ color: '#10B981', fontWeight: 900, fontSize: '1.2rem', margin: '0 0 20px' }}>
            🎉 New Best Record for {diff.toUpperCase()} mode!
          </p>
        ) : (
          <p style={{ color: '#555', fontSize: '0.95rem', margin: '0 0 20px' }}>
            Best on {diff}: {bestScore !== undefined ? `${bestScore} digits` : 'None'}
          </p>
        )}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={initGame}
            style={{
              background: '#E8577A',
              color: '#FFF',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              fontWeight: 800,
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Play Again
          </button>
          <button
            onClick={onBack}
            style={{
              background: '#FFF',
              color: '#000',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              fontWeight: 800,
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            All Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontWeight: 700, fontSize: '0.95rem' }}>
        <div>Length: <span style={{ color: '#E8577A', fontWeight: 900 }}>{len} digits</span></div>
        <div>Lives: <span style={{ color: '#E8577A', fontSize: '1.1rem' }}>{'♥'.repeat(Math.max(0, lives))}{'♡'.repeat(3 - Math.max(0, lives))}</span></div>
        <div>Best: <span>{bestScore !== undefined ? `${bestScore} digits` : 'None'}</span></div>
      </div>

      <div style={{
        fontSize: 'clamp(2.2rem, 8vw, 3.8rem)',
        fontWeight: 900,
        letterSpacing: '0.15em',
        textAlign: 'center',
        minHeight: '1.4em',
        fontVariantNumeric: 'tabular-nums',
        margin: '12px 0',
        color: '#111'
      }}>
        {displayText}
      </div>

      <p style={{ textAlign: 'center', color: '#555', fontWeight: 700, margin: '0 0 16px' }}>
        {statusMsg}
      </p>

      <div style={{ maxWidth: '340px', margin: '0 auto' }}>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleCheck();
          }}
          disabled={!isInputActive}
          placeholder={isInputActive ? 'Enter numbers' : 'Wait...'}
          style={{
            display: 'block',
            width: '100%',
            fontSize: '1.6rem',
            textAlign: 'center',
            letterSpacing: '0.2em',
            padding: '10px',
            border: '3px solid #000',
            borderRadius: '10px',
            background: isInputActive ? '#FFF' : '#F1F5F9',
            boxShadow: '3px 3px 0 #000',
            fontWeight: 800,
            marginBottom: '12px'
          }}
        />

        <button
          onClick={handleCheck}
          disabled={!isInputActive || inputVal.length === 0}
          style={{
            width: '100%',
            background: '#E8577A',
            color: '#FFF',
            border: '2px solid #000',
            boxShadow: '3px 3px 0 #000',
            fontWeight: 900,
            fontSize: '1.1rem',
            padding: '10px',
            cursor: !isInputActive || inputVal.length === 0 ? 'default' : 'pointer',
            opacity: !isInputActive || inputVal.length === 0 ? 0.6 : 1
          }}
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   SUB-GAME 4: SPOT THE TILES (Spatial Memory)
   ========================================================================= */
interface SpotTheTilesProps {
  diff: Difficulty;
  onFinish: (level: number) => boolean;
  bestScore?: number;
  playBeep: (freq: number, duration: number) => void;
  playSuccess: () => void;
  playError: () => void;
  onBack: () => void;
}

interface TileState {
  id: number;
  isLit: boolean;
  isOk: boolean;
  isBad: boolean;
}

function SpotTheTilesGame({ diff, onFinish, bestScore, playBeep, playSuccess, playError, onBack }: SpotTheTilesProps) {
  const initialLevel = diff === 'easy' ? 1 : diff === 'normal' ? 3 : 5;
  const showTime = diff === 'easy' ? 1400 : diff === 'normal' ? 1000 : 700;

  const [level, setLevel] = useState(initialLevel);
  const [lives, setLives] = useState(3);
  const [maxLevel, setMaxLevel] = useState(0);
  const [tiles, setTiles] = useState<TileState[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [gridSize, setGridSize] = useState(3);
  const [isOpen, setIsOpen] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Remember the lit tiles…');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);

  const startRound = useCallback((currentLevel: number) => {
    const size = Math.min(3 + Math.floor((currentLevel - 1) / 3), 6);
    const n = Math.min(currentLevel + 2, Math.floor(size * size * 0.6));
    setGridSize(size);

    const totalCells = size * size;
    const shuffledIndices = Array.from({ length: totalCells }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, n);

    setActiveIndices(shuffledIndices);
    setIsOpen(false);
    setStatusMsg('Remember the lit tiles…');

    // Create fresh grid
    const initialTiles = Array.from({ length: totalCells }, (_, i) => ({
      id: i,
      isLit: false,
      isOk: false,
      isBad: false
    }));
    setTiles(initialTiles);

    // Flash tiles
    setTimeout(() => {
      setTiles((prev) =>
        prev.map((t) => ({ ...t, isLit: shuffledIndices.includes(t.id) }))
      );
    }, 400);

    // Hide tiles & allow player input
    setTimeout(() => {
      setTiles((prev) => prev.map((t) => ({ ...t, isLit: false })));
      setIsOpen(true);
      setStatusMsg(`Tap the ${n} tiles you saw:`);
    }, 400 + showTime + n * 80);
  }, [showTime]);

  const initGame = useCallback(() => {
    setLevel(initialLevel);
    setLives(3);
    setMaxLevel(0);
    setIsGameOver(false);
    setIsNewBest(false);
    startRound(initialLevel);
  }, [initialLevel, startRound]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleTileClick = (idx: number) => {
    if (!isOpen || tiles[idx].isOk || tiles[idx].isBad || isGameOver) return;

    if (activeIndices.includes(idx)) {
      // Correct tile
      playBeep(520, 0.1);
      const updated = [...tiles];
      updated[idx].isOk = true;
      setTiles(updated);

      const hitCount = updated.filter((t) => t.isOk).length;
      if (hitCount === activeIndices.length) {
        // Level cleared
        setIsOpen(false);
        playSuccess();
        const newMax = Math.max(maxLevel, level);
        setMaxLevel(newMax);
        setStatusMsg('Level cleared! Well done.');
        const nextLevel = level + 1;
        setLevel(nextLevel);
        setTimeout(() => {
          startRound(nextLevel);
        }, 900);
      }
    } else {
      // Wrong tile
      setIsOpen(false);
      playError();
      const updated = [...tiles];
      updated[idx].isBad = true;
      // Reveal remaining tiles
      activeIndices.forEach((k) => {
        if (!updated[k].isOk) updated[k].isLit = true;
      });
      setTiles(updated);

      const remainingLives = lives - 1;
      setLives(remainingLives);
      setStatusMsg('That tile wasn’t lit!');

      if (remainingLives <= 0) {
        const isRecord = maxLevel > 0 && onFinish(maxLevel);
        setIsNewBest(isRecord);
        setTimeout(() => {
          setIsGameOver(true);
        }, 1400);
      } else {
        setTimeout(() => {
          startRound(level);
        }, 1500);
      }
    }
  };

  if (isGameOver) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <Trophy size={48} color="#10B981" style={{ margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 6px', fontFamily: "'Barlow Condensed', sans-serif" }}>
          Out of Lives!
        </h3>
        <p style={{ fontSize: '1.1rem', margin: '0 0 12px', color: '#444' }}>
          You reached and cleared <strong>Level {maxLevel}</strong>.
        </p>
        {isNewBest && maxLevel > 0 ? (
          <p style={{ color: '#10B981', fontWeight: 900, fontSize: '1.2rem', margin: '0 0 20px' }}>
            🎉 New Best Record for {diff.toUpperCase()} mode!
          </p>
        ) : (
          <p style={{ color: '#555', fontSize: '0.95rem', margin: '0 0 20px' }}>
            Best on {diff}: {bestScore !== undefined ? `Level ${bestScore}` : 'None'}
          </p>
        )}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={initGame}
            style={{
              background: '#10B981',
              color: '#FFF',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              fontWeight: 800,
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Play Again
          </button>
          <button
            onClick={onBack}
            style={{
              background: '#FFF',
              color: '#000',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              fontWeight: 800,
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            All Games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontWeight: 700, fontSize: '0.95rem' }}>
        <div>Level: <span style={{ color: '#10B981', fontWeight: 900 }}>{level}</span></div>
        <div>Lives: <span style={{ color: '#E8577A', fontSize: '1.1rem' }}>{'♥'.repeat(Math.max(0, lives))}{'♡'.repeat(3 - Math.max(0, lives))}</span></div>
        <div>Best: <span>{bestScore !== undefined ? `Level ${bestScore}` : 'None'}</span></div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '8px',
        maxWidth: '360px',
        margin: '0 auto 16px'
      }}>
        {tiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleTileClick(tile.id)}
            disabled={!isOpen || tile.isOk || tile.isBad}
            style={{
              aspectRatio: '1',
              border: '2px solid #000',
              borderRadius: '8px',
              background: tile.isOk
                ? '#10B981'
                : tile.isBad
                ? '#EF4444'
                : tile.isLit
                ? '#F59E0B'
                : '#E2E8F0',
              cursor: isOpen && !tile.isOk && !tile.isBad ? 'pointer' : 'default',
              boxShadow: tile.isOk || tile.isBad ? 'none' : '2px 2px 0 #000',
              transition: 'background 0.15s, transform 0.1s'
            }}
            aria-label={`Tile ${tile.id + 1}`}
          />
        ))}
      </div>

      <p style={{ textAlign: 'center', color: '#555', fontWeight: 700, margin: 0, minHeight: '1.5em' }}>
        {statusMsg}
      </p>
    </div>
  );
}
