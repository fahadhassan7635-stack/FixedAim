"use client";
import { usePageI18n } from '../lib/page-i18n';
import pageDict from '../locales/pages/F1ReactionPage.json';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// ─── More Tools ───────────────────────────────────────────────────────────────
interface ToolLink { label: string; href: string; icon: React.ReactNode; }

const MORE_TOOLS: ToolLink[] = [
  { label: 'CPS Test', href: '/cps-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/><circle cx="12" cy="14" r="1" fill="currentColor"/></svg> },
  { label: 'Spacebar Counter', href: '/spacebar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="6" y1="15" x2="18" y2="15"/></svg> },
  { label: 'Aim Trainer', href: '/aim-trainer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { label: 'Typing Test', href: '/typing-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 15h8M7 11h2m3 0h2m3 0h-1"/></svg> },
  { label: 'Reaction Time', href: '/reaction-time', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { label: 'Scroll Test', href: '/scroll-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="9"/><path d="M9 11l3-3 3 3"/><path d="M9 13l3 3 3-3"/></svg> },
  { label: 'Double Click', href: '/double-click', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/></svg> },
  { label: '3D Aim Trainer', href: '/3d-aim-trainer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="3"/><path d="M3 12h3m12 0h3M12 3v3m0 12v3"/><circle cx="12" cy="12" r="8" opacity=".4"/></svg> },
  { label: 'Mouse Accuracy', href: '/mouse-accuracy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><path d="M12 2v10"/></svg> },
  { label: 'Key Visualizer', href: '/key-visualizer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h1m4 0h1m4 0h1M6 13h1m4 0h1m4 0h1"/></svg> },
  { label: 'F1 Reaction', href: '/f1-reaction', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { label: 'Space Defense', href: '/space-defense', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { label: 'Accuracy Test', href: '/accuracy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
  { label: 'CPS Rush', href: '/cps-rush', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><path d="M12 12v-4"/><circle cx="12" cy="14" r="1" fill="currentColor"/></svg> },
  { label: 'Voyager Game', href: '/voyager-game', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2L8 10H2l5 4-2 8 7-4 7 4-2-8 5-4h-6z"/></svg> },
  { label: 'Space Waves', href: '/space-waves', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg> },
  { label: 'APM Drill', href: '/apm-drill', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { label: 'Speaker Test', href: '/speaker-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg> },
  { label: 'Dead Pixel Test', href: '/dead-pixel-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { label: 'Hz & Speed Test', href: '/hz-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },




];

// ─── Constants ────────────────────────────────────────────────────────────────

const LIGHT_COUNT = 5;
const LIGHT_INTERVAL_MS = 900;
const LIGHTS_COMPLETE_MS = LIGHT_COUNT * LIGHT_INTERVAL_MS;
const CONFETTI_DURATION_MS = 3000;
const COPIED_RESET_MS = 2500;
const MAX_HISTORY_DISPLAY = 20;
const MAX_HISTORY_CHART = 10;
const MAX_HISTORY_STORAGE = 1000;
const MIN_BUTTON_SIZE = 48; // increased for better mobile touch
const MIN_REACTION_MS = 80;
const MAX_REACTION_MS = 5000;
const MAX_FALSE_STARTS = 999_999;
const START_TIME_UNSET = -1;
const SEQUENCE_LOCK_MS = 150;
const MAX_AUDIO_NODES = 32;

const MODE_DELAYS: Record<Mode, [number, number]> = {
  Rookie: [800, 2500],
  Pro: [1500, 4000],
  'F1 Elite': [2500, 6000],
};

const RATING_THRESHOLDS: { max: number; text: string; color: string }[] = [
  { max: 150, text: 'F1 Driver Level', color: '#e040fb' },
  { max: 200, text: 'Alien Reflexes', color: '#00e5ff' },
  { max: 250, text: 'Excellent', color: '#00f5b4' },
  { max: 300, text: 'Great', color: '#ff7a00' },
  { max: 400, text: 'Average', color: '#94a3b8' },
];

const THEME = {
  bg: '#070b12',
  cardBg: '#111823',
  border: '#1b2636',
  cyan: '#00e5ff',
  green: '#00f5b4',
  orange: '#ff7a00',
  textMuted: '#64748b',
  textLight: '#f8fafc',
  f1Red: '#ff2a4b',
} as const;

const CONFETTI_COLORS = [THEME.cyan, THEME.green, THEME.orange, '#fff'];
const CONFETTI_COUNT = 60;

const STORAGE_KEYS = {
  history: 'f1rt_hist_v2', // bumped version to avoid old corrupt data
  fouls: 'f1rt_fouls_v2',
  muted: 'f1rt_muted',
} as const;

const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', icon: '🏁', label: 'First Race', check: (h) => h.length >= 1 },
  { id: 'a2', icon: '⚡', label: 'Sub 300ms', check: (h) => h.some((x) => x.time < 300) },
  { id: 'a3', icon: '🔥', label: 'Sub 250ms', check: (h) => h.some((x) => x.time < 250) },
  { id: 'a4', icon: '🚀', label: 'Sub 200ms', check: (h) => h.some((x) => x.time < 200) },
  { id: 'a5', icon: '👽', label: 'Sub 150ms', check: (h) => h.some((x) => x.time < 150) },
  { id: 'a6', icon: '🥈', label: '10 Races', check: (h) => h.length >= 10 },
  { id: 'a7', icon: '🥇', label: '50 Races', check: (h) => h.length >= 50 },
  { id: 'a8', icon: '🏆', label: '100 Races', check: (h) => h.length >= 100 },
];

const FAQ_ITEMS = [
  {
    q: 'What makes the F1 Reaction Test different from standard reaction tests?',
    a: 'A regular reaction utility usually relies on a simple, unpredictable full-screen color shift. The F1 variant builds anticipation with five sequential warning lamps followed by a highly randomized suspension phase before turning off, mirroring the high-stress conditions found in competitive gaming and real motorsport.',
  },
  {
    q: 'Can this tool directly help increase my maximum CPS click capacity?',
    a: 'Reaction speed and clicking rhythm are related but not identical skills. Sharpening your visual-to-motor response can help you start a click burst sooner, but sustained CPS depends more on repetitive motor rhythm and technique than on single-stimulus reaction time.',
  },
  {
    q: 'How can I shave milliseconds off my personal best score?',
    a: 'Minimize hardware processing latency by leveraging high polling-rate gaming gear, ensure you are fully hydrated, eliminate background distractions, and consistently practice short intervals daily. Warming up your fingers before testing also helps.',
  },
  {
    q: 'What is the average human reaction time?',
    a: 'The average human simple visual reaction time is approximately 250ms. Trained athletes and esports professionals often achieve 150–200ms through consistent practice and optimized setups.',
  },
  {
    q: 'Does screen size or device type affect my score?',
    a: 'Display latency can marginally affect results. Using a monitor with low response time and a high refresh rate (144Hz+) provides the most accurate baseline. On mobile, ensure your screen brightness is high and tap response is enabled.',
  },
  {
    q: 'What counts as a false start or "jump start"?',
    a: 'If you tap, click, or press a key before all five lights have gone out, the system immediately flags it as a jump start, just like a real Formula 1 grid penalty. Your timer resets and the attempt does not count toward your history.',
  },
  {
    q: 'Why is the delay after the lights randomized instead of fixed?',
    a: 'A fixed delay would let you memorize the timing and anticipate rather than truly react. Randomizing the gap after the fifth light forces your brain to respond to the actual visual stimulus, giving a genuine measurement of reaction speed.',
  },
  {
    q: 'What is the difference between Rookie, Pro, and F1 Elite modes?',
    a: 'Each mode changes the range of the random delay after the lights go out. Rookie uses a shorter, more predictable window, Pro extends it, and F1 Elite uses the longest and widest range to prevent pattern guessing at a professional level.',
  },
  {
    q: 'Is my history and personal best saved permanently?',
    a: 'Your results are stored locally in your browser so they persist between visits on the same device. Clearing your browser data or switching devices will reset your saved history and personal best.',
  },
  {
    q: 'Why does my score sometimes seem inconsistent between attempts?',
    a: 'Reaction time naturally fluctuates run to run due to attention, fatigue, and momentary distraction. Looking at your rolling average over the last ten attempts is usually a more reliable indicator of your true skill level than any single result.',
  },
  {
    q: 'Can I use this test on a mobile phone or tablet?',
    a: 'Yes, the test is fully touch-optimized. Simply tap the arena instead of clicking, and results are measured with the same precision timing used on desktop.',
  },
  {
    q: 'Does using a wired mouse or keyboard improve my score?',
    a: 'Wired peripherals generally introduce less input latency than wireless ones, especially budget wireless devices. For the most accurate measurement of your biological reaction time, a low-latency wired connection is recommended.',
  },
  {
    q: 'What is the difference between reaction time and response time?',
    a: 'Reaction time refers purely to the delay between a stimulus appearing and your first physical response. Response time can include the full duration of a more complex action, such as choosing between multiple options before responding.',
  },
  {
    q: 'Why do esports players train reaction time specifically?',
    a: 'In fast-paced competitive games, the gap between spotting an opponent and executing an action can decide a round. Consistent reaction training narrows that gap, which compounds into a measurable competitive advantage over time.',
  },
  {
    q: 'Is a lower reaction time always better?',
    a: 'Generally yes, but results below roughly 100ms are usually caused by anticipating the lights rather than truly reacting to them, since that falls near the physiological limit of human visual response. The test flags unrealistically fast times as invalid.',
  },
  {
    q: 'How many attempts should I do per session?',
    a: 'Short, focused sessions of around ten attempts tend to produce more meaningful data than long marathon sessions, since fatigue and reduced focus can skew later attempts toward slower times.',
  },
  {
    q: 'Does age affect reaction time?',
    a: 'Reaction time generally improves through childhood, peaks in the early twenties, and gradually slows with age afterward. Regular practice and staying physically active can help maintain sharper responses over time.',
  },
  {
    q: 'Can caffeine or fatigue affect my results?',
    a: 'Yes. Moderate caffeine intake can modestly improve alertness and reaction speed, while fatigue, dehydration, and lack of sleep are well documented to slow reaction time measurably.',
  },
  {
    q: 'Why does the test use five lights instead of one?',
    a: 'The five-light sequence mirrors the official FIA Formula 1 starting procedure, where all lights illuminate before going out simultaneously. This builds realistic anticipation pressure similar to what real drivers experience on the grid.',
  },
  {
    q: 'What should I do if the lights or timer seem to freeze?',
    a: 'This is usually caused by a browser tab losing focus or being throttled in the background. Refreshing the page and keeping the tab active during the test typically resolves timing inconsistencies.',
  },
  {
    q: 'Can I mute the sound effects?',
    a: 'Yes, use the speaker icon in the top corner or press the S key to toggle sound on or off at any time, including mid-session.',
  },
  {
    q: 'How is my personal best calculated?',
    a: 'Your personal best is simply the lowest valid reaction time recorded across all your saved attempts. Achieving a new personal best triggers a confetti celebration and a distinct sound cue.',
  },
  {
    q: 'What do the achievement badges represent?',
    a: 'Achievements track milestones such as completing your first race, reaching specific speed thresholds like sub-200ms or sub-150ms, and hitting attempt-count milestones such as ten, fifty, or one hundred completed races.',
  },
  {
    q: 'Why is my reaction time on mobile slower than on desktop?',
    a: 'Touchscreens can introduce slightly more input latency than a physical mouse click due to touch-processing overhead in some devices and browsers. This is normal and does not indicate a problem with the test.',
  },
  {
    q: 'Is this test scientifically accurate?',
    a: 'The test uses high-precision browser timing APIs to measure the interval between the stimulus and your input, which is broadly consistent with methods used in simple reaction time research. However, browser and device variability mean it should be treated as a fun benchmark rather than a clinical instrument.',
  },
  {
    q: 'Can I compare my results with friends?',
    a: 'Yes, use the share button after completing a run to copy or share your time and rating, so friends can try to beat your score.',
  },
  {
    q: 'Why does my false start count keep increasing across sessions?',
    a: 'False start counts are saved locally alongside your history, so they accumulate across visits until your browser data is cleared, giving you a long-term view of your discipline in waiting for the correct stimulus.',
  },
  {
    q: 'Does practicing this test translate to real racing simulators?',
    a: 'Grid-start discipline and reaction consistency trained here can transfer to racing simulators that use similar starting-light sequences, though full driving performance also depends on many other skills like car control and race craft.',
  },
  {
    q: 'What is the difference between this test and a simple color-change reaction test?',
    a: 'A basic color-change test uses a single unstructured stimulus with no build-up. This test adds a five-light anticipation phase and a randomized hold, closely mirroring the real F1 start procedure and specifically testing your ability to resist anticipating the signal.',
  },
  {
    q: 'Why do my results improve within the same session but reset the next day?',
    a: 'Short-term improvement within a session usually reflects warm-up and rhythm familiarity, which fades between sessions. Long-term, durable improvement comes from repeated practice over days and weeks, which is why tracking your rolling average over time matters more than any single session.',
  },
  {
    q: 'Can background browser tabs or extensions slow down my recorded time?',
    a: 'Yes. Heavy background tabs, browser extensions, or system processes can occasionally introduce small timing hiccups. For the most accurate results, close unnecessary tabs and extensions before testing.',
  },
  {
    q: 'Is there a difference between reacting with a thumb versus a finger?',
    a: 'Different fingers and hand postures can produce slightly different results due to variations in muscle response and habitual dexterity. Sticking with the same hand and finger consistently makes your personal history more comparable over time.',
  },
  {
    q: 'Why does F1 Elite mode feel so much harder than Rookie mode?',
    a: 'F1 Elite uses a longer and wider randomized delay window after the lights go out, making the exact release moment far less predictable. This forces you to rely on genuine reaction rather than a learned sense of timing.',
  },
  {
    q: 'Does this test measure hand-eye coordination as well as reaction time?',
    a: 'Not directly. This test isolates simple reaction time — how quickly you respond to a stimulus — rather than spatial tracking or aiming accuracy, which are separate skills typically measured by dedicated aim-trainer tools.',
  },
  {
    q: 'Can I reset my history and start fresh?',
    a: 'Clearing your browser\u2019s site data or local storage for this page will remove your saved history, personal best, and false-start count, letting you start with a clean slate.',
  },
  {
    q: 'Why do professional racing drivers still occasionally jump the start?',
    a: 'Even elite drivers with exceptional reflexes can misjudge the randomized delay under high pressure, since anticipation naturally increases with stress and adrenaline. This is precisely why the random hold period exists — to keep the start fair even for the fastest reflexes in the world.',
  },
  {
    q: 'Does listening to music while testing affect my score?',
    a: 'It can, in either direction. For some people, background music increases arousal and alertness, slightly improving reaction speed, while for others it adds a distraction that slows response. Testing in a quiet environment first gives you the clearest baseline.',
  },
  {
    q: 'Is it normal for my false start count to be higher on F1 Elite mode?',
    a: 'Yes. The longer, less predictable delay in F1 Elite makes anticipation errors more likely, so a higher false-start count on this mode does not necessarily indicate a decline in skill compared to Rookie or Pro mode.',
  },
];

const SCORE_CHART_ROWS = [
  { range: '< 150 ms', rating: 'F1 Driver Level', equivalent: 'God-Tier Speed (Verstappen / Hamilton Level)', color: '#e040fb' },
  { range: '150 – 200 ms', rating: 'Alien Reflexes', equivalent: 'Tier-1 Esports Professional Athlete', color: '#00e5ff' },
  { range: '200 – 250 ms', rating: 'Excellent', equivalent: 'Hardcore High-Tier Competitive Gamer', color: '#00f5b4' },
  { range: '250 – 300 ms', rating: 'Great', equivalent: 'Standard Average Human Response Baseline', color: '#ff7a00' },
  { range: '300 – 400 ms', rating: 'Average', equivalent: 'Casual Gamer / Occasional Player', color: '#94a3b8' },
  { range: '> 400 ms', rating: 'Rookie', equivalent: 'Needs Dedicated Warm-Ups and Focus Training', color: '#64748b' },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Phase = 'idle' | 'lighting' | 'ready' | 'foul' | 'result';
type Mode = 'Rookie' | 'Pro' | 'F1 Elite';

interface HistoryItem {
  id: string;
  time: number;
  mode: Mode;
  date: number;
  checksum: number;
}

interface Achievement {
  id: string;
  icon: string;
  label: string;
  check: (hist: HistoryItem[]) => boolean;
}

interface ConfettiPiece {
  id: number;
  color: string;
  left: string;
  size: string;
  delay: string;
  radius: string;
  duration: string;
}

// ─── Pure helpers ─────────────────────────────────────────────────────────────

function computeChecksum(time: number, mode: string, date: number): number {
  const raw = `${time}|${mode}|${date}|f1rt-integrity`;
  let h = 0x811c9dc5;
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i);
    h = (Math.imul(h, 0x01000193) >>> 0);
  }
  return h >>> 0;
}

function safeParseJSON<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function safeParseInt(value: string | null, fallback: number): number {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function safeLocalStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Quota exceeded or private-browsing — fail silently
  }
}

function isValidHistoryItem(item: unknown): item is HistoryItem {
  if (!item || typeof item !== 'object') return false;
  const h = item as Record<string, unknown>;

  if (typeof h.id !== 'string') return false;
  if (h.id.length < 1 || h.id.length > 40) return false;
  // FIX #6: case-insensitive regex to accept uppercase hex from crypto.randomUUID
  if (!/^[a-zA-Z0-9]+$/.test(h.id as string)) return false;

  if (typeof h.time !== 'number') return false;
  if (!Number.isFinite(h.time)) return false;
  if (h.time < MIN_REACTION_MS) return false;
  if (h.time > MAX_REACTION_MS) return false;
  if (!Number.isInteger(h.time)) return false;

  if (typeof h.mode !== 'string') return false;
  if (!(['Rookie', 'Pro', 'F1 Elite'] as string[]).includes(h.mode)) return false;

  if (typeof h.date !== 'number') return false;
  if (!Number.isFinite(h.date)) return false;
  if (h.date <= 0) return false;
  if (h.date > Date.now() + 60_000) return false;

  if (typeof h.checksum !== 'number') return false;
  const expected = computeChecksum(h.time as number, h.mode as string, h.date as number);
  if ((h.checksum as number) !== expected) return false;

  return true;
}

function sanitizeHistory(raw: unknown): HistoryItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isValidHistoryItem).slice(0, MAX_HISTORY_STORAGE);
}

function arrayMin(arr: number[]): number {
  if (arr.length === 0) return Infinity;
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
  }
  return min;
}

function arrayMax(arr: number[]): number {
  if (arr.length === 0) return -Infinity;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

function getRating(ms: number): { text: string; color: string } {
  for (const tier of RATING_THRESHOLDS) {
    if (ms < tier.max) return { text: tier.text, color: tier.color };
  }
  return { text: 'Rookie', color: THEME.textMuted };
}

function getBarColor(ms: number): string {
  if (ms < 150) return '#e040fb';
  if (ms < 200) return THEME.cyan;
  if (ms < 250) return THEME.green;
  if (ms < 300) return THEME.orange;
  return '#334155';
}

function generateConfetti(): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    left: `${Math.random() * 100}%`,
    size: `${4 + Math.random() * 8}px`,
    delay: `${(Math.random() * 0.5).toFixed(3)}s`,
    radius: Math.random() > 0.5 ? '50%' : '2px',
    duration: `${(1.5 + Math.random() * 2).toFixed(3)}s`,
  }));
}

// FIX #6: always lowercase output so regex always passes
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID().replace(/-/g, '').toLowerCase().slice(0, 16);
  }
  return Math.random().toString(36).slice(2, 11) + Math.random().toString(36).slice(2, 7);
}

function vibrateDevice(pattern: number | number[]): void {
  try {
    if (navigator.vibrate) navigator.vibrate(pattern);
  } catch {
    // Not supported
  }
}

const trustedPerfNow: () => number = (() => {
  try {
    return Performance.prototype.now.bind(performance);
  } catch {
    return () => Date.now();
  }
})();

// ─── Component ────────────────────────────────────────────────────────────────

export default function F1ReactionTimePage() {
  const { tr } = usePageI18n(pageDict);
  const [phase, setPhase] = useState<Phase>('idle');
  const [mode, setMode] = useState<Mode>('Pro');
  const [lights, setLights] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [falseStarts, setFalseStarts] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Refs
  const startTime = useRef<number>(START_TIME_UNSET);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const audioCtx = useRef<AudioContext | null>(null);
  const activeAudioNodes = useRef<number>(0);
  const copiedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confettiTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isProcessing = useRef<boolean>(false);
  const processingLockAt = useRef<number>(0);
  const sequenceGen = useRef<number>(0);
  const isMutedRef = useRef<boolean>(isMuted);
  const phaseRef = useRef<Phase>('idle');
  // FIX mobile: track last pointer event to prevent ghost clicks
  const lastPointerType = useRef<string>('');
  const lastEventTime = useRef<number>(0);
  const mountedRef = useRef<boolean>(true);
  const historyRef = useRef<HistoryItem[]>([]); // FIX #2: ref mirror for history

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Keep refs in sync
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { historyRef.current = history; }, [history]); // FIX #2

  // ── Load persisted state ───────────────────────────────────────────────────
  useEffect(() => {
    const rawHistory = safeParseJSON(safeLocalStorageGet(STORAGE_KEYS.history), []);
    const loaded = sanitizeHistory(rawHistory);
    setHistory(loaded);
    historyRef.current = loaded;

    const storedFouls = safeParseInt(safeLocalStorageGet(STORAGE_KEYS.fouls), 0);
    setFalseStarts(storedFouls >= 0 && storedFouls < MAX_FALSE_STARTS ? storedFouls : 0);

    setIsMuted(safeLocalStorageGet(STORAGE_KEYS.muted) === 'true');
  }, []);

  // FIX #1: unmount cleanup uses refs directly — no stale closure
  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      if (copiedTimer.current) clearTimeout(copiedTimer.current);
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
      try { audioCtx.current?.close(); } catch { /* ignore */ }
    };
  }, []);

  // ── Audio helpers ──────────────────────────────────────────────────────────
  // FIX #3: init audio regardless of muted state so unmute works later
  const initAudio = useCallback(() => {
    if (audioCtx.current) return;
    try {
      const Ctor =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctor) audioCtx.current = new Ctor();
    } catch {
      // Audio API unavailable
    }
  }, []);

  const resumeCtx = useCallback(() => {
    if (audioCtx.current?.state === 'suspended') {
      audioCtx.current.resume().catch(() => {});
    }
  }, []);

  const playTone = useCallback(
    (freq: number, type: OscillatorType, dur: number, freqEnd?: number) => {
      if (isMutedRef.current || !audioCtx.current) return;
      if (activeAudioNodes.current >= MAX_AUDIO_NODES) return;
      resumeCtx();
      try {
        const ctx = audioCtx.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        activeAudioNodes.current += 2;
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        if (freqEnd) {
          osc.frequency.exponentialRampToValueAtTime(freqEnd, ctx.currentTime + dur);
        }
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + dur);
        osc.onended = () => {
          activeAudioNodes.current = Math.max(0, activeAudioNodes.current - 2);
          try { osc.disconnect(); } catch { /* ignore */ }
          try { gain.disconnect(); } catch { /* ignore */ }
        };
      } catch {
        activeAudioNodes.current = Math.max(0, activeAudioNodes.current - 2);
      }
    },
    [resumeCtx],
  );

  const playLight = useCallback(() => playTone(440, 'sine', 0.08), [playTone]);
  const playFoul = useCallback(() => playTone(150, 'sawtooth', 0.35, 50), [playTone]);

  const playRecord = useCallback(() => {
    if (isMutedRef.current || !audioCtx.current) return;
    if (activeAudioNodes.current >= MAX_AUDIO_NODES) return;
    resumeCtx();
    const ctx = audioCtx.current;
    const notes: [number, number][] = [[523, 0], [659, 0.1], [784, 0.2], [1047, 0.35]];
    notes.forEach(([f, t]) => {
      if (activeAudioNodes.current >= MAX_AUDIO_NODES) return;
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        activeAudioNodes.current += 2;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime + t);
        gain.gain.setValueAtTime(0, ctx.currentTime + t);
        gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + t + 0.02);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + t + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.15);
        osc.onended = () => {
          activeAudioNodes.current = Math.max(0, activeAudioNodes.current - 2);
          try { osc.disconnect(); } catch { /* ignore */ }
          try { gain.disconnect(); } catch { /* ignore */ }
        };
      } catch {
        activeAudioNodes.current = Math.max(0, activeAudioNodes.current - 2);
      }
    });
  }, [resumeCtx]);

  // ── Timer helpers ──────────────────────────────────────────────────────────
  const clearAllTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timers.current.push(id);
    return id;
  }, []);

  // ── Confetti ───────────────────────────────────────────────────────────────
  const spawnConfetti = useCallback(() => {
    if (!mountedRef.current) return;
    setConfetti(generateConfetti());
    if (confettiTimer.current) clearTimeout(confettiTimer.current);
    confettiTimer.current = setTimeout(() => {
      if (mountedRef.current) setConfetti([]);
    }, CONFETTI_DURATION_MS);
  }, []);

  // ── Start sequence ─────────────────────────────────────────────────────────
  const startSequence = useCallback(() => {
    initAudio();
    clearAllTimers();
    isProcessing.current = false;
    processingLockAt.current = 0;
    startTime.current = START_TIME_UNSET;
    lastEventTime.current = 0;

    const gen = ++sequenceGen.current;

    setReactionTime(null);
    setIsNewRecord(false);
    setPhase('lighting');
    setLights(0);

    for (let i = 1; i <= LIGHT_COUNT; i++) {
      addTimer(() => {
        if (sequenceGen.current !== gen) return;
        if (!mountedRef.current) return;
        setLights(i);
        playLight();
        vibrateDevice(20);
      }, i * LIGHT_INTERVAL_MS);
    }

    const [min, max] = MODE_DELAYS[mode];
    const rand = Math.random() * (max - min) + min;

    addTimer(() => {
      if (sequenceGen.current !== gen) return;
      if (!mountedRef.current) return;
      const capturedStart = trustedPerfNow();
      startTime.current = capturedStart;
      setPhase('ready');
      setLights(0);
    }, LIGHTS_COMPLETE_MS + rand);
  }, [mode, initAudio, clearAllTimers, addTimer, playLight]);

  // ── Core interaction handler ───────────────────────────────────────────────
  const handleInteraction = useCallback(
    (e?: React.SyntheticEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      // FIX mobile #8: use pointerType from the stored ref to prevent
      // both touchstart + mousedown firing on the same tap
      const now = trustedPerfNow();
      if (now - lastEventTime.current < 32) return; // ~2 frames debounce
      lastEventTime.current = now;

      vibrateDevice(30);

      const currentPhase = phaseRef.current;

      if (currentPhase === 'idle' || currentPhase === 'result' || currentPhase === 'foul') {
        startSequence();

      } else if (currentPhase === 'lighting') {
        clearAllTimers();
        sequenceGen.current++;
        setPhase('foul');
        setLights(0);
        setFalseStarts((prev) => {
          const next = Math.min(prev + 1, MAX_FALSE_STARTS);
          safeLocalStorageSet(STORAGE_KEYS.fouls, String(next));
          return next;
        });
        playFoul();
        vibrateDevice([100, 50, 100]);

      } else if (currentPhase === 'ready') {
        // ── Double-event guard ─────────────────────────────────────────────
        if (isProcessing.current) {
          if (now - processingLockAt.current > 2000) {
            isProcessing.current = false;
            processingLockAt.current = 0;
          } else {
            return;
          }
        }

        isProcessing.current = true;
        processingLockAt.current = now;

        if (startTime.current === START_TIME_UNSET) {
          isProcessing.current = false;
          return;
        }

        const rawTime = trustedPerfNow() - startTime.current;

        if (rawTime < MIN_REACTION_MS || rawTime > MAX_REACTION_MS) {
          isProcessing.current = false;
          return;
        }

        const time = Math.round(rawTime);

        // FIX #2: read history from ref, not closure — no side effects in updater
        const currentHistory = historyRef.current;
        const prevBest = currentHistory.length
          ? arrayMin(currentHistory.map((h) => h.time))
          : Infinity;
        const isRecord = time < prevBest;

        // Set state cleanly — no side effects inside updater
        setReactionTime(time);
        setIsNewRecord(isRecord);
        setPhase('result');

        // Side effects outside the updater
        if (isRecord) {
          playRecord();
          spawnConfetti();
          vibrateDevice([50, 30, 50, 30, 100]);
        }

        const stamp = Date.now();
        const checksum = computeChecksum(time, mode, stamp);
        const newItem: HistoryItem = {
          id: generateId(),
          time,
          mode,
          date: stamp,
          checksum,
        };

        // Pure updater — only computes next state
        setHistory((prev) => {
          const next = [newItem, ...prev].slice(0, MAX_HISTORY_STORAGE);
          historyRef.current = next; // keep ref in sync
          safeLocalStorageSet(STORAGE_KEYS.history, JSON.stringify(next));
          return next;
        });

        // FIX #4: mountedRef guard inside the timeout
        setTimeout(() => {
          if (!mountedRef.current) return;
          isProcessing.current = false;
          processingLockAt.current = 0;
        }, SEQUENCE_LOCK_MS);
      }
    },
    [startSequence, clearAllTimers, playFoul, playRecord, spawnConfetti, mode],
  );

  // ── Pointer-based arena handler (FIX mobile #8) ───────────────────────────
  // Single onPointerDown replaces onMouseDown + onTouchStart combo
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Only primary button / first touch
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      lastPointerType.current = e.pointerType;
      handleInteraction(e as unknown as React.SyntheticEvent);
    },
    [handleInteraction],
  );

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        handleInteraction();
      }
      if (e.key.toLowerCase() === 'r' && phaseRef.current !== 'lighting') {
        startSequence();
      }
      if (e.key.toLowerCase() === 's') {
        setIsMuted((prev) => {
          const next = !prev;
          safeLocalStorageSet(STORAGE_KEYS.muted, String(next));
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction, startSequence]);

  // ── Derived analytics ──────────────────────────────────────────────────────
  const analytics = useMemo(() => {
    const pb = history.length ? arrayMin(history.map((h) => h.time)) : null;
    const recentSlice = history.slice(0, MAX_HISTORY_CHART);
    const avg = recentSlice.length
      ? Math.round(recentSlice.reduce((a, b) => a + b.time, 0) / recentSlice.length)
      : null;
    const reversed = recentSlice.slice().reverse();
    const times = reversed.map((h) => h.time);
    const maxTime = times.length ? arrayMax(times) : 1;
    const minTime = times.length ? arrayMin(times) : 0;
    const timeRange = maxTime - minTime || 1;
    return { pbValue: pb, avgValue: avg, recentReverse: reversed, maxTime, minTime, timeRange };
  }, [history]);

  const { pbValue, avgValue, recentReverse, minTime, timeRange } = analytics;

  const unlockedAchievements = useMemo(
    () => ACHIEVEMENTS.map((a) => ({ ...a, unlocked: a.check(history) })),
    [history],
  );

  // ── Toggle helpers ─────────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    initAudio(); // ensure context exists when unmuting
    setIsMuted((prev) => {
      const next = !prev;
      safeLocalStorageSet(STORAGE_KEYS.muted, String(next));
      return next;
    });
  }, [initAudio]);

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  // ── Share ──────────────────────────────────────────────────────────────────
  const shareScore = useCallback(async () => {
    if (!reactionTime) return;
    const r = getRating(reactionTime);
    const text = `🏎️ F1 Lights Out Reaction Test\n⏱️ My time: ${reactionTime}ms\n🏆 Rating: ${r.text}\nCan you beat me?`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'F1 Reaction Test', text });
      } else {
        try {
          await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
          setCopied(true);
          if (copiedTimer.current) clearTimeout(copiedTimer.current);
          copiedTimer.current = setTimeout(() => {
            if (mountedRef.current) setCopied(false);
          }, COPIED_RESET_MS);
        } catch {
          window.prompt('Copy your score:', `${text}\n${window.location.href}`);
        }
      }
    } catch {
      // User cancelled share sheet
    }
  }, [reactionTime]);

  // ── Arena derived styles ───────────────────────────────────────────────────
  const arenaBorderColor =
    phase === 'foul' ? 'rgba(255,42,75,0.3)' :
    phase === 'ready' ? 'rgba(0,245,180,0.2)' :
    THEME.border;

  const arenaBgColor =
    phase === 'foul' ? 'rgba(255,42,75,0.03)' :
    phase === 'ready' ? 'rgba(0,245,180,0.02)' :
    THEME.cardBg;

  const ariaLabel =
    phase === 'idle' ? 'Press to start the reaction test' :
    phase === 'lighting' ? 'Wait for lights to go out — pressing now triggers a false start' :
    phase === 'ready' ? 'Lights out! Tap or press now!' :
    phase === 'foul' ? 'False start! Tap to try again' :
    reactionTime !== null ? `Your reaction time was ${reactionTime} milliseconds. Tap to retry.` :
    'Reaction test arena';

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        backgroundColor: 'transparent',
        color: THEME.textLight,
        fontFamily: "'Inter', sans-serif",
        minHeight: '100vh',
        padding: 'clamp(1rem,3vw,2rem) clamp(0.75rem,3vw,1rem)',
        overflowX: 'hidden',
        WebkitTapHighlightColor: 'transparent',
        boxSizing: 'border-box',
      }}
    >
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fixedaim.com/' },
              { '@type': 'ListItem', position: 2, name: 'Aim & Reaction', item: 'https://fixedaim.com/aim' },
              { '@type': 'ListItem', position: 3, name: 'F1 Reaction Test', item: 'https://fixedaim.com/f1-reaction' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'F1 Reaction Test - Formula 1 Race Start Simulator',
            operatingSystem: 'Any',
            applicationCategory: 'GameApplication',
            url: 'https://fixedaim.com/f1-reaction',
            description: 'Simulate an authentic F1 lights-out race start. Measure your reaction time in milliseconds like a real Formula 1 driver.',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; -webkit-text-size-adjust: 100%; }
        @keyframes fall {
          0%   { transform: translateY(-10px) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(100vh)  rotate(720deg); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1;   }
        }
        .table-scroll   { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .history-scroll { overflow-y: auto; -webkit-overflow-scrolling: touch; }
        button { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
        :focus-visible { outline: 2px solid #00e5ff; outline-offset: 2px; }
        /* Mobile: prevent text selection during rapid taps */
        .arena-zone { -webkit-user-select: none; user-select: none; }
      `}</style>

      {/* Confetti */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 999, overflow: 'hidden',
        }}
      >
        {confetti.map((piece) => (
          <div
            key={piece.id}
            style={{
              position: 'absolute', top: '-10px',
              left: piece.left,
              backgroundColor: piece.color,
              width: piece.size, height: piece.size,
              borderRadius: piece.radius,
              animation: `fall ${piece.duration} ${piece.delay} linear forwards`,
            }}
          />
        ))}
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* ── Header ── */}
        <header
          style={{
            display: 'flex', alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              aria-hidden="true"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                backgroundColor: 'rgba(0,229,255,0.05)',
                border: '1px solid rgba(0,229,255,0.2)',
                color: THEME.cyan,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
                padding: '5px 14px', borderRadius: '100px',
                marginBottom: '12px', textTransform: 'uppercase',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: THEME.cyan }} />
              {tr("F1 LIGHTS OUT\r\n            ")}</div>

            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(2rem,6vw,4.2rem)',
                fontWeight: 900, letterSpacing: '-1px',
                lineHeight: 0.95, color: '#fff',
                textTransform: 'uppercase',
                margin: '0 0 12px 0',
              }}
            >
              {tr("F1 REACTION")}<br />
              <span style={{ color: THEME.green }}>{tr("TIME TEST")}</span>
            </h1>

            <p style={{ fontSize: 'clamp(0.85rem,2vw,0.95rem)', color: '#64748b', fontWeight: 400, maxWidth: '500px', lineHeight: 1.4, margin: 0 }}>
              {tr("Wait for all 5 red lights — when they go out, react instantly.\r\n            ")}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
            <div
              role="group"
              aria-label={tr("Difficulty mode")}
              style={{
                display: 'flex', backgroundColor: THEME.cardBg,
                border: `1px solid ${THEME.border}`,
                borderRadius: '10px', padding: '4px', gap: '2px',
              }}
            >
              {(['Rookie', 'Pro', 'F1 Elite'] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => phase !== 'lighting' && setMode(m)}
                  disabled={phase === 'lighting'}
                  aria-pressed={mode === m}
                  aria-label={`Set difficulty to ${m}`}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 'clamp(11px,2vw,13px)', fontWeight: 700, letterSpacing: '.5px',
                    padding: '0 clamp(10px,2vw,14px)',
                    minHeight: `${MIN_BUTTON_SIZE}px`,
                    border: 'none', borderRadius: '7px',
                    cursor: phase === 'lighting' ? 'not-allowed' : 'pointer',
                    transition: 'all .15s',
                    backgroundColor: mode === m ? THEME.green : 'transparent',
                    color: mode === m ? '#000' : THEME.textMuted,
                    boxShadow: mode === m ? '0 2px 12px rgba(0,245,180,0.4)' : 'none',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
              aria-pressed={isMuted}
              style={{
                width: `${MIN_BUTTON_SIZE}px`, height: `${MIN_BUTTON_SIZE}px`,
                border: `1px solid ${THEME.border}`, borderRadius: '10px',
                backgroundColor: THEME.cardBg, color: THEME.textMuted,
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', flexShrink: 0,
              }}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>
        </header>

        {/* ── Arena ── */}
        {/* FIX mobile: single onPointerDown, no onMouseDown/onTouchStart split */}
        <main
          className="arena-zone"
          role="button"
          tabIndex={0}
          aria-label={ariaLabel}
          onPointerDown={handlePointerDown}
          onKeyDown={(e) => {
            if (e.code === 'Space' || e.key === 'Enter') {
              e.preventDefault();
              handleInteraction();
            }
          }}
          style={{
            position: 'relative', borderRadius: '16px',
            border: `1px solid ${arenaBorderColor}`,
            backgroundColor: arenaBgColor,
            cursor: 'pointer',
            touchAction: 'manipulation', // FIX mobile: prevents 300ms tap delay
            minHeight: 'clamp(280px,45vw,340px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'space-between',
            padding: 'clamp(1.25rem,4vw,2rem) clamp(0.75rem,3vw,1rem)',
            backdropFilter: 'blur(4px)',
            outline: 'none',
            transition: 'border-color 0.2s, background-color 0.2s',
            // FIX mobile: ensure full-width tap target
            width: '100%',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: '3px',
              background: `linear-gradient(90deg, transparent, ${THEME.cyan}, transparent)`,
              opacity: 0.3,
            }}
          />

          {/* Gantry */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.75rem', zIndex: 2, width: '100%' }}>
            <div
              role="img"
              aria-label={`Starting lights gantry: ${lights} of ${LIGHT_COUNT} lit`}
              style={{
                background: '#090d14', border: `1px solid ${THEME.border}`,
                borderRadius: '14px',
                padding: 'clamp(10px,3vw,20px) clamp(12px,4vw,28px)',
                display: 'flex', gap: 'clamp(8px,2.5vw,20px)',
                boxShadow: 'inset 0 8px 24px rgba(0,0,0,.5)',
                flexWrap: 'nowrap',
              }}
            >
              {Array.from({ length: LIGHT_COUNT }).map((_, i) => {
                const isOn = lights > i;
                const bulbStyle: React.CSSProperties = {
                  width: 'clamp(28px,6.5vw,60px)', height: 'clamp(28px,6.5vw,60px)',
                  borderRadius: '50%', border: '3px solid #1a2332',
                  backgroundColor: isOn ? THEME.f1Red : '#070a0f',
                  boxShadow: isOn ? `0 0 20px ${THEME.f1Red}, 0 0 40px rgba(255,42,75,0.4)` : 'none',
                  transition: 'all 60ms linear', flexShrink: 0,
                };
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,2vw,14px)' }}>
                    <div style={bulbStyle} />
                    <div style={bulbStyle} />
                  </div>
                );
              })}
            </div>
            <div
              aria-hidden="true"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '10px', letterSpacing: '3px',
                color: THEME.textMuted, textTransform: 'uppercase',
              }}
            >
              {tr("Starting Lights Gantry\r\n            ")}</div>
          </div>

          {/* Phase display */}
          <div
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', textAlign: 'center',
              gap: '.75rem', zIndex: 2,
              minHeight: '140px', justifyContent: 'center',
              width: '100%', padding: '0 0.5rem',
            }}
          >
            {phase === 'idle' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.75rem' }}>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(1.4rem,4vw,2.4rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#fff', margin: 0 }}>
                  {tr("Ready to Test?\r\n                ")}</p>
                <p style={{ fontSize: 'clamp(0.8rem,2vw,0.85rem)', color: THEME.textMuted, margin: 0 }}>
                  {tr("Tap the screen or press SPACE when the lights go out.\r\n                ")}</p>
                <button
                  onPointerDown={(e) => { e.stopPropagation(); handleInteraction(); }}
                  aria-label={tr("Start the reaction test")}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    backgroundColor: THEME.green, color: '#000',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 'clamp(0.9rem,3vw,1rem)', fontWeight: 800,
                    letterSpacing: '2px', textTransform: 'uppercase',
                    padding: 'clamp(12px,2vw,14px) clamp(24px,5vw,32px)',
                    borderRadius: '10px', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(0,245,180,0.3)',
                    minHeight: `${MIN_BUTTON_SIZE}px`,
                    touchAction: 'manipulation',
                  }}
                >
                  {tr("🏁 Start Engine\r\n                ")}</button>
              </div>
            )}

            {phase === 'lighting' && (
              <p
                aria-live="assertive"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(1.8rem,6vw,3.5rem)', fontWeight: 900,
                  textTransform: 'uppercase', letterSpacing: '4px',
                  color: THEME.f1Red, margin: 0,
                }}
              >
                {tr("Wait For Lights...\r\n              ")}</p>
            )}

            {phase === 'ready' && (
              <p
                aria-live="assertive"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 'clamp(2.5rem,10vw,6rem)', fontWeight: 900,
                  textTransform: 'uppercase', letterSpacing: '4px',
                  color: THEME.cyan,
                  textShadow: 'rgba(0,229,255,.4) 0 0 30px',
                  margin: 0,
                }}
              >
                {tr("TAP NOW!\r\n              ")}</p>
            )}

            {phase === 'foul' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem' }}>
                <p
                  aria-live="assertive"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 'clamp(1.6rem,5vw,3rem)', fontWeight: 900,
                    textTransform: 'uppercase', color: THEME.f1Red,
                    letterSpacing: '2px', margin: 0,
                  }}
                >
                  {tr("⛔ Jump Start!\r\n                ")}</p>
                <p style={{ fontSize: 'clamp(0.8rem,2vw,0.85rem)', color: '#f87171', margin: 0 }}>
                  {tr("You reacted before the lights went out.\r\n                ")}</p>
                <p style={{ fontSize: 'clamp(0.7rem,2vw,0.75rem)', color: THEME.textMuted, margin: '8px 0 0 0' }}>
                  {tr("Tap anywhere to try again\r\n                ")}</p>
              </div>
            )}

            {phase === 'result' && reactionTime !== null && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem' }}>
                {isNewRecord && (
                  <p
                    aria-live="polite"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 'clamp(0.75rem,2vw,0.85rem)', fontWeight: 700,
                      letterSpacing: '3px', color: THEME.orange,
                      textTransform: 'uppercase', margin: 0,
                    }}
                  >
                    {tr("★ New Personal Best ★\r\n                  ")}</p>
                )}
                <div
                  aria-live="polite"
                  aria-label={`${reactionTime} milliseconds`}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 'clamp(3rem,12vw,7rem)', fontWeight: 700,
                    lineHeight: 1, letterSpacing: '-2px',
                    color: getRating(reactionTime).color,
                  }}
                >
                  {reactionTime}
                  <span style={{ fontSize: 'clamp(1rem,3vw,2rem)', fontWeight: 400, color: THEME.textMuted, marginLeft: '4px' }}>{tr("ms")}</span>
                </div>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(0.9rem,2.5vw,1.1rem)', fontWeight: 700, letterSpacing: '1px', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
                  {tr("Rating: ")}{getRating(reactionTime).text}
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <button
                    onPointerDown={(e) => { e.stopPropagation(); startSequence(); }}
                    aria-label={tr("Retry the reaction test")}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      backgroundColor: '#1e293b', border: `1px solid ${THEME.border}`,
                      color: '#f0f0f0', fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 'clamp(0.8rem,2vw,0.85rem)', fontWeight: 700,
                      letterSpacing: '1px', textTransform: 'uppercase',
                      padding: '0 20px', minHeight: `${MIN_BUTTON_SIZE}px`,
                      borderRadius: '8px', cursor: 'pointer',
                      touchAction: 'manipulation',
                    }}
                  >
                    {tr("↺ Retry\r\n                  ")}</button>
                  <button
                    onPointerDown={(e) => { e.stopPropagation(); shareScore(); }}
                    aria-label={copied ? 'Score copied to clipboard' : 'Share your score'}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      backgroundColor: THEME.cyan, border: 'none', color: '#000',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 'clamp(0.8rem,2vw,0.85rem)', fontWeight: 700,
                      letterSpacing: '1px', textTransform: 'uppercase',
                      padding: '0 20px', minHeight: `${MIN_BUTTON_SIZE}px`,
                      borderRadius: '8px', cursor: 'pointer',
                      boxShadow: '0 2px 10px rgba(0,229,255,0.3)',
                      touchAction: 'manipulation',
                    }}
                  >
                    {copied ? '✓ Copied!' : '↗ Share'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>

        <p
          aria-hidden="true"
          style={{
            textAlign: 'center',
            fontSize: 'clamp(0.65rem,1.5vw,0.75rem)',
            color: THEME.textMuted, letterSpacing: '.5px', marginTop: '.5rem',
          }}
        >
          {tr("[SPACE / ENTER] React &nbsp;•&nbsp; [R] Restart &nbsp;•&nbsp; [S] Toggle Sound\r\n        ")}</p>

        {/* ── Stats ── */}
        <section aria-label={tr("Performance statistics")}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '.75rem', marginTop: '1rem',
            }}
          >
            {[
              { icon: '🏆', label: 'Personal Best', value: pbValue !== null ? `${pbValue}ms` : '—', color: THEME.cyan },
              { icon: '📊', label: 'Avg (Last 10)', value: avgValue !== null ? `${avgValue}ms` : '—', color: THEME.green },
              { icon: '🏎️', label: 'Total Races', value: String(history.length), color: THEME.textLight },
              { icon: '⚡', label: 'False Starts', value: String(falseStarts), color: THEME.orange },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: THEME.cardBg, border: `1px solid ${THEME.border}`,
                  borderRadius: '12px',
                  padding: 'clamp(0.75rem,2vw,1rem) clamp(0.9rem,2.5vw,1.2rem)',
                  display: 'flex', flexDirection: 'column', gap: '.75rem',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: '#1e293b', border: `1px solid ${THEME.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '.65rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: THEME.textMuted, marginBottom: '2px' }}>
                    {stat.label}
                  </div>
                  <div
                    aria-label={`${stat.label}: ${stat.value}`}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 'clamp(1.2rem,4vw,1.8rem)', fontWeight: 700,
                      color: stat.color,
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Achievements + History ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '.75rem', marginTop: '.75rem',
          }}
        >
          <section
            aria-label={tr("Achievements")}
            style={{
              background: THEME.cardBg, border: `1px solid ${THEME.border}`,
              borderRadius: '12px', padding: 'clamp(1rem,3vw,1.25rem)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '.85rem', fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase',
                color: THEME.cyan, margin: '0 0 1rem 0',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <span aria-hidden="true" style={{ fontSize: '16px' }}>🏅</span>
              {tr("Achievements\r\n            ")}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
              {unlockedAchievements.map((achv) => {
                const isGold = achv.unlocked && (achv.id === 'a5' || achv.id === 'a8');
                return (
                  <div
                    key={achv.id}
                    role="status"
                    aria-label={`${achv.label} — ${achv.unlocked ? 'unlocked' : 'locked'}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '6px 12px', minHeight: '32px',
                      borderRadius: '8px', fontSize: '.7rem',
                      fontWeight: 700, letterSpacing: '.5px',
                      textTransform: 'uppercase', transition: 'all .2s',
                      border: `1px solid ${isGold ? 'rgba(255,122,0,.3)' : achv.unlocked ? THEME.border : '#1e293b'}`,
                      backgroundColor: isGold ? 'rgba(255,122,0,.1)' : achv.unlocked ? '#1e293b' : 'transparent',
                      color: isGold ? THEME.orange : achv.unlocked ? '#fff' : '#334155',
                      opacity: achv.unlocked ? 1 : 0.3,
                    }}
                  >
                    <span aria-hidden="true">{achv.icon}</span>
                    {achv.label}
                  </div>
                );
              })}
            </div>
          </section>

          <section
            aria-label={tr("Recent race history")}
            style={{
              background: THEME.cardBg, border: `1px solid ${THEME.border}`,
              borderRadius: '12px', padding: 'clamp(1rem,3vw,1.25rem)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '.85rem', fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase',
                color: THEME.green, margin: '0 0 1rem 0',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <span aria-hidden="true" style={{ fontSize: '16px' }}>📈</span>
              {tr("Recent History\r\n            ")}</h2>

            {history.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '2rem', color: THEME.textMuted, fontSize: '.85rem', margin: 0 }}>
                {tr("Complete a race to see history.\r\n              ")}</p>
            ) : (
              <>
                <div
                  aria-hidden="true"
                  style={{
                    height: '60px', display: 'flex',
                    alignItems: 'flex-end', gap: '4px',
                    marginBottom: '.75rem', padding: '0 2px',
                  }}
                >
                  {recentReverse.map((h) => {
                    const heightPct = 20 + ((h.time - minTime) / timeRange) * 80;
                    return (
                      <div
                        key={h.id}
                        title={`${h.time}ms`}
                        style={{
                          flex: 1, borderRadius: '3px 3px 0 0',
                          minHeight: '4px', height: `${heightPct}%`,
                          backgroundColor: getBarColor(h.time), opacity: 0.85,
                        }}
                      />
                    );
                  })}
                </div>

                <div className="history-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '.4rem', maxHeight: '170px' }}>
                  {history.slice(0, MAX_HISTORY_DISPLAY).map((h, i) => {
                    const rating = getRating(h.time);
                    const isPB = h.time === arrayMin(history.map((x) => x.time));
                    return (
                      <div
                        key={h.id}
                        style={{
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px', borderRadius: '8px',
                          backgroundColor: '#0c111a',
                          border: `1px solid ${THEME.border}`, gap: '8px',
                        }}
                      >
                        <span style={{ fontSize: '.7rem', color: THEME.textMuted, fontFamily: "'JetBrains Mono', monospace", width: '28px', flexShrink: 0 }}>
                          #{history.length - i}
                        </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1rem', fontWeight: 700, color: rating.color, flexShrink: 0 }}>
                          {h.time}{tr("ms")}{isPB ? ' ★' : ''}
                        </span>
                        <span style={{ fontSize: '.6rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: THEME.textMuted, backgroundColor: THEME.cardBg, padding: '2px 8px', borderRadius: '4px', border: `1px solid ${THEME.border}`, flexShrink: 0 }}>
                          {h.mode}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </section>
        </div>

        {/* ── MORE TOOLS GRID ── */}
        <section aria-label={tr("More Tools")} style={{ marginBottom: '3.5rem', marginTop: '1rem' }}>
          <h2 style={{
            fontWeight: 800, fontSize: '1.5rem', color: '#fff',
            marginBottom: '1.5rem', textAlign: 'center',
            letterSpacing: '-0.3px',
          }}>{tr("More Tools")}</h2>
          <div
            className="cps-games-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gap: '1rem',
            }}
          >
            {MORE_TOOLS.map(({ label, href, icon }) => (
              <a
                key={href}
                href={href}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', gap: '0.6rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1.2rem 0.5rem',
                  cursor: 'pointer', textDecoration: 'none',
                  color: 'var(--neon-cyan)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,245,255,0.07)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.3)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--neon-cyan)',
                }}>
                  {icon}
                </div>
                <span style={{
                  fontSize: '0.75rem', fontWeight: 700,
                  color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.3,
                }}>{label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── SEO Article ── */}
        <article
          style={{
            marginTop: '4rem', borderTop: `1px solid ${THEME.border}`,
            paddingTop: '2.5rem', lineHeight: '1.7',
          }}
        >
          <p style={{ fontSize: 'clamp(0.9rem,2vw,1rem)', color: '#94a3b8', marginBottom: '1.5rem' }}>
            {tr("In high-stakes competitive esports and real-life motorsports, victory is decided in fractions of a\r\n            millisecond. Whether you are aiming to land a precision headshot in an FPS title or execute the\r\n            perfect grid launch in Formula 1, your ")}<strong>{tr("reaction time")}</strong> {tr("is the ultimate baseline.\r\n            Our professional ")}<strong>{tr("F1 Reaction Time Test")}</strong> {tr("— popularly known as the")}{' '}
            <em>{tr("F1 Lights Out Test")}</em> {tr("— faithfully replicates the official FIA Grand Prix starting-light\r\n            sequence to help casual gamers, pro esports players and enthusiasts measure, optimize, and\r\n            dominate their split-second cognitive response. This guide walks through exactly how the test\r\n            works, what the science says about human reaction speed, how the real Formula 1 start procedure\r\n            inspired this simulator, and a complete framework for training and tracking your improvement\r\n            over time.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("How to Use the F1 Reaction Time Test")}</h2>
          <ol style={listStyle}>
            <li><strong>{tr("Choose your difficulty")}</strong> {tr("— Rookie gives more time; F1 Elite pushes you to the limit with longer, more unpredictable delays.")}</li>
            <li><strong>{tr("Press Start Engine")}</strong> {tr("(or tap the arena / press SPACE).")}</li>
            <li><strong>{tr("Watch the five red lights")}</strong> {tr("illuminate one by one.")}</li>
            <li><strong>{tr("React the instant all lights go out")}</strong> {tr("— tap, click, or press SPACE.")}</li>
            <li><strong>{tr("Read your result")}</strong>{tr(", compare with your personal best, and share with friends.")}</li>
          </ol>
          <p style={bodyText}>
            {tr("Tapping before the lights go out registers a ")}<em>{tr("Jump Start")}</em> {tr("(false start), just like in real\r\n            Formula 1. The randomized delay after the fifth light prevents pattern learning, keeping every\r\n            run genuinely challenging. Each completed attempt is timestamped, checksummed, and stored locally\r\n            so your history, personal best, and false-start count all persist between sessions on the same\r\n            device and browser.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Keyboard Shortcuts")}</h2>
          <ul style={{ ...listStyle, listStyleType: 'none', paddingLeft: 0 }}>
            {[
              ['SPACE / ENTER', 'React / Start'],
              ['R', 'Restart immediately'],
              ['S', 'Toggle sound on / off'],
            ].map(([key, desc]) => (
              <li key={key}>
                <kbd style={{ backgroundColor: '#1e293b', padding: '2px 7px', borderRadius: '4px', border: `1px solid ${THEME.border}`, fontSize: '0.85em' }}>{key}</kbd>
                {' — '}{desc}
              </li>
            ))}
          </ul>

          <h2 style={h2Style}>{tr("How the Real Formula 1 Start Lights Work")}</h2>
          <p style={bodyText}>
            {tr("The five-light gantry used in this simulator is not an arbitrary design choice — it is a faithful\r\n            recreation of the official FIA Formula 1 race-start procedure. On an actual grid, five pairs of\r\n            red lights illuminate one column at a time, roughly one second apart, building tension across the\r\n            entire starting field. Once all five columns are lit, the lights hold for a period that is\r\n            deliberately randomized, typically between roughly one and a bit over four and a half seconds,\r\n            before extinguishing simultaneously. The randomization is the entire point: it exists specifically\r\n            to prevent drivers from anticipating the exact moment of release and jumping the start.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("A driver who moves before the lights go out commits a jump start, which is detected by sensors in\r\n            the car and grid position and results in a time penalty or drive-through penalty depending on the\r\n            severity. This simulator mirrors that exact philosophy: the five-light sequence, the randomized\r\n            hold, and the strict false-start penalty are not cosmetic choices, they are the mechanism that\r\n            makes the test a genuine measurement of reaction rather than pattern memorization or rhythmic\r\n            guessing.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("The Science Behind Reaction Time")}</h2>
          <p style={bodyText}>
            {tr("Reaction time is a measurable cognitive-motor process that begins the instant a stimulus is\r\n            detected by your sensory system and ends when your muscles execute a response. For a simple\r\n            visual reaction test like this one, the pathway runs from your retina, through the optic nerve,\r\n            into the visual cortex for initial processing, then to decision-related regions of the brain that\r\n            confirm \"this is the signal to act,\" and finally down through the motor cortex and spinal cord to\r\n            the muscles in your hand or finger. Every one of those handoffs takes time, and the sum of all of\r\n            them is what you see displayed on screen in milliseconds.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("Researchers typically distinguish between several categories of reaction time. ")}<strong>{tr("Simple\r\n            reaction time")}</strong> {tr("measures the response to a single, expected stimulus — exactly what this\r\n            F1 test measures, since there is only one action to take (react) and only one signal to watch for\r\n            (lights out). ")}<strong>{tr("Choice reaction time")}</strong> {tr("is slower because it requires the brain to\r\n            first identify which of several possible stimuli appeared and then select the correct\r\n            corresponding response, adding an extra decision-making stage. ")}<strong>{tr("Go/no-go reaction time")}</strong>
            {tr("sits in between, requiring the participant to respond to one type of stimulus while withholding a\r\n            response to another, which trains impulse control alongside raw speed. Understanding which\r\n            category a test falls into matters because comparing a simple reaction score directly against a\r\n            choice reaction score is not an apples-to-apples comparison.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("It is also worth understanding why a result under roughly 100 milliseconds is treated as invalid\r\n            rather than impressive. Human visual processing alone consumes a meaningful chunk of time before a\r\n            decision can even be made, so results that fast are almost always the product of anticipating the\r\n            timing of the lights rather than genuinely reacting to them — essentially a well-timed guess. The\r\n            test enforces a minimum threshold specifically to filter out these anticipatory taps and keep the\r\n            leaderboard reflective of authentic reaction speed.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("What Is a Good Reaction Time?")}</h2>
          <p style={bodyText}>
            {tr("The average human simple visual reaction time is approximately ")}<strong>{tr("250 ms")}</strong>{tr(". Trained\r\n            esports athletes and motorsport professionals consistently achieve ")}<strong>{tr("150–200 ms")}</strong>
            {tr("through deliberate practice and optimized hardware. Sub-150 ms results are exceptionally rare\r\n            and place you in genuine F1-driver territory.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("Many players believe that scaling up scores on a ")}<strong>{tr("CPS Test (Clicks Per Second)")}</strong> {tr("is\r\n            purely about finger-muscle speed. In reality, clicking velocity is tethered to neuromuscular\r\n            response latency — the precise window between your brain registering a visual trigger and your\r\n            finger completing the motion. Reducing that window can help your click bursts start sooner.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("It is worth noting that reaction time is not a fixed number — it fluctuates from moment to moment\r\n            based on alertness, attention, and even the specific muscle group used to respond. A study\r\n            participant reacting with a foot pedal will typically register slower times than the same person\r\n            reacting with a finger tap, simply because the neural pathway to a finger is shorter and more\r\n            frequently exercised. This is one reason the test standardizes on a simple tap or click as the\r\n            response method — it keeps every attempt, and every comparison between players, consistent.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Reaction Time Across Age Groups")}</h2>
          <p style={bodyText}>
            {tr("Reaction speed is not static across a lifetime. Children generally show slower reaction times than\r\n            adults because the neural pathways involved are still developing and myelination — the\r\n            insulating layer that speeds up nerve signal transmission — is incomplete. Reaction speed\r\n            typically sharpens through adolescence and reaches its peak in the late teens to mid-twenties,\r\n            when nerve conduction is fastest and motor coordination is most refined. From there, reaction\r\n            time tends to slow gradually, often by only a handful of milliseconds per decade, though the rate\r\n            of decline can be meaningfully slowed by staying physically active, mentally engaged, and\r\n            avoiding prolonged sedentary periods.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Reaction Time Score Chart")}</h2>
          <p style={{ ...bodyText, marginBottom: '1rem' }}>
            {tr("Use this table to benchmark your result against competitive tiers:\r\n          ")}</p>

          <div
            className="table-scroll"
            style={{ width: '100%', maxWidth: '100%', marginBottom: '1.5rem', border: `1px solid ${THEME.border}`, borderRadius: '10px' }}
          >
            <table
              style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'clamp(0.8rem,2vw,0.95rem)', minWidth: '480px' }}
              aria-label={tr("Reaction time score benchmarks")}
            >
              <thead>
                <tr style={{ backgroundColor: '#1e293b', color: '#fff' }}>
                  <th style={thStyle}>{tr("Reaction Time")}</th>
                  <th style={thStyle}>{tr("Rating")}</th>
                  <th style={thStyle}>{tr("Real-World Equivalent")}</th>
                </tr>
              </thead>
              <tbody>
                {SCORE_CHART_ROWS.map((row, i) => (
                  <tr key={row.rating} style={{ backgroundColor: i % 2 !== 0 ? 'rgba(25,30,45,0.4)' : 'transparent' }}>
                    <td style={{ ...tdStyle, borderBottom: i < SCORE_CHART_ROWS.length - 1 ? `1px solid ${THEME.border}` : 'none', color: row.color, fontWeight: 'bold' }}>{row.range}</td>
                    <td style={{ ...tdStyle, borderBottom: i < SCORE_CHART_ROWS.length - 1 ? `1px solid ${THEME.border}` : 'none' }}>{row.rating}</td>
                    <td style={{ ...tdStyle, borderBottom: i < SCORE_CHART_ROWS.length - 1 ? `1px solid ${THEME.border}` : 'none' }}>{row.equivalent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 style={h2Style}>{tr("How to Improve Your Reaction Time")}</h2>
          <p style={{ ...bodyText, marginBottom: '1rem' }}>
            {tr("Consistent, targeted training is the most reliable path to shaving milliseconds off your score:\r\n          ")}</p>
          <ul style={listStyle}>
            <li><strong>{tr("Daily short sessions:")}</strong> {tr("Ten focused runs per day builds neural pathways more effectively than occasional marathon sessions.")}</li>
            <li><strong>{tr("Optimize hardware:")}</strong> {tr("A monitor with 1 ms response time and 144 Hz+ refresh rate, paired with a high-polling-rate mouse (1000 Hz+), minimizes system-introduced latency.")}</li>
            <li><strong>{tr("Physical readiness:")}</strong> {tr("Stay hydrated, warm your fingers before testing, and avoid testing when fatigued — reaction time degrades measurably with both.")}</li>
            <li><strong>{tr("Eliminate distractions:")}</strong> {tr("Background noise, notifications, and divided attention all increase processing delay by tens of milliseconds.")}</li>
            <li><strong>{tr("Escalate difficulty gradually:")}</strong> {tr("Start on Rookie mode, then progress through Pro and F1 Elite as your baseline improves.")}</li>
          </ul>

          <h2 style={h2Style}>{tr("A Simple Four-Week Training Framework")}</h2>
          <p style={bodyText}>
            {tr("Structured, progressive practice tends to outperform random, unstructured testing. In the first\r\n            week, focus purely on establishing a stable baseline on Rookie mode — run ten attempts per day and\r\n            resist the urge to chase a single lucky result, since the goal at this stage is consistency rather\r\n            than a personal best. In the second week, move to Pro mode and pay close attention to your false\r\n            start count; if it rises noticeably, that is a signal you are anticipating rather than reacting,\r\n            and you should consciously slow down your intent to respond until the lights actually go out. By\r\n            the third week, most users can comfortably alternate between Pro and F1 Elite, using the harder\r\n            mode specifically to sharpen patience against a longer, more unpredictable delay window. In the\r\n            final week, aim for quality over quantity: five to eight highly focused attempts per session,\r\n            each treated like a real competitive round, tend to produce more durable improvement than a large\r\n            volume of half-attentive taps.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Avoiding False Starts")}</h2>
          <p style={bodyText}>
            {tr("Advanced clicking techniques such as Jitter Clicking or Butterfly Clicking require precise rhythm\r\n            control. The strict Jump Start penalty system in this simulator conditions you to wait for the\r\n            correct visual stimulus rather than anticipating it — a skill directly transferable to competitive\r\n            gameplay where premature inputs result in cooldown or action cancellation.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("A useful mental model borrowed from real motorsport is to treat the wait after the fifth light as\r\n            a countdown with no fixed length rather than a countdown you can predict. Drivers who consistently\r\n            avoid jump starts describe holding a relaxed, ready posture rather than a tensed, anticipatory\r\n            one — tension and anticipation are precisely what cause the nervous system to fire a motor command\r\n            before the visual stimulus has actually been processed. Practicing a calm, neutral starting\r\n            position before each attempt can measurably reduce your false-start rate over time.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Equipment and Hardware Considerations")}</h2>
          <p style={bodyText}>
            {tr("While reaction time is fundamentally a biological process, the hardware chain between the screen\r\n            and your recorded result introduces its own latency, and that latency is additive to your true\r\n            biological response. A standard 60 Hz monitor only refreshes the displayed image sixty times per\r\n            second, which means the visual stimulus can sit undisplayed for up to roughly sixteen milliseconds\r\n            before you even have a chance to perceive it. Moving to a 144 Hz or 240 Hz panel shrinks that\r\n            window considerably, which is part of why competitive gamers overwhelmingly favor high-refresh\r\n            displays.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("Input devices matter too. Wireless peripherals, particularly budget models using older\r\n            connection protocols, can introduce a small but measurable polling delay compared to a wired\r\n            connection or a modern high-polling-rate wireless receiver. Mouse polling rate, specifically,\r\n            determines how frequently your input device reports its state to the computer; a 1000 Hz mouse\r\n            reports a thousand times per second, versus the older 125 Hz standard which reports only eight\r\n            times as often less. None of this changes your underlying neurological reaction speed, but it\r\n            does affect the number that ultimately appears on screen, which is why serious competitors treat\r\n            hardware optimization as a legitimate part of reaction training.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("On mobile devices, touchscreen digitizers themselves introduce a small amount of processing\r\n            overhead compared to a physical mouse click, and this can vary meaningfully between manufacturers\r\n            and even between browser engines on the same device. If you are comparing scores across desktop\r\n            and mobile, keep in mind that the two platforms are not perfectly equivalent measurement\r\n            environments.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Lifestyle Factors That Influence Reaction Speed")}</h2>
          <p style={bodyText}>
            {tr("Reaction time is sensitive to your physiological state in the moment you take the test, which is\r\n            part of why a single result should never be treated as a definitive measurement of your ability.\r\n            Sleep deprivation is one of the most well documented degraders of reaction speed; even a single\r\n            night of significantly reduced sleep can slow simple reaction time by a noticeable margin,\r\n            comparable in some studies to the impairment associated with mild alcohol intoxication. Chronic\r\n            sleep debt compounds this effect over time.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("Hydration status plays a similar, if smaller, role — even mild dehydration has been associated\r\n            with reduced alertness and slower cognitive processing speed. Moderate caffeine intake, on the\r\n            other hand, is one of the few substances with reasonably consistent evidence for a short-term\r\n            improvement in simple reaction time, largely due to its effect on alertness and arousal, though\r\n            excessive intake can introduce jitteriness that works against fine motor precision.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("Physical warm-up also matters more than most people expect. Cold hands and stiff fingers have\r\n            measurably slower fine motor response than warmed-up ones, which is why many competitive gamers\r\n            perform a brief hand-stretching or warm-up routine before high-stakes matches. Mental warm-up\r\n            follows a similar principle: your first few attempts in any session are typically slower than\r\n            attempts five or six, simply because attention and readiness sharpen with repetition.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Common Myths About Reaction Time")}</h2>
          <p style={{ ...bodyText, marginBottom: '1rem' }}>
            {tr("A few persistent misconceptions are worth addressing directly:\r\n          ")}</p>
          <ul style={listStyle}>
            <li><strong>{tr("\"Reaction time can be trained down to near zero.\"")}</strong> {tr("Human neural transmission has hard physiological limits; results consistently below roughly 100 ms are virtually always the product of anticipation rather than genuine improvement.")}</li>
            <li><strong>{tr("\"A faster mouse alone will fix a slow reaction time.\"")}</strong> {tr("Hardware reduces system-introduced latency, but it cannot substitute for the underlying neurological response — both factors matter, but they are not interchangeable.")}</li>
            <li><strong>{tr("\"Reaction time is fixed at birth and cannot improve.\"")}</strong> {tr("While there is a genetic component, deliberate practice, better sleep, and improved focus have all been shown to produce measurable, if modest, improvements over time.")}</li>
            <li><strong>{tr("\"One great score proves elite skill.\"")}</strong> {tr("A single fast result is often influenced by luck, mild anticipation, or a favorable random delay; a stable average across many attempts is a far more reliable indicator.")}</li>
            <li><strong>{tr("\"Reaction time and hand-eye coordination are the same thing.\"")}</strong> {tr("Reaction time measures how quickly you detect and respond to a stimulus, while hand-eye coordination also involves spatial accuracy and continuous tracking — related but distinct skills.")}</li>
          </ul>

          <h2 style={h2Style}>{tr("Why This Test Helps Gamers")}</h2>
          <p style={{ ...bodyText, marginBottom: '1rem' }}>
            {tr("Integrating consistent F1 reaction training accelerates performance across multiple competitive disciplines:\r\n          ")}</p>
          <ul style={listStyle}>
            <li><strong>{tr("FPS titles (CS2, Valorant, Apex):")}</strong> {tr("Lower reaction time translates directly to faster first-shot execution and reduced time-to-kill.")}</li>
            <li><strong>{tr("Fighting games:")}</strong> {tr("Frame-precise punish windows demand sub-200 ms response to capitalize on opponent recovery gaps.")}</li>
            <li><strong>{tr("Battle Royale:")}</strong> {tr("Faster looting, quicker weapon swaps, and earlier aiming decisions all compound reaction-speed advantages.")}</li>
            <li><strong>{tr("CPS benchmarks:")}</strong> {tr("Optimizing click latency can help produce cleaner bursts at the start of a high-speed click counter.")}</li>
            <li><strong>{tr("Racing simulators (iRacing, F1 24):")}</strong> {tr("Consistent, well-timed throttle and brake inputs — skills this test directly trains.")}</li>
            <li><strong>{tr("MOBA titles (League of Legends, Dota 2):")}</strong> {tr("Faster reflexes improve last-hitting precision and reaction to sudden ability combos in team fights.")}</li>
            <li><strong>{tr("Rhythm and music games:")}</strong> {tr("While rhythm games rely more on timing prediction than raw reaction, a lower baseline reaction time still improves recovery from unexpected pattern breaks.")}</li>
          </ul>

          <h2 style={h2Style}>{tr("Shifting Into Elite Pro Tiers")}</h2>
          <p style={bodyText}>
            {tr("While the global median reaction time sits around 250 ms, elite esports professionals and actual\r\n            F1 grid drivers operate closer to the sub-150 ms mark. Regular structured training actively\r\n            conditions your neural pathways to narrow that window — tracked visibly in your personal history\r\n            panel above.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("It is worth setting realistic expectations about the shape of this improvement curve. Most users\r\n            see their fastest gains in the first one to two weeks of consistent practice, as they learn the\r\n            test's rhythm, adjust their posture and grip, and eliminate obvious anticipation errors. Gains\r\n            beyond that point tend to be smaller and more gradual, often just five to fifteen milliseconds\r\n            over subsequent weeks, because at that stage you are no longer eliminating avoidable mistakes but\r\n            genuinely pushing against your underlying neurological response ceiling. This is entirely normal\r\n            and mirrors the improvement curves seen in professional athlete training data.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("The History of Reaction Time Research")}</h2>
          <p style={bodyText}>
            {tr("Formal measurement of human reaction time dates back to nineteenth-century experimental\r\n            psychology, when researchers first used simple mechanical apparatuses to time how quickly a\r\n            person could respond to a light or sound. Those early studies established the roughly 200 to\r\n            250 millisecond baseline that modern digital tests, including this one, still consistently\r\n            reproduce today. What has changed is precision and accessibility — a task that once required a\r\n            physical laboratory and specialized timing equipment can now be measured in a browser using\r\n            high-resolution timing APIs accurate to a fraction of a millisecond.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Simple vs Choice Reaction Time Explained")}</h2>
          <p style={bodyText}>
            {tr("It bears repeating because it is so often misunderstood in online discussion: a simple reaction\r\n            time test, like this one, only ever asks one question — has the stimulus appeared, yes or no.\r\n            A choice reaction time test asks a harder question first — which stimulus appeared, and which of\r\n            several possible responses does it call for. Because the brain must complete an extra\r\n            identification and selection step, choice reaction times are reliably slower, often by fifty\r\n            milliseconds or more, than simple reaction times measured in the same person under the same\r\n            conditions. Comparing your F1 test result to a choice-based test score, such as certain esports\r\n            aim-training drills, will always look faster because the two tools are measuring different things.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Reaction Time in Professional Esports")}</h2>
          <p style={bodyText}>
            {tr("Top-tier esports organizations increasingly treat reaction time as a trainable athletic attribute\r\n            rather than a fixed trait, incorporating regular simple and choice reaction drills into practice\r\n            regimens alongside traditional in-game scrims. Publicly reported reaction benchmarks from\r\n            professional first-person-shooter players frequently fall in the 150 to 200 millisecond range,\r\n            reinforcing the idea that the gap between an average player and a professional is measured in\r\n            tens of milliseconds, not hundreds — small margins that disciplined, repeated practice can close.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Reaction Time in Motorsport Beyond Formula 1")}</h2>
          <p style={bodyText}>
            {tr("The lights-out start format popularized by Formula 1 has been adopted, in one form or another, by\r\n            most major motorsport series, including endurance racing and various single-seater feeder\r\n            categories, precisely because it has proven to be the most reliable way to standardize a fair,\r\n            simultaneous start across a wide field of competitors. Drag racing uses a related but distinct\r\n            system — a vertical \"Christmas tree\" of staged lights — which similarly punishes early movement\r\n            with a red-light disqualification, underscoring how central controlled, randomized-delay starts\r\n            are across the wider world of competitive racing.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Glossary of Key Terms")}</h2>
          <ul style={listStyle}>
            <li><strong>{tr("Simple reaction time:")}</strong> {tr("The interval between a single expected stimulus and a single corresponding response, which is what this test measures.")}</li>
            <li><strong>{tr("Choice reaction time:")}</strong> {tr("The interval when a participant must first identify which of multiple stimuli appeared before selecting the correct response.")}</li>
            <li><strong>{tr("Jump start / false start:")}</strong> {tr("Responding before the actual stimulus appears, resulting in an invalidated attempt and a penalty.")}</li>
            <li><strong>{tr("Personal best (PB):")}</strong> {tr("The single fastest valid reaction time recorded across all of a user's saved attempts.")}</li>
            <li><strong>{tr("Input latency:")}</strong> {tr("The delay introduced by hardware — displays, peripherals, and connection type — between an event occurring and it being registered or displayed.")}</li>
            <li><strong>{tr("Neuromuscular response:")}</strong> {tr("The chain of nerve signals traveling from the brain's motor cortex to the muscles responsible for executing a physical action.")}</li>
          </ul>

          <h2 style={h2Style}>{tr("How Your Results Are Stored and Verified")}</h2>
          <p style={bodyText}>
            {tr("Every attempt you complete is saved directly in your browser's local storage rather than on a\r\n            remote server, which means your history, personal best, and false-start count remain private to\r\n            your own device and are never transmitted anywhere. Each saved entry is tagged with a lightweight\r\n            integrity checksum derived from the recorded time, the selected mode, and the timestamp, which\r\n            allows the application to detect and silently discard any entry that has been corrupted or\r\n            manually tampered with through browser developer tools. This keeps your personal best meaningful\r\n            as a record of genuine attempts rather than an editable number.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("Because the data lives in local storage, clearing your browser's site data, switching to a\r\n            private or incognito window, or moving to a different device or browser will all reset your\r\n            saved history back to zero. If you want to preserve a long-term record of your progress, it is\r\n            worth periodically using the share feature to export a snapshot of your best times before\r\n            clearing browser data or switching setups.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Comparing This Test to Other Reaction Tools")}</h2>
          <p style={bodyText}>
            {tr("Generic reaction-time testers typically use a single, unstructured event, such as a screen\r\n            switching from red to green at a random moment, with no build-up phase at all. That approach\r\n            measures the same underlying biological quantity, but it lacks the anticipation-management\r\n            challenge that the five-light gantry introduces. Because Formula 1's actual start procedure was\r\n            specifically engineered over decades to prevent professional drivers — some of the most trained\r\n            reflexes on the planet — from jumping the start, the lights-out format is widely regarded as a\r\n            more rigorous and more engaging test of genuine reaction discipline than a simple color-swap\r\n            tool.\r\n          ")}</p>
          <p style={bodyText}>
            {tr("Other tools, such as aim trainers used by first-person shooter players, combine reaction time\r\n            with spatial precision and tracking accuracy, producing a composite score rather than an isolated\r\n            reaction measurement. If your goal is specifically to understand and train your raw\r\n            stimulus-to-response speed in isolation, a dedicated simple reaction time format like this one is\r\n            the more precise instrument; if your goal is broader aim and tracking skill, a combined aim\r\n            trainer is a better complement to use alongside it.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Mobile vs Desktop Testing Differences")}</h2>
          <p style={bodyText}>
            {tr("Desktop testing with a mouse or keyboard tends to produce marginally more consistent results\r\n            because physical buttons offer immediate, tactile confirmation of input and are processed through\r\n            a mature, well-optimized input pipeline in most browsers. Touchscreens introduce a digitizer\r\n            sampling step that can add a small amount of variable latency, and results can differ slightly\r\n            between browsers even on the same physical device. Neither platform is \"wrong\" — they simply\r\n            measure the same underlying reaction speed through a slightly different technical pathway, so\r\n            it's most meaningful to track your personal trend on a single platform rather than directly\r\n            comparing a desktop score to a mobile one.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Understanding Your Stats Dashboard")}</h2>
          <p style={bodyText}>
            {tr("The statistics panel above the fold surfaces four figures that matter most for tracking genuine\r\n            improvement: your all-time personal best, your rolling average across the last ten completed\r\n            attempts, your total race count, and your cumulative false-start count. The rolling average is\r\n            usually the more informative number day to day, since a single personal best can be influenced\r\n            by a lucky random delay, while an average smooths out that noise and reflects your true current\r\n            skill level more accurately.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("How Achievements Work")}</h2>
          <p style={bodyText}>
            {tr("Achievement badges unlock automatically as your saved history meets specific milestones, ranging\r\n            from completing your very first race to crossing speed thresholds like sub-200ms, sub-150ms, and\r\n            volume milestones such as ten, fifty, or one hundred completed attempts. These badges are\r\n            calculated live from your locally stored history each time you load the page, so they will\r\n            re-lock if your browser data is ever cleared, but they provide a lightweight way to gamify\r\n            consistent practice rather than chasing a single standout score.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Why Sound and Vibration Feedback Matter")}</h2>
          <p style={bodyText}>
            {tr("Each illuminating light plays a short audio cue, and a personal-best result triggers a distinct\r\n            ascending tone alongside a confetti animation, while supported mobile devices also receive haptic\r\n            vibration feedback at key moments. Multisensory feedback — engaging hearing and touch alongside\r\n            vision — has been shown in reaction research to sometimes produce marginally faster responses\r\n            than a purely visual stimulus alone, because the brain can integrate signals from multiple senses\r\n            simultaneously. If you want the purest possible visual-only measurement, the mute toggle lets you\r\n            disable audio cues entirely while keeping the visual sequence unchanged.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Setting Realistic Improvement Goals")}</h2>
          <p style={bodyText}>
            {tr("Rather than fixating on a single dramatic target like breaking 150 milliseconds immediately, it is\r\n            more productive to set incremental goals tied to your rolling average — for example, aiming to\r\n            lower your ten-run average by ten to twenty milliseconds over two weeks of consistent practice.\r\n            Incremental, average-based goals are far more achievable and far more reflective of genuine skill\r\n            growth than chasing a single best-case outlier result.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Tracking Long-Term Progress")}</h2>
          <p style={bodyText}>
            {tr("The recent-history bar chart and scrollable log beneath your statistics give you a rolling visual\r\n            record of your last several attempts, color-coded by performance tier, making it easy to spot\r\n            whether your recent runs are trending faster, slower, or holding steady. Reviewing this chart\r\n            before and after a training session, rather than judging performance from any single tap, is the\r\n            most reliable way to confirm that a practice routine is actually working.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Sharing Your Score and Competing With Friends")}</h2>
          <p style={bodyText}>
            {tr("The share button generates a formatted summary of your latest result and rating, which can be\r\n            sent directly through your device's native share sheet or copied to your clipboard if sharing is\r\n            unavailable. Friendly competition is one of the most effective and enjoyable ways to stay\r\n            consistent with practice — challenging a friend or teammate to beat your personal best adds\r\n            social accountability that a solo leaderboard cannot replicate.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Final Thoughts on Mastering the Lights-Out Start")}</h2>
          <p style={bodyText}>
            {tr("Reaction time will always carry an element of natural variation from run to run, but the gap\r\n            between an average result and an elite one is smaller, and more trainable, than most people\r\n            assume. Consistent short practice sessions, sensible hardware choices, healthy sleep and\r\n            hydration habits, and an honest focus on your rolling average rather than a single lucky attempt\r\n            are, together, the most reliable formula for genuinely lowering your numbers over time — on this\r\n            simulator and in the competitive pursuits it is designed to sharpen you for.\r\n          ")}</p>

          <h2 style={h2Style}>{tr("Frequently Asked Questions")}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                style={{ backgroundColor: '#FFFFFF', border: '3px solid #000000', borderRadius: '0px', boxShadow: '4px 4px 0 0 #000000', overflow: 'hidden', marginBottom: '8px' }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                  style={{
                    width: '100%',
                    padding: 'clamp(12px,3vw,14px) clamp(14px,4vw,20px)',
                    backgroundColor: openFaq === index ? '#FFF6D6' : '#FFFFFF', border: 'none', borderBottom: openFaq === index ? '3px solid #000000' : 'none',
                    color: '#000000', textAlign: 'left',
                    fontWeight: 900, fontSize: 'clamp(0.9rem,2vw,1rem)', textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    gap: '12px', minHeight: `${MIN_BUTTON_SIZE}px`, lineHeight: 1.4,
                    touchAction: 'manipulation',
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      color: THEME.cyan, flexShrink: 0, fontSize: '0.75rem',
                      transition: 'transform 0.2s',
                      transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      display: 'inline-block',
                    }}
                  >
                    ▼
                  </span>
                </button>
                {openFaq === index && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    style={{
                      padding: `10px clamp(14px,4vw,20px) clamp(12px,3vw,14px)`,
                      color: '#2D3436',
                      fontSize: '0.96rem',
                      backgroundColor: '#FFFFFF',
                      lineHeight: 1.7, fontWeight: 500,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

// ─── Shared style objects ─────────────────────────────────────────────────────

const h2Style: React.CSSProperties = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: 'clamp(1.4rem, 4vw, 2rem)',
  fontWeight: 800, color: '#fff',
  textTransform: 'uppercase', letterSpacing: '0.5px',
  margin: '2.5rem 0 1rem 0',
};

const bodyText: React.CSSProperties = {
  fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
  color: '#94a3b8', marginBottom: '1.25rem',
};

const listStyle: React.CSSProperties = {
  color: '#94a3b8', paddingLeft: '1.5rem',
  marginBottom: '1.5rem', display: 'flex',
  flexDirection: 'column', gap: '0.5rem',
  fontSize: 'clamp(0.9rem, 2vw, 0.98rem)',
};

const thStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid #1b2636',
  whiteSpace: 'nowrap',
};

const tdStyle: React.CSSProperties = {
  padding: '12px 16px',
};
