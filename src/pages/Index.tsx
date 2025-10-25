import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "../../styles/lp.css";

const sections = [
  { id: "hero", label: "トップ" },
  { id: "roles", label: "役割分担" },
  { id: "why-now", label: "なぜ今" },
  { id: "pain", label: "課題" },
  { id: "process", label: "プロセス" },
  { id: "stories", label: "成功事例" },
  { id: "pricing", label: "料金" },
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
    description:
      "政策・市場データを収集し、リスクと機会を分析。財務シミュレーションと資料ドラフトを秒で提示します。",
    points: ["情報収集・整理", "収益シナリオの自動生成", "想定問答のドラフト"],
    icon: "🤖",
  },
  {
    id: "ceo",
    title: "経営者がやること",
    description:
      "AIが提示した選択肢を基に最終判断を下し、意思決定の背景をステークホルダーへ伝えます。",
    points: ["優先順位の決定", "リスク許容度の設定", "最終承認"],
    icon: "🧭",
  },
  {
    id: "experts",
    title: "専門家がやること",
    description:
      "元金融機関・コンサルがレビューと伴走支援。AIの提案を現実的な計画に磨き上げます。",
    points: ["レビューと監修", "金融機関連携支援", "伴走ミーティング"],
    icon: "🧑‍💼",
  },
];

const whyNowEvidence = [
  {
    title: "先行業界の導入速度",
    stat: "35.1%",
    description:
      "情報通信業では既に3社に1社以上が生成AIを導入。業界外でも波及が進んでいます。",
    sourceLabel: "総務省 調査",
    sourceUrl: "https://example.com/ai-adoption",
    sourceNote: "情報通信業の生成AI導入率35.1％",
  },
  {
    title: "年間削減工数",
    stat: "1,750時間",
    description:
      "AI活用でホワイトカラー業務の年間1,750時間削減が期待でき、経営企画のリソースを意思決定に集中できます。",
    sourceLabel: "企業調査",
    sourceUrl: "https://example.com/time-saved",
    sourceNote: "生成AI活用による年間1,750時間削減",
  },
  {
    title: "コストと生産性",
    stat: "1,000万円 / +25%",
    description:
      "OECDの実験では平均5〜25％の生産性向上。コスト削減効果も大きく、利益率改善に直結します。",
    sourceLabel: "OECD実験研究",
    sourceUrl: "https://example.com/oecd",
    sourceNote: "OECDの実験研究による5〜25％の生産性向上",
  },
  {
    title: "意思決定の高度化",
    stat: "予測精度向上",
    description:
      "FP&A Trends Survey 2024では短期予測の難易度上昇が指摘され、AIによるシナリオ自動化の必要性が高まっています。",
    sourceLabel: "FP&A Trends 2024",
    sourceUrl: "https://example.com/fpa",
    sourceNote: "FP&A Trends Survey 2024",
  },
];

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

const successStories = [
  {
    industry: "製造業 / 年商12億円",
    before: "資料更新 80時間 →",
    after: "26時間",
    quote:
      "AIのドラフトが下準備を完了してくれるので、意思決定に集中できる時間が2倍になりました。",
    name: "山田 CFO",
    role: "金属加工メーカー",
  },
  {
    industry: "ITサービス / 年商5.5億円",
    before: "問答準備 15時間 →",
    after: "5時間",
    quote:
      "専門家のレビュー込みで金融機関の質問を事前に洗い出せたので、調達がスムーズでした。",
    name: "佐藤 代表取締役",
    role: "SaaSスタートアップ",
  },
  {
    industry: "物流 / 年商9億円",
    before: "戦略更新 6週間 →",
    after: "2週間",
    quote:
      "市場データの自動収集とAIシミュレーションで、機動的に投資判断ができています。",
    name: "鈴木 COO",
    role: "地域物流ネットワーク",
  },
];

const pricingPlans = [
  {
    name: "ライト",
    price: "月額 15万円〜",
    description: "小規模チームの迅速なドラフト作成を支援。",
    bullets: [
      "月1回のAIドラフト更新",
      "専用ダッシュボードアクセス",
      "ROI目標: 3倍",
    ],
  },
  {
    name: "プロ",
    price: "月額 35万円〜",
    description: "複数事業の並走と金融機関提出を想定。",
    bullets: [
      "月2回の専門家レビュー",
      "想定問答・交渉準備サポート",
      "ROI目標: 5倍",
    ],
  },
  {
    name: "エンタープライズ",
    price: "月額 65万円〜",
    description: "グループ全体の計画策定・内製化を伴走。",
    bullets: [
      "専任チームと週次伴走",
      "API連携・権限管理対応",
      "ROI目標: 7倍",
    ],
  },
];

const securityPoints = [
  {
    title: "AES-256暗号化",
    description: "通信・保存データを銀行水準の暗号化で保護。",
    icon: "🔐",
  },
  {
    title: "ISO/IEC 27001取得",
    description: "情報セキュリティマネジメントシステムを国際認証。",
    icon: "🛡️",
  },
  {
    title: "ISO/IEC 27701取得",
    description: "プライバシー情報管理の国際基準を満たしています。",
    icon: "📜",
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
  position: string;
  email: string;
  preferredDate: string;
  message: string;
};

const initialContact: ContactFormState = {
  name: "",
  company: "",
  position: "",
  email: "",
  preferredDate: "",
  message: "",
};

const Index = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroParallax, setHeroParallax] = useState(0);
  const [metricsActive, setMetricsActive] = useState(false);
  const [metricValues, setMetricValues] = useState(() =>
    heroMetrics.map(() => 0)
  );
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [simulator, setSimulator] = useState<SimulatorState>(defaultSimulator);
  const [contactForm, setContactForm] = useState<ContactFormState>(initialContact);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="lp-root">
      {/* 固定ヘッダー: ナビゲーションとCTA */}
      <header className={`site-header ${isScrolled ? "is-condensed" : ""}`} aria-label="メインナビゲーション">
        <div className="container header-inner">
          <a className="brand" href="#hero" aria-label="AI経営計画書ラボ トップへ">AI経営計画書ラボ</a>
          <nav className="header-nav" aria-label="主要セクション">
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
            <a className="btn btn-outline" href="#contact">資料請求</a>
            <a className="btn btn-accent" href="#contact">
              無料相談を予約
            </a>
          </div>
        </div>
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
                AI経営計画書ラボ
                <span>生成AIで意思決定を加速し、信頼される計画書を。</span>
              </h1>
              <p className="hero-lead">
                情報通信業では既に35.1%の企業が生成AIを導入し競争優位を確立。導入を先送りにする企業は、意思決定のスピードと正確さで取り残されるリスクがあります。
              </p>
              <p className="hero-sub">
                生成AIの導入率は情報通信業で35.1%<sup aria-label="出典1">※1</sup>。導入しない企業は、最新データに基づく計画策定が遅れ、競争力を失う恐れがあります。専門家伴走型のAI活用で、貴社の経営計画を最短でアップデートしましょう。
              </p>
              <div className="hero-actions">
                <a className="btn btn-accent" href="#contact">
                  今すぐ相談する
                </a>
                <a className="btn btn-ghost" href="#why-now">
                  なぜ今かを見る
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
                <article key={column.id} className="role-card" data-animate>
                  <div className="role-icon" aria-hidden="true">{column.icon}</div>
                  <h3>{column.title}</h3>
                  <p>{column.description}</p>
                  <ul>
                    {column.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
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
                      <div className="story-avatar" aria-hidden="true">👤</div>
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
            <div className="pricing-grid">
              {pricingPlans.map((plan) => (
                <article key={plan.name} className="pricing-card" data-animate>
                  <h3>{plan.name}</h3>
                  <p className="pricing-price">{plan.price}</p>
                  <p className="pricing-desc">{plan.description}</p>
                  <ul>
                    {plan.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <a className="btn btn-outline" href="#contact">
                    プランの詳細を相談
                  </a>
                </article>
              ))}
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
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </article>
              ))}
            </div>
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
                <label>
                  役職
                  <input
                    type="text"
                    name="position"
                    value={contactForm.position}
                    onChange={handleContactChange}
                  />
                </label>
                <label>
                  連絡先 (メール)
                  <input
                    type="email"
                    name="email"
                    required
                    value={contactForm.email}
                    onChange={handleContactChange}
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  希望日時
                  <input
                    type="datetime-local"
                    name="preferredDate"
                    value={contactForm.preferredDate}
                    onChange={handleContactChange}
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
                <button className="btn btn-accent" type="submit">
                  送信する
                </button>
                {formSubmitted && <span className="form-success">送信が完了しました。担当者よりご連絡いたします。</span>}
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

      <footer className="site-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} AI経営計画書ラボ. All rights reserved.</p>
          <p className="footnote">
            ※1: 情報通信業の生成AI導入率35.1％。詳細な出典はなぜ今AIが必要なのかセクションをご確認ください。
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
