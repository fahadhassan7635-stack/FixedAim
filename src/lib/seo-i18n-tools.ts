import type { Lang } from './i18n';

export type ToolAndEditorialRouteKey =
  | '3d-aim-trainer'
  | 'accuracy'
  | 'aim-trainer'
  | 'apm-drill'
  | 'blog'
  | 'contact'
  | 'cps-rush'
  | 'cps-test'
  | 'dead-pixel-test'
  | 'double-click'
  | 'f1-reaction'
  | 'hz-test'
  | 'internet-speed'
  | 'key-visualizer'
  | 'memory-test'
  | 'mouse-accuracy'
  | 'privacy-policy'
  | 'reaction-time'
  | 'scroll-test'
  | 'space-defense'
  | 'space-waves'
  | 'spacebar'
  | 'speaker-test'
  | 'terms'
  | 'typing-test'
  | 'voyager-game';

export const TOOL_EDITORIAL_ROUTE_PATHS: Record<ToolAndEditorialRouteKey, string> = {
  '3d-aim-trainer': '/3d-aim-trainer',
  'accuracy': '/accuracy',
  'aim-trainer': '/aim-trainer',
  'apm-drill': '/apm-drill',
  'blog': '/blog',
  'contact': '/contact',
  'cps-rush': '/cps-rush',
  'cps-test': '/cps-test',
  'dead-pixel-test': '/dead-pixel-test',
  'double-click': '/double-click',
  'f1-reaction': '/f1-reaction',
  'hz-test': '/hz-test',
  'internet-speed': '/internet-speed',
  'key-visualizer': '/key-visualizer',
  'memory-test': '/memory-test',
  'mouse-accuracy': '/mouse-accuracy',
  'privacy-policy': '/privacy-policy',
  'reaction-time': '/reaction-time',
  'scroll-test': '/scroll-test',
  'space-defense': '/space-defense',
  'space-waves': '/space-waves',
  'spacebar': '/spacebar',
  'speaker-test': '/speaker-test',
  'terms': '/terms',
  'typing-test': '/typing-test',
  'voyager-game': '/voyager-game',
};

export interface RouteMeta {
  title: string;
  description: string;
}

export const TOOL_EDITORIAL_META: Record<ToolAndEditorialRouteKey, Record<Lang, RouteMeta>> = {
  'cps-test': {
    en: {
      title: 'CPS Test - Free Click Speed Test Online | FixedAim',
      description: 'Test your CPS (Clicks Per Second) online. Master Left Click, Butterfly, Jitter, and Drag Clicking with custom timers, live analytics graph, and ranks.',
    },
    es: {
      title: 'Test de CPS - Prueba de Velocidad de Clic Online | FixedAim',
      description: 'Mide tus CPS (clics por segundo) online gratis. Domina Left Click, Butterfly, Jitter y Drag Clicking con temporizadores, gráfico en vivo y rangos.',
    },
    pt: {
      title: 'Teste de CPS - Teste de Velocidade de Clique Online | FixedAim',
      description: 'Teste seus CPS (cliques por segundo) online grátis. Domine Butterfly, Jitter e Drag Clicking com temporizadores personalizados e gráfico ao vivo.',
    },
    de: {
      title: 'CPS Test - Kostenloser Klickgeschwindigkeitstest Online | FixedAim',
      description: 'Teste deine CPS (Klicks pro Sekunde) online. Meistere Butterfly, Jitter und Drag Clicking mit Timern, Live-Diagramm und Rängen.',
    },
    fr: {
      title: 'Test CPS - Test de Vitesse de Clic Gratuit en Ligne | FixedAim',
      description: 'Testez vos CPS (clics par seconde) en ligne. Maîtrisez le Butterfly, Jitter et Drag Clicking avec minuteurs personnalisés et graphique en direct.',
    },
    ja: {
      title: 'CPSテスト - 無料クリック速度測定ツール | FixedAim',
      description: '1秒あたりのクリック数（CPS）をオンラインで測定。Butterfly、Jitter、Drag Clickingに対応し、リアルタイムグラフとランク評価を表示。',
    },
    id: {
      title: 'Tes CPS - Tes Kecepatan Klik Online Gratis | FixedAim',
      description: 'Uji CPS (Klik Per Detik) Anda secara online. Kuasai Butterfly, Jitter, dan Drag Clicking dengan timer kustom, grafik langsung, dan peringkat.',
    },
    ru: {
      title: 'CPS Тест - Бесплатный Тест Скорости Клика Онлайн | FixedAim',
      description: 'Проверьте свой CPS (кликов в секунду) онлайн. Освойте Butterfly, Jitter и Drag Clicking с таймерами, графиком в реальном времени и рангами.',
    },
    ar: {
      title: 'اختبار CPS - قياس سرعة النقر أونلاين مجاناً | FixedAim',
      description: 'اختبر معدل CPS (نقرة في الثانية) أونلاين. أتقن Butterfly و Jitter و Drag Clicking مع مؤقتات مخصصة ورسم بياني مباشر وتقييمات.',
    },
    ko: {
      title: 'CPS 테스트 - 무료 온라인 클릭 속도 측정 | FixedAim',
      description: '온라인에서 초당 클릭 수(CPS)를 측정하세요. Butterfly, Jitter, Drag Clicking을 지원하며 실시간 그래프와 랭크를 제공합니다.',
    },
  },
  'typing-test': {
    en: {
      title: 'Typing Speed Test - Free WPM Test Online | FixedAim',
      description: 'Find your true typing speed in words per minute with our free WPM test. No account needed. Track accuracy, speed, and improve your typing skills instantly.',
    },
    es: {
      title: 'Test de Velocidad de Escritura - Prueba WPM Gratis | FixedAim',
      description: 'Descubre tu velocidad real en palabras por minuto con nuestro test WPM gratis. Sin registro. Mide tu precisión y mejora al instante.',
    },
    pt: {
      title: 'Teste de Velocidade de Digitação - Teste WPM Grátis | FixedAim',
      description: 'Descubra sua velocidade real em palavras por minuto com nosso teste WPM grátis. Sem conta. Acompanhe precisão e melhore sua digitação.',
    },
    de: {
      title: 'Tippgeschwindigkeitstest - Kostenloser WPM Test Online | FixedAim',
      description: 'Finde deine echte Tippgeschwindigkeit in WPM heraus. Kostenloser Tipp-Test ohne Anmeldung mit Genauigkeitsanalyse und Sofort-Ergebnissen.',
    },
    fr: {
      title: 'Test de Vitesse de Frappe - Test WPM Gratuit en Ligne | FixedAim',
      description: 'Découvrez votre vraie vitesse de frappe en mots par minute (WPM) gratuitement. Sans inscription. Suivez votre précision et progressez.',
    },
    ja: {
      title: 'タイピング速度テスト - 無料WPM測定オンライン | FixedAim',
      description: '無料のWPMテストで正確なタイピング速度を測定。アカウント登録不要で正確率やスピードをリアルタイムに分析。',
    },
    id: {
      title: 'Tes Kecepatan Mengetik - Tes WPM Online Gratis | FixedAim',
      description: 'Temukan kecepatan mengetik Anda dalam WPM dengan tes gratis ini. Tanpa daftar. Lacak akurasi, kecepatan, dan tingkatkan skill mengetik.',
    },
    ru: {
      title: 'Тест Скорости Печати - Бесплатный WPM Тест Онлайн | FixedAim',
      description: 'Узнайте свою реальную скорость печати в WPM с бесплатным тестом. Без регистрации. Отслеживайте точность и улучшайте навык.',
    },
    ar: {
      title: 'اختبار سرعة الكتابة - اختبار WPM مجاني أونلاين | FixedAim',
      description: 'اكتشف سرعتك الحقيقية في الكتابة بالكلمة في الدقيقة (WPM) مجاناً وبدون تسجيل. تتبع الدقة والسرعة وطوّر مهاراتك فوراً.',
    },
    ko: {
      title: '타자 속도 테스트 - 무료 온라인 WPM 측정 | FixedAim',
      description: '무료 WPM 테스트로 정확한 분당 타자 속도를 확인하세요. 가입 없이 정확도와 속도를 측정하고 실력을 향상시키세요.',
    },
  },
  'reaction-time': {
    en: {
      title: 'Reaction Time Test - Human Reflex Speed Test | FixedAim',
      description: 'How fast are your reflexes? Measure your reaction time in milliseconds, average across multiple attempts, and see how you compare to the human average.',
    },
    es: {
      title: 'Test de Tiempo de Reacción - Prueba de Reflejos | FixedAim',
      description: '¿Qué tan rápidos son tus reflejos? Mide tu tiempo de reacción en milisegundos, calcula tu promedio y compárate con la media humana.',
    },
    pt: {
      title: 'Teste de Tempo de Reação - Teste de Reflexos | FixedAim',
      description: 'Quão rápidos são seus reflexos? Meça seu tempo de reação em milissegundos, veja sua média e compare com a média humana.',
    },
    de: {
      title: 'Reaktionszeittest - Menschlicher Reflex-Test Online | FixedAim',
      description: 'Wie schnell sind deine Reflexe? Miss deine Reaktionszeit in Millisekunden über mehrere Runden und vergleiche dich mit dem Durchschnitt.',
    },
    fr: {
      title: 'Test de Temps de Réaction - Test de Réflexes | FixedAim',
      description: 'Quelle est la vitesse de vos réflexes ? Mesurez votre temps de réaction en millisecondes et comparez votre moyenne aux standards humains.',
    },
    ja: {
      title: '反応速度テスト - 反射神経スピード測定 | FixedAim',
      description: 'あなたの反射神経の速さは？ミリ秒単位で反応時間を測定し、複数回の平均スコアを人間の平均値と比較しましょう。',
    },
    id: {
      title: 'Tes Waktu Reaksi - Uji Kecepatan Refleks Manusia | FixedAim',
      description: 'Seberapa cepat refleks Anda? Ukur waktu reaksi dalam milidetik, hitung rata-rata dari beberapa percobaan, dan bandingkan hasilnya.',
    },
    ru: {
      title: 'Тест Времени Реакции - Проверка Скорости Рефлексов | FixedAim',
      description: 'Насколько быстры ваши рефлексы? Измерьте время реакции в миллисекундах, узнайте среднее значение и сравните со средним показателем.',
    },
    ar: {
      title: 'اختبار وقت رد الفعل - قياس سرعة الاستجابة | FixedAim',
      description: 'ما مدى سرعة ردود أفعالك؟ قس وقت رد فعلك بالمللي ثانية عبر عدة محاولات وقارن متوسطك بالمعدل البشري.',
    },
    ko: {
      title: '반응 속도 테스트 - 반사 신경 속도 측정 | FixedAim',
      description: '당신의 반사 신경은 얼마나 빠를까요? 밀리초 단위로 반응 시간을 측정하고 여러 시도의 평균을 인간 평균과 비교하세요.',
    },
  },
  'aim-trainer': {
    en: {
      title: 'Aim Trainer - Free Browser FPS Aim Practice | FixedAim',
      description: 'Sharpen your FPS aim in the browser — no download needed. Choose Easy, Medium, Hard, or Flick mode. Track accuracy, combos, and personal records instantly.',
    },
    es: {
      title: 'Aim Trainer - Entrenador de Puntería FPS en Navegador | FixedAim',
      description: 'Mejora tu puntería FPS en el navegador sin descargas. Elige modo Fácil, Medio, Difícil o Flick y registra tu precisión y récords al instante.',
    },
    pt: {
      title: 'Aim Trainer - Treino de Mira FPS Grátis no Navegador | FixedAim',
      description: 'Melhore sua mira FPS no navegador sem baixar nada. Escolha os modos Fácil, Médio, Difícil ou Flick e acompanhe precisão e recordes.',
    },
    de: {
      title: 'Aim Trainer - Kostenloses Browser FPS Aim-Training | FixedAim',
      description: 'Verbessere dein FPS-Aim direkt im Browser ohne Download. Wähle Leicht, Mittel, Schwer oder Flick-Modus und verfolge Präzision und Rekorde.',
    },
    fr: {
      title: 'Aim Trainer - Entraînement Visée FPS Gratuit en Ligne | FixedAim',
      description: 'Affûtez votre visée FPS dans le navigateur sans téléchargement. Modes Facile, Moyen, Difficile ou Flick avec suivi de précision instantané.',
    },
    ja: {
      title: 'エイムトレーナー - 無料ブラウザFPSエイム練習 | FixedAim',
      description: 'ダウンロード不要でブラウザ上でFPSエイムを練習。Easy・Medium・Hard・Flickモードで命中率とコンボ、自己ベストを記録。',
    },
    id: {
      title: 'Aim Trainer - Latihan Aim FPS Gratis di Browser | FixedAim',
      description: 'Asah aim FPS Anda langsung di browser tanpa unduhan. Pilih mode Easy, Medium, Hard, atau Flick dan pantau akurasi serta rekor pribadi.',
    },
    ru: {
      title: 'Аим Тренажер - Бесплатная Тренировка Аима FPS в Браузере | FixedAim',
      description: 'Отточите аим для FPS прямо в браузере без скачивания. Режимы Easy, Medium, Hard и Flick с отслеживанием точности и рекордов.',
    },
    ar: {
      title: 'مدرب التصويب Aim Trainer - تدريب تصويب FPS مجاني | FixedAim',
      description: 'حسّن دقة التصويب في ألعاب FPS مباشرة من المتصفح بدون تحميل. اختر وضع سهل أو متوسط أو صعب أو Flick وتابع أرقامك القياسية.',
    },
    ko: {
      title: '에임 트레이너 - 무료 브라우저 FPS 에임 연습 | FixedAim',
      description: '다운로드 없이 브라우저에서 FPS 에임을 연마하세요. 쉬움, 보통, 어려움, Flick 모드로 정확도와 개인 기록을 즉시 확인하세요.',
    },
  },
  '3d-aim-trainer': {
    en: {
      title: '3D Aim Trainer - Free Browser FPS Aim Practice | FixedAim',
      description: 'Practice flicking, tracking, and target precision in a true 3D spatial FPS environment online. Boost your aim in Valorant, CS2, and Apex with zero download.',
    },
    es: {
      title: '3D Aim Trainer - Práctica de Puntería FPS en 3D Gratis | FixedAim',
      description: 'Practica flicking, tracking y precisión en un entorno FPS 3D real online. Mejora tu puntería para Valorant, CS2 y Apex sin descargas.',
    },
    pt: {
      title: '3D Aim Trainer - Treino de Mira FPS 3D Grátis | FixedAim',
      description: 'Pratique flicking, tracking e precisão em um ambiente FPS 3D real online. Evolua sua mira no Valorant, CS2 e Apex sem downloads.',
    },
    de: {
      title: '3D Aim Trainer - Kostenloses 3D FPS Aim-Training | FixedAim',
      description: 'Trainiere Flicking, Tracking und Zielpräzision in einer echten 3D-FPS-Umgebung online. Optimiere dein Aim für Valorant, CS2 und Apex.',
    },
    fr: {
      title: '3D Aim Trainer - Entraînement FPS 3D Gratuit en Ligne | FixedAim',
      description: 'Pratiquez le flicking, le tracking et la précision dans un véritable environnement FPS 3D en ligne pour Valorant, CS2 et Apex.',
    },
    ja: {
      title: '3Dエイムトレーナー - 無料ブラウザ3D FPS練習 | FixedAim',
      description: '本格的な3D空間のFPS環境でフリック、トラッキング、精密射撃を練習。Valorant、CS2、Apexのエイム向上に最適。',
    },
    id: {
      title: '3D Aim Trainer - Latihan Aim FPS 3D Gratis Online | FixedAim',
      description: 'Latih flicking, tracking, dan presisi target di lingkungan FPS 3D nyata. Tingkatkan aim Anda untuk Valorant, CS2, dan Apex tanpa unduh.',
    },
    ru: {
      title: '3D Аим Тренажер - Бесплатная 3D Тренировка FPS Онлайн | FixedAim',
      description: 'Тренируйте флики, трекинг и точность в настоящей 3D FPS-среде онлайн. Прокачайте аим для Valorant, CS2 и Apex без загрузки.',
    },
    ar: {
      title: 'مدرب التصويب ثلاثي الأبعاد 3D Aim Trainer مجاني | FixedAim',
      description: 'تدرّب على Flicking و Tracking ودقة التصويب في بيئة FPS ثلاثية الأبعاد حقيقية أونلاين لتحسين أدائك في Valorant و CS2 و Apex.',
    },
    ko: {
      title: '3D 에임 트레이너 - 무료 브라우저 3D FPS 연습 | FixedAim',
      description: '실제 3D 공간 FPS 환경에서 플리킹, 트래킹, 정밀 조준을 연습하세요. 다운로드 없이 Valorant, CS2, Apex 에임을 향상시키세요.',
    },
  },
  'key-visualizer': {
    en: {
      title: 'Key Visualizer - Live Keystroke Display Online | FixedAim',
      description: 'See every keystroke visualised in real time with full 104-key keyboard, Numpad, and Arrow keys. Perfect for streamers, typists, and keyboard enthusiasts.',
    },
    es: {
      title: 'Visualizador de Teclas - Teclado en Vivo Online | FixedAim',
      description: 'Visualiza cada pulsación en tiempo real con un teclado completo de 104 teclas, teclado numérico y flechas. Ideal para streamers y pruebas NKRO.',
    },
    pt: {
      title: 'Visualizador de Teclas - Display de Teclado ao Vivo | FixedAim',
      description: 'Veja cada tecla pressionada em tempo real em um teclado completo de 104 teclas. Perfeito para streamers, digitadores e testes NKRO.',
    },
    de: {
      title: 'Tasten-Visualisierer - Live Tastatureingaben Online | FixedAim',
      description: 'Sieh jeden Tastenanschlag in Echtzeit auf einer vollständigen 104-Tasten-Tastatur. Perfekt für Streamer, Vielschreiber und NKRO-Tests.',
    },
    fr: {
      title: 'Visualiseur de Touches - Clavier en Direct en Ligne | FixedAim',
      description: 'Visualisez chaque frappe en temps réel sur un clavier complet de 104 touches. Idéal pour les streamers, dactylos et tests NKRO.',
    },
    ja: {
      title: 'キービジュアライザー - リアルタイムキー入力表示 | FixedAim',
      description: 'フル104キー配列・テンキー・矢印キーの打鍵をリアルタイム表示。配信者やタイピスト、NKROテストに最適。',
    },
    id: {
      title: 'Visualisasi Tombol - Tampilan Keyboard Langsung | FixedAim',
      description: 'Lihat setiap tombol yang ditekan secara real-time dengan keyboard penuh 104 tombol. Cocok untuk streamer, pengetik, dan cek NKRO.',
    },
    ru: {
      title: 'Визуализатор Клавиш - Отображение Нажатий Онлайн | FixedAim',
      description: 'Отслеживайте каждое нажатие в реальном времени на полной 104-клавишной клавиатуре. Идеально для стримеров и проверки NKRO.',
    },
    ar: {
      title: 'عارض المفاتيح - عرض ضغطات لوحة المفاتيح مباشرة | FixedAim',
      description: 'شاهد كل ضغطة مفتاح في الوقت الفعلي على لوحة مفاتيح كاملة من 104 مفاتيح. مثالي للبث المباشر واختبار NKRO.',
    },
    ko: {
      title: '키 비주얼라이저 - 실시간 키보드 입력 표시 | FixedAim',
      description: '104키 풀배열 키보드와 숫자패드 입력을 실시간으로 시각화합니다. 스트리머와 NKRO 테스트에 완벽합니다.',
    },
  },
  'spacebar': {
    en: {
      title: 'Spacebar Counter - Free Spacebar Speed Test Online | FixedAim',
      description: 'Test your spacebar speed online. Master butterfly spacebar tapping, jitter click counter on spacebar, and train for Minecraft, rhythm games, and FPS.',
    },
    es: {
      title: 'Contador de Barra Espaciadora - Test de Velocidad | FixedAim',
      description: 'Mide tu velocidad con la barra espaciadora online. Practica butterfly y jitter tapping para Minecraft, juegos de ritmo y FPS.',
    },
    pt: {
      title: 'Contador de Barra de Espaço - Teste de Velocidade | FixedAim',
      description: 'Teste sua velocidade na barra de espaço online. Domine butterfly e jitter tapping para Minecraft, jogos de ritmo e FPS.',
    },
    de: {
      title: 'Leertasten-Zähler - Kostenloser Spacebar Speed Test | FixedAim',
      description: 'Teste deine Leertasten-Geschwindigkeit online. Trainiere Butterfly- und Jitter-Tapping für Minecraft, Rhythmusspiele und FPS.',
    },
    fr: {
      title: 'Compteur Barre Espace - Test de Vitesse en Ligne | FixedAim',
      description: 'Testez votre vitesse sur la barre espace en ligne. Maîtrisez le butterfly et jitter tapping pour Minecraft, jeux de rythme et FPS.',
    },
    ja: {
      title: 'スペースバー連打カウンター - 無料連打速度テスト | FixedAim',
      description: 'スペースバーの連打速度をオンライン測定。Minecraftや音ゲー、FPS向けのバタフライ・ジッター連打をトレーニング。',
    },
    id: {
      title: 'Penghitung Spasi - Tes Kecepatan Spacebar Online | FixedAim',
      description: 'Uji kecepatan menekan tombol spasi secara online. Latih teknik butterfly dan jitter untuk Minecraft, game ritme, dan FPS.',
    },
    ru: {
      title: 'Счётчик Пробела - Бесплатный Тест Скорости Пробела | FixedAim',
      description: 'Проверьте скорость нажатия пробела онлайн. Тренируйте баттерфляй и джиттер для Minecraft, ритм-игр и FPS.',
    },
    ar: {
      title: 'عداد زر المسافة - اختبار سرعة Spacebar مجاناً | FixedAim',
      description: 'اختبر سرعة الضغط على زر المسافة أونلاين. تدرّب على Butterfly و Jitter لألعاب Minecraft وألعاب الإيقاع و FPS.',
    },
    ko: {
      title: '스페이스바 카운터 - 무료 스페이스바 속도 테스트 | FixedAim',
      description: '온라인에서 스페이스바 연타 속도를 측정하세요. 마인크래프트, 리듬 게임, FPS를 위한 버터플라이 및 지터 연타를 연습하세요.',
    },
  },
  'double-click': {
    en: {
      title: 'Mouse Double Click Test - Detect Switch Chatter | FixedAim',
      description: 'Test your mouse switches for accidental double-clicking defects. Detect faulty microswitches in real time and verify debounce timings with live diagnostics.',
    },
    es: {
      title: 'Test de Doble Clic del Ratón - Detectar Fallos de Switch | FixedAim',
      description: 'Comprueba si los switches de tu ratón hacen doble clic accidental. Detecta microswitches defectuosos y analiza tiempos de debounce en vivo.',
    },
    pt: {
      title: 'Teste de Clique Duplo do Mouse - Detectar Defeitos | FixedAim',
      description: 'Teste os switches do seu mouse contra cliques duplos acidentais. Detecte microswitches com defeito e verifique o debounce em tempo real.',
    },
    de: {
      title: 'Maus Doppelklick-Test - Switch-Defekte Erkennen | FixedAim',
      description: 'Prüfe deine Mausschalter auf ungewollte Doppelklicks (Switch Chatter). Erkenne defekte Mikroschalter und miss Debounce-Zeiten live.',
    },
    fr: {
      title: 'Test Double Clic Souris - Détecter les Défauts de Switch | FixedAim',
      description: 'Testez les switchs de votre souris pour détecter les doubles clics accidentels et vérifiez le temps de rebond (debounce) en direct.',
    },
    ja: {
      title: 'マウスチャタリングテスト - ダブルクリック故障診断 | FixedAim',
      description: 'マウスのスイッチに意図しないダブルクリック（チャタリング）が発生していないかリアルタイム診断。デバウンス間隔も検証可能。',
    },
    id: {
      title: 'Tes Double Click Mouse - Deteksi Kerusakan Switch | FixedAim',
      description: 'Uji switch mouse Anda untuk mendeteksi double click tidak sengaja. Temukan microswitch bermasalah dan cek waktu debounce secara langsung.',
    },
    ru: {
      title: 'Тест Дабл-Клика Мыши - Проверка Микриков | FixedAim',
      description: 'Проверьте кнопки мыши на случайные двойные клики (дабл-клик). Диагностируйте неисправные микропереключатели и время дребезга онлайн.',
    },
    ar: {
      title: 'اختبار النقر المزدوج للفأرة - كشف أعطال السويتش | FixedAim',
      description: 'افحص أزرار الفأرة لاكتشاف النقر المزدوج العرضي (Switch Chatter) وفحص أزمنة Debounce بتشخيص مباشر.',
    },
    ko: {
      title: '마우스 더블클릭 테스트 - 스위치 채터링 진단 | FixedAim',
      description: '마우스 스위치의 의도치 않은 더블클릭 불량을 실시간으로 확인하세요. 마이크로스위치 결함과 디바운스 간격을 정밀 진단합니다.',
    },
  },
  'scroll-test': {
    en: {
      title: 'Scroll Speed Test - Mouse Wheel Speed Checker | FixedAim',
      description: 'Measure how fast your mouse wheel scrolls. Check scroll lines per second and see if your mouse wheel is performing at its best.',
    },
    es: {
      title: 'Test de Velocidad de Scroll - Rueda del Ratón | FixedAim',
      description: 'Mide qué tan rápido desplaza la rueda de tu ratón. Comprueba líneas por segundo y evalúa el rendimiento de tu scroll.',
    },
    pt: {
      title: 'Teste de Velocidade de Scroll - Roda do Mouse | FixedAim',
      description: 'Meça a velocidade da roda de rolagem do seu mouse. Verifique linhas por segundo e avalie o desempenho do scroll.',
    },
    de: {
      title: 'Scroll-Geschwindigkeitstest - Mausrad Tester Online | FixedAim',
      description: 'Miss, wie schnell dein Mausrad scrollt. Prüfe Scroll-Zeilen pro Sekunde und teste die Präzision deines Mausrads.',
    },
    fr: {
      title: 'Test de Vitesse de Défilement - Molette de Souris | FixedAim',
      description: 'Mesurez la vitesse de défilement de votre molette de souris. Vérifiez les lignes par seconde et testez sa réactivité.',
    },
    ja: {
      title: 'スクロール速度テスト - マウスホイール計測 | FixedAim',
      description: 'マウスホイールのスクロール速度を測定。1秒あたりのスクロール量やホイールの反応状態をチェックできます。',
    },
    id: {
      title: 'Tes Kecepatan Scroll - Penguji Roda Mouse | FixedAim',
      description: 'Ukur seberapa cepat roda scroll mouse Anda berputar. Cek baris per detik dan pastikan performa scroll mouse Anda optimal.',
    },
    ru: {
      title: 'Тест Скорости Скролла - Проверка Колесика Мыши | FixedAim',
      description: 'Измерьте скорость прокрутки колесика мыши. Проверьте количество строк в секунду и оцените работу энкодера.',
    },
    ar: {
      title: 'اختبار سرعة التمرير - فحص عجلة الفأرة | FixedAim',
      description: 'قس سرعة تمرير عجلة الفأرة لديك. تحقق من عدد الأسطر في الثانية وتأكد من كفاءة أداء عجلة الفأرة.',
    },
    ko: {
      title: '스크롤 속도 테스트 - 마우스 휠 속도 측정기 | FixedAim',
      description: '마우스 휠의 스크롤 속도를 측정하세요. 초당 스크롤 라인 수와 휠 인코더 성능을 바로 확인할 수 있습니다.',
    },
  },
  'mouse-accuracy': {
    en: {
      title: 'Mouse Accuracy Test - Aim Precision & DPI Tracker | FixedAim',
      description: 'Measure your mouse tracking precision, cursor tremor, and path efficiency. Discover your ideal DPI setting and elevate your gaming aim consistency online.',
    },
    es: {
      title: 'Test de Precisión del Ratón - Puntería y DPI | FixedAim',
      description: 'Mide la precisión de seguimiento de tu ratón, temblor del cursor y eficiencia de trayectoria. Encuentra tu DPI ideal online.',
    },
    pt: {
      title: 'Teste de Precisão do Mouse - Mira e Rastreador DPI | FixedAim',
      description: 'Meça a precisão de rastreamento do mouse, tremor do cursor e eficiência de trajeto. Descubra seu DPI ideal online.',
    },
    de: {
      title: 'Maus-Genauigkeitstest - Aim-Präzision & DPI-Check | FixedAim',
      description: 'Miss deine Maus-Tracking-Präzision, Cursor-Ruhigkeit und Pfadeffizienz. Finde deine ideale DPI-Einstellung online.',
    },
    fr: {
      title: 'Test de Précision Souris - Suivi de Visée et DPI | FixedAim',
      description: 'Mesurez la précision de suivi de votre souris, la stabilité du curseur et trouvez votre DPI idéal en ligne.',
    },
    ja: {
      title: 'マウス精度テスト - エイム正確性＆DPIチェック | FixedAim',
      description: 'マウスのトラッキング精度、カーソルのブレ、移動効率を測定。最適なDPI設定を見つけてエイム安定性を高めましょう。',
    },
    id: {
      title: 'Tes Akurasi Mouse - Presisi Aim & Pelacak DPI | FixedAim',
      description: 'Ukur presisi pelacakan mouse, kestabilan kursor, dan efisiensi jalur. Temukan pengaturan DPI ideal Anda secara online.',
    },
    ru: {
      title: 'Тест Точности Мыши - Контроль Курсора и DPI | FixedAim',
      description: 'Измерьте точность ведения мыши, дрожание курсора и эффективность траектории. Подберите идеальный DPI онлайн.',
    },
    ar: {
      title: 'اختبار دقة الفأرة - تتبع التصويب و DPI | FixedAim',
      description: 'قس دقة تتبع الفأرة وثبات المؤشر وكفاءة المسار. اكتشف إعداد DPI المثالي وارفع ثبات تصويبك أونلاين.',
    },
    ko: {
      title: '마우스 정확도 테스트 - 에임 정밀도 및 DPI 측정 | FixedAim',
      description: '마우스 트래킹 정밀도, 커서 떨림, 경로 효율성을 측정하세요. 이상적인 DPI 설정을 찾고 에임 일관성을 높이세요.',
    },
  },
  'accuracy': {
    en: {
      title: 'Keyboard Accuracy Test - Stop Typos & Track Errors | FixedAim',
      description: 'Test and improve your keyboard typing precision with our free Keyboard Accuracy Test. Track per-key error rates and eliminate typos with actionable data.',
    },
    es: {
      title: 'Test de Precisión de Teclado - Reduce Errores | FixedAim',
      description: 'Evalúa y mejora tu precisión al escribir con nuestro test gratuito. Detecta fallos por tecla y elimina errores tipográficos.',
    },
    pt: {
      title: 'Teste de Precisão do Teclado - Reduza Erros | FixedAim',
      description: 'Teste e melhore sua precisão de digitação gratuitamente. Acompanhe taxas de erro por tecla e elimine erros.',
    },
    de: {
      title: 'Tastatur-Genauigkeitstest - Tippfehler Analysieren | FixedAim',
      description: 'Teste und verbessere deine Tippgenauigkeit kostenlos. Erkenne Fehlerquoten pro Taste und reduziere Tippfehler gezielt.',
    },
    fr: {
      title: 'Test de Précision Clavier - Suivi des Erreurs | FixedAim',
      description: 'Testez et améliorez votre précision de frappe gratuitement. Analysez votre taux d’erreur par touche et éliminez les fautes.',
    },
    ja: {
      title: 'キーボード正確性テスト - タイプミス分析 | FixedAim',
      description: '無料のキーボード正確性テストでタイピング精度を向上。キーごとのエラー率を把握してタイプミスを減らしましょう。',
    },
    id: {
      title: 'Tes Akurasi Keyboard - Kurangi Salah Ketik | FixedAim',
      description: 'Uji dan tingkatkan presisi mengetik Anda dengan tes gratis ini. Lacak tingkat kesalahan per tombol dan kurangi typo.',
    },
    ru: {
      title: 'Тест Точности Клавиатуры - Анализ Опечаток | FixedAim',
      description: 'Проверьте и улучшите точность печати с бесплатным тестом. Отслеживайте ошибки по каждой клавише и избавьтесь от опечаток.',
    },
    ar: {
      title: 'اختبار دقة لوحة المفاتيح - تقليل الأخطاء الإملائية | FixedAim',
      description: 'اختبر وحسّن دقة الكتابة مجاناً. تتبع نسبة الأخطاء لكل مفتاح وتخلص من الأخطاء ببيانات دقيقة.',
    },
    ko: {
      title: '키보드 정확도 테스트 - 오타 방지 및 오류 추적 | FixedAim',
      description: '무료 키보드 정확도 테스트로 타이핑 정밀도를 높이세요. 키별 오류율을 추적해 오타를 효과적으로 줄일 수 있습니다.',
    },
  },
  'internet-speed': {
    en: {
      title: 'Internet Speed Test – Check Download, Upload & Ping | FixedAim',
      description: 'Free internet speed test — measure download, upload, ping, jitter & packet loss in seconds. No sign-up needed. Start your speed test now on FixedAim.',
    },
    es: {
      title: 'Test de Velocidad de Internet – Descarga, Subida y Ping | FixedAim',
      description: 'Test de velocidad de internet gratis: mide descarga, subida, ping, jitter y pérdida de paquetes en segundos sin registro.',
    },
    pt: {
      title: 'Teste de Velocidade da Internet – Download, Upload e Ping | FixedAim',
      description: 'Teste de velocidade grátis: meça download, upload, ping, jitter e perda de pacotes em segundos sem cadastro.',
    },
    de: {
      title: 'Internet Speed Test – Download, Upload & Ping Prüfen | FixedAim',
      description: 'Kostenloser Internet-Speedtest: Miss Download, Upload, Ping, Jitter und Paketverlust in Sekunden ohne Anmeldung.',
    },
    fr: {
      title: 'Test de Débit Internet – Download, Upload et Ping | FixedAim',
      description: 'Test de débit gratuit : mesurez téléchargement, envoi, ping, jitter et perte de paquets en quelques secondes sans inscription.',
    },
    ja: {
      title: 'インターネット速度テスト – 下り・上り・Ping測定 | FixedAim',
      description: '無料の回線速度テスト。ダウンロード、アップロード、Ping、Jitter、パケットロスを数秒で計測。登録不要。',
    },
    id: {
      title: 'Tes Kecepatan Internet – Cek Download, Upload & Ping | FixedAim',
      description: 'Tes kecepatan internet gratis — ukur download, upload, ping, jitter & packet loss dalam hitungan detik tanpa daftar.',
    },
    ru: {
      title: 'Тест Скорости Интернета – Скачивание, Отдача и Пинг | FixedAim',
      description: 'Бесплатный спидтест: измерьте скорость загрузки, отдачи, пинг, джиттер и потерю пакетов за секунды без регистрации.',
    },
    ar: {
      title: 'اختبار سرعة الإنترنت – فحص التحميل والرفع و Ping | FixedAim',
      description: 'اختبار سرعة إنترنت مجاني — قس التحميل والرفع و Ping و Jitter وفقدان الحزم في ثوانٍ بدون تسجيل.',
    },
    ko: {
      title: '인터넷 속도 테스트 – 다운로드, 업로드 및 Ping 측정 | FixedAim',
      description: '무료 인터넷 속도 측정기 — 다운로드, 업로드, Ping, Jitter, 패킷 손실을 가입 없이 몇 초 만에 확인하세요.',
    },
  },
  'speaker-test': {
    en: {
      title: 'Speaker Test Online – Left, Right, Bass & Frequency Check | FixedAim',
      description: 'Free online speaker test. Check left and right channels, bass, frequency sweep, pink noise and phase in seconds. Works for speakers and headphones.',
    },
    es: {
      title: 'Test de Altavoces Online – Izquierdo, Derecho y Graves | FixedAim',
      description: 'Prueba gratuita de altavoces y auriculares online. Verifica canal izquierdo y derecho, graves, barrido de frecuencias y fase.',
    },
    pt: {
      title: 'Teste de Alto-Falantes Online – Esquerdo, Direito e Graves | FixedAim',
      description: 'Teste grátis de caixas de som e fones online. Verifique canais esquerdo e direito, graves, varredura de frequência e fase.',
    },
    de: {
      title: 'Lautsprecher-Test Online – Links, Rechts, Bass & Frequenz | FixedAim',
      description: 'Kostenloser Lautsprecher- und Kopfhörertest online. Prüfe linken/rechten Kanal, Bass, Frequenzgang, Rosa Rauschen und Phase.',
    },
    fr: {
      title: 'Test Haut-Parleurs en Ligne – Gauche, Droite et Basses | FixedAim',
      description: 'Test gratuit pour enceintes et écouteurs en ligne. Vérifiez les canaux gauche/droite, basses, balayage de fréquence et phase.',
    },
    ja: {
      title: 'スピーカーテスト – 左右チャンネル・重低音・周波数チェック | FixedAim',
      description: '無料のオンラインスピーカー・ヘッドホンテスト。左右バランス、重低音、周波数スイープ、ピンクノイズ、位相を即座に確認。',
    },
    id: {
      title: 'Tes Speaker Online – Cek Kiri, Kanan, Bass & Frekuensi | FixedAim',
      description: 'Tes speaker dan headphone online gratis. Periksa channel kiri dan kanan, bass, sapuan frekuensi, dan fase dalam hitungan detik.',
    },
    ru: {
      title: 'Тест Динамиков Онлайн – Левый, Правый, Бас и Частоты | FixedAim',
      description: 'Бесплатный тест колонок и наушников онлайн. Проверьте левый и правый каналы, бас, частотный диапазон, розовый шум и фазу.',
    },
    ar: {
      title: 'اختبار السماعات أونلاين – فحص اليسار واليمين والباس والترددات | FixedAim',
      description: 'اختبار مجاني للسماعات وسماعات الرأس أونلاين. افحص القناة اليسرى واليمنى والباس وتدرج الترددات والطور في ثوانٍ.',
    },
    ko: {
      title: '스피커 테스트 온라인 – 좌우 채널, 베이스 및 주파수 확인 | FixedAim',
      description: '무료 온라인 스피커 및 헤드폰 테스트. 좌우 채널, 저음 베이스, 주파수 스윕, 핑크 노이즈, 위상을 몇 초 만에 점검하세요.',
    },
  },
  'dead-pixel-test': {
    en: {
      title: 'Dead Pixel Test - Check Stuck, Hot & Dead Screen Pixels | FixedAim',
      description: 'Free online dead pixel test for monitors, laptops, and phones. Inspect stuck, hot, and dead pixels with solid color screens and a built-in pixel fixer.',
    },
    es: {
      title: 'Test de Píxeles Muertos - Detectar Píxeles Dañados | FixedAim',
      description: 'Test gratuito de píxeles muertos para monitores, portátiles y móviles. Detecta píxeles atascados o muertos con pantallas de colores y reparador.',
    },
    pt: {
      title: 'Teste de Dead Pixel - Verificar Pixels Mortos na Tela | FixedAim',
      description: 'Teste grátis de pixels mortos para monitores, notebooks e celulares. Inspecione pixels travados e mortos com telas sólidas.',
    },
    de: {
      title: 'Pixelfehler-Test - Tote & Hängende Pixel Prüfen | FixedAim',
      description: 'Kostenloser Pixelfehler-Test für Monitore, Laptops und Handys. Finde tote oder hängende Pixel mit Vollbildfarben und Pixel-Fixer.',
    },
    fr: {
      title: 'Test Pixels Morts - Vérifier Votre Écran en Ligne | FixedAim',
      description: 'Test gratuit de pixels morts pour écrans, ordinateurs portables et téléphones. Détectez pixels bloqués ou morts avec outil de réparation.',
    },
    ja: {
      title: 'ドット抜けテスト - 画面の常時点灯・黒点チェック | FixedAim',
      description: 'モニター、ノートPC、スマホ用の無料ドット抜けテスト。単色全画面表示で輝点・滅点を検査し、修復ツールも利用可能。',
    },
    id: {
      title: 'Tes Dead Pixel - Cek Piksel Mati & Macet di Layar | FixedAim',
      description: 'Tes dead pixel online gratis untuk monitor, laptop, dan ponsel. Periksa piksel mati atau macet dengan layar warna solid.',
    },
    ru: {
      title: 'Тест Битых Пикселей - Проверка Экрана Онлайн | FixedAim',
      description: 'Бесплатный тест битых и застрявших пикселей для мониторов, ноутбуков и телефонов с заливкой цветами и функцией восстановления.',
    },
    ar: {
      title: 'اختبار البكسلات الميتة - فحص عيوب الشاشة أونلاين | FixedAim',
      description: 'اختبار مجاني للبكسلات الميتة للشاشات واللابتوب والهواتف. افحص البكسلات العالقة والميتة بشاشات ألوان كاملة وأداة إصلاح مدمجة.',
    },
    ko: {
      title: '불량 화소 테스트 - 모니터 데드 픽셀 확인 | FixedAim',
      description: '모니터, 노트북, 스마트폰용 무료 불량 화소 테스트. 단색 전체 화면으로 데드 픽셀과 스턱 픽셀을 검사하고 복구해 보세요.',
    },
  },
  'hz-test': {
    en: {
      title: 'Screen Refresh Rate (Hz) & Page Speed Test Online | FixedAim',
      description: 'Free online screen refresh rate (Hz) test and page speed audit. Test monitor Hz, FPS, input delay, reaction time, Core Web Vitals, and CPU performance.',
    },
    es: {
      title: 'Test de Tasa de Refresco (Hz) y FPS del Monitor | FixedAim',
      description: 'Test gratuito de frecuencia de actualización (Hz) y rendimiento. Mide los Hz del monitor, FPS, latencia de entrada y CPU online.',
    },
    pt: {
      title: 'Teste de Taxa de Atualização (Hz) e FPS do Monitor | FixedAim',
      description: 'Teste grátis de taxa de atualização (Hz) online. Verifique os Hz do monitor, FPS, atraso de entrada e desempenho da CPU.',
    },
    de: {
      title: 'Bildwiederholrate (Hz) & FPS Monitor-Test Online | FixedAim',
      description: 'Kostenloser Monitor-Hz- und Geschwindigkeitstest online. Prüfe Bildwiederholrate (Hz), FPS, Input-Delay und CPU-Leistung.',
    },
    fr: {
      title: 'Test Fréquence Écran (Hz) et FPS en Ligne | FixedAim',
      description: 'Test gratuit de taux de rafraîchissement (Hz) en ligne. Vérifiez les Hz de votre écran, FPS, latence d’entrée et CPU.',
    },
    ja: {
      title: 'リフレッシュレート (Hz) ＆FPS測定テスト | FixedAim',
      description: '無料のモニターリフレッシュレート（Hz）テスト。画面のHz、FPS、入力遅延、CPUパフォーマンスをリアルタイム計測。',
    },
    id: {
      title: 'Tes Refresh Rate Layar (Hz) & FPS Monitor Online | FixedAim',
      description: 'Tes refresh rate monitor (Hz) online gratis. Ukur Hz layar, FPS, input delay, dan performa CPU secara instan.',
    },
    ru: {
      title: 'Тест Герцовки Экрана (Hz) и FPS Монитора Онлайн | FixedAim',
      description: 'Бесплатный онлайн-тест частоты обновления экрана (Hz). Проверьте герцовку монитора, FPS, задержку ввода и производительность.',
    },
    ar: {
      title: 'اختبار معدل تحديث الشاشة (Hz) و FPS أونلاين | FixedAim',
      description: 'اختبار مجاني لمعدل تحديث الشاشة (Hz) والسرعة أونلاين. افحص تردد الشاشة، FPS، تأخر الإدخال، وأداء المعالج.',
    },
    ko: {
      title: '화면 주사율 (Hz) 및 FPS 테스트 온라인 | FixedAim',
      description: '무료 온라인 모니터 주사율(Hz) 테스트. 모니터 Hz, FPS, 입력 지연, CPU 성능을 실시간으로 측정하세요.',
    },
  },
  'memory-test': {
    en: {
      title: 'Free Online Memory Test: 4 Brain Games to Train Memory | FixedAim',
      description: 'Take the free memory test on FixedAim. Play four online memory games: card match, pattern echo, number span and spatial recall. Track your best scores and train your focus.',
    },
    es: {
      title: 'Test de Memoria Online Gratis: 4 Juegos Mentales | FixedAim',
      description: 'Realiza el test de memoria gratis en FixedAim. Juega cuatro retos mentales: parejas, secuencia de patrones, números y memoria espacial.',
    },
    pt: {
      title: 'Teste de Memória Online Grátis: 4 Jogos Cerebrais | FixedAim',
      description: 'Faça o teste de memória grátis no FixedAim. Jogue 4 desafios: pares de cartas, eco de padrões, números e memória espacial.',
    },
    de: {
      title: 'Kostenloser Gedächtnistest: 4 Gehirntraining-Spiele | FixedAim',
      description: 'Mache den kostenlosen Gedächtnistest auf FixedAim. Vier Spiele für Konzentration: Kartenpaare, Muster-Echo, Zahlenspanne und Raumgedächtnis.',
    },
    fr: {
      title: 'Test de Mémoire Gratuit en Ligne : 4 Jeux Cérébraux | FixedAim',
      description: 'Faites le test de mémoire gratuit sur FixedAim : paires de cartes, écho de motifs, suite de chiffres et mémoire spatiale.',
    },
    ja: {
      title: '無料記憶力テスト：脳を鍛える4つの記憶ゲーム | FixedAim',
      description: 'FixedAimの無料記憶力テスト。カード合わせ、パターン記憶、数字スパン、空間記憶の4つのゲームで集中力と記憶力を鍛えよう。',
    },
    id: {
      title: 'Tes Memori Online Gratis: 4 Game Latih Otak | FixedAim',
      description: 'Ikuti tes memori gratis di FixedAim. Mainkan 4 game memori: cocokkan kartu, pola, urutan angka, dan ingatan spasial.',
    },
    ru: {
      title: 'Бесплатный Тест Памяти: 4 Игры для Тренировки Мозга | FixedAim',
      description: 'Пройдите бесплатный тест памяти на FixedAim. Четыре режима: поиск пар, повтор паттернов, запоминание чисел и пространственная память.',
    },
    ar: {
      title: 'اختبار الذاكرة المجاني أونلاين: 4 ألعاب لتقوية التركيز | FixedAim',
      description: 'خض اختبار الذاكرة المجاني على FixedAim. العب 4 ألعاب لتدريب العقل: مطابقة البطاقات، تسلسل الأنماط، حفظ الأرقام، والذاكرة المكانية.',
    },
    ko: {
      title: '무료 온라인 기억력 테스트: 4가지 두뇌 트레이닝 게임 | FixedAim',
      description: 'FixedAim의 무료 기억력 테스트에 도전하세요. 카드 짝 맞추기, 패턴 기억, 숫자 암기, 공간 기억 4가지 게임으로 집중력을 키우세요.',
    },
  },
  'space-defense': {
    en: {
      title: 'Space Defense - Meteor Shooter & CPS Aim Game | FixedAim',
      description: 'Defend your spaceship from meteor swarms in this arcade shooter. Train your CPS, flick aim, and reflexes with boss battles, 5 power-ups, and custom modes.',
    },
    es: {
      title: 'Space Defense - Juego Arcade de Puntería y CPS | FixedAim',
      description: 'Defiende tu nave de lluvias de meteoritos. Entrena tu CPS, flick aim y reflejos con batallas contra jefes y potenciadores.',
    },
    pt: {
      title: 'Space Defense - Jogo Arcade de Mira e CPS | FixedAim',
      description: 'Defenda sua nave contra chuvas de meteoros. Treine seu CPS, flick aim e reflexos com chefes e power-ups.',
    },
    de: {
      title: 'Space Defense - Meteor Shooter & CPS Aim-Spiel | FixedAim',
      description: 'Verteidige dein Raumschiff vor Meteoritenschwärmen. Trainiere CPS, Flick-Aim und Reflexe mit Bosskämpfen und Power-ups.',
    },
    fr: {
      title: 'Space Defense - Jeu Arcade de Visée et CPS | FixedAim',
      description: 'Défendez votre vaisseau contre des pluies de météorites. Entraînez votre CPS, flick aim et vos réflexes avec des boss.',
    },
    ja: {
      title: 'スペースディフェンス - 隕石シューター＆CPSエイムゲーム | FixedAim',
      description: '迫りくる隕石群から宇宙船を防衛せよ。ボス戦やパワーアップを楽しみながらCPS・フリックエイム・反射神経を鍛えるゲーム。',
    },
    id: {
      title: 'Space Defense - Game Tembak Meteor & Latih CPS Aim | FixedAim',
      description: 'Pertahankan pesawat luar angkasa Anda dari hujan meteor. Latih CPS, flick aim, dan refleks dengan pertarungan bos dan power-up.',
    },
    ru: {
      title: 'Space Defense - Космический Шутер для CPS и Аима | FixedAim',
      description: 'Защитите корабль от метеоритных роев. Тренируйте CPS, флик-аим и рефлексы в битвах с боссами и бонусами.',
    },
    ar: {
      title: 'Space Defense - لعبة تصويب النيازك وتدريب CPS | FixedAim',
      description: 'دافع عن مركبتك الفضائية ضد أسراب النيازك. تدرّب على CPS والتصويب السريع وردود الفعل مع معارك الزعماء.',
    },
    ko: {
      title: '스페이스 디펜스 - 운석 슈팅 & CPS 에임 게임 | FixedAim',
      description: '운석 떼로부터 우주선을 방어하세요. 보스전과 파워업을 즐기며 CPS, 플릭 에임, 반사 신경을 훈련할 수 있습니다.',
    },
  },
  'voyager-game': {
    en: {
      title: 'Voyager Game - Space Endurance Arcade & CPS Trainer | FixedAim',
      description: 'Navigate the Voyager spaceship through cosmic asteroid fields. Boost your CPS and reflex endurance with power-ups, boss battles, and unlockable achievements.',
    },
    es: {
      title: 'Voyager Game - Arcade Espacial y Entrenador CPS | FixedAim',
      description: 'Pilota la nave Voyager entre campos de asteroides. Mejora tu resistencia CPS y reflejos con potenciadores, jefes y logros.',
    },
    pt: {
      title: 'Voyager Game - Arcade Espacial e Treinador de CPS | FixedAim',
      description: 'Guie a nave Voyager por campos de asteroides. Aumente sua resistência de CPS e reflexos com chefes e conquistas.',
    },
    de: {
      title: 'Voyager Game - Weltraum-Arcade & CPS-Ausdauertrainer | FixedAim',
      description: 'Steuere die Voyager durch Asteroidenfelder. Verbessere deine CPS-Ausdauer und Reflexe mit Power-ups und Bosskämpfen.',
    },
    fr: {
      title: 'Voyager Game - Arcade Spatiale et Entraînement CPS | FixedAim',
      description: 'Pilotez le vaisseau Voyager à travers des champs d’astéroïdes. Boostez votre endurance CPS et vos réflexes.',
    },
    ja: {
      title: 'ボイジャーゲーム - 宇宙耐久アーケード＆CPSトレーナー | FixedAim',
      description: '小惑星帯を駆け抜けるボイジャー宇宙船ゲーム。パワーアップやボス戦を通じてCPS持久力と反射神経を鍛えよう。',
    },
    id: {
      title: 'Voyager Game - Arcade Ketahanan Luar Angkasa & CPS | FixedAim',
      description: 'Kendalikan pesawat Voyager melewati medan asteroid. Tingkatkan daya tahan CPS dan refleks dengan power-up dan bos.',
    },
    ru: {
      title: 'Voyager Game - Космическая Аркада и Тренажер CPS | FixedAim',
      description: 'Проведите корабль Voyager через астероидные поля. Прокачайте выносливость CPS и рефлексы с бонусами и боссами.',
    },
    ar: {
      title: 'لعبة Voyager - أركيد الفضاء وتدريب تحمل CPS | FixedAim',
      description: 'وجّه مركبة Voyager عبر حقول الكويكبات. طوّر قوة تحمل CPS وردود أفعالك مع معارك الزعماء والإنجازات.',
    },
    ko: {
      title: '보이저 게임 - 우주 내구 아케이드 & CPS 트레이너 | FixedAim',
      description: '소행성 지대를 통과해 보이저 우주선을 조종하세요. 파워업과 보스전으로 CPS 지구력과 반사 신경을 향상시키세요.',
    },
  },
  'f1-reaction': {
    en: {
      title: 'F1 Reaction Test - Formula 1 Race Start Simulator | FixedAim',
      description: 'Simulate an authentic F1 lights-out race start. Measure your reaction time in milliseconds like a real Formula 1 driver.',
    },
    es: {
      title: 'Test de Reacción F1 - Simulador de Salida Fórmula 1 | FixedAim',
      description: 'Simula una salida oficial de F1 al apagarse las luces. Mide tu tiempo de reacción en milisegundos como un piloto de Fórmula 1.',
    },
    pt: {
      title: 'Teste de Reação F1 - Simulador de Largada Fórmula 1 | FixedAim',
      description: 'Simule uma largada real de F1 quando as luzes se apagam. Meça seu tempo de reação em milissegundos como um piloto.',
    },
    de: {
      title: 'F1 Reaktionstest - Formel-1 Rennstart Simulator | FixedAim',
      description: 'Simuliere einen echten F1-Rennstart beim Erlöschen der Ampeln. Miss deine Reaktionszeit in Millisekunden wie ein Formel-1-Fahrer.',
    },
    fr: {
      title: 'Test de Réaction F1 - Simulateur de Départ Formule 1 | FixedAim',
      description: 'Simulez un vrai départ de F1 à l’extinction des feux. Mesurez votre temps de réaction en millisecondes comme un pilote.',
    },
    ja: {
      title: 'F1反応速度テスト - フォーミュラ1スタートシミュレーター | FixedAim',
      description: '本格的なF1シグナルブラックアウトを再現。本物のF1ドライバーのようにミリ秒単位でスタート反応速度を計測しよう。',
    },
    id: {
      title: 'Tes Reaksi F1 - Simulator Start Balapan Formula 1 | FixedAim',
      description: 'Simulasikan start balapan F1 asli saat lampu padam. Ukur waktu reaksi Anda dalam milidetik seperti pembalap Formula 1.',
    },
    ru: {
      title: 'F1 Тест Реакции - Симулятор Старта Формулы 1 | FixedAim',
      description: 'Симулируйте настоящий старт гонки Ф1 по погасшим огням. Измерьте время реакции в миллисекундах как пилот Формулы 1.',
    },
    ar: {
      title: 'اختبار رد فعل F1 - محاكي انطلاقة سباق فورمولا 1 | FixedAim',
      description: 'جرّب محاكاة حقيقية لانطلاقة سباق F1 عند انطفاء الأضواء. قس سرعة رد فعلك بالمللي ثانية كسائق فورمولا 1.',
    },
    ko: {
      title: 'F1 반응 속도 테스트 - 포뮬러 1 스타트 시뮬레이터 | FixedAim',
      description: '실제 F1 레이스 스타트 신호를 시뮬레이션하세요. F1 드라이버처럼 밀리초 단위로 출발 반응 시간을 측정해 보세요.',
    },
  },
  'cps-rush': {
    en: {
      title: 'CPS Rush - Click Speed Platformer Game | FixedAim',
      description: 'Play CPS Rush online — power your runner\'s speed and jump height with your CPS. Master jitter clicking and butterfly clicking in this intense click speed game.',
    },
    es: {
      title: 'CPS Rush - Juego de Plataformas y Velocidad de Clic | FixedAim',
      description: 'Juega CPS Rush online: impulsa la velocidad y salto de tu corredor con tus CPS. Domina jitter clicking y butterfly clicking.',
    },
    pt: {
      title: 'CPS Rush - Jogo de Plataforma de Velocidade de Clique | FixedAim',
      description: 'Jogue CPS Rush online — controle velocidade e salto com seus CPS. Domine jitter clicking e butterfly clicking neste desafio.',
    },
    de: {
      title: 'CPS Rush - Klickgeschwindigkeits-Platformer | FixedAim',
      description: 'Spiele CPS Rush online: Treibe Tempo und Sprunghöhe deines Läufers mit deinen CPS an. Meistere Jitter- und Butterfly-Clicking.',
    },
    fr: {
      title: 'CPS Rush - Jeu de Plateforme et Vitesse de Clic | FixedAim',
      description: 'Jouez à CPS Rush en ligne : propulsez votre coureur grâce à votre CPS. Maîtrisez le jitter clicking et butterfly clicking.',
    },
    ja: {
      title: 'CPSラッシュ - クリック速度プラットフォームゲーム | FixedAim',
      description: 'クリック速度（CPS）がランナーのスピードとジャンプ力になるアクションゲーム。ジッターやバタフライクリックを極めよう。',
    },
    id: {
      title: 'CPS Rush - Game Platformer Kecepatan Klik | FixedAim',
      description: 'Mainkan CPS Rush online — tenagai kecepatan dan lompatan pelari dengan CPS Anda. Kuasai jitter clicking dan butterfly clicking.',
    },
    ru: {
      title: 'CPS Rush - Платформер на Скорость Клика | FixedAim',
      description: 'Играйте в CPS Rush онлайн — скорость и высота прыжка зависят от вашего CPS. Освойте jitter и butterfly clicking.',
    },
    ar: {
      title: 'CPS Rush - لعبة منصات تعتمد على سرعة النقر | FixedAim',
      description: 'العب CPS Rush أونلاين — عزز سرعة العداء وارتفاع قفزه بمعدل CPS الخاص بك. أتقن Jitter و Butterfly Clicking.',
    },
    ko: {
      title: 'CPS 러시 - 클릭 속도 플랫포머 게임 | FixedAim',
      description: '온라인에서 CPS 러시를 플레이하세요 — CPS로 캐릭터의 속도와 점프력을 높이고 지터 및 버터플라이 클릭을 마스터하세요.',
    },
  },
  'apm-drill': {
    en: {
      title: 'APM Drill - Actions Per Minute Speed Test Online | FixedAim',
      description: 'Measure your actions per minute with surgical precision. Free online APM speed test and drill with real-time analytics, grid modes, and keyboard speed trainer.',
    },
    es: {
      title: 'APM Drill - Test de Acciones Por Minuto Online | FixedAim',
      description: 'Mide tus acciones por minuto (APM) con precisión quirúrgica. Entrenamiento APM gratis con analíticas en vivo y modos de cuadrícula.',
    },
    pt: {
      title: 'APM Drill - Teste de Ações Por Minuto Online | FixedAim',
      description: 'Meça suas ações por minuto (APM) com precisão cirúrgica. Treino APM grátis com gráficos em tempo real e modos de grade.',
    },
    de: {
      title: 'APM Drill - Actions Per Minute Speedtest Online | FixedAim',
      description: 'Miss deine Actions Per Minute (APM) präzise. Kostenloser APM-Test und Drill mit Live-Analyse, Rastermodi und Tastatur-Speedtrainer.',
    },
    fr: {
      title: 'APM Drill - Test Actions Par Minute en Ligne | FixedAim',
      description: 'Mesurez vos actions par minute (APM) avec précision. Test et entraînement APM gratuit avec analyses en direct et modes grille.',
    },
    ja: {
      title: 'APMドリル - 1分間アクション数（APM）測定ツール | FixedAim',
      description: 'APM（Actions Per Minute）を精密に計測。リアルタイム分析、グリッドモード、キーボード速度トレーニングを備えた無料ツール。',
    },
    id: {
      title: 'APM Drill - Tes Kecepatan Aksi Per Menit Online | FixedAim',
      description: 'Ukur aksi per menit (APM) Anda dengan presisi tinggi. Latihan dan tes APM gratis dengan analitik langsung dan mode grid.',
    },
    ru: {
      title: 'APM Drill - Тест Действий в Минуту Онлайн | FixedAim',
      description: 'Измерьте свои действия в минуту (APM) с высокой точностью. Бесплатный APM-тренажер с аналитикой в реальном времени и сеткой.',
    },
    ar: {
      title: 'APM Drill - اختبار الإجراءات في الدقيقة أونلاين | FixedAim',
      description: 'قس معدل الإجراءات في الدقيقة (APM) بدقة متناهية. تمرين APM مجاني مع تحليلات فورية وأوضاع شبكة وتدريب سرعة لوحة المفاتيح.',
    },
    ko: {
      title: 'APM 드릴 - 분당 행동 수 속도 테스트 온라인 | FixedAim',
      description: '분당 행동 수(APM)를 정밀하게 측정하세요. 실시간 분석, 그리드 모드, 키보드 속도 훈련을 제공하는 무료 온라인 APM 테스트입니다.',
    },
  },
  'space-waves': {
    en: {
      title: 'Space Waves - Arcade Dodge & Timing Game | FixedAim',
      description: 'Play Space Waves online — a fast-paced geometric dodging arcade game. Time your wave frequency and elevation to navigate through challenging cosmic obstacles.',
    },
    es: {
      title: 'Space Waves - Juego Arcade de Esquivar y Ritmo | FixedAim',
      description: 'Juega Space Waves online: un arcade geométrico rápido donde debes controlar la onda y esquivar obstáculos cósmicos con precisión.',
    },
    pt: {
      title: 'Space Waves - Jogo Arcade de Desvio e Timing | FixedAim',
      description: 'Jogue Space Waves online — um jogo arcade geométrico veloz. Controle a onda com timing perfeito para desviar dos obstáculos.',
    },
    de: {
      title: 'Space Waves - Arcade Ausweich- & Timing-Spiel | FixedAim',
      description: 'Spiele Space Waves online: ein rasantes geometrisches Arcade-Spiel. Steuere die Welle mit perfektem Timing durch kosmische Hindernisse.',
    },
    fr: {
      title: 'Space Waves - Jeu Arcade d’Esquive et Timing | FixedAim',
      description: 'Jouez à Space Waves en ligne : un jeu d’arcade géométrique rapide. Maîtrisez le timing de votre vague pour éviter les obstacles.',
    },
    ja: {
      title: 'スペースウェーブ - アーケード回避＆タイミングゲーム | FixedAim',
      description: 'オンラインでSpace Wavesをプレイ。幾何学的な宇宙の障害物を波の動きとタイミング操作で駆け抜けるハイスピードゲーム。',
    },
    id: {
      title: 'Space Waves - Game Arcade Menghindar & Timing | FixedAim',
      description: 'Mainkan Space Waves online — game arcade geometris cepat. Atur timing gelombang Anda untuk melewati rintangan kosmik.',
    },
    ru: {
      title: 'Space Waves - Аркада на Уклонение и Тайминг | FixedAim',
      description: 'Играйте в Space Waves онлайн — динамичную геометрическую аркаду. Управляйте волной с точным таймингом среди космических преград.',
    },
    ar: {
      title: 'Space Waves - لعبة أركيد المراوغة والتوقيت | FixedAim',
      description: 'العب Space Waves أونلاين — لعبة أركيد هندسية سريعة. اضبط توقيت الموجة لتفادي العقبات الفضائية بدقة.',
    },
    ko: {
      title: '스페이스 웨이브 - 아케이드 회피 & 타이밍 게임 | FixedAim',
      description: '온라인에서 Space Waves를 플레이하세요 — 빠른 템포의 기하학 아케이드 게임에서 파동 타이밍을 맞춰 장애물을 피하세요.',
    },
  },
  'blog': {
    en: {
      title: 'FixedAim Blog - Gaming Guides, Reflex Tips & Benchmark Updates',
      description: 'Explore pro gaming guides, reflex improvement strategies, hardware calibration tips, and benchmark updates from the esports engineering team at FixedAim.',
    },
    es: {
      title: 'Blog de FixedAim - Guías Gaming, Reflejos y Hardware',
      description: 'Explora guías pro gaming, estrategias para mejorar reflejos, calibración de hardware y novedades de FixedAim.',
    },
    pt: {
      title: 'Blog FixedAim - Guias Gamer, Reflexos e Hardware',
      description: 'Explore guias profissionais de gaming, dicas de reflexo, calibração de periféricos e atualizações de benchmark no FixedAim.',
    },
    de: {
      title: 'FixedAim Blog - Gaming-Guides, Reflex-Tipps & Benchmarks',
      description: 'Entdecke Pro-Gaming-Guides, Strategien für schnellere Reflexe, Hardware-Kalibrierung und Benchmark-Updates von FixedAim.',
    },
    fr: {
      title: 'Blog FixedAim - Guides Gaming, Réflexes et Matériel',
      description: 'Découvrez des guides gaming pro, conseils pour améliorer vos réflexes, calibration matérielle et actualités FixedAim.',
    },
    ja: {
      title: 'FixedAimブログ - ゲーミングガイド・反射神経・デバイス知識',
      description: 'プロゲーミングガイド、反射神経向上トレーニング、デバイスの最適化、ベンチマーク最新情報をFixedAimチームがお届けします。',
    },
    id: {
      title: 'Blog FixedAim - Panduan Gaming, Tips Refleks & Benchmark',
      description: 'Jelajahi panduan gaming pro, strategi melatih refleks, tips kalibrasi hardware, dan pembaruan benchmark dari tim FixedAim.',
    },
    ru: {
      title: 'Блог FixedAim - Гайды по Геймингу, Реакции и Железу',
      description: 'Читайте профессиональные гайды по геймингу, советы по развитию реакции, настройке периферии и новости от команды FixedAim.',
    },
    ar: {
      title: 'مدونة FixedAim - أدلة الألعاب ونصائح رد الفعل والعتاد',
      description: 'استكشف أدلة الألعاب الاحترافية، استراتيجيات تحسين رد الفعل، نصائح معايرة الأجهزة، وتحديثات الأداء من فريق FixedAim.',
    },
    ko: {
      title: 'FixedAim 블로그 - 게이밍 가이드, 반응속도 팁 및 벤치마크',
      description: '프로 게이밍 가이드, 반사 신경 향상 전략, 하드웨어 보정 팁, FixedAim 벤치마크 업데이트를 확인하세요.',
    },
  },
  'contact': {
    en: {
      title: 'Contact Us - Feedback, Inquiries & Support | FixedAim',
      description: 'Have questions, suggestions, or bug reports? Contact the FixedAim team to get support, share feedback, or inquire about our free gaming benchmark suite.',
    },
    es: {
      title: 'Contacto - Soporte, Sugerencias y Consultas | FixedAim',
      description: '¿Tienes dudas, sugerencias o reportes de errores? Contacta con el equipo de FixedAim para recibir soporte o enviar comentarios.',
    },
    pt: {
      title: 'Contato - Suporte, Sugestões e Feedback | FixedAim',
      description: 'Tem dúvidas, sugestões ou encontrou um bug? Entre em contato com a equipe do FixedAim para suporte ou feedback.',
    },
    de: {
      title: 'Kontakt - Support, Feedback & Anfragen | FixedAim',
      description: 'Fragen, Vorschläge oder Fehlermeldungen? Kontaktiere das FixedAim-Team für Support, Feedback oder allgemeine Anfragen.',
    },
    fr: {
      title: 'Contact - Support, Suggestions et Demandes | FixedAim',
      description: 'Des questions, suggestions ou bugs à signaler ? Contactez l’équipe FixedAim pour obtenir de l’aide ou partager votre avis.',
    },
    ja: {
      title: 'お問い合わせ - サポート・ご意見・ご要望 | FixedAim',
      description: 'ご質問、ご提案、不具合の報告はFixedAimチームまでお気軽にお問い合わせください。',
    },
    id: {
      title: 'Hubungi Kami - Dukungan, Masukan & Pertanyaan | FixedAim',
      description: 'Punya pertanyaan, saran, atau laporan bug? Hubungi tim FixedAim untuk dukungan dan masukan terkait alat benchmark kami.',
    },
    ru: {
      title: 'Контакты - Поддержка, Отзывы и Предложения | FixedAim',
      description: 'Есть вопросы, предложения или сообщения об ошибках? Свяжитесь с командой FixedAim для получения поддержки и обратной связи.',
    },
    ar: {
      title: 'اتصل بنا - الدعم الفني والملاحظات والاستفسارات | FixedAim',
      description: 'هل لديك أسئلة أو اقتراحات أو بلاغات عن أخطاء؟ تواصل مع فريق FixedAim للحصول على الدعم ومشاركة رأيك.',
    },
    ko: {
      title: '문의하기 - 피드백, 질문 및 지원 | FixedAim',
      description: '질문, 제안 또는 버그 제보가 있으신가요? FixedAim 팀에 연락해 지원과 피드백을 공유해 주세요.',
    },
  },
  'privacy-policy': {
    en: {
      title: 'Privacy Policy - Data Protection & Security | FixedAim',
      description: 'Read the FixedAim Privacy Policy to understand how we collect, use, and protect your information across our free gaming benchmark and reflex test platform.',
    },
    es: {
      title: 'Política de Privacidad - Protección de Datos | FixedAim',
      description: 'Lee la Política de Privacidad de FixedAim para saber cómo recopilamos, usamos y protegemos tu información en nuestra plataforma.',
    },
    pt: {
      title: 'Política de Privacidade - Proteção de Dados | FixedAim',
      description: 'Leia a Política de Privacidade do FixedAim para entender como coletamos, usamos e protegemos suas informações.',
    },
    de: {
      title: 'Datenschutzerklärung - Datenschutz & Sicherheit | FixedAim',
      description: 'Lies die Datenschutzerklärung von FixedAim, um zu erfahren, wie wir Daten auf unserer kostenlosen Benchmark-Plattform schützen.',
    },
    fr: {
      title: 'Politique de Confidentialité - Protection des Données | FixedAim',
      description: 'Consultez la Politique de Confidentialité de FixedAim pour comprendre comment nous protégeons vos données sur notre plateforme.',
    },
    ja: {
      title: 'プライバシーポリシー - 個人情報保護方針 | FixedAim',
      description: 'FixedAimのプライバシーポリシーをご確認ください。無料ゲームベンチマークプラットフォームにおけるデータ保護方針を説明します。',
    },
    id: {
      title: 'Kebijakan Privasi - Perlindungan & Keamanan Data | FixedAim',
      description: 'Baca Kebijakan Privasi FixedAim untuk memahami bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.',
    },
    ru: {
      title: 'Политика Конфиденциальности - Защита Данных | FixedAim',
      description: 'Ознакомьтесь с Политикой Конфиденциальности FixedAim: как мы собираем, используем и защищаем информацию пользователей.',
    },
    ar: {
      title: 'سياسة الخصوصية - حماية البيانات والأمان | FixedAim',
      description: 'اقرأ سياسة الخصوصية الخاصة بـ FixedAim لمعرفة كيفية جمع معلوماتك واستخدامها وحمايتها عبر منصتنا المجانية.',
    },
    ko: {
      title: '개인정보 처리방침 - 데이터 보호 및 보안 | FixedAim',
      description: 'FixedAim 개인정보 처리방침을 읽고 무료 게이밍 벤치마크 플랫폼에서 정보를 수집, 사용 및 보호하는 방법을 확인하세요.',
    },
  },
  'terms': {
    en: {
      title: 'Terms of Service - User Agreement & Rules | FixedAim',
      description: 'Read the FixedAim Terms of Service. Understand the rules, user agreements, and acceptable use policies governing our free online gaming benchmark tools.',
    },
    es: {
      title: 'Términos de Servicio - Acuerdo de Usuario y Reglas | FixedAim',
      description: 'Lee los Términos de Servicio de FixedAim. Conoce las reglas, acuerdos de usuario y políticas de uso de nuestras herramientas.',
    },
    pt: {
      title: 'Termos de Serviço - Acordo de Usuário e Regras | FixedAim',
      description: 'Leia os Termos de Serviço do FixedAim. Entenda as regras, acordos de usuário e políticas de uso aceitável da plataforma.',
    },
    de: {
      title: 'Nutzungsbedingungen - Regeln & Vereinbarungen | FixedAim',
      description: 'Lies die Nutzungsbedingungen von FixedAim. Erfahre mehr über Regeln, Vereinbarungen und Richtlinien für unsere Online-Tools.',
    },
    fr: {
      title: 'Conditions d’Utilisation - Règles et Accord Utilisateur | FixedAim',
      description: 'Consultez les Conditions d’Utilisation de FixedAim pour connaître les règles et politiques encadrant nos outils en ligne.',
    },
    ja: {
      title: '利用規約 - ユーザー規約とルール | FixedAim',
      description: 'FixedAimの利用規約をご確認ください。無料オンラインベンチマークツールのご利用に関する規約とルールを定めています。',
    },
    id: {
      title: 'Ketentuan Layanan - Perjanjian & Aturan Pengguna | FixedAim',
      description: 'Baca Ketentuan Layanan FixedAim untuk memahami aturan, perjanjian pengguna, dan kebijakan penggunaan alat benchmark kami.',
    },
    ru: {
      title: 'Условия Использования - Пользовательское Соглашение | FixedAim',
      description: 'Прочитайте Условия Использования FixedAim: правила, соглашения и допустимое использование наших бесплатных онлайн-инструментов.',
    },
    ar: {
      title: 'شروط الخدمة - اتفاقية المستخدم والقواعد | FixedAim',
      description: 'اقرأ شروط الخدمة الخاصة بـ FixedAim لفهم القواعد واتفاقيات المستخدم وسياسات الاستخدام المقبول لأدواتنا المجانية.',
    },
    ko: {
      title: '이용약관 - 사용자 계약 및 규칙 | FixedAim',
      description: 'FixedAim 이용약관을 확인하세요. 무료 온라인 게이밍 벤치마크 도구 이용에 적용되는 규칙과 정책을 안내합니다.',
    },
  },
};
