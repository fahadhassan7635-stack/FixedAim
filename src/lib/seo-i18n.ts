import type { Metadata } from 'next';
import { NON_DEFAULT_LANGS, withLangPath, type Lang } from './i18n';
import {
  TOOL_EDITORIAL_META,
  TOOL_EDITORIAL_ROUTE_PATHS,
  type ToolAndEditorialRouteKey,
  type RouteMeta,
} from './seo-i18n-tools';

export const SITE_URL = 'https://fixedaim.com';

export const ALL_LANGS: Lang[] = ['en', ...NON_DEFAULT_LANGS];

export const OG_LOCALES: Record<Lang, string> = {
  en: 'en_US',
  es: 'es_ES',
  pt: 'pt_BR',
  de: 'de_DE',
  fr: 'fr_FR',
  ja: 'ja_JP',
  id: 'id_ID',
  ru: 'ru_RU',
  ar: 'ar_SA',
  ko: 'ko_KR',
};

export type Phase2RouteKey =
  | 'home'
  | 'keyboard'
  | 'mouse'
  | 'aim'
  | 'games'
  | 'benchmark'
  | 'device';

export type RouteKey = Phase2RouteKey | ToolAndEditorialRouteKey;

export const PHASE2_ROUTE_PATHS: Record<Phase2RouteKey, string> = {
  home: '/',
  keyboard: '/keyboard',
  mouse: '/mouse',
  aim: '/aim',
  games: '/games',
  benchmark: '/benchmark',
  device: '/device',
};

export const ALL_ROUTE_PATHS: Record<RouteKey, string> = {
  ...PHASE2_ROUTE_PATHS,
  ...TOOL_EDITORIAL_ROUTE_PATHS,
};

export const LOCALIZED_META: Record<Phase2RouteKey, Record<Lang, RouteMeta>> = {
  home: {
    en: {
      title: 'FixedAim - Free CPS Test, Aim Trainer & Typing Speed Test Online',
      description:
        'The ultimate free platform to test clicking speed, typing WPM, reaction time, and aim precision. No signup needed. Play, test, and improve instantly.',
    },
    es: {
      title: 'FixedAim - Test de CPS Gratis, Aim Trainer y Test de Velocidad de Escritura',
      description:
        'La plataforma gratuita definitiva para probar tu CPS, velocidad de escritura WPM, tiempo de reacción y puntería. Sin registro. Juega y mejora al instante.',
    },
    pt: {
      title: 'FixedAim - Teste de CPS Grátis, Aim Trainer e Teste de Digitação Online',
      description:
        'A plataforma gratuita definitiva para testar velocidade de cliques (CPS), digitação WPM, tempo de reação e precisão de mira. Sem cadastro.',
    },
    de: {
      title: 'FixedAim - Kostenloser CPS Test, Aim Trainer & Tippgeschwindigkeitstest',
      description:
        'Die kostenlose Plattform für CPS Test, Typing WPM, Reaktionszeit und Aim-Präzision. Keine Anmeldung nötig. Sofort im Browser testen und verbessern.',
    },
    fr: {
      title: 'FixedAim - Test CPS Gratuit, Aim Trainer et Test de Vitesse de Frappe',
      description:
        'La plateforme gratuite ultime pour tester votre CPS, vitesse de frappe WPM, temps de réaction et précision de visée. Sans inscription.',
    },
    ja: {
      title: 'FixedAim - 無料CPSテスト・エイムトレーナー・タイピング速度テスト',
      description:
        'クリック速度（CPS）、タイピングWPM、反応速度、エイム精度を無料で測定できる究極のブラウザプラットフォーム。登録不要で今すぐプレイ。',
    },
    id: {
      title: 'FixedAim - Tes CPS Gratis, Aim Trainer & Tes Kecepatan Mengetik Online',
      description:
        'Platform gratis terbaik untuk menguji kecepatan klik (CPS), mengetik WPM, waktu reaksi, dan akurasi aim. Tanpa daftar, langsung main di browser.',
    },
    ru: {
      title: 'FixedAim - Бесплатный CPS Тест, Аим Тренажёр и Тест Скорости Печати',
      description:
        'Бесплатная платформа для проверки скорости кликов (CPS), печати WPM, времени реакции и точности аима. Без регистрации, прямо в браузере.',
    },
    ar: {
      title: 'FixedAim - اختبار CPS مجاني ومدرب التصويب واختبار سرعة الكتابة',
      description:
        'المنصة المجانية الأفضل لاختبار سرعة النقر (CPS)، سرعة الكتابة WPM، وقت رد الفعل، ودقة التصويب. بدون تسجيل، العب وحسّن أداءك فوراً.',
    },
    ko: {
      title: 'FixedAim - 무료 CPS 테스트, 에임 트레이너 & 타자 속도 테스트',
      description:
        '클릭 속도(CPS), 타자 WPM, 반응속도, 에임 정밀도를 무료로 측정하는 최고의 게이밍 플랫폼. 회원가입 없이 브라우저에서 바로 테스트하세요.',
    },
  },

  keyboard: {
    en: {
      title: 'Keyboard Testing Tools - WPM, NKRO & Accuracy | FixedAim',
      description:
        'Test and benchmark your keyboard performance online. Free typing speed tests, N-Key Rollover ghosting detector, spacebar counter, and accuracy drills.',
    },
    es: {
      title: 'Herramientas de Teclado - WPM, NKRO y Precisión | FixedAim',
      description:
        'Prueba y evalúa el rendimiento de tu teclado online. Tests de velocidad WPM, detector N-Key Rollover (NKRO), contador de barra espaciadora y precisión.',
    },
    pt: {
      title: 'Ferramentas de Teclado - WPM, NKRO e Precisão | FixedAim',
      description:
        'Teste e avalie o desempenho do seu teclado online. Testes de digitação WPM, detector N-Key Rollover (NKRO), contador de espaço e treinos de precisão.',
    },
    de: {
      title: 'Tastatur-Test-Tools - WPM, NKRO & Genauigkeit | FixedAim',
      description:
        'Teste deine Tastatur online. Kostenlose WPM-Tipptests, N-Key Rollover (NKRO) Ghosting-Detektor, Leertasten-Zähler und Genauigkeitsübungen.',
    },
    fr: {
      title: 'Outils de Test Clavier - WPM, NKRO & Précision | FixedAim',
      description:
        'Testez les performances de votre clavier en ligne. Tests de frappe WPM gratuits, détecteur N-Key Rollover (NKRO), compteur espace et précision.',
    },
    ja: {
      title: 'キーボードテストツール - WPM・NKRO・正確性測定 | FixedAim',
      description:
        'オンラインでキーボード性能を測定。無料のタイピング速度（WPM）テスト、N-Key Rollover（NKRO）チェッカー、スペースバー連打、正確性ドリル。',
    },
    id: {
      title: 'Alat Tes Keyboard - WPM, NKRO & Akurasi | FixedAim',
      description:
        'Uji performa keyboard Anda secara online. Tes kecepatan mengetik WPM gratis, detektor N-Key Rollover (NKRO), penghitung spasi, dan latihan akurasi.',
    },
    ru: {
      title: 'Инструменты для Клавиатуры - WPM, NKRO и Точность | FixedAim',
      description:
        'Тестируйте клавиатуру онлайн: бесплатный тест скорости печати WPM, проверка N-Key Rollover (NKRO), счётчик пробела и тренажёры точности.',
    },
    ar: {
      title: 'أدوات اختبار لوحة المفاتيح - WPM و NKRO والدقة | FixedAim',
      description:
        'اختبر أداء لوحة المفاتيح أونلاين. اختبارات سرعة الكتابة WPM مجاناً، كاشف N-Key Rollover (NKRO)، عداد المسافة، وتدريبات الدقة.',
    },
    ko: {
      title: '키보드 테스트 도구 - WPM, NKRO 및 정확도 | FixedAim',
      description:
        '온라인으로 키보드 성능을 테스트하세요. 무료 타자 속도 WPM 테스트, N-Key Rollover(NKRO) 동시입력 감지기, 스페이스바 카운터 및 정확도 훈련.',
    },
  },

  mouse: {
    en: {
      title: 'Mouse Testing Tools - CPS, Scroll & Double-Click | FixedAim',
      description:
        'Test your mouse switch latency, double-click chatter, scroll wheel speed, and clicking speed (CPS). Free browser diagnostics for competitive gamers.',
    },
    es: {
      title: 'Herramientas de Ratón - CPS, Scroll y Doble Clic | FixedAim',
      description:
        'Prueba la latencia de los switches de tu ratón, el doble clic accidental, la velocidad de scroll y tu CPS (Drag Clicking, Jitter Clicking). Gratis.',
    },
    pt: {
      title: 'Ferramentas de Mouse - CPS, Scroll e Duplo Clique | FixedAim',
      description:
        'Teste a latência do switch do mouse, duplo clique acidental, velocidade de scroll e CPS (Drag Clicking, Jitter Clicking). Diagnóstico grátis no navegador.',
    },
    de: {
      title: 'Maus-Test-Tools - CPS, Scroll & Doppelklick | FixedAim',
      description:
        'Teste Maustasten-Latenz, Doppelklick-Chatter, Mausrad-Geschwindigkeit und Klickgeschwindigkeit (CPS, Drag Clicking, Jitter Clicking) kostenlos im Browser.',
    },
    fr: {
      title: 'Outils de Test Souris - CPS, Molette & Double-Clic | FixedAim',
      description:
        'Testez la latence des switchs de souris, le double-clic, la vitesse de molette et votre CPS (Drag Clicking, Jitter Clicking) gratuitement en ligne.',
    },
    ja: {
      title: 'マウステストツール - CPS・スクロール・チャタリング | FixedAim',
      description:
        'マウスのスイッチ遅延、チャタリング（ダブルクリック）、スクロール速度、CPS（Drag Clicking・Jitter Clicking）をブラウザで無料診断。',
    },
    id: {
      title: 'Alat Tes Mouse - CPS, Scroll & Double-Click | FixedAim',
      description:
        'Uji latensi switch mouse, double-click chatter, kecepatan scroll wheel, dan kecepatan klik CPS (Drag Clicking, Jitter Clicking) gratis di browser.',
    },
    ru: {
      title: 'Инструменты для Мыши - CPS, Скролл и Дабл-Клик | FixedAim',
      description:
        'Проверьте задержку переключателей мыши, дабл-клик, скорость колеса прокрутки и скорость кликов CPS (Drag Clicking, Jitter Clicking) бесплатно.',
    },
    ar: {
      title: 'أدوات اختبار الفأرة - CPS والتمرير والنقر المزدوج | FixedAim',
      description:
        'اختبر استجابة أزرار الفأرة، النقر المزدوج، سرعة عجلة التمرير، وسرعة النقر CPS (Drag Clicking و Jitter Clicking) مجاناً عبر المتصفح.',
    },
    ko: {
      title: '마우스 테스트 도구 - CPS, 스크롤 & 더블클릭 | FixedAim',
      description:
        '마우스 스위치 지연 시간, 더블클릭 채터링, 스크롤 휠 속도 및 클릭 속도(CPS, Drag Clicking, Jitter Clicking)를 브라우저에서 무료로 진단하세요.',
    },
  },

  aim: {
    en: {
      title: 'Aim & Reaction Tools - Free Reflex Trainers | FixedAim',
      description:
        'Improve your flicking, tracking, and reaction times with free browser aim trainers. Benchmark your FPS reflexes and motor precision with zero download.',
    },
    es: {
      title: 'Herramientas de Puntería y Reacción - Entrenadores Gratis | FixedAim',
      description:
        'Mejora tu flicking, tracking y tiempo de reacción con entrenadores de puntería 2D y 3D gratuitos. Mide tus reflejos FPS sin descargas.',
    },
    pt: {
      title: 'Ferramentas de Mira e Reação - Treinadores Grátis | FixedAim',
      description:
        'Melhore seu flicking, tracking e tempo de reação com treinadores de mira 2D e 3D gratuitos no navegador. Avalie seus reflexos de FPS sem baixar nada.',
    },
    de: {
      title: 'Aim- & Reaktionstools - Kostenlose Reflex-Trainer | FixedAim',
      description:
        'Verbessere Flicking, Tracking und Reaktionszeit mit kostenlosen 2D- und 3D-Aim-Trainern im Browser. Teste deine FPS-Reflexe ohne Download.',
    },
    fr: {
      title: 'Outils de Visée et Réaction - Entraîneurs Gratuits | FixedAim',
      description:
        'Améliorez votre flicking, tracking et temps de réaction avec nos entraîneurs de visée 2D et 3D gratuits. Testez vos réflexes FPS sans téléchargement.',
    },
    ja: {
      title: 'エイム＆反応速度ツール - 無料反射神経トレーナー | FixedAim',
      description:
        'ブラウザで遊べる無料の2D・3Dエイムトレーナーでフリック、トラッキング、反応速度を鍛えよう。ダウンロード不要でFPSの反射神経を測定。',
    },
    id: {
      title: 'Alat Aim & Reaksi - Pelatih Refleks Gratis | FixedAim',
      description:
        'Tingkatkan flicking, tracking, dan waktu reaksi Anda dengan pelatih aim 2D & 3D gratis di browser. Uji refleks FPS Anda tanpa download.',
    },
    ru: {
      title: 'Аим и Реакция - Бесплатные Тренажёры Рефлексов | FixedAim',
      description:
        'Улучшайте флики, трекинг и время реакции с бесплатными 2D и 3D аим-тренажёрами в браузере. Проверьте свои FPS-рефлексы без скачивания.',
    },
    ar: {
      title: 'أدوات التصويب ورد الفعل - مدربو ردود الفعل مجاناً | FixedAim',
      description:
        'حسّن سرعة التصويب والتتبع ووقت رد الفعل مع مدربي التصويب 2D و 3D المجانيين في المتصفح. اختبر ردود أفعالك لألعاب FPS بدون تحميل.',
    },
    ko: {
      title: '에임 및 반응속도 도구 - 무료 반사신경 트레이너 | FixedAim',
      description:
        '무료 브라우저 2D 및 3D 에임 트레이너로 플릭, 트래킹 및 반응속도를 향상시키세요. 다운로드 없이 FPS 반사신경과 정밀도를 측정할 수 있습니다.',
    },
  },

  games: {
    en: {
      title: 'Free Browser Skill Games - Arcade Reflex Tests | FixedAim',
      description:
        'Play free browser arcade and reflex skill games on FixedAim. Challenge your spatial awareness, multi-target defense, and focus with zero signup needed.',
    },
    es: {
      title: 'Juegos Arcade de Habilidad Gratis en el Navegador | FixedAim',
      description:
        'Juega gratis a juegos arcade de reflejos y habilidad en FixedAim. Desafía tu percepción espacial, defensa multiobjetivo y concentración sin registro.',
    },
    pt: {
      title: 'Jogos Arcade de Habilidade Grátis no Navegador | FixedAim',
      description:
        'Jogue jogos arcade gratuitos de reflexo e habilidade no FixedAim. Desafie sua percepção espacial, defesa multi-alvo e foco sem cadastro.',
    },
    de: {
      title: 'Kostenlose Browser-Skill-Games - Arcade Reflex-Tests | FixedAim',
      description:
        'Spiele kostenlose Arcade- und Reflex-Spiele direkt im Browser auf FixedAim. Trainiere Raumwahrnehmung, Multitasking und Fokus ohne Anmeldung.',
    },
    fr: {
      title: 'Jeux d’Adresse Gratuits par Navigateur - Tests Arcade | FixedAim',
      description:
        'Jouez gratuitement aux jeux arcade d’adresse et de réflexes sur FixedAim. Travaillez votre perception spatiale et votre concentration sans inscription.',
    },
    ja: {
      title: '無料ブラウザスキルゲーム - アーケード反射神経テスト | FixedAim',
      description:
        '登録不要で遊べるFixedAimの無料アーケード＆反射神経ゲーム。空間認識力、マルチターゲット防衛、集中力とAPMを楽しく鍛えよう。',
    },
    id: {
      title: 'Game Skill Browser Gratis - Tes Refleks Arcade | FixedAim',
      description:
        'Mainkan game arcade refleks dan skill gratis di FixedAim. Tantang kesadaran spasial, pertahanan multi-target, dan fokus Anda tanpa daftar.',
    },
    ru: {
      title: 'Бесплатные Браузерные Игры на Реакцию и Скилл | FixedAim',
      description:
        'Играйте в бесплатные аркадные игры на реакцию и APM в FixedAim. Тренируйте пространственное мышление и концентрацию без регистрации.',
    },
    ar: {
      title: 'ألعاب مهارة مجانية عبر المتصفح - اختبارات أركيد | FixedAim',
      description:
        'العب ألعاب الأركيد وردود الفعل المجانية على FixedAim. تحدَّ إدراكك المكاني وسرعة استجابتك وتركيزك بدون الحاجة للتسجيل.',
    },
    ko: {
      title: '무료 브라우저 스킬 게임 - 아케이드 반사신경 테스트 | FixedAim',
      description:
        'FixedAim에서 무료 브라우저 아케이드 및 반사신경 게임을 플레이하세요. 회원가입 없이 공간 지각력, 다중 타겟 방어 및 APM을 훈련하세요.',
    },
  },

  benchmark: {
    en: {
      title: 'Benchmark Hub – Internet Speed Test | FixedAim',
      description:
        'Benchmark your internet connection speed with real-time download, upload, ping, jitter & packet loss tests. Free, no sign-up required — FixedAim.',
    },
    es: {
      title: 'Centro de Benchmark – Test de Velocidad de Internet | FixedAim',
      description:
        'Evalúa la velocidad de tu conexión con pruebas en tiempo real de descarga, subida, ping, jitter y pérdida de paquetes. Gratis y sin registro.',
    },
    pt: {
      title: 'Central de Benchmark – Teste de Velocidade da Internet | FixedAim',
      description:
        'Avalie sua conexão com testes em tempo real de download, upload, ping, jitter e perda de pacotes. Grátis e sem cadastro no FixedAim.',
    },
    de: {
      title: 'Benchmark Hub – Internet-Geschwindigkeitstest | FixedAim',
      description:
        'Teste deine Internetverbindung mit Echtzeit-Messungen für Download, Upload, Ping, Jitter und Paketverlust. Kostenlos und ohne Anmeldung.',
    },
    fr: {
      title: 'Hub Benchmark – Test de Débit Internet | FixedAim',
      description:
        'Évaluez votre connexion internet en temps réel : téléchargement, envoi, ping, gigue (jitter) et perte de paquets. Gratuit et sans inscription.',
    },
    ja: {
      title: 'ベンチマークハブ – インターネット回線速度テスト | FixedAim',
      description:
        'ダウンロード・アップロード速度、Ping遅延、ジッター、パケットロスをリアルタイムで計測。登録不要・無料のFixedAimベンチマーク。',
    },
    id: {
      title: 'Pusat Benchmark – Tes Kecepatan Internet | FixedAim',
      description:
        'Uji kecepatan koneksi internet Anda dengan tes download, upload, ping, jitter & packet loss secara real-time. Gratis tanpa daftar.',
    },
    ru: {
      title: 'Центр Бенчмарков – Тест Скорости Интернета | FixedAim',
      description:
        'Проверьте скорость интернета: загрузка, отдача, пинг, джиттер и потеря пакетов в реальном времени. Бесплатно и без регистрации.',
    },
    ar: {
      title: 'مركز قياس الأداء – اختبار سرعة الإنترنت | FixedAim',
      description:
        'قس سرعة اتصالك بالإنترنت مع اختبارات التحميل والرفع والـ Ping والـ Jitter وفقدان الحزم في الوقت الفعلي. مجاني وبدون تسجيل.',
    },
    ko: {
      title: '벤치마크 허브 – 인터넷 속도 테스트 | FixedAim',
      description:
        '실시간 다운로드, 업로드, 핑(Ping), 지터(Jitter) 및 패킷 손실 테스트로 인터넷 연결 속도를 측정하세요. 무료이며 회원가입이 필요 없습니다.',
    },
  },

  device: {
    en: {
      title: 'Device Test & Hardware Diagnostics Hub | FixedAim',
      description:
        'Test your PC, monitor, laptop, and smartphone hardware online. Free tests for screen refresh rate (Hz), dead pixels, speakers, mic, mouse, and keyboard.',
    },
    es: {
      title: 'Centro de Diagnóstico de Dispositivos y Hardware | FixedAim',
      description:
        'Prueba el hardware de tu PC, monitor, portátil o móvil online. Tests gratis de tasa de refresco (Hz), píxeles muertos, altavoces, ratón y teclado.',
    },
    pt: {
      title: 'Central de Diagnóstico de Dispositivos e Hardware | FixedAim',
      description:
        'Teste o hardware do seu PC, monitor, notebook e celular online. Testes grátis de taxa de atualização (Hz), dead pixels, alto-falantes, mouse e teclado.',
    },
    de: {
      title: 'Gerätetest & Hardware-Diagnose Hub | FixedAim',
      description:
        'Teste PC-, Monitor-, Laptop- und Smartphone-Hardware online. Kostenlose Tests für Bildwiederholrate (Hz), Pixelfehler, Lautsprecher, Maus & Tastatur.',
    },
    fr: {
      title: 'Hub Diagnostics Matériel & Appareils | FixedAim',
      description:
        'Testez le matériel de votre PC, écran, portable ou smartphone en ligne. Tests gratuits de fréquence (Hz), pixels morts, haut-parleurs, souris et clavier.',
    },
    ja: {
      title: 'デバイステスト＆ハードウェア診断ハブ | FixedAim',
      description:
        'PC、モニター、ノートPC、スマホのハードウェアをオンライン診断。リフレッシュレート（Hz）、ドット抜け、スピーカー、マウス、キーボードを無料テスト。',
    },
    id: {
      title: 'Pusat Tes Perangkat & Diagnostik Hardware | FixedAim',
      description:
        'Uji hardware PC, monitor, laptop, dan smartphone Anda secara online. Tes gratis refresh rate (Hz), dead pixel, speaker, mouse, dan keyboard.',
    },
    ru: {
      title: 'Центр Тестирования Устройств и Диагностики | FixedAim',
      description:
        'Проверьте ПК, монитор, ноутбук и смартфон онлайн. Бесплатные тесты герцовки (Hz), битых пикселей, динамиков, мыши и клавиатуры.',
    },
    ar: {
      title: 'مركز فحص الجهاز وتشخيص العتاد | FixedAim',
      description:
        'اختبر عتاد الحاسوب والشاشة واللابتوب والهاتف أونلاين. اختبارات مجانية لمعدل التحديث (Hz)، البكسلات الميتة، السماعات، الفأرة، ولوحة المفاتيح.',
    },
    ko: {
      title: '장치 테스트 및 하드웨어 진단 허브 | FixedAim',
      description:
        'PC, 모니터, 노트북 및 스마트폰 하드웨어를 온라인으로 테스트하세요. 화면 주사율(Hz), 불량 화소, 스피커, 마우스, 키보드 무료 진단.',
    },
  },
};

export const ALL_LOCALIZED_META: Record<RouteKey, Record<Lang, RouteMeta>> = {
  ...LOCALIZED_META,
  ...TOOL_EDITORIAL_META,
};

export function buildHreflangLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of ALL_LANGS) {
    languages[l] = `${SITE_URL}${withLangPath(path, l)}`;
  }
  languages['x-default'] = `${SITE_URL}${withLangPath(path, 'en')}`;
  return languages;
}

export function buildLocalizedMetadata(routeKey: RouteKey, lang: Lang): Metadata {
  const path = ALL_ROUTE_PATHS[routeKey];
  const meta = ALL_LOCALIZED_META[routeKey][lang] ?? ALL_LOCALIZED_META[routeKey].en;
  const canonicalUrl = `${SITE_URL}${withLangPath(path, lang)}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangLanguages(path),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      siteName: 'FixedAim',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
      locale: OG_LOCALES[lang],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/og-image.jpg'],
    },
  };
}
