"use client";

import Link from 'next/link';

import { useEffect, useState } from 'react';


const tools = [
  { to: '/typing-test', icon: '⌨️', name: 'Typing Speed', tag: 'WPM Test', accent: 'var(--neon-cyan)' },
  { to: '/cps-test', icon: '🖱️', name: 'CPS Test', tag: 'Click Speed', accent: 'var(--neon-green)' },
  { to: '/reaction-time', icon: '⚡', name: 'Reaction Time', tag: 'Reflex Test', accent: 'var(--neon-orange)' },
  { to: '/aim-trainer', icon: '🎯', name: '2D Aim Trainer', tag: 'FPS Skills', accent: 'var(--neon-red)' },
  { to: '/spacebar', icon: '▭', name: 'Spacebar Counter', tag: 'Key Smash', accent: 'var(--neon-cyan)' },
  { to: '/key-visualizer', icon: '👁️', name: 'Key Visualizer', tag: 'Real-Time', accent: 'var(--neon-purple)' },
  { to: '/double-click', icon: '🖱️', name: 'Double Click', tag: 'Mouse Test', accent: 'var(--neon-green)' },
  { to: '/accuracy', icon: '📏', name: 'Accuracy Test', tag: 'Precision', accent: 'var(--neon-yellow)' },
  { to: '/scroll-test', icon: '↕️', name: 'Scroll Test', tag: 'Scroll Speed', accent: 'var(--neon-cyan)' },
  { to: '/mouse-accuracy', icon: '🖲️', name: 'Mouse Accuracy', tag: 'Tracking', accent: 'var(--neon-green)' },
  { to: '/3d-aim-trainer', icon: '🎯', name: '3D Aim Trainer', tag: 'Full 3D Aim', accent: 'var(--neon-red)' },
  { to: '/space-defense', icon: '🚀', name: 'Space Defense', tag: 'Skill Game', accent: 'var(--neon-purple)' },
  { to: '/voyager-game', icon: '🌌', name: 'Voyager Game', tag: 'Endless', accent: 'var(--neon-cyan)' },
  { to: '/cps-rush', icon: '💥', name: 'CPS Rush', tag: 'Speed Rush', accent: 'var(--neon-red)' },
  { to: '/space-waves', icon: '🌊', name: 'Space Waves', tag: 'Dodge Game', accent: 'var(--neon-cyan)' },
  { to: '/apm-drill', icon: '⚡', name: 'APM Drill', tag: 'Speed Drill', accent: 'var(--neon-cyan)' },
  { to: '/f1-reaction', icon: '🏎️', name: 'F1 Reaction Test', tag: 'Racing Reflex', accent: 'var(--neon-orange)' },
];

const gearItems = [
  { category: 'MOUSE', brand: 'Logitech', name: 'G Pro X Superlight 2', desc: '60g ultralight. 32K DPI. Used by pro FPS players worldwide.', price: '$159.99' },
  { category: 'KEYBOARD', brand: 'Keychron', name: 'Q1 Pro Wireless', desc: 'Gasket-mounted TKL. Perfect for max WPM scores and typing comfort.', price: '$199.99' },
  { category: 'MONITOR', brand: 'ASUS', name: 'ROG Swift 360Hz', desc: '360Hz for silky-smooth aim training. Every ms counts at elite level.', price: '$699.99' },
  { category: 'AUDIO', brand: 'SteelSeries', name: 'Arctis Nova Pro', desc: 'Hi-res audio with active noise cancellation for full focus mode.', price: '$349.99' },
];

const seoArticles = [
  {
    to: '/typing-test',
    icon: '⌨️',
    color: 'var(--neon-cyan)',
    title: 'Typing Speed Test — Find Your True WPM Without Creating an Account',
    badge: 'WPM',
    content: [
      'Want to know exactly how fast you type? Our <strong>Typing Speed Test</strong> gives you the raw numbers instantly. You\'ll see your WPM, accuracy, and exactly how many typos you made in real-time. No sign-ups or downloads needed.',
      'Let\'s talk numbers. The average person types around <strong>40 WPM</strong>. If you work in an office, you\'re probably hitting 60 WPM. But if you\'re a hardcore touch typist or a programmer, you should be pushing past <strong>90 to 100 WPM</strong>. Some competitive typists even hit 150+ WPM on short bursts.',
      'We set up different modes depending on what you want to practice. Quote mode feels like actual daily typing, while our code snippets mode will heavily test your shift-key and symbol accuracy.',
      '<strong>The secret to typing faster:</strong> Stop looking at your hands. Memorize the home row (ASDF / JKL;). Even just 10 minutes of daily practice without looking down will bump your speed by 20 WPM in a few weeks.',
    ],
    faqs: [
      { q: 'What counts as a "good" typing speed?', a: 'Anything over 65 WPM is great for daily work. If you write code or heavy documentation, aim for 80+. If you\'re currently stuck under 40 WPM, taking a week to learn proper finger placement will change your life.' },
      { q: 'Raw WPM vs. Net WPM: What\'s the difference?', a: 'Raw WPM is just how many keys you smashed. Net WPM is your actual usable speed because it subtracts your mistakes. If you type 100 words but mess up 20 of them, your Net WPM drops. Net is the only score that really matters.' },
      { q: 'Can I actually reach 100 WPM?', a: 'Absolutely. Most people plateau at 70 WPM because they use bad finger habits. If you force yourself to use all ten fingers and practice for a few months, 100 WPM is totally doable.' },
    ],
  },
  {
    to: '/cps-test',
    icon: '🖱️',
    color: 'var(--neon-green)',
    title: 'CPS Test — Check Your Clicks Per Second',
    badge: 'CPS',
    content: [
      'The <strong>CPS Test</strong> is exactly what it sounds like: a timer, a clicking box, and a tracker that tells you your exact clicks per second. It\'s the go-to benchmark for Minecraft PvP players trying to prove they aren\'t using an auto-clicker.',
      'If you just casually click using your index finger, you\'ll probably land around <strong>5 to 7 CPS</strong>. Gamers using the jitter clicking technique usually sit around <strong>11 to 14 CPS</strong>. If you butterfly click, hitting 15+ is pretty standard.',
      'We offer a few time limits, but the <strong>5-second test</strong> is the golden rule. It\'s long enough to see if you can hold your speed, but short enough that your arm doesn\'t completely gas out.',
      '<strong>A quick tip on technique:</strong> Jitter clicking is great for combat because you still have decent control over your mouse. Butterfly clicking might get you a higher score here, but good luck aiming accurately in-game while doing it.',
    ],
    faqs: [
      { q: 'How much CPS do I actually need for Minecraft?', a: 'For older combat systems (like 1.8.9), 10 CPS is the sweet spot. Going higher than 15 CPS barely registers because of the server\'s 20-tick limit anyway. Anything above that is just flexing.' },
      { q: 'Will jitter clicking hurt my hand?', a: 'It can, especially if you tense up your wrist instead of your forearm. Take breaks. If your hand starts feeling numb or tingly, stop immediately. A high score isn\'t worth RSI (Repetitive Strain Injury).' },
      { q: 'Why is my score lower on the 10-second test?', a: 'Because human muscles get tired fast. You can sprint for 2 seconds, but you can\'t sprint for 10. Longer tests show your stamina, not just your peak burst speed.' },
    ],
  },
  {
    to: '/reaction-time',
    icon: '⚡',
    color: 'var(--neon-orange)',
    title: 'Reaction Time Test — How Fast Are Your Reflexes?',
    badge: 'REFLEX',
    content: [
      'Ever wonder why you lost that sniper duel in Valorant? Your <strong>Reaction Time</strong> might be the reason. This test measures the exact millisecond gap between the screen turning green and your finger clicking the mouse.',
      'The average person sits around <strong>200ms to 250ms</strong>. Pro FPS players? They routinely hit between <strong>150ms and 170ms</strong>. Dropping below 150ms is incredibly rare and usually means you have god-tier genetics or an insanely low-latency gaming setup.',
      'We randomize the delay between 1.5 and 5 seconds so you can\'t guess when it\'s going to happen. Also, we calculate your score based on the <strong>median</strong>, not the average. This way, one accidental early click doesn\'t ruin your whole run.',
      '<strong>Want a better score?</strong> Drink some coffee, get a full night\'s sleep, and use a 144Hz (or higher) monitor. Playing on a 60Hz screen adds about 16ms of pure delay that you literally can\'t fix with practice.',
    ],
    faqs: [
      { q: 'What is a good reaction time for gaming?', a: 'If you\'re consistently under 200ms, you have a solid advantage over most casual players. But remember, pure reaction time is just one part of the puzzle. Crosshair placement and game sense usually win fights before reaction time even matters.' },
      { q: 'Can I practice to get faster reflexes?', a: 'Yes and no. You can lower your score by 10-20ms just by getting used to the test and warming up. But everyone has a biological limit based on how fast their nervous system sends signals.' },
      { q: 'Is my phone or laptop screen making me slower?', a: 'Yes. Phones, TVs, and standard office monitors have noticeable input lag. If you really want an accurate test of your body\'s speed, do this on a wired mouse with a high refresh rate gaming monitor.' },
    ],
  },
  {
    to: '/aim-trainer',
    icon: '🎯',
    color: 'var(--neon-red)',
    title: '2D Browser Aim Trainer — Warm Up Before Ranked',
    badge: 'AIM',
    content: [
      'Don\'t feel like launching a bulky software just to warm up? Our <strong>Aim Trainer</strong> runs right in your browser. Just pick your target size, hit start, and get your wrist moving before you queue up for a match.',
      'We built this to focus on the big three: <strong>flicking</strong> (hitting static dots fast), <strong>tracking</strong> (keeping your crosshair on a moving target), and <strong>micro-adjustments</strong> (tiny, precise movements).',
      'The system is dynamic. If you\'re hitting 90% of your shots, the targets will start shrinking and moving faster. It constantly pushes you out of your comfort zone, which is the only way your muscle memory actually improves.',
      '<strong>Pro tip:</strong> Don\'t chase high scores. Use this for 5 to 10 minutes max just to wake up your hand-eye coordination. You\'ll notice your first game of the day feels way less clunky.',
    ],
    faqs: [
      { q: 'Does a 2D browser aim trainer actually help in 3D games?', a: 'Yes. Aiming is mostly about mouse control. Whether you\'re clicking a 2D dot or a 3D head in CS2, you\'re still training the connection between your brain, your eyes, and your hand.' },
      { q: 'What sensitivity should I use?', a: 'Whatever you use in your main game. Match your DPI and Windows mouse speed. Training on a random, super-fast sensitivity will just mess up the muscle memory you\'ve already built.' },
    ],
  },
  {
    to: '/spacebar',
    icon: '▭',
    color: 'var(--neon-cyan)',
    title: 'Spacebar Counter — Test Your Tapping Speed',
    badge: 'SPACEBAR',
    content: [
      'It sounds like a meme, but the <strong>Spacebar Counter</strong> is actually super useful. The spacebar is the biggest, most abused key on your board. Whether you\'re bunny-hopping, playing rhythm games, or just speed typing, spacebar timing is everything.',
      'If you play Geometry Dash, you know that missing a spacebar tap by a millisecond ruins a run. Speedrunners use rapid taps to abuse movement mechanics. Even in normal typing, your thumb hits space more than any other finger hits any other key.',
      'You can run 5s, 10s, or 30s tests. Watch the rhythm graph at the end—it shows if you keep a steady pace or if your thumb completely gives up halfway through the test.',
      '<strong>Keyboard tip:</strong> Linear switches (like Cherry MX Reds) are way better for this than clicky switches. Since they don\'t have a tactile bump, you can rapidly flutter your thumb without fighting the keyboard\'s resistance.',
    ],
    faqs: [
      { q: 'What is a fast spacebar speed?', a: 'Hitting 8 presses a second is pretty good. If you can maintain 11+ across a 10-second test, you either play way too much osu! or you have insane thumb stamina.' },
      { q: 'Why does my keyboard miss some of my spacebar hits?', a: 'Your keyboard might have a slow debounce delay, or the switch itself is getting mushy. Some cheaper keyboards physically can\'t register inputs as fast as you can tap.' },
    ],
  },
  {
    to: '/key-visualizer',
    icon: '👁️',
    color: 'var(--neon-purple)',
    title: 'Key Visualizer — Test Your Keyboard Ghosting & NKRO',
    badge: 'LIVE',
    content: [
      'The <strong>Key Visualizer</strong> is a live, on-screen display of exactly what your keyboard is doing. It\'s perfect for finding out if your keyboard has hardware issues, or for using as an overlay while streaming.',
      'Its best feature is testing for <strong>Ghosting (NKRO)</strong>. Cheap keyboards can only process 3 or 4 keys at a time. Mash your WASD keys, hold Shift, and hit Space. Did one of those keys not light up on our visualizer? That\'s ghosting, and it will get you killed in FPS games.',
      'Streamers love this tool. If you play rhythm games, speedruns, or fighting games, you can just add this URL as a Browser Source in OBS. Your viewers will see your exact inputs in real-time without you downloading any sketchy third-party software.',
      'The visualizer shows three states: solid color when you hold a key, a fading trail when you let go, and dark when idle. It\'s also a great way to test if your custom macros are actually firing correctly.',
    ],
    faqs: [
      { q: 'What exactly is Keyboard Ghosting?', a: 'It\'s a hardware limitation. When you press too many keys at once, the keyboard\'s circuitry gets confused and "drops" an input. Gaming keyboards advertise "N-Key Rollover" (NKRO), meaning they can register every single key pressed at the same time.' },
      { q: 'How do I make the background transparent for OBS?', a: 'Just add the URL as a Browser Source in OBS Studio. You can apply a simple custom CSS rule right inside OBS (`body { background: transparent !important; }`) to hide our website background and only show the floating keys.' },
    ],
  },
  {
    to: '/double-click',
    icon: '🖱️',
    color: 'var(--neon-green)',
    title: 'Double Click Test — Check Your Mouse for Dying Switches',
    badge: 'MOUSE',
    content: [
      'Is your mouse acting weird? Dragging files by accident or firing two shots instead of one? You probably have a failing switch. Our <strong>Double Click Test</strong> measures the exact time between your clicks to diagnose hardware defects.',
      'Here\'s what happens inside a dying mouse: the tiny metal spring in the switch gets worn out and starts "bouncing." When you click once, the metal bounces and touches the contact twice. To the computer, it looks like two insanely fast clicks.',
      'Our tool creates a live interval graph. A normal, healthy human click usually has a gap of 100ms or more. If our graph shows clicks happening with a <strong>10ms to 30ms gap</strong>, that\'s switch bounce. A human physically cannot double-click that fast.',
      '<strong>How to fix it:</strong> Check if your mouse software (like Razer Synapse or Glorious Core) has a "Debounce Time" slider. Turn it up to 12ms. If you don\'t have that option, you either need to solder a new switch into the mouse, or just buy a new one.',
    ],
    faqs: [
      { q: 'Which gaming mice are known for double-clicking?', a: 'Older Logitech mice (like the G Pro Wireless Gen 1, G305, and early G502s) were notorious for this because of the Omron 50M switches they used. Most modern top-tier mice now use optical switches, which use light beams instead of metal contacts, making double-clicking literally impossible.' },
      { q: 'Are you sure it\'s the mouse and not just my finger twitching?', a: 'Yes. If you look at the test results and see intervals under 50ms, it is 100% a hardware defect. Human fingers simply don\'t bounce that fast.' },
    ],
  },
  {
    to: '/accuracy',
    icon: '📏',
    color: 'var(--neon-yellow)',
    title: 'Keyboard Accuracy Test — Stop Making Typos',
    badge: 'ACCURACY',
    content: [
      'Speed means nothing if you have to hit backspace every three seconds. Our <strong>Keyboard Accuracy Test</strong> forces you to slow down and exposes exactly which fingers are making the most mistakes.',
      'We calculate your score simply: correct keystrokes divided by total keystrokes. But more importantly, the test tracks your error patterns. Are you constantly hitting "r" instead of "t"? This tool will map out those bad habits.',
      'We built the test phrases specifically to trip you up. You\'ll deal with tricky adjacent keys, capital letters thrown into the middle of sentences, and heavy number-row usage.',
      '<strong>Why this matters:</strong> Every time you make a mistake, fixing it costs you about 3 to 5 seconds of time and totally breaks your flow state. A typist going 80 WPM with 99% accuracy will finish a document way faster than a 110 WPM typist with 85% accuracy.',
    ],
    faqs: [
      { q: 'What is a good typing accuracy percentage?', a: 'Anything below 95% means you are wasting a ton of time correcting yourself. You should aim for 97% to 98% for everyday typing. If you write code, aim for 99%—one missed semicolon can ruin your day.' },
      { q: 'How do I stop mistyping specific keys?', a: 'Slow down. Figure out which key transition messes you up, and practice typing just those words at half speed. You have to overwrite your bad muscle memory with slow, deliberate practice.' },
    ],
  },
  {
    to: '/scroll-test',
    icon: '↕️',
    color: 'var(--neon-cyan)',
    title: 'Scroll Speed Test — Check Your Mouse Wheel',
    badge: 'SCROLL',
    content: [
      'The <strong>Scroll Test</strong> tracks how many wheel ticks you can register in a second. It\'s a fun challenge, but it\'s also an incredible diagnostic tool to see if your mouse\'s scroll encoder is dirty or breaking.',
      'If you scroll down, but the page occasionally jumps up for a split second, your scroll encoder is dying. This test graphs out every single tick. If your graph has random dips or gaps, your hardware is at fault.',
      'If you have a mouse with an "infinite scroll" unlock wheel (like the Logitech G502 or MX Master), you can hit 60 to 80 ticks per second easily. Standard notched wheels will max out around 12 ticks per second.',
    ],
    faqs: [
      { q: 'Why does my scroll wheel jump in the wrong direction?', a: 'Dust, pet hair, or just mechanical wear and tear inside the wheel encoder. Sometimes blowing hard into the wheel gaps fixes it. If not, the encoder is worn out.' },
      { q: 'Does scrolling speed actually matter for anything?', a: 'In games like CS2 or Apex Legends, players bind "Jump" or "Tap Strafe" to the scroll wheel. A consistent, tactile scroll wheel is massive for hitting movement tech perfectly.' },
    ],
  },
  {
    to: '/mouse-accuracy',
    icon: '🖲️',
    color: 'var(--neon-green)',
    title: 'Mouse Accuracy Test — Find Your Perfect DPI',
    badge: 'TRACKING',
    content: [
      'This isn\'t just about clicking a dot. The <strong>Mouse Accuracy Test</strong> tracks the exact path your cursor takes to get to the target. It\'s the absolute best way to figure out if your DPI is set too high.',
      'We give you a report based on a few things: Did you click inside the circle? How fast did you get there? And most importantly, <strong>Path Efficiency</strong>. Did you move in a perfectly straight line, or did your cursor curve wildly before landing on the target?',
      'If your path efficiency is terrible, you are over-correcting. This usually means your sensitivity is too high. You\'re over-shooting the target and having to pull back at the last millisecond.',
      '<strong>How to test your DPI:</strong> Run this test three times. Once at 400 DPI, once at 800, and once at 1600. Look at which setting gives you the straightest lines and least deviation. That is your natural sensitivity.',
    ],
    faqs: [
      { q: 'What DPI do pro players use?', a: 'Most FPS pros sit heavily at 800 DPI nowadays. 400 DPI requires massive arm movements, and anything over 1600 DPI usually picks up tiny, unwanted hand twitches.' },
      { q: 'Why is my cursor path always curved?', a: 'Because your elbow and wrist act as pivot points, creating a natural arc when you move your arm. Learning to combine wrist and arm movement to draw a straight line is the secret to god-tier aim.' },
    ],
  },
  {
    to: '/3d-aim-trainer',
    icon: '🎯',
    color: 'var(--neon-red)',
    title: '3D Aim Trainer — Master Your FPS Mechanics',
    badge: '3D AIM',
    content: [
      'While 2D trainers are great for raw mouse control, our <strong>3D Aim Trainer</strong> puts you inside a true spatial environment. This bridges the gap between cursor movement and real-world game engine camera rotation, directly translating to better performance in Valorant, CS2, and Apex Legends.',
      'By matching your in-game sensitivity and FOV, you can build perfectly transferable 1:1 muscle memory. You are no longer just clicking dots on a flat screen—you are learning the exact physical hand movements required to snap to a target 45 degrees to your right.',
      'Focus heavily on your crosshair path efficiency and eliminate over-flicking. A consistent, smooth tracking motion combined with precise micro-adjustments is what separates the average player from a mechanical god.',
      '<strong>The golden rule of aim training:</strong> Accuracy over speed. If you train to be fast but constantly miss, you are just reinforcing bad habits. Hit 95% of your shots, and the speed will naturally follow as your neural pathways adapt.',
    ],
    faqs: [
      { q: 'Why is a 3D aim trainer better than a 2D one?', a: 'Because it incorporates depth perception and field of view (FOV). In a 3D game, moving your mouse rotates a camera. A 3D trainer perfectly simulates this rotation, whereas a 2D trainer only simulates moving a flat cursor.' },
    ],
  },
  {
    to: '/space-defense',
    icon: '🚀',
    color: 'var(--neon-purple)',
    title: 'Space Defense — Can You Click Fast Under Pressure?',
    badge: 'GAME',
    content: [
      'Anyone can hit 12 CPS on a massive, stationary square. But can you do it while tracking multiple moving targets? <strong>Space Defense</strong> combines raw click speed with target prioritization. If three ships hit the bottom, game over.',
      'The early waves are slow and easy. By wave 8, you\'re dealing with armored targets that require multiple clicks. By wave 13, it\'s complete chaos and purely a test of how calm you can stay under pressure.',
      'We punish spamming. The game calculates an accuracy multiplier. If you just wildly click everywhere hoping to hit something, your score will tank. Deliberately clicking 7 times a second with high accuracy will always beat frantic 14 CPS spam.',
      'Players usually find out that their "in-game CPS" is way lower than their benchmark CPS. Closing the gap between those two numbers is exactly how you win chaotic close-range fights in games like Apex Legends.',
    ],
    faqs: [
      { q: 'What\'s the strategy for surviving the later waves?', a: 'Don\'t look at the cluster. Focus entirely on the ships closest to the bottom. Click a target twice, instantly snap to the next one. Smooth, deliberate movements will save you; panic shaking will get you killed.' },
    ],
  },
  {
    to: '/voyager-game',
    icon: '🌌',
    color: 'var(--neon-cyan)',
    title: 'Voyager — The Ultimate Evasion Warm-up',
    badge: 'ENDLESS',
    content: [
      '<strong>Voyager</strong> is pure flow state. You control a ship with your cursor, dodging an endless, escalating field of asteroids. No shooting, just survival. It\'s arguably the best overall neurological warm-up on the platform.',
      'At first, it\'s easy. But the density and speed ramp up infinitely. To survive past the two-minute mark, you have to stop looking at your ship and start looking at the empty spaces between the asteroids.',
      'This trains predictive tracking. You have to read where an object is going to be two seconds from now, and position your mouse accordingly. Playing this for 5 minutes before booting up a ranked match wakes up your spatial awareness instantly.',
    ],
    faqs: [
      { q: 'What is a good survival time?', a: 'If you can hit 60 seconds, you\'ve grasped the basics. Pushing past 2 minutes requires serious focus. If you break 3 minutes, you have elite mouse control.' },
      { q: 'How is this different from an Aim Trainer?', a: 'Aim trainers teach you to move your mouse *to* an object. Voyager teaches you to maneuver your mouse *around* objects smoothly. Both are critical components of total mouse control.' },
    ],
  },
  {
    to: '/cps-rush',
    icon: '💥',
    color: 'var(--neon-red)',
    title: 'CPS Rush — Pure Burst Speed',
    badge: 'RUSH',
    content: [
      'If the standard CPS test is a sprint, <strong>CPS Rush</strong> is a 1-rep max. You get 1 second to click as fast as humanly possible, followed by a 2-second break. This repeats for 10 grueling rounds.',
      'We take your top 7 rounds and drop the 3 lowest to calculate your score. Why? Because this test completely isolates your peak neuromuscular burst speed. Most players find they score 2 to 3 CPS higher here than they do on the 5-second test.',
      'Look closely at your round-by-round graph. If your score steadily drops from 14 down to 9, you are tensing your hand way too hard and burning out. If you stay consistent round after round, your clicking technique is solid and sustainable.',
    ],
    faqs: [
      { q: 'Why is burst CPS important?', a: 'Think about a shotgun fight in Fortnite or a quick melee trade in Minecraft. You don\'t need to click for 10 seconds straight; you just need absolute maximum speed for exactly 1 second. This trains that exact scenario.' },
      { q: 'How do I stop my arm from hurting during this?', a: 'Relax your wrist. If you are jitter clicking, the vibration should come from your forearm, not your hand. If it hurts, stop. Take the 2-second break seriously to reset your tension.' },
    ],
  },
  {
    to: '/space-waves',
    icon: '🌊',
    color: 'var(--neon-cyan)',
    title: 'Space Waves — Free Arcade Dodging Game to Sharpen Your Timing',
    badge: 'DODGE',
    content: [
      'Want a fun way to stress-test a new mouse or keyboard? <strong>Space Waves</strong> is a one-button arcade dodging game: hold Space or your mouse button to climb, release to fall. Your glowing arrow flies forward automatically through a randomly generated course of walls, floating blocks, tunnels, and spinning hazards.',
      'The controls are dead simple, but the timing gets brutal fast. Every run is freshly generated, so you can\'t just memorize a pattern — you actually have to read gaps, blocks, tunnels, and spinning hazards on the fly and react before they\'re fully on screen.',
      'We track your progress percentage and attempt count on every run. Miss a section and you crash instantly, seeing exactly how far you made it. Clear the course and your attempts reset, so you can chase a cleaner run next time.',
      '<strong>Quick tip:</strong> Tap, don\'t hold. Long holds send your arrow swinging way past where it needs to be. Short, deliberate taps give you way more control through tight gaps and tunnels.',
    ],
    faqs: [
      { q: 'How do I control the arrow?', a: 'Hold Space or your mouse button to climb, release to fall. On mobile, press and hold anywhere on the game area. That\'s the entire control scheme.' },
      { q: 'Is the course the same every time?', a: 'No. Every run generates a fresh mix of gaps, blocks, tunnels, and spinning hazards, so memorizing a specific run won\'t help — you have to read each obstacle as it comes.' },
      { q: 'Does this actually help with other games?', a: 'Yes. The single-input, precise-timing skillset carries over well to auto-runners, rhythm platformers, and anything with tight dodge windows. It\'s also a solid way to feel out a new mouse or keyboard, since any input lag shows up immediately as a mistimed climb.' },
    ],
  },
  {
    to: '/f1-reaction',
    icon: '🏎️',
    color: 'var(--neon-orange)',
    title: 'F1 Reaction Test — Simulate a Real Formula 1 Race Start',
    badge: 'F1',
    content: [
      'In Formula 1, the difference between a perfect race start and a catastrophic wheel-spin is often less than <strong>50 milliseconds</strong>. Our <strong>F1 Reaction Test</strong> puts you in the cockpit: five red lights illuminate one by one, then go dark. Your job is to floor it the instant they vanish — just like a real F1 driver on the grid.',
      'The reaction window is brutally tight. React before the lights go out and you get a <strong>false start</strong> — an automatic penalty in real racing. React more than 300ms after and you\'ve already lost two car lengths. The elite zone is <strong>150ms to 250ms</strong> after light-out, which is where actual F1 drivers consistently land.',
      'The five-light sequence introduces a variable delay, so you can\'t count the rhythm and cheat. Your brain has to stay locked on the lights and fire the moment it processes darkness — which is harder than it sounds after a tense 3-second buildup.',
      '<strong>Pro tip:</strong> Don\'t watch the lights go on — watch for them to go off. Experienced drivers actually focus their gaze on the off-state of the final light, which shaves around 20ms of visual processing time compared to tracking each light as it illuminates.',
    ],
    faqs: [
      { q: 'What is a good F1 reaction time?', a: 'Real F1 drivers average between 150ms and 280ms. If you consistently land under 200ms without false-starting, your reflexes are genuinely at a competitive motorsport level. Under 150ms is essentially impossible without anticipating the lights.' },
      { q: 'What counts as a false start?', a: 'If you click or press before the lights go out, it\'s a false start. In real F1, an automated sensor detects any throttle application before light-out and the driver receives a drive-through or time penalty. Our test just shows you the red FALSE START screen.' },
      { q: 'Why is the delay random?', a: 'In real Grand Prix starts, the FIA randomizes the delay between the fifth light illuminating and the light-out signal. This prevents drivers from gaming the system by counting seconds. We replicate that same variable delay so every attempt is a genuine reflex test.' },
      { q: 'How does this compare to the standard Reaction Time test?', a: 'The standard Reaction Time test uses a simple color-change cue. The F1 test adds psychological pressure: the slow build of five lights, the fear of false-starting, and a more realistic race-start context. Most people score 20–40ms slower here due to the added anticipation stress.' },
    ],
  },
];

export default function HomePage() {
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 0.5rem', paddingBottom: '3rem' }}>

      {/* ── 1. HERO SECTION — CANONICAL NEUBRUTALISM SHOWCASE ── */}
      <section style={{
        background: '#FFE033',
        border: '3px solid #000000',
        boxShadow: '8px 8px 0 0 #000000',
        padding: '3.5rem 2.5rem',
        margin: '1rem 0 4rem',
        position: 'relative',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          
          {/* Left Hero Column */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              background: '#FF6B6B',
              border: '3px solid #000000',
              boxShadow: '3px 3px 0 0 #000000',
              fontSize: '0.8rem',
              fontWeight: 900,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '1.5rem',
            }}>
              <span className="hero-pulse-dot" style={{ background: '#000000', boxShadow: 'none' }} />
              EST. 2026 // FIXED AIM 2.0
            </div>

            <h1 style={{
              fontSize: 'clamp(3rem, 7.5vw, 5.8rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: '#000000',
              marginBottom: '1.25rem',
              fontFamily: "'Public Sans', 'Barlow Condensed', 'Arial Black', sans-serif"
            }}>
              TEST.<br />
              TRAIN.<br />
              DOMINATE.
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#000000',
              fontWeight: 600,
              maxWidth: '520px',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}>
              The definitive gaming benchmark platform that refuses to be invisible. 17 high-precision tools. Zero sign-up. Pure raw performance.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/cps-test" className="btn btn-primary" style={{
                background: '#FF6B6B',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0 0 #000000',
                fontSize: '1.05rem',
                padding: '14px 28px',
                fontWeight: 900,
              }}>
                ⚡ START CPS TEST
              </Link>
              <Link href="/typing-test" className="btn btn-secondary" style={{
                background: '#74B9FF',
                color: '#000000',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0 0 #000000',
                fontSize: '1.05rem',
                padding: '14px 28px',
                fontWeight: 900,
              }}>
                ⌨️ TYPING SPEED
              </Link>
              <button 
                onClick={() => {
                  const element = document.getElementById('all-tools');
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
                className="btn"
                style={{
                  background: '#FFFFFF',
                  color: '#000000',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0 0 #000000',
                  fontSize: '0.95rem',
                  padding: '13px 20px',
                  fontWeight: 800,
                }}
              >
                VIEW ALL 17 TOOLS ↓
              </button>
            </div>
          </div>

          {/* Right Hero Column — 3 Tilted Sticker Cards directly matching user reference image */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            
            {/* Sticker 1: Black Card */}
            <div style={{
              background: '#18181B',
              color: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '5px 5px 0 0 #000000',
              padding: '1.25rem 2rem',
              width: 'min(320px, 100%)',
              transform: 'rotate(2.5deg)',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '0.02em',
              textAlign: 'center',
            }}>
              border: 3px solid #000;
            </div>

            {/* Sticker 2: Pink Card */}
            <div style={{
              background: '#FF6B6B',
              color: '#000000',
              border: '3px solid #000000',
              boxShadow: '5px 5px 0 0 #000000',
              padding: '1.25rem 2rem',
              width: 'min(320px, 100%)',
              transform: 'rotate(-2.5deg)',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '0.02em',
              textAlign: 'center',
            }}>
              box-shadow: 5px 5px 0 0 #000;
            </div>

            {/* Sticker 3: Mint/Cyan Card */}
            <div style={{
              background: '#74B9FF',
              color: '#000000',
              border: '3px solid #000000',
              boxShadow: '5px 5px 0 0 #000000',
              padding: '1.25rem 2rem',
              width: 'min(320px, 100%)',
              transform: 'rotate(1.5deg)',
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '0.02em',
              textAlign: 'center',
            }}>
              border-radius: 0;
            </div>

          </div>

        </div>
      </section>

      {/* ── 2. CATEGORY CARDS — CHOOSE YOUR ARENA ── */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="section-label">ARENA CATEGORIES</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, marginBottom: '0.5rem' }}>CHOOSE YOUR ARENA</h2>
        <p style={{ color: '#2D3436', fontWeight: 600, marginBottom: '2rem' }}>Precision tools and skill games. Free, instant, zero signup required.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            {
              to: '/keyboard', title: 'Keyboard Tools',
              desc: 'Test and improve your typing speed, accuracy, and keyboard rollover mastery. From WPM sprints to live key visualizers.',
              color: '#74B9FF',
              pills: [
                { to: '/typing-test', label: 'Typing Speed' },
                { to: '/key-visualizer', label: 'Key Visualizer' },
                { to: '/spacebar', label: 'Spacebar' },
              ],
            },
            {
              to: '/mouse', title: 'Mouse Tools',
              desc: 'Measure clicks per second, test double-click bounce intervals, and challenge your overall mouse tracking precision.',
              color: '#55EFC4',
              pills: [
                { to: '/cps-test', label: 'CPS Test' },
                { to: '/double-click', label: 'Double Click' },
                { to: '/cps-rush', label: 'CPS Rush' },
              ],
            },
            {
              to: '/aim', title: 'Aim & Reaction',
              desc: 'Train your reflexes, sharpen your flicks, and simulate competitive FPS-style shootouts with dynamic moving targets.',
              color: '#FF9F43',
              pills: [
                { to: '/reaction-time', label: 'Reaction Time' },
                { to: '/aim-trainer', label: 'Aim Trainer' },
                { to: '/f1-reaction', label: 'F1 Reflex' },
              ],
            },
            {
              to: '/benchmark', title: 'Benchmark Hub',
              desc: 'Benchmark your network speed, real-time ping latency, jitter variation, and packet loss with live telemetry.',
              color: '#FFE033',
              pills: [
                { to: '/benchmark', label: 'Benchmark Hub' },
                { to: '/internet-speed', label: 'Speed Test' },
              ],
            },
            {
              to: '/games', title: 'Skill Games',
              desc: 'Challenge yourself with interactive reflex arcade games to develop your reaction time and clicking endurance.',
              color: '#A29BFE',
              pills: [
                { to: '/space-defense', label: 'Space Defense' },
                { to: '/voyager-game', label: 'Voyager Game' },
                { to: '/space-waves', label: 'Space Waves' },
              ],
            },
          ].map(cat => (
            <Link
              key={cat.to}
              href={cat.to}
              className="card"
              style={{
                background: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '5px 5px 0 0 #000000',
                padding: '1.75rem',
                textDecoration: 'none',
                color: '#000000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '7px 7px 0 0 #000000';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '5px 5px 0 0 #000000';
              }}
            >
              <div>
                <div style={{
                  display: 'inline-block',
                  background: cat.color,
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 0 #000000',
                  padding: '2px 8px',
                  fontWeight: 900,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}>
                  {cat.title}
                </div>
                <div style={{
                  fontFamily: "'Public Sans', 'Barlow Condensed', sans-serif",
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                  marginBottom: '0.6rem',
                  color: '#000000'
                }}>{cat.title}</div>
                <p style={{ color: '#2D3436', fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.55, marginBottom: '1.5rem' }}>{cat.desc}</p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', borderTop: '2px dashed #000000', paddingTop: '1rem' }}>
                {cat.pills.map(p => (
                  <span key={p.label} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.65rem',
                    background: '#FFFDF5',
                    color: '#000000',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    border: '2px solid #000000',
                    boxShadow: '2px 2px 0 0 #000000',
                  }}>{p.label}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 3. QUICK LAUNCH GRID (ALL 17 TOOLS) ── */}
      <section id="all-tools" style={{ marginBottom: '4rem' }}>
        <div className="section-label">QUICK LAUNCH</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, marginBottom: '0.5rem' }}>JUMP IN INSTANTLY</h2>
        <p style={{ color: '#2D3436', fontWeight: 600, marginBottom: '2rem' }}>No setup required. Click any tool and start testing in under 2 seconds.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '1.25rem',
        }}>
          {tools.map(tool => (
            <Link
              key={tool.to}
              href={tool.to}
              style={{
                background: '#FFFFFF',
                border: '3px solid #000000',
                boxShadow: '4px 4px 0 0 #000000',
                padding: '1.1rem 1.25rem',
                textDecoration: 'none',
                color: '#000000',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '85px',
                transition: 'transform 0.1s ease, box-shadow 0.1s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translate(-2px, -2px)';
                el.style.boxShadow = '6px 6px 0 0 #000000';
                el.style.background = '#FFF6D6';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translate(0, 0)';
                el.style.boxShadow = '4px 4px 0 0 #000000';
                el.style.background = '#FFFFFF';
              }}
            >
              <div style={{
                fontFamily: "'Public Sans', 'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: '1.05rem',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
                color: '#000000'
              }}>{tool.name}</div>
              
              <div style={{ marginTop: '0.5rem' }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.68rem',
                  background: '#FFE033',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 0 #000000',
                  color: '#000000',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  padding: '1px 6px',
                }}>{tool.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 4. INTERNET SPEED MINI WIDGET — NEUBRUTALISM ── */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>

          {/* LEFT: Mini Speed Dashboard Card */}
          <div>
            <div className="section-label">BENCHMARK</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              INTERNET SPEED<br /><span style={{ background: '#FFE033', padding: '0 6px', border: '2px solid #000' }}>MONITOR</span>
            </h2>

            <div className="card" style={{
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '6px 6px 0 0 #000000',
              padding: '2rem',
            }}>
              {/* Gauge */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <svg width="180" height="100" viewBox="0 0 180 100" fill="none">
                  <path d="M 20 90 A 70 70 0 0 1 160 90" stroke="#000000" strokeWidth="12" strokeLinecap="square" fill="none"/>
                  <path d="M 20 90 A 70 70 0 0 1 160 90" stroke="#FFE033" strokeWidth="8" strokeLinecap="square" fill="none"
                    strokeDasharray="220" strokeDashoffset="130" />
                  <line x1="90" y1="90" x2="55" y2="45" stroke="#FF4757" strokeWidth="4" strokeLinecap="square"/>
                  <circle cx="90" cy="90" r="7" fill="#000000"/>
                  <text x="16" y="100" fill="#000000" fontSize="12" fontWeight="900">0</text>
                  <text x="145" y="100" fill="#000000" fontSize="12" fontWeight="900">250</text>
                </svg>
              </div>

              {/* Speed value */}
              <div style={{ textAlign: 'center', marginBottom: '0.25rem' }}>
                <span style={{ fontFamily: "'Public Sans', sans-serif", fontWeight: 900, fontSize: '2.8rem', color: '#000000', lineHeight: 1 }}>—</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#000000', marginLeft: '6px' }}>Mbps</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#2D3436', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Ready to benchmark connection
              </div>

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginTop: '1rem' }}>
                <div style={{ background: '#FFFDF5', border: '2px solid #000000', boxShadow: '3px 3px 0 0 #000000', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#485460' }}>↓ Download</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000000' }}>—</div>
                </div>
                <div style={{ background: '#FFFDF5', border: '2px solid #000000', boxShadow: '3px 3px 0 0 #000000', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#485460' }}>↑ Upload</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000000' }}>—</div>
                </div>
                <div style={{ background: '#FFFDF5', border: '2px solid #000000', boxShadow: '3px 3px 0 0 #000000', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#485460' }}>Ping Latency</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000000' }}>—</div>
                </div>
                <div style={{ background: '#FFFDF5', border: '2px solid #000000', boxShadow: '3px 3px 0 0 #000000', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#485460' }}>Jitter</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000000' }}>—</div>
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                <Link href="/internet-speed" className="btn btn-primary" style={{
                  background: '#FFE033',
                  color: '#000000',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0 0 #000000',
                  padding: '12px',
                  fontWeight: 900,
                  textAlign: 'center',
                }}>
                  RUN FULL SPEED TEST →
                </Link>
                <Link href="/benchmark" className="btn btn-secondary" style={{
                  background: '#FFFFFF',
                  color: '#000000',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0 0 #000000',
                  padding: '10px',
                  fontWeight: 800,
                  textAlign: 'center',
                }}>
                  VIEW BENCHMARK HUB
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Why It Matters */}
          <div>
            <div className="section-label">WHY IT MATTERS</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              KNOW YOUR<br /><span style={{ background: '#74B9FF', padding: '0 6px', border: '2px solid #000' }}>CONNECTION</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Download Speed', color: '#74B9FF', desc: 'How fast data arrives to you — affects streaming, website rendering, and large game updates.' },
                { label: 'Upload Speed',   color: '#55EFC4', desc: 'How fast you send data — critical for Twitch streaming, voice channels, and uploading files.' },
                { label: 'Ping / Latency', color: '#FF9F43', desc: 'Round-trip delay in ms. Sub-30ms gives you decisive competitive advantage in FPS matches.' },
                { label: 'Jitter',         color: '#A29BFE', desc: 'Variation in ping over time. High jitter causes rubberbanding and erratic input spikes.' },
                { label: 'Packet Loss',    color: '#FF6B6B', desc: 'Percentage of packets dropped by your ISP. Even 1% loss triggers stutters and missed hits.' },
              ].map(item => (
                <div key={item.label} style={{
                  background: '#FFFFFF',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0 0 #000000',
                  padding: '1rem 1.25rem',
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: item.color,
                    border: '2px solid #000000',
                    padding: '2px 8px',
                    fontWeight: 900,
                    fontSize: '0.82rem',
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem',
                    color: '#000000'
                  }}>{item.label}</div>
                  <div style={{ color: '#2D3436', fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.55 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. GEAR UP SECTION ── */}
      <section style={{
        marginBottom: '4rem',
        background: '#FFE033',
        border: '3px solid #000000',
        boxShadow: '6px 6px 0 0 #000000',
        padding: '3rem 2rem',
      }}>
        <div style={{
          display: 'inline-block',
          background: '#FFFFFF',
          border: '3px solid #000000',
          boxShadow: '3px 3px 0 0 #000000',
          padding: '4px 12px',
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: '0.85rem',
          marginBottom: '1rem',
        }}>GEAR UP</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 900, marginBottom: '0.5rem', color: '#000000' }}>TOP GAMING GEAR PICKS</h2>
        <p style={{ color: '#1E272E', fontWeight: 700, marginBottom: '2.5rem' }}>Top equipment verified by competitive gamers. Affiliate links support our free platform.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.5rem' }}>
          {gearItems.map(gear => (
            <a key={gear.name} href="#affiliate" className="card" style={{
              background: '#FFFFFF',
              border: '3px solid #000000',
              boxShadow: '5px 5px 0 0 #000000',
              textDecoration: 'none',
              color: '#000000',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{
                  display: 'inline-block',
                  background: '#FFE033',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 0 #000000',
                  padding: '2px 8px',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  marginBottom: '0.75rem',
                }}>{gear.category}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#636E72', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{gear.brand}</div>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{gear.name}</div>
                <p style={{ color: '#2D3436', fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '1rem' }}>{gear.desc}</p>
              </div>
              <div>
                <div style={{
                  display: 'inline-block',
                  background: '#55EFC4',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 0 #000000',
                  padding: '2px 8px',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem'
                }}>{gear.price}</div>
                <div style={{ fontSize: '0.7rem', color: '#636E72', fontWeight: 700, fontStyle: 'italic' }}>*Affiliate link — commission earned</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── 6. SEO ARTICLE SECTION — ACCORDION GUIDE ── */}
      <hr style={{ border: 0, borderTop: '3px solid #000000', margin: '3.5rem 0' }} />

      <section style={{ marginBottom: '4rem' }}>
        <div className="section-label">COMPLETE BENCHMARK GUIDE</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '0.5rem' }}>
          EVERYTHING YOU NEED TO KNOW ABOUT OUR TOOLS
        </h2>
        <p style={{ color: '#2D3436', fontWeight: 600, marginBottom: '2rem', maxWidth: '750px' }}>
          Detailed breakdowns of every tool — what it measures, why it matters, how to improve your score, and which gear actually helps.
        </p>

        {/* Quick jump filter buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
          {seoArticles.map(a => (
            <button
              key={a.to}
              onClick={() => {
                const el = document.getElementById(`seo-${a.to.replace('/', '')}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{
                padding: '0.45rem 1rem',
                border: '2px solid #000000',
                boxShadow: '3px 3px 0 0 #000000',
                background: '#FFFFFF',
                color: '#000000',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.1s ease',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '5px 5px 0 0 #000000';
                e.currentTarget.style.background = '#FFE033';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '3px 3px 0 0 #000000';
                e.currentTarget.style.background = '#FFFFFF';
              }}
            >
              {a.icon} {a.badge}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {seoArticles.map(article => {
            const isExpanded = expandedArticle === article.to;
            return (
              <article
                key={article.to}
                id={`seo-${article.to.replace('/', '')}`}
                style={{
                  background: '#FFFFFF',
                  border: '3px solid #000000',
                  boxShadow: isExpanded ? '7px 7px 0 0 #000000' : '5px 5px 0 0 #000000',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.15s ease',
                  scrollMarginTop: '80px',
                }}
              >
                <button
                  onClick={() => setExpandedArticle(isExpanded ? null : article.to)}
                  style={{
                    width: '100%',
                    background: isExpanded ? '#FFF6D6' : '#FFFFFF',
                    border: 'none',
                    borderBottom: isExpanded ? '3px solid #000000' : 'none',
                    cursor: 'pointer',
                    padding: '1.5rem 1.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.72rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        background: '#FFE033',
                        border: '2px solid #000000',
                        boxShadow: '2px 2px 0 0 #000000',
                        color: '#000000',
                      }}>{article.badge}</span>
                    </div>
                    <h3 style={{
                      color: '#000000',
                      fontFamily: "'Public Sans', 'Barlow Condensed', sans-serif",
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                      fontWeight: 900,
                      letterSpacing: '-0.01em',
                      textTransform: 'uppercase',
                      margin: 0,
                      lineHeight: 1.25,
                    }}>
                      {article.title}
                    </h3>
                  </div>

                  <div style={{
                    width: '34px', height: '34px', flexShrink: 0,
                    border: '2px solid #000000',
                    boxShadow: '2px 2px 0 0 #000000',
                    background: '#FFE033',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#000000',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    transition: 'transform 0.2s ease',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>
                    ▾
                  </div>
                </button>

                <div style={{ display: isExpanded ? 'block' : 'none', padding: '1.75rem' }}>
                  <div style={{ marginBottom: '1.75rem' }}>
                    {article.content.map((para, i) => (
                      <p
                        key={i}
                        style={{
                          color: '#2D3436',
                          fontWeight: 500,
                          lineHeight: 1.8,
                          fontSize: '0.98rem',
                          marginBottom: i < article.content.length - 1 ? '1rem' : '0',
                        }}
                        dangerouslySetInnerHTML={{ __html: para }}
                      />
                    ))}
                  </div>

                  <div style={{
                    background: '#FFFDF5',
                    border: '3px solid #000000',
                    boxShadow: '4px 4px 0 0 #000000',
                    padding: '1.5rem',
                    marginBottom: '1.75rem',
                  }}>
                    <h4 style={{
                      color: '#000000',
                      fontSize: '0.9rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: '1.25rem',
                      marginTop: 0,
                      borderBottom: '2px solid #000000',
                      paddingBottom: '4px',
                      display: 'inline-block'
                    }}>
                      FREQUENTLY ASKED QUESTIONS
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {article.faqs.map((faq, fi) => (
                        <div key={fi}>
                          <div style={{ color: '#000000', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.35rem' }}>
                            Q: {faq.q}
                          </div>
                          <div style={{
                            color: '#2D3436',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            lineHeight: 1.65,
                            paddingLeft: '0.85rem',
                            borderLeft: '3px solid #000000',
                          }}>
                            {faq.a}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={article.to}
                    className="btn btn-primary"
                    style={{
                      background: '#FFE033',
                      border: '3px solid #000000',
                      boxShadow: '4px 4px 0 0 #000000',
                      color: '#000000',
                      fontWeight: 900,
                      fontSize: '0.92rem',
                    }}
                  >
                    LAUNCH {article.badge} TOOL →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

    </div>
  );
}
