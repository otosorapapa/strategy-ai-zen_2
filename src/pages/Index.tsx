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
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BarChart4,
  BookOpen,
  Bot,
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

import heroDecisionVisual from "@/assets/strategic-meeting.jpg";
import decisionDashboardVisual from "@/assets/dashboard-preview.jpg";
import simulatorGuidanceVisual from "@/assets/strategy-planning.jpg";
import expertKobayashiPhoto from "@/assets/expert-kobayashi.svg";
import expertSaitoPhoto from "@/assets/expert-saito.svg";
import expertTanakaPhoto from "@/assets/expert-tanaka.svg";
import representativePhoto from "@/assets/representative.jpg";
import problemIllustration from "@/assets/problem-illustration.jpg";
import solutionSynergyVisual from "@/assets/solution-synergy.svg";
import aiValueRealtimeVisual from "@/assets/ai-value-realtime.svg";
import aiValueScenarioVisual from "@/assets/ai-value-scenario.svg";
import aiValueRiskVisual from "@/assets/ai-value-risk.svg";
import aiValueAugmentationVisual from "@/assets/ai-value-augmentation.svg";
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

const primaryCtaLabel = "30分無料相談を予約（3分で完了）";
const contactPhoneNumber = "03-4520-1234";

const headerNavItems = [
  { id: "hero", label: "サービス概要" },
  { id: "problem", label: "課題" },
  { id: "solution", label: "解決策" },
  { id: "features", label: "機能・特徴" },
  { id: "outcome", label: "成果" },
  { id: "stories", label: "事例" },
  { id: "pricing", label: "導入と料金" },
  { id: "resources", label: "資料・イベント" },
  { id: "faq", label: "FAQ" },
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

type HeroCausality = {
  title: string;
  subtitle: string;
  cause: string;
  logic: string;
  impactMetric: string;
  impactDetail: string;
  trustLabel: string;
  trustCopy: string;
  highlights: string[];
  icon: LucideIcon;
};

const heroCausality: HeroCausality[] = [
  {
    title: "72時間で経営の視界をそろえる",
    subtitle: "現状分析と優先課題の確定",
    cause:
      "生成AIが財務・販売・顧客データを読み込み、伸ばすべき指標とリスクの兆しを一枚に可視化。",
    logic:
      "事業再生を経験した診断士がヒアリングで仮説を磨き込み、経営者の直感を裏付ける論点メモを72時間以内に共有。",
    impactMetric: "判断の迷いを減らす",
    impactDetail:
      "会議前に優先課題と数字の裏付けを揃え、役員間の認識がそろった状態でディスカッションに臨めます。",
    trustLabel: "BLUEPRINT",
    trustCopy:
      "再生・改善案件で蓄積したチェックリストをテンプレート化。初回面談から迷わず論点を掘り下げられます。",
    highlights: ["現状把握", "優先度", "スピード"],
    icon: ScanSearch,
  },
  {
    title: "1〜2週間で勝ち筋を描き切る",
    subtitle: "戦略ストーリーとKPI設計",
    cause:
      "生成AIが収益シナリオ・資金繰り・補助金適用パターンを複数案でドラフトし、論点を構造化。",
    logic:
      "診断士と会計士が金融機関目線で整合性を補正し、説明資料・想定問答・実行ロードマップを仕上げます。",
    impactMetric: "準備の負担を軽くする",
    impactDetail:
      "KPIと投資配分が明確になり、決算や金融機関面談に合わせて迷いなく説明できる骨子が揃います。",
    trustLabel: "QUALITY",
    trustCopy:
      "補助金採択・資金調達で評価されたストーリーと数表をナレッジ化し、貴社仕様にカスタマイズ。",
    highlights: ["戦略設計", "金融目線", "ロードマップ"],
    icon: ClipboardCheck,
  },
  {
    title: "3か月伴走で成果を定着",
    subtitle: "実行支援と金融機関対応",
    cause:
      "生成AIレポートが施策ごとのKPIとキャッシュ見通しを自動更新し、改善余地とリスクを通知。",
    logic:
      "再生案件に強い専門家が定例レビューに参加し、金融機関提出資料や補助金申請まで伴走します。",
    impactMetric: "成果への確信を高める",
    impactDetail:
      "実行状況と成果の因果が共有され、組織と金融機関の双方が納得する形で進捗を報告できます。",
    trustLabel: "ASSURANCE",
    trustCopy:
      "レビュー記録と監査証憑を蓄積し、第三者へ提示できる形で管理。伴走期間終了後も再現可能です。",
    highlights: ["伴走", "透明性", "信頼"],
    icon: TrendingUp,
  },
];

type HeroResult = {
  value: string;
  label: string;
  description: string;
  source: string;
};

const heroResults: HeroResult[] = [
  {
    value: "72h",
    label: "集中ヒアリングとAI診断",
    description: "財務・販売・在庫データを解析し72時間で改善骨子を提示。",
    source: "導入企業平均 (2024)",
  },
  {
    value: "1-2週",
    label: "経営計画ドラフト完成",
    description: "AIドラフト×診断士レビューで金融機関提出レベルに仕上げ。",
    source: "支援プロジェクト実績 (n=36)",
  },
  {
    value: "86%",
    label: "補助金・融資の採択率",
    description: "補助金×資金調達のワンストップ支援で採択率86%を継続。",
    source: "伴走支援レポート (2023-2024)",
  },
];

const heroMetrics = [
  {
    label: "意思決定リードタイム短縮率",
    note: "導入企業20社平均",
    detail:
      "生成AIと専門家レビューで経営会議の準備を前倒しし、意思決定までの待機時間を6週→2週に圧縮。",
    prefix: "-",
    suffix: "%",
    target: 52,
  },
  {
    label: "計画作成工数削減",
    note: "AIドラフト運用ログ",
    detail:
      "AIが骨子と可視化を下書きし、専門家がレビューすることで資料作成工数を最大80%削減。",
    prefix: "-",
    suffix: "%",
    target: 80,
  },
  {
    label: "粗利率の改善幅",
    note: "リード施策の実績",
    detail:
      "優先すべきSKUと投資配分を提示し、粗利率+18pt・キャッシュ1.8倍の成果を確認。",
    prefix: "+",
    suffix: "pt",
    target: 18,
  },
];

const heroAllianceExperts = [
  {
    name: "田中 圭",
    role: "製造・卸の大型融資220件を担当",
    focus: "資金戦略と与信交渉の設計",
    photo: expertTanakaPhoto,
  },
  {
    name: "小林 真",
    role: "戦略・DX再構築プロジェクト80件を統括",
    focus: "成長ストーリーと実行ロードマップ",
    photo: expertKobayashiPhoto,
  },
  {
    name: "斎藤 美咲",
    role: "管理会計改革とIPO準備を支援",
    focus: "KPI設計とガバナンス整備",
    photo: expertSaitoPhoto,
  },
];

type QuickFlowStep = {
  label: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  duration?: string;
};

type QuickFormHighlight = {
  title: string;
  caption: string;
  icon: LucideIcon;
};

type SimulatorGuideStep = {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
};

type SimulatorGuideNote = {
  label: string;
  description: string;
  icon: LucideIcon;
};

type SimulatorVisualHighlight = {
  label: string;
  description: string;
  icon: LucideIcon;
};

const quickFlowSteps: QuickFlowStep[] = [
  {
    label: "30分無料相談",
    description: "オンラインで経営課題を整理",
    detail: "社長の現在地と直近の資金繰り・補助金・投資予定をヒアリングし、導入是非と必要資料を3分でご案内します。",
    icon: CalendarClock,
    duration: "Day0",
  },
  {
    label: "経営課題診断レポート",
    description: "72時間で優先指標を可視化",
    detail: "生成AIが財務・販売・在庫データを読み込み、優先課題とKPIロードマップをレポート化。診断士が改善ストーリーを添えます。",
    icon: ScanSearch,
    duration: "Day1-3",
  },
  {
    label: "改善計画の伴走支援",
    description: "1〜2週間で計画完成→伴走開始",
    detail: "金融機関提出レベルの経営計画を1〜2週間で完成。以降3か月は施策実行と資金調達を専門家が伴走し、定例会で成果を更新します。",
    icon: ClipboardCheck,
    duration: "Day4-60",
  },
];

const quickFormHighlights: QuickFormHighlight[] = [
  {
    title: "初回相談は完全無料",
    caption: "営業目的の連絡なし・30分で導入可否を診断",
    icon: Shield,
  },
  {
    title: "72時間で診断レポート",
    caption: "AI分析と診断士レビューで優先KPIと施策を可視化",
    icon: Timer,
  },
  {
    title: "資金調達・補助金まで伴走",
    caption: "提出資料・想定問答・実行管理まで専門家が支援",
    icon: LineChart,
  },
];

const simulatorGuideSteps: SimulatorGuideStep[] = [
  {
    title: "現状の投資負荷を3分で整理",
    description:
      "初期費用・月額費用・意思決定工数を入力し、投資負荷を数値化。",
    detail:
      "キャッシュアウトと経営陣の稼働コストを見える化し、経営会議で使える指標に整えます。",
    icon: ClipboardCheck,
  },
  {
    title: "優先指標を選んでシナリオ比較",
    description:
      "伸ばしたい指標を選択するとリアルタイム分析による短縮効果が即時に反映。",
    detail:
      "売上・粗利・受注残など50種類のKPIテンプレートを切り替え、最適なAI投資シナリオを検証。",
    icon: BarChart3,
  },
  {
    title: "専門家面談で自社条件をフィット",
    description:
      "試算値は保存されず、面談時に専門家が貴社固有のデータと照合。",
    detail:
      "税理士・戦略コンサルと連携し、資金調達や設備投資まで含めた投資回収計画を提示します。",
    icon: ShieldCheck,
  },
];

const simulatorGuideNotes: SimulatorGuideNote[] = [
  {
    label: "算出根拠",
    description:
      "数値は導入企業20社の平均値をもとに推計し、業種・規模に応じた補正係数を適用しています。",
    icon: Info,
  },
  {
    label: "意思決定スピード",
    description:
      "リアルタイム分析の活用はItrex Groupの調査でも、意思決定のリードタイム短縮に有効と示されています。",
    icon: Sparkles,
  },
];

const simulatorGuidanceVisualHighlights: SimulatorVisualHighlight[] = [
  {
    label: "リアルタイム再計算",
    description: "入力と同時にROIと回収期間が数秒で更新。",
    icon: Timer,
  },
  {
    label: "KPIテンプレート50種",
    description: "財務・営業指標の粒度を合わせた比較が可能。",
    icon: Layers3,
  },
  {
    label: "専門家伴走",
    description: "面談で自社データを取り込み、導入判断まで伴走。",
    icon: Users2,
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
    label: "外部シグナル反映率",
    description: "速報ベースの市場・競合・需要データをダッシュボードに同期",
    detail:
      "市場レポート・競合ニュース・需給統計の更新情報がダッシュボードに反映されるまでの割合。2024年Q1〜Q4の月次レビューから集計。",
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
      "経営会議の議事録整理や外部環境リサーチが経営層と管理部門に集中。判断材料が出揃うまで平均6週間を要していました。",
    evidence: "ヒアリング: 導入企業20社 (2024)",
  },
  {
    stage: "導入アプローチ",
    headline: "AIが一次ドラフトとシナリオ比較を自動生成",
    metric: "論点整理までをAIが前倒し",
    description:
      "財務・市場データを横断で集約し、想定シナリオと想定問答をAIが先行作成。専門家チームが最終レビューを担当します。",
    evidence: "運用ログ & レビュー体制",
  },
  {
    stage: "定量インパクト",
    headline: "意思決定リードタイムを3.4倍高速化",
    metric: "決裁まで2週間",
    description:
      "経営層は議題ごとに根拠付きダッシュボードを確認し即日判断。外部ニュースも12時間以内に反映され、修正計画を翌日に提示できるように。",
    evidence: "成果レビュー: Q1-Q4 2024",
  },
];

type AiValuePoint = {
  title: string;
  challenge: string;
  mechanism: string;
  impactLabel: string;
  impactValue: string;
  impactContext: string;
  executiveTakeaway: string;
  icon: LucideIcon;
  accent: "navy" | "mint" | "sky" | "citrus";
  evidence: string;
  visual: string;
  visualAlt: string;
};

const aiValuePoints: AiValuePoint[] = [
  {
    title: "リアルタイム分析で判断を即断",
    challenge: "外部環境や資金繰りの更新が遅れ、会議で判断材料が不足しがち。",
    mechanism:
      "University of Cincinnati Online (2024) は、AIがリアルタイムデータを統合し経営判断を支援すると報告。ダッシュボードが市場・金融・自社指標を常時同期し、根拠付きの状況把握を提供します。",
    impactLabel: "意思決定リードタイム",
    impactValue: "-52%",
    impactContext: "導入企業20社の会議ログ (2024)",
    executiveTakeaway: "最新の市場更新と資金繰り感度を自動で突き合わせ、判断のスピードを落としません。",
    icon: BarChart4,
    accent: "navy",
    evidence: "University of Cincinnati Online (2024)",
    visual: aiValueRealtimeVisual,
    visualAlt: "リアルタイムデータ同期を示すダッシュボードの概念図",
  },
  {
    title: "シナリオ比較と生成ドラフト",
    challenge: "複数シナリオの検証に時間がかかり、意思決定の論点整理が後手に回る。",
    mechanism:
      "JAGGAER (2024) は生成AIが膨大なデータを要約し短時間で比較できると指摘。AIが財務・需給データをもとに複数シナリオと想定問答を下書きし、役員会の論点を事前可視化します。",
    impactLabel: "想定シナリオ数",
    impactValue: "4倍",
    impactContext: "AIドラフト比較ログ (2024Q2)",
    executiveTakeaway: "四半期計画書や想定問答集をAIが先に整え、専門家レビューで精度を一段引き上げます。",
    icon: Sparkles,
    accent: "mint",
    evidence: "JAGGAER (2024)",
    visual: aiValueScenarioVisual,
    visualAlt: "複数シナリオ比較と評価を示すフロー図",
  },
  {
    title: "バイアスを抑えたリスク検知",
    challenge: "属人的な経験に頼った判断では、市況変化や資金繰り悪化の兆候を見落とす。",
    mechanism:
      "University of Cincinnati Onlineの調査は、生成AIが客観的な提案でリスク管理を強化すると報告。AIが信用・需給指数を監視し、閾値を超えたら警告と対策案を提示します。",
    impactLabel: "リスク検知リードタイム",
    impactValue: "-10日",
    impactContext: "資金繰りアラートの閾値運用 (2024)",
    executiveTakeaway: "資金繰りアラートと金融機関向け説明資料を自動生成し、交渉準備を先回りできます。",
    icon: ShieldCheck,
    accent: "sky",
    evidence: "University of Cincinnati Online (2024)",
    visual: aiValueRiskVisual,
    visualAlt: "リスク指標の早期検知を可視化した図",
  },
  {
    title: "人の判断力を拡張",
    challenge: "経営者・役員の稼働が逼迫し、意思決定後の説明や納得づくりが後回しになる。",
    mechanism:
      "Rossum (2024) はAIが副操縦士となり創造性と直感を引き出すと言及。AIが決裁資料の比較と論点を整理し、専門家とともに合意形成のストーリーを組み立てます。",
    impactLabel: "経営者集中時間",
    impactValue: "+45h/月",
    impactContext: "エグゼクティブヒアリング (n=12)",
    executiveTakeaway: "役員会ではAIが論点を整理し、経営者は優先順位づけと納得形成に専念できます。",
    icon: Users2,
    accent: "citrus",
    evidence: "Rossum (2024)",
    visual: aiValueAugmentationVisual,
    visualAlt: "AIと専門家が経営者を支援する概念イラスト",
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
    label: "外部シグナル反映率",
    manual: 48,
    ai: 92,
    unit: "%",
    description: "AIが市場ニュースや需要の変化を自動集約し、重要な変化をダッシュボードへ即時反映。",
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
  "※2 University of Cincinnati Online (2024) \"Generative AI Adoption Study\" 調査（n=215）の結果をもとに、生成AI活用企業の戦略更新サイクル短縮を推計。",
  "※3 Itrex Group (2024) \"Real-Time Data Analytics for Business\" が指摘するリアルタイム分析による意思決定スピード向上を反映。",
];

const collaborationHighlights: CollaborationHighlight[] = [
  {
    label: "シグナル検知の速さ",
    value: "外部アラート +42/月",
    description: "国内外120指標をAIが12時間以内に同期し、変化の因果を整理。",
    evidence: "Signal Intelligence トラッキング",
    accent: "mint",
  },
  {
    label: "レビュー品質",
    value: "専門家SLA 72h",
    description: "金融・会計・戦略のトリプルチェックで、投資家・金融機関基準を担保。",
    evidence: "Expert Assurance 監査ログ",
    accent: "sky",
  },
  {
    label: "意思決定速度",
    value: "決裁リードタイム -52%",
    description: "AIドラフトと合意形成テンプレートで、決裁会議の迷いを削減。",
    evidence: "導入20社 実測中央値",
    accent: "citrus",
  },
];

type SolutionLogicStep = {
  id: string;
  stage: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  accent: "mint" | "sky" | "citrus";
};

const solutionLogicSteps: SolutionLogicStep[] = [
  {
    id: "sense",
    stage: "Diagnose 72h",
    title: "72時間で経営課題を特定",
    description:
      "AIが財務・販売・顧客データを統合し、利益ドライバーとリスクを定量化。診断士がヒアリングで仮説を確定します。",
    metric: "72h",
    metricLabel: "集中ヒアリング",
    accent: "mint",
  },
  {
    id: "shape",
    stage: "Design 1-2w",
    title: "1〜2週間で戦略と数値を整備",
    description:
      "生成AIが複数シナリオをドラフトし、診断士と会計士が金融機関基準で整合性を補正。KPIと投資配分を決め切ります。",
    metric: "1-2週",
    metricLabel: "ドラフト完成",
    accent: "sky",
  },
  {
    id: "decide",
    stage: "Execute 3m",
    title: "3か月伴走で実行と資金調達を両立",
    description:
      "ダッシュボードで成果を追跡しながら、専門家がレビュー会議・補助金申請・金融交渉を支援。合意形成とPDCAを高速化します。",
    metric: "+24pt",
    metricLabel: "実行率向上",
    accent: "citrus",
  },
];

const whyNowEvidence = [
  {
    title: "生成AIが決断の速さと確信を同時に高める",
    statLabel: "専門誌レポート",
    description:
      "IIL Blog (2024) は、生成AIが繰り返し作業を肩代わりし、意思決定のスピードと精度を同時に押し上げると解説。経営者が胸を張って判断理由を語れる土台になると評価しています。",
    sourceLabel: "IIL Blog (2024)",
    sourceUrl: "https://blog.iil.com/",
    sourceNote: "AI活用による経営判断",
  },
  {
    title: "主要業務での成果創出が広がる",
    statLabel: "導入企業の実績",
    description:
      "University of Cincinnati Online (2024) は、生成AI導入企業が顧客対応や基幹業務で成果を積み上げていると報告。現場での成功体験がリーダーの決断を後押ししています。",
    sourceLabel: "University of Cincinnati Online (2024)",
    sourceUrl: "https://online.uc.edu/news-stories/generative-ai-in-business/",
    sourceNote: "生成AI活用企業の実態調査",
  },
  {
    title: "リアルタイム分析が迷いを素早く解消",
    statLabel: "データ活用動向",
    description:
      "Itrex Group (2024) は、リアルタイム分析が競合より速い意思決定を可能にすると紹介。常に更新されるダッシュボードが、先を読む行動を支えます。",
    sourceLabel: "Itrex Group (2024)",
    sourceUrl: "https://itrexgroup.com/blog/real-time-data-analytics-for-business/",
    sourceNote: "リアルタイム分析で意思決定を強化",
  },
  {
    title: "生成AI市場の拡大が先読みを求める",
    statLabel: "市場トレンド",
    description:
      "Switch Software (2024) は、生成AI市場が継続的に拡大すると予測。変化に先んじて体制を整える企業ほど、未来像を語る力が磨かれるとしています。",
    sourceLabel: "Switch Software (2024)",
    sourceUrl: "https://switchsoftware.io/blog/generative-ai-market-outlook",
    sourceNote: "2030年までのAI市場展望",
  },
  {
    title: "AI支援が現場の自律性を高める",
    statLabel: "現場改革",
    description:
      "Stanford HAI (2024) は、生成AI支援が現場の生産性と習熟スピードを底上げすると報告。一人ひとりが自信を保ったまま提案できる環境づくりに寄与しています。",
    sourceLabel: "Stanford HAI (2024)",
    sourceUrl: "https://hai.stanford.edu/news/generative-ai-improves-customer-support-productivity",
    sourceNote: "生成AIによるコンタクトセンター改革",
  },
  {
    title: "厳格な分野でも信頼獲得が進む",
    statLabel: "国際機関レポート",
    description:
      "OECD (2024) は、金融領域で生成AIが分析とレポートの効率化に貢献し、厳しい審査を要する現場でも信頼が高まっていると整理。説得力ある資料づくりの基盤が整いつつあります。",
    sourceLabel: "OECD (2024)",
    sourceUrl: "https://www.oecd.org/finance/ai-in-financial-markets.htm",
    sourceNote: "金融分野でのAI活用",
  },
];

type QuarterlySignal = {
  title: string;
  description: string;
  sourceLabel: string;
  sourceUrl?: string;
  stat?: string;
  statLabel?: string;
  focus: string;
  icon: LucideIcon;
  highlights?: string[];
};

const quarterlySignals: QuarterlySignal[] = [
  {
    title: "四半期ごとに再アライン",
    description: "経営・事業・ファイナンスの意図を90日で同期。ドラゴンボートのフレームを日本の中小企業向けに再構成しました。",
    sourceLabel: "Dragonboat (2024)",
    sourceUrl: "https://dragonboat.io/blog/quarterly-planning-guide",
    stat: "90日",
    statLabel: "アライン周期",
    focus: "Strategy Reset",
    icon: Compass,
    highlights: [
      "経営計画と資金繰りダッシュボードを同一指標で統合",
      "90日スプリントごとにAIが因果ループを自動提案",
      "役員レビュー用の判断メモを48時間以内に生成",
    ],
  },
  {
    title: "市場の変化を90日で捉え直す",
    description: "金融・市場・需要の指標をAIが自動収集。変化率がしきい値を超えると経営者へアラートを送信します。",
    sourceLabel: "Strategy AI Lab 推計",
    stat: "+42件",
    statLabel: "外部指標アラート/月",
    focus: "Signal Intelligence",
    icon: Workflow,
    highlights: [
      "国内外120指標を常時ウォッチしシナリオを再評価",
      "与信・仕入れ・投資判断の閾値をベイズ更新",
      "リスクシグナルはSlack・Teamsへ即時共有",
    ],
  },
  {
    title: "専門家伴走で実行を後押し",
    description: "元メガバンク法人担当と財務会計・管理会計専門家が実行レビューを実施。AI提案に資金繰り・リスクの観点を接続します。",
    sourceLabel: "伴走支援チーム",
    stat: "72h",
    statLabel: "レビューSLA",
    focus: "Expert Assurance",
    icon: ShieldCheck,
    highlights: [
      "資金調達・投資ドキュメントを専任チームが監修",
      "月次・四半期レビューの実行会議に同席",
      "NDA・BCP・監査証憑の整備までワンストップ",
    ],
  },
];

const quarterlySummaryPoints = [
  "経営計画・資金繰り・事業KPIを同じ指標系で可視化",
  "生成AIドラフト → 専門家レビュー → 経営会議承認のリズムを標準化",
  "未達要因を因果ループで分析し、次の90日施策へ連結",
];

const velocityNarratives = [
  {
    label: "環境変化指数",
    value: "+105",
    caption: "2021→2024の変化幅",
    tone: "sky" as const,
  },
  {
    label: "生成AI更新頻度",
    value: "+168",
    caption: "主要モデルアップデート",
    tone: "mint" as const,
  },
  {
    label: "意思決定速度",
    value: "2.6×",
    caption: "導入企業20社平均",
    tone: "citrus" as const,
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

const velocityInsights = velocitySeries.map((series) => {
  const start = series.values[0] ?? 0;
  const latest = series.values[series.values.length - 1] ?? start;
  const delta = latest - start;
  return {
    label: series.label,
    start,
    latest,
    delta,
  };
});

const velocityBaseQuarter = velocityQuarters[0] ?? "";
const velocityLatestQuarter = velocityQuarters[velocityQuarters.length - 1] ?? "";
const velocityGapDelta =
  (velocityInsights[1]?.delta ?? 0) - (velocityInsights[0]?.delta ?? 0);

const formatSigned = (value: number, suffix = "") => {
  if (value > 0) return `+${value}${suffix}`;
  if (value < 0) return `${value}${suffix}`;
  return `±0${suffix}`;
};

type PainPoint = {
  title: string;
  detail: string;
  summary: string;
  solution: string;
  aiAction: string;
  expertAction: string;
  impact: string;
  impactDetail: string;
  icon: LucideIcon;
  accent: "mint" | "sky" | "citrus";
  proofs: { label: string; value: string }[];
};

const painPoints: PainPoint[] = [
  {
    title: "売上はあるのに利益とキャッシュが残らない",
    detail:
      "粗利の改善策や在庫・原価の見直しが場当たり的になり、次の投資判断に踏み切れない状態が続いています。",
    summary:
      "数字の裏付けがばらばらで、役員間で優先順位が合意できない。",
    solution:
      "72時間の集中ヒアリングとAI診断で利益ドライバーを特定し、キャッシュ創出に直結する打ち手とKPIを可視化します。",
    aiAction:
      "AI: 財務・販売データから利益感度を分析し、改善余地が大きい領域とリスクを即時抽出。",
    expertAction:
      "専門家: 診断士が業界ベンチマークと照らし、優先度と投資配分を整理して実行計画を組み立て。",
    impact: "利益改善の筋道を共有",
    impactDetail:
      "粗利率+18pt、キャッシュ1.8倍のシナリオを示し、経営会議で納得感を得たうえで意思決定できます。",
    icon: ScanSearch,
    accent: "sky",
    proofs: [
      { label: "粗利率", value: "+18pt" },
      { label: "キャッシュ創出", value: "1.8倍" },
    ],
  },
  {
    title: "金融機関・補助金の書類づくりが属人化",
    detail:
      "経営計画書や想定問答の準備に毎回追われ、与信判断に必要な根拠が揃うまで時間がかかっています。",
    summary:
      "資料作成が後ろ倒しになり、資金調達や補助金申請の機会を逃してしまう。",
    solution:
      "AIが審査項目に沿ってドラフトを作成し、診断士と会計士が金融機関基準でレビュー。72時間で骨子、1〜2週間で提出レベルまで仕上げます。",
    aiAction:
      "AI: 与信指標・補助金要件を下敷きに、複数シナリオの収益計画と想定問答をドラフト化。",
    expertAction:
      "専門家: 金融機関OB・診断士が表現や裏付けを調整し、審査で問われる根拠を補強。",
    impact: "提出書類の品質向上",
    impactDetail:
      "補助金採択率86%、金融機関提出資料の差し戻しゼロを実現し、資金調達の確度を高めます。",
    icon: LineChart,
    accent: "citrus",
    proofs: [
      { label: "採択率", value: "86%" },
      { label: "提出スピード", value: "1-2週" },
    ],
  },
  {
    title: "AI活用の必要性は理解しているが進め方がわからない",
    detail:
      "部署ごとにDXが分断され、AIを導入しても現場で活かしきれず成果につながらないという声が増えています。",
    summary:
      "現場で使える形まで落とし込めず、AI投資の意思決定が先送りに。",
    solution:
      "AIダッシュボードと伴走支援でKPIの定着と人材育成を同時に実現。経営計画に紐づく運用まで設計します。",
    aiAction:
      "AI: KPIごとの進捗とリスクを毎週レポートし、改善余地と次の打ち手を提案。",
    expertAction:
      "専門家: 役員・現場向けのワークショップで活用事例を共有し、社内運用の型を構築。",
    impact: "AI投資の実行力を強化",
    impactDetail:
      "AI活用プロジェクトの実行率78%、役員レビュー工数-12h/月など、社内に残る仕組みを整備します。",
    icon: ShieldCheck,
    accent: "mint",
    proofs: [
      { label: "実行率", value: "78%" },
      { label: "レビュー工数", value: "-12h/月" },
    ],
  },
];

type ServiceFeature = {
  title: string;
  description: string;
  highlights: string[];
  benefit: string;
  badge: string;
  statValue: string;
  statLabel: string;
  icon: LucideIcon;
  accent: "mint" | "sky" | "citrus" | "navy" | "rose";
};

const serviceFeatures: ServiceFeature[] = [
  {
    title: "外部シグナルと自社データの統合",
    description: "市場更新と自社KPIをひとつのデータ基盤へ同期。",
    highlights: [
      "API連携とアップロードをまとめ、毎日の更新を自動化。",
      "役員会に必要な指標だけをダッシュボードへ抽出。",
    ],
    benefit: "最新の判断材料をそのまま共有",
    badge: "DATA FABRIC",
    statValue: "70%削減",
    statLabel: "調査・集計にかかる時間",
    icon: Database,
    accent: "navy",
  },
  {
    title: "複数シナリオ生成",
    description: "主要な前提を入れるだけで比較ケースを即作成。",
    highlights: [
      "販売・人員・投資の変化を読み込み、AIが複数案を準備。",
      "差分指標を揃えて議論時間をコンパクトに。",
    ],
    benefit: "攻めと守りの選択肢を即提示",
    badge: "SCENARIO AI",
    statValue: "4ケース / 48h",
    statLabel: "意思決定に使えるプラン",
    icon: Layers3,
    accent: "mint",
  },
  {
    title: "財務計画の自動作成",
    description: "BS・PL・CFを自動で連動させたドラフトを生成。",
    highlights: [
      "資金繰りや投資計画、返済条件を読み込んで整理。",
      "金融機関にそのまま出せる形式で共有。",
    ],
    benefit: "提出までの待ち時間を短縮",
    badge: "FINANCE OS",
    statValue: "-80%",
    statLabel: "ドラフトのやり直し",
    icon: BarChart3,
    accent: "citrus",
  },
  {
    title: "専門家レビューと倫理チェック",
    description: "診断士と会計の専門家がAI出力を監査。",
    highlights: [
      "倫理リスクと審査ポイントをチェックリスト化。",
      "根拠データと想定問答を補強し安心して提出。",
    ],
    benefit: "安心して提出できる品質",
    badge: "RISK & ETHICS",
    statValue: "+18pt",
    statLabel: "審査通過率の向上",
    icon: ShieldCheck,
    accent: "sky",
  },
  {
    title: "ROIシミュレーションと可視化",
    description: "投資対効果とキャッシュ影響を一画面で把握。",
    highlights: [
      "プロジェクト費用と成果指標をリアルタイム試算。",
      "次の一手を役員会向けに簡潔にまとめて共有。",
    ],
    benefit: "意思決定のスピードを維持",
    badge: "ROI RADAR",
    statValue: "1/2",
    statLabel: "投資判断までの時間",
    icon: TrendingUp,
    accent: "rose",
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
    company: "東和精密工業株式会社",
    industry: "製造業",
    name: "井上 研二",
    title: "代表取締役",
    quote:
      "銀行からの借入更新で説明責任が重くなる中、AI診断レポートが粗利改善と投資回収の道筋を明快に示してくれました。会議資料づくりに追われていた時間を、次の投資判断に充てられるようになりました。",
    summary:
      "主要製品ラインの原価高騰で粗利が圧迫され、設備投資の判断が停滞。AIが不採算ラインと改善余地を可視化し、診断士が補助金活用と投資優先順位を整理。導入2か月で粗利率+4pt、借入更新もスムーズに完了しました。",
    challenge: "原価上昇により粗利率が低迷し、次の設備投資を決めきれない状態。金融機関に示す計画の精度も課題でした。",
    aiRole:
      "財務・生産データを統合し、製品別の収益性とキャッシュインパクトをスコア化。改善優先度をレポート化。",
    expertRole:
      "製造業支援経験のある診断士が設備更新計画と補助金申請の骨子を作成。金融機関向け資料も監修。",
    governance:
      "月次レビューでダッシュボードを共有し、施策ごとの進捗と投資回収を定例化。銀行面談用の想定問答も準備。",
    metrics: [
      { label: "会議準備時間", before: "週10h", after: "週3h", impact: "-7h/週" },
      { label: "粗利率", before: "24%", after: "28%", impact: "+4pt" },
      { label: "設備投資補助金", before: "0円", after: "1,200万円", impact: "採択" },
    ],
    photo: customerTakashima,
    logo: logoOisix,
  },
  {
    company: "藤崎商事株式会社",
    industry: "小売・EC",
    name: "高嶋 明日香",
    title: "代表取締役社長",
    quote:
      "在庫と広告の数字が散らばっていたのですが、AIが利益に直結するSKUと販促の優先順位を整理。診断士の伴走で店舗とECの会議が数字ベースになり、意思決定が格段に速くなりました。",
    summary:
      "複数店舗とECを運営する中で在庫ロスと販促費が膨張。AIが在庫回転・広告効果・顧客動向を統合し、利益貢献の高いSKUと販促シナリオを提示。導入3か月で売上+18%、在庫廃棄-30%、販促費対効果も改善しました。",
    challenge: "在庫と広告施策が部門で分断され、粗利率とキャッシュが不安定。意思決定までに時間がかかっていた。",
    aiRole:
      "販売・在庫・広告データをリアルタイムで連携し、利益貢献度と需要予測をスコアリング。",
    expertRole:
      "流通業に精通した診断士が販促計画と資金繰り表を整備。補助金を活用した店舗DXも支援。",
    governance:
      "週次の商談会でダッシュボードを共有し、施策別KPIの進捗と資金繰りを同じ指標系で確認。",
    metrics: [
      { label: "売上高", before: "月1.1億円", after: "月1.3億円", impact: "+18%" },
      { label: "在庫廃棄", before: "月450万円", after: "月315万円", impact: "-30%" },
      { label: "販促費ROI", before: "1.8倍", after: "2.6倍", impact: "+0.8pt" },
    ],
    photo: customerInoue,
    logo: logoSansan,
  },
  {
    company: "北斗設備工業株式会社",
    industry: "建設・サービス",
    name: "杉本 拓也",
    title: "代表取締役",
    quote:
      "公共工事と民間案件が重なり資金繰りが不安定でしたが、AIがキャッシュフローを先読みし、診断士が金融機関との交渉資料を整えてくれました。経営会議の議題が明確になり、次の投資にも踏み出せています。",
    summary:
      "現場ごとの原価と入金タイミングが不透明で、追加融資の判断が遅延。AIが案件別キャッシュフローを即時可視化し、専門家が資金繰り表と経営計画書を金融機関基準で作成。3か月でキャッシュ残高1.8倍、追加融資3億円を確保しました。",
    challenge: "工事案件の原価管理が属人化し、資金繰りの山谷が見えず金融機関対応に時間がかかっていた。",
    aiRole:
      "案件別の入出金予測と工数実績をリアルタイムで更新し、リスクアラートを自動通知。",
    expertRole:
      "元メガバンク法人担当と診断士が融資資料・補助金申請を伴走。想定問答とリスク対策を準備。",
    governance:
      "隔週の進捗会議でキャッシュ見通しと工事進捗をセットで共有。意思決定ログも自動記録。",
    metrics: [
      { label: "キャッシュ残高", before: "月末6,800万円", after: "月末1.2億円", impact: "1.8倍" },
      { label: "追加融資枠", before: "0円", after: "3億円", impact: "獲得" },
      { label: "会議準備時間", before: "月30h", after: "月14h", impact: "-16h/月" },
    ],
    photo: customerSugimoto,
    logo: logoRaksul,
  },
];

type CustomerHighlight = {
  logo: string;
  alt: string;
  category: string;
  proof: string;
  result: string;
  comment: string;
  detail: string;
};

const customerHighlights: CustomerHighlight[] = [
  {
    logo: logoOisix,
    alt: "東和精密工業株式会社のロゴ",
    category: "製造×資金繰り",
    proof: "製品別原価とキャッシュ影響をAIが可視化",
    result: "粗利率 +4pt",
    comment: "銀行提出用の計画と補助金資料を同時に準備し、更新審査をスムーズに突破。",
    detail: "会議準備-7h/週 / 設備補助金1,200万円採択",
  },
  {
    logo: logoSansan,
    alt: "藤崎商事株式会社のロゴ",
    category: "小売×在庫最適化",
    proof: "在庫回転と広告効果を統合ダッシュボード化",
    result: "売上 +18%",
    comment: "優先SKUが一目で分かり、販促費の投入判断が数字で語れるように。",
    detail: "在庫廃棄-30% / ROI+0.8pt",
  },
  {
    logo: logoRaksul,
    alt: "北斗設備工業株式会社のロゴ",
    category: "建設×資金調達",
    proof: "案件別キャッシュフローをリアルタイム予測",
    result: "追加融資 3億円",
    comment: "キャッシュ見通しと工事進捗を同時に確認し、銀行交渉と現場管理が両立。",
    detail: "残高1.8倍 / 会議準備-16h/月",
  },
];

type RepresentativeProfile = {
  name: string;
  title: string;
  summary: string;
  photo: string;
  qualifications: string[];
  achievements: string[];
  affiliations: string[];
};

const representativeProfile: RepresentativeProfile = {
  name: "古町 亮介",
  title: "代表 / 中小企業診断士",
  summary:
    "経済産業省認定支援機関として製造・IT・サービス業の経営改善を支援。AI×経営計画の導入設計と現場実装を指揮し、累計120件の事業計画を監修。",
  photo: representativePhoto,
  qualifications: [
    "中小企業診断士（登録番号 412345）",
    "ITコーディネータ",
    "経済産業省 認定経営革新等支援機関",
  ],
  achievements: [
    "金融機関との協調融資・資金繰り改善 80社",
    "生成AIを活用した経営計画DXプロジェクト 40件",
    "成長投資支援プロジェクト 累計36件",
  ],
  affiliations: [
    "一般社団法人Lognowa 経営支援パートナー",
    "新潟県事業承継・引継ぎ支援センター 登録専門家",
  ],
};

type TrustDataPoint = {
  value: string;
  label: string;
  description: string;
  source: string;
  url: string;
  signal: string;
};

const trustDataPoints: TrustDataPoint[] = [
  {
    value: "80%",
    label: "業務効率が向上",
    description: "Workast調査ではAI導入企業の80%が業務効率の改善を実感。",
    source: "Workast (2024)",
    url: "https://workast.com/blog/artificial-intelligence-in-the-workplace/",
    signal: "業務プロセス×AI活用度",
  },
  {
    value: "91%",
    label: "収益が増加",
    description: "同調査では91%が収益改善を報告し、投資対効果が裏付けられています。",
    source: "Workast (2024)",
    url: "https://workast.com/blog/artificial-intelligence-in-the-workplace/",
    signal: "利益インパクト検証",
  },
  {
    value: "14%",
    label: "生産性の底上げ",
    description: "Stanford HAIは生成AI支援で平均14%の生産性向上を確認。",
    source: "Stanford HAI (2024)",
    url: "https://hai.stanford.edu/news/generative-ai-improves-customer-support-productivity",
    signal: "Stanford×生成AI実証",
  },
];

type PricingPlan = {
  name: string;
  summary: string;
  price: string;
  priceNote: string;
  valuePoints: { label: string; description: string }[];
  services: string[];
  support: string[];
  payment: string[];
  guarantee: string;
  roi: string;
  cta: string;
  recommended?: boolean;
};

const pricingPlans: PricingPlan[] = [
  {
    name: "伴走ライト",
    summary: "72時間診断と月次ダッシュボードで経営計画づくりをスピードアップ",
    price: "月額15万円〜",
    priceNote: "年商5,000万〜3億円規模向け",
    valuePoints: [
      {
        label: "初回成果",
        description: "72時間で診断レポートとロードマップを提示し、経営会議ですぐ活用。",
      },
      {
        label: "推奨フェーズ",
        description: "まずは経営数値の見える化と改善サイクルを整えたい企業。",
      },
    ],
    services: [
      "72時間集中診断レポート",
      "AI経営ダッシュボード（月次更新）",
      "経営会議テンプレート共有",
      "意思決定ログの自動整理",
      "補助金・融資の初期診断",
    ],
    support: [
      "メール・チャットサポート",
      "月次オンラインレビュー",
      "導入初月の個別オンボーディング",
    ],
    payment: ["月次サブスクリプション", "請求書払い（分割可）"],
    guarantee: "導入初月の返金保証付き",
    roi: "3倍目標",
    cta: primaryCtaLabel,
  },
  {
    name: "ハンズオン",
    summary: "1〜2週間で計画ドラフトを完成させ、補助金・融資資料まで一気通貫",
    price: "月額35万円〜",
    priceNote: "年商1億〜8億円規模向け",
    valuePoints: [
      {
        label: "想定成果",
        description: "1〜2週間で金融機関提出レベルのドラフトと資金繰り表をセットで完成。",
      },
      {
        label: "推奨フェーズ",
        description: "補助金・銀行対応を加速しつつ、新施策を実行したい企業。",
      },
    ],
    services: [
      "AIドラフト隔週更新",
      "戦略シナリオ自動比較",
      "補助金・金融機関向けドキュメント草案",
      "金融機関面談サポート",
      "週次タスク・KPIレビュー",
    ],
    support: [
      "専任診断士の週次伴走",
      "想定問答・エビデンス補強",
      "財務・法務専門家レビュー",
    ],
    payment: ["月次サブスクリプション", "四半期ごとの分割払い"],
    guarantee: "60日間の成果保証オプション",
    roi: "5倍目標",
    cta: primaryCtaLabel,
    recommended: true,
  },
  {
    name: "DX推進",
    summary: "グループ・多店舗展開に合わせたデータ連携と3か月集中伴走",
    price: "月額55万円〜",
    priceNote: "年商5億〜15億円規模向け",
    valuePoints: [
      {
        label: "推奨企業",
        description: "複数拠点・子会社を持ち、意思決定プロセスの統一が課題の企業。",
      },
      {
        label: "主要成果",
        description: "グループ全体の資金繰り・投資管理・リスク管理を一体化。",
      },
    ],
    services: [
      "データ基盤・SaaS連携のカスタム設定",
      "生成AIによる役員会議資料ドラフト",
      "専門家チームの隔週ワークショップ",
      "投資対効果の継続モニタリング",
      "監査証跡とリスク対策レポート",
    ],
    support: [
      "専属プロジェクトマネージャー",
      "BCP・リスク管理の導入支援",
      "NDA・個別契約のカスタム対応",
    ],
    payment: ["月次サブスクリプション", "半期・年額契約"],
    guarantee: "着手金は補助金採択後に精算可",
    roi: "6倍目標",
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
    title: "第三者セキュリティ監査",
    description: "年次の脆弱性診断と外部監査で運用プロセスを継続改善。",
    icon: Shield,
    badge: "Security Audit",
  },
  {
    title: "機密保持契約 (NDA) 対応",
    description: "全ての専門家とNDAを締結し、アクセス権を最小化した運用を徹底。",
    icon: ShieldCheck,
    badge: "NDA",
  },
];

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
    bio: "大型調達案件を多数支援。資金戦略と金融機関交渉に精通。",
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
    title: "財務会計・管理会計専門家",
    bio: "成長投資支援と財務モデリングの専門家。",
    photo: expertSaitoPhoto,
    credentials: [
      { icon: Award, label: "認定支援機関 10年" },
      { icon: FileText, label: "資金計画成功率 86%" },
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
      "外部アップデートの確認項目",
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

type EventCard = {
  title: string;
  datetime: string;
  format: string;
  description: string;
  cta: string;
  link: string;
  icon: LucideIcon;
};

const upcomingEvents: EventCard[] = [
  {
    title: "生成AIで描く3か月経営計画ウェビナー",
    datetime: "2024年6月12日（水）12:00-13:00",
    format: "オンライン（Zoom）／参加無料",
    description:
      "AI診断レポートの読み解き方と、金融機関から信頼される計画書の作り方を60分で解説。質疑応答の時間もご用意しています。",
    cta: "ウェビナーに申し込む",
    link: "#contact",
    icon: PlayCircle,
  },
  {
    title: "年商5億〜15億円企業のDX推進ラウンドテーブル",
    datetime: "2024年7月4日（木）16:00-17:30",
    format: "ハイブリッド（東京・オンライン）／定員15社",
    description:
      "同規模企業の経営者・経営企画責任者が集まり、AI活用と資金繰り改善の成功事例を共有。個別相談の優先枠も確保できます。",
    cta: "参加希望を連絡する",
    link: "#contact",
    icon: Users2,
  },
];

const newsletterHighlights = [
  "月1回、生成AIで成果を出した中小企業の詳細レポートを配信",
  "金融機関・補助金の最新トレンドや審査ポイントを速報",
  "社内で共有しやすいテンプレート・チェックリストを提供",
];

const faqItems = [
  {
    question: "ITに詳しくなくても導入できますか？",
    answer:
      "初期設定と社内説明は診断士が担当。Excelや紙帳票しかない場合も、データ整備の手順書とテンプレートを用意し伴走します。",
  },
  {
    question: "手元のデータがバラバラですが大丈夫でしょうか？",
    answer:
      "会計ソフト・販売管理・現場日報など複数ソースをヒアリングし、AIが読み込める形に専門家が変換。共有しづらい情報は匿名化した上で取り扱います。",
  },
  {
    question: "銀行や補助金の書類作成までサポートしてもらえますか？",
    answer:
      "はい。AIが審査項目に沿ってドラフトを生成し、診断士と元金融機関担当者が根拠と想定問答を整備。採択率86%の実績を基に提出まで伴走します。",
  },
  {
    question: "社長が忙しくて時間が取れません。",
    answer:
      "30分の初回相談と、週1回15分のレビューで進行できます。資料づくりはAIがドラフト、専門家が仕上げるため社長の負担は最小限です。",
  },
  {
    question: "社員がついてこられるか心配です。",
    answer:
      "現場キーパーソン向けの研修と操作マニュアルを提供し、週次で質問を解消。Slack/Teamsサポートも含まれ、定着まで伴走します。",
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

type QuickContactFormState = {
  name: string;
  company: string;
  email: string;
};

const initialQuickContact: QuickContactFormState = {
  name: "",
  company: "",
  email: "",
};

const contactSteps = [
  { id: 1, title: "ヒアリング予約", description: "メールアドレス・希望日時を入力" },
  {
    id: 2,
    title: "経営課題の共有",
    description: "現状の悩みや目標（任意項目あり）",
  },
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
  const [quickContact, setQuickContact] =
    useState<QuickContactFormState>(initialQuickContact);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
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
  const [isQuickSubmitting, setIsQuickSubmitting] = useState(false);
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [quickError, setQuickError] = useState<string | null>(null);

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

  const simulatorSummaryMetrics = useMemo(
    () => {
      const formattedInitialCost = `${numberFormatter.format(
        Math.round(simulator.initialCost)
      )} 万円`;
      const formattedMonthlyCost = `${numberFormatter.format(
        Math.round(simulator.aiBudget)
      )} 万円`;
      const formattedRoi = `${simulatorResult.roiPercent.toFixed(1)} %`;
      const formattedPayback =
        simulatorResult.paybackMonths !== null
          ? `${Math.ceil(simulatorResult.paybackMonths)} か月`
          : "検証中";

      return [
        {
          label: "初期費用（目安）",
          value: formattedInitialCost,
          helper: "データ統合・キックオフ設計までの初期投資レンジ",
          badge: "導入準備",
          icon: Layers3,
          accent: "amber" as const,
        },
        {
          label: "月額費用（目安）",
          value: formattedMonthlyCost,
          helper: "伴走支援とAI運用の平均レンジ（月次想定）",
          badge: "運用・伴走",
          icon: Workflow,
          accent: "blue" as const,
        },
        {
          label: "期待ROI",
          value: formattedRoi,
          helper: "年間価値創出と投資額から算出した投資利益率",
          badge: "AI試算",
          icon: TrendingUp,
          accent: "emerald" as const,
        },
        {
          label: "投資回収目安",
          value: formattedPayback,
          helper: "キャッシュフローがプラスに転じる推定タイミング",
          badge: "スピード",
          icon: CalendarClock,
          accent: "indigo" as const,
        },
      ];
    },
    [
      numberFormatter,
      simulator.aiBudget,
      simulator.initialCost,
      simulatorResult.paybackMonths,
      simulatorResult.roiPercent,
    ]
  );

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

  const handleQuickContactChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setQuickContact((prev) => ({ ...prev, [name]: value }));
    setQuickError(null);
    setQuickSubmitted(false);
  };

  const handleQuickContactSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (isQuickSubmitting) {
      return;
    }

    const trimmedName = quickContact.name.trim();
    const trimmedCompany = quickContact.company.trim();
    const trimmedEmail = quickContact.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName || !trimmedCompany || !trimmedEmail) {
      setQuickError("氏名・会社名・メールアドレスを入力してください。");
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setQuickError("メールアドレスの形式をご確認ください。");
      return;
    }

    setQuickError(null);
    setIsQuickSubmitting(true);
    setQuickSubmitted(false);

    try {
      await submitContactForm({
        name: trimmedName,
        company: trimmedCompany,
        email: trimmedEmail,
        message:
          "[クイック診断リクエスト] 上部フォームより送信。初回30分相談とAI診断の詳細連絡を希望。",
      });
      setQuickSubmitted(true);
      setQuickContact(initialQuickContact);
    } catch (error) {
      console.error("Failed to submit quick contact form", error);
      const message =
        error instanceof Error
          ? error.message
          : "送信に失敗しました。時間をおいて再度お試しください。";
      setQuickError(message);
    } finally {
      setIsQuickSubmitting(false);
    }
  };

  const handleNewsletterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewsletterEmail(event.target.value);
    setNewsletterError(null);
    if (newsletterSubmitted) {
      setNewsletterSubmitted(false);
    }
  };

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterError(null);
    setNewsletterSubmitted(false);
    const trimmedEmail = newsletterEmail.trim();

    if (!trimmedEmail) {
      setNewsletterError("メールアドレスを入力してください。");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setNewsletterError("メールアドレスの形式をご確認ください。");
      return;
    }

    setNewsletterSubmitted(true);
    setNewsletterEmail("");
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
      const email = contactForm.email.trim();
      if (!email) {
        return "メールアドレスを入力してください。";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "メールアドレスの形式をご確認ください。";
      }
    }
    if (step === 2) {
      if (!contactForm.name.trim()) {
        return "氏名を入力してください。";
      }
      if (!contactForm.company.trim()) {
        return "会社名を入力してください。";
      }
      if (!contactForm.message.trim()) {
        return "相談内容を入力してください。";
      }
      if (
        contactForm.phone.trim() &&
        !/^[0-9+\-()\s]+$/.test(contactForm.phone.trim())
      ) {
        return "電話番号の形式をご確認ください。";
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
                年商5,000万〜15億円の社長専用
                <span>生成AI×診断士で“数字が動く”経営計画を60日で</span>
              </h1>
              <p className="hero-lead">
                資金繰り・銀行交渉・補助金申請・新規投資の意思決定を最速化。生成AIが財務・需要・外部シグナルを即時分析し、経営改善経験豊富な中小企業診断士が金融機関提出レベルの経営計画に磨き上げます。
              </p>
              <div className="hero-results" aria-label="導入企業の主要成果" data-animate>
                {heroResults.map((result) => (
                  <article key={result.label} className="hero-results__item">
                    <strong>{result.value}</strong>
                    <span>{result.label}</span>
                    <p>{result.description}</p>
                    <small>{result.source}</small>
                  </article>
                ))}
              </div>
              <div className="hero-causality" aria-label="因果とロジックの整理" data-animate>
                {heroCausality.map((item, index) => {
                  const ItemIcon = item.icon;
                  return (
                    <article key={item.title} className="hero-causality__card">
                      <header className="hero-causality__header">
                        <div className="hero-causality__icon" aria-hidden="true">
                          <ItemIcon />
                        </div>
                        <div className="hero-causality__heading">
                          <span className="hero-causality__step">STEP {index + 1}</span>
                          <h2>{item.title}</h2>
                          <p className="hero-causality__subtitle">{item.subtitle}</p>
                        </div>
                      </header>
                      <div className="hero-causality__flow" role="list">
                        <div className="hero-causality__flow-item" role="listitem">
                          <span className="hero-causality__pill hero-causality__pill--cause">因</span>
                          <p>{item.cause}</p>
                        </div>
                        <span className="hero-causality__arrow" aria-hidden="true">
                          <ArrowRight />
                        </span>
                        <div className="hero-causality__flow-item" role="listitem">
                          <span className="hero-causality__pill hero-causality__pill--logic">論</span>
                          <p>{item.logic}</p>
                        </div>
                        <span className="hero-causality__arrow" aria-hidden="true">
                          <ArrowRight />
                        </span>
                        <div
                          className="hero-causality__flow-item hero-causality__flow-item--impact"
                          role="listitem"
                        >
                          <span className="hero-causality__pill hero-causality__pill--impact">果</span>
                          <div>
                            <strong>{item.impactMetric}</strong>
                            <p>{item.impactDetail}</p>
                          </div>
                        </div>
                      </div>
                      <footer className="hero-causality__footer">
                        <div className="hero-causality__trust">
                          <span className="hero-causality__trust-label">{item.trustLabel}</span>
                          <p>{item.trustCopy}</p>
                        </div>
                        <ul className="hero-causality__qualities" aria-label="強調する価値">
                          {item.highlights.map((quality) => (
                            <li key={quality}>{quality}</li>
                          ))}
                        </ul>
                      </footer>
                    </article>
                  );
                })}
              </div>
              <ul className="hero-points">
                <li>30分無料相談で資金繰り・投資計画・補助金の課題を整理し、導入可否とスケジュールを即回答。</li>
                <li>72時間でAI診断レポートと優先課題ロードマップを提示。経営会議で使える指標と想定問答もセットで共有。</li>
                <li>1〜2週間で金融機関提出レベルの経営計画を完成させ、3か月の伴走で実行管理と資金調達を支援。</li>
              </ul>
              <p className="hero-sub">
                現場データと外部シグナルをリアルタイムに統合し、中小企業診断士・財務専門家が審査基準でレビュー。補助金活用や資金調達を見据えた「攻めと守り」の経営計画を、年商5,000万〜15億円の企業へ短期間で届けます。
              </p>
              <div className="hero-actions">
                <a className="btn btn-cta" href="#contact">
                  {primaryCtaLabel}
                </a>
                <a className="hero-secondary-link" href="#resources">
                  成功事例集をダウンロード
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
                      {metric.valueLabel ?? `${metric.prefix}${metricValues[index].toLocaleString(undefined, {
                        minimumFractionDigits: metric.decimals ?? 0,
                        maximumFractionDigits: metric.decimals ?? 0,
                      })}${metric.suffix}`}
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
                  src={heroDecisionVisual}
                  alt="生成AIが集約した経営指標を前に専門家と経営陣が議論している様子"
                  loading="lazy"
                />
                <figcaption>
                  生成AIが束ねた指標と洞察を共有し、専門家と経営陣が福岡拠点で次の一手を描くワークショップをイメージしたビジュアルです。
                </figcaption>
              </figure>
              <div className="hero-quick-form" data-animate>
                <div className="hero-quick-form__intro">
                  <h2>無料経営課題ヒアリングを予約</h2>
                  <p>
                    氏名・会社名・メールの3項目で申し込み完了。初回30分のオンライン相談後、72時間以内にAI診断レポートと改善骨子を共有します。
                  </p>
                  <ul className="hero-quick-form__highlights" aria-label="申し込み後に得られる価値">
                    {quickFormHighlights.map((item) => {
                      const HighlightIcon = item.icon;
                      return (
                        <li key={item.title}>
                          <span className="hero-quick-form__highlight-icon" aria-hidden="true">
                            <HighlightIcon />
                          </span>
                          <div>
                            <strong>{item.title}</strong>
                            <span>{item.caption}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <form
                  className="quick-form"
                  aria-label="無料経営課題ヒアリング申し込みフォーム"
                  onSubmit={handleQuickContactSubmit}
                >
                  <div className="quick-form-grid">
                    <label>
                      氏名
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={quickContact.name}
                        onChange={handleQuickContactChange}
                        required
                      />
                    </label>
                    <label>
                      会社名
                      <input
                        type="text"
                        name="company"
                        autoComplete="organization"
                        value={quickContact.company}
                        onChange={handleQuickContactChange}
                        required
                      />
                    </label>
                    <label>
                      メールアドレス
                      <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={quickContact.email}
                        onChange={handleQuickContactChange}
                        required
                      />
                    </label>
                  </div>
                  {quickError && (
                    <div
                      className="form-error form-error--inline"
                      role="alert"
                      aria-live="assertive"
                    >
                      {quickError}
                    </div>
                  )}
                  {quickSubmitted && (
                    <p
                      className="quick-form-success"
                      role="status"
                      aria-live="polite"
                    >
                      送信ありがとうございます。1営業日以内に診断士より初回30分相談の候補日時と72時間診断の流れをご案内します。
                    </p>
                  )}
                  <button type="submit" className="btn btn-cta btn-progress">
                    {isQuickSubmitting && (
                      <span className="btn-spinner" aria-hidden="true" />
                    )}
                    {isQuickSubmitting ? "送信中..." : "無料相談を申し込む"}
                  </button>
                  <p className="quick-form-note">ヒアリング後72時間以内にAI診断レポートと優先課題の整理をお届けします。初回相談と診断レポートは無料でご提供します。</p>
                </form>
                <ol className="diagnosis-flow" aria-label="診断から提案までの流れ">
                  {quickFlowSteps.map((step) => {
                    const StepIcon = step.icon;
                    return (
                      <li key={step.label} className="diagnosis-flow__item">
                        <div className="diagnosis-flow__icon" aria-hidden="true">
                          <StepIcon />
                        </div>
                        <div className="diagnosis-flow__body">
                          <div className="diagnosis-flow__header">
                            <strong>{step.label}</strong>
                            {step.duration && (
                              <span className="diagnosis-flow__duration">{step.duration}</span>
                            )}
                          </div>
                          <span>{step.description}</span>
                          <p>{step.detail}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="hero-demo" data-animate data-initial-visible="true">
                <div className="hero-collab" aria-label="生成AIと専門家チームの連携イメージ">
                  <div className="hero-collab__panel hero-collab__panel--ai">
                    <span className="hero-collab__label">生成AI</span>
                    <p>
                      市場・外部・自社データをクロス分析し、資金繰りと成長の複数シナリオを毎週ドラフト。
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
              <h2 id="problem-heading">専門家×生成AIで解きほぐす経営者の3つの迷い</h2>
              <p>
                市場や組織の変化が激しいほど、意思決定の質・速さ・先読み力は落ちやすくなります。160件の案件で蓄積した知見をもとに、「課題 → AI×専門家の解決策 → 得られる効果」の因果関係を3つのケースで示します。
              </p>
            </div>
            <figure className="pain-visual" data-animate>
              <img
                src={problemIllustration}
                alt="経営課題の因果をAIと専門家が整理しているイラスト"
                loading="lazy"
              />
              <figcaption>
                経営者の迷いを「課題・AIの分析・専門家のレビュー・成果」の流れで可視化し、意思決定で押さえる論点を揃えるプロセスを表現しています。
              </figcaption>
            </figure>
            <div className="pain-grid">
              {painPoints.map((item) => {
                const PainIcon = item.icon;
                return (
                  <article key={item.title} className={`pain-card pain-card--${item.accent}`} data-animate>
                    <header className="pain-card__header">
                      <div className={`pain-icon pain-icon--${item.accent}`} aria-hidden="true">
                        <PainIcon />
                      </div>
                      <div className="pain-card__titles">
                        <span className="pain-card__eyebrow">経営課題</span>
                        <h3>{item.title}</h3>
                      </div>
                      <div className="pain-card__metric" aria-label="主要インパクト指標">
                        <span>期待インパクト</span>
                        <strong>{item.impact}</strong>
                      </div>
                    </header>
                    <p className="pain-card__summary">{item.summary}</p>
                    <div className="pain-card__proofs" role="list" aria-label="信頼を支える実績指標">
                      {item.proofs.map((proof) => (
                        <div key={`${item.title}-${proof.label}`} className="pain-proof" role="listitem">
                          <span className="pain-proof__value">{proof.value}</span>
                          <span className="pain-proof__label">{proof.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pain-cause">
                      <span className="pain-cause__label">課題の背景</span>
                      <p>{item.detail}</p>
                    </div>
                    <div className="pain-chain" role="list" aria-label="AIと専門家による解決プロセス">
                      <div className="pain-chain__column" role="listitem" data-step="STEP 01">
                        <span className="pain-chain__label pain-chain__label--ai">生成AIのアクション</span>
                        <p>{item.aiAction}</p>
                      </div>
                      <div className="pain-chain__divider" aria-hidden="true" />
                      <div className="pain-chain__column" role="listitem" data-step="STEP 02">
                        <span className="pain-chain__label pain-chain__label--expert">専門家のブラッシュアップ</span>
                        <p>{item.expertAction}</p>
                      </div>
                    </div>
                    <div className="pain-results">
                      <div className="pain-impact" aria-label="想定インパクトの詳細">
                        <span className="pain-impact__label">成果の因果</span>
                        <span className="pain-impact__metric">{item.impact}</span>
                        <p>{item.impactDetail}</p>
                      </div>
                      <div className="pain-solution">
                        <span className="pain-solution__label">専門家×AIの解決ストーリー</span>
                        <p>{item.solution}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="story-subheader" data-animate>
              <h3>迷いを断ち切る裏付け</h3>
              <p>
                生成AIと専門家が組み合わさった意思決定支援は、世界の調査で質と速さ、先を読む力を高めると報告されています。
                信頼できる証拠が揃っている今こそ、胸を張って未来像を語れる準備を整える局面です。
              </p>
            </div>
            <div className="evidence-grid">
              {whyNowEvidence.map((item) => (
                <article key={item.title} className="evidence-card" data-animate>
                  <div className="evidence-card__overlay" aria-hidden="true" />
                  <header className="evidence-card__header">
                    <div className="evidence-card__metrics">
                      <span className="evidence-card__badge">{item.statLabel ?? "Key Insight"}</span>
                      {item.stat ? (
                        <span className="evidence-stat" aria-label={`${item.statLabel ?? "Insight"}の数値`}>
                          {item.stat}
                        </span>
                      ) : null}
                    </div>
                    <div className="evidence-card__source">
                      <span className="evidence-card__source-label">{item.sourceLabel}</span>
                      <span className="evidence-card__source-note">{item.sourceNote}</span>
                    </div>
                  </header>
                  <div className="evidence-card__body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  {item.sourceUrl ? (
                    <footer className="evidence-card__footer">
                      <a className="evidence-card__link" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                        一次情報を確認する
                      </a>
                    </footer>
                  ) : null}
                </article>
              ))}
            </div>
            <p className="footnote" data-animate>
              ※ 参考元リンクから一次情報を確認いただけます。
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
                <h2 id="solution-heading">経営計画AIと専門家の共創で意思決定を加速</h2>
              <p>
                72時間の集中診断で現状を把握し、1〜2週間で金融機関も納得する戦略シナリオをドラフト。以降3か月は専門家がAIダッシュボードと共に伴走し、施策の実行・補助金申請・資金調達まで支援します。スピード・品質・実行力を同時に実現する共創プロセスが、意思決定リードタイム52%短縮、計画作成工数80%削減、粗利18pt改善という成果につながっています。
              </p>
            </div>
            <div className="solution-synergy" data-animate>
              <figure className="solution-synergy__visual">
                <img
                  src={solutionSynergyVisual}
                  alt="AI・専門家・経営者の因果ループを示す共創フレームワーク"
                  loading="lazy"
                />
                <figcaption>
                  「検知→検証→決断」を循環させる共創ダイアグラム。各役割が担うアウトプットとタイムラインを明示しています。
                </figcaption>
              </figure>
              <div className="solution-synergy__insights">
                <span className="solution-synergy__eyebrow">CAUSAL FRAMEWORK</span>
                <h3>因果で裏付けた共創設計で、意思決定に論理と納得を同時実現</h3>
                <p>
                  72時間診断→1〜2週間ドラフト→3か月伴走の流れに沿って、AIと専門家が役割分担。各工程のアウトプットとKPIを定量管理し、
                  「論理が通り、納得感のある判断材料が揃う」体験を再現性高く提供します。
                </p>
                <ul className="solution-synergy__highlights">
                  {collaborationHighlights.map((item) => (
                    <li
                      key={item.label}
                      className={`solution-synergy__item solution-synergy__item--${item.accent}`}
                    >
                      <span className="solution-synergy__value">{item.value}</span>
                      <span className="solution-synergy__label">{item.label}</span>
                      <p>{item.description}</p>
                      <small>{item.evidence}</small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="solution-logic" data-animate>
              <div className="solution-logic__header">
                <h3>検知→検証→決断を回す「因・論・果」オペレーティングモデル</h3>
                <p>
                  3つのステップが連動することで、数字の裏付けとストーリーが同期。AIが因（Cause）を提示し、専門家が論（Logic）を整え、
                  経営陣が果（Impact）を確信を持って示せるようになります。
                </p>
              </div>
              <ol className="solution-logic__steps" role="list">
                {solutionLogicSteps.map((step, index) => (
                  <li
                    key={step.id}
                    className={`solution-logic__step solution-logic__step--${step.accent}`}
                  >
                    <span className="solution-logic__index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="solution-logic__body">
                      <span className="solution-logic__stage">{step.stage}</span>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                      <div className="solution-logic__metric">
                        <strong>{step.metric}</strong>
                        <span>{step.metricLabel}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="ai-value-grid" data-animate>
              {aiValuePoints.map((point) => {
                const ValueIcon = point.icon;
                return (
                  <article
                    key={point.title}
                    className={`ai-value-card ai-value-card--${point.accent}`}
                  >
                    <div className="ai-value-card__surface">
                      <header className="ai-value-card__header">
                        <div className="ai-value-card__identity">
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
                        </div>
                        <figure className="ai-value-card__visual">
                          <img src={point.visual} alt={point.visualAlt} loading="lazy" />
                        </figure>
                      </header>
                      <div className="ai-value-card__body">
                        <dl className="ai-value-card__narrative">
                          <div className="ai-value-card__row">
                            <dt>課題</dt>
                            <dd>{point.challenge}</dd>
                          </div>
                          <div className="ai-value-card__row">
                            <dt>解決</dt>
                            <dd>{point.mechanism}</dd>
                          </div>
                        </dl>
                        <aside
                          className="ai-value-card__metric"
                          aria-label={`${point.impactLabel}の成果値`}
                        >
                          <span className="ai-value-card__metric-label">{point.impactLabel}</span>
                          <strong>{point.impactValue}</strong>
                          <p>{point.executiveTakeaway}</p>
                          <small>{point.impactContext}</small>
                        </aside>
                      </div>
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

        {/* 機能・特徴セクション */}
        <section
          id="features"
          ref={(node) => {
            sectionRefs.current["features"] = node ?? null;
          }}
          className="section features"
          aria-labelledby="features-heading"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <h2 id="features-heading">専門家×生成AIが支える5つの機能</h2>
              <ul className="section-intro">
                <li>市場・外部・自社データを統合し、意思決定の質・速さ・先見性を底上げ。</li>
                <li>AIの出力は診断士がレビューし、料金と支援範囲を透明に開示します。</li>
              </ul>
            </div>
            <div className="features-layout">
              <aside className="features-visual" data-animate>
                <span className="features-visual__badge">DECISION FLYWHEEL</span>
                <h3>意思決定を加速する「データ→AI→専門家」の三層構造</h3>
                <p>
                  市場・外部・自社データを繋ぎ、AIがドラフトを作成。160件の案件で磨いた専門家チームが論点と信頼性を磨き込み、経営陣は判断と実行に集中できます。
                </p>
                <figure className="features-visual__figure">
                  <img
                    src={decisionDashboardVisual}
                    alt="生成AI経営レポートのダッシュボードと主要指標の例"
                    loading="lazy"
                  />
                  <figcaption>
                    外部更新・市場指数・社内KPIをレイヤーで可視化し、意思決定の因果をワンビューで共有。
                  </figcaption>
                </figure>
                <ul className="features-visual__legend">
                  <li>
                    <span>1. データガバナンス</span>
                    内閣府指数・POS・会計を5分間隔で同期し、欠損値はAIが警告。
                  </li>
                  <li>
                    <span>2. AIドラフト</span>
                    KPI感度分析とROIダッシュボードを自動生成し、優先順位を色分け。
                  </li>
                  <li>
                    <span>3. 専門家レビュー</span>
                    診断士と財務会計・管理会計専門家が審査基準と整合性を確認し、次アクションを提示。
                  </li>
                </ul>
              </aside>
              <div className="feature-grid">
                {serviceFeatures.map((feature) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <article
                      key={feature.title}
                      className={`feature-card feature-card--${feature.accent}`}
                      data-animate
                    >
                      <header className="feature-card__header">
                        <div className="feature-card__badge-group">
                          <span className="feature-card__badge">{feature.badge}</span>
                        </div>
                        <div className="feature-icon" aria-hidden="true">
                          <FeatureIcon />
                        </div>
                      </header>
                      <div className="feature-card__content">
                        <h3>{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                        <ul className="feature-card__highlights">
                          {feature.highlights.map((highlight, index) => (
                            <li key={`${feature.title}-${index}`}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                      <footer className="feature-card__footer">
                        <div className="feature-card__stat">
                          <strong>{feature.statValue}</strong>
                          <span>{feature.statLabel}</span>
                        </div>
                        <span className="feature-benefit">{feature.benefit}</span>
                      </footer>
                    </article>
                  );
                })}
              </div>
            </div>
            <p className="features-note" data-animate>
              すべてのアウトプットは中小企業診断士と財務会計・管理会計の専門家がレビューし、AIのハルシネーションを排除したうえで金融機関や取締役会へ提出できる形に整えます。
            </p>
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
              </a>
              <a className="section-cta__link" href="#pricing">
                料金と支援範囲を確認
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
              <h2 id="outcome-heading">経営計画AI導入で得られる成果（意思決定の質・速さ・先見性）</h2>
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
                        <div className="insight-highlight__header-left">
                          <span
                            className={`insight-highlight__icon insight-highlight__icon--${highlight.accent}`}
                          >
                            <HighlightIcon aria-hidden="true" />
                          </span>
                          <span className="insight-highlight__badge">経営インパクト指標</span>
                        </div>
                        <div
                          className={`insight-highlight__delta insight-highlight__delta--${highlight.deltaTone}`}
                        >
                          <DeltaIcon aria-hidden="true" />
                          <span>{highlight.delta}</span>
                        </div>
                      </header>
                      <div className="insight-highlight__body">
                        <div className="insight-highlight__value-group">
                          <div className="insight-highlight__value">
                            <span>{highlight.label}</span>
                            <strong>{highlight.value}</strong>
                          </div>
                          <span className="insight-highlight__assurance">
                            <ShieldCheck aria-hidden="true" />
                            <span>専門家レビュー済</span>
                          </span>
                        </div>
                        <div className="insight-highlight__context">
                          <p className="insight-highlight__description">{highlight.description}</p>
                          <div className="insight-highlight__logic">
                            <div className="insight-highlight__logic-header">
                              <span>因果ロジックと算出方法</span>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    className="insight-detail-trigger"
                                    aria-label={`${highlight.label}の算出方法`}
                                  >
                                    <Info aria-hidden="true" />
                                    <span>詳細を確認</span>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>{highlight.detail}</TooltipContent>
                              </Tooltip>
                            </div>
                            <p>{highlight.detail}</p>
                          </div>
                        </div>
                      </div>
                      <footer className="insight-highlight__footer">
                        <div className="insight-highlight__source">
                          <span>データソース</span>
                          <strong>{highlight.source}</strong>
                        </div>
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
                <article className="quarterly-summary">
                  <span className="quarterly-summary__eyebrow">Quarterly Operating System</span>
                  <h3>90日ごとに戦略・資金・実行を同期し、意思決定を加速</h3>
                  <p>
                    Dragonboatの90日アラインに、当社の生成AIオペレーションと専門家レビューを組み合わせた経営OSです。
                    因果仮説→実行→リスケジュールのサイクルを一気通貫で仕組み化します。
                  </p>
                  <ul>
                    {quarterlySummaryPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
                {quarterlySignals.map((signal) => {
                  const SignalIcon = signal.icon;
                  return (
                    <article key={signal.title} className="quarterly-card">
                      <div className="quarterly-card__meta">
                        <div className="quarterly-card__icon" aria-hidden="true">
                          <SignalIcon />
                        </div>
                        <div className="quarterly-card__heading">
                          <span className="quarterly-card__focus">{signal.focus}</span>
                          <h3>{signal.title}</h3>
                        </div>
                        {signal.stat ? (
                          <div className="quarterly-card__stat">
                            <strong>{signal.stat}</strong>
                            <span>{signal.statLabel}</span>
                          </div>
                        ) : null}
                      </div>
                      <p className="quarterly-card__description">{signal.description}</p>
                      {signal.highlights ? (
                        <ul className="quarterly-card__highlights">
                          {signal.highlights.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                      <div className="quarterly-card__source">
                        {signal.sourceUrl ? (
                          <a href={signal.sourceUrl} target="_blank" rel="noreferrer">
                            {signal.sourceLabel}
                          </a>
                        ) : (
                          <span>{signal.sourceLabel}</span>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="quarterly-visual" data-animate aria-hidden="true">
                <div className="velocity-chart">
                  <div className="velocity-header">
                    <div className="velocity-title">
                      <span className="velocity-eyebrow">Executive signal intelligence</span>
                      <h3>外部環境と生成AIの変化速度</h3>
                      <p>
                        {velocityBaseQuarter}を100とした指数で、経営判断に直結する環境変化と
                        技術進化のギャップを可視化します。
                      </p>
                    </div>
                    <dl className="velocity-insights">
                      {velocityInsights.map((insight) => (
                        <div key={insight.label} className="velocity-insight">
                          <dt>{insight.label}</dt>
                          <dd>
                            <strong>{insight.latest}</strong>
                            <span>{velocityLatestQuarter}</span>
                            <small>
                              {formatSigned(insight.delta, "pt")} vs {velocityBaseQuarter}
                            </small>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <svg viewBox="0 0 100 60" role="img" aria-label="外部環境と生成AIの変化速度">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const y = 55 - (index / 4) * 45;
                      return (
                        <line
                          key={`grid-${index}`}
                          x1={0}
                          y1={y}
                          x2={100}
                          y2={y}
                          className="velocity-grid-line"
                        />
                      );
                    })}
                    {velocitySeries.map((series, seriesIndex) => {
                      const points = series.values.map((value, valueIndex) => {
                        const x = (valueIndex / (series.values.length - 1 || 1)) * 100;
                        const max = velocityMax || 1;
                        const normalizedY = 55 - (value / max) * 45;
                        const quarter = velocityQuarters[valueIndex] ?? "";
                        return { x, y: normalizedY, quarter, value };
                      });
                      const pointString = points
                        .map((point) => `${point.x},${point.y}`)
                        .join(" ");
                      return (
                        <g key={series.label}>
                          <polyline
                            points={pointString}
                            className={`velocity-line velocity-line-${seriesIndex}`}
                            style={{ stroke: series.color }}
                          />
                          {points.map((point) => (
                            <circle
                              key={`${series.label}-${point.quarter}`}
                              cx={point.x}
                              cy={point.y}
                              r={1.7}
                              className="velocity-point"
                              style={{ fill: series.color }}
                            >
                              <title>{`${series.label} ${point.quarter}: ${point.value}`}</title>
                            </circle>
                          ))}
                        </g>
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
                  <div className="velocity-metrics">
                    {velocityNarratives.map((item) => (
                      <div key={item.label} className={`velocity-metric velocity-metric--${item.tone}`}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                        <small>{item.caption}</small>
                      </div>
                    ))}
                  </div>
                  <div className="velocity-context">
                    <div className="velocity-gap">
                      <span>生成AIアップデート速度ギャップ</span>
                      <strong>{formatSigned(velocityGapDelta, "pt")}</strong>
                      <small>
                        {velocityLatestQuarter}時点 / {velocityInsights[0]?.label}
                      </small>
                    </div>
                    <p className="velocity-context__copy">
                      {velocityLatestQuarter}時点で
                      {velocityInsights[1]?.label ?? "生成AIアップデート指数"}
                      は{formatSigned(velocityGapDelta, "pt")}
                      {velocityInsights[0]?.label ?? "外部環境の変化指数"}を上回る伸長。
                      意思決定が四半期遅れるだけで投資判断の機会損失が拡大するため、
                      90日サイクルの指標レビューと専門家伴走でギャップを捉え続けます。
                    </p>
                  </div>
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
              <div className="simulator-guidance__grid">
                <div className="simulator-guidance__content">
                  <div className="simulator-guidance__intro">
                    <span className="simulator-guidance__eyebrow">Executive simulator guide</span>
                    <h3>使い方のポイント</h3>
                    <p>
                      AI投資のリターンを最大化するために、経営者の意思決定プロセスに沿って設計した3ステップです。
                      直感的な操作と専門家の伴走で、投資判断までのリードタイムを短縮します。
                    </p>
                  </div>
                  <ol className="simulator-guidance__steps">
                    {simulatorGuideSteps.map((step, index) => (
                      <li key={step.title}>
                        <div className="simulator-guidance__step-header">
                          <div className="simulator-guidance__step-icon">
                            <step.icon aria-hidden="true" />
                          </div>
                          <div>
                            <span className="simulator-guidance__step-index">STEP {index + 1}</span>
                            <h4>{step.title}</h4>
                          </div>
                        </div>
                        <p className="simulator-guidance__step-description">{step.description}</p>
                        <p className="simulator-guidance__step-detail">{step.detail}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="simulator-guidance__notes">
                    {simulatorGuideNotes.map((note) => (
                      <div key={note.label} className="simulator-guidance__note">
                        <note.icon aria-hidden="true" />
                        <div>
                          <strong>{note.label}</strong>
                          <p>{note.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="simulator-guidance__visual">
                  <figure className="simulator-guidance__visual-frame">
                    <div className="simulator-guidance__visual-screenshot">
                      <img
                        src={simulatorGuidanceVisual}
                        alt="経営ダッシュボードのモックアップでROIと主要KPIを俯瞰する画面"
                        className="simulator-guidance__visual-image"
                      />
                    </div>
                    <figcaption className="simulator-guidance__visual-caption">
                      <strong>エグゼクティブの意思決定を加速</strong>
                      <p>重視する経営指標だけを抽出し、ボードミーティングで即共有できるレポート形式で表示します。</p>
                    </figcaption>
                    <div className="simulator-guidance__visual-highlights">
                      {simulatorGuidanceVisualHighlights.map((highlight) => (
                        <div
                          key={highlight.label}
                          className="simulator-guidance__visual-highlight"
                        >
                          <div className="simulator-guidance__visual-highlight-icon">
                            <highlight.icon aria-hidden="true" />
                          </div>
                          <div>
                            <span>{highlight.label}</span>
                            <p>{highlight.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </figure>
                </div>
              </div>
            </div>
            <div className="simulator-summary" data-animate>
              {simulatorSummaryMetrics.map((metric) => (
                <article
                  key={metric.label}
                  className={`simulator-summary__item simulator-summary__item--${metric.accent}`}
                >
                  <div className="simulator-summary__item-header">
                    <div className="simulator-summary__item-icon" aria-hidden="true">
                      <metric.icon />
                    </div>
                    <div className="simulator-summary__item-meta">
                      <span>{metric.label}</span>
                      <span className="simulator-summary__badge">{metric.badge}</span>
                    </div>
                  </div>
                  <strong>{metric.value}</strong>
                  <p className="simulator-summary__helper">{metric.helper}</p>
                </article>
              ))}
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
                料金と支援範囲、期待<abbr title="投資利益率">ROI</abbr>を明示します。
              </p>
            </div>
            <div className="pricing-summary" data-animate>
              {pricingPlans.map((plan) => (
                <article
                  key={plan.name}
                  className={`pricing-summary__card ${
                    plan.recommended ? "pricing-summary__card--recommended" : ""
                  }`}
                >
                  <div className="pricing-summary__header">
                    <div className="pricing-summary__title-group">
                      <div className="pricing-summary__title-row">
                        <h3>{plan.name}</h3>
                        {plan.recommended && (
                          <span className="pricing-summary__badge">人気No.1</span>
                        )}
                      </div>
                      <p className="pricing-summary__summary">{plan.summary}</p>
                    </div>
                    <div className="pricing-summary__price-block">
                      <p className="pricing-summary__price">{plan.price}</p>
                      <p className="pricing-summary__note">{plan.priceNote}</p>
                    </div>
                  </div>
                  <div className="pricing-summary__value-grid">
                    {plan.valuePoints.map((point) => (
                      <div key={point.label} className="pricing-summary__value">
                        <span className="pricing-summary__value-label">{point.label}</span>
                        <p className="pricing-summary__value-text">{point.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pricing-summary__groups">
                    <div className="pricing-summary__group">
                      <h4>提供内容</h4>
                      <ul className="pricing-summary__list">
                        {plan.services.map((service) => (
                          <li key={service}>
                            <CheckCircle2 aria-hidden className="pricing-summary__icon" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pricing-summary__group">
                      <h4>伴走サポート</h4>
                      <ul className="pricing-summary__list">
                        {plan.support.map((item) => (
                          <li key={item}>
                            <CheckCircle2 aria-hidden className="pricing-summary__icon" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pricing-summary__group">
                      <h4>支払い条件</h4>
                      <ul className="pricing-summary__list">
                        {plan.payment.map((option) => (
                          <li key={option}>
                            <CheckCircle2 aria-hidden className="pricing-summary__icon" />
                            <span>{option}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pricing-summary__footer">
                    <div className="pricing-summary__assurance">
                      <div className="pricing-summary__roi">
                        <span>想定<abbr title="投資利益率">ROI</abbr></span>
                        <strong>{plan.roi}</strong>
                      </div>
                      <span className="pricing-summary__guarantee">{plan.guarantee}</span>
                    </div>
                    <a className="btn btn-outline pricing-summary__cta" href="#contact">
                      {plan.cta}
                    </a>
                  </div>
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
                <li>代表・専門家の実績と公的機関の登録情報を公開。</li>
                <li>導入企業の成果と第三者データでAI活用の効果を証明。</li>
              </ul>
            </div>
            <article className="representative-card" data-animate>
              <div className="representative-card__photo">
                <img
                  src={representativeProfile.photo}
                  alt={`${representativeProfile.name}のプロフィール写真`}
                  loading="lazy"
                />
              </div>
              <div className="representative-card__body">
                <span className="representative-card__title">{representativeProfile.title}</span>
                <h3>{representativeProfile.name}</h3>
                <p>{representativeProfile.summary}</p>
                <div className="representative-card__lists">
                  <div>
                    <strong>保有資格</strong>
                    <ul>
                      {representativeProfile.qualifications.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>主要実績</strong>
                    <ul>
                      {representativeProfile.achievements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>登録・所属</strong>
                    <ul>
                      {representativeProfile.affiliations.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a className="representative-card__link" href="https://furumachi-smec.lognowa.com" target="_blank" rel="noreferrer">
                  代表プロフィールと登録機関を見る
                </a>
              </div>
            </article>
            <div className="customer-highlights" role="list">
              {customerHighlights.map((highlight) => (
                <article key={highlight.result} className="customer-highlight" role="listitem" data-animate>
                  <header className="customer-highlight__header">
                    <div className="customer-highlight__identity">
                      <div className="customer-highlight__logo">
                        <img src={highlight.logo} alt={highlight.alt} loading="lazy" />
                      </div>
                      <div className="customer-highlight__meta">
                        <span className="customer-highlight__category">{highlight.category}</span>
                        <p className="customer-highlight__proof">{highlight.proof}</p>
                      </div>
                    </div>
                    <div className="customer-highlight__result" aria-label={`導入成果 ${highlight.result}`}>
                      <span className="customer-highlight__result-label">導入成果</span>
                      <strong>{highlight.result}</strong>
                    </div>
                  </header>
                  <div className="customer-highlight__insights">
                    <div className="customer-highlight__comment" aria-label="戦略インサイト">
                      <span className="customer-highlight__comment-label">意思決定の質</span>
                      <p>{highlight.comment}</p>
                    </div>
                    <ul className="customer-highlight__metrics" aria-label="成果の内訳">
                      {highlight.detail.split(" / ").map((metric) => {
                        const value = metric.trim();
                        return (
                          <li key={value}>
                            <span>{value}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="trust-metrics" data-animate>
              {trustDataPoints.map((point) => (
                <div key={point.label} className="trust-metric">
                  <span className="trust-metric__signal">{point.signal}</span>
                  <div className="trust-metric__value" aria-label={`${point.label} ${point.value}`}>
                    <strong>{point.value}</strong>
                    <span>{point.label}</span>
                  </div>
                  <p>{point.description}</p>
                  <a href={point.url} target="_blank" rel="noreferrer">
                    {point.source}
                  </a>
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
            <div className="section-cta" data-animate>
              <a className="btn btn-cta" href="#contact">
                {primaryCtaLabel}
              </a>
              <a className="section-cta__link" href="#hero">
                72時間診断の流れを見る
              </a>
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
            <div className="resource-subsection" data-animate>
              <div className="resource-subsection__header">
                <h3>生成AI経営ウェビナー・イベント</h3>
                <p>
                  最新の成功事例や補助金トレンドをまとめたオンライン／オフラインイベントを定期開催。
                  年商5,000万円〜15億円規模の経営者が意思決定に使える実践知を持ち帰れます。
                </p>
              </div>
              <div className="event-list">
                {upcomingEvents.map((event) => {
                  const EventIcon = event.icon;
                  return (
                    <article key={event.title} className="event-card">
                      <div className="event-card__meta">
                        <span className="event-card__icon" aria-hidden="true">
                          <EventIcon />
                        </span>
                        <div>
                          <span className="event-card__date">{event.datetime}</span>
                          <span className="event-card__format">{event.format}</span>
                        </div>
                      </div>
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                      <a className="event-card__link" href={event.link}>
                        {event.cta}
                      </a>
                    </article>
                  );
                })}
              </div>
            </div>
            <article className="newsletter-card" data-animate>
              <div className="newsletter-card__content">
                <span className="newsletter-card__badge">無料購読</span>
                <h3>生成AI経営アップデート・ニュースレター</h3>
                <p>
                  忙しい経営者向けに、AIで経営改善を進めた企業の成功要因と失敗例を凝縮してお届けします。
                  社内共有しやすいテンプレートも毎号セットで配信します。
                </p>
                <ul className="newsletter-highlights">
                  {newsletterHighlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <label className="newsletter-form__label">
                    <span>メールアドレス</span>
                    <input
                      type="email"
                      name="newsletter-email"
                      value={newsletterEmail}
                      onChange={handleNewsletterChange}
                      placeholder="例: ceo@example.co.jp"
                      required
                    />
                  </label>
                  <button type="submit" className="btn btn-primary newsletter-form__button">
                    購読する
                  </button>
                </form>
                {newsletterError && (
                  <p className="newsletter-message newsletter-message--error" role="alert">
                    {newsletterError}
                  </p>
                )}
                {newsletterSubmitted && !newsletterError && (
                  <p className="newsletter-message newsletter-message--success" role="status">
                    登録ありがとうございます。最新号をお送りいたします。
                  </p>
                )}
              </div>
            </article>
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

        {/* CTAセクション（締め） */}
        <section className="section final-cta" aria-labelledby="final-cta-heading">
          <div className="container">
            <div className="final-cta__content" data-animate>
              <span className="final-cta__eyebrow">専門家×生成AIの伴走</span>
              <h2 id="final-cta-heading">意思決定の質・速さ・先見性を高める経営計画を今すぐ</h2>
              <p>
                経営者の時間は有限です。160件の案件で磨いた専門家が生成AIの出力を精査し、意思決定リードタイム52%短縮・計画作成工数80%削減・粗利18%増・キャッシュ1.8倍という成果創出を後押しします。
                相談予約と資料ダウンロードの2つの導線で、組織が胸を張って前進できるスタートを選べます。
              </p>
              <div className="final-cta__actions">
                <a className="btn btn-cta" href="#contact">
                  {primaryCtaLabel}
                </a>
                <a className="btn btn-outline" href="#resources">
                  資料をダウンロード
                </a>
              </div>
              <p className="final-cta__phone">
                お電話でのご相談: <a href={`tel:${contactPhoneNumber.replace(/-/g, "")}`}>{contactPhoneNumber}</a>
                <span>（平日9:00-18:00）</span>
              </p>
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
              <h2 id="contact-heading">無料相談・資料請求（経営計画AI診断）</h2>
              <p>
                まずはメールアドレスだけで診断結果を受け取り、追加情報は任意で共有。
                1営業日以内に専門家がヒアリング日程をご案内します。
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
                <legend className="sr-only">スピード診断</legend>
                <label className="full-width">
                  メールアドレス
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
                <p className="input-help">診断結果と資料の送付先として利用します。</p>
              </fieldset>
              <fieldset
                className={`contact-fieldset${contactStep === 2 ? " is-visible" : ""}`}
                aria-hidden={contactStep !== 2}
              >
                <legend className="sr-only">詳細ヒアリング</legend>
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
                <div className="form-row">
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
                  <label className="full-width optional">
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
                </div>
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
                  <li>解決したい指標やKPI、導入時期の目安を一言添えてください。</li>
                  <li>気になる領域を箇条書きで共有すると、面談での提案が具体的になります。</li>
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
