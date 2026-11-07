"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Monitor, Play, Pause, Maximize, Minimize, X, RefreshCw, Zap } from 'lucide-react';

const SITE_URL = 'https://fixedaim.com/dead-pixel-test';

interface ToolLink { label: string; href: string; icon: React.ReactNode; }
const MORE_TOOLS: ToolLink[] = [
  { label: 'CPS Test', href: '/cps-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/><circle cx="12" cy="14" r="1" fill="currentColor"/></svg> },
  { label: 'Speaker Test', href: '/speaker-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> },
  { label: 'Internet Speed', href: '/internet-speed', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="m16 8-4 4"/></svg> },
  { label: 'Key Visualizer', href: '/key-visualizer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h1m4 0h1m4 0h1M6 13h1m4 0h1m4 0h1"/></svg> },
  { label: 'Double Click', href: '/double-click', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/></svg> },
  { label: 'Reaction Time', href: '/reaction-time', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { label: 'F1 Reaction', href: '/f1-reaction', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { label: 'Aim Trainer', href: '/aim-trainer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { label: 'Typing Test', href: '/typing-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 15h8M7 11h2m3 0h2m3 0h-1"/></svg> },
  { label: 'APM Drill', href: '/apm-drill', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { label: 'Space Waves', href: '/space-waves', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg> },
];

const FAQS = [
  { q: "What is a dead pixel vs a stuck pixel?", a: "A dead pixel is permanently turned off and remains black against all background colors. A stuck pixel is locked in an on position for one or more sub-pixels, usually glowing permanently red, green, blue, or yellow. A hot pixel is all three subpixels locked on, displaying pure white." },
  { q: "Can dead or stuck pixels be fixed?", a: "Stuck pixels can often be revived by rapidly flashing RGB subpixel color cycles over the affected area to unstick the transistor (our built-in Pixel Fixer tool is designed specifically for this). True dead pixels, where the internal transistor or wiring is physically defective, usually cannot be repaired without replacing the panel." },
  { q: "How should I run the dead pixel test for the most accurate result?", a: "Clean your screen gently with a microfiber cloth first to remove dust motes that look like dead pixels. Switch the test into Fullscreen mode (F11 or the Fullscreen button) and inspect the display closely at a 12-inch distance, cycling through Black, White, Red, Green, and Blue." },
  { q: "Does this test work on OLED, IPS, VA, and TN screens?", a: "Yes. It works across all display technologies including OLED, AMOLED, Mini-LED, Fast-IPS, VA, and TN monitors, as well as laptops, tablets, and smartphones." },
  { q: "Why is 100% browser zoom recommended?", a: "Display scaling or browser zoom other than 100% can cause anti-aliased subpixel interpolation. Running at 100% zoom in fullscreen ensures a true 1:1 hardware pixel representation." }
];

export default function DeadPixelTestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayInfo, setDisplayInfo] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;

    const $ = (id: string) => root.querySelector('#' + id) as HTMLElement;
    const cv = root.querySelector('#cv') as HTMLCanvasElement;
    const ctx = cv ? cv.getContext('2d') : null;
    const fx = root.querySelector('#fx') as HTMLCanvasElement;
    const fctx = fx ? fx.getContext('2d') : null;
    const stage = root.querySelector('#stage') as HTMLElement;

    if (!cv || !ctx || !fx || !fctx || !stage) return;

    function rgb(r: number, g: number, b: number) {
      return (255 << 24) | (b << 16) | (g << 8) | r;
    }
    function px(draw: (d: Uint32Array, w: number, h: number) => void) {
      return (w: number, h: number) => {
        if (!ctx) return;
        const im = ctx.createImageData(w, h);
        const d = new Uint32Array(im.data.buffer);
        draw(d, w, h);
        ctx.putImageData(im, 0, 0);
      };
    }
    function solid(c: string) {
      return (w: number, h: number) => {
        if (!ctx) return;
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, w, h);
      };
    }
    function lines(vert: boolean) {
      return (w: number, h: number) => {
        if (!ctx) return;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#fff';
        if (vert) {
          for (let x = 0; x < w; x += 2) ctx.fillRect(x, 0, 1, h);
        } else {
          for (let y = 0; y < h; y += 2) ctx.fillRect(0, y, w, 1);
        }
      };
    }
    function ramp(stops: string[]) {
      return (w: number, h: number) => {
        if (!ctx) return;
        const g = ctx.createLinearGradient(0, 0, w, 0);
        stops.forEach((s, i) => g.addColorStop(i / (stops.length - 1), s));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      };
    }

    interface Mode {
      n: string;
      c?: string;
      d?: (w: number, h: number) => void;
      p?: string;
      fixer?: boolean;
    }

    const modes: Mode[] = [
      { n: 'Black', c: '#000' },
      { n: 'White', c: '#fff' },
      { n: 'Red', c: '#f00' },
      { n: 'Green', c: '#0f0' },
      { n: 'Blue', c: '#00f' },
      { n: 'Cyan', c: '#0ff' },
      { n: 'Magenta', c: '#f0f' },
      { n: 'Yellow', c: '#ff0' },
      { n: 'Gray 50%', c: '#808080' },
      {
        n: 'Checkerboard',
        d: px((d, w, h) => {
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              d[y * w + x] = ((x + y) & 1) ? rgb(255, 255, 255) : rgb(0, 0, 0);
            }
          }
        }),
        p: 'repeating-conic-gradient(#000 0 25%,#fff 0 50%) 0 0/8px 8px',
      },
      { n: 'Horizontal lines', d: lines(false), p: 'repeating-linear-gradient(#000 0 3px,#fff 3px 6px)' },
      { n: 'Vertical lines', d: lines(true), p: 'repeating-linear-gradient(90deg,#000 0 3px,#fff 3px 6px)' },
      {
        n: 'Subpixel stripes',
        d: px((d, w, h) => {
          const c = [rgb(255, 0, 0), rgb(0, 255, 0), rgb(0, 0, 255)];
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              d[y * w + x] = c[x % 3];
            }
          }
        }),
        p: 'linear-gradient(90deg,red 33%,lime 33% 66%,blue 66%)',
      },
      {
        n: 'Color bands',
        d: (w, h) => {
          if (!ctx) return;
          const c = ['#f00', '#0f0', '#00f', '#fff', '#0ff', '#f0f', '#ff0', '#000'];
          const bw = w / c.length;
          c.forEach((k, i) => {
            ctx.fillStyle = k;
            ctx.fillRect(Math.round(i * bw), 0, Math.ceil(bw), h);
          });
        },
        p: 'linear-gradient(90deg,red 25%,lime 25% 50%,blue 50% 75%,#fff 75%)',
      },
      { n: 'Rainbow gradient', d: ramp(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00']), p: 'linear-gradient(90deg,red,yellow,lime,cyan,blue,magenta)' },
      { n: 'Gray ramp', d: ramp(['#000', '#fff']), p: 'linear-gradient(90deg,#000,#fff)' },
      { n: 'Red ramp', d: ramp(['#000', '#f00']), p: 'linear-gradient(90deg,#000,red)' },
      { n: 'Green ramp', d: ramp(['#000', '#0f0']), p: 'linear-gradient(90deg,#000,lime)' },
      { n: 'Blue ramp', d: ramp(['#000', '#00f']), p: 'linear-gradient(90deg,#000,blue)' },
      {
        n: 'Grid',
        d: (w, h) => {
          if (!ctx) return;
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = '#fff';
          const s = Math.round(50 * (window.devicePixelRatio || 1));
          for (let x = 0; x < w; x += s) ctx.fillRect(x, 0, 1, h);
          for (let y = 0; y < h; y += s) ctx.fillRect(0, y, w, 1);
          ctx.fillRect(w - 1, 0, 1, h);
          ctx.fillRect(0, h - 1, w, 1);
        },
        p: 'linear-gradient(#fff 1px,transparent 1px) 0 0/12px 12px,linear-gradient(90deg,#fff 1px,#000 1px) 0 0/12px 12px',
      },
      {
        n: 'Text sharpness',
        d: (w, h) => {
          if (!ctx) return;
          const s = window.devicePixelRatio || 1;
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = '#000';
          let y = 20 * s;
          let f = 6;
          while (y < h - 10 * s && f < 40) {
            ctx.font = f * s + 'px sans-serif';
            ctx.fillText('The quick brown fox jumps over the lazy dog 0123456789 — ' + f + 'px', 16 * s, y);
            y += f * s * 1.5;
            f += 2;
          }
        },
        p: 'repeating-linear-gradient(#fff 0 4px,#444 4px 5px)',
      },
      {
        n: 'Pixel fixer',
        fixer: true,
        p: 'repeating-conic-gradient(#f00 0 25%,#0f0 0 50%,#00f 0 75%) 0 0/6px 6px',
      },
    ];

    let idx = 0;
    let timer: NodeJS.Timeout | null = null;
    let hudT: NodeJS.Timeout | null = null;
    let tT: NodeJS.Timeout | null = null;
    let delay = 3000;
    let fixRaf = 0;
    let fixStart = 0;

    function buildTiles() {
      const t = $('tiles');
      if (!t || t.children.length > 0) return;
      modes.forEach((m, i) => {
        const b = document.createElement('button');
        b.className = 'tile-btn';
        b.innerHTML = `<i style="background:${m.c || m.p}"></i><span>${m.n}</span>`;
        b.onclick = () => begin(false, i);
        t.appendChild(b);
      });
    }

    function render() {
      if (!ctx || !cv) return;
      const dpr = window.devicePixelRatio || 1;
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      cv.width = w;
      cv.height = h;
      const m = modes[idx];
      if (m.c) solid(m.c)(w, h);
      else if (m.d) m.d(w, h);
      else {
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, w, h);
      }
      stage.style.background = m.c || '#000';
      const nameEl = $('name');
      if (nameEl) nameEl.textContent = m.n + '  (' + (idx + 1) + ' of ' + modes.length + ')';
      fixStop();
      if (m.fixer) fixStart_();
      toast(m.n);
    }

    function toast(t: string) {
      const e = $('toast');
      if (!e) return;
      e.textContent = t;
      e.classList.add('on');
      if (tT) clearTimeout(tT);
      tT = setTimeout(() => e.classList.remove('on'), 1100);
    }

    function go(n: number) {
      idx = (n + modes.length) % modes.length;
      render();
    }

    /* Pixel fixer: dynamic RGB noise square */
    function fixStart_() {
      if (!fx || !fctx) return;
      fx.style.display = 'block';
      const s = Math.min(240, Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.6));
      fx.style.width = fx.style.height = s + 'px';
      fx.style.left = (window.innerWidth / 2 - s / 2) + 'px';
      fx.style.top = (window.innerHeight / 2 - s / 2) + 'px';
      fixStart = Date.now();
      const im = fctx.createImageData(fx.width, fx.height);
      const d = new Uint32Array(im.data.buffer);

      function loop() {
        for (let i = 0; i < d.length; i++) {
          const r = Math.random();
          d[i] = rgb(r < 0.33 ? 255 : 0, r >= 0.33 && r < 0.66 ? 255 : 0, r >= 0.66 ? 255 : 0);
        }
        fctx!.putImageData(im, 0, 0);
        const sec = Math.floor((Date.now() - fixStart) / 1000);
        const nameEl = $('name');
        if (nameEl) {
          nameEl.textContent =
            'Pixel fixer — drag square over stuck pixel — ' +
            Math.floor(sec / 60) +
            ':' +
            ('0' + (sec % 60)).slice(-2);
        }
        fixRaf = requestAnimationFrame(loop);
      }
      fixRaf = requestAnimationFrame(loop);
    }

    function fixStop() {
      if (fixRaf) cancelAnimationFrame(fixRaf);
      if (fx) fx.style.display = 'none';
    }

    /* Draggable pixel fixer */
    let drag: { x: number; y: number } | null = null;
    fx.addEventListener('pointerdown', (e) => {
      drag = { x: e.clientX - fx.offsetLeft, y: e.clientY - fx.offsetTop };
      fx.setPointerCapture(e.pointerId);
      e.stopPropagation();
    });
    fx.addEventListener('pointermove', (e) => {
      if (!drag) return;
      fx.style.left = (e.clientX - drag.x) + 'px';
      fx.style.top = (e.clientY - drag.y) + 'px';
    });
    fx.addEventListener('pointerup', () => { drag = null; });
    fx.addEventListener('click', (e) => e.stopPropagation());

    /* Autoplay */
    function setPlay(on: boolean) {
      if (timer) clearInterval(timer);
      timer = null;
      const playBtn = $('play');
      if (playBtn) playBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) timer = setInterval(() => go(idx + 1), delay);
    }
    function playing() { return !!timer; }
    function setDelay(ms: number) {
      delay = Math.max(500, Math.min(10000, ms));
      const delayInp = $('delay') as HTMLInputElement;
      const delayOut = $('delayOut');
      if (delayInp) delayInp.value = String(delay / 1000);
      if (delayOut) delayOut.textContent = delay / 1000 + ' s';
      if (playing()) setPlay(true);
    }

    /* HUD visibility */
    function showHud() {
      stage.classList.add('show');
      if (hudT) clearTimeout(hudT);
      hudT = setTimeout(() => stage.classList.remove('show'), 2500);
    }

    /* Fullscreen & Screen Wake Lock */
    let wl: any = null;
    function fsOn() {
      const e = document.documentElement as any;
      (e.requestFullscreen || e.webkitRequestFullscreen || (() => {})).call(e);
    }
    function fsOff() {
      const d = document as any;
      if (d.fullscreenElement || d.webkitFullscreenElement) {
        (d.exitFullscreen || d.webkitExitFullscreen).call(d);
      }
    }
    function fsToggle() {
      const d = document as any;
      if (d.fullscreenElement || d.webkitFullscreenElement) fsOff();
      else fsOn();
    }
    function wake() {
      try {
        const wakeChk = $('wake') as HTMLInputElement;
        if (wakeChk && wakeChk.checked && 'wakeLock' in navigator) {
          (navigator as any).wakeLock.request('screen').then((l: any) => { wl = l; }).catch(() => {});
        }
      } catch {}
    }

    function begin(autoplay: boolean, i?: number) {
      const home = $('home');
      if (home) home.style.display = 'none';
      stage.classList.add('on');
      const fsChk = $('fs') as HTMLInputElement;
      if (fsChk && fsChk.checked) {
        try { fsOn(); } catch {}
      }
      wake();
      idx = i || 0;
      render();
      setPlay(autoplay);
      showHud();
    }

    function exit() {
      setPlay(false);
      fixStop();
      stage.classList.remove('on', 'show');
      const home = $('home');
      if (home) home.style.display = '';
      fsOff();
      try {
        if (wl) { wl.release(); wl = null; }
      } catch {}
    }

    const startBtn = $('start');
    if (startBtn) startBtn.onclick = () => begin(false, 0);
    const autoBtn = $('auto');
    if (autoBtn) autoBtn.onclick = () => begin(true, 0);
    const delayInp = $('delay');
    if (delayInp) delayInp.oninput = (e) => setDelay(+(e.target as HTMLInputElement).value * 1000);
    const prevBtn = $('prev');
    if (prevBtn) prevBtn.onclick = (e) => { e.stopPropagation(); go(idx - 1); };
    const nextBtn = $('next');
    if (nextBtn) nextBtn.onclick = (e) => { e.stopPropagation(); go(idx + 1); };
    const playBtn = $('play');
    if (playBtn) playBtn.onclick = (e) => { e.stopPropagation(); setPlay(!playing()); };
    const fsBtn = $('fsBtn');
    if (fsBtn) fsBtn.onclick = (e) => { e.stopPropagation(); fsToggle(); };
    const exitBtn = $('exit');
    if (exitBtn) exitBtn.onclick = (e) => { e.stopPropagation(); exit(); };
    const hud = $('hud');
    if (hud) hud.addEventListener('click', (e) => e.stopPropagation());

    stage.addEventListener('click', (e) => {
      if (modes[idx].fixer && e.target === fx) return;
      showHud();
      const x = e.clientX / window.innerWidth;
      go(x < 0.25 ? idx - 1 : idx + 1);
    });
    stage.addEventListener('mousemove', showHud);

    let tx: number | null = null;
    stage.addEventListener('touchstart', (e) => {
      tx = e.touches[0].clientX;
    }, { passive: true });
    stage.addEventListener('touchend', (e) => {
      if (tx == null) return;
      const dx = e.changedTouches[0].clientX - tx;
      tx = null;
      if (Math.abs(dx) > 60) {
        go(idx + (dx < 0 ? 1 : -1));
        e.preventDefault();
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!stage.classList.contains('on')) return;
      const k = e.key;
      showHud();
      if (k === 'ArrowRight' || k === 'PageDown' || k === 'n') {
        go(idx + 1);
        e.preventDefault();
      } else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'p') {
        go(idx - 1);
        e.preventDefault();
      } else if (k === ' ') {
        setPlay(!playing());
        toast(playing() ? 'Autoplay on' : 'Autoplay off');
        e.preventDefault();
      } else if (k === '+' || k === '=') {
        setDelay(delay - 500);
        toast('Delay ' + delay / 1000 + ' s');
      } else if (k === '-' || k === '_') {
        setDelay(delay + 500);
        toast('Delay ' + delay / 1000 + ' s');
      } else if (k === 'f' || k === 'F') {
        fsToggle();
      } else if (k === 'h' || k === 'H') {
        if (stage.classList.contains('show')) {
          if (hudT) clearTimeout(hudT);
          stage.classList.remove('show');
        } else {
          showHud();
        }
      } else if (k === 'Escape') {
        exit();
      } else if (/^[1-9]$/.test(k)) {
        go(+k - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const handleResize = () => {
      if (stage.classList.contains('on')) render();
    };
    window.addEventListener('resize', handleResize);

    buildTiles();

    /* Hardware Telemetry */
    const dpr = window.devicePixelRatio || 1;
    const s = window.screen;
    const initialInfo: { [key: string]: string } = {
      'CSS Resolution': `${s.width} × ${s.height} px`,
      'Physical Resolution': `${Math.round(s.width * dpr)} × ${Math.round(s.height * dpr)} px`,
      'Device Pixel Ratio': `${dpr.toFixed(2)}x`,
      'Color Depth': `${s.colorDepth}-bit`,
      'Estimated Zoom': `~${Math.round(dpr * 100)}% (incl. OS scaling)`,
      'Refresh Rate': 'Measuring…',
    };
    setDisplayInfo(initialInfo);

    let n = 0;
    let t0 = 0;
    let hzRaf = 0;
    function calcHz(t: number) {
      if (!t0) t0 = t;
      n++;
      if (t - t0 < 1000) {
        hzRaf = requestAnimationFrame(calcHz);
      } else {
        const measured = Math.round((n * 1000) / (t - t0));
        setDisplayInfo((prev) => ({ ...prev, 'Refresh Rate': `~${measured} Hz` }));
      }
    }
    hzRaf = requestAnimationFrame(calcHz);

    return () => {
      if (timer) clearInterval(timer);
      if (hudT) clearTimeout(hudT);
      if (tT) clearTimeout(tT);
      if (hzRaf) cancelAnimationFrame(hzRaf);
      fixStop();
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
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
                name: 'Dead Pixel Test Online',
                url: SITE_URL,
                applicationCategory: 'UtilityApplication',
                operatingSystem: 'Any',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Free online dead pixel test. Spot stuck, hot, and dead pixels with solid color screens, subpixel checks, and interactive stuck pixel fixer.',
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fixedaim.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Benchmark', item: 'https://fixedaim.com/benchmark' },
                  { '@type': 'ListItem', position: 3, name: 'Dead Pixel Test', item: SITE_URL },
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
        .dpt-wrap { font-family: 'Public Sans', sans-serif; }
        .tile-btn {
          background: #FFFFFF;
          border: 3px solid #000000;
          box-shadow: 3px 3px 0 0 #000000;
          padding: 0;
          overflow: hidden;
          text-align: left;
          color: #000000;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .tile-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 5px 5px 0 0 #000000;
        }
        .tile-btn i {
          display: block;
          height: 52px;
          border-bottom: 2px solid #000000;
          width: 100%;
        }
        .tile-btn span {
          display: block;
          padding: 7px 10px;
          font-size: 0.82rem;
          font-weight: 800;
          text-transform: uppercase;
        }
        .dpt-opts {
          display: flex;
          flex-wrap: wrap;
          gap: 16px 28px;
          align-items: center;
          background: #FFFFFF;
          border: 3px solid #000000;
          box-shadow: 4px 4px 0 0 #000000;
          padding: 14px 18px;
          font-weight: 700;
          margin-bottom: 2rem;
        }
        .dpt-table {
          width: 100%;
          border-collapse: collapse;
          background: #FFFFFF;
          border: 3px solid #000000;
          box-shadow: 4px 4px 0 0 #000000;
          margin-bottom: 2rem;
        }
        .dpt-table td {
          padding: 10px 14px;
          border-bottom: 2px solid #000000;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .dpt-table tr:last-child td { border-bottom: 0; }
        .dpt-kbd {
          background: #FFE033;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0 0 #000000;
          padding: 2px 7px;
          font-weight: 900;
          font-family: monospace;
          margin-right: 4px;
          color: #000;
        }
        .dpt-faq details {
          border: 3px solid #000000;
          box-shadow: 4px 4px 0 0 #000000;
          background: #FFFFFF;
          margin: 12px 0;
          padding: 0 18px;
        }
        .dpt-faq summary {
          cursor: pointer;
          padding: 15px 0;
          font-weight: 800;
          font-size: 1rem;
          color: #000000;
        }
        .dpt-faq details p {
          padding-bottom: 16px;
          margin: 0;
          color: #4A5568;
          line-height: 1.6;
        }

        /* Fullscreen Stage */
        #stage {
          position: fixed;
          inset: 0;
          background: #000;
          display: none;
          cursor: none;
          touch-action: none;
          user-select: none;
          z-index: 99999;
        }
        #stage.on { display: block; }
        #stage.show { cursor: default; }
        #cv, #fx { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
        #fx {
          width: 240px;
          height: 240px;
          inset: auto;
          left: calc(50% - 120px);
          top: calc(50% - 120px);
          outline: 3px dashed #FFE033;
          cursor: move;
          display: none;
          image-rendering: pixelated;
          z-index: 100000;
        }
        #hud {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 12px 18px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
          background: rgba(0, 0, 0, 0.9);
          border-top: 3px solid #FFE033;
          color: #FFF;
          font-weight: 700;
          transition: opacity 0.25s;
          opacity: 0;
          pointer-events: none;
          z-index: 100001;
        }
        #stage.show #hud { opacity: 1; pointer-events: auto; }
        #hud b { margin-right: auto; font-size: 1rem; color: #FFE033; letter-spacing: 0.04em; }
        #hud button {
          background: #FFFFFF;
          color: #000000;
          border: 2px solid #000000;
          box-shadow: 2px 2px 0 0 #000000;
          font-weight: 800;
          text-transform: uppercase;
          padding: 7px 14px;
          cursor: pointer;
        }
        #hud button[aria-pressed="true"] {
          background: #55EFC4;
        }
        #toast {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #FFE033;
          color: #000000;
          border: 3px solid #000000;
          box-shadow: 4px 4px 0 0 #000000;
          padding: 8px 20px;
          font-weight: 900;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          white-space: nowrap;
          z-index: 100002;
        }
        #toast.on { opacity: 1; }
      `}</style>

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', fontWeight: 600 }}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <Home size={14} /> Home
        </Link>
        <ChevronRight size={13} />
        <Link href="/benchmark" style={{ color: 'inherit', textDecoration: 'none' }}>Benchmark</Link>
        <ChevronRight size={13} />
        <span style={{ color: '#2B4EDB', fontWeight: 800 }}>Dead Pixel Test</span>
      </nav>

      <main id="home">
        {/* HEADER */}
        <header style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: '#FFE033', border: '2px solid #000000', boxShadow: '2px 2px 0 0 #000000', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Display Diagnostics · 100% Free · No Sign-Up
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 10px', lineHeight: 1.1 }}>
            Dead Pixel <span style={{ color: '#2B4EDB' }}>Test</span>
          </h1>
          <p style={{ maxWidth: '75ch', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 1.5rem' }}>
            Fill your screen with pure primary colors, subpixel matrices, and high-frequency patterns to inspect for dead, stuck, or hot pixels. Features a built-in pixel exercise tool to unstick frozen transistors.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              id="start"
              type="button"
              style={{
                background: '#2B4EDB',
                color: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
                padding: '0.85rem 1.75rem',
                fontWeight: 900,
                fontSize: '1rem',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              ▶ Start Fullscreen Test
            </button>
            <button
              id="auto"
              type="button"
              style={{
                background: '#FFE033',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
                padding: '0.85rem 1.75rem',
                fontWeight: 900,
                fontSize: '1rem',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              ⚡ Start With Autoplay
            </button>
          </div>
        </header>

        {/* SETTINGS BAR */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', margin: '2rem 0 0.75rem' }}>Test Options</h2>
        <div className="dpt-opts">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Autoplay Delay:
            <input type="range" id="delay" min="1" max="10" defaultValue="3" style={{ accentColor: '#2B4EDB', cursor: 'pointer' }} />
            <output id="delayOut" style={{ fontWeight: 800 }}>3 s</output>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" id="fs" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#2B4EDB' }} />
            Enter Fullscreen Automatically
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" id="wake" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#2B4EDB' }} />
            Keep Screen Awake (Wake Lock)
          </label>
        </div>

        {/* TILES GRID */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', margin: '2rem 0 0.75rem' }}>Pick a Color or Pattern</h2>
        <div id="tiles" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px', marginBottom: '2.5rem' }}></div>

        {/* HARDWARE DISPLAY TELEMETRY */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', margin: '2rem 0 0.75rem' }}>Your Display Telemetry</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '2.5rem' }}>
          {Object.entries(displayInfo).map(([key, val]) => (
            <div
              key={key}
              style={{
                background: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '3px 3px 0 0 #000000',
                padding: '12px 16px',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#5D6A7A', marginBottom: '4px' }}>
                {key}
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#000000' }}>
                {val}
              </div>
            </div>
          ))}
        </div>

        {/* KEYBOARD SHORTCUTS */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', margin: '2rem 0 0.75rem' }}>Navigation & Controls</h2>
        <table className="dpt-table">
          <tbody>
            <tr>
              <td><span className="dpt-kbd">→</span> <span className="dpt-kbd">←</span> or Tap Sides</td>
              <td>Switch to next or previous color test</td>
            </tr>
            <tr>
              <td><span className="dpt-kbd">1</span> – <span className="dpt-kbd">9</span></td>
              <td>Quick jump directly to standard solid primary colors</td>
            </tr>
            <tr>
              <td><span className="dpt-kbd">Space</span></td>
              <td>Toggle automatic slideshow playback</td>
            </tr>
            <tr>
              <td><span className="dpt-kbd">+</span> / <span className="dpt-kbd">−</span></td>
              <td>Increase or decrease autoplay transition speed</td>
            </tr>
            <tr>
              <td><span className="dpt-kbd">H</span></td>
              <td>Show or hide HUD controls overlay</td>
            </tr>
            <tr>
              <td><span className="dpt-kbd">F</span></td>
              <td>Toggle fullscreen view</td>
            </tr>
            <tr>
              <td><span className="dpt-kbd">Esc</span></td>
              <td>Exit test mode and return to dashboard</td>
            </tr>
          </tbody>
        </table>

        {/* SEO GUIDE & RESULTS INTERPRETATION */}
        <article style={{ marginTop: '3.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>
            How to Detect & Diagnose Dead or Stuck Pixels
          </h2>
          <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            A standard 4K monitor contains over <strong>8.29 million pixels</strong>, each composed of red, green, and blue subpixels controlled by microscopic thin-film transistors (TFT). When manufacturing anomalies occur or physical panel stress arises, pixels can malfunction in distinct ways:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '2rem' }}>
            <div style={{ background: '#FFF', border: '3px solid #000', boxShadow: '4px 4px 0 0 #000', padding: '16px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', color: '#D63031', marginBottom: '6px' }}>Dead Pixels (Black)</div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#4A5568', margin: 0 }}>
                A dead pixel remains permanently unlit and displays as a microscopic black dot across all color screens. This is caused by a broken transistor that fails to supply electrical current.
              </p>
            </div>
            <div style={{ background: '#FFF', border: '3px solid #000', boxShadow: '4px 4px 0 0 #000', padding: '16px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', color: '#0984E3', marginBottom: '6px' }}>Stuck Pixels (Color)</div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#4A5568', margin: 0 }}>
                A stuck pixel has one or two subpixel transistors locked permanently open. It manifests as a stubborn bright red, green, blue, or yellow dot that stands out prominently against dark backgrounds.
              </p>
            </div>
            <div style={{ background: '#FFF', border: '3px solid #000', boxShadow: '4px 4px 0 0 #000', padding: '16px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', color: '#E17055', marginBottom: '6px' }}>Hot Pixels (White)</div>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#4A5568', margin: 0 }}>
                A hot pixel occurs when all three RGB subpixels remain permanently energized simultaneously, producing a bright white prick of light that remains visible on a pure black background.
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', margin: '2rem 0 0.5rem' }}>
            Using the Built-in Pixel Fixer
          </h3>
          <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            If you identify a stuck subpixel during testing, switch to the <strong>Pixel Fixer</strong> mode. A draggable high-speed noise square will appear on screen. Drag this square directly over the stuck pixel and leave it flashing for 10–20 minutes. The rapid rapid electrical state switching often forces the liquid crystal molecule or transistor gate to unstick.
          </p>

          {/* FAQS */}
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '2.5rem 0 1rem' }}>
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="dpt-faq">
            {FAQS.map((faq, idx) => (
              <details key={idx}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>

          {/* MORE TOOLS */}
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
      </main>

      {/* FULLSCREEN TEST STAGE */}
      <div id="stage" aria-live="polite">
        <canvas id="cv"></canvas>
        <canvas id="fx" width="120" height="120"></canvas>
        <div id="toast"></div>
        <div id="hud">
          <b id="name"></b>
          <button id="prev" type="button">◀ Back</button>
          <button id="play" type="button" aria-pressed="false">⚡ Autoplay</button>
          <button id="next" type="button">Next ▶</button>
          <button id="fsBtn" type="button">⛶ Fullscreen</button>
          <button id="exit" type="button" style={{ background: '#FF6B6B', color: '#000' }}>✖ Exit</button>
        </div>
      </div>
    </div>
  );
}
