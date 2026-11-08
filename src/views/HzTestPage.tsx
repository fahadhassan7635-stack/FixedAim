"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Activity, Cpu, Monitor, Gauge, Timer, Layers } from 'lucide-react';

const SITE_URL = 'https://fixedaim.com/hz-test';

interface ToolLink { label: string; href: string; icon: React.ReactNode; }
const MORE_TOOLS: ToolLink[] = [
  { label: 'CPS Test', href: '/cps-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/><circle cx="12" cy="14" r="1" fill="currentColor"/></svg> },
  { label: 'Dead Pixel Test', href: '/dead-pixel-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { label: 'Speaker Test', href: '/speaker-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> },
  { label: 'Internet Speed', href: '/internet-speed', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="m16 8-4 4"/></svg> },
  { label: 'Key Visualizer', href: '/key-visualizer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h1m4 0h1m4 0h1M6 13h1m4 0h1m4 0h1"/></svg> },
  { label: 'Double Click', href: '/double-click', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/></svg> },
  { label: 'Reaction Time', href: '/reaction-time', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { label: 'F1 Reaction', href: '/f1-reaction', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { label: 'Aim Trainer', href: '/aim-trainer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { label: 'Typing Test', href: '/typing-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 15h8M7 11h2m3 0h2m3 0h-1"/></svg> },
  { label: 'APM Drill', href: '/apm-drill', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
];

const FAQS = [
  { q: "What is a screen refresh rate (Hz) test?", a: "A refresh rate test measures how many times per second your monitor paints a new frame. FixedAim measures hardware frame pacing using requestAnimationFrame to verify if your display is operating at 60Hz, 120Hz, 144Hz, 240Hz, or 360Hz." },
  { q: "How do I check my monitor refresh rate online?", a: "Open the Refresh Rate tab, ensure other heavy applications are closed, and press 'Start Test'. Keep the browser tab focused for 3 seconds. The tool computes frame intervals, jitter, and dropped frames with an interactive frame time graph." },
  { q: "Why does my 144Hz or 240Hz monitor only show 60Hz?", a: "Common causes include: Windows display settings defaulting to 60Hz, using an older HDMI cable that lacks high-bandwidth support (switch to DisplayPort or HDMI 2.1), laptop power saving mode throttling the GPU, or browser hardware acceleration being disabled." },
  { q: "What is a good Core Web Vitals page speed score?", a: "Google recommends a First Contentful Paint (FCP) under 1.8s, Largest Contentful Paint (LCP) under 2.5s, Cumulative Layout Shift (CLS) under 0.1, and Time to First Byte (TTFB) under 0.8s. A composite score of 90+ is considered excellent." },
  { q: "What is the difference between visual reaction time and input delay?", a: "Reaction time measures the human cognitive delay between seeing a stimulus and clicking (typically 180–250ms). Input delay measures the hardware latency between physical click actuation and the browser rendering the next frame (ideally under 5ms)." }
];

export default function HzTestPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'hz' | 'mo' | 'ps' | 'la' | 'cp' | 'sy'>('hz');
  const [showFps, setShowFps] = useState(false);
  const [fpsVal, setFpsVal] = useState('-- FPS');

  useEffect(() => {
    if (!containerRef.current) return;
    const root = containerRef.current;

    const $ = (s: string) => root.querySelector(s) as HTMLElement;
    const $$ = (s: string) => [...root.querySelectorAll(s)] as HTMLElement[];

    const R: any = {};

    function m(l: string, v: string | number, c?: string) {
      return `<div class="stat-box"><b class="${c || ''}">${v}</b><span>${l}</span></div>`;
    }
    function rate(v: number, g: number, p: number) {
      return v <= g ? 'ok' : v <= p ? 'wa' : 'bad';
    }
    function med(a: number[]) {
      const s = a.slice().sort((x, y) => x - y);
      return s[s.length >> 1];
    }

    /* Live FPS */
    let fc = 0;
    let fl = performance.now();
    let fpsRaf = 0;
    function fFps(t: number) {
      fc++;
      if (t - fl >= 500) {
        setFpsVal(Math.round((fc * 1000) / (t - fl)) + ' FPS');
        fc = 0;
        fl = t;
      }
      fpsRaf = requestAnimationFrame(fFps);
    }
    fpsRaf = requestAnimationFrame(fFps);

    /* Refresh rate */
    function snap(h: number) {
      const c = [30, 48, 50, 60, 75, 90, 100, 120, 144, 165, 180, 240, 360];
      let b = c[0];
      c.forEach((x) => {
        if (Math.abs(x - h) < Math.abs(b - h)) b = x;
      });
      return Math.abs(b - h) / b < 0.06 ? b : Math.round(h);
    }

    function drawG(cv: HTMLCanvasElement, d: number[], md: number) {
      const x = cv.getContext('2d');
      if (!x) return;
      const W = cv.width;
      const H = cv.height;
      x.clearRect(0, 0, W, H);
      const a = d.slice(-120);
      const mx = Math.max(40, md * 3);
      const bw = W / 120;
      a.forEach((v, i) => {
        x.fillStyle = v > md * 1.5 ? '#dc2626' : '#2B4EDB';
        const h = Math.min(v / mx, 1) * H;
        x.fillRect(i * bw, H - h, bw - 1, h);
      });
      if (md) {
        x.strokeStyle = '#16a34a';
        x.lineWidth = 2;
        x.beginPath();
        const y = H - (md / mx) * H;
        x.moveTo(0, y);
        x.lineTo(W, y);
        x.stroke();
      }
    }

    let hzRaf = 0;
    function runHz() {
      return new Promise<number>((res) => {
        const d: number[] = [];
        let last = 0;
        let st = 0;
        const btn = $('#hzGo') as HTMLButtonElement;
        if (btn) btn.disabled = true;

        function f(t: number) {
          if (!st) st = t;
          if (last) d.push(t - last);
          last = t;
          const md = d.length > 5 ? med(d) : 0;
          const hzV = $('#hzV');
          if (md && hzV) hzV.textContent = String(snap(1000 / md));
          const hzC = $('#hzC') as HTMLCanvasElement;
          if (hzC) drawG(hzC, d, md);

          if (t - st < 3000) {
            hzRaf = requestAnimationFrame(f);
          } else {
            if (btn) btn.disabled = false;
            done(d);
          }
        }

        function done(rawD: number[]) {
          const sliceD = rawD.slice(5);
          if (!sliceD.length) {
            res(60);
            return;
          }
          const md = med(sliceD);
          const hz = snap(1000 / md);
          const avg = sliceD.reduce((a, b) => a + b, 0) / sliceD.length;
          const mn = Math.min.apply(0, sliceD);
          const mx = Math.max.apply(0, sliceD);
          const dr = sliceD.filter((v) => v > md * 1.5).length;
          const jit = Math.sqrt(sliceD.reduce((a, b) => a + (b - avg) * (b - avg), 0) / sliceD.length);

          R.hz = hz;
          R.frameMs = {
            avg: +avg.toFixed(2),
            min: +mn.toFixed(2),
            max: +mx.toFixed(2),
            jitter: +jit.toFixed(2),
            dropped: dr,
          };

          const hzV = $('#hzV');
          const hzS = $('#hzS');
          const hzG = $('#hzG');
          if (hzV) hzV.textContent = String(hz);
          if (hzS) {
            hzS.textContent =
              hz >= 240
                ? 'Elite esports territory. Ultrafast refresh rate.'
                : hz >= 120
                ? 'High refresh gaming display. Very smooth.'
                : hz >= 90
                ? 'Smooth mobile/tablet display.'
                : hz >= 60
                ? 'Standard 60 Hz display.'
                : 'Low refresh rate or power saving throttle active.';
          }
          if (hzG) {
            hzG.innerHTML =
              m('Measured Hz', (1000 / avg).toFixed(1)) +
              m('Avg Frame ms', avg.toFixed(2)) +
              m('Best Frame ms', mn.toFixed(2)) +
              m('Worst Frame ms', mx.toFixed(1), rate(mx, md * 1.5, md * 3)) +
              m('Jitter ms', jit.toFixed(2), rate(jit, 1, 3)) +
              m('Dropped Frames', dr + ' / ' + sliceD.length, rate(dr, 2, 10));
          }
          res(hz);
        }

        hzRaf = requestAnimationFrame(f);
      });
    }

    const hzGoBtn = $('#hzGo');
    if (hzGoBtn) hzGoBtn.onclick = () => runHz();

    /* Motion UFO Test */
    let moOn = false;
    let moPos = 0;
    let moLast = 0;
    let moD = 0;
    let moW = 0;
    let moFc = 0;
    let moFl = 0;
    let moRaf = 0;

    const spInput = $('#sp') as HTMLInputElement;
    if (spInput) {
      spInput.oninput = (e) => {
        const val = (e.target as HTMLInputElement).value;
        const spV = $('#spV');
        if (spV) spV.textContent = val;
      };
    }

    const moGoBtn = $('#moGo');
    if (moGoBtn) {
      moGoBtn.onclick = () => {
        moOn = !moOn;
        moGoBtn.textContent = moOn ? '⏹ Stop' : '▶ Start';
        if (moOn) {
          moLast = 0;
          moD = 0;
          moW = 0;
          moFc = 0;
          moFl = 0;
          moRaf = requestAnimationFrame(mv);
        }
      };
    }

    function mv(t: number) {
      if (!moOn) return;
      if (moLast) {
        const dt = t - moLast;
        const lane = $('.lane');
        const ln = lane ? lane.clientWidth - 50 : 600;
        const speed = spInput ? +spInput.value : 480;
        moPos = (moPos + (speed * dt) / 1000) % (ln * 2);
        const bx = $('#bx');
        if (bx) bx.style.transform = `translateX(${moPos < ln ? moPos : ln * 2 - moPos}px)`;
        if (dt > 25) moD++;
        if (dt > moW) moW = dt;
        const moD_el = $('#moD');
        const moW_el = $('#moW');
        if (moD_el) moD_el.textContent = String(moD);
        if (moW_el) moW_el.textContent = moW.toFixed(1);
      }
      moLast = t;
      moFc++;
      if (!moFl) moFl = t;
      if (t - moFl > 500) {
        const moF_el = $('#moF');
        if (moF_el) moF_el.textContent = String(Math.round((moFc * 1000) / (t - moFl)));
        moFc = 0;
        moFl = t;
      }
      moRaf = requestAnimationFrame(mv);
    }

    /* Page Speed */
    const V = { cls: 0, lcp: 0 };
    try {
      new PerformanceObserver((l) => {
        l.getEntries().forEach((e: any) => {
          V.lcp = e.startTime;
        });
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}

    try {
      new PerformanceObserver((l) => {
        l.getEntries().forEach((e: any) => {
          if (!e.hadRecentInput) V.cls += e.value;
        });
      }).observe({ type: 'layout-shift', buffered: true });
    } catch {}

    function psRender() {
      const n = (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming) || ({} as any);
      const fcp =
        (performance.getEntriesByType('paint').filter((p) => p.name === 'first-contentful-paint')[0] as any)
          ?.startTime || 0;
      const ttfb = n.responseStart && n.requestStart ? n.responseStart - n.requestStart : 0;
      const dns = n.domainLookupEnd && n.domainLookupStart ? n.domainLookupEnd - n.domainLookupStart : 0;
      const tcp = n.connectEnd && n.connectStart ? n.connectEnd - n.connectStart : 0;
      const dcl = n.domContentLoadedEventEnd || 0;
      const ld = n.loadEventEnd || 0;
      const lcp = V.lcp || fcp;

      const res = performance.getEntriesByType('resource');
      let sz = n.transferSize || 0;
      res.forEach((r: any) => {
        sz += r.transferSize || 0;
      });

      R.page = {
        fcp: +fcp.toFixed(0),
        lcp: +lcp.toFixed(0),
        cls: +V.cls.toFixed(3),
        ttfb: +ttfb.toFixed(0),
        dcl: +dcl.toFixed(0),
        load: +ld.toFixed(0),
        requests: res.length + 1,
        kb: +(sz / 1024).toFixed(1),
      };

      const psG = $('#psG');
      if (psG) {
        psG.innerHTML =
          m('FCP ms', fcp.toFixed(0), rate(fcp, 1800, 3000)) +
          m('LCP ms', lcp.toFixed(0), rate(lcp, 2500, 4000)) +
          m('CLS', V.cls.toFixed(3), rate(V.cls, 0.1, 0.25)) +
          m('TTFB ms', ttfb.toFixed(0), rate(ttfb, 800, 1800)) +
          m('DNS ms', dns.toFixed(0)) +
          m('TCP ms', tcp.toFixed(0)) +
          m('DOM Ready ms', dcl.toFixed(0)) +
          m('Load ms', ld.toFixed(0), rate(ld, 2500, 5000)) +
          m('Requests', res.length + 1) +
          m('Transfer KB', (sz / 1024).toFixed(1));
      }

      const sc = 100 - Math.min(30, fcp / 100) - Math.min(30, lcp / 150) - Math.min(20, V.cls * 80) - Math.min(20, ttfb / 90);
      R.page.score = Math.max(0, Math.round(sc));
      const psS = $('#psS');
      if (psS) psS.textContent = ' ' + R.page.score;

      const rsT = $('#rsT');
      if (rsT) {
        if (!res.length) {
          rsT.innerHTML = '<tr><td>No external sub-resources. High performance.</td></tr>';
        } else {
          rsT.innerHTML =
            '<tr><th>Resource</th><th>ms</th></tr>' +
            res
              .sort((a, b) => b.duration - a.duration)
              .slice(0, 8)
              .map(
                (r) =>
                  `<tr><td>${r.name.split('/').pop()?.slice(0, 40) || 'resource'}</td><td>${r.duration.toFixed(0)}</td></tr>`
              )
              .join('');
        }
      }
    }
    setTimeout(psRender, 600);

    const SN = `<script>
(function(){
  var v={};
  function l(k,x){v[k]=Math.round(x*1000)/1000;console.log('[CWV]',k,v[k])}
  new PerformanceObserver(function(e){e.getEntries().forEach(function(x){l('LCP',x.startTime)})}).observe({type:'largest-contentful-paint',buffered:true});
  var c=0;
  new PerformanceObserver(function(e){e.getEntries().forEach(function(x){if(!x.hadRecentInput){c+=x.value;l('CLS',c)}})}).observe({type:'layout-shift',buffered:true});
  addEventListener('load',function(){var n=performance.getEntriesByType('navigation')[0];l('TTFB',n.responseStart);l('Load',n.loadEventEnd)})
})();
<\/script>`;
    const snip = $('#snip');
    if (snip) snip.textContent = SN;
    const cpSnBtn = $('#cpSn');
    if (cpSnBtn) {
      cpSnBtn.onclick = () => {
        navigator.clipboard.writeText(SN).then(() => {
          cpSnBtn.textContent = 'Copied ✓';
          setTimeout(() => { if (cpSnBtn) cpSnBtn.textContent = 'Copy Snippet'; }, 1200);
        });
      };
    }

    /* Latency */
    let rs = 'idle';
    let rto: any = null;
    let rst = 0;
    const rts: number[] = [];
    const rtBox = $('#rt');
    if (rtBox) {
      rtBox.onclick = () => {
        if (rs === 'idle') {
          rs = 'wait';
          rtBox.className = 'rt-box wait';
          rtBox.textContent = 'Wait for green…';
          rto = setTimeout(() => {
            rs = 'go';
            rtBox.className = 'rt-box go';
            rtBox.textContent = 'CLICK NOW!';
            rst = performance.now();
          }, 1000 + Math.random() * 2500);
        } else if (rs === 'wait') {
          clearTimeout(rto);
          rs = 'idle';
          rtBox.className = 'rt-box idle';
          rtBox.textContent = 'Too early! Click to retry';
        } else {
          const t = performance.now() - rst;
          rts.push(t);
          rs = 'idle';
          rtBox.className = 'rt-box idle';
          rtBox.textContent = Math.round(t) + ' ms · click to go again';
          const rtL = $('#rtL');
          const rtA = $('#rtA');
          const rtB = $('#rtB');
          if (rtL) rtL.textContent = String(Math.round(t));
          if (rtA) rtA.textContent = String(Math.round(rts.reduce((a, b) => a + b) / rts.length));
          if (rtB) rtB.textContent = String(Math.round(Math.min.apply(0, rts)));
          R.reactionAvg = +(rts.reduce((a, b) => a + b) / rts.length).toFixed(0);
        }
      };
    }

    const ids: number[] = [];
    const idBtn = $('#idB');
    if (idBtn) {
      idBtn.addEventListener('pointerdown', (e) => {
        const t = e.timeStamp || performance.now();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const d = performance.now() - t;
            ids.push(d);
            R.inputDelay = +(ids.reduce((a, b) => a + b) / ids.length).toFixed(1);
            const idV = $('#idV');
            if (idV) idV.textContent = `${d.toFixed(1)} ms (avg ${R.inputDelay} ms, n=${ids.length})`;
          });
        });
      });
    }

    /* CPU Benchmark */
    function runCpu() {
      return new Promise<void>((res) => {
        const btn = $('#cpGo') as HTMLButtonElement;
        if (btn) btn.disabled = true;
        setTimeout(() => {
          const t0 = performance.now();
          let n = 0;
          let x = 1;
          while (performance.now() - t0 < 800) {
            for (let i = 0; i < 20000; i++) {
              x = (x * 1664525 + 1013904223) % 4294967296;
              n++;
            }
          }
          const sc = n / 800 / 1000;
          R.cpu = +sc.toFixed(2);
          const cpS = $('#cpS');
          if (cpS) cpS.textContent = String(R.cpu);

          const ts: number[] = [];
          let last = performance.now();
          let k = 0;
          function tk() {
            const now = performance.now();
            ts.push(now - last);
            last = now;
            if (++k < 40) {
              setTimeout(tk, 1);
            } else {
              const a = ts.slice(5);
              const avg = a.reduce((p, q) => p + q) / a.length;
              const j = Math.sqrt(a.reduce((p, q) => p + (q - avg) * (q - avg), 0) / a.length);
              R.timer = { avg: +avg.toFixed(2), jitter: +j.toFixed(2) };
              const cpT = $('#cpT');
              const cpJ = $('#cpJ');
              const cpM = $('#cpM');
              if (cpT) cpT.textContent = String(R.timer.avg);
              if (cpJ) cpJ.textContent = String(R.timer.jitter);
              const perfMem = (performance as any).memory;
              if (cpM) cpM.textContent = perfMem ? (perfMem.usedJSHeapSize / 1048576).toFixed(1) : 'n/a';
              if (btn) btn.disabled = false;
              res();
            }
          }
          setTimeout(tk, 1);
        }, 50);
      });
    }

    const cpGoBtn = $('#cpGo');
    if (cpGoBtn) cpGoBtn.onclick = () => runCpu();

    /* System Info */
    const conn = (navigator as any).connection || {};
    const scr = window.screen;
    const sysRows = [
      ['Screen Resolution', `${scr.width}×${scr.height} @${window.devicePixelRatio}x`],
      ['Viewport Size', `${window.innerWidth}×${window.innerHeight}`],
      ['Color Depth', `${scr.colorDepth}-bit`],
      ['Logical CPU Threads', navigator.hardwareConcurrency || 'n/a'],
      ['Device Memory', (navigator as any).deviceMemory ? (navigator as any).deviceMemory + ' GB' : 'n/a'],
      ['Network Type', conn.effectiveType || 'n/a'],
      ['Estimated Bandwidth', conn.downlink ? conn.downlink + ' Mbps' : 'n/a'],
      ['RTT Latency', conn.rtt != null ? conn.rtt + ' ms' : 'n/a'],
      ['Data Saver', conn.saveData ? 'Enabled' : 'Disabled'],
      ['Online Status', navigator.onLine ? 'Connected' : 'Offline'],
      ['Language', navigator.language],
      ['Platform', navigator.platform || 'n/a'],
    ];
    const syT = $('#syT');
    if (syT) {
      syT.innerHTML = sysRows.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('');
    }

    /* History */
    function hist() {
      try {
        return JSON.parse(localStorage.getItem('fixedaim_hz_hist') || '[]');
      } catch {
        return [];
      }
    }
    function drawHist() {
      const h = hist();
      const hiT = $('#hiT');
      if (hiT) {
        hiT.innerHTML =
          '<tr><th>Time</th><th>Measured Hz</th><th>FCP (ms)</th><th>CPU Score</th></tr>' +
          (h.length
            ? h
                .slice(-8)
                .reverse()
                .map((x: any) => `<tr><td>${x.t}</td><td>${x.hz || '-'}</td><td>${x.fcp || '-'}</td><td>${x.cpu || '-'}</td></tr>`)
                .join('')
            : '<tr><td colspan="4" style="text-align:center;padding:12px;">No saved benchmark runs yet.</td></tr>');
      }
    }
    drawHist();

    const runAllBtn = $('#runAll');
    if (runAllBtn) {
      runAllBtn.onclick = async () => {
        (runAllBtn as HTMLButtonElement).disabled = true;
        runAllBtn.textContent = 'Running All Tests…';
        await runHz();
        await runCpu();
        psRender();
        const h = hist();
        h.push({
          t: new Date().toLocaleTimeString(),
          hz: R.hz,
          fcp: R.page?.fcp,
          cpu: R.cpu,
        });
        try {
          localStorage.setItem('fixedaim_hz_hist', JSON.stringify(h.slice(-30)));
        } catch {}
        drawHist();
        (runAllBtn as HTMLButtonElement).disabled = false;
        runAllBtn.textContent = '▶ Run All Tests';
      };
    }

    const cpJsBtn = $('#cpJs');
    if (cpJsBtn) {
      cpJsBtn.onclick = () => {
        navigator.clipboard.writeText(JSON.stringify(R, null, 2)).then(() => {
          cpJsBtn.textContent = 'Copied ✓';
          setTimeout(() => { if (cpJsBtn) cpJsBtn.textContent = 'Copy JSON'; }, 1200);
        });
      };
    }

    const dlBtn = $('#dl');
    if (dlBtn) {
      dlBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = 'data:application/json,' + encodeURIComponent(JSON.stringify(R, null, 2));
        a.download = 'fixedaim-speed-test.json';
        a.click();
      };
    }

    const clrBtn = $('#clr');
    if (clrBtn) {
      clrBtn.onclick = () => {
        try {
          localStorage.removeItem('fixedaim_hz_hist');
        } catch {}
        drawHist();
      };
    }

    return () => {
      cancelAnimationFrame(fpsRaf);
      cancelAnimationFrame(hzRaf);
      cancelAnimationFrame(moRaf);
      if (rto) clearTimeout(rto);
    };
  }, [activeTab]);

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
      {/* Floating Live FPS Overlay */}
      {showFps && (
        <div
          style={{
            position: 'fixed',
            right: '16px',
            top: '80px',
            background: '#000000',
            color: '#55EFC4',
            border: '2px solid #55EFC4',
            boxShadow: '3px 3px 0 0 #000000',
            fontFamily: 'monospace',
            fontWeight: 900,
            fontSize: '1rem',
            padding: '6px 14px',
            zIndex: 9999,
          }}
        >
          {fpsVal}
        </div>
      )}

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebApplication',
                name: 'Page Speed & Screen Refresh Rate (Hz) Test',
                url: SITE_URL,
                applicationCategory: 'UtilitiesApplication',
                operatingSystem: 'Any',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
                description: 'Free online page speed test and screen refresh rate (Hz) test by FixedAim. Check Core Web Vitals, FPS, input delay, reaction time and CPU speed instantly in your browser.',
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fixedaim.com/' },
                  { '@type': 'ListItem', position: 2, name: 'Device Test', item: 'https://fixedaim.com/device' },
                  { '@type': 'ListItem', position: 3, name: 'Hz & Speed Test', item: SITE_URL },
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
        .hz-tabs-nav {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 8px 0 16px;
          margin-bottom: 1rem;
        }
        .hz-tab-btn {
          border: 3px solid #000000;
          box-shadow: 3px 3px 0 0 #000000;
          background: #FFFFFF;
          color: #000000;
          font-weight: 800;
          text-transform: uppercase;
          padding: 9px 18px;
          cursor: pointer;
          white-space: nowrap;
          font-size: 0.88rem;
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .hz-tab-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 0 #000000;
        }
        .hz-tab-btn.active {
          background: #FFE033 !important;
          color: #000000 !important;
        }
        .hz-card {
          background: #FFFFFF;
          border: 3px solid #000000;
          box-shadow: 5px 5px 0 0 #000000;
          padding: 22px;
          margin-bottom: 20px;
        }
        .hz-card h2 {
          font-size: 1.35rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          margin: 0 0 10px;
          color: #000000;
        }
        .hz-card h3 {
          font-size: 1.05rem;
          font-weight: 800;
          text-transform: uppercase;
          margin: 18px 0 8px;
          color: #000000;
        }
        .stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 12px;
        }
        .stat-box {
          border: 2px solid #000000;
          box-shadow: 2px 2px 0 0 #000000;
          background: #FFFDF5;
          padding: 10px 14px;
        }
        .stat-box b {
          display: block;
          font-size: 1.25rem;
          font-weight: 900;
          color: #000000;
        }
        .stat-box span {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #5D6A7A;
        }
        .stat-box b.ok { color: #16a34a; }
        .stat-box b.wa { color: #d97706; }
        .stat-box b.bad { color: #dc2626; }

        .hz-btn {
          background: #2B4EDB;
          color: #FFFFFF;
          border: 3px solid #000000;
          box-shadow: 3px 3px 0 0 #000000;
          font-weight: 900;
          text-transform: uppercase;
          font-size: 0.9rem;
          padding: 10px 20px;
          cursor: pointer;
        }
        .hz-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .lane {
          position: relative;
          height: 90px;
          border: 3px solid #000000;
          box-shadow: 3px 3px 0 0 #000000;
          overflow: hidden;
          background: repeating-linear-gradient(90deg, #FFFFFF 0 39px, #E2E8F0 39px 40px);
          margin-bottom: 16px;
        }
        .box {
          position: absolute;
          top: 18px;
          left: 0;
          width: 54px;
          height: 54px;
          background: #2B4EDB;
          border: 3px solid #000000;
          box-shadow: 3px 3px 0 0 #000000;
          will-change: transform;
        }
        .rt-box {
          height: 140px;
          display: grid;
          place-items: center;
          border: 3px solid #000000;
          box-shadow: 4px 4px 0 0 #000000;
          font-size: 1.35rem;
          font-weight: 900;
          cursor: pointer;
          user-select: none;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 1rem;
        }
        .rt-box.idle { background: #FF6B6B; color: #FFFFFF; }
        .rt-box.wait { background: #FFE033; color: #000000; }
        .rt-box.go { background: #55EFC4; color: #000000; }

        .hz-table {
          width: 100%;
          border-collapse: collapse;
          border: 2px solid #000000;
          font-size: 0.88rem;
          margin-top: 10px;
        }
        .hz-table th, .hz-table td {
          padding: 8px 12px;
          border-bottom: 1px solid #000000;
        }
        .hz-table th {
          background: #FFE033;
          font-weight: 900;
          text-transform: uppercase;
        }
        .hz-faq details {
          border: 3px solid #000000;
          box-shadow: 4px 4px 0 0 #000000;
          background: #FFFFFF;
          margin: 12px 0;
          padding: 0 18px;
        }
        .hz-faq summary {
          cursor: pointer;
          padding: 15px 0;
          font-weight: 800;
          font-size: 1rem;
          color: #000000;
        }
        .hz-faq details p {
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
        <Link href="/device" style={{ color: 'inherit', textDecoration: 'none' }}>Device Test</Link>
        <ChevronRight size={13} />
        <span style={{ color: '#2B4EDB', fontWeight: 800 }}>Page Speed &amp; Hz Test</span>
      </nav>

      {/* HEADER */}
      <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', background: '#FFE033', border: '2px solid #000000', boxShadow: '2px 2px 0 0 #000000', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Hardware &amp; Performance Telemetry · 100% Free
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 8px', lineHeight: 1.1 }}>
            Page Speed &amp; <span style={{ color: '#2B4EDB' }}>Hz Test Tool</span>
          </h1>
          <p style={{ maxWidth: '65ch', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
            Test your screen refresh rate (Hz), FPS, motion smoothness, page speed, Core Web Vitals, input latency, and CPU performance live in your browser.
          </p>
        </div>

        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', background: '#FFF', border: '2px solid #000', boxShadow: '3px 3px 0 0 #000', padding: '8px 14px' }}>
          <input
            type="checkbox"
            checked={showFps}
            onChange={(e) => setShowFps(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: '#2B4EDB', cursor: 'pointer' }}
          />
          Show Live FPS Overlay
        </label>
      </header>

      {/* TABS NAVIGATION */}
      <div className="hz-tabs-nav">
        {[
          { id: 'hz', label: 'Screen Refresh Rate (Hz)' },
          { id: 'mo', label: 'Motion UFO Test' },
          { id: 'ps', label: 'Page Speed & Vitals' },
          { id: 'la', label: 'Latency & Delay' },
          { id: 'cp', label: 'CPU Benchmark' },
          { id: 'sy', label: 'System & History' },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            className={`hz-tab-btn ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id as any)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* PANEL 1: REFRESH RATE (HZ) */}
      <section style={{ display: activeTab === 'hz' ? 'block' : 'none' }}>
        <div className="hz-card">
          <h2>Screen Refresh Rate (Hz) Test</h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '14px 0 8px' }}>
            <span id="hzV" style={{ fontSize: '3.8rem', fontWeight: 900, lineHeight: 1, color: '#000000' }}>--</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#5D6A7A' }}>Hz</span>
          </div>
          <div id="hzS" style={{ color: '#5D6A7A', fontWeight: 700, fontSize: '0.92rem', marginBottom: '14px' }}>
            Measures your display via requestAnimationFrame for 3 seconds.
          </div>
          <div style={{ marginBottom: '20px' }}>
            <button className="hz-btn" id="hzGo" type="button">
              ▶ Start 3-Second Hz Test
            </button>
          </div>

          <h3>Frame Time Graph</h3>
          <canvas id="hzC" width="860" height="240" style={{ width: '100%', height: '160px', background: '#0D1117', border: '3px solid #000', boxShadow: '3px 3px 0 0 #000' }}></canvas>

          <h3>Frame Statistics &amp; Jitter</h3>
          <div className="stat-grid" style={{ marginTop: '12px' }} id="hzG"></div>
        </div>
      </section>

      {/* PANEL 2: MOTION UFO TEST */}
      <section style={{ display: activeTab === 'mo' ? 'block' : 'none' }}>
        <div className="hz-card">
          <h2>Motion Smoothness Test (UFO-Style)</h2>
          <p style={{ color: '#4A5568', fontSize: '0.9rem', marginBottom: '16px' }}>
            Watch the moving target. Stutter, ghosting, or judder indicates frame pacing anomalies. Dropped frames are tallied in real time.
          </p>
          <div className="lane">
            <div className="box" id="bx"></div>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '18px' }}>
            <button className="hz-btn" id="moGo" type="button">
              ▶ Start
            </button>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.9rem' }}>
              Speed: <span id="spV">480</span> px/s
              <input type="range" id="sp" min="120" max="1500" defaultValue="480" style={{ accentColor: '#2B4EDB', cursor: 'pointer', width: '160px' }} />
            </label>
          </div>
          <div className="stat-grid">
            <div className="stat-box"><b id="moF">--</b><span>Current FPS</span></div>
            <div className="stat-box"><b id="moD">0</b><span>Dropped Frames</span></div>
            <div className="stat-box"><b id="moW">--</b><span>Worst Frame ms</span></div>
          </div>
        </div>
      </section>

      {/* PANEL 3: PAGE SPEED & CORE WEB VITALS */}
      <section style={{ display: activeTab === 'ps' ? 'block' : 'none' }}>
        <div className="hz-card">
          <h2>Page Speed Test &amp; Core Web Vitals</h2>
          <h3>Load &amp; Performance Metrics</h3>
          <div className="stat-grid" style={{ marginTop: '10px' }} id="psG"></div>

          <div style={{ margin: '18px 0 10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="hz-btn" type="button" onClick={() => window.location.reload()}>
              🔄 Reload &amp; Re-measure
            </button>
            <span style={{ fontWeight: 800, fontSize: '1rem' }}>
              Overall Score: <b id="psS" style={{ color: '#16a34a', fontSize: '1.3rem' }}>--</b>/100
            </span>
          </div>

          <h3>Slowest Sub-Resources</h3>
          <table className="hz-table" id="rsT"></table>
        </div>

        <div className="hz-card">
          <h3>Track Core Web Vitals on Your Own Website</h3>
          <p style={{ color: '#4A5568', fontSize: '0.88rem', margin: '4px 0 12px' }}>
            Paste this snippet right before &lt;/body&gt; to monitor FCP, LCP, CLS, and TTFB in your console.
          </p>
          <pre id="snip" style={{ background: '#0D1117', color: '#55EFC4', padding: '14px', border: '2px solid #000', overflowX: 'auto', fontSize: '0.8rem', fontWeight: 600 }}></pre>
          <button className="hz-btn" id="cpSn" type="button" style={{ marginTop: '10px', background: '#55EFC4', color: '#000' }}>
            📋 Copy Snippet
          </button>
        </div>
      </section>

      {/* PANEL 4: LATENCY TESTS */}
      <section style={{ display: activeTab === 'la' ? 'block' : 'none' }}>
        <div className="hz-card">
          <h2>Human Reaction Time Test</h2>
          <p style={{ color: '#4A5568', fontSize: '0.9rem', marginBottom: '12px' }}>
            Click anywhere inside the box as soon as it turns green.
          </p>
          <div className="rt-box idle" id="rt">Click to Start</div>
          <div className="stat-grid" style={{ marginTop: '12px' }}>
            <div className="stat-box"><b id="rtL">--</b><span>Last ms</span></div>
            <div className="stat-box"><b id="rtA">--</b><span>Average ms</span></div>
            <div className="stat-box"><b id="rtB">--</b><span>Best ms</span></div>
          </div>
        </div>

        <div className="hz-card">
          <h2>Input Delay Test (Hardware to Frame)</h2>
          <p style={{ color: '#4A5568', fontSize: '0.9rem', marginBottom: '14px' }}>
            Tap the button repeatedly. Measures the delay between pointerdown and the next painted animation frame.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button className="hz-btn" id="idB" type="button" style={{ background: '#FFE033', color: '#000' }}>
              ⚡ Tap Me Fast
            </button>
            <span id="idV" style={{ fontWeight: 800, fontSize: '0.95rem' }}>--</span>
          </div>
        </div>
      </section>

      {/* PANEL 5: CPU BENCHMARK */}
      <section style={{ display: activeTab === 'cp' ? 'block' : 'none' }}>
        <div className="hz-card">
          <h2>CPU &amp; Timer Precision Benchmark</h2>
          <div style={{ marginBottom: '18px' }}>
            <button className="hz-btn" id="cpGo" type="button">
              ▶ Run CPU Benchmark
            </button>
          </div>
          <div className="stat-grid">
            <div className="stat-box"><b id="cpS">--</b><span>Score (Mops/s)</span></div>
            <div className="stat-box"><b id="cpT">--</b><span>1ms Timer Avg (ms)</span></div>
            <div className="stat-box"><b id="cpJ">--</b><span>Timer Jitter (ms)</span></div>
            <div className="stat-box"><b id="cpM">--</b><span>JS Heap (MB)</span></div>
          </div>
        </div>
      </section>

      {/* PANEL 6: SYSTEM & HISTORY */}
      <section style={{ display: activeTab === 'sy' ? 'block' : 'none' }}>
        <div className="hz-card">
          <h2>System &amp; Network Telemetry</h2>
          <table className="hz-table" id="syT"></table>
        </div>

        <div className="hz-card">
          <h2>Benchmark Results &amp; History</h2>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '12px 0 16px' }}>
            <button className="hz-btn" id="runAll" type="button">▶ Run All Tests</button>
            <button className="hz-btn" id="cpJs" type="button" style={{ background: '#FFF', color: '#000' }}>Copy JSON</button>
            <button className="hz-btn" id="dl" type="button" style={{ background: '#FFF', color: '#000' }}>Download JSON</button>
            <button className="hz-btn" id="clr" type="button" style={{ background: '#FF6B6B', color: '#000' }}>Clear History</button>
          </div>
          <table className="hz-table" id="hiT"></table>
        </div>
      </section>

      {/* SEO ARTICLE & COMPARISON GUIDE */}
      <article style={{ marginTop: '3.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '0 0 1rem' }}>
          Understanding Screen Refresh Rate (Hz) &amp; Display Motion
        </h2>
        <p style={{ lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Monitor refresh rate (expressed in Hertz or Hz) defines the number of individual frames your display panel can refresh every second. While 60 Hz has historically served as the office baseline, modern gaming and pro-creatives demand 120Hz, 144Hz, 240Hz, or 360Hz to reduce input latency and eliminate motion blur.
        </p>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', margin: '1.5rem 0 0.5rem' }}>
          Refresh Rate Comparison: 60Hz vs 120Hz vs 144Hz vs 240Hz
        </h3>
        <div style={{ overflowX: 'auto', border: '3px solid #000', boxShadow: '4px 4px 0 0 #000', background: '#FFF', margin: '1rem 0 2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#FFE033', borderBottom: '2px solid #000' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 900 }}>Refresh Rate</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 900 }}>Frame Time</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 900 }}>Ideal Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #000' }}>
                <td style={{ padding: '10px 14px', fontWeight: 800 }}>60 Hz</td>
                <td style={{ padding: '10px 14px' }}>16.67 ms</td>
                <td style={{ padding: '10px 14px' }}>Office productivity, casual video playback, basic web browsing</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #000' }}>
                <td style={{ padding: '10px 14px', fontWeight: 800 }}>120 Hz</td>
                <td style={{ padding: '10px 14px' }}>8.33 ms</td>
                <td style={{ padding: '10px 14px' }}>Fluid smartphone scrolling (ProMotion), tablets, light gaming</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #000' }}>
                <td style={{ padding: '10px 14px', fontWeight: 800 }}>144 Hz – 165 Hz</td>
                <td style={{ padding: '10px 14px' }}>6.94 ms – 6.06 ms</td>
                <td style={{ padding: '10px 14px' }}>Competitive FPS gaming (CS2, Valorant, Apex Legends)</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', fontWeight: 800 }}>240 Hz – 360 Hz</td>
                <td style={{ padding: '10px 14px' }}>4.17 ms – 2.78 ms</td>
                <td style={{ padding: '10px 14px' }}>Esports tournament standards, zero motion blur tracking</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FAQS */}
        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', margin: '2.5rem 0 1rem' }}>
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="hz-faq">
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
    </div>
  );
}
