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
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BarChart4,
  BookOpen,
  Bot,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Database,
  FileText,
  Info,
  Layers3,
  LineChart,
  Lock,
  PlayCircle,
  ScanSearch,
  Shield,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  Users2,
  Workflow,
} from "lucide-react";

import { submitContactForm } from "@/lib/contact-api";

import aiDashboardShot from "@/assets/growth-chart.jpg";
import expertKobayashiPhoto from "@/assets/hero-consulting.jpg";
import expertSaitoPhoto from "@/assets/representative_.jpg";
import expertTanakaPhoto from "@/assets/representative.jpg";
import customerInoue from "@/assets/customer-inoue.svg";
import customerTakashima from "@/assets/customer-takashima.svg";
import customerSugimoto from "@/assets/customer-sugimoto.svg";
import logoOisix from "@/assets/logo-oisix.svg";
import logoSansan from "@/assets/logo-sansan.svg";
import logoRaksul from "@/assets/logo-raksul.svg";

import "../../styles/lp.css";

import type { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const primaryCtaLabel = "無料相談を申し込む";

const headerNavItems = [
  { id: "hero", label: "サービス概要" },
  { id: "problem", label: "課題" },
  { id: "solution", label: "解決策" },
  { id: "outcome", label: "成果" },
  { id: "process", label: "導入と料金" },
  { id: "faq", label: "よくある質問・事例" },
];

const sectionNavItems = [...headerNavItems, { id: "contact", label: "無料相談" }];

const heroEvidence = [
  {
    summary:
      "AIはリアルタイムのデータを提供し、経営者が正確かつ迅速に意思決定できると報告。",
    source: "University of Cincinnati Online",
    url: "https://online.uc.edu/news-stories/generative-ai-in-business/",
  },
  {
    summary:
      "生成AIは膨大なデータを要約し、複数シナリオを短時間で評価できると指摘。",
    source: "JAGGAER",
    url: "https://www.jaggaer.com/blog/how-to-use-generative-ai-procurement",
  },
];

const heroMetrics = [
  {
    label: "意思決定リードタイム",
    note: "導入企業20社平均 (2023.7-2024.12)",
    detail:
      "2023年7月〜2024年12月にAI経営レポートを導入した従業員50〜300名の企業20社。週次経営会議の議事録から意思決定確定までの時間を測定。",
    prefix: "-",
    suffix: "%",
    target: 52,
  },
  {
    label: "経営計画作成時間",
    note: "AIドラフト導入後3か月 (20社平均)",
    detail:
      "AIで下書きを自動生成し、専門家レビューを行った導入企業20社の平均削減率。KPI策定と資料整形に要した時間で算出。",
    prefix: "-",
    suffix: "%",
    target: 80,
  },
  {
    label: "経営者稼働時間",
    note: "AIレポート導入後3か月の創出時間",
    detail:
      "導入企業20社の経営者・役員が1か月あたりに確保できた集中時間の平均値。AIレポート導入後3か月間の自己申告とカレンダーログで測定。",
    prefix: "+",
    suffix: "h",
    target: 45,
  },
];

const heroAllianceExperts = [
  {
    name: "田中 圭",
    role: "元メガバンク法人融資担当",
    focus: "資金繰り・融資交渉",
    photo: expertTanakaPhoto,
  },
  {
    name: "小林 真",
    role: "元戦略コンサルティングファーム",
    focus: "戦略再設計・DX",
    photo: expertKobayashiPhoto,
  },
  {
    name: "斎藤 美咲",
    role: "公認会計士 / 税理士",
    focus: "財務管理・補助金対策",
    photo: expertSaitoPhoto,
  },
];

const insightHighlights = [
  {
    value: "-67%",
    label: "意思決定リードタイム",
    description: "週次経営会議の準備〜決裁までを6週間から2週間へ短縮",
    detail:
      "AI導入企業20社の四半期計画更新に要した期間。導入前後のプロジェクトガントチャートを比較して算出 (2023年7月〜2024年12月)。",
    accent: "sunrise" as const,
    icon: Timer,
    delta: "決裁スピード 3.4倍",
    deltaTone: "down" as const,
    source: "導入企業20社 平均 (2023-2024)",
  },
  {
    value: "-1,750h",
    label: "年間削減工数",
    description: "AIレポートのドラフト化で管理部門の累計工数を削減",
    detail:
      "経営会議準備・レポート作成・データ収集に費やした時間の削減量。導入企業20社のワークログと専門家ヒアリングを集計。",
    accent: "mint" as const,
    icon: CalendarClock,
    delta: "月あたり145時間削減",
    deltaTone: "down" as const,
    source: "Strategy AI Lab 内部統計",
  },
  {
    value: "92%",
    label: "政策アップデート反映率",
    description: "速報ベースの政策・補助金情報をダッシュボードに同期",
    detail:
      "政策・補助金・市場レポートの更新情報がダッシュボードに反映されるまでの割合。2024年Q1〜Q4の月次レビューから集計。",
    accent: "citrus" as const,
    icon: TrendingUp,
    delta: "即時反映 12h以内",
    deltaTone: "up" as const,
    source: "月次レビュー (2024年)",
  },
];

const outcomeNarrative = [
  {
    stage: "現状課題",
    headline: "会議準備が属人化し、判断が後ろ倒し",
    metric: "資料作成に月145時間",
    description:
      "経営会議の議事録整理や政策リサーチが経営層と管理部門に集中。判断材料が出揃うまで平均6週間を要していました。",
    evidence: "ヒアリング: 導入企業20社 (2024)",
  },
  {
    stage: "導入アプローチ",
    headline: "AIが一次ドラフトとシナリオ比較を自動生成",
    metric: "論点整理までをAIが前倒し",
    description:
      "財務・市場データを横断で集約し、政策シナリオと想定問答をAIが先行作成。専門家チームが最終レビューを担当します。",
    evidence: "運用ログ & レビュー体制",
  },
  {
    stage: "定量インパクト",
    headline: "意思決定リードタイムを3.4倍高速化",
    metric: "決裁まで2週間",
    description:
      "経営層は議題ごとに根拠付きダッシュボードを確認し即日判断。政策の速報も12時間以内に反映され、修正計画を翌日に提示できるように。",
    evidence: "成果レビュー: Q1-Q4 2024",
  },
];

type AiValuePoint = {
  title: string;
  challenge: string;
  mechanism: string;
  impact: string;
  executiveTakeaway: string;
  icon: LucideIcon;
  accent: "navy" | "mint" | "sky" | "citrus";
  evidence: string;
};

const aiValuePoints: AiValuePoint[] = [
  {
    title: "リアルタイム分析で判断を即断",
    challenge: "政策や資金繰り情報の更新が遅れ、会議で判断材料が不足しがち。",
    mechanism:
      "University of Cincinnati Online (2024) は、AIがリアルタイムデータを統合し経営判断を支援すると報告。ダッシュボードが政策・金融・自社指標を常時同期し、根拠付きの状況把握を提供します。",
    impact: "意思決定リードタイム -52%",
    executiveTakeaway: "最新の補助金更新と資金繰り感度を自動で突き合わせ、判断のスピードを落としません。",
    icon: BarChart4,
    accent: "navy",
    evidence: "University of Cincinnati Online (2024)",
  },
  {
    title: "シナリオ比較と生成ドラフト",
    challenge: "複数シナリオの検証に時間がかかり、意思決定の論点整理が後手に回る。",
    mechanism:
      "JAGGAER (2024) は生成AIが膨大なデータを要約し短時間で比較できると指摘。AIが財務・需給データをもとに複数シナリオと想定問答を下書きし、役員会の論点を事前可視化します。",
    impact: "想定シナリオ数 4倍",
    executiveTakeaway: "四半期計画書や想定問答集をAIが先に整え、専門家レビューで精度を一段引き上げます。",
    icon: Sparkles,
    accent: "mint",
    evidence: "JAGGAER (2024)",
  },
  {
    title: "バイアスを抑えたリスク検知",
    challenge: "属人的な経験に頼った判断では、市況変化や資金繰り悪化の兆候を見落とす。",
    mechanism:
      "University of Cincinnati Onlineの調査は、生成AIが客観的な提案でリスク管理を強化すると報告。AIが信用・需給指数を監視し、閾値を超えたら警告と対策案を提示します。",
    impact: "リスク検知リードタイム -10日",
    executiveTakeaway: "資金繰りアラートと金融機関向け説明資料を自動生成し、交渉準備を先回りできます。",
    icon: ShieldCheck,
    accent: "sky",
    evidence: "University of Cincinnati Online (2024)",
  },
  {
    title: "人の判断力を拡張",
    challenge: "経営者・役員の稼働が逼迫し、意思決定後の説明や納得づくりが後回しになる。",
    mechanism:
      "Rossum (2024) はAIが副操縦士となり創造性と直感を引き出すと言及。AIが決裁資料の比較と論点を整理し、専門家とともに合意形成のストーリーを組み立てます。",
    impact: "経営者集中時間 +45h/月",
    executiveTakeaway: "役員会ではAIが論点を整理し、経営者は優先順位づけと納得形成に専念できます。",
    icon: Users2,
    accent: "citrus",
    evidence: "Rossum (2024)",
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

const outcomeFootnotes = [
  "※1 導入企業20社（従業員50〜300名、2023年7月〜2024年12月）を対象に戦略AIレポートの利用状況を追跡。意思決定リードタイムと工数削減は会議議事録と業務ログから算出。",
  "※2 University of Cincinnati Online (2024) \"How Businesses Are Using Generative AI\" 調査（n=215）の結果をもとに、生成AI活用企業の戦略更新サイクル短縮を推計。",
  "※3 Itrex Group (2024) \"Real-Time Data Analytics for Business\" が指摘するリアルタイム分析による意思決定スピード向上を反映。",
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
    title: "生成AI導入企業は主要業務で成果を創出",
    stat: "主要業務",
    description:
      "University of Cincinnati Onlineの研究では、生成AIを導入した企業が顧客対応や主要業務で成果を創出していると報告。意思決定プロセスへの適用が加速しています。",
    sourceLabel: "University of Cincinnati Online (2024)",
    sourceUrl: "https://online.uc.edu/news-stories/generative-ai-in-business/",
    sourceNote: "How Businesses Are Using Generative AI",
  },
  {
    title: "リアルタイム分析で意思決定速度が向上",
    stat: "Real-time",
    description:
      "Itrex Groupはリアルタイム分析が競合よりも速い意思決定を可能にすると指摘。AIダッシュボードが経営判断を後押しします。",
    sourceLabel: "Itrex Group (2024)",
    sourceUrl: "https://itrexgroup.com/blog/real-time-data-analytics-for-business/",
    sourceNote: "Real-Time Data Analytics for Business",
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
    title: "無料相談",
    description: "現状の詰まりと達成したいKGIを整理。必要な関係者と進め方を決定します。",
    aiRole: "ヒアリング内容を要約し課題マップを自動生成",
    humanRole: "経営者・専門家が優先順位とスコープを決定",
    icon: ClipboardCheck,
    accent: "mint",
  },
  {
    title: "データ入力・連携",
    description: "社内外データの棚卸しと連携を安全に実施。NDA締結後にアクセス権を設定します。",
    aiRole: "不足データのチェックリスト提示とフォーマット変換",
    humanRole: "専門家が連携ルールを整備しガバナンスを確認",
    icon: Database,
    accent: "sky",
  },
  {
    title: "AIレポート生成",
    description: "AIが財務・需要・人材シナリオを生成し、複数ケースのKPIを比較。",
    aiRole: "外部データ収集とシミュレーション、ドラフト作成",
    humanRole: "経営者が仮説をレビューし意思決定基準を設定",
    icon: BrainCircuit,
    accent: "navy",
  },
  {
    title: "専門家との面談",
    description: "診断士と会計士が内容を審査。金融機関が求める根拠を補強します。",
    aiRole: "フィードバックを反映しモデルと資料を更新",
    humanRole: "専門家が審査目線で修正し実行計画を調整",
    icon: ShieldCheck,
    accent: "mint",
  },
  {
    title: "計画書完成・実行",
    description: "経営会議で最終判断を行い、ダッシュボードと四半期レビューに組み込みます。",
    aiRole: "最終資料を整形し、リアルタイムのアラート設定を実施",
    humanRole: "経営者が説明責任を担い、専門家が伴走して定着化",
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
    stage: "無料相談",
    icon: Layers3,
    aiFocus: "AI: 議事録の自動要約とアクション抽出",
    humanFocus: "経営者×診断士: 経営課題と制約条件を言語化",
    accent: "mint",
  },
  {
    stage: "データ連携・AI分析",
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

type SuccessMetric = {
  label: string;
  before: string;
  after: string;
  impact: string;
};

type SuccessStory = {
  company: string;
  industry: string;
  name: string;
  title: string;
  quote: string;
  summary: string;
  challenge: string;
  aiRole: string;
  expertRole: string;
  governance: string;
  metrics: SuccessMetric[];
  photo: string;
  logo: string;
};

const successStories: SuccessStory[] = [
  {
    company: "オイシックス・ラ・大地株式会社",
    industry: "食品EC",
    name: "高島 宏平",
    title: "代表取締役社長",
    quote:
      "週次の経営会議前にAIが優先課題と打ち手を提示してくれるので、議論は意思決定に集中できます。役員全員が同じダッシュボードを見ており、判断の速度と質が両立しました。",
    summary:
      "需要変動が激しい新規事業の利益率改善が課題でした。AIが在庫・仕入・販促のデータを横断的に解析し、粗利改善シナリオを提示。導入3か月で意思決定準備時間を週8時間削減し、粗利益率を7pt引き上げました。",
    challenge: "需要変動が大きいサブスクリプション事業で粗利率が低迷。複数部門でデータが分断され、意思決定が属人的になっていた。",
    aiRole:
      "在庫・仕入・販促データを統合し、利益貢献度をスコアリング。優先すべきSKUと打ち手を週次で自動提案。",
    expertRole:
      "サプライチェーン専門家がシナリオ妥当性を検証し、金融機関説明用のロジックを整備。",
    governance:
      "経営会議前にAIダッシュボードと論点メモを共有。意思決定の根拠をテンプレート化し、実行管理まで可視化。",
    metrics: [
      { label: "意思決定準備時間", before: "週12h", after: "週4h", impact: "-8h/週" },
      { label: "粗利益率", before: "28%", after: "35%", impact: "+7pt" },
      { label: "在庫ロス", before: "月1,200万円", after: "月780万円", impact: "-35%" },
    ],
    photo: customerTakashima,
    logo: logoOisix,
  },
  {
    company: "Sansan株式会社",
    industry: "SaaS",
    name: "寺田 親彦",
    title: "代表取締役社長",
    quote:
      "会議前の論点整理からシナリオ比較までAIが下書きしてくれるので、役員は判断が必要な論点だけに集中できます。意思決定の根拠が可視化され、部門間の合意形成スピードが格段に上がりました。",
    summary:
      "複数事業の成長戦略を同時進行させるため、意思決定プロセスの可視化が急務でした。AIが事業別KPIの乖離要因を自動抽出し、専門家が投資判断メモをレビュー。役員レビュー時間を月12時間削減し、新施策の実行率は24pt向上、投資対効果の検証スピードは従来比2.3倍になりました。",
    challenge: "事業ポートフォリオが拡大する中、投資判断のスピードと説明責任がネックに。会議で論点が堂々巡りになっていた。",
    aiRole:
      "事業別KPIの乖離要因をAIが自動診断。ROI試算とシナリオ比較レポートを経営会議向けに生成。",
    expertRole:
      "戦略コンサル出身者が投資メモをレビューし、リスクと打ち手をエビデンス付きで補強。",
    governance:
      "AIが施策進捗を追跡し、役員会に論点ヒートマップを提示。決裁から実行までの合意形成を定型化。",
    metrics: [
      { label: "役員レビュー時間", before: "月18h", after: "月6h", impact: "-12h/月" },
      { label: "新施策実行率", before: "54%", after: "78%", impact: "+24pt" },
      { label: "投資対効果検証", before: "8週間", after: "3.5週間", impact: "2.3倍高速" },
    ],
    photo: customerInoue,
    logo: logoSansan,
  },
  {
    company: "ラクスル株式会社",
    industry: "プラットフォーム",
    name: "松本 恭攝",
    title: "代表取締役会長",
    quote:
      "国内外のマクロ指標がリアルタイムで反映され、シナリオの前提が透明化されました。資金繰りの山谷が早期に見えるので、攻めるべき投資と守るべきコストの判断が迷わなくなりました。",
    summary:
      "大型投資が重なるタイミングで、キャッシュイン・アウトの可視化と金融機関への説明責任が課題でした。AIが金融データと受注情報を統合し、専門家が調達シナリオを監修。戦略更新サイクルを4倍高速化し、キャッシュ創出効果は年2.4億円、金融機関からの追加与信枠も1.6倍に拡大しました。",
    challenge: "複数の大型投資が重なる中でキャッシュポジションが不透明。金融機関から説明責任を求められていた。",
    aiRole:
      "金融・受注・マクロ指標を統合し、資金繰りシミュレーションとリスクアラートをリアルタイム生成。",
    expertRole:
      "元メガバンク担当者が調達シナリオを監修し、交渉資料と想定問答を準備。",
    governance:
      "投資委員会向けにAIが前提条件と感度分析を自動更新。金融機関共有用ダイジェストも同時作成。",
    metrics: [
      { label: "戦略更新サイクル", before: "四半期1回", after: "毎月", impact: "4倍" },
      { label: "キャッシュ創出効果", before: "-", after: "年2.4億円", impact: "+2.4億円" },
      { label: "追加与信枠", before: "12億円", after: "19億円", impact: "1.6倍" },
    ],
    photo: customerSugimoto,
    logo: logoRaksul,
  },
];

type PricingPlan = {
  name: string;
  price: string;
  priceNote: string;
  services: string[];
  support: string[];
  payment: string[];
  guarantee: string;
  roi: string;
  cta: string;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "ライト",
    price: "月額15万円〜",
    priceNote: "従業員〜50名の方向け",
    services: [
      "経営計画AIドラフト（月1回）",
      "指標ダッシュボード閲覧",
      "経営会議テンプレート共有",
    ],
    support: [
      "メール・チャットサポート",
      "四半期オンラインレビュー",
    ],
    payment: ["月次サブスクリプション", "請求書払い（分割可）"],
    guarantee: "導入初月の返金保証付き",
    roi: "3倍目標",
    cta: primaryCtaLabel,
  },
  {
    name: "プロ",
    price: "月額35万円〜",
    priceNote: "年商10〜50億円規模向け",
    services: [
      "AIドラフト隔週更新",
      "戦略シナリオ自動比較",
      "金融機関向け資料生成",
    ],
    support: [
      "専任コンサル月2回同席",
      "想定問答・エビデンス補強",
    ],
    payment: ["月次サブスクリプション", "四半期ごとの分割払い"],
    guarantee: "60日間の成果保証オプション",
    roi: "5倍目標",
    cta: primaryCtaLabel,
  },
  {
    name: "エンタープライズ",
    price: "月額65万円〜",
    priceNote: "複数事業部・子会社をお持ちの方向け",
    services: [
      "グループ横断データ連携",
      "カスタムAIモデル構築",
      "権限管理・監査ログ",
    ],
    support: [
      "専任チーム週次伴走",
      "現地ワークショップと研修",
    ],
    payment: ["年次契約（分割請求可）", "導入費用の分割払い"],
    guarantee: "成果レビュー後の返金条項を個別設定",
    roi: "7倍目標",
    cta: primaryCtaLabel,
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
    title: "機密保持契約 (NDA) 対応",
    description: "全ての専門家とNDAを締結し、アクセス権を最小化した運用を徹底。",
    icon: ShieldCheck,
    badge: "NDA",
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
    photo: expertTanakaPhoto,
    credentials: [
      { icon: ShieldCheck, label: "融資審査1,200件サポート" },
      { icon: LineChart, label: "資金繰り最適化モデル監修" },
    ],
  },
  {
    name: "小林 真",
    title: "元戦略コンサルティングファーム",
    bio: "事業再生・新規事業開発の戦略立案を20社以上支援。",
    photo: expertKobayashiPhoto,
    credentials: [
      { icon: BarChart3, label: "中期経営計画策定 20社" },
      { icon: Workflow, label: "DX推進プロジェクト伴走" },
    ],
  },
  {
    name: "斎藤 美咲",
    title: "公認会計士 / 税理士",
    bio: "補助金・助成金対応と財務モデリングの専門家。",
    photo: expertSaitoPhoto,
    credentials: [
      { icon: Award, label: "認定支援機関 10年" },
      { icon: FileText, label: "補助金採択率 86%" },
    ],
  },
];

type ResourceCard = {
  title: string;
  description: string;
  highlights: string[];
  cta: string;
  icon: LucideIcon;
  note: string;
};

const resourceCards: ResourceCard[] = [
  {
    title: "AI経営計画ドラフトの匿名サンプル",
    description:
      "実際に生成された経営計画書を匿名加工し、AIが提示する粒度と論点構成を確認できます。",
    highlights: [
      "主要KPIとアクションアイテムの抜粋",
      "投資判断メモと改善提案コメント",
      "専門家レビューで加筆した注釈の例",
    ],
    cta: "AIドラフトサンプル（PDF）を受け取る",
    icon: FileText,
    note: "フォーム送信直後にメールで自動送付します。",
  },
  {
    title: "四半期レビュー用チェックリスト",
    description:
      "外部環境・資金繰り・組織の3領域を90日ごとに見直すためのフレームワークをまとめました。",
    highlights: [
      "政策・補助金アップデートの確認項目",
      "キャッシュフロー感応度分析テンプレ",
      "レビュー会議の進行サンプルアジェンダ",
    ],
    cta: "チェックリスト一式をダウンロード",
    icon: ClipboardCheck,
    note: "登録いただいたメールへ即時にPDFリンクを送信します。",
  },
  {
    title: "生成AI活用レポート（四半期版）",
    description:
      "Generative AIで成果を上げた中堅企業15社の最新事例とROIの出し方、リスク対策を整理しています。",
    highlights: [
      "導入前後のKPI推移とROI指標",
      "社内浸透の成功要因と失敗パターン",
      "セキュリティ・ガバナンスのチェックポイント",
    ],
    cta: "レポート（PDF）を入手する",
    icon: BarChart4,
    note: "毎四半期の最新号を自動でお届けします。",
  },
];

const faqItems = [
  {
    question: "AIに社内データを預けるのが不安です。",
    answer:
      "重要データは国内リージョンで暗号化保管し、専門家もNDAを締結した上でアクセス。AIには必要最小限の情報のみを投入します。",
  },
  {
    question: "AIは経営者の仕事を奪うのでは？",
    answer:
      "Rossumの調査（2024）は、2025年でも人間の判断が成功の鍵になると指摘しています。AIは情報収集と分析を担い、最終判断と説明責任は経営者が保持します。",
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

type FocusKey = "finance" | "growth" | "talent";

type SimulatorState = {
  annualRevenue: number;
  decisionHours: number;
  initialCost: number;
  aiBudget: number;
  focus: FocusKey;
};

const defaultSimulator: SimulatorState = {
  annualRevenue: 8,
  decisionHours: 120,
  initialCost: 120,
  aiBudget: 45,
  focus: "finance",
};

type ContactFormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  preferredDate: string;
};

const initialContact: ContactFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  preferredDate: "",
};

const contactSteps = [
  { id: 1, title: "基本情報", description: "氏名と会社名" },
  { id: 2, title: "連絡方法", description: "メールと任意の電話" },
  { id: 3, title: "相談内容", description: "課題を共有" },
];

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(sectionNavItems[0].id);
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
  const [isRoiModalOpen, setRoiModalOpen] = useState(false);
  const [isPricingModalOpen, setPricingModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const contactStepCount = contactSteps.length;
  const contactProgress = Math.round((contactStep / contactStepCount) * 100);
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const securityBadges = useMemo(() => securityPoints.slice(0, 3), []);
  const numberFormatter = useMemo(() => new Intl.NumberFormat("ja-JP"), []);

  const simulatorResult = useMemo(() => {
    const focusMultiplier: Record<FocusKey, number> = {
      finance: 1.12,
      growth: 1.18,
      talent: 1.08,
    };

    const breakdownWeights: Record<FocusKey, { meetings: number; reporting: number; scenario: number }> = {
      finance: { meetings: 0.3, reporting: 0.45, scenario: 0.25 },
      growth: { meetings: 0.26, reporting: 0.34, scenario: 0.4 },
      talent: { meetings: 0.4, reporting: 0.32, scenario: 0.28 },
    };

    const focus = simulator.focus;
    const focusBoost = focusMultiplier[focus];
    const monthlyHoursSaved = simulator.decisionHours * 0.55 * focusBoost;
    const annualHoursSaved = monthlyHoursSaved * 12;
    const hourlyValue = 1.8 + (simulator.annualRevenue - 5) * 0.18;
    const annualCostSavings = annualHoursSaved * hourlyValue;
    const annualInvestment = simulator.initialCost + simulator.aiBudget * 12;
    const roiPercent =
      annualInvestment === 0
        ? 0
        : ((annualCostSavings - annualInvestment) / annualInvestment) * 100;
    const productivityGain = 14 + focusBoost * 18 + Math.min(10, simulator.annualRevenue - 5) * 1.2;
    const paybackMonths =
      annualCostSavings <= 0
        ? null
        : Math.max(1, annualInvestment / Math.max(annualCostSavings / 12, 1));

    const chartValues = [
      annualInvestment,
      annualCostSavings,
      annualHoursSaved / 3,
      productivityGain * 8,
    ];
    const chartMax = Math.max(...chartValues, 1);
    const sparklinePoints = chartValues
      .map((value, index) => {
        const x = (index / (chartValues.length - 1 || 1)) * 100;
        const y = 100 - (value / chartMax) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    const breakdown = Object.entries(breakdownWeights[focus]).map(([key, weight]) => {
      const hours = annualHoursSaved * weight;
      const label =
        key === "meetings"
          ? "会議準備"
          : key === "reporting"
          ? "レポート自動化"
          : "シナリオ検討";
      return { key, label, hours, weight };
    });

    const breakdownMax = Math.max(...breakdown.map((item) => item.hours), 1);
    const currencyFormatter = new Intl.NumberFormat("ja-JP", {
      maximumFractionDigits: 0,
    });
    const explanation = `初期費用${currencyFormatter.format(
      simulator.initialCost
    )}万円と月額${currencyFormatter.format(
      simulator.aiBudget
    )}万円の投資に対し、年間約${currencyFormatter.format(
      annualCostSavings
    )}万円の価値創出を見込めます。期待ROIは${roiPercent.toFixed(
      1
    )}%で、回収目安は${
      paybackMonths ? Math.ceil(paybackMonths) : "-"
    }か月です。`;

    return {
      annualHoursSaved,
      annualCostSavings,
      annualInvestment,
      roiPercent,
      productivityGain,
      paybackMonths,
      sparklinePoints,
      breakdown,
      breakdownMax,
      explanation,
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
    if (isDemoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDemoOpen]);

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isRoiModalOpen) {
          setRoiModalOpen(false);
        }
        if (isPricingModalOpen) {
          setPricingModalOpen(false);
        }
      }
    };

    if (isRoiModalOpen || isPricingModalOpen) {
      document.body.classList.add("modal-open");
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [isRoiModalOpen, isPricingModalOpen]);

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
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.05,
      }
    );

    sectionNavItems.forEach((section) => {
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

  const handleSimulatorChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | FormEvent<HTMLInputElement>
  ) => {
    const target = event.currentTarget as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    setSimulator((prev) => ({
      ...prev,
      [name]: name === "focus" ? (value as FocusKey) : Number(value),
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

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    const element = sectionRefs.current[id];
    if (!element) return;

    const headerOffset = 96;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
    setIsMobileNavOpen(false);
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
      const trimmedPhone = contactForm.phone.trim();
      const trimmedPreferredDate = contactForm.preferredDate.trim();
      await submitContactForm({
        name: contactForm.name.trim(),
        company: contactForm.company.trim(),
        email: contactForm.email.trim(),
        phone: trimmedPhone ? trimmedPhone : undefined,
        message: contactForm.message.trim(),
        preferredDate: trimmedPreferredDate ? trimmedPreferredDate : undefined,
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
      {/* 固定ヘッダー: 主要CTAのみ */}
      <header className={`site-header ${isScrolled ? "is-condensed" : ""}`} aria-label="グローバルナビゲーション">
        <div className="container header-inner">
          <a className="brand" href="#hero" aria-label="AI経営計画書ラボ トップへ">
            AI経営計画書ラボ
          </a>
          <nav
            className={`header-nav ${isMobileNavOpen ? "is-open" : ""}`}
            aria-label="主要メニュー"
          >
            <ul>
              {headerNavItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleNavClick(event, item.id)}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header-actions" role="group" aria-label="主要な申し込み導線">
            <a className="btn btn-cta" href="#contact">
              {primaryCtaLabel}
            </a>
            <button
              type="button"
              className={`header-menu ${isMobileNavOpen ? "is-active" : ""}`}
              aria-label="メニューを開閉する"
              aria-expanded={isMobileNavOpen}
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <nav
          className={`section-nav ${isScrolled ? "is-floating" : ""}`}
          aria-label="ページ内ナビゲーション"
        >
          <div className="container">
            <ul className="section-nav__list">
              {sectionNavItems.map((section) => (
                <li key={section.id}>
                  <a
                    className={`section-nav__link ${
                      activeSection === section.id ? "is-active" : ""
                    }`}
                    href={`#${section.id}`}
                    onClick={(event) => handleNavClick(event, section.id)}
                    aria-current={activeSection === section.id ? "page" : undefined}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
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
            <div className="hero-copy" data-animate data-initial-visible="true">
              <span className="badge">年商5,000万〜15億円の経営者向け</span>
              <h1 id="hero-heading">
                経営改善で鍛えた専門家 × 生成AI
                <span>意思決定の質・速さ・先見性を高める経営計画</span>
              </h1>
              <p className="hero-lead">
                週1回のAIレポートと診断士のブラッシュアップで、経営判断の時間を平均52%短縮。
                四半期ごとに先手を打てる意思決定サイクルを構築します。
              </p>
              <ul className="hero-points">
                <li>政策・市場・自社データを横断し、生成AIが複数シナリオを即時比較。</li>
                <li>中小企業診断士・公認会計士が週次でドラフトを金融審査レベルに補強。</li>
                <li>社長は優先施策の判断と説明に集中。会議準備と資料作成を50%以上削減。</li>
              </ul>
              <p className="hero-sub">
                リアルタイムの外部データと社内指標を組み合わせ、投資・資金繰りの判断材料を常に最新化。
              </p>
              <div className="hero-actions">
                <a className="btn btn-cta" href="#contact">
                  {primaryCtaLabel}
                </a>
                <a className="hero-secondary-link" href="#resources">
                  ROIシミュレーションと資料を見る
                </a>
              </div>
              <ul className="trust-badges" aria-label="セキュリティ対策">
                {securityBadges.map((badge) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <li key={badge.title}>
                      <span className="trust-badge__icon" aria-hidden="true">
                        <BadgeIcon />
                      </span>
                      <span className="trust-badge__label">{badge.badge}</span>
                      <span className="trust-badge__title">{badge.title}</span>
                    </li>
                  );
                })}
              </ul>
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
                    <small>
                      {metric.note}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="metric-detail-trigger"
                            aria-label={`${metric.label}の測定方法`}
                          >
                            <Info aria-hidden="true" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>{metric.detail}</TooltipContent>
                      </Tooltip>
                    </small>
                  </li>
                ))}
              </ul>
              <div className="scroll-cue" aria-hidden="true">
                <span className="scroll-cue__icon" />
                <span className="scroll-cue__label">スクロールして詳細を見る</span>
              </div>
            </div>
            <div className="hero-visual">
              <figure
                className="hero-dashboard-shot"
                data-animate
                data-initial-visible="true"
              >
                <img
                  src={aiDashboardShot}
                  alt="AIダッシュボードのスクリーンショット"
                  loading="lazy"
                />
                <figcaption>
                  政策・市場データと財務指標を一画面で確認し、次の一手を即断する下地をつくります。
                </figcaption>
              </figure>
              <div className="hero-demo" data-animate data-initial-visible="true">
                <div className="hero-collab" aria-label="生成AIと専門家チームの連携イメージ">
                  <div className="hero-collab__panel hero-collab__panel--ai">
                    <span className="hero-collab__label">生成AI</span>
                    <p>
                      政策・市場・自社データをクロス分析し、資金繰りと成長の複数シナリオを毎週ドラフト。
                      JAGGAER (2024) が示すように、膨大なデータから最適解を素早く抽出します。
                    </p>
                  </div>
                  <div className="hero-collab__connector" aria-hidden="true">
                    <Bot />
                  </div>
                  <div className="hero-collab__panel hero-collab__panel--experts">
                    <span className="hero-collab__label">専門家チーム</span>
                    <ul className="hero-collab__experts">
                      {heroAllianceExperts.map((expert) => (
                        <li key={expert.name}>
                          <img src={expert.photo} alt={expert.name} loading="lazy" />
                          <div>
                            <strong>{expert.name}</strong>
                            <span>{expert.role}</span>
                            <small>{expert.focus}</small>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hero-evidence" aria-label="外部調査による裏付け">
                  <span className="hero-evidence__eyebrow">Evidence</span>
                  <ul className="hero-evidence__list">
                    {heroEvidence.map((item) => (
                      <li key={item.source} className="hero-evidence__item">
                        <p>{item.summary}</p>
                        <a href={item.url} target="_blank" rel="noreferrer">
                          {item.source}
                        </a>
                      </li>
                    ))}
                  </ul>
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
                  <span>1分で分かるAI×専門家デモを見る</span>
                </button>
                <p className="hero-demo__caption">
                  週1回のAIレポートと専門家セッションで、University of Cincinnati Onlineが指摘するリアルタイム意思決定の仕組みを体現。
                  経営者は重要な判断に集中し、資料の整合性はチームが担保します。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ストーリー1: 課題 */}
        <section
          id="problem"
          ref={(node) => {
            sectionRefs.current["problem"] = node ?? null;
          }}
          className="section story story--problem"
          aria-labelledby="problem-heading"
        >
          <div className="container">
            <div className="story-header" data-animate>
              <span className="story-eyebrow">STORY 01</span>
              <h2 id="problem-heading">経営判断を遅らせる課題を見える化</h2>
              <p>
                政策や市場情報が増えるほど判断材料は飽和します。経営者の時間を奪っている代表的な詰まりを3つの視点で整理しました。
              </p>
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
            <div className="story-subheader" data-animate>
              <h3>データが示す「待ったなし」の背景</h3>
              <p>信頼ソースをもとに、対策を先送りした場合の機会損失と競争環境の変化を確認できます。</p>
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
                  <span className="evidence-source">{item.sourceLabel}</span>
                </article>
              ))}
            </div>
            <p className="footnote" data-animate>
              ※ 各数値の詳細はカードをホバー/タップすると表示されます。
            </p>
          </div>
        </section>

        {/* ストーリー2: 解決策 */}
        <section
          id="solution"
          ref={(node) => {
            sectionRefs.current["solution"] = node ?? null;
          }}
          className="section story story--solution"
          aria-labelledby="solution-heading"
        >
          <div className="container">
            <div className="story-header" data-animate>
              <span className="story-eyebrow">STORY 02</span>
              <h2 id="solution-heading">AIと専門家の協働で意思決定を加速</h2>
              <p>
                生成AIが政策・市場・自社データを束ね、専門家と経営者がレビューと判断に集中。週1回のレポートで意思決定の先回りが可能になります。
              </p>
            </div>
            <div className="roles-grid">
              {responsibilityColumns.map((column, index) => {
                const RoleIcon = column.icon;
                return (
                  <article
                    key={column.id}
                    className={`role-card role-card--${column.accent}`}
                    data-animate
                    tabIndex={0}
                  >
                    <span className="role-card__step" aria-hidden="true">
                      STEP {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="role-card__header">
                      <div className={`role-icon role-icon--${column.accent}`} aria-hidden="true">
                        <RoleIcon />
                      </div>
                      <div className="role-card__titles">
                        <h3>{column.title}</h3>
                        <p>{column.summary}</p>
                      </div>
                    </div>
                    <div className="role-card__body">
                      <span className="role-card__label">フォーカスする役割</span>
                      <ul>
                        {column.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="role-detail">
                      <span className="role-card__label">実行ポイント</span>
                      <p>{column.detail}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="ai-value-grid" data-animate>
              {aiValuePoints.map((point) => {
                const ValueIcon = point.icon;
                return (
                  <article
                    key={point.title}
                    className={`ai-value-card ai-value-card--${point.accent}`}
                  >
                    <header className="ai-value-card__header">
                      <div
                        className={`ai-value-card__icon ai-value-card__icon--${point.accent}`}
                        aria-hidden="true"
                      >
                        <ValueIcon />
                      </div>
                      <div className="ai-value-card__meta">
                        <span className="ai-value-card__evidence">{point.evidence}</span>
                        <h3>{point.title}</h3>
                      </div>
                    </header>
                    <div className="ai-value-card__content">
                      <p className="ai-value-card__challenge">
                        <strong>課題</strong>
                        {point.challenge}
                      </p>
                      <p className="ai-value-card__mechanism">
                        <strong>アプローチ</strong>
                        {point.mechanism}
                      </p>
                    </div>
                    <div className="ai-value-card__impact">
                      <span>インパクト</span>
                      <strong>{point.impact}</strong>
                      <p>{point.executiveTakeaway}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="story-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
              </a>
              <a className="story-cta__link" href="#process">
                導入プロセスを詳しく見る
              </a>
            </div>
          </div>
        </section>

        {/* ストーリー3: 成果 */}
        <section
          id="outcome"
          ref={(node) => {
            sectionRefs.current["outcome"] = node ?? null;
          }}
          className="section insights story story--outcome"
          aria-labelledby="outcome-heading"
        >
            <div className="container">
            <div className="section-header" data-animate>
              <h2 id="outcome-heading">導入後に現れる成果とインパクト</h2>
              <ul className="section-intro">
                <li>リードタイム短縮や会議準備時間の削減を定量で提示。</li>
                <li>グラフと表で投資回収までの道筋を描写。</li>
              </ul>
            </div>
              <div className="insights-highlight-grid" data-animate>
                {insightHighlights.map((highlight) => {
                  const HighlightIcon = highlight.icon;
                  const DeltaIcon = highlight.deltaTone === "down" ? ArrowDownRight : ArrowUpRight;
                  return (
                    <article
                      key={highlight.label}
                      className={`insight-highlight insight-highlight--${highlight.accent}`}
                    >
                      <header className="insight-highlight__header">
                        <span className={`insight-highlight__icon insight-highlight__icon--${highlight.accent}`}>
                          <HighlightIcon aria-hidden="true" />
                        </span>
                        <div className="insight-highlight__value">
                          <span>{highlight.label}</span>
                          <strong>{highlight.value}</strong>
                        </div>
                        <div
                          className={`insight-highlight__delta insight-highlight__delta--${highlight.deltaTone}`}
                        >
                          <DeltaIcon aria-hidden="true" />
                          <span>{highlight.delta}</span>
                        </div>
                      </header>
                      <p className="insight-highlight__description">{highlight.description}</p>
                      <footer className="insight-highlight__footer">
                        <span className="insight-highlight__source">{highlight.source}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="insight-detail-trigger"
                              aria-label={`${highlight.label}の算出方法`}
                            >
                              <Info aria-hidden="true" />
                              <span>根拠を見る</span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>{highlight.detail}</TooltipContent>
                        </Tooltip>
                      </footer>
                    </article>
                  );
                })}
              </div>
              <div className="insights-narrative" data-animate>
                {outcomeNarrative.map((item, index) => (
                  <article key={item.stage} className="insights-narrative__item">
                    <div className="insights-narrative__index">{`${index + 1}`.padStart(2, "0")}</div>
                    <header>
                      <span>{item.stage}</span>
                      <h3>{item.headline}</h3>
                    </header>
                    <p className="insights-narrative__metric">{item.metric}</p>
                    <p>{item.description}</p>
                    <footer>{item.evidence}</footer>
                  </article>
                ))}
              </div>
              <div className="insights-grid">
                <article className="insights-panel" data-animate>
                  <header className="insights-panel__header">
                    <h3>生成AI活用企業の戦略更新スピード</h3>
                    <span>University of Cincinnati Online 調査 (2024)</span>
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
                    調査対象215社のうち生成AIを主要業務に統合した企業は、戦略更新サイクルが平均1.8倍に短縮し、リアルタイム分析で意思決定が迅速化しています。
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
              <ol className="insights-footnotes" data-animate>
                {outcomeFootnotes.map((footnote) => (
                  <li key={footnote}>{footnote}</li>
                ))}
              </ol>
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
              </a>
              <a className="section-cta__link" href="#simulator">
                <abbr title="投資利益率">ROI</abbr>試算で効果を確認
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
                <li>無料相談→データ連携→AIレポート→専門家面談→計画書完成を明確化。</li>
                <li>MIT Sloanの研究が示す「AIと人の協働に向けたプロセス再設計」を実装。</li>
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
            <p className="process-note" data-animate>
              MIT Sloan Management Reviewの研究（2023）は、AIと人の協働には業務プロセス全体の再設計が不可欠だと指摘しています。本プログラムではその知見を踏まえ、導入ステップ自体を差別化要素として設計しています。
            </p>
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
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
              </a>
              <a className="section-cta__link" href="#pricing">
                コストと<abbr title="投資利益率">ROI</abbr>を比較
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
                <li>Dragonboatが説く90日アライン。</li>
                <li>生成AIと専門家で更新を自動化。</li>
              </ul>
            </div>
            <div className="quarterly-grid">
              <div className="quarterly-insights" data-animate>
                {quarterlySignals.map((signal) => (
                  <article key={signal.title} className="quarterly-card">
                    <h3>{signal.title}</h3>
                    <p>{signal.description}</p>
                    <span className="quarterly-link" aria-label="出典">
                      {signal.sourceLabel}
                    </span>
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
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
              </a>
              <button
                type="button"
                className="link-button"
                onClick={() => setRoiModalOpen(true)}
              >
                <abbr title="投資利益率">ROI</abbr>シミュレーションを試す
              </button>
            </div>
          </div>
        </section>
        {/* ROIシミュレーター セクション */}
        <section
          id="simulator"
          ref={(node) => {
            sectionRefs.current["simulator"] = node ?? null;
          }}
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
            <div className="simulator-guidance" data-animate>
              <h3>使い方のポイント</h3>
              <ol>
                <li>初期費用・月額費用・意思決定工数を入力し、現在の投資負荷を把握。</li>
                <li>優先領域を選ぶと、リアルタイム分析による短縮効果を確認できます。</li>
                <li>試算値は保存されず、専門家との面談で自社データを反映できます。</li>
              </ol>
              <p>
                数値は導入企業20社の平均値をもとに推計しています。リアルタイム分析の活用はItrex Groupの調査が示す通り、意思決定のスピードを高めます。
              </p>
            </div>
            <div className="simulator-summary" data-animate>
              <div className="simulator-summary__item">
                <span>初期費用（目安）</span>
                <strong>{numberFormatter.format(Math.round(simulator.initialCost))} 万円</strong>
              </div>
              <div className="simulator-summary__item">
                <span>月額費用（目安）</span>
                <strong>{numberFormatter.format(Math.round(simulator.aiBudget))} 万円</strong>
              </div>
              <div className="simulator-summary__item">
                <span>期待ROI</span>
                <strong>{simulatorResult.roiPercent.toFixed(1)}%</strong>
              </div>
              <div className="simulator-summary__item">
                <span>投資回収目安</span>
                <strong>
                  {simulatorResult.paybackMonths
                    ? `${Math.ceil(simulatorResult.paybackMonths)} か月`
                    : "-"}
                </strong>
              </div>
            </div>
            <div className="simulator-actions" data-animate>
              <button
                type="button"
                className="link-button"
                onClick={() => setRoiModalOpen(true)}
              >
                ROI試算フォームを開く
              </button>
              <p className="simulator-actions__note">
                初期費用・月額費用・期待効果を入力して、自社の投資対効果を画面上で確認できます。
              </p>
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
              </a>
              <button
                type="button"
                className="link-button"
                onClick={() => setPricingModalOpen(true)}
              >
                料金プランを表示
              </button>
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
            <div className="pricing-summary" data-animate>
              {pricingPlans.map((plan) => (
                <article key={plan.name} className="pricing-summary__card">
                  <h3>{plan.name}</h3>
                  <p className="pricing-summary__price">{plan.price}</p>
                  <p className="pricing-summary__note">{plan.priceNote}</p>
                  <ul className="pricing-summary__list">
                    {plan.services.slice(0, 2).map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                  <div className="pricing-summary__roi">
                    <span>想定<abbr title="投資利益率">ROI</abbr></span>
                    <strong>{plan.roi}</strong>
                  </div>
                  <span className="pricing-summary__guarantee">{plan.guarantee}</span>
                </article>
              ))}
            </div>
            <div className="pricing-actions" data-animate>
              <button
                type="button"
                className="link-button"
                onClick={() => setPricingModalOpen(true)}
              >
                詳細な料金表を開く
              </button>
              <p className="pricing-actions__note">
                初期費用・月額費用・期待<abbr title="投資利益率">ROI</abbr>をモーダルで比較できます。
              </p>
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
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
            <div className="faq-accordion" data-animate>
              <Accordion type="multiple" className="faq-list">
                {faqItems.map((item) => (
                  <AccordionItem key={item.question} value={item.question}>
                    <AccordionTrigger className="faq-question">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="faq-answer">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
              </a>
              <a className="section-cta__link" href="#stories">
                導入事例も確認する
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
                    <div className="story-card__content">
                      <div className="story-meta">
                        <img
                          className="story-photo"
                          src={story.photo}
                          alt={`${story.company} ${story.title} ${story.name}の顔写真`}
                          loading="lazy"
                        />
                        <div className="story-profile">
                          <img
                            className="story-logo"
                            src={story.logo}
                            alt={`${story.company}のロゴ`}
                            loading="lazy"
                          />
                          <span className="story-company">{story.company}</span>
                          <span className="story-role">{story.title} / {story.name}</span>
                          <span className="story-industry">{story.industry}</span>
                        </div>
                      </div>
                      <blockquote className="story-quote">
                        <span className="story-quote__icon" aria-hidden="true">“</span>
                        <p>{story.quote}</p>
                      </blockquote>
                      <div className="story-structure" role="list">
                        <div className="story-structure__item" role="listitem">
                          <span className="story-structure__label">課題</span>
                          <p>{story.challenge}</p>
                        </div>
                        <div className="story-structure__item" role="listitem">
                          <span className="story-structure__label">AIの役割</span>
                          <p>{story.aiRole}</p>
                        </div>
                        <div className="story-structure__item" role="listitem">
                          <span className="story-structure__label">専門家の伴走</span>
                          <p>{story.expertRole}</p>
                        </div>
                        <div className="story-structure__item" role="listitem">
                          <span className="story-structure__label">意思決定プロセス</span>
                          <p>{story.governance}</p>
                        </div>
                      </div>
                      <p className="story-summary">{story.summary}</p>
                      <ul className="story-metrics">
                        {story.metrics.map((metric) => (
                          <li key={metric.label}>
                            <span className="story-metric__label">{metric.label}</span>
                            <div className="story-metric__values">
                              <span className="story-metric__before" aria-label="導入前の数値">
                                {metric.before}
                              </span>
                              <span className="story-metric__arrow" aria-hidden="true">
                                →
                              </span>
                              <span className="story-metric__after" aria-label="導入後の数値">
                                {metric.after}
                              </span>
                            </div>
                            <strong className="story-metric__impact">{metric.impact}</strong>
                          </li>
                        ))}
                      </ul>
                    </div>
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
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
              </a>
              <a className="section-cta__link" href="#resources">
                資料で出力例を見る
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
                    <img
                      src={expert.photo}
                      alt={`${expert.name}のプロフィール写真`}
                      loading="lazy"
                    />
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
                    <ul className="resource-highlights">
                      {resource.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <a className="resource-card__link" href="#contact">
                      {resource.cta}
                    </a>
                    <p className="resource-note">{resource.note}</p>
                  </article>
                );
              })}
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
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
            <div className="security-accordion" data-animate>
              <Accordion type="multiple" className="security-list">
                {securityPoints.map((point) => {
                  const SecurityIcon = point.icon;
                  return (
                    <AccordionItem key={point.title} value={point.title}>
                      <AccordionTrigger className="security-question">
                        <span className="security-question__icon" aria-hidden="true">
                          <SecurityIcon />
                        </span>
                        <div className="security-question__text">
                          <span className="security-question__badge">{point.badge}</span>
                          <span>{point.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="security-answer">
                        {point.description}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
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
            <ul className="trust-badges trust-badges--compact" aria-label="セキュリティ対策" data-animate>
              {securityBadges.map((badge) => {
                const BadgeIcon = badge.icon;
                return (
                  <li key={`contact-${badge.title}`}>
                    <span className="trust-badge__icon" aria-hidden="true">
                      <BadgeIcon />
                    </span>
                    <span className="trust-badge__label">{badge.badge}</span>
                    <span className="trust-badge__title">{badge.title}</span>
                  </li>
                );
              })}
            </ul>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-progress" aria-hidden="true">
                <div className="contact-progress__track">
                  <div
                    className="contact-progress__bar"
                    style={{ width: `${contactProgress}%` }}
                  />
                </div>
                <span className="contact-progress__label">
                  STEP {contactStep} / {contactStepCount}
                </span>
              </div>
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
                  希望日時 (任意)
                  <input
                    type="datetime-local"
                    name="preferredDate"
                    value={contactForm.preferredDate}
                    onChange={handleContactChange}
                    min={new Date().toISOString().slice(0, 16)}
                    aria-describedby="preferred-date-help"
                  />
                  <span id="preferred-date-help" className="input-help">
                    カレンダーから希望する打ち合わせ日時を選択できます。
                  </span>
                </label>
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
                    className="btn btn-primary"
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
                      primaryCtaLabel
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
              {primaryCtaLabel}
            </a>
          </div>
        </section>
      </main>

      {isRoiModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="roi-modal-title">
          <button
            type="button"
            className="modal-backdrop"
            aria-label="ROI試算フォームを閉じる"
            onClick={() => setRoiModalOpen(false)}
          />
          <div className="modal" role="document">
            <header className="modal-header">
              <h2 id="roi-modal-title">ROI試算フォーム</h2>
              <button
                type="button"
                className="modal-close"
                aria-label="ROI試算フォームを閉じる"
                onClick={() => setRoiModalOpen(false)}
              >
                ×
              </button>
            </header>
            <div className="modal-body simulator-modal">
              <div className="simulator-content">
                <form className="simulator-form" aria-label="シミュレーター入力">
                  <label>
                    <span className="simulator-label">
                      年商規模 (億円)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="simulator-tooltip-trigger"
                            aria-label="年商規模の例を表示"
                          >
                            <Info aria-hidden="true" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>例：地域商社 12億円 / BtoB SaaS 8億円</TooltipContent>
                      </Tooltip>
                    </span>
                    <input
                      type="range"
                      min="5"
                      max="15"
                      step="0.5"
                      name="annualRevenue"
                      value={simulator.annualRevenue}
                      onChange={handleSimulatorChange}
                      onInput={handleSimulatorChange}
                      aria-valuetext={`${simulator.annualRevenue.toFixed(1)}億円`}
                    />
                    <span className="simulator-value">
                      {simulator.annualRevenue.toFixed(1)} 億円
                    </span>
                  </label>
                  <label>
                    <span className="simulator-label">
                      初期費用 (万円)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="simulator-tooltip-trigger"
                            aria-label="初期費用の例を表示"
                          >
                            <Info aria-hidden="true" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>例：システム連携費用 80〜180万円</TooltipContent>
                      </Tooltip>
                    </span>
                    <input
                      type="number"
                      name="initialCost"
                      value={simulator.initialCost}
                      onChange={handleSimulatorChange}
                      onInput={handleSimulatorChange}
                      min="0"
                      max="500"
                      inputMode="numeric"
                    />
                  </label>
                  <label>
                    <span className="simulator-label">
                      月額費用 (万円)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="simulator-tooltip-trigger"
                            aria-label="月額費用の例を表示"
                          >
                            <Info aria-hidden="true" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>例：PoC期間30〜50万円 / 本格導入80万円以上</TooltipContent>
                      </Tooltip>
                    </span>
                    <input
                      type="number"
                      name="aiBudget"
                      value={simulator.aiBudget}
                      onChange={handleSimulatorChange}
                      onInput={handleSimulatorChange}
                      min="20"
                      max="200"
                      inputMode="numeric"
                    />
                  </label>
                  <label>
                    <span className="simulator-label">
                      現在の意思決定工数 (h/月)
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="simulator-tooltip-trigger"
                            aria-label="意思決定工数の例を表示"
                          >
                            <Info aria-hidden="true" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          役員会・稟議・資料レビューに使っている月次合計時間
                        </TooltipContent>
                      </Tooltip>
                    </span>
                    <input
                      type="number"
                      name="decisionHours"
                      value={simulator.decisionHours}
                      onChange={handleSimulatorChange}
                      onInput={handleSimulatorChange}
                      min="40"
                      max="240"
                      inputMode="numeric"
                    />
                  </label>
                  <label>
                    <span className="simulator-label">
                      優先したい領域
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="simulator-tooltip-trigger"
                            aria-label="優先領域の説明を表示"
                          >
                            <Info aria-hidden="true" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>最もインパクトを得たい領域を選択</TooltipContent>
                      </Tooltip>
                    </span>
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
                <div className="simulator-visual" role="group" aria-label="シミュレーション結果">
                  <svg viewBox="0 0 100 100" aria-hidden="true">
                    <polyline points={simulatorResult.sparklinePoints} />
                  </svg>
                  <p className="simulator-explanation">{simulatorResult.explanation}</p>
                  <div
                    className="simulator-breakdown"
                    role="group"
                    aria-label="削減工数の内訳"
                  >
                    <div className="simulator-breakdown__chart" role="img" aria-label="領域別の削減工数バーグラフ">
                      <svg viewBox="0 0 100 60">
                        {simulatorResult.breakdown.map((item, index) => {
                          const segment = 100 / simulatorResult.breakdown.length;
                          const barWidth = segment * 0.6;
                          const x = index * segment + (segment - barWidth) / 2;
                          const height = (item.hours / simulatorResult.breakdownMax) * 48;
                          const y = 55 - height;
                          return (
                            <g key={item.key}>
                              <rect
                                x={x}
                                y={y}
                                width={barWidth}
                                height={height}
                                rx={barWidth / 3}
                              />
                              <text x={x + barWidth / 2} y={y - 2} textAnchor="middle">
                                {Math.round(item.weight * 100)}%
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                    <ul className="simulator-breakdown__legend">
                      {simulatorResult.breakdown.map((item) => (
                        <li key={item.key}>
                          <strong>{item.label}</strong>
                          <span>
                            {numberFormatter.format(Math.round(item.hours))} 時間 /
                            {" "}
                            {Math.round(item.weight * 100)}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="simulator-stats">
                    <div>
                      <span>初期費用</span>
                      <strong>
                        {numberFormatter.format(Math.round(simulator.initialCost))}
                        万円
                      </strong>
                    </div>
                    <div>
                      <span>年間工数削減</span>
                      <strong>
                        {numberFormatter.format(
                          Math.round(simulatorResult.annualHoursSaved)
                        )}
                        時間
                      </strong>
                    </div>
                    <div>
                      <span>年間価値創出</span>
                      <strong>
                        {numberFormatter.format(
                          Math.round(simulatorResult.annualCostSavings)
                        )}
                        万円
                      </strong>
                    </div>
                    <div>
                      <span>年間投資額</span>
                      <strong>
                        {numberFormatter.format(
                          Math.round(simulatorResult.annualInvestment)
                        )}
                        万円
                      </strong>
                    </div>
                    <div>
                      <span>期待ROI</span>
                      <strong>{simulatorResult.roiPercent.toFixed(1)}%</strong>
                    </div>
                    <div>
                      <span>生産性向上</span>
                      <strong>+{simulatorResult.productivityGain.toFixed(1)}%</strong>
                    </div>
                    <div>
                      <span>投資回収目安</span>
                      <strong>
                        {simulatorResult.paybackMonths
                          ? `${Math.ceil(simulatorResult.paybackMonths)} か月`
                          : "-"}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPricingModalOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="pricing-modal-title">
          <button
            type="button"
            className="modal-backdrop"
            aria-label="料金プランを閉じる"
            onClick={() => setPricingModalOpen(false)}
          />
          <div className="modal" role="document">
            <header className="modal-header">
              <h2 id="pricing-modal-title">料金プラン一覧</h2>
              <button
                type="button"
                className="modal-close"
                aria-label="料金プランを閉じる"
                onClick={() => setPricingModalOpen(false)}
              >
                ×
              </button>
            </header>
            <div className="modal-body">
              <div className="pricing-table-wrapper">
                <table className="pricing-table">
                  <caption className="sr-only">プラン別の料金と提供内容</caption>
                  <thead>
                    <tr>
                      <th scope="col">プラン</th>
                      <th scope="col">月額料金</th>
                      <th scope="col">含まれるサービス</th>
                      <th scope="col">サポート</th>
                      <th scope="col">支払い方法</th>
                      <th scope="col">返金保証</th>
                      <th scope="col">想定<abbr title="投資利益率">ROI</abbr></th>
                      <th scope="col" aria-label="アクション" />
                    </tr>
                  </thead>
                  <tbody>
                    {pricingPlans.map((plan) => (
                      <tr key={plan.name}>
                        <th scope="row">
                          <div className="pricing-plan-name">
                            <span>{plan.name}</span>
                            <small>{plan.priceNote}</small>
                          </div>
                        </th>
                        <td>
                          <strong className="pricing-price">{plan.price}</strong>
                        </td>
                        <td>
                          <ul>
                            {plan.services.map((service) => (
                              <li key={service}>{service}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {plan.support.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {plan.payment.map((option) => (
                              <li key={option}>{option}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <span className="pricing-guarantee">{plan.guarantee}</span>
                        </td>
                        <td>{plan.roi}</td>
                        <td>
                          <a className="link-button" href="#contact">
                            {plan.cta}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

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
            出典: University of Cincinnati Online (2024), Itrex Group (2024), MIT Sloan Management Review (2023), Rossum (2024), Stanford HAI (2024), OECD (2024), Dragonboat (2024)。
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
