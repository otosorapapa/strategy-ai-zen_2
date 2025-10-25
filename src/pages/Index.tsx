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

type CapabilityTab = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  highlights: { label: string; value: string; detail: string }[];
  chart: { label: string; value: number; unit: string }[];
};

type JourneyStep = {
  title: string;
  duration: string;
  timeSaved: string;
  description: string;
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

const capabilityTabs: CapabilityTab[] = [
  {
    id: "insight",
    title: "外部環境を毎朝キャッチ",
    subtitle: "市場の変化をAIが先に知らせる",
    description:
      "政策ニュースや競合の動きをAIが集めて整理。経営者が見るべき数字だけをダッシュボードに要約します。",
    points: [
      "72種類の市場・政策データを自動で更新",
      "影響度が高いトピックはアラートで通知",
      "会議で使える1枚サマリーを即座に生成",
    ],
    highlights: [
      { label: "情報収集の時間", value: "-18時間/月", detail: "リサーチを自動集約" },
      { label: "先読みできる指標", value: "12項目", detail: "重要度順に可視化" },
      { label: "更新頻度", value: "毎朝5分", detail: "ダッシュボードを確認" },
    ],
    chart: [
      { label: "モニタリングするデータ", value: 72, unit: "件" },
      { label: "通知される市場変動", value: 12, unit: "件/月" },
      { label: "削減できる調査工数", value: 18, unit: "時間/月" },
    ],
  },
  {
    id: "finance",
    title: "財務シナリオを一括生成",
    subtitle: "キャッシュの見通しが一目でわかる",
    description:
      "売上目標とコストの想定を入力すると、AIが複数の収支シナリオを作成。資金繰りに影響するイベントも自動で反映します。",
    points: [
      "6か月と5年のキャッシュフローを同時作成",
      "金利や為替などの外部指数を自動連動",
      "意思決定ごとにROIをシミュレーション",
    ],
    highlights: [
      { label: "財務表の作成時間", value: "6時間→45分", detail: "テンプレート整形も自動" },
      { label: "試算できるケース", value: "最大9パターン", detail: "ボタン1つで比較" },
      { label: "判断前に確保", value: "+20時間", detail: "経営者の思考時間" },
    ],
    chart: [
      { label: "生成するシナリオ", value: 9, unit: "パターン" },
      { label: "感度分析の指標", value: 5, unit: "軸" },
      { label: "改善できる利益率", value: 8, unit: "pt向上" },
    ],
  },
  {
    id: "document",
    title: "読みやすい計画書ドラフト",
    subtitle: "伝わる文章と図表を一緒に生成",
    description:
      "経営ストーリー、KPI、投資計画を章立てで提案。金融機関や補助金のフォーマットにも合わせて出力します。",
    points: [
      "意思決定に必要な問いをAIが下書き",
      "章ごとに図解・グラフを自動レイアウト",
      "フィードバックは共同編集画面で共有",
    ],
    highlights: [
      { label: "ドラフト整合率", value: "95%", detail: "用語の揺れを自動補正" },
      { label: "資料作成の時短", value: "-28時間/月", detail: "スライド整形なし" },
      { label: "対応フォーマット", value: "補助金/銀行/社内", detail: "ワンクリック出力" },
    ],
    chart: [
      { label: "自動生成するスライド", value: 35, unit: "枚" },
      { label: "想定問答の提案", value: 15, unit: "項目" },
      { label: "レビュー時間の短縮", value: 12, unit: "時間/月" },
    ],
  },
  {
    id: "advisor",
    title: "専門家が伴走サポート",
    subtitle: "AIの提案を現実的な戦略に磨き上げ",
    description:
      "元コンサルタント・金融機関出身のチームが、AIドラフトにチェックを入れて信頼性を保証。意思決定までの動線も整えます。",
    points: [
      "提出物は専門家が最終レビュー",
      "金融機関との想定問答を準備",
      "導入後の定例ミーティングで改善提案",
    ],
    highlights: [
      { label: "平均応答時間", value: "24時間以内", detail: "質問に即レス" },
      { label: "伴走ミーティング", value: "月2回", detail: "意思決定の壁を整理" },
      { label: "顧客満足度", value: "CSAT 4.8/5", detail: "経営陣の評価" },
    ],
    chart: [
      { label: "専門家のレビュー回数", value: 4, unit: "往復" },
      { label: "会議準備の短縮", value: 40, unit: "時間/月" },
      { label: "意思決定スピード", value: 2, unit: "倍" },
    ],
  },
];

const journeySteps: JourneyStep[] = [
  {
    title: "課題ヒアリング",
    duration: "オンライン30分",
    timeSaved: "資料準備0時間",
    description: "事前アンケートと既存資料を共有いただくだけ。会議までに考えるべき論点をAIが整理します。",
  },
  {
    title: "AIドラフト生成",
    duration: "最短1日",
    timeSaved: "分析時間-20時間",
    description: "市場データの取り込みから財務シミュレーション、文章ドラフトまで自動生成します。",
  },
  {
    title: "専門家レビュー",
    duration: "2〜3営業日",
    timeSaved: "修正作業-12時間",
    description: "金融機関視点で裏付けをチェックし、リスクと対応策を補強。想定質問と答えも準備します。",
  },
  {
    title: "経営会議・提出",
    duration: "会議前に共有",
    timeSaved: "判断時間+15時間",
    description: "会議用サマリーと複数シナリオを提示。外部環境が変わってもその場で差し替え可能です。",
  },
];

const heroBenefits = [
  {
    title: "意思決定の時間を確保",
    description: "AIが資料づくりを担うので、経営者は考える時間に集中できます。",
  },
  {
    title: "外部環境を先に把握",
    description: "政策や競合の変化を自動通知。会議前にシナリオを差し替えられます。",
  },
  {
    title: "信頼できる裏付け",
    description: "専門家がレビューし、金融機関や投資家にも説明しやすい根拠を整理します。",
  },
];

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
    challenge: "銀行から翌期計画の即時提出を求められ、資料づくりが経営のボトルネックに。",
    result: "AIドラフトで交渉準備を60%短縮し、2.5億円の資金調達に成功。",
    metrics: [
      { label: "計画書ドラフト", before: 4, after: 1.5, unit: "日" },
      { label: "部門ヒアリング", before: 30, after: 12, unit: "時間" },
      { label: "差し替え対応", before: 48, after: 4, unit: "時間" },
    ],
    quote:
      "『AIが用意した最新データと複数シナリオで、役員会も銀行との面談も迷いなく進められました。』",
    person: "代表取締役 A社長",
  },
  {
    industry: "ITサービス（年商6.5億円）",
    challenge: "海外投資家向けに説得力のある財務シナリオと市場根拠を短期間で求められていた。",
    result: "ARR予測と外部データを自動更新し、月80時間かかっていた資料更新を3分の1に削減。",
    metrics: [
      { label: "資料更新工数", before: 80, after: 26, unit: "時間/月" },
      { label: "想定問答の準備", before: 15, after: 5, unit: "時間" },
      { label: "投資家からの追加質問", before: 12, after: 0, unit: "件" },
    ],
    quote:
      "『市場指数が週次で反映されるので、会議の議題が“次の一手”に変わりました。』",
    person: "CFO B氏",
  },
  {
    industry: "多店舗飲食（年商9億円）",
    challenge: "出店判断に必要な市場データがバラバラで、意思決定が後ろ倒しになっていた。",
    result: "地域別データを自動統合し、出店判断までのリードタイムを70%短縮。",
    metrics: [
      { label: "市場調査", before: 14, after: 5, unit: "日" },
      { label: "会議準備", before: 20, after: 6, unit: "時間" },
      { label: "月次の見直し", before: 8, after: 2, unit: "時間" },
    ],
    quote:
      "『AIが見せてくれたビフォー／アフターのグラフで、現場との会話が揃いました。』",
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
    badge: "まず試したい方に",
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
    badge: "人気 No.1",
    featured: true,
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
    badge: "大型案件向け",
  },
];

const formatNumber = (value: number) => Math.round(value).toLocaleString("ja-JP");

const formatDecimal = (value: number) => (Number.isInteger(value) ? value.toString() : value.toFixed(1));

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
  const [activeCapabilityId, setActiveCapabilityId] = useState<string>(capabilityTabs[0].id);
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

  const activeCapability = useMemo(
    () => capabilityTabs.find((capability) => capability.id === activeCapabilityId) ?? capabilityTabs[0],
    [activeCapabilityId]
  );

  const capabilityChartMax = useMemo(() => {
    return capabilityTabs.reduce((max, capability) => {
      const capabilityMax = capability.chart.reduce((innerMax, item) => Math.max(innerMax, item.value), 0);
      return Math.max(max, capabilityMax);
    }, 0);
  }, []);

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
              <p className="badge">中小企業のためのAI経営計画</p>
              <h1>迷わず決断する時間を、AIがつくる。</h1>
              <p className="hero-subtitle">
                外部環境の変化をAIが読み取り、最短1日で意思決定に使える経営計画書をお届けします。
              </p>
              <p className="subtitle">
                市場データ、資金繰りの予測、計画書の文章までをAIが下書き。専門家が裏付けを整えて、金融機関や投資家にも伝わる形で仕上げます。
              </p>
              <div className="hero-benefits">
                {heroBenefits.map((benefit) => (
                  <div className="benefit-card" key={benefit.title}>
                    <strong>{benefit.title}</strong>
                    <p>{benefit.description}</p>
                  </div>
                ))}
              </div>
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
                    <span className="metric-note">準備期間を短縮</span>
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
                    <span className="metric-note">意思決定に充てられる時間</span>
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

        <section className="journey reveal-on-scroll" id="journey">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">AIと専門家が経営者の時間を取り戻す流れ</h2>
              <p className="section-lead">
                最初のヒアリングから意思決定の瞬間まで。生成AIが外部環境を先に捉え、専門家が確度を高めることで、考える時間と行動のスピードを両立します。
              </p>
            </div>
            <div className="journey-steps">
              {journeySteps.map((step, index) => (
                <article className="journey-step" key={step.title}>
                  <span className="journey-index">STEP {index + 1}</span>
                  <h3>{step.title}</h3>
                  <p className="journey-duration">{step.duration}</p>
                  <p className="journey-timesaved">{step.timeSaved}</p>
                  <p>{step.description}</p>
                </article>
              ))}
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
                  毎日のニュースや競合の動きが多すぎて、整理だけで会議の時間が来てしまう。
                </p>
                <p className="pain-solution">→ 生成AIが一次情報を自動収集・要約し、見るべき指標だけを可視化。</p>
              </article>
              <article className="pain-card">
                <h3>02. 数字の裏付けと文章づくりに時間を奪われる</h3>
                <p>
                  エクセルとスライドを行き来して整合性をとるうちに、肝心な判断の時間がなくなる。
                </p>
                <p className="pain-solution">→ AIが財務シミュレーションから文章ドラフトまで一気通貫で生成。</p>
              </article>
              <article className="pain-card">
                <h3>03. 最新の外部環境を反映した更新ができない</h3>
                <p>
                  金融機関や投資家からの質問にすぐ答えられず、判断のタイミングを逃してしまう。
                </p>
                <p className="pain-solution">→ ダッシュボードでシナリオを切り替え、専門家が24時間以内にレビューを返答。</p>
              </article>
            </div>
          </div>
        </section>

        <section className="capabilities reveal-on-scroll" id="capabilities">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-title">4つの連携で、変化に強い経営計画を最短で</h2>
              <p className="section-lead">
                タブを切り替えると、AIと専門家がどのように役割分担し、判断に必要な数字とストーリーを整えていくかが確認できます。
              </p>
            </div>
            <div className="capabilities-layout">
              <div className="capabilities-tabs" role="tablist" aria-label="生成AIと専門家の役割">
                {capabilityTabs.map((capability) => {
                  const isActive = activeCapabilityId === capability.id;
                  return (
                    <button
                      key={capability.id}
                      className={isActive ? "capability-tab is-active" : "capability-tab"}
                      role="tab"
                      aria-selected={isActive}
                      type="button"
                      onClick={() => setActiveCapabilityId(capability.id)}
                    >
                      <span className="capability-tab__title">{capability.title}</span>
                      <span className="capability-tab__subtitle">{capability.subtitle}</span>
                    </button>
                  );
                })}
              </div>
              <div className="capability-panel" role="tabpanel" aria-live="polite">
                <header className="capability-panel__header">
                  <h3>{activeCapability.title}</h3>
                  <p className="capability-panel__subtitle">{activeCapability.subtitle}</p>
                </header>
                <p className="capability-description">{activeCapability.description}</p>
                <ul className="capability-points">
                  {activeCapability.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="capability-highlights">
                  {activeCapability.highlights.map((highlight) => (
                    <div className="capability-highlight" key={highlight.label}>
                      <span className="capability-highlight__label">{highlight.label}</span>
                      <strong>{highlight.value}</strong>
                      <span className="capability-highlight__detail">{highlight.detail}</span>
                    </div>
                  ))}
                </div>
                <div className="capability-chart" aria-label={`${activeCapability.title}の効果指標`}>
                  {activeCapability.chart.map((item) => {
                    const widthPercent = capabilityChartMax > 0 ? Math.max((item.value / capabilityChartMax) * 100, 8) : 8;
                    const clampedWidth = Math.min(widthPercent, 100);
                    return (
                      <div className="capability-chart__row" key={item.label}>
                        <div className="capability-chart__info">
                          <span className="capability-chart__label">{item.label}</span>
                          <span className="capability-chart__value">{formatDecimal(item.value)} {item.unit}</span>
                        </div>
                        <div className="capability-chart__bar">
                          <span className="capability-chart__fill" style={{ width: `${clampedWidth}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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
                  <p className="case-result">{story.result}</p>
                  <div className="case-compare">
                    {story.metrics.map((metric) => {
                      const maxValue = Math.max(metric.before, metric.after, 1);
                      const beforeWidth = Math.min(Math.max((metric.before / maxValue) * 100, 8), 100);
                      const afterWidth = Math.min(Math.max((metric.after / maxValue) * 100, 8), 100);
                      return (
                        <div className="case-compare__item" key={metric.label}>
                          <div className="case-compare__header">{metric.label}</div>
                          <div className="case-compare__bars">
                            <div className="case-bar case-bar--before" style={{ width: `${beforeWidth}%` }}>
                              <span className="case-bar__label">導入前 {formatDecimal(metric.before)}{metric.unit}</span>
                            </div>
                            <div className="case-bar case-bar--after" style={{ width: `${afterWidth}%` }}>
                              <span className="case-bar__label">導入後 {formatDecimal(metric.after)}{metric.unit}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
                <div
                  className={plan.featured ? "plan-table__row is-featured" : "plan-table__row"}
                  role="row"
                  key={plan.name}
                >
                  <div role="cell" className="plan-name">
                    <strong>{plan.name}</strong>
                    {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
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
              <div className="form-security">
                <h3>セキュリティも安心</h3>
                <ul>
                  <li>AES-256による通信・保存の暗号化</li>
                  <li>多要素認証とIP制限でアクセスを管理</li>
                  <li>ISO/IEC 27001・27701取得、年次の外部監査を実施</li>
                </ul>
              </div>
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
