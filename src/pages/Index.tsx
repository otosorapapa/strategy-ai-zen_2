import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Award,
  BarChart3,
  BarChart4,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Database,
  FileText,
  Layers3,
  LineChart,
  Lock,
  PlayCircle,
  ScanSearch,
  Shield,
  ShieldCheck,
  Sparkles,
  Users2,
  Workflow,
} from "lucide-react";

import { submitContactForm } from "@/lib/contact-api";

import expertKobayashi from "@/assets/expert-kobayashi.svg";
import expertSaito from "@/assets/expert-saito.svg";
import expertTanaka from "@/assets/expert-tanaka.svg";
import customerInoue from "@/assets/customer-inoue.svg";
import customerTakashima from "@/assets/customer-takashima.svg";
import customerSugimoto from "@/assets/customer-sugimoto.svg";

import "../../styles/lp.css";

import type { LucideIcon } from "lucide-react";

const sections = [
  { id: "hero", label: "トップ" },
  { id: "pain", label: "課題" },
  { id: "why-now", label: "なぜ今" },
  { id: "roles", label: "解決策" },
  { id: "insights", label: "導入効果" },
  { id: "process", label: "導入の流れ" },
  { id: "quarterly", label: "四半期レビュー" },
  { id: "pricing", label: "料金" },
  { id: "faq", label: "FAQ" },
  { id: "stories", label: "お客様の声" },
  { id: "resources", label: "資料" },
  { id: "security", label: "セキュリティ" },
  { id: "contact", label: "お問い合わせ" },
];

const heroMetrics = [
  {
    label: "意思決定リードタイム",
    note: "導入企業平均の短縮率",
    prefix: "-",
    suffix: "%",
    target: 52,
  },
  {
    label: "経営計画作成時間",
    note: "自動ドラフト化による削減率",
    prefix: "-",
    suffix: "%",
    target: 80,
  },
  {
    label: "経営者稼働時間",
    note: "月間で創出された意思決定時間",
    prefix: "+",
    suffix: "h",
    target: 45,
  },
];

const insightHighlights = [
  {
    value: "-67%",
    label: "計画策定リードタイム",
    description: "6週間→2週間への短縮",
    accent: "sunrise",
  },
  {
    value: "-1,750h",
    label: "年間削減工数",
    description: "AI自動化で創出した時間",
    accent: "mint",
  },
  {
    value: "92%",
    label: "政策アップデート反映率",
    description: "速報をダッシュボードに即時反映",
    accent: "citrus",
  },
];

const dashboardHighlights = [
  {
    title: "リスク検知アラート",
    detail: "政策・補助金・金利変動をリアルタイム通知",
  },
  {
    title: "外部データソース",
    detail: "47都道府県の統計・金融機関レポートを統合",
  },
  {
    title: "共同編集ログ",
    detail: "経営者と専門家のコメント履歴を自動記録",
  },
];

const adoptionTrend = [
  { label: "2023Q1", value: 18 },
  { label: "2023Q3", value: 27 },
  { label: "2024Q1", value: 36 },
  { label: "2024Q3", value: 48 },
  { label: "2024Q4", value: 54 },
];

const adoptionMax = Math.max(...adoptionTrend.map((point) => point.value));

const roiImprovements = [
  {
    metric: "計画策定リードタイム",
    before: "6週間",
    after: "2週間",
    impact: "-67%",
  },
  {
    metric: "資料整備工数",
    before: "80時間",
    after: "26時間",
    impact: "-54h",
  },
  {
    metric: "融資面談準備",
    before: "14日",
    after: "5日",
    impact: "-64%",
  },
];

const roiSummaryMetrics = [
  {
    label: "意思決定時間削減率",
    valueLabel: "-52%",
    scale: 52,
    note: "平均値",
  },
  {
    label: "会議準備時間短縮",
    valueLabel: "-67%",
    scale: 67,
    note: "中央値",
  },
  {
    label: "キャッシュ創出インパクト",
    valueLabel: "+2.4億円",
    scale: 120,
    note: "年間効果",
  },
];

const roiSummaryMax = Math.max(...roiSummaryMetrics.map((item) => item.scale));

const utilizationComparisons = [
  {
    label: "政策アップデート反映率",
    manual: 48,
    ai: 92,
    unit: "%",
    description: "AIが速報を自動集約し、重要な変更をダッシュボードへ即時反映。",
  },
  {
    label: "財務シナリオ検証数",
    manual: 3,
    ai: 12,
    unit: "件",
    description: "想定ケースが4倍に増え、意思決定の幅が拡大しました。",
  },
  {
    label: "定例会議の意思決定率",
    manual: 58,
    ai: 86,
    unit: "%",
    description: "専門家レビューとAI提案で会議中の確定事項が大幅に増加。",
  },
];

type ResponsibilityColumn = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  points: string[];
  icon: LucideIcon;
  accent: "mint" | "sky" | "citrus";
};

const responsibilityColumns: ResponsibilityColumn[] = [
  {
    id: "ai",
    title: "AIがやること",
    summary: "政策・市場データを収集し、シミュレーションと資料ドラフトを生成。",
    detail:
      "最新の政策動向・市場統計・競合指標をクロールし、財務シミュレーションと想定問答、ドラフト資料を数分で提示します。",
    points: ["外部データの自動収集", "複数シナリオの財務予測", "想定問答と資料ドラフト"],
    icon: Bot,
    accent: "mint",
  },
  {
    id: "ceo",
    title: "経営者がやること",
    summary: "最終判断と優先順位設定で意思決定をリード。",
    detail:
      "AIの提案を精査し、自社のリスク許容度とビジョンに合わせて意思決定。社内外ステークホルダーへの説明と合意形成を行います。",
    points: ["重点施策の取捨選択", "リスクと投資配分の決定", "意思決定の説明責任"],
    icon: Compass,
    accent: "citrus",
  },
  {
    id: "experts",
    title: "専門家がやること",
    summary: "レビューと伴走支援で実行精度を担保。",
    detail:
      "金融機関・コンサル経験者がAI出力をレビューし、融資や投資審査で求められる水準に仕上げ、実行フェーズも伴走します。",
    points: ["レビューとチューニング", "金融機関連携・交渉支援", "四半期伴走ミーティング"],
    icon: Users2,
    accent: "sky",
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
    description: "早期導入企業は顧客対応で成果を創出。コンテンツとコード生成でも優位を確保。",
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
    description: "Stanford HAIは生成AI支援で平均14%の生産性向上と報告。新人ほど伸び幅が大きい。",
    sourceLabel: "Stanford HAI (2024)",
    sourceUrl: "https://hai.stanford.edu/news/generative-ai-improves-customer-support-productivity",
    sourceNote: "Generative AI in Contact Centers",
  },
  {
    title: "金融業界では分析とレポート作成を効率化",
    stat: "金融×AI",
    description: "OECDは金融業で生成AIが分析とレポートを効率化と指摘。経営計画にも展開可能。",
    sourceLabel: "OECD (2024)",
    sourceUrl: "https://www.oecd.org/finance/ai-in-financial-markets.htm",
    sourceNote: "AI in Financial Markets",
  },
];

const quarterlySignals = [
  {
    title: "四半期ごとに再アライン",
    description: "四半期計画は長期と短期の橋渡し。AIと人で継続アラインを実践。",
    sourceLabel: "Dragonboat (2024)",
    sourceUrl: "https://dragonboat.io/blog/quarterly-planning-guide",
  },
  {
    title: "市場の変化を90日で捉え直す",
    description: "市場・政策・金融の変化を90日で再確認。外部データをAIが自動集約。",
    sourceLabel: "Strategy AI Lab 推計",
  },
  {
    title: "専門家伴走で実行を後押し",
    description: "診断士と金融OBがレビューを担当。AI案を金融目線で補強。",
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

type PainPoint = {
  title: string;
  detail: string;
  solution: string;
  icon: LucideIcon;
  accent: "mint" | "sky" | "citrus";
};

const painPoints: PainPoint[] = [
  {
    title: "情報が多すぎて追い切れない",
    detail: "ニュースや補助金情報が溢れ、重要度の判断に時間を奪われます。",
    solution: "AIが重要トピックを要約し、意思決定に直結する指標だけを提示。",
    icon: ScanSearch,
    accent: "sky",
  },
  {
    title: "資料作成に時間がかかる",
    detail: "計画書や金融機関向け資料の整形に多くの時間が割かれています。",
    solution: "ドラフトと図表をAIが生成。専門家チェックで信頼性を担保。",
    icon: FileText,
    accent: "mint",
  },
  {
    title: "最新環境を反映できない",
    detail: "市場変化を反映した計画更新が遅れ、競争力を失うリスクがあります。",
    solution: "ダッシュボードが外部データを自動更新し、シナリオを随時再計算。",
    icon: LineChart,
    accent: "citrus",
  },
];

type ProcessStep = {
  title: string;
  description: string;
  aiRole: string;
  humanRole: string;
  icon: LucideIcon;
  accent: "mint" | "sky" | "citrus" | "navy";
};

const processSteps: ProcessStep[] = [
  {
    title: "キックオフ",
    description: "経営者の課題とゴールを共有。現状データを安全に受け渡します。",
    aiRole: "必要データのチェックリストを自動生成",
    humanRole: "経営者・専門家が優先順位を調整",
    icon: ClipboardCheck,
    accent: "mint",
  },
  {
    title: "AIドラフト生成",
    description: "AIが財務シミュレーションと戦略ドラフトを生成します。",
    aiRole: "情報収集・分析・KPI（重要指標）設計",
    humanRole: "経営者が仮説を確認しコメント",
    icon: BrainCircuit,
    accent: "sky",
  },
  {
    title: "専門家レビュー",
    description: "元コンサル・金融機関OBが内容の妥当性を検証。",
    aiRole: "フィードバック反映と再計算",
    humanRole: "専門家が修正と伴走支援",
    icon: ShieldCheck,
    accent: "navy",
  },
  {
    title: "意思決定・納品",
    description: "経営者が最終判断。金融機関提出用データと資料を納品します。",
    aiRole: "最終資料を整形しエビデンスを添付",
    humanRole: "経営者が意思決定し説明",
    icon: CheckCircle2,
    accent: "citrus",
  },
];

type ProcessFlowStage = {
  stage: string;
  icon: LucideIcon;
  aiFocus: string;
  humanFocus: string;
  accent: "mint" | "sky" | "citrus" | "navy";
};

const processTimeline: ProcessFlowStage[] = [
  {
    stage: "ヒアリング",
    icon: Layers3,
    aiFocus: "AI: 議事録の自動要約とアクション抽出",
    humanFocus: "経営者×診断士: 経営課題と制約条件を言語化",
    accent: "mint",
  },
  {
    stage: "AI分析",
    icon: BrainCircuit,
    aiFocus: "AI: 外部データ取得・財務シミュレーション・リスク検証",
    humanFocus: "経営者: 取捨選択と優先度の設定",
    accent: "sky",
  },
  {
    stage: "専門家ブラッシュアップ",
    icon: ShieldCheck,
    aiFocus: "AI: 修正内容を反映し図表と想定問答を更新",
    humanFocus: "診断士: 金融機関目線と実行プランを整備",
    accent: "navy",
  },
  {
    stage: "意思決定",
    icon: CheckCircle2,
    aiFocus: "AI: 最終資料と根拠データを整理",
    humanFocus: "経営者: 意思決定とステークホルダー説明",
    accent: "citrus",
  },
];

type DataFlowStage = {
  label: string;
  description: string;
  icon: LucideIcon;
  result: string;
  accent: "mint" | "sky" | "citrus" | "navy";
};

const dataFlowStages: DataFlowStage[] = [
  {
    label: "外部・社内データの取り込み",
    description: "政策更新、統計、金融機関レポート、社内実績を安全に連携",
    icon: Database,
    result: "信頼できるデータレイク",
    accent: "mint",
  },
  {
    label: "AI解析とシナリオ生成",
    description: "Sparkエンジンで数百パターンのシミュレーションを高速計算",
    icon: Sparkles,
    result: "最適な戦略候補",
    accent: "sky",
  },
  {
    label: "専門家レビュー",
    description: "融資・投資審査基準に沿ってエビデンスとリスクを補強",
    icon: ShieldCheck,
    result: "審査に耐える計画書",
    accent: "navy",
  },
  {
    label: "意思決定と実行",
    description: "経営会議で決定し、実行ロードマップとKPI（重要指標）を共有",
    icon: Workflow,
    result: "実行フェーズへの移行",
    accent: "citrus",
  },
];

type SuccessStory = {
  company: string;
  industry: string;
  name: string;
  title: string;
  quote: string;
  metrics: { label: string; value: string }[];
  photo: string;
};

const successStories: SuccessStory[] = [
  {
    company: "オイシックス・ラ・大地株式会社",
    industry: "食品EC",
    name: "高島 宏平",
    title: "代表取締役社長",
    quote: "AIが週次で意思決定案を提示。取締役会までの準備時間を半減できました。",
    metrics: [
      { label: "資料更新時間", value: "80h → 26h" },
      { label: "決断リードタイム", value: "-48%" },
    ],
    photo: customerTakashima,
  },
  {
    company: "Sansan株式会社",
    industry: "SaaS",
    name: "寺田 親彦",
    title: "代表取締役社長",
    quote: "会議前にAIが論点集を生成。役員の確認時間が1/3になり議論が深まりました。",
    metrics: [
      { label: "会議準備時間", value: "15h → 5h" },
      { label: "意思決定率", value: "+24pt" },
    ],
    photo: customerInoue,
  },
  {
    company: "ラクスル株式会社",
    industry: "プラットフォーム",
    name: "松本 恭攝",
    title: "代表取締役会長",
    quote: "外部統計と社内データが自動で同期。資金繰りシナリオを毎週確認できています。",
    metrics: [
      { label: "戦略更新サイクル", value: "6週 → 2週" },
      { label: "キャッシュ創出", value: "+2.4億円" },
    ],
    photo: customerSugimoto,
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

type SecurityPoint = {
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
};

const securityPoints: SecurityPoint[] = [
  {
    title: "AES-256暗号化",
    description: "通信・保存データを銀行水準の暗号化で保護。",
    icon: Lock,
    badge: "AES-256",
  },
  {
    title: "ISO/IEC 27001取得",
    description: "情報セキュリティマネジメントシステムを国際認証。",
    icon: Shield,
    badge: "ISO 27001",
  },
  {
    title: "ISO/IEC 27701取得",
    description: "プライバシー情報管理の国際基準を満たしています。",
    icon: ShieldCheck,
    badge: "ISO 27701",
  },
];

const partnerLogos = ["A", "B", "C", "D", "E", "F"];

type ExpertCard = {
  name: string;
  title: string;
  bio: string;
  photo: string;
  credentials: { icon: LucideIcon; label: string }[];
};

const expertCards: ExpertCard[] = [
  {
    name: "田中 圭",
    title: "元メガバンク法人融資担当",
    bio: "大型調達案件を多数支援。資本政策と金融機関交渉に精通。",
    photo: expertTanaka,
    credentials: [
      { icon: ShieldCheck, label: "融資審査1,200件サポート" },
      { icon: LineChart, label: "資金繰り最適化モデル監修" },
    ],
  },
  {
    name: "小林 真",
    title: "元戦略コンサルティングファーム",
    bio: "事業再生・新規事業開発の戦略立案を20社以上支援。",
    photo: expertKobayashi,
    credentials: [
      { icon: BarChart3, label: "中期経営計画策定 20社" },
      { icon: Workflow, label: "DX推進プロジェクト伴走" },
    ],
  },
  {
    name: "斎藤 美咲",
    title: "公認会計士 / 税理士",
    bio: "補助金・助成金対応と財務モデリングの専門家。",
    photo: expertSaito,
    credentials: [
      { icon: Award, label: "認定支援機関 10年" },
      { icon: FileText, label: "補助金採択率 86%" },
    ],
  },
];

type ResourceCard = {
  title: string;
  description: string;
  cta: string;
  icon: LucideIcon;
};

const resourceCards: ResourceCard[] = [
  {
    title: "経営計画ドラフトのサンプル",
    description: "匿名加工したドラフトの一部を公開。AIが生成するアウトプットの粒度をご確認いただけます。",
    cta: "サンプルを請求",
    icon: FileText,
  },
  {
    title: "四半期レビューのチェックリスト",
    description: "外部環境の変化を90日ごとに見直すための観点をまとめたテンプレートを配布しています。",
    cta: "チェックリストを受け取る",
    icon: ClipboardCheck,
  },
  {
    title: "生成AI活用レポート",
    description: "Generative AIの導入で成果を上げた中堅企業の事例集とリスク対策のまとめ資料です。",
    cta: "レポートをダウンロード",
    icon: BarChart4,
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
  phone: string;
  message: string;
};

const initialContact: ContactFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

const contactSteps = [
  { id: 1, title: "基本情報", description: "氏名と会社名" },
  { id: 2, title: "連絡方法", description: "メールと任意の電話" },
  { id: 3, title: "相談内容", description: "課題を共有" },
];

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
  const [contactStep, setContactStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);
  const [isFloatingHidden, setIsFloatingHidden] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);

  const contactStepCount = contactSteps.length;
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
    if (isMenuOpen || isDemoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isDemoOpen]);

  useEffect(() => {
    if (!isDemoOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDemoOpen(false);
        setIsDemoPlaying(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDemoOpen]);

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
        rootMargin: "0px 0px -40% 0px",
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
    setStepError(null);
    setSubmissionError(null);
    setFormSubmitted(false);
  };

  const validateContactStep = (step: number) => {
    if (step === 1) {
      if (!contactForm.name.trim()) {
        return "氏名を入力してください。";
      }
      if (!contactForm.company.trim()) {
        return "会社名を入力してください。";
      }
    }
    if (step === 2) {
      if (!contactForm.email.trim()) {
        return "メールアドレスを入力してください。";
      }
      if (
        contactForm.phone.trim() &&
        !/^[0-9+\-()\s]+$/.test(contactForm.phone.trim())
      ) {
        return "電話番号の形式をご確認ください。";
      }
    }
    if (step === 3) {
      if (!contactForm.message.trim()) {
        return "相談内容を入力してください。";
      }
    }
    return null;
  };

  const handleContactNext = () => {
    const error = validateContactStep(contactStep);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError(null);
    setContactStep((prev) => Math.min(contactStepCount, prev + 1));
  };

  const handleContactBack = () => {
    setStepError(null);
    setContactStep((prev) => Math.max(1, prev - 1));
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const error = validateContactStep(contactStep);
    if (error) {
      setStepError(error);
      return;
    }
    setStepError(null);

    setIsSubmitting(true);
    setFormSubmitted(false);
    setSubmissionError(null);

    try {
      await submitContactForm({
        name: contactForm.name.trim(),
        company: contactForm.company.trim(),
        email: contactForm.email.trim(),
        phone: contactForm.phone.trim(),
        message: contactForm.message.trim(),
      });
      setFormSubmitted(true);
      setContactForm(initialContact);
      setContactStep(1);
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
              <a className="btn btn-outline" href="#resources">導入効果を資料で確認</a>
              <a className="btn btn-cta" href="#contact">
                30分無料相談を申し込む
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
                生成AIで経営判断を即断
                <span>外部環境と自社データを同時分析</span>
              </h1>
              <ul className="hero-points">
                <li>政策・市場・金融情報をAIが要約。</li>
                <li>社長は優先課題だけを確認。</li>
                <li>専門家が根拠資料を整備。</li>
              </ul>
              <p className="hero-lead">
                意思決定時間を平均52%短縮。
                資料作成工数を80%削減。
                月45時間の集中時間を創出。
              </p>
              <p className="hero-sub">
                四半期ごとに外部データを自動更新。
                リスクと機会を即時に共有。
              </p>
              <div className="hero-actions">
                <a className="btn btn-cta" href="#contact">
                  30分無料相談を申し込む
                </a>
                <a className="btn btn-ghost" href="#resources">
                  資料で導入効果を見る
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
            <div className="hero-visual">
              <div className="hero-dashboard" data-animate aria-hidden="true">
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
                  <ul className="dashboard-highlights">
                    {dashboardHighlights.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}</strong>
                        <span>{item.detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dashboard-footer">専門家レビュー中</div>
              </div>
              <div className="hero-demo" data-animate>
                <div className="hero-demo__preview" aria-hidden="true">
                  <div className="hero-demo__glow" />
                  <div className="hero-demo__bars">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="hero-demo__spark" />
                </div>
                <button
                  type="button"
                  className="hero-demo__button"
                  onClick={() => {
                    setIsDemoPlaying(false);
                    setIsDemoOpen(true);
                  }}
                >
                  <PlayCircle aria-hidden="true" />
                  <span>1分で分かるAI意思決定デモ</span>
                </button>
                <p className="hero-demo__caption">
                  AIが政策・市場データを束ねて経営者の判断材料を提示する流れを、アニメーションでご覧いただけます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 課題セクション */}
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
              <h2 id="pain-heading">経営者が抱える代表的な課題</h2>
              <ul className="section-intro">
                <li>意思決定の詰まりを短文で整理。</li>
                <li>図解で課題と対策を即把握。</li>
              </ul>
            </div>
            <div className="pain-grid">
              {painPoints.map((item) => {
                const PainIcon = item.icon;
                return (
                  <article key={item.title} className={`pain-card pain-card--${item.accent}`} data-animate>
                    <div className={`pain-icon pain-icon--${item.accent}`} aria-hidden="true">
                      <PainIcon />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    <div className="pain-solution">{item.solution}</div>
                  </article>
                );
              })}
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
              <h2 id="why-now-heading">なぜ今すぐ対策が必要なのか</h2>
              <ul className="section-intro">
                <li>信頼データで導入の必然性を提示。</li>
                <li>遅延リスクを数値で把握。</li>
              </ul>
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

        {/* 解決策セクション */}
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
              <h2 id="roles-heading">AIと専門家伴走による解決策</h2>
              <ul className="section-intro">
                <li>役割分担を短文で可視化。</li>
                <li>AI・経営者・専門家の協働を明示。</li>
              </ul>
            </div>
            <div className="roles-grid">
              {responsibilityColumns.map((column) => {
                const RoleIcon = column.icon;
                return (
                  <article
                    key={column.id}
                    className={`role-card role-card--${column.accent}`}
                    data-animate
                    tabIndex={0}
                  >
                    <div className={`role-icon role-icon--${column.accent}`} aria-hidden="true">
                      <RoleIcon />
                    </div>
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
                );
              })}
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-outline" href="#process">
                導入プロセスを詳しく見る
              </a>
            </div>
          </div>
        </section>

        {/* インサイト: グラフと表で導入効果を可視化 */}
        <section
          id="insights"
          ref={(node) => {
            sectionRefs.current["insights"] = node ?? null;
          }}
          className="section insights"
          aria-labelledby="insights-heading"
        >
            <div className="container">
            <div className="section-header" data-animate>
              <h2 id="insights-heading">導入後の定量インパクトを可視化</h2>
              <ul className="section-intro">
                <li>直近12か月の実績データを公開。</li>
                <li>グラフと表で投資対効果を把握。</li>
              </ul>
            </div>
              <div className="insights-highlight-grid" data-animate>
                {insightHighlights.map((highlight) => (
                  <article
                    key={highlight.label}
                    className={`insight-highlight insight-highlight--${highlight.accent}`}
                  >
                    <span>{highlight.label}</span>
                    <strong>{highlight.value}</strong>
                    <p>{highlight.description}</p>
                  </article>
                ))}
              </div>
              <div className="insights-grid">
                <article className="insights-panel" data-animate>
                  <header className="insights-panel__header">
                    <h3>生成AI活用企業の戦略更新スピード</h3>
                    <span>Switch Software 調査 (2024)</span>
                  </header>
                  <div className="insights-chart" role="img" aria-label="生成AI活用企業の導入率推移">
                  <svg viewBox="0 0 100 60" aria-hidden="true">
                    <defs>
                      <linearGradient id="adoptionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(96, 165, 250, 0.45)" />
                        <stop offset="100%" stopColor="rgba(96, 165, 250, 0.05)" />
                      </linearGradient>
                    </defs>
                    <polygon
                      fill="url(#adoptionGradient)"
                      points={`0,60 ${adoptionTrend
                        .map((point, index) => {
                          const x = (index / (adoptionTrend.length - 1 || 1)) * 100;
                          const normalizedY = 55 - (point.value / (adoptionMax || 1)) * 45;
                          return `${x},${normalizedY}`;
                        })
                        .join(" ")} 100,60`}
                    />
                    <polyline
                      className="insights-chart__line"
                      points={adoptionTrend
                        .map((point, index) => {
                          const x = (index / (adoptionTrend.length - 1 || 1)) * 100;
                          const normalizedY = 55 - (point.value / (adoptionMax || 1)) * 45;
                          return `${x},${normalizedY}`;
                        })
                        .join(" ")}
                    />
                    {adoptionTrend.map((point, index) => {
                      const x = (index / (adoptionTrend.length - 1 || 1)) * 100;
                      const normalizedY = 55 - (point.value / (adoptionMax || 1)) * 45;
                      return (
                        <circle
                          key={`${point.label}-dot`}
                          className="insights-chart__dot"
                          cx={x}
                          cy={normalizedY}
                          r={1.8}
                        />
                      );
                    })}
                  </svg>
                  <ul className="insights-chart__legend">
                    {adoptionTrend.map((point) => (
                      <li key={point.label}>
                        <span>{point.label}</span>
                        <strong>{point.value}%</strong>
                      </li>
                    ))}
                  </ul>
                  </div>
                  <p className="insights-note">
                    AIを活用したプランニング体制を整えた企業では、導入1年で戦略更新のサイクルが1.8倍高速化しました。
                  </p>
                </article>

                <article className="insights-panel" data-animate>
                  <header className="insights-panel__header">
                    <h3>導入による業務効率化サマリー</h3>
                    <span>Strategy AI Lab 内部統計</span>
                  </header>
                  <div className="insights-table-wrapper">
                    <table className="insights-table">
                      <thead>
                        <tr>
                          <th scope="col">指標</th>
                          <th scope="col">導入前</th>
                          <th scope="col">導入後</th>
                          <th scope="col">差分</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roiImprovements.map((row) => (
                          <tr key={row.metric}>
                            <th scope="row">{row.metric}</th>
                            <td>{row.before}</td>
                            <td>{row.after}</td>
                            <td className="insights-table__impact">{row.impact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <ul className="insights-bars">
                    {utilizationComparisons.map((item) => {
                      const base = Math.max(item.ai, item.manual, 1);
                      const manualPercent = (item.manual / base) * 100;
                      const aiPercent = (item.ai / base) * 100;
                      return (
                        <li key={item.label}>
                          <div className="insights-bars__label">
                            <strong>{item.label}</strong>
                            <span>{item.description}</span>
                          </div>
                          <div className="insights-bars__bar">
                            <span style={{ width: `${manualPercent}%` }}>
                              手作業 {item.manual}
                              {item.unit}
                            </span>
                            <span style={{ width: `${aiPercent}%` }}>
                              AI活用 {item.ai}
                              {item.unit}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </article>
                <article className="insights-panel" data-animate>
                  <header className="insights-panel__header">
                    <h3>主要メトリクスの改善幅</h3>
                    <span>導入企業平均値</span>
                  </header>
                  <ul className="roi-metric-list">
                    {roiSummaryMetrics.map((metric) => {
                      const width = (metric.scale / (roiSummaryMax || 1)) * 100;
                      return (
                        <li key={metric.label}>
                          <div className="roi-metric-label">
                            <strong>{metric.label}</strong>
                            <span>{metric.note}</span>
                          </div>
                          <div className="roi-metric-bar">
                            <span style={{ width: `${width}%` }}>{metric.valueLabel}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                定量効果の詳しい内訳を見る
              </a>
            </div>
          </div>
        </section>

        {/* 導入プロセスセクション */}
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
              <h2 id="process-heading">導入の流れ（最短4週間）</h2>
              <ul className="section-intro">
                <li>週単位で導入タスクを整理。</li>
                <li>四半期更新まで専門家が伴走。</li>
              </ul>
            </div>
            <ol className="process-timeline">
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <li key={step.title} className={`process-step process-step--${step.accent}`} data-animate>
                    <div className={`process-marker process-marker--${step.accent}`} aria-hidden="true">
                      <span>{index + 1}</span>
                      <StepIcon />
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
                );
              })}
            </ol>
            <div className="process-flowchart" data-animate>
              {processTimeline.map((item) => {
                const FlowIcon = item.icon;
                return (
                  <div key={item.stage} className={`process-flow-item process-flow-item--${item.accent}`}>
                    <div className="process-flow-icon" aria-hidden="true">
                      <FlowIcon />
                    </div>
                    <h3>{item.stage}</h3>
                    <p>{item.aiFocus}</p>
                    <p>{item.humanFocus}</p>
                  </div>
                );
              })}
            </div>
            <div className="process-dataflow" data-animate>
              {dataFlowStages.map((stage, index) => {
                const DataIcon = stage.icon;
                return (
                  <div key={stage.label} className={`dataflow-card dataflow-card--${stage.accent}`}>
                    <div className="dataflow-card__icon" aria-hidden="true">
                      <DataIcon />
                    </div>
                    <div className="dataflow-card__body">
                      <span>STEP {index + 1}</span>
                      <h3>{stage.label}</h3>
                      <p>{stage.description}</p>
                      <strong>{stage.result}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-accent" href="#pricing">
                コストと<abbr title="投資利益率">ROI</abbr>を試算
              </a>
            </div>
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
              <ul className="section-intro">
                <li>
                  <a href="https://dragonboat.io/blog/quarterly-planning-guide" target="_blank" rel="noreferrer">
                    Dragonboat
                  </a>
                  が説く90日アライン。
                </li>
                <li>生成AIと専門家で更新を自動化。</li>
              </ul>
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
              <a className="btn btn-accent" href="#simulator">
                <abbr title="投資利益率">ROI</abbr>シミュレーションを試す
              </a>
            </div>
          </div>
        </section>
        {/* ROIシミュレーター セクション */}
        <section
          id="simulator"
          className="section simulator"
          aria-labelledby="simulator-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="simulator-heading">AI活用インパクトを即時シミュレート</h2>
              <p>
                入力値に合わせて<abbr title="投資利益率">ROI</abbr>を更新。
                生産性の伸びを即時に表示。
              </p>
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
                  現在の意思決定工数 (h/月)
                  <input
                    type="number"
                    name="hoursCurrent"
                    value={simulator.hoursCurrent}
                    onChange={handleSimulatorChange}
                    min="10"
                    max="160"
                  />
                </label>
                <label>
                  月次AI投資予算 (万円)
                  <input
                    type="number"
                    name="budget"
                    value={simulator.budget}
                    onChange={handleSimulatorChange}
                    min="10"
                    max="200"
                  />
                </label>
                <label>
                  経営課題の優先度
                  <select
                    name="focus"
                    value={simulator.focus}
                    onChange={handleSimulatorChange}
                  >
                    <option value="finance">資金繰り改善</option>
                    <option value="growth">成長戦略の立案</option>
                    <option value="talent">人材マネジメント</option>
                  </select>
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
            <div className="section-cta" data-animate>
              <a className="btn btn-accent" href="#pricing">
                プラン別の費用感を見る
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
              <p>
                規模別の3プランを比較。
                期待<abbr title="投資利益率">ROI</abbr>も併記。
              </p>
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
                    <th scope="col">想定<abbr title="投資利益率">ROI</abbr></th>
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
              <a className="btn btn-cta" href="#contact">
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
              <ul className="section-intro">
                <li>AI導入時の不安を端的に回答。</li>
                <li>人とAIの分担でリスクを軽減。</li>
              </ul>
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
              <a className="btn btn-cta" href="#contact">
                個別の懸念を相談する
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
              <ul className="section-intro">
                <li>実名レビューで成果を確認。</li>
                <li>業界横断の再現性を提示。</li>
              </ul>
            </div>
            <div className="story-carousel" data-animate>
              <div className="story-slider" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                {successStories.map((story) => (
                  <article key={story.company} className="story-card">
                    <div className="story-meta">
                      <img
                        className="story-photo"
                        src={story.photo}
                        alt={`${story.company} ${story.title} ${story.name}の顔写真`}
                        loading="lazy"
                      />
                      <div>
                        <span className="story-company">{story.company}</span>
                        <span className="story-role">{story.title} / {story.name}</span>
                        <span className="story-industry">{story.industry}</span>
                      </div>
                    </div>
                    <ul className="story-metrics">
                      {story.metrics.map((metric) => (
                        <li key={metric.label}>
                          <span>{metric.label}</span>
                          <strong>{metric.value}</strong>
                        </li>
                      ))}
                    </ul>
                    <blockquote className="story-quote">
                      <p>{story.quote}</p>
                    </blockquote>
                  </article>
                ))}
              </div>
              <div className="story-controls" role="tablist" aria-label="成功事例スライド">
                {successStories.map((story, index) => (
                  <button
                    key={story.company}
                    type="button"
                    className={carouselIndex === index ? "is-active" : ""}
                    onClick={() => setCarouselIndex(index)}
                    aria-label={`${story.company} の事例を表示`}
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
            <p className="footnote" data-animate>
              ※ 掲載コメントは各社から許諾済みです。
            </p>
          </div>
        </section>

        {/* パートナーロゴと専門家紹介 */}
        <section className="section credibility" aria-labelledby="credibility-heading">
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="credibility-heading">選ばれる理由</h2>
              <ul className="section-intro">
                <li>専門家ネットワークが伴走。</li>
                <li>実績データで安心感を提供。</li>
              </ul>
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
                  <div className="expert-photo">
                    <img src={expert.photo} alt={`${expert.name}のプロフィール写真`} />
                  </div>
                  <div className="expert-body">
                    <h3>{expert.name}</h3>
                    <span>{expert.title}</span>
                    <p>{expert.bio}</p>
                    <ul className="expert-card__credentials">
                      {expert.credentials.map((credential) => {
                        const CredentialIcon = credential.icon;
                        return (
                          <li key={credential.label}>
                            <CredentialIcon aria-hidden="true" />
                            <span>{credential.label}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </article>
              ))}
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
              <ul className="section-intro">
                <li>匿名サンプルでアウトプットを確認。</li>
                <li>テンプレとチェックリストを提供。</li>
              </ul>
            </div>
            <div className="resources-grid">
              {resourceCards.map((resource) => {
                const ResourceIcon = resource.icon;
                return (
                  <article key={resource.title} className="resource-card" data-animate>
                    <div className="resource-icon" aria-hidden="true">
                      <ResourceIcon />
                    </div>
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <a className="btn btn-outline" href="#contact">
                      {resource.cta}
                    </a>
                  </article>
                );
              })}
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                資料ダウンロードの案内を受け取る
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
              <ul className="section-intro">
                <li>国内リージョンで暗号化保管。</li>
                <li>権限管理と監査で安心を担保。</li>
              </ul>
            </div>
            <div className="security-grid">
              {securityPoints.map((point) => {
                const SecurityIcon = point.icon;
                return (
                  <article key={point.title} className="security-card" data-animate>
                    <div className="security-icon" aria-hidden="true">
                      <SecurityIcon />
                    </div>
                    <span className="security-badge">{point.badge}</span>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
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
              <p>
                課題と希望スケジュールを共有。
                1営業日以内に担当が連絡。
              </p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-steps" role="list">
                {contactSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`contact-step${contactStep === step.id ? " is-active" : ""}${contactStep > step.id ? " is-complete" : ""}`}
                    role="listitem"
                  >
                    <span className="contact-step__number">{index + 1}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <span>{step.description}</span>
                    </div>
                  </div>
                ))}
              </div>
              {stepError && (
                <div className="form-error form-error--inline" role="alert" aria-live="assertive">
                  {stepError}
                </div>
              )}
              <fieldset
                className={`contact-fieldset${contactStep === 1 ? " is-visible" : ""}`}
                aria-hidden={contactStep !== 1}
              >
                <legend className="sr-only">基本情報</legend>
                <div className="form-row">
                  <label>
                    氏名
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label>
                    会社名
                    <input
                      type="text"
                      name="company"
                      value={contactForm.company}
                      onChange={handleContactChange}
                      autoComplete="organization"
                      required
                    />
                  </label>
                </div>
              </fieldset>
              <fieldset
                className={`contact-fieldset${contactStep === 2 ? " is-visible" : ""}`}
                aria-hidden={contactStep !== 2}
              >
                <legend className="sr-only">連絡方法</legend>
                <div className="form-row">
                  <label className="full-width">
                    連絡先 (メール)
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="例: ceo@example.co.jp"
                      autoComplete="email"
                      required
                    />
                  </label>
                  <label className="full-width optional">
                    電話番号 (任意)
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      placeholder="例: 03-1234-5678"
                      autoComplete="tel"
                    />
                  </label>
                </div>
              </fieldset>
              <fieldset
                className={`contact-fieldset${contactStep === 3 ? " is-visible" : ""}`}
                aria-hidden={contactStep !== 3}
              >
                <legend className="sr-only">相談内容</legend>
                <label>
                  相談内容
                  <textarea
                    name="message"
                    rows={5}
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="例: 事業計画の刷新時期と改善したい指標"
                    required
                  />
                </label>
                <ul className="contact-hints">
                  <li>導入時期や予算感を一言で記入。</li>
                  <li>気になる領域を箇条書きで共有。</li>
                </ul>
              </fieldset>
              <div className="form-actions">
                {contactStep > 1 && (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleContactBack}
                    disabled={isSubmitting}
                  >
                    戻る
                  </button>
                )}
                {contactStep < contactStepCount ? (
                  <button
                    type="button"
                    className="btn btn-cta"
                    onClick={handleContactNext}
                    disabled={isSubmitting}
                  >
                    次へ進む
                  </button>
                ) : (
                  <button className="btn btn-cta" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="btn-progress">
                        <span className="btn-spinner" aria-hidden="true" />
                        送信中...
                      </span>
                    ) : (
                      "30分無料相談を申し込む"
                    )}
                  </button>
                )}
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
            <a className="btn btn-cta" href="#contact">
              無料相談フォームを開く
            </a>
          </div>
        </section>
      </main>

      {isDemoOpen && (
        <div className="demo-dialog" role="dialog" aria-modal="true" aria-labelledby="demo-heading">
          <button
            type="button"
            className="demo-dialog__backdrop"
            aria-label="デモ動画を閉じる"
            onClick={() => {
              setIsDemoOpen(false);
              setIsDemoPlaying(false);
            }}
          />
          <div className="demo-dialog__panel">
            <header className="demo-dialog__header">
              <h2 id="demo-heading">AI意思決定デモ (1分)</h2>
              <button
                type="button"
                className="demo-dialog__close"
                onClick={() => {
                  setIsDemoOpen(false);
                  setIsDemoPlaying(false);
                }}
              >
                閉じる
              </button>
            </header>
            <div
              className={`demo-dialog__video ${isDemoPlaying ? "is-playing" : ""}`}
              role="img"
              aria-label="AIがデータを解析し意思決定をサポートするアニメーション"
            >
              <div className="demo-dialog__wave" />
              <div className="demo-dialog__pulse" />
              <div className="demo-dialog__frames">
                <span />
                <span />
                <span />
              </div>
              <button
                type="button"
                className="demo-dialog__play"
                onClick={() => setIsDemoPlaying(true)}
                aria-pressed={isDemoPlaying}
              >
                <PlayCircle aria-hidden="true" />
                <span>{isDemoPlaying ? "再生中" : "デモを再生する"}</span>
              </button>
            </div>
            <ul className="demo-dialog__bullets">
              <li>外部データの自動取り込み → AIシミュレーション → 専門家レビューを俯瞰できます。</li>
              <li>動画は自動再生しません。再生ボタンで任意のタイミングでご覧ください。</li>
              <li>お問い合わせ後は、実際のダッシュボードで貴社データを用いたデモをご案内します。</li>
            </ul>
          </div>
        </div>
      )}

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
