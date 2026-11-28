// ─── FixedAim i18n ──────────────────────────────────────────────────────────
// Add a new language: add its code to Lang, add an entry to LANGS, and add a
// matching dictionary in translations (TypeScript enforces full coverage).
// ─────────────────────────────────────────────────────────────────────────────

export type Lang =
  | 'en'
  | 'es'
  | 'pt'
  | 'de'
  | 'fr'
  | 'ja'
  | 'id'
  | 'ru'
  | 'ar'
  | 'ko';

export interface LangMeta {
  code: Lang;
  label: string;
  flag: string;
  nativeLabel: string;
}

export const LANGS: LangMeta[] = [
  { code: 'en', label: 'English',    flag: '🇺🇸', nativeLabel: 'English' },
  { code: 'es', label: 'Spanish',    flag: '🇪🇸', nativeLabel: 'Español' },
  { code: 'pt', label: 'Portuguese', flag: '🇧🇷', nativeLabel: 'Português' },
  { code: 'de', label: 'German',     flag: '🇩🇪', nativeLabel: 'Deutsch' },
  { code: 'fr', label: 'French',     flag: '🇫🇷', nativeLabel: 'Français' },
  { code: 'ja', label: 'Japanese',   flag: '🇯🇵', nativeLabel: '日本語' },
  { code: 'id', label: 'Indonesian', flag: '🇮🇩', nativeLabel: 'Indonesia' },
  { code: 'ru', label: 'Russian',    flag: '🇷🇺', nativeLabel: 'Русский' },
  { code: 'ar', label: 'Arabic',     flag: '🇸🇦', nativeLabel: 'العربية' },
  { code: 'ko', label: 'Korean',     flag: '🇰🇷', nativeLabel: '한국어' },
];

export const NON_DEFAULT_LANGS: Lang[] = ['es', 'pt', 'de', 'fr', 'ja', 'id', 'ru', 'ar', 'ko'];

export function getLangFromPathname(pathname: string | null | undefined): Lang {
  if (!pathname) return 'en';
  const seg = pathname.split('/')[1] as Lang | undefined;
  if (seg && seg !== 'en' && (NON_DEFAULT_LANGS as string[]).includes(seg)) {
    return seg;
  }
  return 'en';
}

export function stripLocale(pathname: string | null | undefined): string {
  if (!pathname) return '/';
  const parts = pathname.split('/');
  const seg = parts[1] as Lang | undefined;
  if (seg && (seg === 'en' || (NON_DEFAULT_LANGS as string[]).includes(seg))) {
    const rest = '/' + parts.slice(2).join('/');
    return rest === '' ? '/' : rest;
  }
  return pathname;
}

export function withLangPath(path: string, lang: Lang): string {
  const clean = stripLocale(path.startsWith('/') ? path : `/${path}`);
  if (lang === 'en') return clean;
  return clean === '/' ? `/${lang}` : `/${lang}${clean}`;
}

export interface TranslationDict {
  nav: {
    home: string;
    keyboard: string;
    mouse: string;
    aim: string;
    benchmark: string;
    games: string;
    blog: string;
    device: string;
  };
  sidebar: {
    allTools: string;
    filterAll: string;
    filterMouse: string;
    filterKeyboard: string;
    filterAim: string;
    filterBenchmark: string;
    filterGames: string;
    filterMisc: string;
  };
  hero: {
    badge: string;
    h1Line1: string;
    h1Line2: string;
    h1Line3: string;
    desc: string;
    ctaCps: string;
    ctaTyping: string;
    ctaTools: string;
  };
  footer: {
    tagline: string;
    rights: string;
    builtFor: string;
    privacy: string;
    terms: string;
    contact: string;
  };
  hubs: {
    keyboard:  { h1: string; sub: string };
    mouse:     { h1: string; sub: string };
    aim:       { h1: string; sub: string };
    games:     { h1: string; sub: string };
    benchmark: { h1: string; sub: string };
    device:    { h1: string; sub: string };
  };
}

export type T = TranslationDict;

export const translations: Record<Lang, TranslationDict> = {
  en: {
    nav: {
      home:      'Home',
      keyboard:  'Keyboard',
      mouse:     'Mouse',
      aim:       'Aim & Reaction',
      benchmark: 'Benchmark',
      games:     'Games',
      blog:      'Blog',
      device:    'Device Test',
    },
    sidebar: {
      allTools:        '🛠️ ALL TOOLS',
      filterAll:       '⚡ ALL TOOLS (17)',
      filterMouse:     '🖱️ MOUSE TOOLS',
      filterKeyboard:  '⌨️ KEYBOARD TOOLS',
      filterAim:       '🎯 AIM & REACTION',
      filterBenchmark: '🌐 BENCHMARKS',
      filterGames:     '🎮 ARCADE GAMES',
      filterMisc:      '📝 OTHER SECTIONS',
    },
    hero: {
      badge:     'EST. 2026 // FIXED AIM 2.0',
      h1Line1:   'FREE CPS TEST,',
      h1Line2:   'TYPING SPEED TEST',
      h1Line3:   '& AIM TRAINER',
      desc:      'The definitive gaming benchmark platform that refuses to be invisible. 22 high-precision tools. Zero sign-up. Pure raw performance.',
      ctaCps:    '⚡ START CPS TEST',
      ctaTyping: '⌨️ TYPING SPEED',
      ctaTools:  'VIEW ALL 22 TOOLS ↓',
    },
    footer: {
      tagline:  'The ultimate free platform for competitive gamers and typists to test, train, and dominate. Zero signup required.',
      rights:   'All rights reserved.',
      builtFor: 'Built for gamers, by gamers. ⚡',
      privacy:  'Privacy Policy',
      terms:    'Terms of Service',
      contact:  'Contact',
    },
    hubs: {
      keyboard:  { h1: 'Keyboard Tools', sub: 'Master your typing speed, accuracy, and keyboard skills' },
      mouse:     { h1: 'Mouse Tools', sub: 'Test and measure every aspect of your mouse performance' },
      aim:       { h1: 'Aim & Reaction', sub: 'Sharpen your reflexes and precision for competitive gaming' },
      games:     { h1: 'Arcade Games', sub: 'Challenge yourself with reflex and skill-based arcade games' },
      benchmark: { h1: 'Benchmark Hub', sub: 'Benchmark your network speed, ping latency, jitter, audio, screen, and cognitive memory with real-time analytics.' },
      device:    { h1: 'Device & Hardware Diagnostics', sub: 'Test, benchmark, and calibrate your monitor refresh rate, screen pixels, audio channels, network, keyboard, and mouse online without downloading any software.' },
    },
  },

  es: {
    nav: {
      home:      'Inicio',
      keyboard:  'Teclado',
      mouse:     'Ratón',
      aim:       'Puntería',
      benchmark: 'Rendimiento',
      games:     'Juegos',
      blog:      'Blog',
      device:    'Dispositivo',
    },
    sidebar: {
      allTools:        '🛠️ HERRAMIENTAS',
      filterAll:       '⚡ TODAS (17)',
      filterMouse:     '🖱️ RATÓN',
      filterKeyboard:  '⌨️ TECLADO',
      filterAim:       '🎯 PUNTERÍA',
      filterBenchmark: '🌐 RENDIMIENTO',
      filterGames:     '🎮 JUEGOS',
      filterMisc:      '📝 OTRAS SECCIONES',
    },
    hero: {
      badge:     'EST. 2026 // FIXED AIM 2.0',
      h1Line1:   'TEST DE CPS GRATIS,',
      h1Line2:   'VELOCIDAD DE ESCRITURA',
      h1Line3:   'Y ENTRENADOR DE PUNTERÍA',
      desc:      'La plataforma definitiva de rendimiento gaming que se niega a ser invisible. 22 herramientas de alta precisión. Sin registro. Puro rendimiento.',
      ctaCps:    '⚡ INICIAR TEST CPS',
      ctaTyping: '⌨️ VELOCIDAD ESCRITURA',
      ctaTools:  'VER LAS 22 HERRAMIENTAS ↓',
    },
    footer: {
      tagline:  'La plataforma gratuita definitiva para gamers competitivos y mecanógrafos para probar, entrenar y dominar. Sin registro.',
      rights:   'Todos los derechos reservados.',
      builtFor: 'Hecho para gamers, por gamers. ⚡',
      privacy:  'Política de Privacidad',
      terms:    'Términos de Servicio',
      contact:  'Contacto',
    },
    hubs: {
      keyboard:  { h1: 'Herramientas de Teclado', sub: 'Domina tu velocidad de escritura, precisión y habilidades de teclado' },
      mouse:     { h1: 'Herramientas de Ratón', sub: 'Prueba y mide cada aspecto del rendimiento de tu ratón' },
      aim:       { h1: 'Puntería y Reacción', sub: 'Afina tus reflejos y precisión para el gaming competitivo' },
      games:     { h1: 'Juegos Arcade', sub: 'Desafíate con juegos arcade basados en reflejos y habilidad' },
      benchmark: { h1: 'Centro de Rendimiento', sub: 'Evalúa la velocidad de red, latencia ping, jitter, audio, pantalla y memoria cognitiva en tiempo real.' },
      device:    { h1: 'Diagnóstico de Dispositivos', sub: 'Prueba y calibra los Hz de tu monitor, píxeles, canales de audio, red, teclado y ratón online sin descargar nada.' },
    },
  },

  pt: {
    nav: {
      home:      'Início',
      keyboard:  'Teclado',
      mouse:     'Mouse',
      aim:       'Mira',
      benchmark: 'Benchmark',
      games:     'Jogos',
      blog:      'Blog',
      device:    'Dispositivo',
    },
    sidebar: {
      allTools:        '🛠️ FERRAMENTAS',
      filterAll:       '⚡ TODAS (17)',
      filterMouse:     '🖱️ MOUSE',
      filterKeyboard:  '⌨️ TECLADO',
      filterAim:       '🎯 MIRA E REAÇÃO',
      filterBenchmark: '🌐 BENCHMARKS',
      filterGames:     '🎮 JOGOS ARCADE',
      filterMisc:      '📝 OUTRAS SEÇÕES',
    },
    hero: {
      badge:     'EST. 2026 // FIXED AIM 2.0',
      h1Line1:   'TESTE DE CPS GRÁTIS,',
      h1Line2:   'VELOCIDADE DE DIGITAÇÃO',
      h1Line3:   'E TREINO DE MIRA',
      desc:      'A plataforma definitiva de benchmark gamer que se recusa a ser invisível. 22 ferramentas de alta precisão. Sem cadastro. Desempenho puro.',
      ctaCps:    '⚡ INICIAR TESTE CPS',
      ctaTyping: '⌨️ TESTE DE DIGITAÇÃO',
      ctaTools:  'VER TODAS AS 22 FERRAMENTAS ↓',
    },
    footer: {
      tagline:  'A plataforma gratuita definitiva para gamers competitivos e digitadores testarem, treinarem e dominarem. Sem cadastro.',
      rights:   'Todos os direitos reservados.',
      builtFor: 'Feito para gamers, por gamers. ⚡',
      privacy:  'Política de Privacidade',
      terms:    'Termos de Serviço',
      contact:  'Contato',
    },
    hubs: {
      keyboard:  { h1: 'Ferramentas de Teclado', sub: 'Domine sua velocidade de digitação, precisão e habilidades no teclado' },
      mouse:     { h1: 'Ferramentas de Mouse', sub: 'Teste e meça cada aspecto do desempenho do seu mouse' },
      aim:       { h1: 'Mira e Reação', sub: 'Aprimore seus reflexos e precisão para jogos competitivos' },
      games:     { h1: 'Jogos Arcade', sub: 'Desafie-se com jogos arcade de reflexo e habilidade' },
      benchmark: { h1: 'Central de Benchmark', sub: 'Avalie velocidade de rede, latência ping, jitter, áudio, tela e memória em tempo real.' },
      device:    { h1: 'Diagnóstico de Dispositivos', sub: 'Teste e calibre a taxa de atualização (Hz), pixels, áudio, rede, teclado e mouse online sem baixar software.' },
    },
  },

  de: {
    nav: {
      home:      'Start',
      keyboard:  'Tastatur',
      mouse:     'Maus',
      aim:       'Aim & Reaktion',
      benchmark: 'Benchmark',
      games:     'Spiele',
      blog:      'Blog',
      device:    'Gerätetest',
    },
    sidebar: {
      allTools:        '🛠️ ALLE TOOLS',
      filterAll:       '⚡ ALLE TOOLS (17)',
      filterMouse:     '🖱️ MAUS-TOOLS',
      filterKeyboard:  '⌨️ TASTATUR-TOOLS',
      filterAim:       '🎯 AIM & REAKTION',
      filterBenchmark: '🌐 BENCHMARKS',
      filterGames:     '🎮 ARCADE-SPIELE',
      filterMisc:      '📝 WEITERE',
    },
    hero: {
      badge:     'EST. 2026 // FIXED AIM 2.0',
      h1Line1:   'KOSTENLOSER CPS-TEST,',
      h1Line2:   'TIPPGESCHWINDIGKEIT',
      h1Line3:   '& AIM-TRAINER',
      desc:      'Die ultimative Gaming-Benchmark-Plattform. 22 hochpräzise Tools. Keine Anmeldung erforderlich. Pure Leistung.',
      ctaCps:    '⚡ CPS-TEST STARTEN',
      ctaTyping: '⌨️ TIPPTEST STARTEN',
      ctaTools:  'ALLE 22 TOOLS ANSEHEN ↓',
    },
    footer: {
      tagline:  'Die ultimative kostenlose Plattform für kompetitive Gamer und Schnellschreiber zum Testen, Trainieren und Dominieren.',
      rights:   'Alle Rechte vorbehalten.',
      builtFor: 'Von Gamern für Gamer entwickelt. ⚡',
      privacy:  'Datenschutz',
      terms:    'Nutzungsbedingungen',
      contact:  'Kontakt',
    },
    hubs: {
      keyboard:  { h1: 'Tastatur-Tools', sub: 'Meistere deine Tippgeschwindigkeit, Genauigkeit und Tastatur-Skills' },
      mouse:     { h1: 'Maus-Tools', sub: 'Teste und miss jeden Aspekt deiner Mausleistung' },
      aim:       { h1: 'Aim & Reaktion', sub: 'Schärfe deine Reflexe und Präzision für kompetitives Gaming' },
      games:     { h1: 'Arcade-Spiele', sub: 'Fordere dich mit reaktionsschnellen Arcade-Spielen heraus' },
      benchmark: { h1: 'Benchmark-Hub', sub: 'Teste Netzwerkgeschwindigkeit, Ping-Latenz, Jitter, Audio, Bildschirm und Gedächtnis in Echtzeit.' },
      device:    { h1: 'Geräte- & Hardware-Diagnose', sub: 'Teste Monitor-Hz, Pixelfehler, Audiokanäle, Internet, Tastatur und Maus direkt online ohne Software.' },
    },
  },

  fr: {
    nav: {
      home:      'Accueil',
      keyboard:  'Clavier',
      mouse:     'Souris',
      aim:       'Visée',
      benchmark: 'Benchmark',
      games:     'Jeux',
      blog:      'Blog',
      device:    'Appareil',
    },
    sidebar: {
      allTools:        '🛠️ TOUS LES OUTILS',
      filterAll:       '⚡ TOUS (17)',
      filterMouse:     '🖱️ SOURIS',
      filterKeyboard:  '⌨️ CLAVIER',
      filterAim:       '🎯 VISÉE & RÉFLEXE',
      filterBenchmark: '🌐 BENCHMARKS',
      filterGames:     '🎮 JEUX ARCADE',
      filterMisc:      '📝 AUTRES',
    },
    hero: {
      badge:     'EST. 2026 // FIXED AIM 2.0',
      h1Line1:   'TEST CPS GRATUIT,',
      h1Line2:   'VITESSE DE FRAPPE',
      h1Line3:   '& ENTRAÎNEUR DE VISÉE',
      desc:      'La plateforme de benchmark gaming ultime. 22 outils de haute précision. Sans inscription. Performance brute.',
      ctaCps:    '⚡ LANCER TEST CPS',
      ctaTyping: '⌨️ VITESSE DE FRAPPE',
      ctaTools:  'VOIR LES 22 OUTILS ↓',
    },
    footer: {
      tagline:  'La plateforme gratuite ultime pour les joueurs compétitifs pour tester, s’entraîner et dominer. Sans inscription.',
      rights:   'Tous droits réservés.',
      builtFor: 'Conçu pour les gamers, par des gamers. ⚡',
      privacy:  'Confidentialité',
      terms:    'Conditions d’utilisation',
      contact:  'Contact',
    },
    hubs: {
      keyboard:  { h1: 'Outils Clavier', sub: 'Maîtrisez votre vitesse de frappe, votre précision et votre clavier' },
      mouse:     { h1: 'Outils Souris', sub: 'Testez et mesurez chaque aspect des performances de votre souris' },
      aim:       { h1: 'Visée & Réaction', sub: 'Affûtez vos réflexes et votre précision pour le jeu compétitif' },
      games:     { h1: 'Jeux Arcade', sub: 'Relevez le défi avec des jeux d’arcade basés sur les réflexes' },
      benchmark: { h1: 'Hub Benchmark', sub: 'Évaluez votre débit internet, latence ping, audio, écran et mémoire en temps réel.' },
      device:    { h1: 'Diagnostics Matériel', sub: 'Testez la fréquence Hz, pixels morts, audio, réseau, clavier et souris en ligne sans téléchargement.' },
    },
  },

  ja: {
    nav: {
      home:      'ホーム',
      keyboard:  'キーボード',
      mouse:     'マウス',
      aim:       'エイム',
      benchmark: 'ベンチマーク',
      games:     'ゲーム',
      blog:      'ブログ',
      device:    'デバイステスト',
    },
    sidebar: {
      allTools:        '🛠️ 全ツール',
      filterAll:       '⚡ 全ツール (17)',
      filterMouse:     '🖱️ マウスツール',
      filterKeyboard:  '⌨️ キーボードツール',
      filterAim:       '🎯 エイム・反応速度',
      filterBenchmark: '🌐 ベンチマーク',
      filterGames:     '🎮 アーケードゲーム',
      filterMisc:      '📝 その他',
    },
    hero: {
      badge:     'EST. 2026 // FIXED AIM 2.0',
      h1Line1:   '無料CPSテスト・',
      h1Line2:   'タイピング速度テスト',
      h1Line3:   '＆エイムトレーナー',
      desc:      'ゲーマーのための究極のベンチマークプラットフォーム。22種類の高精度ツール。登録不要。純粋なパフォーマンスを計測。',
      ctaCps:    '⚡ CPSテスト開始',
      ctaTyping: '⌨️ タイピング測定',
      ctaTools:  '全22ツールを見る ↓',
    },
    footer: {
      tagline:  '競技ゲーマーやタイピストが反射神経・正確性・速度をテストし鍛えるための究極の無料プラットフォーム。登録不要。',
      rights:   'All rights reserved.',
      builtFor: 'ゲーマーによる、ゲーマーのためのツール。⚡',
      privacy:  'プライバシーポリシー',
      terms:    '利用規約',
      contact:  'お問い合わせ',
    },
    hubs: {
      keyboard:  { h1: 'キーボードツール', sub: 'タイピング速度・正確性・キースキルを極めよう' },
      mouse:     { h1: 'マウスツール', sub: 'クリック速度や精度などマウスのあらゆる性能を測定' },
      aim:       { h1: 'エイム＆反応速度', sub: '競技ゲームに向けた反射神経とエイム精度を鍛える' },
      games:     { h1: 'アーケードゲーム', sub: '反射神経とスキルが試されるアーケードゲームに挑戦' },
      benchmark: { h1: 'ベンチマークハブ', sub: '回線速度・Ping遅延・オーディオ・モニター・記憶力をリアルタイムで計測。' },
      device:    { h1: 'デバイス＆ハードウェア診断', sub: 'モニターHz、ドット抜け、スピーカー、回線、キーボード、マウスをソフト不要でオンライン診断。' },
    },
  },

  id: {
    nav: {
      home:      'Beranda',
      keyboard:  'Keyboard',
      mouse:     'Mouse',
      aim:       'Aim & Reaksi',
      benchmark: 'Benchmark',
      games:     'Game',
      blog:      'Blog',
      device:    'Tes Perangkat',
    },
    sidebar: {
      allTools:        '🛠️ SEMUA ALAT',
      filterAll:       '⚡ SEMUA ALAT (17)',
      filterMouse:     '🖱️ ALAT MOUSE',
      filterKeyboard:  '⌨️ ALAT KEYBOARD',
      filterAim:       '🎯 AIM & REAKSI',
      filterBenchmark: '🌐 BENCHMARK',
      filterGames:     '🎮 GAME ARCADE',
      filterMisc:      '📝 LAINNYA',
    },
    hero: {
      badge:     'EST. 2026 // FIXED AIM 2.0',
      h1Line1:   'TES CPS GRATIS,',
      h1Line2:   'TES KECEPATAN MENGETIK',
      h1Line3:   '& PELATIH AIM',
      desc:      'Platform benchmark gaming terbaik. 22 alat presisi tinggi. Tanpa daftar. Performa murni tanpa batas.',
      ctaCps:    '⚡ MULAI TES CPS',
      ctaTyping: '⌨️ TES MENGETIK',
      ctaTools:  'LIHAT 22 ALAT ↓',
    },
    footer: {
      tagline:  'Platform gratis terbaik untuk gamer kompetitif dan pengetik untuk menguji, melatih, dan mendominasi. Tanpa daftar.',
      rights:   'Hak cipta dilindungi.',
      builtFor: 'Dibuat untuk gamer, oleh gamer. ⚡',
      privacy:  'Kebijakan Privasi',
      terms:    'Syarat Layanan',
      contact:  'Kontak',
    },
    hubs: {
      keyboard:  { h1: 'Alat Keyboard', sub: 'Kuasai kecepatan mengetik, akurasi, dan skill keyboard Anda' },
      mouse:     { h1: 'Alat Mouse', sub: 'Uji dan ukur setiap aspek performa mouse Anda' },
      aim:       { h1: 'Aim & Reaksi', sub: 'Asah refleks dan presisi Anda untuk gaming kompetitif' },
      games:     { h1: 'Game Arcade', sub: 'Tantang diri Anda dengan game arcade berbasis refleks dan skill' },
      benchmark: { h1: 'Pusat Benchmark', sub: 'Uji kecepatan internet, latensi ping, audio, layar, dan memori secara real-time.' },
      device:    { h1: 'Diagnostik Perangkat', sub: 'Uji refresh rate monitor (Hz), dead pixel, audio, jaringan, keyboard, dan mouse online tanpa instalasi.' },
    },
  },

  ru: {
    nav: {
      home:      'Главная',
      keyboard:  'Клавиатура',
      mouse:     'Мышь',
      aim:       'Аим',
      benchmark: 'Бенчмарк',
      games:     'Игры',
      blog:      'Блог',
      device:    'Устройства',
    },
    sidebar: {
      allTools:        '🛠️ ВСЕ ИНСТРУМЕНТЫ',
      filterAll:       '⚡ ВСЕ (17)',
      filterMouse:     '🖱️ МЫШЬ',
      filterKeyboard:  '⌨️ КЛАВИАТУРА',
      filterAim:       '🎯 АИМ И РЕАКЦИЯ',
      filterBenchmark: '🌐 БЕНЧМАРКИ',
      filterGames:     '🎮 АРКАДЫ',
      filterMisc:      '📝 ПРОЧЕЕ',
    },
    hero: {
      badge:     'EST. 2026 // FIXED AIM 2.0',
      h1Line1:   'БЕСПЛАТНЫЙ CPS ТЕСТ,',
      h1Line2:   'ТЕСТ СКОРОСТИ ПЕЧАТИ',
      h1Line3:   'И АИМ ТРЕНАЖЁР',
      desc:      'Лучшая платформа для игрового тестирования. 22 высокоточных инструмента. Без регистрации. Чистая производительность.',
      ctaCps:    '⚡ НАЧАТЬ CPS ТЕСТ',
      ctaTyping: '⌨️ СКОРОСТЬ ПЕЧАТИ',
      ctaTools:  'ВСЕ 22 ИНСТРУМЕНТА ↓',
    },
    footer: {
      tagline:  'Лучшая бесплатная платформа для киберспортсменов: тестируйте реакцию, точность и скорость без регистрации.',
      rights:   'Все права защищены.',
      builtFor: 'Создано геймерами для геймеров. ⚡',
      privacy:  'Конфиденциальность',
      terms:    'Условия использования',
      contact:  'Контакты',
    },
    hubs: {
      keyboard:  { h1: 'Инструменты клавиатуры', sub: 'Совершенствуйте скорость печати, точность и владение клавиатурой' },
      mouse:     { h1: 'Инструменты мыши', sub: 'Проверьте и измерьте все параметры вашей игровой мыши' },
      aim:       { h1: 'Аим и Реакция', sub: 'Оттачивайте рефлексы и точность для соревновательных игр' },
      games:     { h1: 'Аркадные игры', sub: 'Испытайте себя в аркадных играх на реакцию и ловкость' },
      benchmark: { h1: 'Центр бенчмарков', sub: 'Проверьте скорость интернета, пинг, звук, экран и память в реальном времени.' },
      device:    { h1: 'Диагностика устройств', sub: 'Проверьте герцовку монитора (Hz), битые пиксели, звук, сеть, клавиатуру и мышь онлайн без скачивания.' },
    },
  },

  ar: {
    nav: {
      home:      'الرئيسية',
      keyboard:  'لوحة المفاتيح',
      mouse:     'الفأرة',
      aim:       'التصويب',
      benchmark: 'الأداء',
      games:     'الألعاب',
      blog:      'المدونة',
      device:    'فحص الجهاز',
    },
    sidebar: {
      allTools:        '🛠️ جميع الأدوات',
      filterAll:       '⚡ الكل (17)',
      filterMouse:     '🖱️ أدوات الفأرة',
      filterKeyboard:  '⌨️ لوحة المفاتيح',
      filterAim:       '🎯 التصويب ورد الفعل',
      filterBenchmark: '🌐 قياس الأداء',
      filterGames:     '🎮 ألعاب الأركيد',
      filterMisc:      '📝 أقسام أخرى',
    },
    hero: {
      badge:     'EST. 2026 // FIXED AIM 2.0',
      h1Line1:   'اختبار CPS مجاني،',
      h1Line2:   'اختبار سرعة الكتابة',
      h1Line3:   'ومدرب التصويب',
      desc:      'المنصة المثالية لقياس أداء الألعاب. 22 أداة عالية الدقة. بدون تسجيل. أداء حقيقي فوري.',
      ctaCps:    '⚡ ابدأ اختبار CPS',
      ctaTyping: '⌨️ سرعة الكتابة',
      ctaTools:  'عرض جميع الأدوات الـ 22 ↓',
    },
    footer: {
      tagline:  'المنصة المجانية الأفضل للاعبين التنافسيين لاختبار ردود الفعل والدقة والسرعة بدون تسجيل.',
      rights:   'جميع الحقوق محفوظة.',
      builtFor: 'صُمم للاعبين، بواسطة لاعبين. ⚡',
      privacy:  'سياسة الخصوصية',
      terms:    'شروط الخدمة',
      contact:  'اتصل بنا',
    },
    hubs: {
      keyboard:  { h1: 'أدوات لوحة المفاتيح', sub: 'أتقن سرعة الكتابة والدقة ومهارات لوحة المفاتيح' },
      mouse:     { h1: 'أدوات الفأرة', sub: 'اختبر وقس كل جانب من جوانب أداء الفأرة' },
      aim:       { h1: 'التصويب ورد الفعل', sub: 'اشحذ ردود أفعالك ودقتك للألعاب التنافسية' },
      games:     { h1: 'ألعاب الأركيد', sub: 'تحدَّ نفسك بألعاب الأركيد المعتمدة على السرعة والمهارة' },
      benchmark: { h1: 'مركز قياس الأداء', sub: 'قس سرعة الإنترنت وزمن الاستجابة والصوت والشاشة والذاكرة في الوقت الفعلي.' },
      device:    { h1: 'تشخيص الجهاز والعتاد', sub: 'اختبر معدل تحديث الشاشة (Hz) والبكسلات الميتة والصوت والشبكة ولوحة المفاتيح والفأرة أونلاين.' },
    },
  },

  ko: {
    nav: {
      home:      '홈',
      keyboard:  '키보드',
      mouse:     '마우스',
      aim:       '에임·반응',
      benchmark: '벤치마크',
      games:     '게임',
      blog:      '블로그',
      device:    '장치 테스트',
    },
    sidebar: {
      allTools:        '🛠️ 모든 도구',
      filterAll:       '⚡ 전체 (17)',
      filterMouse:     '🖱️ 마우스 도구',
      filterKeyboard:  '⌨️ 키보드 도구',
      filterAim:       '🎯 에임 및 반응속도',
      filterBenchmark: '🌐 벤치마크',
      filterGames:     '🎮 아케이드 게임',
      filterMisc:      '📝 기타',
    },
    hero: {
      badge:     'EST. 2026 // FIXED AIM 2.0',
      h1Line1:   '무료 CPS 테스트,',
      h1Line2:   '타자 속도 테스트',
      h1Line3:   '& 에임 트레이너',
      desc:      '최고의 게이밍 벤치마크 플랫폼. 22가지 고정밀 도구. 회원가입 불필요. 순수한 퍼포먼스 측정.',
      ctaCps:    '⚡ CPS 테스트 시작',
      ctaTyping: '⌨️ 타자 속도 테스트',
      ctaTools:  '22개 도구 모두 보기 ↓',
    },
    footer: {
      tagline:  '경쟁 게이머와 타이피스트가 반응속도, 정확도, 스피드를 테스트하고 훈련할 수 있는 최고의 무료 플랫폼.',
      rights:   'All rights reserved.',
      builtFor: '게이머를 위해 게이머가 만들었습니다. ⚡',
      privacy:  '개인정보 처리방침',
      terms:    '이용약관',
      contact:  '문의하기',
    },
    hubs: {
      keyboard:  { h1: '키보드 도구', sub: '타자 속도, 정확도, 키보드 실력을 마스터하세요' },
      mouse:     { h1: '마우스 도구', sub: '마우스 성능의 모든 요소를 테스트하고 측정하세요' },
      aim:       { h1: '에임 및 반응속도', sub: '경쟁 게임을 위한 반응속도와 정밀도를 날카롭게 다듬으세요' },
      games:     { h1: '아케이드 게임', sub: '반응속도와 실력이 필요한 아케이드 게임에 도전하세요' },
      benchmark: { h1: '벤치마크 허브', sub: '네트워크 속도, 핑 지연, 오디오, 화면, 기억력을 실시간으로 측정하세요.' },
      device:    { h1: '장치 및 하드웨어 진단', sub: '모니터 주사율(Hz), 불량 화소, 스피커, 인터넷, 키보드, 마우스를 설치 없이 온라인으로 테스트하세요.' },
    },
  },
};
