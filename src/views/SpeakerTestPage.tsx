"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Volume2, Square, Play, RotateCcw, Activity } from 'lucide-react';

const SITE_URL = 'https://fixedaim.com/speaker-test';

interface ToolLink { label: string; href: string; icon: React.ReactNode; }
const MORE_TOOLS: ToolLink[] = [
  { label: 'CPS Test', href: '/cps-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/><circle cx="12" cy="14" r="1" fill="currentColor"/></svg> },
  { label: 'Internet Speed', href: '/internet-speed', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="m16 8-4 4"/></svg> },
  { label: 'Key Visualizer', href: '/key-visualizer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h1m4 0h1m4 0h1M6 13h1m4 0h1m4 0h1"/></svg> },
  { label: 'Double Click', href: '/double-click', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/></svg> },
  { label: 'Reaction Time', href: '/reaction-time', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { label: 'F1 Reaction', href: '/f1-reaction', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { label: 'Aim Trainer', href: '/aim-trainer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { label: 'Typing Test', href: '/typing-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 15h8M7 11h2m3 0h2m3 0h-1"/></svg> },
  { label: 'Spacebar Counter', href: '/spacebar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="6" y1="15" x2="18" y2="15"/></svg> },
  { label: 'APM Drill', href: '/apm-drill', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { label: 'Space Waves', href: '/space-waves', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg> },
];

const FAQS = [
  { q: "What is the best free online speaker test?", a: "A good online speaker test checks the left and right channels, bass, a full frequency sweep and phase in one place, works on any phone or computer, and needs no app or sign-up. This page runs in your browser with the Web Audio API, so nothing is uploaded." },
  { q: "How do I test my left and right speakers?", a: "Choose Left, then Right, in the Output switch and play any sound, such as pink noise or a 1 kHz tone. Each sound should come only from the matching speaker. Alternate mode switches sides every second, which makes swapped channels easy to notice." },
  { q: "How do I test bass or a subwoofer?", a: "Use the Bass test buttons from 20 Hz to 80 Hz. A subwoofer should play all of them as a low rumble. Laptop and phone speakers usually fade out below 50 Hz, which is normal." },
  { q: "What is the frequency range of speakers and human hearing?", a: "Healthy young ears hear roughly 20 Hz to 20 kHz, and the upper limit drops with age. Most small speakers cover about 80 Hz to 18 kHz, while good floor-standing speakers and subwoofers reach lower." },
  { q: "How do I check if my speakers are in phase?", a: "Play the in-phase tone, then the out-of-phase tone. The in-phase tone should sound solid and centered. If it sounds thinner or hollower than the out-of-phase tone, one speaker is probably wired with reversed polarity." },
  { q: "Why is there no sound during the speaker test?", a: "Browsers only play audio after you click a button, so press a Play button first. Then check your device volume, mute state, the browser tab mute icon, the selected output device and, on iPhone, the silent switch." },
  { q: "Is the speaker test safe for my speakers and ears?", a: "Yes at moderate volume. Start with the volume slider low and raise it slowly, and avoid long loud sessions with high tones, noise or deep bass, which can strain small speakers and tire your ears." },
  { q: "Can I use this test for headphones and earbuds?", a: "Yes. The left and right, alternate, pan and phase tests work well for headphones, and a sweep helps you hear distortion or missing highs and lows." },
  { q: "What is pink noise and why use it?", a: "Pink noise has equal energy in each octave, so it sounds balanced to the human ear. It is widely used to check speaker balance and room acoustics. White noise sounds brighter, and brown noise is heavier in the bass." },
];

export default function SpeakerTestPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;

    const $ = (s: string) => root.querySelector(s) as HTMLElement;
    const $$ = (s: string) => [...root.querySelectorAll(s)] as HTMLElement[];

    let ctx: AudioContext | null = null;
    let master: GainNode | null = null;
    let an: AnalyserNode | null = null;
    let merger: ChannelMergerNode | null = null;
    let tbuf: Float32Array<ArrayBuffer> | null = null;
    let fbuf: Uint8Array<ArrayBuffer> | null = null;
    let cur: any = null;
    let out = 'both';
    let flip = 0;
    let vol = 0.25;
    let lv = 0;
    let animId: number | null = null;

    const sGain = (v: number) => Math.pow(v / 100, 2);

    function init() {
      if (ctx) {
        if (ctx.state === 'suspended') ctx.resume();
        return;
      }
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AudioCtx();
      master = ctx.createGain();
      master.gain.value = vol;
      an = ctx.createAnalyser();
      an.fftSize = 2048;
      an.smoothingTimeConstant = 0.8;
      merger = ctx.createChannelMerger(2);
      merger.connect(master);
      master.connect(an);
      an.connect(ctx.destination);
      tbuf = new Float32Array(an.fftSize);
    }

    function weights() {
      return out === 'left' ? [1, 0] : out === 'right' ? [0, 1] : out === 'alt' ? (flip ? [0, 1] : [1, 0]) : [1, 1];
    }

    function route() {
      if (!ctx || !cur || cur.pan) return;
      const w = weights();
      const t = ctx.currentTime;
      cur.gl.gain.setTargetAtTime(w[0], t, 0.01);
      cur.gr.gain.setTargetAtTime(w[1] * cur.sign, t, 0.01);
    }

    const flipInterval = setInterval(() => {
      flip ^= 1;
      route();
    }, 1000);

    function noise(kind: string) {
      if (!ctx) return null;
      const n = ctx.sampleRate * 4;
      const b = ctx.createBuffer(1, n, ctx.sampleRate);
      const d = b.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, last = 0;
      for (let i = 0; i < n; i++) {
        const w = Math.random() * 2 - 1;
        if (kind === 'white') d[i] = w * 0.5;
        else if (kind === 'pink') {
          b0 = 0.99886 * b0 + w * 0.0555179;
          b1 = 0.99332 * b1 + w * 0.0750759;
          b2 = 0.969 * b2 + w * 0.153852;
          b3 = 0.8665 * b3 + w * 0.3104856;
          b4 = 0.55 * b4 + w * 0.5329522;
          b5 = -0.7616 * b5 - w * 0.016898;
          d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
          b6 = w * 0.115926;
        } else {
          last = (last + 0.02 * w) / 1.02;
          d[i] = last * 3.5;
        }
      }
      return b;
    }

    function stop(quiet?: boolean) {
      if (!cur) return;
      const c = cur;
      cur = null;
      if (ctx) {
        const t = ctx.currentTime;
        c.env.gain.cancelScheduledValues(t);
        c.env.gain.setValueAtTime(c.env.gain.value, t);
        c.env.gain.linearRampToValueAtTime(0, t + 0.05);
        try { c.src.stop(t + 0.06); } catch {}
        if (c.lfo) { try { c.lfo.stop(t + 0.06); } catch {} }
      }
      setTimeout(() => {
        try { c.env.disconnect(); } catch {}
      }, 150);
      if (!quiet) {
        mark('');
        const statusEl = $('#status');
        if (statusEl) statusEl.textContent = 'Silent';
      }
    }

    function mark(id: string) {
      $$('[data-play]').forEach((b) => {
        b.classList.toggle('active-play', b.dataset.play === id);
      });
    }

    function osc(type: OscillatorType, f: number) {
      return () => {
        if (!ctx) throw new Error('AudioContext not ready');
        const o = ctx.createOscillator();
        o.type = type;
        o.frequency.value = f;
        return o;
      };
    }

    function start(id: string, kind: string, make: () => any, o: any = {}) {
      init();
      if (!ctx || !master || !merger) return;
      stop(true);
      const t = ctx.currentTime;
      const env = ctx.createGain();
      const s = make();
      const c: any = {
        id,
        kind,
        src: s,
        env,
        sign: o.sign || 1,
        pan: !!o.pan,
        t0: t,
        dur: o.dur || 0,
      };
      env.gain.setValueAtTime(0, t);
      env.gain.linearRampToValueAtTime(1, t + 0.05);
      s.connect(env);

      if (o.pan) {
        const p = ctx.createStereoPanner();
        env.connect(p);
        p.connect(master);
        c.lfo = ctx.createOscillator();
        c.lfo.frequency.value = 0.25;
        c.lfo.connect(p.pan);
        c.lfo.start(t);
        c.w = () => {
          if (!ctx) return [0, 0];
          const v = Math.sin(2 * Math.PI * 0.25 * (ctx.currentTime - c.t0));
          return [(1 - v) / 2, (1 + v) / 2];
        };
      } else {
        c.gl = ctx.createGain();
        c.gr = ctx.createGain();
        env.connect(c.gl);
        env.connect(c.gr);
        c.gl.connect(merger, 0, 0);
        c.gr.connect(merger, 0, 1);
        c.w = weights;
      }

      s.start(t);
      if (o.dur) {
        s.stop(t + o.dur + 0.05);
        s.onended = () => {
          if (cur === c) stop();
        };
      }
      cur = c;
      route();
      mark(id);
      const statusEl = $('#status');
      if (statusEl) statusEl.textContent = 'Playing: ' + (o.name || id);
    }

    function setOut(v: string) {
      out = v;
      $$('[data-out]').forEach((b) => {
        b.setAttribute('aria-pressed', b.dataset.out === v ? 'true' : 'false');
      });
      route();
    }

    /* Frequency controls */
    const fS = $('#fSlide') as HTMLInputElement;
    const fN = $('#fNum') as HTMLInputElement;
    function s2f(v: number) {
      return Math.round(20 * Math.pow(1000, v / 1000));
    }
    function setFreq(f: number) {
      f = Math.max(20, Math.min(20000, f));
      if (fN) fN.value = String(f);
      if (fS) fS.value = String(Math.round((1000 * Math.log(f / 20)) / Math.log(1000)));
      if (cur && cur.kind === 'tone' && ctx) {
        cur.src.frequency.setTargetAtTime(f, ctx.currentTime, 0.01);
      }
    }

    if (fS) fS.addEventListener('input', () => setFreq(s2f(+fS.value)));
    if (fN) fN.addEventListener('input', () => { if (fN.value !== '') setFreq(+fN.value); });
    const waveSelect = $('#wave') as HTMLSelectElement;
    if (waveSelect) {
      waveSelect.addEventListener('change', (e) => {
        if (cur && cur.kind === 'tone') cur.src.type = (e.target as HTMLSelectElement).value;
      });
    }
    setFreq(440);

    /* Volume */
    const volInput = $('#vol') as HTMLInputElement;
    if (volInput) {
      volInput.addEventListener('input', (e) => {
        const v = +(e.target as HTMLInputElement).value;
        vol = sGain(v);
        const volOut = $('#volOut');
        if (volOut) volOut.textContent = v + '%';
        if (master && ctx) master.gain.setTargetAtTime(vol, ctx.currentTime, 0.02);
      });
    }
    vol = sGain(50);

    /* Clicks */
    const handleRootClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const o = target.closest('[data-out]') as HTMLElement;
      if (o && o.dataset.out) {
        setOut(o.dataset.out);
        return;
      }
      const b = target.closest('[data-play]') as HTMLElement;
      if (!b) return;
      const id = b.dataset.play;
      if (!id) return;
      if (cur && cur.id === id) {
        stop();
        return;
      }
      const hz = b.dataset.hz;
      if (hz) {
        setFreq(+hz);
        start(id, 'preset', osc('sine', +hz), {
          name: +hz >= 1000 ? (+hz / 1000) + ' kHz' : hz + ' Hz',
        });
        return;
      }
      if (id === 'tone') {
        const f = +(fN ? fN.value : 440);
        const wave = waveSelect ? waveSelect.value : 'sine';
        start(id, 'tone', osc(wave as OscillatorType, f), { name: 'tone' });
        return;
      }
      if (id === 'sweep') {
        const durSelect = $('#sweepDur') as HTMLSelectElement;
        const d = +(durSelect ? durSelect.value : 20);
        init();
        if (!ctx) return;
        start(
          id,
          'sweep',
          () => {
            const s = ctx!.createOscillator();
            const t = ctx!.currentTime;
            s.frequency.setValueAtTime(20, t);
            s.frequency.exponentialRampToValueAtTime(20000, t + d);
            return s;
          },
          { dur: d, name: 'sweep' }
        );
        return;
      }
      if (id === 'pink' || id === 'white' || id === 'brown') {
        init();
        if (!ctx) return;
        const buf = noise(id);
        start(
          id,
          'noise',
          () => {
            const s = ctx!.createBufferSource();
            s.buffer = buf;
            s.loop = true;
            return s;
          },
          { name: id + ' noise' }
        );
        return;
      }
      if (id === 'pan') {
        setOut('both');
        start(id, 'pan', osc('triangle', 440), { pan: true, name: 'pan sweep' });
        return;
      }
      if (id === 'inph' || id === 'outph') {
        setOut('both');
        start(id, 'phase', osc('sine', 200), {
          sign: id === 'outph' ? -1 : 1,
          name: id === 'inph' ? 'in phase' : 'out of phase',
        });
        return;
      }
    };

    root.addEventListener('click', handleRootClick);
    const stopBtn = $('#stopBtn');
    if (stopBtn) stopBtn.addEventListener('click', () => stop());

    /* Keyboard navigation */
    const handleKeyDown = (e: KeyboardEvent) => {
      const t = (e.target as HTMLElement).tagName;
      if (t === 'INPUT' || t === 'SELECT' || e.metaKey || e.ctrlKey) return;
      const k = e.key.toLowerCase();
      if (k === ' ' && t !== 'BUTTON') {
        e.preventDefault();
        stop();
      } else if (k === 'l') setOut('left');
      else if (k === 'r') setOut('right');
      else if (k === 'b') setOut('both');
      else if (k === 'a') setOut('alt');
    };
    window.addEventListener('keydown', handleKeyDown);

    /* Visualizer Canvas & Speaker pulses */
    const cv = $('#cv') as HTMLCanvasElement;
    const g = cv ? cv.getContext('2d') : null;
    const spk = [$('#spkL'), $('#spkR')];

    function size() {
      if (!cv) return;
      const r = cv.getBoundingClientRect();
      const d = window.devicePixelRatio || 1;
      cv.width = r.width * d;
      cv.height = r.height * d;
    }
    window.addEventListener('resize', size);
    size();

    function frame() {
      animId = requestAnimationFrame(frame);
      if (!cv || !g) return;
      const W = cv.width;
      const H = cv.height;
      const d = window.devicePixelRatio || 1;

      g.clearRect(0, 0, W, H);
      g.strokeStyle = '#2B364B';
      g.lineWidth = d;
      g.beginPath();
      g.moveTo(0, H / 2);
      g.lineTo(W, H / 2);
      g.stroke();

      let rms = 0;
      if (an && tbuf) {
        an.getFloatTimeDomainData(tbuf);
        if (!fbuf) fbuf = new Uint8Array(an.frequencyBinCount);
        an.getByteFrequencyData(fbuf);
        for (let i = 0; i < tbuf.length; i++) rms += tbuf[i] * tbuf[i];
        rms = Math.sqrt(rms / tbuf.length);

        const bars = 64;
        const bw = W / bars;
        const nyq = ctx ? ctx.sampleRate / 2 : 22050;
        g.fillStyle = '#2B4EDB';
        g.globalAlpha = 0.25;
        for (let i = 0; i < bars; i++) {
          const f0 = 20 * Math.pow(1000, i / bars);
          const bin = Math.min(fbuf.length - 1, Math.round((f0 / nyq) * fbuf.length));
          const h = (fbuf[bin] / 255) * H;
          g.fillRect(i * bw + 1, H - h, bw - 2, h);
        }
        g.globalAlpha = 1;
        g.strokeStyle = '#FFE033';
        g.lineWidth = 2 * d;
        g.beginPath();
        let st = 0;
        for (let i = 1; i < tbuf.length / 2; i++) {
          if (tbuf[i - 1] < 0 && tbuf[i] >= 0) {
            st = i;
            break;
          }
        }
        for (let i = 0; i < tbuf.length / 2; i++) {
          const x = (i / (tbuf.length / 2)) * W;
          const y = H / 2 - tbuf[st + i] * H * 0.45;
          if (i === 0) g.moveTo(x, y);
          else g.lineTo(x, y);
        }
        g.stroke();
      }

      lv += (Math.min(1, rms * 5) - lv) * 0.3;
      const w = cur ? cur.w() : [0, 0];
      for (let i = 0; i < 2; i++) {
        if (spk[i]) {
          spk[i]!.dataset.on = cur && w[i] > 0.5 ? '1' : '0';
          const s = 1 + lv * w[i] * 0.45;
          spk[i]!.querySelectorAll<HTMLElement>('.drv').forEach((el) => {
            el.style.transform = 'scale(' + s + ')';
          });
        }
      }

      const fo = $('#freqOut');
      const prog = $('#prog');
      if (fo) {
        if (!cur) {
          fo.textContent = 'No sound';
        } else if (cur.kind === 'sweep' && ctx) {
          const p = Math.min(1, (ctx.currentTime - cur.t0) / cur.dur);
          fo.textContent = Math.round(20 * Math.pow(1000, p)) + ' Hz';
          if (prog) prog.style.width = p * 100 + '%';
        } else if (cur.kind === 'noise') {
          fo.textContent = 'Noise';
        } else if (cur.src && cur.src.frequency) {
          fo.textContent = Math.round(cur.src.frequency.value) + ' Hz';
        }
      }
      if (!cur || cur.kind !== 'sweep') {
        if (prog) prog.style.width = '0';
      }
    }
    frame();

    return () => {
      clearInterval(flipInterval);
      window.removeEventListener('resize', size);
      window.removeEventListener('keydown', handleKeyDown);
      root.removeEventListener('click', handleRootClick);
      if (animId) cancelAnimationFrame(animId);
      stop(true);
      if (ctx) {
        try { ctx.close(); } catch {}
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: '1040px',
        margin: '0 auto',
        padding: '1.5rem 1rem 4rem',
        minHeight: '85vh',
        color: 'var(--text-primary)',
      }}
    >
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                name: 'Speaker Test Online',
                url: SITE_URL,
                applicationCategory: 'MultimediaApplication',
                operatingSystem: 'Any',
                browserRequirements: 'Requires a browser with Web Audio API support',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Free online speaker test for left and right channels, bass, frequency sweep, noise, stereo pan and phase.',
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fixedaim.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Benchmark', item: 'https://fixedaim.com/benchmark' },
                  { '@type': 'ListItem', position: 3, name: 'Speaker Test', item: SITE_URL },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: FAQS.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          }),
        }}
      />

      <style>{`
        .spk-wrap { font-family: 'Public Sans', sans-serif; }
        .spk-stage { display: flex; gap: clamp(16px, 6vw, 64px); justify-content: center; padding: 24px 0 16px; }
        .spk {
          width: min(34vw, 190px);
          aspect-ratio: 3/5;
          border: 3px solid #000000;
          box-shadow: 5px 5px 0 0 #000000;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          position: relative;
          transition: border-color 0.15s, transform 0.15s;
        }
        .spk.l { --c: #2B4EDB; }
        .spk.r { --c: #D96A1B; }
        .spk::after {
          content: attr(data-name);
          position: absolute;
          bottom: -30px;
          font-size: 0.9rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }
        .spk[data-on="1"] {
          border-color: var(--c);
          box-shadow: 6px 6px 0 0 var(--c);
          transform: translateY(-2px);
        }
        .drv {
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: radial-gradient(circle, var(--c) 0 12%, transparent 13%), repeating-radial-gradient(circle, #CBD5E1 0 2px, transparent 3px 9px);
          border: 2px solid #000000;
        }
        .drv.t { width: 34%; aspect-ratio: 1; }
        .drv.w { width: 68%; aspect-ratio: 1; }
        .drv > i { transition: transform 60ms linear; }

        .spk-bar {
          position: sticky;
          top: 0;
          z-index: 10;
          background: #FFFDF5;
          border: 3px solid #000000;
          box-shadow: 4px 4px 0 0 #000000;
          margin: 28px 0 24px;
          padding: 12px 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 14px 24px;
          align-items: center;
        }
        .spk-fld { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; font-weight: 700; }
        .spk-fld label { text-transform: uppercase; letter-spacing: 0.04em; }
        .spk-seg { display: inline-flex; border: 2px solid #000000; box-shadow: 2px 2px 0 0 #000000; }
        .spk-seg button {
          border: 0;
          border-right: 2px solid #000000;
          border-radius: 0;
          font-weight: 800;
          padding: 7px 14px;
          font-size: 0.85rem;
          background: #FFFFFF;
          color: #000000;
          cursor: pointer;
          transition: background 0.1s;
        }
        .spk-seg button:last-child { border-right: 0; }
        .spk-seg button[aria-pressed="true"] {
          background: #FFE033;
          color: #000000;
        }
        .btn-neo {
          font: inherit;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 0.85rem;
          color: #000000;
          background: #FFFFFF;
          border: 2px solid #000000;
          box-shadow: 3px 3px 0 0 #000000;
          padding: 8px 14px;
          cursor: pointer;
          min-height: 38px;
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .btn-neo:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 0 #000000;
        }
        .btn-neo:active {
          transform: translate(1px, 1px);
          box-shadow: 2px 2px 0 0 #000000;
        }
        .btn-neo.active-play {
          background: #55EFC4 !important;
          color: #000000;
        }
        .btn-stop {
          background: #FF6B6B !important;
          color: #000000;
          margin-left: auto;
        }
        .vis-card {
          border: 3px solid #000000;
          box-shadow: 5px 5px 0 0 #000000;
          background: #0D1117;
          padding: 14px;
          margin-bottom: 24px;
        }
        .spk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 18px;
          margin-bottom: 3rem;
        }
        .spk-card {
          border: 3px solid #000000;
          box-shadow: 4px 4px 0 0 #000000;
          padding: 18px;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .spk-card h2 {
          font-size: 1.15rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin: 0 0 6px;
          color: #000000;
        }
        .spk-sub {
          font-size: 0.85rem;
          color: #4A5568;
          line-height: 1.5;
          margin: 0 0 12px;
        }
        .spk-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          margin-top: 8px;
        }
        .spk-prog {
          height: 8px;
          background: #E2E8F0;
          border: 2px solid #000000;
          overflow: hidden;
          margin-top: 14px;
        }
        .spk-prog > i {
          display: block;
          height: 100%;
          width: 0;
          background: #2B4EDB;
          transition: width 0.05s linear;
        }
        .tw-table {
          overflow-x: auto;
          border: 3px solid #000000;
          box-shadow: 5px 5px 0 0 #000000;
          background: #FFFFFF;
          margin: 1.5rem 0 2.5rem;
        }
        .tw-table table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.92rem;
          color: #000000;
        }
        .tw-table th, .tw-table td {
          text-align: left;
          padding: 12px 16px;
          border-bottom: 2px solid #000000;
          vertical-align: top;
        }
        .tw-table th {
          background: #FFE033;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .tw-table tr:last-child td { border-bottom: 0; }
        .spk-faq details {
          border: 3px solid #000000;
          box-shadow: 4px 4px 0 0 #000000;
          background: #FFFFFF;
          margin: 12px 0;
          padding: 0 18px;
        }
        .spk-faq summary {
          cursor: pointer;
          padding: 15px 0;
          font-weight: 800;
          font-size: 1rem;
          color: #000000;
        }
        .spk-faq details p {
          padding-bottom: 16px;
          margin: 0;
          color: #4A5568;
          line-height: 1.6;
        }
      `}</style>

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', fontWeight: 600 }}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <Home size={14} /> Home
        </Link>
        <ChevronRight size={13} />
        <Link href="/benchmark" style={{ color: 'inherit', textDecoration: 'none' }}>Benchmark</Link>
        <ChevronRight size={13} />
        <span style={{ color: '#2B4EDB', fontWeight: 800 }}>Speaker Test</span>
      </nav>

      {/* HEADER SECTION */}
      <header style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: '#FFE033', border: '2px solid #000000', boxShadow: '2px 2px 0 0 #000000', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
          Audio Diagnostics · 100% Free · No Sign-Up
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 10px', lineHeight: 1.1 }}>
          Speaker Test <span style={{ color: '#2B4EDB' }}>Online</span>
        </h1>
        <p style={{ maxWidth: '75ch', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
          Run a free online speaker test to check your left and right stereo channels, bass response, frequency range, stereo pan balance, and phase polarity. Works for desktop speakers, studio monitors, laptops, phones, soundbars, and headphones.
        </p>
      </header>

      {/* STAGE: LEFT & RIGHT SPEAKERS */}
      <div className="spk-stage" aria-hidden="true">
        <div className="spk l" id="spkL" data-name="Left Speaker">
          <div className="drv t"><i></i></div>
          <div className="drv w"><i></i></div>
        </div>
        <div className="spk r" id="spkR" data-name="Right Speaker">
          <div className="drv t"><i></i></div>
          <div className="drv w"><i></i></div>
        </div>
      </div>

      {/* MASTER CONTROL BAR */}
      <div className="spk-bar" role="group" aria-label="Master controls">
        <div className="spk-fld">
          <label htmlFor="vol">Volume</label>
          <input id="vol" type="range" min="0" max="100" defaultValue="50" style={{ width: '130px', accentColor: '#2B4EDB', cursor: 'pointer' }} />
          <output id="volOut" style={{ minWidth: '40px', fontWeight: 800 }}>50%</output>
        </div>

        <div className="spk-fld">
          <label id="outLbl">Output</label>
          <div className="spk-seg" role="group" aria-labelledby="outLbl">
            <button data-out="left" type="button">Left</button>
            <button data-out="both" type="button" aria-pressed="true">Both</button>
            <button data-out="right" type="button">Right</button>
            <button data-out="alt" type="button">Alternate</button>
          </div>
        </div>

        <span id="status" style={{ fontSize: '0.9rem', fontWeight: 800, color: '#2B4EDB', minWidth: '15ch' }}>
          Silent
        </span>

        <button className="btn-neo btn-stop" id="stopBtn" type="button">
          ⏹ Stop All
        </button>
      </div>

      {/* VISUALIZER & SPECTRUM */}
      <div className="vis-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#CBD5E1', marginBottom: '8px', fontWeight: 700, textTransform: 'uppercase' }}>
          <span>Live Waveform & Spectrum Visualizer</span>
          <span id="freqOut" style={{ color: '#FFE033' }}>No sound</span>
        </div>
        <canvas id="cv" role="img" aria-label="Live waveform and spectrum visualizer" style={{ display: 'block', width: '100%', height: '140px' }}></canvas>
      </div>

      {/* CONTROL GRID */}
      <div className="spk-grid">
        {/* Card 1: Tone generator */}
        <section className="spk-card">
          <div>
            <h2>Tone Generator</h2>
            <p className="spk-sub">Play any frequency from 20 Hz to 20 kHz. Adjust frequency in real time.</p>
            <div className="spk-row">
              <input id="fSlide" type="range" min="0" max="1000" defaultValue="400" aria-label="Frequency slider" style={{ flex: 1, minWidth: '130px', accentColor: '#2B4EDB' }} />
              <input id="fNum" type="number" min="20" max="20000" defaultValue="440" aria-label="Frequency in hertz" style={{ width: '90px', padding: '6px 8px', border: '2px solid #000', fontWeight: 800 }} />
              <span style={{ fontWeight: 800 }}>Hz</span>
            </div>
            <div className="spk-row" style={{ marginTop: '12px' }}>
              <select id="wave" style={{ padding: '6px 10px', border: '2px solid #000', fontWeight: 800, background: '#FFF' }}>
                <option value="sine">Sine Wave</option>
                <option value="square">Square Wave</option>
                <option value="triangle">Triangle Wave</option>
                <option value="sawtooth">Sawtooth Wave</option>
              </select>
              <button className="btn-neo" data-play="tone" type="button">▶ Play Tone</button>
            </div>
          </div>
          <div className="spk-row" style={{ marginTop: '14px', paddingTop: '10px', borderTop: '2px solid #E2E8F0' }}>
            <button className="btn-neo" data-play="h100" data-hz="100" type="button">100 Hz</button>
            <button className="btn-neo" data-play="h440" data-hz="440" type="button">440 Hz</button>
            <button className="btn-neo" data-play="h1k" data-hz="1000" type="button">1 kHz</button>
            <button className="btn-neo" data-play="h5k" data-hz="5000" type="button">5 kHz</button>
            <button className="btn-neo" data-play="h10k" data-hz="10000" type="button">10 kHz</button>
            <button className="btn-neo" data-play="h15k" data-hz="15000" type="button">15 kHz</button>
          </div>
        </section>

        {/* Card 2: Frequency sweep */}
        <section className="spk-card">
          <div>
            <h2>Frequency Sweep</h2>
            <p className="spk-sub">Smooth logarithmic sweep from 20 Hz to 20 kHz. Listen for buzzes or dead zones.</p>
            <div className="spk-row">
              <label htmlFor="sweepDur" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Duration:</label>
              <select id="sweepDur" style={{ padding: '6px 10px', border: '2px solid #000', fontWeight: 800, background: '#FFF' }}>
                <option value="10">10 Seconds</option>
                <option value="20">20 Seconds</option>
                <option value="40">40 Seconds</option>
              </select>
              <button className="btn-neo" data-play="sweep" type="button" style={{ background: '#74B9FF' }}>▶ Play Sweep</button>
            </div>
            <div className="spk-prog"><i id="prog"></i></div>
          </div>
        </section>

        {/* Card 3: Noise Generator */}
        <section className="spk-card">
          <div>
            <h2>Noise Generator</h2>
            <p className="spk-sub">Pink noise sounds balanced. White noise is bright. Brown noise produces heavy deep rumble.</p>
            <div className="spk-row">
              <button className="btn-neo" data-play="pink" type="button">Pink Noise</button>
              <button className="btn-neo" data-play="white" type="button">White Noise</button>
              <button className="btn-neo" data-play="brown" type="button">Brown Noise</button>
            </div>
          </div>
        </section>

        {/* Card 4: Bass & Subwoofer Test */}
        <section className="spk-card">
          <div>
            <h2>Bass & Subwoofer Test</h2>
            <p className="spk-sub">Low pure sine tones. Laptops/phones usually fade below 50 Hz. Subwoofers play down to 20 Hz.</p>
            <div className="spk-row">
              <button className="btn-neo" data-play="b20" data-hz="20" type="button">20 Hz</button>
              <button className="btn-neo" data-play="b30" data-hz="30" type="button">30 Hz</button>
              <button className="btn-neo" data-play="b40" data-hz="40" type="button">40 Hz</button>
              <button className="btn-neo" data-play="b50" data-hz="50" type="button">50 Hz</button>
              <button className="btn-neo" data-play="b63" data-hz="63" type="button">63 Hz</button>
              <button className="btn-neo" data-play="b80" data-hz="80" type="button">80 Hz</button>
            </div>
          </div>
        </section>

        {/* Card 5: Stereo Pan Sweep */}
        <section className="spk-card">
          <div>
            <h2>Stereo Pan Sweep</h2>
            <p className="spk-sub">A smooth tone traveling from far-left to far-right and back with no dip in the center.</p>
            <div className="spk-row">
              <button className="btn-neo" data-play="pan" type="button" style={{ background: '#A29BFE' }}>▶ Play Pan Sweep</button>
            </div>
          </div>
        </section>

        {/* Card 6: Phase Check */}
        <section className="spk-card">
          <div>
            <h2>Speaker Phase Check</h2>
            <p className="spk-sub">Both speakers play a 200 Hz tone. In-phase should sound focused and solid in center.</p>
            <div className="spk-row">
              <button className="btn-neo" data-play="inph" type="button" style={{ background: '#55EFC4' }}>✔ In Phase</button>
              <button className="btn-neo" data-play="outph" type="button" style={{ background: '#FF9F43' }}>✖ Out of Phase</button>
            </div>
            <p className="spk-sub" style={{ marginTop: '10px' }}>
              If in-phase sounds hollower or quieter than out-of-phase, one speaker is wired with reversed polarity (+/-).
            </p>
          </div>
        </section>
      </div>

      {/* SEO ARTICLE & DIAGNOSTIC GUIDE */}
      <article style={{ marginTop: '3.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>
          How to Use This Online Speaker & Audio Test
        </h2>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Select an output channel from the top control bar (Left, Both, Right, or Alternate) and press any of the diagnostic sound generators. The interactive 3D speaker cones at the top will illuminate and oscillate in real time according to the acoustic waveform. Here is how to perform a full acoustic calibration:
        </p>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', margin: '1.5rem 0 0.5rem' }}>
          1. Left & Right Stereo Channel Check
        </h3>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Set the output to Left, then Right. Sound should emerge exclusively from the corresponding driver. Clicking <strong>Alternate</strong> switches the stereo feed automatically once per second—the fastest way to identify swapped RCA/AUX cables or misconfigured Windows audio balance.
        </p>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', margin: '1.5rem 0 0.5rem' }}>
          2. Frequency Sweep & Tone Generator
        </h3>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          The frequency sweep generates a continuous logarithmic sweep from 20 Hz to 20,000 Hz. Pay close attention to cabinet rattles, vibrating objects in your room, or frequency dropout zones where sound vanishes abruptly. Use the single-frequency tone generator to isolate specific resonance frequencies.
        </p>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', margin: '1.5rem 0 0.5rem' }}>
          3. Subwoofer & Low-Frequency Bass Test
        </h3>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Pure sine waves from 20 Hz to 80 Hz stress-test the lower limits of your audio system. While high-end subwoofers and floor-standing studio monitors comfortably reproduce 20–30 Hz, typical laptop and mobile phone speakers roll off below 80–100 Hz due to physical driver constraints.
        </p>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', margin: '1.5rem 0 0.5rem' }}>
          4. Pink, White & Brown Acoustic Noise
        </h3>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Noise signals evaluate the full frequency spectrum simultaneously. <strong>Pink noise</strong> offers equal energy per octave, mirroring human psychoacoustic perception—making it the gold standard for judging frequency flatness and room acoustics. <strong>White noise</strong> stresses high-frequency tweeters, while <strong>Brown noise</strong> isolates low-end bass rumble.
        </p>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', margin: '1.5rem 0 0.5rem' }}>
          5. Stereo Imaging & Phase Polarity Check
        </h3>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Stereo panning ensures your acoustic soundstage transitions seamlessly without an artificial "hole" in the center. The phase test sends identical 200 Hz tones to both channels: an in-phase signal will feel centered right between your ears, whereas an out-of-phase signal creates a hollow, diffused sensation indicating reversed polarity wiring (+/-).
        </p>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '2.5rem 0 1rem' }}>
          Diagnostic Reference: What Should You Hear?
        </h2>
        <div className="tw-table">
          <table>
            <thead>
              <tr>
                <th>Test</th>
                <th>Expected Sound Profile</th>
                <th>Troubleshooting & Common Defects</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Left Channel</td>
                <td>Audio emerges strictly from the left speaker/earcup</td>
                <td>Sound on right indicates swapped audio channels. Silence indicates a broken driver or bad jack.</td>
              </tr>
              <tr>
                <td>Right Channel</td>
                <td>Audio emerges strictly from the right speaker/earcup</td>
                <td>Verify balance sliders in OS sound settings, inspect 3.5mm plug for oxidation.</td>
              </tr>
              <tr>
                <td>Alternate Mode</td>
                <td>Audio rapidly ping-pongs left, right, left, right</td>
                <td>Uneven volume reveals channel imbalance, acoustic room reflections, or deaf ear fatigue.</td>
              </tr>
              <tr>
                <td>Sweep 20Hz–20kHz</td>
                <td>One uninterrupted smooth glide with no sudden dropouts</td>
                <td>Chassis rattles or harsh crackles indicate blown voice coils or loose screws.</td>
              </tr>
              <tr>
                <td>Bass 20–80 Hz</td>
                <td>Deep visceral rumble, gradually attenuating near 20 Hz</td>
                <td>Total silence indicates subwoofer crossover is set too low or lack of sub-bass support.</td>
              </tr>
              <tr>
                <td>Pink Noise</td>
                <td>Warm, smooth, waterfall-like balanced hiss</td>
                <td>Harsh shrill noise indicates aggressive EQ treble boost; muffled noise indicates dead tweeters.</td>
              </tr>
              <tr>
                <td>Stereo Pan</td>
                <td>Fluid travel from left to right without central volume dip</td>
                <td>Jumps across the center imply narrow soundstage placement or mono downmixing.</td>
              </tr>
              <tr>
                <td>Phase Check</td>
                <td>In-phase sounds dense and centered; out-of-phase sounds wide & hollow</td>
                <td>If in-phase sounds quieter and thinner, speaker wire terminals (+ and -) are inverted.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '2.5rem 0 1rem' }}>
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="spk-faq">
          {FAQS.map((faq, idx) => (
            <details key={idx}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>

        {/* MORE BENCHMARK & GAMING TOOLS */}
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '3rem 0 1.25rem' }}>
          Explore More Tools
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {MORE_TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.25rem 0.75rem',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0 0 #000000',
                background: '#FFFFFF',
                color: '#000000',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '0.85rem',
                textAlign: 'center',
                gap: '0.5rem',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
            >
              <div>{t.icon}</div>
              <span>{t.label}</span>
            </Link>
          ))}
        </div>
      </article>
    </div>
  );
}
