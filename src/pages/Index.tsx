import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import "../../styles/lp.css";

const HERO_VIDEO = "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4";
const PLACEHOLDER_POSTER = `${import.meta.env.BASE_URL}placeholder.svg`;

type SimulationFormData = {
  goalRevenue: number;
  initialInvestment: number;
  marketSize: number;
  grossMargin: number;
};

type RadarScenarioKey = "baseline" | "expansion" | "turnaround";

type FaqItem = {
  question: string;
  answer: string;
};

const DEFAULT_FORM_DATA: SimulationFormData = {
  goalRevenue: 9600,
  initialInvestment: 1200,
  marketSize: 180,
  grossMargin: 48,
};

const radarCategories = ["顧客理解", "商品力", "販売力", "財務健全性", "デジタル化", "スピード"] as const;

const radarScenarios: Record<
  RadarScenarioKey,
  {
    label: string;
    description: string;
    our: number[];
    competitor: number[];
  }
> = {
  baseline: {
    label: "既存事業の深堀り",
    description:
      "直近1年分の市場データと顧客インサイトから、既存事業の伸びしろとリスクをAIが可視化します。",
    our: [4.3, 3.9, 3.6, 4.6, 3.8, 4.1],
    competitor: [3.2, 3.5, 3.1, 3.7, 3.0, 3.2],
  },
  expansion: {
    label: "新規事業のテスト",
    description:
      "新サービス案と競合比較をレーダーチャートで俯瞰。需要ポテンシャルと投資優先度が瞬時にわかります。",
    our: [3.8, 4.5, 3.9, 4.0, 4.6, 4.8],
    competitor: [2.9, 3.6, 3.2, 3.4, 3.1, 3.8],
  },
  turnaround: {
    label: "収益改善シナリオ",
    description:
      "原価・在庫データを反映した収益改善シナリオを自動生成。改善インパクトが数値で確認できます。",
    our: [4.1, 3.7, 4.6, 4.8, 3.9, 4.5],
    competitor: [3.0, 3.1, 3.6, 3.8, 2.9, 3.3],
  },
};

const faqItems: FaqItem[] = [
  {
    question: "生成AIがどこまで作成し、どこから専門家が関わりますか？",
    answer:
      "市場データ収集、外部環境分析、財務シミュレーション、文章ドラフトの初稿までは生成AIが自動化します。その上で、コンサルタントが融資・投資家視点でレビューし、用語統一や説得力の高いストーリーを仕上げます。",
  },
  {
    question: "自社の機密情報は安全に扱われますか？",
    answer:
      "送信いただいたデータは国内リージョンで暗号化保管し、プロジェクト終了後はリクエストに応じて即時削除します。学習用途での二次利用は行わず、担当コンサルタントのみがアクセス可能です。",
  },
  {
    question: "どの程度の準備が必要ですか？",
    answer:
      "売上・原価・固定費などの基本数値と、描きたい将来像をヒアリングシートにご記入いただくだけです。必要に応じて既存資料をアップロードいただければ、AIが自動で要約・反映します。",
  },
  {
    question: "補助金や金融機関向けのフォーマットにも対応できますか？",
    answer:
      "はい。ものづくり補助金、事業再構築補助金、金融機関の独自フォーマットなどに合わせたテンプレートへ出力します。専門家が提出前レビューと想定問答の準備まで伴走します。",
  },
];

const processSteps = [
  {
    title: "キックオフ（60分）",
    description:
      "ヒアリングシートと既存資料を共有いただき、目指す姿と意思決定の期限を整理します。",
  },
  {
    title: "AIドラフト生成（最短1日）",
    description:
      "市場・競合データの収集、財務モデル試算、計画書ドラフトを自動生成。ダッシュボードで確認できます。",
  },
  {
    title: "専門家レビュー（2～3営業日）",
    description:
      "コンサルタントが戦略の整合性・金融機関の着眼点を確認し、加筆修正とリスク補足を実施します。",
  },
  {
    title: "納品＆意思決定サポート",
    description:
      "経営会議・金融機関向けの想定問答資料、更新用テンプレート、次の意思決定スケジュールをお渡しします。",
  },
];

const successStories = [
  {
    industry: "製造業（年商22億円）",
    challenge: "調達環境の変化で取引銀行から次年度計画の即時提出を求められていた。",
    before: "計画書作成に3週間、部門ヒアリングに30時間超。",
    after: "ドラフト作成を4日→1.5日に短縮し、交渉までの準備時間を60%削減。",
    result: "事業性評価ローンで2.5億円の調達に成功。外部環境シナリオを即日で差し替え対応。",
    quote:
      "『生成AIで作成した複数シナリオが、役員会での意思決定を速めてくれました。銀行担当者の質問にも即答できました。』",
    person: "代表取締役 A社長",
  },
  {
    industry: "ITサービス（年商6.5億円）",
    challenge: "海外展開を見据えたシリーズB資金調達で、説得力ある財務シナリオが不足。",
    before: "担当者2名での資料更新に毎月80時間。",
    after: "AIがARR予測と市場サイズ根拠を自動更新し、更新工数を1/3に削減。",
    result: "海外投資家向けDDで追加質問ゼロ、調達成功率が2.1倍に向上。",
    quote:
      "『外部環境の指数データが毎週反映され、経営会議の議題が“次の一手”に変わりました。』",
    person: "CFO B氏",
  },
  {
    industry: "多店舗飲食（年商9億円）",
    challenge: "新店出店の意思決定に必要な市場データが散在し、数字の裏付けが弱かった。",
    before: "市場調査と損益シミュレーションに約14日。",
    after: "AIが地区別データを統合し、計画書完成まで5日に短縮。",
    result: "出店判断までのリードタイムが70%短縮し、月次での見直しが定着。",
    quote:
      "『AIが用意したビフォー／アフター図で現場との会話が揃い、意思決定が早くなりました。』",
    person: "COO C氏",
  },
];

const planData = [
  {
    name: "ライトプラン",
    price: "月額 88,000円",
    target: "初めてAIによる経営計画を試したい中小企業",
    deliverables: [
      "市場・競合インサイトレポート（毎月更新）",
      "財務シナリオ（ベース＆楽観の2パターン）",
      "経営計画書ドラフト（PowerPoint／PDF）",
    ],
    roi: "作成工数を平均35時間削減",
    trial: "14日間の無料トライアル付き",
  },
  {
    name: "プロプラン",
    price: "月額 198,000円",
    target: "金融機関・投資家向け資料をスピーディに整えたい企業",
    deliverables: [
      "市場・競合データ連携ダッシュボード",
      "5年分の財務モデル＆感度分析",
      "専門家レビュー（2往復）と提出用カスタム書式",
      "意思決定会議向けサマリー／想定問答集",
    ],
    roi: "資金調達成功率 平均2.0倍／作成リードタイム60%削減",
    trial: "専任コンサルとの導入ワークショップ付き",
  },
  {
    name: "エンタープライズ",
    price: "個別見積",
    target: "複数事業・複数拠点の計画を統合したい企業",
    deliverables: [
      "自社データベース／BIとのAPI連携",
      "部門別KPIトラッキングと自動リポート",
      "専門家レビュー無制限・伴走支援",
      "カスタムセキュリティポリシー／監査ログ",
    ],
    roi: "経営会議資料の更新リードタイムを最大80%短縮",
    trial: "PoCプログラム（4週間）を提案",
  },
];

const formatNumber = (value: number) => Math.round(value).toLocaleString("ja-JP");

const clampValue = (value: number, min: number, max?: number) => {
  const clampedMin = Math.max(value, min);
  if (typeof max === "number") {
    return Math.min(clampedMin, max);
  }
  return clampedMin;
};

const Index = () => {
  const [formData, setFormData] = useState<SimulationFormData>(DEFAULT_FORM_DATA);
  const [selectedScenario, setSelectedScenario] = useState<RadarScenarioKey>("baseline");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const {
    sixMonthRevenue,
    annualRevenue,
    sixMonthCashFlow,
    annualCashFlow,
    monthlyRevenueSeries,
    monthlyCashflowSeries,
    monthlyLabels,
  } = useMemo(() => {
    const goalRevenue = Math.max(formData.goalRevenue, 0);
    const initialInvestment = Math.max(formData.initialInvestment, 0);
    const marketSize = Math.max(formData.marketSize, 0);
    const grossMarginRate = clampValue(formData.grossMargin, 0, 100) / 100;

    const rampFactor =
      marketSize > 0 ? Math.min(goalRevenue / (marketSize * 700), 0.4) + 0.6 : 1;

    const sixMonthRevenueValue = goalRevenue * 0.48 * rampFactor;
    const annualRevenueValue = goalRevenue * rampFactor;
    const sixMonthCashFlowValue = sixMonthRevenueValue * grossMarginRate - initialInvestment * 0.55;
    const annualCashFlowValue = annualRevenueValue * grossMarginRate - initialInvestment;

    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const monthlyRevenue = months.map((month) => {
      const growthCurve = Math.pow(month / 12, 0.85);
      return (annualRevenueValue / 12) * month * growthCurve;
    });
    const monthlyCashflow = monthlyRevenue.map((revenue, index) => {
      const investmentDecay = initialInvestment * Math.exp(-index / 4.5) * 0.1;
      return revenue * grossMarginRate - investmentDecay;
    });

    return {
      sixMonthRevenue: sixMonthRevenueValue,
      annualRevenue: annualRevenueValue,
      sixMonthCashFlow: sixMonthCashFlowValue,
      annualCashFlow: annualCashFlowValue,
      monthlyRevenueSeries: monthlyRevenue,
      monthlyCashflowSeries: monthlyCashflow,
      monthlyLabels: months.map((month) => `${month}月`),
    };
  }, [formData]);

  const simulationChapters = useMemo(() => {
    const marketSize = Math.max(formData.marketSize, 0);
    const goalRevenue = Math.max(formData.goalRevenue, 0);
    const grossMargin = clampValue(formData.grossMargin, 0, 100);
    const estimatedShare =
      marketSize > 0 ? Math.min((goalRevenue / (marketSize * 1000)) * 100, 85).toFixed(1) : "0.0";

    return [
      `外部環境アップデート：市場規模 ${marketSize.toLocaleString()} 億円で推計シェア ${estimatedShare}% を想定。政策動向と競合の参入時期も自動反映。`,
      `戦略サマリー：粗利率 ${grossMargin.toFixed(1)}% を守る価格・チャネル戦略と投資配分を提案。`,
      `財務・実行計画：売上目標 ${formatNumber(goalRevenue)} 万円に合わせたキャッシュフロー、採用計画、KPIモニタリングを生成。`,
    ];
  }, [formData]);

  const selectedRadar = radarScenarios[selectedScenario];

  const radarPolygons = useMemo(() => {
    const center = { x: 140, y: 140 };
    const radius = 110;
    const toPointString = (values: number[]) => {
      return values
        .map((value, index) => {
          const angle = (Math.PI * 2 * index) / radarCategories.length - Math.PI / 2;
          const scale = Math.max(Math.min(value, 5), 0) / 5;
          const x = center.x + radius * scale * Math.cos(angle);
          const y = center.y + radius * scale * Math.sin(angle);
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
    };

    return {
      our: toPointString(selectedRadar.our),
      competitor: toPointString(selectedRadar.competitor),
    };
  }, [selectedRadar]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  const handleSimulationChange = (key: keyof SimulationFormData) => (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = Number.parseFloat(event.target.value);
    const sanitized = Number.isNaN(parsedValue) ? 0 : parsedValue;

    setFormData((previous) => ({
      ...previous,
      [key]: key === "grossMargin" ? clampValue(sanitized, 0, 100) : clampValue(sanitized, 0),
    }));
  };

  const handleSimulationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const chartDimensions = { width: 600, height: 260, padding: 32 };
  const allValues = [...monthlyRevenueSeries, ...monthlyCashflowSeries];
  const maxValue = Math.max(...allValues, 1);
  const minValue = Math.min(0, ...allValues);
  const valueRange = maxValue - minValue || 1;
  const zeroY = chartDimensions.height -
    chartDimensions.padding -
    ((0 - minValue) / valueRange) * (chartDimensions.height - chartDimensions.padding * 2);

  const buildPolyline = (values: number[]) => {
    return values
      .map((value, index) => {
        const x =
          chartDimensions.padding +
          ((chartDimensions.width - chartDimensions.padding * 2) * index) / (values.length - 1);
        const y =
          chartDimensions.height -
          chartDimensions.padding -
          ((value - minValue) / valueRange) * (chartDimensions.height - chartDimensions.padding * 2);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  return (
    <div className="lp-root">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand" aria-label="AI経営計画書ラボ">AI経営計画書ラボ</div>
          <nav className="header-nav" aria-label="主要ナビゲーション">
            <a href="#pain">経営者の課題</a>
            <a href="#capabilities">機能と特徴</a>
            <a href="#simulator">シミュレーター</a>
            <a href="#cases">成功事例</a>
            <a href="#plans">料金</a>
            <a href="#security">セキュリティ</a>
          </nav>
          <div className="header-actions">
            <a className="btn btn-outline" href="#demo">
              デモを見る
            </a>
            <a className="btn btn-accent" href="#consultation">
              無料相談
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero reveal-on-scroll" id="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="badge">先読みする経営計画 × 生成AI</p>
              <h1>
                生成AIで外部環境を先読み。
                <span className="hero-highlight">最短1日で意思決定に使える経営計画書</span>
                を。
              </h1>
              <p className="subtitle">
                市場データ・財務予測・文章ドラフトを自動生成し、専門家が戦略目線で磨き上げます。変化が激しい今だからこそ、経営者が本質的な意思決定に集中できる時間を生み出します。
              </p>
              <ul className="hero-painpoints">
                <li>市場環境が毎月変わり、会議のたびに計画書を作り直している</li>
                <li>資料づくりに追われ、意思決定のための思考時間が足りない</li>
                <li>金融機関や投資家に刺さる裏付けデータを短期間で揃えたい</li>
              </ul>
              <div className="hero-actions">
                <a className="btn btn-accent" href="#consultation">
                  無料トライアルを予約
                </a>
                <a className="btn btn-ghost" href="#simulator">
                  予測シミュレーションを見る
                </a>
              </div>
              <dl className="hero-metrics" aria-label="サービス導入後の成果">
                <div>
                  <dt>計画書作成期間</dt>
                  <dd>
                    <span className="metric-value">-60%</span>
                    <span className="metric-note">平均短縮</span>
                  </dd>
                </div>
                <div>
                  <dt>資金調達成功率</dt>
                  <dd>
                    <span className="metric-value">2.0×</span>
                    <span className="metric-note">導入企業平均</span>
                  </dd>
                </div>
                <div>
                  <dt>経営会議準備時間</dt>
                  <dd>
                    <span className="metric-value">-40h</span>
                    <span className="metric-note">／月の削減</span>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="hero-visual" aria-label="AIが経営計画書を生成する動画デモ">
              <div className="hero-video-frame">
                <video
                  className="hero-video"
                  autoPlay
                  muted
                  playsInline
                  loop
                  poster={PLACEHOLDER_POSTER}
                >
                  <source src={HERO_VIDEO} type="video/mp4" />
                  AIが計画書を生成するデモ動画
                </video>
                <div className="hero-video-overlay">
                  <span>AIが市場分析→財務予測→レポート生成まで自動化</span>
                </div>
              </div>
              <div className="hero-video-caption">
                <p>
                  ダッシュボードでは、AIが収集した最新データや生成したドラフトをリアルタイムに確認。専門家のコメントも同じ画面でフィードバックされます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pain reveal-on-scroll" id="pain">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">中小企業の経営者が抱える3つの壁</h2>
              <p className="section-lead">
                外部環境の変化に追われるほど、経営者の時間は削られ、意思決定の質が下がってしまいます。生成AIと専門家の伴走で、その壁を突破します。
              </p>
            </div>
            <div className="pain-grid">
              <article className="pain-card">
                <h3>01. 情報過多で判断が追いつかない</h3>
                <p>
                  マクロ環境・競合動向・政策支援情報を追い続けるのは現場にとって負荷が大きい。情報をまとめるだけで会議が始まってしまう。
                </p>
                <p className="pain-solution">→ 生成AIが一次情報を自動収集・要約し、意思決定に必要な指標だけを可視化。</p>
              </article>
              <article className="pain-card">
                <h3>02. 数字の裏付けと文章づくりに時間を奪われる</h3>
                <p>
                  エクセルとスライドを行き来しながら整合性をとる作業が続き、経営者の思考時間が失われている。
                </p>
                <p className="pain-solution">→ AIが財務シミュレーションから文章ドラフトまで一気通貫で生成。</p>
              </article>
              <article className="pain-card">
                <h3>03. 最新の外部環境を反映した更新ができない</h3>
                <p>
                  金融機関・投資家からの追加質問に即時対応できず、判断のタイミングを逃してしまう。
                </p>
                <p className="pain-solution">→ ダッシュボードでシナリオを切り替え、専門家が24時間以内にレビューを返答。</p>
              </article>
            </div>
          </div>
        </section>

        <section className="capabilities reveal-on-scroll" id="capabilities">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">生成AIと専門家の4つの柱で、先見的な計画書を</h2>
              <p className="section-lead">
                具体的な成果とインタラクティブな分析で、経営判断のスピードと質を同時に引き上げます。
              </p>
            </div>
            <div className="pillars-grid">
              <article className="pillar-card">
                <h3>市場・競合分析の自動化</h3>
                <p>
                  72件の外部データソースをクロールし、業界構造・トレンド・競合差分をレポート化。AIが影響度の高い指標を優先表示します。
                </p>
                <footer>
                  <span className="pillar-metric">分析更新時間 90%短縮</span>
                  <small>政策・需給データを毎朝反映</small>
                </footer>
              </article>
              <article className="pillar-card">
                <h3>売上・収支予測</h3>
                <p>
                  ユーザー入力のKPIから5年間の収支を自動算出。外部指数を掛け合わせて、市場変動を織り込んだ複数シナリオを提示します。
                </p>
                <footer>
                  <span className="pillar-metric">財務モデル作成 6時間 → 45分</span>
                  <small>感度分析とキャッシュフロー表を同時生成</small>
                </footer>
              </article>
              <article className="pillar-card">
                <h3>文章生成とレポート作成</h3>
                <p>
                  事業ストーリー、戦略、リスク、KPIを章立てしたドラフトを自動作成。金融機関・補助金フォーマットにも対応します。
                </p>
                <footer>
                  <span className="pillar-metric">ドラフト整合率 95%以上</span>
                  <small>社内資料との用語統一も自動</small>
                </footer>
              </article>
              <article className="pillar-card">
                <h3>専門家レビューと伴走</h3>
                <p>
                  元金融機関・戦略コンサル出身の専門家がレビュー。実行計画と想定問答までセットで提供し、意思決定を後押しします。
                </p>
                <footer>
                  <span className="pillar-metric">レビュー満足度 4.8 / 5.0</span>
                  <small>最短24時間でフィードバック</small>
                </footer>
              </article>
            </div>

            <div className="insight-lab">
              <div className="insight-visual">
                <div className="scenario-tabs" role="tablist" aria-label="市場分析シナリオ切り替え">
                  {(Object.keys(radarScenarios) as RadarScenarioKey[]).map((scenarioKey) => {
                    const scenario = radarScenarios[scenarioKey];
                    const isActive = selectedScenario === scenarioKey;
                    return (
                      <button
                        key={scenarioKey}
                        className={isActive ? "scenario-tab is-active" : "scenario-tab"}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedScenario(scenarioKey)}
                      >
                        {scenario.label}
                      </button>
                    );
                  })}
                </div>
                <div className="radar-chart" role="img" aria-label="自社と競合の比較レーダーチャート">
                  <svg viewBox="0 0 280 280">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <polygon
                        key={level}
                        className="radar-grid"
                        points={radarCategories
                          .map((_, index) => {
                            const angle = (Math.PI * 2 * index) / radarCategories.length - Math.PI / 2;
                            const radius = (110 * level) / 5;
                            const x = 140 + radius * Math.cos(angle);
                            const y = 140 + radius * Math.sin(angle);
                            return `${x},${y}`;
                          })
                          .join(" ")}
                      />
                    ))}
                    <line x1="140" y1="30" x2="140" y2="250" className="radar-axis" />
                    <line x1="30" y1="140" x2="250" y2="140" className="radar-axis" />
                    <polygon className="radar-polygon radar-polygon--competitor" points={radarPolygons.competitor} />
                    <polygon className="radar-polygon radar-polygon--our" points={radarPolygons.our} />
                    {radarCategories.map((category, index) => {
                      const angle = (Math.PI * 2 * index) / radarCategories.length - Math.PI / 2;
                      const labelRadius = 140;
                      const x = 140 + labelRadius * Math.cos(angle);
                      const y = 140 + labelRadius * Math.sin(angle);
                      return (
                        <text key={category} x={x} y={y} className="radar-label">
                          {category}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>
              <div className="insight-copy">
                <h3>{selectedRadar.label}</h3>
                <p>{selectedRadar.description}</p>
                <ul className="insight-list">
                  <li>自社の強み／弱みを定量化し、競合との差分を数値で理解</li>
                  <li>AIが自動で収集した外部環境データを毎日反映</li>
                  <li>専門家コメントと連動し、次の打ち手を明確化</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="simulator reveal-on-scroll" id="simulator">
          <div className="container">
            <div className="simulator-header">
              <div>
                <h2 className="section-title">AI計画書シミュレーター</h2>
                <p className="section-lead">
                  目標値を入力するだけで、売上・キャッシュフローの推移とAIが提案する章立てがリアルタイムに更新されます。
                </p>
              </div>
              <div className="simulator-note">※数値はデモ用のダミーデータです。実際は貴社データと連携します。</div>
            </div>
            <div className="simulator-content">
              <form className="sim-form" id="simForm" onSubmit={handleSimulationSubmit}>
                <div className="form-field">
                  <label htmlFor="goalRevenue">目標売上（年額・万円）</label>
                  <input
                    type="number"
                    id="goalRevenue"
                    name="goalRevenue"
                    min="0"
                    value={formData.goalRevenue}
                    onChange={handleSimulationChange("goalRevenue")}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="initialInvestment">初期投資額（万円）</label>
                  <input
                    type="number"
                    id="initialInvestment"
                    name="initialInvestment"
                    min="0"
                    value={formData.initialInvestment}
                    onChange={handleSimulationChange("initialInvestment")}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="marketSize">想定市場規模（億円）</label>
                  <input
                    type="number"
                    id="marketSize"
                    name="marketSize"
                    min="0"
                    step="0.1"
                    value={formData.marketSize}
                    onChange={handleSimulationChange("marketSize")}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="grossMargin">粗利率（%）</label>
                  <input
                    type="number"
                    id="grossMargin"
                    name="grossMargin"
                    min="0"
                    max="100"
                    value={formData.grossMargin}
                    onChange={handleSimulationChange("grossMargin")}
                  />
                </div>
              </form>
              <div className="sim-result">
                <div className="sim-chart" role="img" aria-label="売上とキャッシュフロー予測">
                  <svg
                    viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <rect
                      x="0"
                      y="0"
                      width={chartDimensions.width}
                      height={chartDimensions.height}
                      rx="18"
                      className="chart-background"
                    />
                    {[0.25, 0.5, 0.75, 1].map((ratio) => {
                      const y =
                        chartDimensions.padding +
                        (chartDimensions.height - chartDimensions.padding * 2) * (1 - ratio);
                      return <line key={ratio} x1="32" x2={chartDimensions.width - 32} y1={y} y2={y} className="chart-grid" />;
                    })}
                    <line
                      x1="32"
                      x2={chartDimensions.width - 32}
                      y1={zeroY}
                      y2={zeroY}
                      className="chart-axis"
                    />
                    <polyline className="chart-line chart-line--revenue" points={buildPolyline(monthlyRevenueSeries)} />
                    <polyline className="chart-line chart-line--cashflow" points={buildPolyline(monthlyCashflowSeries)} />
                    {monthlyRevenueSeries.map((value, index) => {
                      const x =
                        chartDimensions.padding +
                        ((chartDimensions.width - chartDimensions.padding * 2) * index) / (monthlyRevenueSeries.length - 1);
                      const y =
                        chartDimensions.height -
                        chartDimensions.padding -
                        ((value - minValue) / valueRange) * (chartDimensions.height - chartDimensions.padding * 2);
                      return <circle key={`rev-${index}`} cx={x} cy={y} r={3} className="chart-dot chart-dot--revenue" />;
                    })}
                    {monthlyCashflowSeries.map((value, index) => {
                      const x =
                        chartDimensions.padding +
                        ((chartDimensions.width - chartDimensions.padding * 2) * index) / (monthlyCashflowSeries.length - 1);
                      const y =
                        chartDimensions.height -
                        chartDimensions.padding -
                        ((value - minValue) / valueRange) * (chartDimensions.height - chartDimensions.padding * 2);
                      return <circle key={`cash-${index}`} cx={x} cy={y} r={3} className="chart-dot chart-dot--cashflow" />;
                    })}
                  </svg>
                  <div className="chart-legend">
                    <span className="legend-item">
                      <span className="legend-swatch legend-swatch--revenue" />売上予測（万円）
                    </span>
                    <span className="legend-item">
                      <span className="legend-swatch legend-swatch--cashflow" />キャッシュフロー（万円）
                    </span>
                  </div>
                </div>
                <div className="sim-summary">
                  <div className="sim-metrics">
                    <div>
                      <span className="label">6か月後売上</span>
                      <strong>{formatNumber(sixMonthRevenue)} 万円</strong>
                    </div>
                    <div>
                      <span className="label">6か月後キャッシュフロー</span>
                      <strong>{formatNumber(sixMonthCashFlow)} 万円</strong>
                    </div>
                    <div>
                      <span className="label">年間売上</span>
                      <strong>{formatNumber(annualRevenue)} 万円</strong>
                    </div>
                    <div>
                      <span className="label">年間キャッシュフロー</span>
                      <strong>{formatNumber(annualCashFlow)} 万円</strong>
                    </div>
                  </div>
                  <h3>AIが提案する章立て</h3>
                  <ul>
                    {simulationChapters.map((chapter) => (
                      <li key={chapter}>{chapter}</li>
                    ))}
                  </ul>
                  <div className="sim-labels">
                    {monthlyLabels.map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="process reveal-on-scroll" id="process">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">導入から納品まで、最短1日の伴走プロセス</h2>
              <p className="section-lead">
                初回ヒアリングから納品、意思決定支援までをワンストップで。経営判断のタイミングを逃さない設計です。
              </p>
            </div>
            <div className="process-steps">
              {processSteps.map((step, index) => (
                <article className="process-step" key={step.title}>
                  <span className="process-index">STEP {index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cases reveal-on-scroll" id="cases">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">成功事例と成果のビフォー／アフター</h2>
              <p className="section-lead">
                生成AIと専門家レビューによる具体的な成果を、定量データと経営者の声でご紹介します。
              </p>
            </div>
            <div className="case-grid">
              {successStories.map((story) => (
                <article className="case-card" key={story.industry}>
                  <header>
                    <h3>{story.industry}</h3>
                    <p className="case-challenge">課題：{story.challenge}</p>
                  </header>
                  <dl className="case-metrics">
                    <div>
                      <dt>Before</dt>
                      <dd>{story.before}</dd>
                    </div>
                    <div>
                      <dt>After</dt>
                      <dd>{story.after}</dd>
                    </div>
                    <div>
                      <dt>成果</dt>
                      <dd>{story.result}</dd>
                    </div>
                  </dl>
                  <blockquote>
                    <p>{story.quote}</p>
                    <cite>{story.person}</cite>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="plans reveal-on-scroll" id="plans">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">料金プランと得られる成果</h2>
              <p className="section-lead">
                目的や組織体制に合わせて選べる3つのプラン。導入後に得られるROIと提供内容を比較できます。
              </p>
            </div>
            <div className="plan-table" role="table">
              <div className="plan-table__header" role="row">
                <div role="columnheader">プラン</div>
                <div role="columnheader">料金（税込）</div>
                <div role="columnheader">おすすめの企業</div>
                <div role="columnheader">提供内容</div>
                <div role="columnheader">想定成果（ROI）</div>
                <div role="columnheader">トライアル</div>
              </div>
              {planData.map((plan) => (
                <div className="plan-table__row" role="row" key={plan.name}>
                  <div role="cell" className="plan-name">
                    <strong>{plan.name}</strong>
                  </div>
                  <div role="cell">{plan.price}</div>
                  <div role="cell">{plan.target}</div>
                  <div role="cell">
                    <ul>
                      {plan.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div role="cell">{plan.roi}</div>
                  <div role="cell">{plan.trial}</div>
                </div>
              ))}
            </div>
            <div className="plan-footer">
              <a className="btn btn-accent" href="#consultation">
                無料トライアル・資料請求はこちら
              </a>
            </div>
          </div>
        </section>

        <section className="security reveal-on-scroll" id="security">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">セキュリティとガバナンス</h2>
              <p className="section-lead">
                機密性の高い経営情報を扱うからこそ、安心して任せていただける環境を整えています。
              </p>
            </div>
            <div className="security-grid">
              <article className="security-card">
                <h3>暗号化とアクセス管理</h3>
                <ul>
                  <li>通信・保存ともにAES-256で暗号化</li>
                  <li>ゼロトラスト方針でIP制限と多要素認証を実装</li>
                </ul>
              </article>
              <article className="security-card">
                <h3>データ保持ポリシー</h3>
                <ul>
                  <li>契約終了後30日以内の自動削除／即時削除リクエストにも対応</li>
                  <li>監査ログを月次で共有し、内部統制に活用可能</li>
                </ul>
              </article>
              <article className="security-card">
                <h3>第三者認証</h3>
                <ul>
                  <li>ISO/IEC 27001, 27701 取得</li>
                  <li>外部監査機関による年次ペネトレーションテスト</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="faq reveal-on-scroll" id="faq">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">よくある質問</h2>
              <p className="section-lead">重要な質問を厳選し、クリックで詳細を開閉できます。</p>
            </div>
            <div className="faq-accordion">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <article className={isOpen ? "faq-item is-open" : "faq-item"} key={item.question}>
                    <button
                      className="faq-trigger"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleFaq(index)}
                    >
                      {item.question}
                      <span className="faq-icon" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div className="faq-content" role="region">
                      <p>{item.answer}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="cta-band reveal-on-scroll" id="demo">
          <div className="container cta-band-inner">
            <div>
              <h2>デモでAI経営計画書のスピードを体験</h2>
              <p>
                実際のダッシュボード画面と生成された計画書の例をオンラインでご確認いただけます。経営課題をヒアリングし、その場でシミュレーションも可能です。
              </p>
            </div>
            <a className="btn btn-accent" href="#consultation">
              30分のデモを予約する
            </a>
          </div>
        </section>

        <section id="consultation" className="consultation reveal-on-scroll">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">無料相談・お問い合わせ</h2>
              <p className="section-lead">
                まずはお気軽にご相談ください。ご入力いただいた内容をもとに、最適な進め方とスケジュールをご提案します。
              </p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">氏名</label>
                  <input type="text" id="name" name="name" placeholder="例）山田 太郎" required />
                </div>
                <div className="form-field">
                  <label htmlFor="company">会社名</label>
                  <input type="text" id="company" name="company" placeholder="例）株式会社サンプル" required />
                </div>
                <div className="form-field">
                  <label htmlFor="position">役職</label>
                  <input type="text" id="position" name="position" placeholder="例）代表取締役" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">メールアドレス</label>
                  <input type="email" id="email" name="email" placeholder="example@company.jp" required />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">電話番号</label>
                  <input type="tel" id="phone" name="phone" placeholder="090-1234-5678" />
                </div>
                <div className="form-field">
                  <label htmlFor="preferredDate">希望日時</label>
                  <input type="text" id="preferredDate" name="preferredDate" placeholder="例）6月12日 午前中 希望" />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="message">ご相談内容</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="現状の課題や検討しているテーマ、希望する導入時期などをご記入ください"
                />
              </div>
              <button type="submit" className="btn btn-accent">
                無料相談を申し込む
              </button>
              <p className="form-note">送信後はサンクスページで次のステップをご案内します。</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div className="brand">AI経営計画書ラボ</div>
            <p>© 2024 Strategy AI Lab, Inc. All rights reserved.</p>
          </div>
          <nav className="footer-nav" aria-label="フッターナビゲーション">
            <a href="#hero">トップ</a>
            <a href="#capabilities">機能</a>
            <a href="#cases">成功事例</a>
            <a href="#plans">料金プラン</a>
            <a href="#security">セキュリティ</a>
          </nav>
        </div>
      </footer>

      <nav className="floating-cta" aria-label="固定表示の申し込みボタン">
        <a className="btn btn-accent" href="#consultation">
          無料相談
        </a>
        <a className="btn btn-ghost" href="#demo">
          デモ予約
        </a>
      </nav>
    </div>
  );
};

export default Index;
