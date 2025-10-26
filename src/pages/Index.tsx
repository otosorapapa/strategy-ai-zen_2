import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { submitContactForm } from "@/lib/contact-api";

import "../../styles/lp.css";

const sections = [
  { id: "hero", label: "トップ" },
  { id: "roles", label: "役割分担" },
  { id: "why-now", label: "なぜ今" },
  { id: "quarterly", label: "四半期レビュー" },
  { id: "pain", label: "課題" },
  { id: "process", label: "プロセス" },
  { id: "stories", label: "成功事例" },
  { id: "resources", label: "資料" },
  { id: "pricing", label: "料金" },
  { id: "faq", label: "FAQ" },
  { id: "security", label: "セキュリティ" },
  { id: "contact", label: "お問い合わせ" },
];

const heroMetrics = [
  {
    label: "生成AI導入率",
    note: "情報通信業の生成AI導入率",
    prefix: "",
    suffix: "%",
    target: 35.1,
    decimals: 1,
  },
  {
    label: "年間削減工数",
    note: "生成AI活用による削減期待値",
    prefix: "-",
    suffix: "h",
    target: 1750,
  },
  {
    label: "年間コスト削減",
    note: "生成AI活用によるコスト削減",
    prefix: "-",
    suffix: "万円",
    target: 1000,
  },
];

const responsibilityColumns = [
  {
    id: "ai",
    title: "AIがやること",
    summary: "政策・市場データを収集し、シミュレーションと資料ドラフトを生成。",
    detail:
      "最新の政策動向・市場統計・競合指標をクロールし、財務シミュレーションと想定問答、ドラフト資料を数分で提示します。",
    points: ["外部データの自動収集", "複数シナリオの財務予測", "想定問答と資料ドラフト"],
    icon: "🤖",
  },
  {
    id: "ceo",
    title: "経営者がやること",
    summary: "最終判断と優先順位設定で意思決定をリード。",
    detail:
      "AIの提案を精査し、自社のリスク許容度とビジョンに合わせて意思決定。社内外ステークホルダーへの説明と合意形成を行います。",
    points: ["重点施策の取捨選択", "リスクと投資配分の決定", "意思決定の説明責任"],
    icon: "🧭",
  },
  {
    id: "experts",
    title: "専門家がやること",
    summary: "レビューと伴走支援で実行精度を担保。",
    detail:
      "金融機関・コンサル経験者がAI出力をレビューし、融資や投資審査で求められる水準に仕上げ、実行フェーズも伴走します。",
    points: ["レビューとチューニング", "金融機関連携・交渉支援", "四半期伴走ミーティング"],
    icon: "🧑‍💼",
  },
];

const whyNowEvidence = [
  {
    title: "2024年には企業の65%が生成AIを活用",
    stat: "65%",
    description:
      "生成AIの企業導入率は2024年に65%へ。意思決定プロセスをAIで強化する動きが主流になりつつあります。",
    sourceLabel: "Switch Software (2024)",
    sourceUrl: "https://switchsoftware.io/blog/ai-adoption-statistics-2024",
    sourceNote: "Generative AI Adoption Is Accelerating",
  },
  {
    title: "先行導入企業は主要業務で成果を創出",
    stat: "Top3",
    description:
      "早期導入企業は顧客対応・コンテンツ生成・コード生成で顕著な成果を獲得し、競争優位を確立しています。",
    sourceLabel: "Switch Software (2024)",
    sourceUrl: "https://switchsoftware.io/blog/generative-ai-use-cases",
    sourceNote: "Where Early Adopters See ROI",
  },
  {
    title: "2030年に1.8兆ドル規模のAI市場",
    stat: "1.8兆$",
    description:
      "生成AI市場は2030年までに約1.8兆ドルへ拡大と予測。今のうちに活用体制を整えることが中長期の競争力に直結します。",
    sourceLabel: "Switch Software (2024)",
    sourceUrl: "https://switchsoftware.io/blog/generative-ai-market-outlook",
    sourceNote: "AI Market Outlook to 2030",
  },
  {
    title: "AI支援でコンタクトセンターの生産性+14%",
    stat: "+14%",
    description:
      "Stanford HAIの研究では生成AI支援によりコンタクトセンターの生産性が平均14%向上。経験の浅い担当者ほど効果が大きいと報告されています。",
    sourceLabel: "Stanford HAI (2024)",
    sourceUrl: "https://hai.stanford.edu/news/generative-ai-improves-customer-support-productivity",
    sourceNote: "Generative AI in Contact Centers",
  },
  {
    title: "金融業界では分析とレポート作成を効率化",
    stat: "金融×AI",
    description:
      "OECDは金融業界で生成AIがデータ分析や報告書作成、契約書の翻訳・要約に活用されていると指摘。経営計画にも応用可能です。",
    sourceLabel: "OECD (2024)",
    sourceUrl: "https://www.oecd.org/finance/ai-in-financial-markets.htm",
    sourceNote: "AI in Financial Markets",
  },
];

const quarterlySignals = [
  {
    title: "四半期ごとに再アライン",
    description:
      "Dragonboatは四半期プランニングを長期ビジョンと短期スプリントをつなぐ継続的なアラインメントと定義。プロジェクト羅列ではなく戦略の更新が鍵と説いています。",
    sourceLabel: "Dragonboat (2024)",
    sourceUrl: "https://dragonboat.io/blog/quarterly-planning-guide",
  },
  {
    title: "市場の変化を90日で捉え直す",
    description:
      "急変する市場・政策・金融環境を90日サイクルで分析し直し、計画の陳腐化を防ぎます。AIが外部データを自動集約し、次の四半期案を提案。",
    sourceLabel: "Strategy AI Lab 推計",
  },
  {
    title: "専門家伴走で実行を後押し",
    description:
      "四半期ごとのレビューでは診断士・金融出身者が参加し、AIドラフトに対する人の洞察と金融機関目線での補強を行います。",
    sourceLabel: "伴走支援チーム",
  },
];

const velocitySeries = [
  {
    label: "外部環境の変化指数",
    color: "var(--sky-500)",
    values: [100, 128, 166, 205],
  },
  {
    label: "生成AIアップデート指数",
    color: "var(--mint-500)",
    values: [100, 150, 210, 268],
  },
];

const velocityQuarters = ["2021Q4", "2022Q4", "2023Q4", "2024Q4"];
const velocityMax = Math.max(...velocitySeries.flatMap((series) => series.values));

const painPoints = [
  {
    title: "情報が多すぎて追い切れない",
    detail: "ニュースや補助金情報が溢れ、重要度の判断に時間を奪われます。",
    solution: "AIが重要トピックを要約し、意思決定に直結する指標だけを提示。",
    icon: "📡",
  },
  {
    title: "資料作成に時間がかかる",
    detail: "計画書や金融機関向け資料の整形に多くの時間が割かれています。",
    solution: "ドラフトと図表をAIが生成。専門家チェックで信頼性を担保。",
    icon: "📑",
  },
  {
    title: "最新環境を反映できない",
    detail: "市場変化を反映した計画更新が遅れ、競争力を失うリスクがあります。",
    solution: "ダッシュボードが外部データを自動更新し、シナリオを随時再計算。",
    icon: "⚡",
  },
];

const processSteps = [
  {
    title: "キックオフ",
    description: "経営者の課題とゴールを共有。現状データを安全に受け渡します。",
    aiRole: "必要データのチェックリストを自動生成",
    humanRole: "経営者・専門家が優先順位を調整",
  },
  {
    title: "AIドラフト生成",
    description: "AIが財務シミュレーションと戦略ドラフトを生成します。",
    aiRole: "情報収集・分析・KPI設計",
    humanRole: "経営者が仮説を確認しコメント",
  },
  {
    title: "専門家レビュー",
    description: "元コンサル・金融機関OBが内容の妥当性を検証。",
    aiRole: "フィードバック反映と再計算",
    humanRole: "専門家が修正と伴走支援",
  },
  {
    title: "意思決定・納品",
    description: "経営者が最終判断。金融機関提出用データと資料を納品します。",
    aiRole: "最終資料を整形しエビデンスを添付",
    humanRole: "経営者が意思決定し説明",
  },
];

const processTimeline = [
  {
    stage: "ヒアリング",
    icon: "🗣️",
    aiFocus: "AI: 議事録の自動要約とアクション抽出",
    humanFocus: "経営者×診断士: 経営課題と制約条件を言語化",
  },
  {
    stage: "AI分析",
    icon: "🤖",
    aiFocus: "AI: 外部データ取得・財務シミュレーション・リスク検証",
    humanFocus: "経営者: 取捨選択と優先度の設定",
  },
  {
    stage: "専門家ブラッシュアップ",
    icon: "🧑‍💼",
    aiFocus: "AI: 修正内容を反映し図表と想定問答を更新",
    humanFocus: "診断士: 金融機関目線と実行プランを整備",
  },
  {
    stage: "意思決定",
    icon: "🧭",
    aiFocus: "AI: 最終資料と根拠データを整理",
    humanFocus: "経営者: 意思決定とステークホルダー説明",
  },
];

const successStories = [
  {
    industry: "製造業 / 年商12億円",
    before: "資料更新 80時間 →",
    after: "26時間",
    quote:
      "AIのドラフトが下準備を完了してくれるので、意思決定に集中できる時間が2倍になりました。",
    name: "山田 CFO",
    role: "金属加工メーカー",
    avatarInitials: "KY",
  },
  {
    industry: "ITサービス / 年商5.5億円",
    before: "問答準備 15時間 →",
    after: "5時間",
    quote:
      "専門家のレビュー込みで金融機関の質問を事前に洗い出せたので、調達がスムーズでした。",
    name: "佐藤 代表取締役",
    role: "SaaSスタートアップ",
    avatarInitials: "MS",
  },
  {
    industry: "物流 / 年商9億円",
    before: "戦略更新 6週間 →",
    after: "2週間",
    quote:
      "市場データの自動収集とAIシミュレーションで、機動的に投資判断ができています。",
    name: "鈴木 COO",
    role: "地域物流ネットワーク",
    avatarInitials: "TS",
  },
];

const pricingPlans = [
  {
    name: "ライト",
    price: "月額 15万円〜",
    features: "AIドラフト/月1回、ダッシュボード閲覧、共有テンプレート",
    support: "メールサポート、四半期オンラインレビュー",
    roi: "3倍目標",
    cta: "ライトプランを相談",
  },
  {
    name: "プロ",
    price: "月額 35万円〜",
    features: "AIドラフト隔週、戦略シナリオ比較、金融機関向け資料生成",
    support: "専任コンサル月2回、想定問答サポート",
    roi: "5倍目標",
    cta: "プロプランを相談",
  },
  {
    name: "エンタープライズ",
    price: "月額 65万円〜",
    features: "グループ横断データ連携、カスタムAIモデル、権限管理",
    support: "専任チーム週次伴走、現地ワークショップ",
    roi: "7倍目標",
    cta: "エンタープライズ相談",
  },
];

const securityPoints = [
  {
    title: "AES-256暗号化",
    description: "通信・保存データを銀行水準の暗号化で保護。",
    icon: "🔐",
    badge: "AES-256",
  },
  {
    title: "ISO/IEC 27001取得",
    description: "情報セキュリティマネジメントシステムを国際認証。",
    icon: "🛡️",
    badge: "ISO 27001",
  },
  {
    title: "ISO/IEC 27701取得",
    description: "プライバシー情報管理の国際基準を満たしています。",
    icon: "📜",
    badge: "ISO 27701",
  },
];

const partnerLogos = ["A", "B", "C", "D", "E", "F"];

const expertCards = [
  {
    name: "田中 圭",
    title: "元メガバンク法人融資担当",
    bio: "大型調達案件を多数支援。資本政策と金融機関交渉に精通。",
  },
  {
    name: "小林 真",
    title: "元戦略コンサルティングファーム",
    bio: "事業再生・新規事業開発の戦略立案を20社以上支援。",
  },
  {
    name: "斎藤 美咲",
    title: "公認会計士 / 税理士",
    bio: "補助金・助成金対応と財務モデリングの専門家。",
  },
];

const resourceCards = [
  {
    title: "経営計画ドラフトのサンプル",
    description: "匿名加工したドラフトの一部を公開。AIが生成するアウトプットの粒度をご確認いただけます。",
    cta: "サンプルを請求",
    icon: "📄",
  },
  {
    title: "四半期レビューのチェックリスト",
    description: "外部環境の変化を90日ごとに見直すための観点をまとめたテンプレートを配布しています。",
    cta: "チェックリストを受け取る",
    icon: "✅",
  },
  {
    title: "生成AI活用レポート",
    description: "Generative AIの導入で成果を上げた中堅企業の事例集とリスク対策のまとめ資料です。",
    cta: "レポートをダウンロード",
    icon: "📊",
  },
];

const faqItems = [
  {
    question: "AIに社内データを預けるのが不安です。",
    answer:
      "重要データは国内リージョンで暗号化保管し、専門家もNDAを締結した上でアクセス。AIには必要最小限の情報のみを投入します。",
  },
  {
    question: "生成AIの提案が的外れだった場合は？",
    answer:
      "経営者と専門家がフィードバックを入力するとAIが再計算。Noy & Zhang (2023)が示すように、人の判断でAIの出力品質は大幅に向上します。",
  },
  {
    question: "導入までのリードタイムはどれくらいですか？",
    answer:
      "キックオフから初回ドラフトまで最短2週間。以降は四半期ごとにレビュー会議を設定し、意思決定を高速化します。",
  },
  {
    question: "既存のBIやERPと連携できますか？",
    answer:
      "API連携オプションで主要な会計・SaaSツールと接続可能。データのマッピングは専門家が支援します。",
  },
];

const defaultSimulator = {
  revenueGoal: 8,
  investment: 300,
  automation: 65,
  teamSize: 12,
};

type SimulatorState = typeof defaultSimulator;

type ContactFormState = {
  name: string;
  company: string;
  email: string;
  message: string;
};

const initialContact: ContactFormState = {
  name: "",
  company: "",
  email: "",
  message: "",
};

const Index = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [heroParallax, setHeroParallax] = useState(0);
  const [metricsActive, setMetricsActive] = useState(false);
  const [metricValues, setMetricValues] = useState(() =>
    heroMetrics.map(() => 0)
  );
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [simulator, setSimulator] = useState<SimulatorState>(defaultSimulator);
  const [contactForm, setContactForm] = useState<ContactFormState>(initialContact);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isFloatingHidden, setIsFloatingHidden] = useState(false);

  const metricsRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const simulatorChart = useMemo(() => {
    const baselineHours = 2000;
    const automationRate = simulator.automation / 100;
    const normalizedTeam = Math.max(1, simulator.teamSize) / 12;
    const hoursSaved = 1750 * automationRate * Math.min(1.2, normalizedTeam + 0.3);
    const costSaved = 1000 * automationRate * (0.4 + normalizedTeam);
    const roi = ((costSaved * 100 - simulator.investment) / simulator.investment) * 100;
    const productivityGain = 5 + (25 - 5) * automationRate;

    const chartPoints = [
      simulator.investment / 10,
      costSaved * 4,
      hoursSaved * 2,
      productivityGain * 6,
    ];

    const maxValue = Math.max(...chartPoints, 1);
    const normalized = chartPoints.map((value) => (value / maxValue) * 100);
    const svgPoints = normalized
      .map((value, index) => {
        const x = (index / (normalized.length - 1 || 1)) * 100;
        const y = 100 - value;
        return `${x},${y}`;
      })
      .join(" ");

    return {
      hoursSaved,
      costSaved,
      roi,
      productivityGain,
      svgPoints,
      normalized,
    };
  }, [simulator]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 32);
      setHeroParallax(y * 0.2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 1080;
      setIsMobileViewport(isMobile);
      if (!isMobile) {
        setIsMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting && id) {
            setActiveSection(id);
          }
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        rootMargin: "-50% 0px -40% 0px",
        threshold: 0.15,
      }
    );

    sections.forEach((section) => {
      const element = sectionRefs.current[section.id];
      if (element) {
        observer.observe(element);
      }
    });

    document.querySelectorAll<HTMLElement>("[data-animate]").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!metricsActive) return;
    const duration = 1500;
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setMetricValues(
        heroMetrics.map((metric) => {
          const eased = 1 - Math.pow(1 - progress, 3);
          return metric.decimals
            ? parseFloat((metric.target * eased).toFixed(metric.decimals))
            : Math.round(metric.target * eased);
        })
      );
      if (progress < 1) requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [metricsActive]);

  useEffect(() => {
    if (!metricsRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMetricsActive(true);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % successStories.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const element = sectionRefs.current[id];
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleSimulatorChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setSimulator((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleContactChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormSubmitted(false);
    setSubmissionError(null);

    try {
      await submitContactForm(contactForm);
      setFormSubmitted(true);
      setContactForm(initialContact);
    } catch (error) {
      console.error("Failed to submit contact form", error);
      const message =
        error instanceof Error
          ? error.message
          : "送信に失敗しました。時間をおいて再度お試しください。";
      setSubmissionError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lp-root">
      {/* 固定ヘッダー: ナビゲーションとCTA */}
      <header className={`site-header ${isScrolled ? "is-condensed" : ""}`} aria-label="メインナビゲーション">
        <div className="container header-inner">
          <a className="brand" href="#hero" aria-label="AI経営計画書ラボ トップへ">AI経営計画書ラボ</a>
          <button
            type="button"
            className={`nav-toggle ${isMenuOpen ? "is-open" : ""}`}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="sr-only">メニューを開閉</span>
            <span aria-hidden="true" />
          </button>
          <div
            className={`header-menu ${isMenuOpen ? "is-open" : ""}`}
            aria-hidden={isMobileViewport && !isMenuOpen}
          >
            <nav
              id="primary-navigation"
              className="header-nav"
              aria-label="主要セクション"
            >
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={activeSection === section.id ? "is-active" : ""}
                  onClick={(event) => handleNavClick(event, section.id)}
                >
                  {section.label}
                </a>
              ))}
            </nav>
            <div className="header-actions">
              <a className="btn btn-outline" href="#resources">まずは資料請求</a>
              <a className="btn btn-accent" href="#contact">
                無料相談を予約
              </a>
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`nav-backdrop ${isMenuOpen ? "is-visible" : ""}`}
          aria-hidden={!isMenuOpen}
          tabIndex={isMenuOpen ? 0 : -1}
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="sr-only">メニューを閉じる</span>
        </button>
      </header>

      <main>
        {/* ヒーローセクション: 価値訴求とアニメーション */}
        <section
          id="hero"
          ref={(node) => {
            sectionRefs.current.hero = node ?? null;
          }}
          className="hero"
          style={{ backgroundPositionY: `${heroParallax * 0.5}px` }}
          aria-labelledby="hero-heading"
        >
          <div className="hero-overlay" />
          <div className="container hero-inner">
            <div className="hero-copy" data-animate>
              <span className="badge">中小企業経営者向け</span>
              <h1 id="hero-heading">
                AI × 経営者 × 専門家で、激動の時代を生き抜く経営計画を最速で策定
                <span>生成AIが外部環境を分析し、経営者の意思決定を支援。専門家が伴走して実行をサポートします。</span>
              </h1>
              <p className="hero-lead">
                政策・市場・金融データをAIが常時モニタリングし、複数シナリオの財務予測と資料ドラフトを自動生成。経営者は判断と優先順位付けに集中でき、専門家が融資・投資審査水準まで仕上げます。
              </p>
              <p className="hero-sub">
                四半期ごとのアップデートで最新の機会とリスクを反映し、資料更新は80時間→26時間、戦略更新は6週間→2週間に短縮した事例も。意思決定に充てる時間を取り戻しましょう。
              </p>
              <div className="hero-actions">
                <a className="btn btn-accent" href="#resources">
                  まずは資料請求
                </a>
                <a className="btn btn-ghost" href="#contact">
                  無料相談を予約
                </a>
              </div>
              <ul className="hero-metrics" ref={metricsRef}>
                {heroMetrics.map((metric, index) => (
                  <li key={metric.label}>
                    <strong>
                      {metric.prefix}
                      {metricValues[index].toLocaleString(undefined, {
                        minimumFractionDigits: metric.decimals ?? 0,
                        maximumFractionDigits: metric.decimals ?? 0,
                      })}
                      {metric.suffix}
                    </strong>
                    <span>{metric.label}</span>
                    <small>{metric.note}</small>
                  </li>
                ))}
              </ul>
              <div className="scroll-cue" aria-hidden="true">
                <span className="scroll-cue__icon" />
                <span className="scroll-cue__label">スクロールして詳細を見る</span>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="hero-dashboard" data-animate>
                <div className="dashboard-header">AIダッシュボード・ライブビュー</div>
                <div className="dashboard-body">
                  <div className="dashboard-chart">
                    <svg viewBox="0 0 100 60" role="img" aria-label="AIシミュレーション予測線">
                      <polyline points="0,55 25,48 50,40 75,30 100,20" />
                    </svg>
                  </div>
                  <div className="dashboard-stats">
                    <div>
                      <span>シナリオ</span>
                      <strong>9パターン</strong>
                    </div>
                    <div>
                      <span>意思決定所要時間</span>
                      <strong>-42%</strong>
                    </div>
                    <div>
                      <span>レビュー待ち</span>
                      <strong>2件</strong>
                    </div>
                  </div>
                </div>
                <div className="dashboard-footer">専門家レビュー中</div>
              </div>
            </div>
          </div>
        </section>

        {/* 役割分担セクション */}
        <section
          id="roles"
          ref={(node) => {
            sectionRefs.current["roles"] = node ?? null;
          }}
          className="section roles"
          aria-labelledby="roles-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="roles-heading">役割が明確だから安心</h2>
              <p>
                AI、経営者、専門家がそれぞれの強みを発揮。最終判断は経営者が行い、AIは情報収集と分析、専門家はレビューと伴走を担当します。
              </p>
            </div>
            <div className="roles-grid">
              {responsibilityColumns.map((column) => (
                <article
                  key={column.id}
                  className="role-card"
                  data-animate
                  tabIndex={0}
                >
                  <div className="role-icon" aria-hidden="true">{column.icon}</div>
                  <h3>{column.title}</h3>
                  <p>{column.summary}</p>
                  <ul>
                    {column.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="role-detail" aria-hidden="true">
                    {column.detail}
                  </div>
                </article>
              ))}
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-outline" href="#quarterly">
                90日サイクルの進め方を見る
              </a>
            </div>
          </div>
        </section>

        {/* なぜ今AIが必要なのか セクション */}
        <section
          id="why-now"
          ref={(node) => {
            sectionRefs.current["why-now"] = node ?? null;
          }}
          className="section why-now"
          aria-labelledby="why-now-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="why-now-heading">なぜ今AIが必要なのか</h2>
              <p>
                信頼できるエビデンスが示すように、AIの活用はもはや先進企業だけのものではありません。導入を後回しにすると、意思決定の速度と精度で差が開きます。
              </p>
            </div>
            <div className="evidence-grid">
              {whyNowEvidence.map((item) => (
                <article
                  key={item.title}
                  className="evidence-card"
                  data-animate
                  data-source={item.sourceNote}
                >
                  <div className="evidence-stat">{item.stat}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="evidence-link">
                    {item.sourceLabel}
                  </a>
                </article>
              ))}
            </div>
            <p className="footnote" data-animate>
              ※ 各数値の詳細はカードをホバー/タップすると表示されます。リンクは別タブで開きます。
            </p>
          </div>
        </section>

        {/* 四半期レビュー セクション */}
        <section
          id="quarterly"
          ref={(node) => {
            sectionRefs.current["quarterly"] = node ?? null;
          }}
          className="section quarterly"
          aria-labelledby="quarterly-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="quarterly-heading">四半期ごとに戦略と実行を再設計</h2>
              <p>
                <a href="https://dragonboat.io/blog/quarterly-planning-guide" target="_blank" rel="noreferrer">
                  Dragonboat
                </a>
                は、四半期プランニングを単なるプロジェクトの羅列ではなく、長期ビジョンと短期スプリントをつなぐ継続的なアラインメントと位置づけています。生成AIで外部環境を90日ごとに捉え直し、専門家とともに意思決定を更新しましょう。
              </p>
            </div>
            <div className="quarterly-grid">
              <div className="quarterly-insights" data-animate>
                {quarterlySignals.map((signal) => (
                  <article key={signal.title} className="quarterly-card">
                    <h3>{signal.title}</h3>
                    <p>{signal.description}</p>
                    {signal.sourceUrl && (
                      <a
                        className="quarterly-link"
                        href={signal.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {signal.sourceLabel}
                      </a>
                    )}
                    {!signal.sourceUrl && (
                      <span className="quarterly-link" aria-label="社内知見">
                        {signal.sourceLabel}
                      </span>
                    )}
                  </article>
                ))}
              </div>
              <div className="quarterly-visual" data-animate aria-hidden="true">
                <div className="velocity-chart">
                  <svg viewBox="0 0 100 60" role="img" aria-label="外部環境と生成AIの変化速度">
                    {velocitySeries.map((series, seriesIndex) => {
                      const points = series.values
                        .map((value, valueIndex) => {
                          const x = (valueIndex / (series.values.length - 1 || 1)) * 100;
                          const max = velocityMax || 1;
                          const normalizedY = 55 - (value / max) * 45;
                          return `${x},${normalizedY}`;
                        })
                        .join(" ");
                      return (
                        <polyline
                          key={series.label}
                          points={points}
                          className={`velocity-line velocity-line-${seriesIndex}`}
                          style={{ stroke: series.color }}
                        />
                      );
                    })}
                  </svg>
                  <ul className="velocity-legend">
                    {velocitySeries.map((series) => (
                      <li key={series.label}>
                        <span style={{ backgroundColor: series.color }} />
                        {series.label}
                      </li>
                    ))}
                  </ul>
                  <div className="velocity-axis">
                    {velocityQuarters.map((quarter) => (
                      <span key={quarter}>{quarter}</span>
                    ))}
                  </div>
                  <p className="velocity-note">
                    *指数は2021Q4を100とした当社推計。外部データ更新と生成AI技術の進化スピードを示します。
                  </p>
                </div>
              </div>
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-accent" href="#contact">
                四半期レビューの進め方を相談する
              </a>
            </div>
          </div>
        </section>

        {/* 課題と解決策セクション */}
        <section
          id="pain"
          ref={(node) => {
            sectionRefs.current["pain"] = node ?? null;
          }}
          className="section pain"
          aria-labelledby="pain-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="pain-heading">経営者が抱える課題と解決策</h2>
              <p>よくある悩みをAIがどう解消するのか、直感的に理解できます。</p>
            </div>
            <div className="pain-grid">
              {painPoints.map((item) => (
                <article key={item.title} className="pain-card" data-animate>
                  <div className="pain-icon" aria-hidden="true">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <div className="pain-solution">{item.solution}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* プロセスセクション */}
        <section
          id="process"
          ref={(node) => {
            sectionRefs.current["process"] = node ?? null;
          }}
          className="section process"
          aria-labelledby="process-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="process-heading">成功までの4ステップ</h2>
              <p>AIと人の役割を明確に分担し、意思決定の質を高めるプロセスです。</p>
            </div>
            <ol className="process-timeline">
              {processSteps.map((step, index) => (
                <li key={step.title} className="process-step" data-animate>
                  <div className="process-marker" aria-hidden="true">
                    <span>{index + 1}</span>
                  </div>
                  <div className="process-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    <div className="process-roles">
                      <div>
                        <strong>AI</strong>
                        <span>{step.aiRole}</span>
                      </div>
                      <div>
                        <strong>人</strong>
                        <span>{step.humanRole}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <div className="process-flowchart" data-animate>
              {processTimeline.map((item) => (
                <div key={item.stage} className="process-flow-item">
                  <div className="process-flow-icon" aria-hidden="true">{item.icon}</div>
                  <h3>{item.stage}</h3>
                  <p>{item.aiFocus}</p>
                  <p>{item.humanFocus}</p>
                </div>
              ))}
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-accent" href="#contact">
                専門家との伴走体制を相談する
              </a>
            </div>
          </div>
        </section>

        {/* 成功事例カルーセル */}
        <section
          id="stories"
          ref={(node) => {
            sectionRefs.current["stories"] = node ?? null;
          }}
          className="section stories"
          aria-labelledby="stories-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="stories-heading">成功事例</h2>
              <p>業界や規模が異なる企業でも、AIと専門家伴走により確実な成果が出ています。</p>
            </div>
            <div className="story-carousel" data-animate>
              <div className="story-slider" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                {successStories.map((story) => (
                  <article key={story.industry} className="story-card">
                    <div className="story-meta">
                      <div className="story-avatar" aria-hidden="true">{story.avatarInitials}</div>
                      <div>
                        <span className="story-industry">{story.industry}</span>
                        <span className="story-role">{story.name} / {story.role}</span>
                      </div>
                    </div>
                    <div className="story-results">
                      <span>{story.before}</span>
                      <strong>{story.after}</strong>
                    </div>
                    <p className="story-quote">“{story.quote}”</p>
                  </article>
                ))}
              </div>
              <div className="story-controls" role="tablist" aria-label="成功事例スライド">
                {successStories.map((story, index) => (
                  <button
                    key={story.industry}
                    type="button"
                    className={carouselIndex === index ? "is-active" : ""}
                    onClick={() => setCarouselIndex(index)}
                    aria-label={`${story.industry} の事例を表示`}
                    aria-selected={carouselIndex === index}
                  />
                ))}
              </div>
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-accent" href="#resources">
                成果につながる資料を見る
              </a>
            </div>
          </div>
        </section>

        {/* パートナーロゴと専門家紹介 */}
        <section className="section credibility" aria-labelledby="credibility-heading">
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="credibility-heading">選ばれる理由</h2>
              <p>信頼できる専門家ネットワークと導入実績が安心感を生みます。</p>
            </div>
            <div className="logo-grid" role="list">
              {partnerLogos.map((logo) => (
                <div key={logo} className="logo-placeholder" role="listitem">
                  <span>Logo {logo}</span>
                </div>
              ))}
            </div>
            <div className="expert-grid">
              {expertCards.map((expert) => (
                <article key={expert.name} className="expert-card" data-animate>
                  <div className="expert-photo" aria-hidden="true">📷</div>
                  <div className="expert-body">
                    <h3>{expert.name}</h3>
                    <span>{expert.title}</span>
                    <p>{expert.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* シミュレーターセクション */}
        <section className="section simulator" aria-labelledby="simulator-heading">
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="simulator-heading">AI活用インパクトを即時シミュレート</h2>
              <p>入力値に合わせてROIと生産性向上の見込みがリアルタイムに更新されます。</p>
            </div>
            <div className="simulator-content" data-animate>
              <form className="simulator-form" aria-label="シミュレーター入力">
                <label>
                  年商規模 (億円)
                  <input
                    type="range"
                    min="5"
                    max="15"
                    step="0.5"
                    name="revenueGoal"
                    value={simulator.revenueGoal}
                    onChange={handleSimulatorChange}
                    aria-valuetext={`${simulator.revenueGoal}億円`}
                  />
                  <span>{simulator.revenueGoal.toFixed(1)} 億円</span>
                </label>
                <label>
                  初期投資 (万円)
                  <input
                    type="number"
                    name="investment"
                    min={100}
                    step={50}
                    value={simulator.investment}
                    onChange={handleSimulatorChange}
                  />
                </label>
                <label>
                  自動化レベル (%)
                  <input
                    type="range"
                    min="30"
                    max="100"
                    step="5"
                    name="automation"
                    value={simulator.automation}
                    onChange={handleSimulatorChange}
                    aria-valuetext={`${simulator.automation}%`}
                  />
                  <span>{simulator.automation}%</span>
                </label>
                <label>
                  チーム人数
                  <input
                    type="number"
                    name="teamSize"
                    min={3}
                    step={1}
                    value={simulator.teamSize}
                    onChange={handleSimulatorChange}
                  />
                </label>
              </form>
              <div className="simulator-visual" role="img" aria-label="シミュレーション結果グラフ">
                <svg viewBox="0 0 100 100">
                  <polyline points={simulatorChart.svgPoints} />
                </svg>
                <div className="simulator-stats">
                  <div>
                    <span>年間工数削減</span>
                    <strong>{simulatorChart.hoursSaved.toFixed(0)} 時間</strong>
                  </div>
                  <div>
                    <span>年間コスト削減</span>
                    <strong>{simulatorChart.costSaved.toFixed(0)} 万円</strong>
                  </div>
                  <div>
                    <span>期待ROI</span>
                    <strong>{simulatorChart.roi.toFixed(1)}%</strong>
                  </div>
                  <div>
                    <span>生産性向上</span>
                    <strong>+{simulatorChart.productivityGain.toFixed(1)}%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 資料セクション */}
        <section
          id="resources"
          ref={(node) => {
            sectionRefs.current["resources"] = node ?? null;
          }}
          className="section resources"
          aria-labelledby="resources-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="resources-heading">ヒト×AI×専門家の連携がわかる資料</h2>
              <p>実際にどのようなアウトプットが得られるのか、匿名化したサンプルやテンプレートでご確認ください。</p>
            </div>
            <div className="resources-grid">
              {resourceCards.map((resource) => (
                <article key={resource.title} className="resource-card" data-animate>
                  <div className="resource-icon" aria-hidden="true">{resource.icon}</div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <a className="btn btn-outline" href="#contact">
                    {resource.cta}
                  </a>
                </article>
              ))}
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-accent" href="#contact">
                資料ダウンロードの案内を受け取る
              </a>
            </div>
          </div>
        </section>

        {/* 料金プラン */}
        <section
          id="pricing"
          ref={(node) => {
            sectionRefs.current["pricing"] = node ?? null;
          }}
          className="section pricing"
          aria-labelledby="pricing-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="pricing-heading">料金プラン</h2>
              <p>規模や目的に合わせて3つのプランをご用意。期待できるROIも明記しています。</p>
            </div>
            <div className="pricing-table-wrapper" data-animate>
              <table className="pricing-table">
                <caption className="sr-only">プラン別の料金と提供内容</caption>
                <thead>
                  <tr>
                    <th scope="col">プラン</th>
                    <th scope="col">月額</th>
                    <th scope="col">主な機能</th>
                    <th scope="col">サポート</th>
                    <th scope="col">想定ROI</th>
                    <th scope="col" aria-label="アクション" />
                  </tr>
                </thead>
                <tbody>
                  {pricingPlans.map((plan) => (
                    <tr key={plan.name}>
                      <th scope="row">{plan.name}</th>
                      <td>{plan.price}</td>
                      <td>{plan.features}</td>
                      <td>{plan.support}</td>
                      <td>{plan.roi}</td>
                      <td>
                        <a className="btn btn-outline" href="#contact">
                          {plan.cta}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-accent" href="#contact">
                最適なプランを提案してもらう
              </a>
            </div>
          </div>
        </section>

        {/* FAQセクション */}
        <section
          id="faq"
          ref={(node) => {
            sectionRefs.current["faq"] = node ?? null;
          }}
          className="section faq"
          aria-labelledby="faq-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="faq-heading">よくあるご質問とリスク対策</h2>
              <p>AIの限界や導入時の不安を率直に解説し、ヒト×AI×専門家の三位一体でどう解消するかを示します。</p>
            </div>
            <dl className="faq-list">
              {faqItems.map((item) => (
                <div key={item.question} className="faq-item" data-animate>
                  <dt>{item.question}</dt>
                  <dd>{item.answer}</dd>
                </div>
              ))}
            </dl>
            <div className="section-cta" data-animate>
              <a className="btn btn-outline" href="#contact">
                個別の懸念を相談する
              </a>
            </div>
          </div>
        </section>

        {/* セキュリティセクション */}
        <section
          id="security"
          ref={(node) => {
            sectionRefs.current["security"] = node ?? null;
          }}
          className="section security"
          aria-labelledby="security-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="security-heading">信頼を支えるセキュリティ</h2>
              <p>経営の機微情報を取り扱うため、最高水準のセキュリティを整えています。</p>
            </div>
            <div className="security-grid">
              {securityPoints.map((point) => (
                <article key={point.title} className="security-card" data-animate>
                  <div className="security-icon" aria-hidden="true">{point.icon}</div>
                  <span className="security-badge">{point.badge}</span>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </article>
              ))}
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-accent" href="#contact">
                セキュリティ要件を相談する
              </a>
            </div>
            <p className="privacy-note" data-animate>
              データの取り扱いについては<a href="/privacy" target="_blank" rel="noreferrer">プライバシーポリシー</a>をご覧ください。
            </p>
          </div>
        </section>

        {/* お問い合わせフォーム */}
        <section
          id="contact"
          ref={(node) => {
            sectionRefs.current["contact"] = node ?? null;
          }}
          className="section contact"
          aria-labelledby="contact-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="contact-heading">お問い合わせ</h2>
              <p>具体的な課題やスケジュール感をお聞かせください。1営業日以内にご連絡します。</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-row">
                <label>
                  氏名
                  <input
                    type="text"
                    name="name"
                    required
                    value={contactForm.name}
                    onChange={handleContactChange}
                  />
                </label>
                <label>
                  会社名
                  <input
                    type="text"
                    name="company"
                    required
                    value={contactForm.company}
                    onChange={handleContactChange}
                  />
                </label>
              </div>
              <div className="form-row">
                <label className="full-width">
                  連絡先 (メール)
                  <input
                    type="email"
                    name="email"
                    required
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="例: ceo@example.co.jp"
                  />
                </label>
              </div>
              <label>
                相談内容
                <textarea
                  name="message"
                  rows={5}
                  value={contactForm.message}
                  onChange={handleContactChange}
                  placeholder="課題・達成したいことをご記入ください"
                />
              </label>
              <div className="form-actions">
                <button className="btn btn-accent" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="btn-progress">
                      <span className="btn-spinner" aria-hidden="true" />
                      送信中...
                    </span>
                  ) : (
                    "送信する"
                  )}
                </button>
                <div className="form-messages">
                  <div className="form-feedback" role="status" aria-live="polite">
                    {isSubmitting && "送信を受け付けています..."}
                    {formSubmitted && !isSubmitting && "送信が完了しました。担当者よりご連絡いたします。"}
                  </div>
                  {submissionError && (
                    <div className="form-error" role="alert">
                      {submissionError}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="mobile-form-cta" aria-hidden="true">
            <a className="btn btn-accent" href="#contact">
              フォームを送信
            </a>
          </div>
        </section>
      </main>

      {!isFloatingHidden && (
        <div className="floating-cta" role="complementary" aria-label="相談用ショートカット">
          <a className="floating-cta__button" href="#contact">
            無料相談を申し込む
          </a>
          <button
            type="button"
            className="floating-cta__close"
            onClick={() => setIsFloatingHidden(true)}
            aria-label="この案内を閉じる"
          >
            ×
          </button>
        </div>
      )}

      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} AI経営計画書ラボ. All rights reserved.</p>
          <p className="footnote">
            出典: Switch Software (2024), Stanford HAI (2024), OECD (2024), Dragonboat (2024)。
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
