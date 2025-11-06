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

import heroDecisionVisual from "@/assets/hero-dashboard-analytics.jpg";
import decisionDashboardVisual from "@/assets/dashboard-preview.jpg";
import simulatorGuidanceVisual from "@/assets/strategy-planning.jpg";
import expertKobayashiPhoto from "@/assets/expert-kobayashi.svg";
import expertSaitoPhoto from "@/assets/expert-saito.svg";
import expertTanakaPhoto from "@/assets/expert-tanaka.svg";
import representativePhoto from "@/assets/representative.jpg";
import problemIllustration from "@/assets/problem-illustration.jpg";
import solutionSynergyVisual from "@/assets/solution-synergy.svg";
import journeyFlowVisual from "@/assets/process-flow-infographic.jpg";
import decisionRoadmapVisual from "@/assets/process-flow.jpg";
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

const primaryCtaLabel = "まずは60秒で自社の意思決定リスクを診断する";
const heroSnapshotHighlights = [
  {
    label: "72時間でAI診断レポート",
    description: "財務・販売・在庫データを束ねた優先課題の整理表を即共有。",
  },
  {
    label: "1〜2週間で計画ドラフト",
    description: "金融機関提出レベルのストーリーとKPIを専門家が伴走作成。",
  },
  {
    label: "3か月で定着・資金確保",
    description: "週次レビューと補助金・融資支援でROIと資金繰りを追跡。",
  },
];
const heroTrustSignals = [
  {
    label: "経済産業省 認定経営革新等支援機関",
    description: "登録専門家チームが金融機関提出資料の品質を担保。",
  },
  {
    label: "地域金融機関との共同伴走 12行",
    description: "審査ロジックを踏まえた計画づくりで交渉をスムーズに。",
  },
  {
    label: "案件継続率 92%",
    description: "成果創出まで伴走し継続契約をいただいたプロジェクト比率。",
  },
];
const heroProcessPrinciples = [
  {
    label: "因果設計",
    description:
      "AIの相関解析と現場ヒアリングを重ね、課題→施策→KPIを因果で整列。意思決定の抜け漏れをなくします。",
    icon: Workflow,
  },
  {
    label: "論理検証",
    description:
      "金融機関・取引先の審査観点を基準にロジックツリーで仮説検証。納得性の高い説明ストーリーを設計。",
    icon: ShieldCheck,
  },
  {
    label: "成果ドリブン",
    description:
      "3か月の伴走で粗利・資金繰り・組織浸透を週次ダッシュボードで追跡し、打ち手を継続改善します。",
    icon: TrendingUp,
  },
];
const heroProcessHighlights = [
  {
    value: "72h",
    label: "論点・KPIの骨子",
    description: "AI診断とヒアリングを束ねた判断ファクトブックを共有。",
  },
  {
    value: "92%",
    label: "金融機関での一次審査通過率",
    description: "審査観点に沿った計画ドラフトで説明負荷を軽減。",
  },
  {
    value: "+3.2pt",
    label: "平均粗利改善",
    description: "週次レビューと伴走で施策の実行定着を支援。",
  },
];
const heroProcessMilestones = [
  {
    phase: "0〜72時間",
    outcome: "判断ファクトブック",
    title: "論点とKPIを一枚に集約",
    detail:
      "AI診断が抽出したデータパターンと経営者の意向を重ね、意思決定に必要な論点・KPI・想定問答を整理します。",
    metricValue: "72h",
    metricLabel: "初回骨子共有",
    support: "AI診断レポート／論点マップ",
  },
  {
    phase: "1〜2週間",
    outcome: "金融機関提出レベル",
    title: "資金計画と実行ロードマップを合意形成",
    detail:
      "財務・投資シナリオを複数比較し、金融機関・取引先への説明資料とストーリーラインを完成させます。",
    metricValue: "92%",
    metricLabel: "一次審査通過率",
    support: "資金計画／提出資料テンプレ",
  },
  {
    phase: "1〜3か月",
    outcome: "実行・改善フェーズ",
    title: "週次伴走で成果とリスクをコントロール",
    detail:
      "会議ダッシュボードと伴走ミーティングで、粗利改善・資金繰り・オペレーションの実行状況をトラッキングします。",
    metricValue: "+3.2pt",
    metricLabel: "平均粗利改善",
    support: "週次レビュー／リスクモニタリング",
  },
];
const contactPhoneNumber = "03-4520-1234";

const headerNavItems = [
  { id: "hero", label: "サービス概要" },
  { id: "problem", label: "課題" },
  { id: "solution", label: "解決策" },
  { id: "features", label: "機能・特徴" },
  { id: "comparison", label: "他社比較" },
  { id: "outcome", label: "成果" },
  { id: "stories", label: "事例" },
  { id: "pricing", label: "導入と料金" },
  { id: "resources", label: "資料・イベント" },
  { id: "faq", label: "FAQ" },
];

const sectionNavItems = [...headerNavItems, { id: "contact", label: "無料相談" }];

type CtaJourneyStage = {
  id: "learn" | "evaluate" | "decide";
  stageLabel: string;
  headline: string;
  description: string;
  buttonLabel: string;
  href: string;
  icon: LucideIcon;
  metricValue: string;
  metricLabel: string;
  deliverables: string[];
  proof: string;
};

const ctaJourneyStages: CtaJourneyStage[] = [
  {
    id: "learn",
    stageLabel: "状況整理の段階",
    headline: "72時間で経営課題の因果を可視化",
    description:
      "財務・営業・人材の指標を束ね、生成AIが抽出したリスクと機会を専門家がストーリーボード化。判断基準を全員で揃えます。",
    buttonLabel: "3分サマリーを確認",
    href: "#summary",
    icon: BookOpen,
    metricValue: "72h",
    metricLabel: "初回診断レポート",
    deliverables: [
      "経営課題の因果マップと意思決定カレンダー",
      "部門別リスクヒートマップと優先順位表",
    ],
    proof: "経営層の納得度 4.7 / 5",
  },
  {
    id: "evaluate",
    stageLabel: "具体策の検討段階",
    headline: "2週間で実行プランとROIシナリオを設計",
    description:
      "業界ベンチマークと自社データを突き合わせ、打ち手の優先度・担当・投資対効果を可視化。合意形成に必要な論拠を整えます。",
    buttonLabel: "設計イメージを見る",
    href: "#roi-preview",
    icon: BarChart4,
    metricValue: "2w",
    metricLabel: "投資対効果プラン",
    deliverables: [
      "AIダッシュボード試作と指標定義シート",
      "意思決定シナリオ別の収益インパクト比較",
    ],
    proof: "粗利改善シナリオの確度 +28%",
  },
  {
    id: "decide",
    stageLabel: "実行準備の段階",
    headline: "専門家と伴走し合意形成資料を完成",
    description:
      "診断士が金融機関・株主視点でレビューし、アクションプランとリスクヘッジ策をセットで提示。意思決定の納得感を高めます。",
    buttonLabel: primaryCtaLabel,
    href: "#contact",
    icon: ClipboardCheck,
    metricValue: "30d",
    metricLabel: "実行ロードマップ",
    deliverables: [
      "役員会・金融機関向け提案資料テンプレート",
      "リスク逆転オファーとKPIレビュー体制設計",
    ],
    proof: "案件継続率 92%",
  },
];

const sectionToJourneyStage: Record<string, CtaJourneyStage["id"]> = {
  hero: "learn",
  problem: "learn",
  solution: "evaluate",
  features: "evaluate",
  comparison: "evaluate",
  outcome: "evaluate",
  stories: "evaluate",
  resources: "learn",
  simulator: "evaluate",
  pricing: "evaluate",
  faq: "evaluate",
  security: "decide",
  contact: "decide",
};

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

type HeroCausalityDeliverable = {
  label: string;
  description: string;
};

type HeroCausalityVisual = {
  image: string;
  alt: string;
  headline: string;
  caption: string;
  tag: string;
};

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
  duration: string;
  deliverables: HeroCausalityDeliverable[];
  visual: HeroCausalityVisual;
};

const heroCausality: HeroCausality[] = [
  {
    title: "72時間で経営の軸を揃える",
    subtitle: "想いと現状の棚卸し",
    cause:
      "生成AIが財務・販売・顧客データを読み込み、伸ばす指標と気をつけるべき兆しを一枚に整理します。",
    logic:
      "再生支援の現場を知る診断士がヒアリングで背景を深掘りし、経営者の考え方を数字と言葉で地図化して72時間以内に共有。",
    impactMetric: "判断の軸がそろう",
    impactDetail:
      "役員と現場が同じ資料を見ながら議論でき、次の打ち手を語る舞台が整います。",
    trustLabel: "BLUEPRINT",
    trustCopy:
      "160件超の支援で磨いた質問票とチェックリストをテンプレート化。初回面談から迷わず掘り下げられます。",
    highlights: ["現状把握", "優先順位", "スピード"],
    duration: "0〜72時間",
    deliverables: [
      {
        label: "経営論点サマリー",
        description: "粗利・資金・需要のリスク信号を一枚図で共有。",
      },
      {
        label: "ヒアリングログ",
        description: "意思決定の背景を整理した議事メモと洞察。",
      },
    ],
    icon: ScanSearch,
    visual: {
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
      alt: "経営者と診断士が因果マップをモニターで確認している様子",
      headline: "判断材料の見える化",
      caption: "財務・販売・在庫の指標を重ねて共有し、初回会議で意思決定の土台を揃えます。",
      tag: "72h BLUEPRINT",
    },
  },
  {
    title: "1〜2週間で実行シナリオを描く",
    subtitle: "価値提案と数字の設計",
    cause:
      "生成AIが収益シナリオや資金の流れ、公的支援の活用余地まで複数案で下書きし、検討テーマを構造化します。",
    logic:
      "診断士と会計士が整合性と説得力を整え、説明資料・想定問答・週次ダッシュボードを完成させます。",
    impactMetric: "準備の負担が軽くなる",
    impactDetail:
      "経営計画と会議資料が早期にそろい、取引先や金融機関にも胸を張って共有できる内容になります。",
    trustLabel: "QUALITY",
    trustCopy:
      "採択実績で評価されたストーリーと数表を知見化し、御社仕様にカスタマイズ。説明の手離れが良くなります。",
    highlights: ["戦略設計", "資金管理", "ダッシュボード"],
    duration: "1〜2週間",
    deliverables: [
      {
        label: "実行ロードマップ",
        description: "打ち手・担当・KPIを整えたアクションプラン。",
      },
      {
        label: "想定問答集",
        description: "金融機関・取引先への説明要点と裏付け資料。",
      },
    ],
    icon: ClipboardCheck,
    visual: {
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
      alt: "専門家チームが戦略資料を囲んでレビューしている",
      headline: "戦略と数字を同期",
      caption: "複数シナリオの期待値を比較し、金融機関への説明も踏まえた実行計画を整備します。",
      tag: "SCENARIO DESIGN",
    },
  },
  {
    title: "3か月伴走で結果を育てる",
    subtitle: "実行サイクルと信頼管理",
    cause:
      "生成AIレポートが施策ごとの指標と資金の見通しを自動更新し、改善余地と気配を通知します。",
    logic:
      "経験豊富な専門家が定例レビューに参加し、提出書類や報告書を整備しながら行動計画を調整します。",
    impactMetric: "成果への確信が増す",
    impactDetail:
      "現場の進捗と数字の根拠を毎回共有でき、社内外からの信頼を保ったまま前進できます。",
    trustLabel: "ASSURANCE",
    trustCopy:
      "レビュー記録と根拠資料を蓄積し、第三者に示せる形で管理。伴走後も自走できる仕組みが残ります。",
    highlights: ["伴走", "透明性", "信頼"],
    duration: "導入後3か月",
    deliverables: [
      {
        label: "週次レビュー記録",
        description: "施策ごとの進捗とリスク対応を可視化。",
      },
      {
        label: "資金計画ダッシュボード",
        description: "入出金見通しと調達状況をリアルタイム更新。",
      },
    ],
    icon: TrendingUp,
    visual: {
      image:
        "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=80",
      alt: "定例ミーティングでダッシュボードを確認する経営陣",
      headline: "進捗と資金を同時管理",
      caption: "週次レビューで成果とリスクを更新し、社内外に示せる証跡を蓄積します。",
      tag: "EXECUTION REVIEW",
    },
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

const heroPainPoints = [
  {
    title: "意思決定が会議直前まで揃わない",
    detail: "部門ごとに数値と論点がばらつき、重要な判断が先送りになっている。",
  },
  {
    title: "金融機関向け資料づくりが重い",
    detail: "融資・投資家への説明資料を整えるために、経営陣が本来の判断に集中できない。",
  },
  {
    title: "補助金・投資の優先順位が決められない",
    detail: "複数のシナリオを検証する時間が足りず、打ち手の着手タイミングが遅れている。",
  },
];

const heroBenefitHighlights = [
  {
    title: "72時間で優先指標とリスクを整理",
    detail: "AIが財務・販売・外部データを束ね、経営会議の論点を一枚で共有。",
  },
  {
    title: "1〜2週間で金融機関提出レベルの計画",
    detail: "診断士と会計士がAIドラフトを磨き込み、ROIと資金計画を整合。",
  },
  {
    title: "3か月伴走で施策実行と資金調達を完走",
    detail: "週次レビューで進捗とキャッシュを追跡し、補助金・融資の採択率86%を実現。",
  },
];

type HeroSummaryCard = {
  title: string;
  description: string;
  stat: string;
  icon: LucideIcon;
};

const heroSummaryCards: HeroSummaryCard[] = [
  {
    title: "3分で成果ストーリー",
    description:
      "72時間診断→1〜2週間で計画完成→3か月伴走という全体像と、粗利・資金調達の成果を要約。",
    stat: "成果創出160件",
    icon: BookOpen,
  },
  {
    title: "KPIとROIを数値で把握",
    description:
      "意思決定リードタイム52%短縮、計画作成工数80%削減、粗利+18ptなどの主要KPIをひと目で確認。",
    stat: "ROI 3.4倍",
    icon: BarChart4,
  },
  {
    title: "導入ハードルをチェック",
    description:
      "初期費用・月額・社内稼働の目安と、実際の導入手順をスライドで整理。動画で1分概要も視聴可能。",
    stat: "準備工数-145h/月",
    icon: PlayCircle,
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

type HeroVisualInsight = {
  stage: "因" | "論" | "果";
  tone: "cause" | "logic" | "impact";
  label: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: LucideIcon;
};

const heroVisualInsights: HeroVisualInsight[] = [
  {
    stage: "因",
    tone: "cause",
    label: "128指標の外部・内部データ統合",
    description:
      "金融機関審査に使われるマクロ指標と自社PL・BSのドライバーを生成AIが一枚に統合。意思決定に効く因果関係を抽出します。",
    metric: "128",
    metricLabel: "評価指標を同時解析",
    icon: ScanSearch,
  },
  {
    stage: "論",
    tone: "logic",
    label: "3階層の意思決定ロジックツリー",
    description:
      "経営課題→打ち手→KPIをロジックツリーで接続し、役員会の論点ズレを排除。合意形成に必要な論拠を即座に共有します。",
    metric: "3階層",
    metricLabel: "論点構造を自動生成",
    icon: Workflow,
  },
  {
    stage: "果",
    tone: "impact",
    label: "利益インパクトと資金繰りの即時試算",
    description:
      "粗利率・営業CF・回収サイトを同時に可視化し、投資判断の根拠と資金繰りの余力を明確に提示。迷いを残さない意思決定を後押しします。",
    metric: "+3.6pt",
    metricLabel: "平均粗利率の押し上げ",
    icon: TrendingUp,
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

type ComparisonRow = {
  axis: string;
  ourValue: string;
  others: string;
  proof: string;
};

const competitorComparison: ComparisonRow[] = [
  {
    axis: "描く未来",
    ourValue:
      "代表が描く3年後の姿を言語化し、財務計画・人材戦略・顧客戦略をひとつの物語としてまとめ上げます。",
    others: "ヒアリング内容をテンプレートに当てはめるだけで、志と現場の施策が分断されたままになりがち。",
    proof: "中小企業診断士と財務・マーケの専門家が共同監修した業種別シナリオデータベース",
  },
  {
    axis: "提供価値",
    ourValue:
      "貴社専用に設計した計画書・稟議資料・ダッシュボードをワンセットで納品し、そのまま社内共有に活用できます。",
    others: "AIツールの下書きや一般的な報告書のみで、経営会議に出せるレベルへの仕上げは自社対応となることが多い。",
    proof: "金融機関提出実績を踏まえたレビューフローと、生成AIの監査ログで品質を可視化",
  },
  {
    axis: "伴走体制",
    ourValue:
      "診断士・会計士・金融機関出身者・データアナリストがチームで入り、週次レビューと臨時相談で意思決定を後押し。",
    others: "担当1名とチャット中心の支援で、要所の交渉や社内説明は経営者が一人で抱えやすい。",
    proof: "1社あたり3名以上のクロスファンクショナル体制を契約時に明示",
  },
  {
    axis: "決断の速さ",
    ourValue:
      "初回ヒアリングから3日以内に骨子を提示し、AIが更新するシミュレーションで経営会議の判断を前倒しできます。",
    others: "現状分析に数週間を要し、意思決定のタイミングがずれ込むケースが多い。",
    proof: "導入企業で平均リードタイムを半減させたプロセスログと意思決定記録",
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
    label: "60秒無料診断申し込み",
    description: "フォーム入力で即時受付",
    detail:
      "メールアドレスと基本情報の入力だけで受付完了。診断結果は最短即日でメール共有し、面談の候補日時も合わせてお送りします。",
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
    title: "診断と相談は完全無料",
    caption: "営業電話なし・60秒入力で優先課題の仮説を共有",
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
    title: "常時更新ダッシュボードで判断を揃える",
    challenge: "会議直前に数字を集め直す状態では、経営陣の目線がばらつきがち。",
    mechanism:
      "University of Cincinnati Online (2024) の調査でも、AIが最新データを統合すると意思決定が整うと確認されています。業界指標と資金繰りを自動で照合し、毎週のダッシュボードを整えます。",
    impactLabel: "判断に要する時間",
    impactValue: "-52%",
    impactContext: "導入20社の会議記録 (2024)",
    executiveTakeaway: "いつ聞かれても根拠を差し出せる状態を保ち、取引先や社内の前で落ち着いて語れます。",
    icon: BarChart4,
    accent: "navy",
    evidence: "University of Cincinnati Online (2024) 調査",
    visual: aiValueRealtimeVisual,
    visualAlt: "常時更新ダッシュボードの概念図",
  },
  {
    title: "候補案を一画面で比較",
    challenge: "複数案を検討するたび資料づくりが長引き、判断が遅れていた。",
    mechanism:
      "JAGGAER (2024) の報告では、生成AIが膨大な情報を短時間で整理できると示されています。財務と需給のデータから複数案と説明案をまとめ、会議前に論点を共有します。",
    impactLabel: "検討できる打ち手",
    impactValue: "4倍",
    impactContext: "AIドラフト比較記録 (2024年2Q)",
    executiveTakeaway: "毎週の役員会で『どちらを選ぶか』に集中でき、堂々とした説明がしやすくなります。",
    icon: Sparkles,
    accent: "mint",
    evidence: "JAGGAER (2024) レポート",
    visual: aiValueScenarioVisual,
    visualAlt: "複数シナリオを比較するフロー図",
  },
  {
    title: "偏りを抑えた警戒アラート",
    challenge: "経験頼みだけでは、市況の変化や資金繰り悪化の兆しを逃しやすい。",
    mechanism:
      "University of Cincinnati Online の調査は、生成AIが客観的な提案でリスク管理を強化すると報告。信用指標と需給指数を常に見張り、閾値を越えたら対策案とあわせて通知します。",
    impactLabel: "警戒までの猶予",
    impactValue: "10日前に把握",
    impactContext: "資金繰りアラート運用記録 (2024)",
    executiveTakeaway: "取引先や金融機関への説明を早めに用意でき、落ち着いた交渉に持ち込めます。",
    icon: ShieldCheck,
    accent: "sky",
    evidence: "University of Cincinnati Online (2024) 調査",
    visual: aiValueRiskVisual,
    visualAlt: "リスク指標を早期検知する図",
  },
  {
    title: "経営トップの集中時間を取り戻す",
    challenge: "判断後の説明づくりに追われ、重要な決断に集中できなかった。",
    mechanism:
      "Rossum (2024) はAIが共同操縦士の役割を果たし、判断に必要な整理を支えると指摘。決裁資料の比較と論点をAIがまとめ、専門家が仕上げることで会議準備の負担を軽減します。",
    impactLabel: "経営者の集中時間",
    impactValue: "+45時間/月",
    impactContext: "経営者ヒアリング (n=12)",
    executiveTakeaway: "資料づくりを任せることで、次の一手を考える時間とゆとりが生まれます。",
    icon: Users2,
    accent: "citrus",
    evidence: "Rossum (2024) リサーチ",
    visual: aiValueAugmentationVisual,
    visualAlt: "AIと専門家が経営者を支えるイラスト",
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
    value: "主要指標を毎日更新",
    description: "国内外の指標やニュースを自動収集し、経営に影響する変化を素早く整理。",
    evidence: "日次モニタリングレポート",
    accent: "mint",
  },
  {
    label: "レビュー品質",
    value: "専門家が最短3日対応",
    description: "金融・会計・戦略の観点で確認し、金融機関からの質問にも備えられる状態に仕上げます。",
    evidence: "専門家レビュー記録",
    accent: "sky",
  },
  {
    label: "意思決定速度",
    value: "決裁の迷いを事前に解消",
    description: "AIドラフトと合意形成テンプレートで論点をそろえ、会議の集中度を高めます。",
    evidence: "伴走プロジェクトレポート",
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
    stage: "初動診断（最短3日）",
    title: "最短3日で経営課題を洗い出す",
    description:
      "AIが財務・販売・顧客データを統合し、利益を左右する要因とリスクを整理。診断士がヒアリングで確認し、優先順位を固めます。",
    metric: "最短3日",
    metricLabel: "集中ヒアリング",
    accent: "mint",
  },
  {
    id: "shape",
    stage: "戦略設計（約2週間）",
    title: "2週間ほどで戦略と数値を揃える",
    description:
      "生成AIが複数シナリオを下書きし、診断士と会計士が金融機関目線で整合性を調整。KPIと投資配分を明確にします。",
    metric: "約2週間",
    metricLabel: "ドラフト完成",
    accent: "sky",
  },
  {
    id: "decide",
    stage: "伴走実行（約3か月）",
    title: "3か月伴走で実行と資金確保を並走",
    description:
      "ダッシュボードで成果を追いながら、専門家がレビュー会議・申請資料づくり・金融交渉を支援。意思決定から実行までを滑らかにします。",
    metric: "約3か月",
    metricLabel: "伴走支援",
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
    title: "90日の全社リズムを整える",
    description:
      "経営陣と主要メンバーが集まり、戦略・資金・現場の行動計画を同じ資料で確認。生成AIが直前まで数字を更新し、中小企業診断士が判断の骨子を整えます。",
    sourceLabel: "創和経営コンサルティング 実務ガイド",
    stat: "90日",
    statLabel: "見直しサイクル",
    focus: "戦略更新",
    icon: Compass,
    highlights: [
      "経営計画と資金繰りダッシュボードを共通指標で統合",
      "AIが候補施策と想定リスクを下書き、議論の時間を確保",
      "役員向けの判断メモと議事案を48時間以内に共有",
    ],
  },
  {
    title: "市場の変化を先読みする",
    description:
      "金融・需要・仕入れのデータを自動で集約。変化が想定範囲を超えた時は経営者と現場にすぐ知らせます。",
    sourceLabel: "創和AIラボ 推計",
    stat: "常時監視",
    statLabel: "外部指標",
    focus: "環境モニタリング",
    icon: Workflow,
    highlights: [
      "国内外120指標を常に監視しシナリオを再評価",
      "仕入れ・与信・投資判断の基準を随時アップデート",
      "リスク通知をSlack・Teams・メールで即時配信",
    ],
  },
  {
    title: "専門家伴走で実行を継続",
    description:
      "元メガバンク法人担当と財務・管理会計の専門家が、AIの提案に資金と組織の視点を重ねます。胸を張って提示できる資料づくりまで寄り添います。",
    sourceLabel: "伴走支援チーム",
    stat: "72時間",
    statLabel: "レビュー標準",
    focus: "実行サポート",
    icon: ShieldCheck,
    highlights: [
      "資金調達・投資ドキュメントを専任チームが監修",
      "月次・四半期レビューの実行会議に同席",
      "守秘契約・BCP・監査証憑の整備までワンストップ",
    ],
  },
];

const quarterlySummaryPoints = [
  "売上・資金・現場KPIを一つの画面で共有し、議論の軸をそろえる",
  "生成AIの下書きを診断士が整え、会議で即決できる資料を準備",
  "進捗差を因果関係で整理し、次の90日に集中する行動へ落とし込む",
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
    title: "経営データの一元化",
    description: "外部指数と自社の数字を一つの基盤に集約。",
    highlights: [
      "会計・販売・在庫などを自動連携し、更新漏れを知らせます。",
      "経営判断に必要な指標だけをダッシュボードへ整理します。",
    ],
    benefit: "胸を張って示せる判断材料を確保",
    badge: "統合基盤",
    statValue: "常時更新",
    statLabel: "経営指標の鮮度",
    icon: Database,
    accent: "navy",
  },
  {
    title: "意思決定シナリオの即時比較",
    description: "主要な前提を入力するだけで複数の打ち手を提示。",
    highlights: [
      "販売・人員・投資の変化を読み込み、AIがケースを整えます。",
      "差分指標を並べて会議準備時間を圧縮します。",
    ],
    benefit: "迷わず選べる打ち手を常に提示",
    badge: "戦略シミュレーション",
    statValue: "即時提案",
    statLabel: "比較シナリオ",
    icon: Layers3,
    accent: "mint",
  },
  {
    title: "資金計画ドラフト",
    description: "貸借対照表・損益計算書・資金繰りを連動させた案を自動作成。",
    highlights: [
      "資金繰りや投資計画を読み込み、数字の整合性を保ちます。",
      "金融機関にそのまま出せる形式で共有できます。",
    ],
    benefit: "金融機関にも堂々と差し出せる内容に",
    badge: "資金設計",
    statValue: "提出水準",
    statLabel: "金融機関資料",
    icon: BarChart3,
    accent: "citrus",
  },
  {
    title: "専門家の点検と安心設計",
    description: "診断士と会計専門家がAIの提案を確認。",
    highlights: [
      "倫理リスクと審査視点をチェックリスト化します。",
      "根拠データと想定問答を整え、説明に落ち着きを持たせます。",
    ],
    benefit: "社内外に説明しやすい安心感を付与",
    badge: "品質監査",
    statValue: "二重確認",
    statLabel: "審査視点チェック",
    icon: ShieldCheck,
    accent: "sky",
  },
  {
    title: "投資判断の見える化",
    description: "投資額と効果を一画面で整理。",
    highlights: [
      "プロジェクト費用と成果指標をリアルタイムで試算します。",
      "次の一手を役員会向けに簡潔にまとめて共有します。",
    ],
    benefit: "投資の筋道を自信を持って語れる",
    badge: "投資判断",
    statValue: "一目で把握",
    statLabel: "投資と効果の関係",
    icon: TrendingUp,
    accent: "rose",
  },
];


type SuccessMetric = {
  label: string;
  before: string;
  after: string;
  impact: string;
  beforeValue?: number;
  afterValue?: number;
  unit?: string;
};

type SuccessStory = {
  company: string;
  industry: string;
  name: string;
  title: string;
  projectScale: string;
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
    projectScale: "年商約8億円 / 160名体制",
    quote:
      "決算ごとの説明が守りの話に偏り、社内の視線も気になっていました。数字と根拠を同じ画面で語れるようになり、取引先にも胸を張って次の投資を語れるようになりました。",
    summary:
      "主要製品の原価高騰で利益が圧迫され、設備更新を決められない状態が続いていました。AIが製品別の採算と将来キャッシュを一目で示し、診断士がカスタムダッシュボードと実行ロードマップを整備。経営層が共有したい姿と打ち手を素早く示せる状態になりました。",
    challenge: "原価上昇で粗利が低下し、設備投資の判断根拠が不足していた。金融機関への説明資料づくりも属人化していた。",
    aiRole:
      "財務と生産ラインのデータを結び、製品別の利益インパクトと優先順位をレポート化。",
    expertRole:
      "製造業を熟知した診断士が経営管理アプリを自社仕様に設計し、会議用シナリオと提出資料を共通フォーマットで用意。",
    governance:
      "月次レビューでダッシュボードを見ながら意思決定を記録し、想定問答と改善メモを更新。",
    metrics: [
      {
        label: "会議準備時間",
        before: "週10時間",
        after: "週3時間",
        impact: "週7時間短縮",
        beforeValue: 10,
        afterValue: 3,
        unit: "時間/週",
      },
      {
        label: "粗利率",
        before: "24%",
        after: "約28%",
        impact: "収益性が回復",
        beforeValue: 24,
        afterValue: 28,
        unit: "%",
      },
      {
        label: "社内承認の差し戻し",
        before: "月3件",
        after: "月1件未満",
        impact: "判断がスムーズ",
        beforeValue: 3,
        afterValue: 0.8,
        unit: "件",
      },
    ],
    photo: customerTakashima,
    logo: logoOisix,
  },
  {
    company: "藤崎商事株式会社",
    industry: "小売・EC",
    name: "高嶋 明日香",
    title: "代表取締役社長",
    projectScale: "年商約12億円 / 12拠点",
    quote:
      "数字が部門ごとに散らばり、現場の判断が感覚頼みになっていました。今は同じ画面で優先施策を確認でき、幹部会議で前向きな議論が増えました。",
    summary:
      "多拠点展開に伴い在庫ロスと販促費がふくらみ、現場が迷う時間が増えていました。AIが在庫回転・広告・顧客の動きを同じ基準で整理し、診断士が会議用ダッシュボードと実行ボードを設計。誰が見ても次に打つ手が伝わる運営体制へ切り替えられました。",
    challenge: "在庫と広告の数値が連携せず、粗利とキャッシュの見通しが揺らいでいた。各店長の判断が統一されていなかった。",
    aiRole:
      "販売・在庫・広告データを日々取り込み、利益につながる商品と販促タイミングを優先度順に提示。",
    expertRole:
      "流通業を支援してきた診断士が経営管理アプリを店舗別にカスタマイズし、数字に基づく会議運営を仕組み化。",
    governance:
      "週次会議でダッシュボードを投影し、各施策の進捗と現金残高をワンクリックで共有。",
    metrics: [
      {
        label: "意思決定までの時間",
        before: "平均90分",
        after: "平均45分",
        impact: "半分に短縮",
        beforeValue: 90,
        afterValue: 45,
        unit: "分",
      },
      {
        label: "在庫回転",
        before: "月1.6回",
        after: "月2.1回",
        impact: "回転が向上",
        beforeValue: 1.6,
        afterValue: 2.1,
        unit: "回",
      },
      {
        label: "販促投資の再配分",
        before: "感覚配分",
        after: "数値基準",
        impact: "説明が容易",
        beforeValue: 1,
        afterValue: 2,
        unit: "指標",
      },
    ],
    photo: customerInoue,
    logo: logoSansan,
  },
  {
    company: "北斗設備工業株式会社",
    industry: "建設・サービス",
    name: "杉本 拓也",
    title: "代表取締役",
    projectScale: "年商約10億円 / 24案件運営",
    quote:
      "現場の数字が見えず、会議では不安を隠せませんでした。今は先を読む指標が揃い、社員の前で前進する計画を語れるようになりました。",
    summary:
      "公共工事と民間案件が重なり、入金と支払いの山谷が掴めず意思決定が遅れていました。AIが案件ごとのキャッシュ見通しを瞬時に描き、診断士が工程管理アプリと経営計画を連動。先を読む指標を持ったうえで、現場と本社が同じ時間軸で動ける体制を築きました。",
    challenge: "工事ごとの原価と入金予定が分断され、資金繰りリスクを会議で共有できていなかった。",
    aiRole:
      "案件別の入出金と工数をリアルタイムに更新し、資金ギャップを早期に知らせる仕組みを提供。",
    expertRole:
      "建設業を多数支援してきた診断士が管理アプリを現場用にカスタマイズし、金融機関連携資料まで同じストーリーで整備。",
    governance:
      "隔週会議でキャッシュと工程の両方を確認し、決定事項とフォローアップをダッシュボードで共有。",
    metrics: [
      {
        label: "キャッシュ見通しの更新頻度",
        before: "月1回",
        after: "週1回",
        impact: "更新が4倍",
        beforeValue: 1,
        afterValue: 4,
        unit: "回",
      },
      {
        label: "面談準備時間",
        before: "週15時間",
        after: "週6時間",
        impact: "週9時間短縮",
        beforeValue: 15,
        afterValue: 6,
        unit: "時間/週",
      },
      {
        label: "会議資料の差し戻し",
        before: "月5件",
        after: "月2件",
        impact: "迷いを抑制",
        beforeValue: 5,
        afterValue: 2,
        unit: "件",
      },
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
    category: "製造×判断基盤",
    proof: "製品別採算と将来キャッシュを一画面で整理",
    result: "投資判断の迷いを解消",
    comment: "会議で示す数字とストーリーが揃い、取引先への説明も堂々と実施。",
    detail: "会議準備週7時間短縮 / 承認差し戻し減",
  },
  {
    logo: logoSansan,
    alt: "藤崎商事株式会社のロゴ",
    category: "小売×現場DX",
    proof: "在庫・広告・顧客の動きを共通ダッシュボード化",
    result: "会議が数字起点に",
    comment: "幹部と店舗が同じ優先度で動き、議論が前向きに。",
    detail: "意思決定時間半減 / 在庫回転向上",
  },
  {
    logo: logoRaksul,
    alt: "北斗設備工業株式会社のロゴ",
    category: "建設×先読み経営",
    proof: "案件ごとのキャッシュと工程を一体管理",
    result: "先を読む会議が定着",
    comment: "現場と本社が同じ時間軸で確認し、交渉準備も余裕を持って整備。",
    detail: "見通し更新4倍 / 会議差し戻し減",
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
    title: "AI草案付き経営計画サンプル集",
    description:
      "診断士が磨き直したAI草案を収録。判断材料の並べ方や語り口まで確認でき、落ち着いて打ち出せる計画の構成が分かります。",
    highlights: [
      "優先指標と行動案の抜粋",
      "経営者向けコメントと確認メモ",
      "専門家の追記と根拠整理の手順",
    ],
    cta: "AI草案サンプル（PDF）を受け取る",
    icon: FileText,
    note: "フォーム送信直後にメールで自動送付します。",
  },
  {
    title: "90日レビュー整理シート",
    description:
      "外部環境・資金・人材の3視点で進捗を点検し、次の一手をそろえるための確認項目をまとめています。",
    highlights: [
      "最新情報の収集ポイント",
      "資金繰りの感度チェック表",
      "会議進行と共有メモのひな型",
    ],
    cta: "整理シート一式をダウンロード",
    icon: ClipboardCheck,
    note: "登録いただいたメールへ即時にPDFリンクを送信します。",
  },
  {
    title: "生成AI活用レポート（季刊）",
    description:
      "AIと専門家の連携で信頼を得た事例をまとめ、投資対効果の考え方と備えるべきリスク対策を整理しました。",
    highlights: [
      "導入前後の指標推移と読み解き方",
      "社内定着の実践ポイント",
      "体制づくりと安全性チェック",
    ],
    cta: "レポート（PDF）を入手する",
    icon: BarChart4,
    note: "毎号の最新情報をメールでお届けします。",
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
    title: "生成AIで描く3か月経営計画セミナー",
    datetime: "2024年6月12日（水）12:00-13:00",
    format: "オンライン配信／参加無料",
    description:
      "AIが示した分析をどのように整理し、落ち着いて説明できる計画に仕上げるかを60分で紹介します。相談タイムも確保しています。",
    cta: "セミナーに申し込む",
    link: "#contact",
    icon: PlayCircle,
  },
  {
    title: "年商5億〜15億円企業の実務者交流会",
    datetime: "2024年7月4日（木）16:00-17:30",
    format: "現地開催（東京）＋オンライン／定員15社",
    description:
      "同規模の経営者・経営企画責任者が集まり、AIと専門家の併用で信頼を得た進め方を共有。事前質問に基づく助言も行います。",
    cta: "参加希望を連絡する",
    link: "#contact",
    icon: Users2,
  },
];

const newsletterHighlights = [
  "月1回、生成AIで成果を出した中小企業の実例を解説",
  "信頼を得た伝え方や合意形成の工夫を紹介",
  "社内共有に使えるテンプレートと確認リストを同封",
];

const faqItems = [
  {
    question: "ITに詳しくなくても導入できますか？",
    answer:
      "初期設定と社内説明は当社の診断士チームが直接担当します。普段お使いの会議資料や紙帳票をそのまま共有いただければ、AIが扱える形に整え、経営者さまには意思決定に集中いただけるよう段取りを整えます。",
  },
  {
    question: "手元のデータがバラバラですが大丈夫でしょうか？",
    answer:
      "会計・販売・現場記録など複数システムを棚卸しし、企業ごとに整備台帳を作成します。情報の取り扱い手順まで文書化するため、安心してチームに共有しながら一貫した判断材料をそろえられます。",
  },
  {
    question: "忙しくても運用できますか？",
    answer:
      "初回の方向合わせはオンライン30分、その後は週1回の短時間レビューで進行します。資料のドラフトや会議の要点整理はAIと診断士が担うので、経営者さまは要所の判断だけを押さえれば大丈夫です。",
  },
  {
    question: "社員の理解をどう広げれば良いでしょうか？",
    answer:
      "部署別の研修と操作レクチャーを用意し、日常業務に沿ったマニュアルを共有します。成果の見せ方もセットで設計するため、社内から頼られるリーダー像を保ったまま、新しい仕組みを浸透させられます。",
  },
  {
    question: "将来の変化に備える仕組みまで整いますか？",
    answer:
      "外部環境の指標と社内データを常時モニタリングし、変化の兆しをダッシュボードで通知します。五か年の視点でシナリオを用意するので、いざという時もブレない舵取りができる状態を保てます。",
  },
];

const faqVisual = new URL("/images/faq-strategy.svg", import.meta.url).href;

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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isFloatingHidden, setIsFloatingHidden] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [isRoiModalOpen, setRoiModalOpen] = useState(false);
  const [isPricingModalOpen, setPricingModalOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isQuickSubmitting, setIsQuickSubmitting] = useState(false);
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [quickError, setQuickError] = useState<string | null>(null);
  const [isHeroSummaryExpanded, setHeroSummaryExpanded] = useState(false);
  const [isHeroProblemExpanded, setHeroProblemExpanded] = useState(false);

  const evaluateStage = ctaJourneyStages.find((stage) => stage.id === "evaluate");
  const decideStage = ctaJourneyStages.find((stage) => stage.id === "decide");
  const activeJourneyStage =
    sectionToJourneyStage[activeSection] ?? ctaJourneyStages[0].id;

  const renderStageCta = (
    stageId: CtaJourneyStage["id"],
    options?: {
      secondary?: { label: string; href: string };
      secondaryButton?: { label: string; onClick: () => void };
    }
  ) => {
    const stage = ctaJourneyStages.find((item) => item.id === stageId);
    if (!stage) return null;
    return (
      <div className="section-cta" data-animate>
        <div className="section-cta__meta">
          <span className="section-cta__stage">{stage.stageLabel}</span>
          <p>{stage.description}</p>
        </div>
        <div className="section-cta__actions">
          <a className="btn btn-cta" href={stage.href}>
            {stage.buttonLabel}
          </a>
          {options?.secondary && (
            <a className="section-cta__link" href={options.secondary.href}>
              {options.secondary.label}
            </a>
          )}
          {options?.secondaryButton && (
            <button
              type="button"
              className="link-button"
              onClick={options.secondaryButton.onClick}
            >
              {options.secondaryButton.label}
            </button>
          )}
        </div>
      </div>
    );
  };

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
    setFormError(null);
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

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    const trimmedEmail = contactForm.email.trim();
    const trimmedName = contactForm.name.trim();
    const trimmedCompany = contactForm.company.trim();
    const trimmedMessage = contactForm.message.trim();
    const trimmedPhone = contactForm.phone.trim();
    const trimmedPreferredDate = contactForm.preferredDate.trim();

    if (!trimmedEmail) {
      setFormError("メールアドレスを入力してください。");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError("メールアドレスの形式をご確認ください。");
      return;
    }
    if (!trimmedName) {
      setFormError("氏名を入力してください。");
      return;
    }
    if (!trimmedCompany) {
      setFormError("会社名を入力してください。");
      return;
    }
    if (!trimmedMessage) {
      setFormError("相談内容を入力してください。");
      return;
    }
    if (trimmedPhone && !/^[0-9+\-()\s]+$/.test(trimmedPhone)) {
      setFormError("電話番号の形式をご確認ください。");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    setFormSubmitted(false);
    setSubmissionError(null);

    try {
      await submitContactForm({
        name: trimmedName,
        company: trimmedCompany,
        email: trimmedEmail,
        phone: trimmedPhone ? trimmedPhone : undefined,
        message: trimmedMessage,
        preferredDate: trimmedPreferredDate ? trimmedPreferredDate : undefined,
      });
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
            {decideStage && (
              <span className="header-actions__stage">{decideStage.stageLabel}</span>
            )}
            <a className="btn btn-cta" href="#contact">
              {decideStage?.buttonLabel ?? primaryCtaLabel}
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
                意思決定の迷いを72時間でゼロに。
                <span>生成AI×診断士が利益計画を描き切る</span>
              </h1>
              <p className="hero-lead">
                資金繰りや投資判断の迷いを、AI分析と専門家レビューで72時間以内に整理し、経営会議までに数字と論点をそろえます。
              </p>
              <ul className="hero-snapshot" aria-label="提供価値のスナップ要約">
                {heroSnapshotHighlights.map((item) => (
                  <li key={item.label}>
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
              <div
                id="summary"
                className={`hero-quick-summary${
                  isHeroSummaryExpanded ? " is-expanded" : ""
                }`}
                data-animate
                ref={(node) => {
                  sectionRefs.current.summary = node ?? null;
                }}
              >
                <div className="hero-quick-summary__header">
                  <div>
                    <span className="hero-quick-summary__eyebrow">3分で要点を整理</span>
                    <h2>AI診断の全体像と成果を冒頭で把握</h2>
                    <p className="hero-quick-summary__description">
                      まずは要点のみを提示。必要に応じて詳細カードを開き、導入成果やKPIの内訳を確認いただけます。
                    </p>
                  </div>
                  <div className="hero-quick-summary__actions">
                    <button
                      type="button"
                      className="hero-toggle"
                      aria-expanded={isHeroSummaryExpanded}
                      onClick={() => setHeroSummaryExpanded((prev) => !prev)}
                    >
                      <ArrowDownRight aria-hidden />
                      <span>{isHeroSummaryExpanded ? "サマリーを閉じる" : "詳細サマリーを表示"}</span>
                    </button>
                    <button
                      type="button"
                      className="hero-quick-summary__video"
                      onClick={() => {
                        setIsDemoOpen(true);
                        setIsDemoPlaying(true);
                      }}
                    >
                      <PlayCircle aria-hidden />
                      <span>1分動画で概要を見る</span>
                    </button>
                  </div>
                </div>
                {isHeroSummaryExpanded && (
                  <div
                    className="hero-quick-summary__grid"
                    role="region"
                    aria-label="導入成果の詳細サマリー"
                  >
                    {heroSummaryCards.map((card) => {
                      const SummaryIcon = card.icon;
                      return (
                        <article key={card.title} className="hero-quick-summary__card">
                          <div className="hero-quick-summary__icon" aria-hidden="true">
                            <SummaryIcon />
                          </div>
                          <h3>{card.title}</h3>
                          <p>{card.description}</p>
                          <span className="hero-quick-summary__stat">{card.stat}</span>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="hero-triad" data-animate>
                <section
                  className="hero-triad__column hero-triad__column--problem"
                  aria-labelledby="hero-problem-heading"
                >
                  <span className="hero-triad__eyebrow">Problem</span>
                  <h3 id="hero-problem-heading">意思決定を鈍らせる3つの壁</h3>
                  <p className="hero-triad__summary">
                    経営会議直前の準備や金融機関対応で、判断が後ろ倒しになる声が多く寄せられています。
                  </p>
                  <button
                    type="button"
                    className="hero-toggle hero-toggle--inline"
                    aria-expanded={isHeroProblemExpanded}
                    onClick={() => setHeroProblemExpanded((prev) => !prev)}
                  >
                    <ArrowDownRight aria-hidden />
                    <span>{isHeroProblemExpanded ? "課題を閉じる" : "課題詳細を見る"}</span>
                  </button>
                  {isHeroProblemExpanded && (
                    <ul className="hero-triad__list" aria-label="意思決定を妨げる課題の詳細">
                      {heroPainPoints.map((item) => (
                        <li key={item.title}>
                          <strong>{item.title}</strong>
                          <span>{item.detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
                <section
                  className="hero-triad__column hero-triad__column--benefit"
                  aria-labelledby="hero-benefit-heading"
                >
                  <span className="hero-triad__eyebrow hero-triad__eyebrow--benefit">Benefit</span>
                  <h3 id="hero-benefit-heading">選ばれるスピードと確度</h3>
                  <ul className="hero-triad__list">
                    {heroBenefitHighlights.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}</strong>
                        <span>{item.detail}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="hero-triad__note">
                    72時間診断→計画ドラフト→3か月伴走の流れで、会議前に論点と数字を揃え意思決定を前倒しします。
                  </p>
                </section>
                <section
                  className="hero-triad__column hero-triad__column--proof"
                  aria-labelledby="hero-proof-heading"
                >
                  <span className="hero-triad__eyebrow hero-triad__eyebrow--proof">Proof</span>
                  <h3 id="hero-proof-heading">導入企業の成果</h3>
                  <div className="hero-triad__metrics" aria-label="導入企業の主要成果">
                    {heroResults.map((result) => (
                      <article key={result.label} className="hero-triad__metric">
                        <strong>{result.value}</strong>
                        <span>{result.label}</span>
                        <p>{result.description}</p>
                        <small>{result.source}</small>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
              <div className="hero-trust-signals" data-animate aria-label="第三者証明と継続実績">
                {heroTrustSignals.map((signal) => (
                  <article key={signal.label}>
                    <h4>{signal.label}</h4>
                    <p>{signal.description}</p>
                  </article>
                ))}
              </div>
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
              <div className="hero-visual__cluster" data-animate data-initial-visible="true">
                <figure className="hero-dashboard-shot">
                  <img
                    src={heroDecisionVisual}
                    alt="AIダッシュボードで経営指標を確認しながら専門家と経営陣が次の一手を議論している様子"
                    loading="lazy"
                  />
                  <div className="hero-dashboard-shot__meta" aria-label="ダッシュボードの主要指標スナップショット">
                    <div>
                      <strong>フォーカスKPI</strong>
                      <span>営業利益率 8.4% → 12.0%</span>
                    </div>
                    <div>
                      <strong>意思決定リードタイム</strong>
                      <span>6週 → 2週</span>
                    </div>
                    <div>
                      <strong>資金繰り余力</strong>
                      <span>運転資金 +3.2か月</span>
                    </div>
                  </div>
                  <figcaption>
                    生成AIが統合した指標群を俯瞰し、専門家が因果とリスクの筋道を整理しながら、社長と次の投資ストーリーを設計しているシーンです。
                  </figcaption>
                </figure>
                <div
                  className="hero-visual__insight-board"
                  role="list"
                  aria-label="生成AI診断で提示する因・論・果のロジック"
                >
                  {heroVisualInsights.map((insight, index) => {
                    const InsightIcon = insight.icon;
                    return (
                      <article
                        key={insight.label}
                        className={`hero-insight hero-insight--${insight.tone}`}
                        role="listitem"
                        data-index={index}
                      >
                        <div className="hero-insight__header">
                          <span className="hero-insight__stage">{insight.stage}</span>
                          <p className="hero-insight__label">{insight.label}</p>
                          <span className="hero-insight__icon" aria-hidden="true">
                            <InsightIcon />
                          </span>
                        </div>
                        <p className="hero-insight__description">{insight.description}</p>
                        <div className="hero-insight__metric">
                          <strong>{insight.metric}</strong>
                          <span>{insight.metricLabel}</span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
              <div className="hero-quick-form" data-animate>
                <div className="hero-quick-form__intro">
                  <h2>60秒で申し込む無料AI診断</h2>
                  <p>
                    メールと基本情報の入力だけで受付が完了。最短72時間以内にAI診断レポートと改善骨子をお届けし、専門家がオンラインで初回ヒアリングを行います。
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
                  aria-label="無料AI診断申し込みフォーム"
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

        {/* ヒーロー下部: プロセス因果カード */}
        <section
          className="section hero-causality-section"
          aria-labelledby="hero-journey-heading"
        >
          <div className="container">
            <div className="hero-causality-intro" data-animate>
              <div className="hero-causality-intro__content">
                <span className="hero-causality-intro__eyebrow">PROCESS</span>
                <h2 id="hero-journey-heading">72時間→1〜2週間→3か月で意思決定を固める流れ</h2>
                <p>
                  初回ヒアリングで経営者の譲れない方向性と現状の数字を言語化。72時間で経営の論点を一枚に整理し、1〜2週間で計画書と会議資料を完成。3か月の伴走で実行と報告を滞りなく進める、納得感の高い支援サイクルです。
                </p>
                <div className="hero-causality-intro__metrics" aria-label="初動で得られる成果指標">
                  {heroProcessHighlights.map((highlight) => (
                    <div className="hero-causality-intro__metric" key={highlight.label}>
                      <span className="hero-causality-intro__metric-value">{highlight.value}</span>
                      <div className="hero-causality-intro__metric-body">
                        <span className="hero-causality-intro__metric-label">{highlight.label}</span>
                        <p>{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="hero-causality-intro__principles">
                  {heroProcessPrinciples.map((principle) => {
                    const PrincipleIcon = principle.icon;
                    return (
                      <li key={principle.label}>
                        <div className="hero-causality-intro__principles-icon" aria-hidden="true">
                          <PrincipleIcon />
                        </div>
                        <div className="hero-causality-intro__principles-copy">
                          <span className="hero-causality-intro__principles-label">{principle.label}</span>
                          <p>{principle.description}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <figure
                className="hero-causality-intro__visual"
                aria-label="72時間診断から3か月伴走までのプロセス図"
              >
                <div className="hero-causality-intro__visual-graphic">
                  <img
                    src={decisionRoadmapVisual}
                    alt="課題整理から実行伴走までのロードマップが描かれたビジュアル"
                    loading="lazy"
                  />
                  <div className="hero-causality-intro__visual-badge">
                    <ArrowUpRight aria-hidden="true" />
                    <div>
                      <span>納得度を数値で追跡</span>
                      <strong>意思決定満足度 4.6 / 5</strong>
                    </div>
                  </div>
                </div>
                <header className="hero-causality-intro__visual-header">
                  <span className="hero-causality-intro__visual-eyebrow">DECISION ROADMAP</span>
                  <p>
                    72時間で論点と数字を整え、1〜2週間で提出レベルの計画に昇華。3か月の伴走で成果とリスクを継続的にレビューします。
                  </p>
                </header>
                <ol className="hero-causality-intro__timeline">
                  {heroProcessMilestones.map((milestone, index) => (
                    <li
                      key={milestone.phase}
                      className="hero-causality-intro__timeline-step"
                      data-step={`0${index + 1}`}
                    >
                      <div className="hero-causality-intro__timeline-meta">
                        <span className="hero-causality-intro__timeline-phase">{milestone.phase}</span>
                        <span className="hero-causality-intro__timeline-outcome">{milestone.outcome}</span>
                      </div>
                      <h3>{milestone.title}</h3>
                      <p>{milestone.detail}</p>
                      <div className="hero-causality-intro__timeline-stats">
                        <div className="hero-causality-intro__timeline-metric">
                          <span className="hero-causality-intro__timeline-value">{milestone.metricValue}</span>
                          <span className="hero-causality-intro__timeline-label">{milestone.metricLabel}</span>
                        </div>
                        <span className="hero-causality-intro__timeline-support">{milestone.support}</span>
                      </div>
                    </li>
                  ))}
                </ol>
                <footer className="hero-causality-intro__visual-footer">
                  <div className="hero-causality-intro__visual-proof">
                    <span>支援体制</span>
                    <p>
                      認定支援機関×公認会計士×データアナリストが品質を多層チェックし、資料・KPI・説明ストーリーの一貫性を担保し
                      ます。
                    </p>
                  </div>
                  <ul className="hero-causality-intro__visual-trust">
                    <li>
                      <img src={logoOisix} alt="Oisix 導入企業" loading="lazy" />
                    </li>
                    <li>
                      <img src={logoSansan} alt="Sansan 掲載実績" loading="lazy" />
                    </li>
                    <li>
                      <img src={logoRaksul} alt="Raksul 提携企業" loading="lazy" />
                    </li>
                  </ul>
                </footer>
                <figcaption>
                  因果関係・数字・伴走体制を一枚で可視化することで、経営者と社内外ステークホルダーの認識を揃えます。
                </figcaption>
              </figure>
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
                        <div className="hero-causality__meta">
                          <span className="hero-causality__step">STEP {index + 1}</span>
                          <span className="hero-causality__duration">{item.duration}</span>
                        </div>
                        <h3>{item.title}</h3>
                        <p className="hero-causality__subtitle">{item.subtitle}</p>
                      </div>
                    </header>
                    <div className="hero-causality__summary">
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
                        <div className="hero-causality__flow-item hero-causality__flow-item--impact" role="listitem">
                          <span className="hero-causality__pill hero-causality__pill--impact">果</span>
                          <div>
                            <span className="hero-causality__impact">{item.impactMetric}</span>
                            <p>{item.impactDetail}</p>
                          </div>
                        </div>
                      </div>
                      <figure className="hero-causality__visual">
                        <span className="hero-causality__visual-tag">{item.visual.tag}</span>
                        <img src={item.visual.image} alt={item.visual.alt} loading="lazy" />
                        <figcaption>
                          <strong>{item.visual.headline}</strong>
                          <p>{item.visual.caption}</p>
                        </figcaption>
                      </figure>
                    </div>
                    <div className="hero-causality__deliverables" aria-label="主要アウトプット">
                      {item.deliverables.map((deliverable) => (
                        <div key={deliverable.label} className="hero-causality__deliverable">
                          <CheckCircle2 aria-hidden="true" />
                          <div>
                            <strong>{deliverable.label}</strong>
                            <p>{deliverable.description}</p>
                          </div>
                        </div>
                      ))}
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
          </div>
        </section>

        <section className="journey-cta" aria-label="検討フェーズ別の導線">
          <div className="container journey-cta__inner">
            <div className="journey-cta__lead">
              <div className="journey-cta__intro" data-animate>
                <span className="journey-cta__eyebrow">導入ステップ</span>
                <h2>経営判断の進み具合に合わせた3つの行動支援</h2>
                <p>
                  「課題の因果→改善シナリオ→合意形成」の順で支援内容を分解しました。各ステップで得られる成果物と時間軸を明示することで、意思決定プロセスの論理が一目でわかります。
                </p>
              </div>
              <figure className="journey-cta__visual" data-animate>
                <img
                  src={journeyFlowVisual}
                  alt="課題整理から実行準備までの3ステップが流れ図で示されている"
                  loading="lazy"
                />
                <figcaption>
                  因果整理→打ち手設計→実行準備の流れを一枚で視覚化。視線誘導の矢印が次のカードに意識を向け、スクロール継続を促します。
                </figcaption>
              </figure>
            </div>
            <ol className="journey-cta__progress" aria-label="経営判断支援の進行ステップ">
              {ctaJourneyStages.map((stage, index) => {
                const isActive = activeJourneyStage === stage.id;
                return (
                  <li
                    key={stage.id}
                    className={`journey-cta__progress-item${isActive ? " is-active" : ""}`}
                  >
                    <span className="journey-cta__progress-step">0{index + 1}</span>
                    <span className="journey-cta__progress-text">{stage.stageLabel}</span>
                  </li>
                );
              })}
            </ol>
            <div className="journey-cta__grid">
              {ctaJourneyStages.map((stage) => {
                const StageIcon = stage.icon;
                const isActive = activeJourneyStage === stage.id;
                return (
                  <article
                    key={stage.id}
                    className={`journey-cta__card${isActive ? " is-active" : ""}`}
                    data-animate
                  >
                    <div className="journey-cta__stage-label">
                      <StageIcon aria-hidden />
                      <span>{stage.stageLabel}</span>
                    </div>
                    <div className="journey-cta__metric" aria-label={`${stage.metricLabel}の目安`}>
                      <span className="journey-cta__metric-value">{stage.metricValue}</span>
                      <span className="journey-cta__metric-label">{stage.metricLabel}</span>
                    </div>
                    <h3>{stage.headline}</h3>
                    <p>{stage.description}</p>
                    <ul className="journey-cta__deliverables">
                      {stage.deliverables.map((deliverable) => (
                        <li key={deliverable}>
                          <CheckCircle2 aria-hidden />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="journey-cta__proof">{stage.proof}</p>
                    <a
                      className="journey-cta__link"
                      href={stage.href}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span>{stage.buttonLabel}</span>
                      <ArrowRight aria-hidden />
                    </a>
                  </article>
                );
              })}
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
                挑戦を続ける経営者が会議で胸を張って未来を語れるよう、私たちは経営の筋道を一緒に描き直します。提供するのは、生成AIと専門家が連携した経営計画書づくりと実行サポートのセット。最短3日で現状を診断し、2週間ほどで信頼に足る戦略ドラフトを整備、その後もダッシュボードと伴走支援で実行を支えます。
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
                <span className="solution-synergy__eyebrow">共創設計図</span>
                <h3>因果で裏付けた設計で、意思決定に論理と安心を同時に届ける</h3>
                <p>
                  初動診断から伴走支援までの道筋を一枚に整理し、AIが兆しを検知、専門家が論点を整え、経営陣が説得力ある判断を示せるように構成しています。各工程の成果物と確認ポイントを明確にし、会議での説明が短時間で済むよう工夫しています。
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
                <h3>検知→検証→決断を回す「因・論・果」の進行設計</h3>
                <p>
                  3つのステップが連動することで、数字の裏付けとストーリーが同期します。AIが因（原因）を示し、専門家が論（論拠）を整え、
                  経営陣が果（成果）を迷いなく示せるよう導きます。
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
                <li>経営に必要な数字を一つの画面に束ね、判断の根拠と先を読む力を整えます。</li>
                <li>AIの提案は診断士が点検し、進め方と費用もその都度共有して安心につなげます。</li>
              </ul>
            </div>
            <div className="features-layout">
              <aside className="features-visual" data-animate>
                <span className="features-visual__badge">判断循環モデル</span>
                <h3>数字が語り、専門家が整える三層の判断基盤</h3>
                <p>
                  市場の動き、社内の実績、現場の声を束ねてAIが叩き台を作成。実務で鍛えた診断士チームが論点と信頼性を磨き込み、社長は迷わず決断と実行に集中できます。
                </p>
                <figure className="features-visual__figure">
                  <img
                    src={decisionDashboardVisual}
                    alt="生成AI経営レポートのダッシュボードと主要指標の例"
                    loading="lazy"
                  />
                  <figcaption>
                    外部指標と社内指標を重ねて可視化し、判断の筋道をひと目で共有。
                  </figcaption>
                </figure>
                <ul className="features-visual__legend">
                  <li>
                    <span>1. データ整備</span>
                    公的指数や販売・会計データを自動同期し、抜け漏れはAIが通知。
                  </li>
                  <li>
                    <span>2. 予測ドラフト</span>
                    主要指標の変化を複数シナリオにまとめ、優先順位を色分け表示。
                  </li>
                  <li>
                    <span>3. 専門家レビュー</span>
                    診断士と財務・管理会計の専門家が審査視点で確認し、次の一手を提案。
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
        {renderStageCta("evaluate", {
          secondary: { label: "料金と支援範囲を確認", href: "#pricing" },
        })}
      </div>
    </section>

    {/* 比較セクション */}
    <section
      id="comparison"
      ref={(node) => {
        sectionRefs.current["comparison"] = node ?? null;
      }}
      className="section comparison"
      aria-labelledby="comparison-heading"
    >
      <div className="container">
        <div className="section-header" data-animate>
          <h2 id="comparison-heading">他社AI支援との比較</h2>
          <ul className="section-intro">
            <li>経営者の構想を真ん中に置き、財務と現場をつなぐ意思決定軸を共創します。</li>
            <li>生成AIと専門チームが貴社専用の計画書と管理ダッシュボードを整え、次の一手を見える化します。</li>
            <li>先読みアラートと週次レビューで、揺るがないリーダーシップを支える体制を維持します。</li>
          </ul>
        </div>
        <figure className="comparison-visual" data-animate>
          <img
            src="/images/pain-value-flow.svg"
            alt="計画立案から実行支援までを示す専門家とAIの役割分担図"
            loading="lazy"
          />
          <figcaption>専門家×AIが描く未来像・実行計画・進捗管理の連動イメージ</figcaption>
        </figure>
        <div className="comparison-table-wrapper" data-animate>
          <table className="comparison-table">
            <caption className="sr-only">AI経営計画書ラボと一般的なAI支援サービスの比較</caption>
            <thead>
              <tr>
                <th scope="col">比較軸</th>
                <th scope="col">AI経営計画書ラボ</th>
                <th scope="col">一般的なAI/コンサルサービス</th>
                <th scope="col">根拠・実績</th>
              </tr>
            </thead>
            <tbody>
              {competitorComparison.map((row) => (
                <tr key={row.axis}>
                  <th scope="row">{row.axis}</th>
                  <td>
                    <span className="comparison-badge">当社</span>
                    <p>{row.ourValue}</p>
                  </td>
                  <td>
                    <span className="comparison-badge comparison-badge--neutral">一般的なサービス</span>
                    <p>{row.others}</p>
                  </td>
                  <td>
                    <p>{row.proof}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderStageCta("evaluate", {
          secondaryButton: {
            label: "詳細なROI試算を開く",
            onClick: () => setRoiModalOpen(true),
          },
        })}
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
            {renderStageCta("evaluate", {
              secondary: {
                label: "ROI試算で効果を確認",
                href: "#roi-preview",
              },
            })}
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
                <li>先行きが揺れる市場でも経営者が方向を語り切れる体制を築きます。</li>
                <li>戦略・資金・現場を90日サイクルでそろえ、迷いを最小化します。</li>
                <li>生成AIと専門家が意思決定の裏付けを緻密に整えます。</li>
              </ul>
            </div>
            <div className="quarterly-grid">
              <div className="quarterly-insights" data-animate>
                <article className="quarterly-summary">
                  <span className="quarterly-summary__eyebrow">四半期運営モデル</span>
                  <h3>90日ごとに戦略・資金・現場の意図をそろえ、自信をもって舵を取る</h3>
                  <p>
                    予測が難しい状況でも、経営者が堂々と方向性を示せる舞台を整えます。生成AIが集めた事実と診断士の見立てを重ね、
                    90日のリズムで判断と実行を磨き続ける経営運営モデルです。
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
                      <span className="velocity-eyebrow">経営アラート可視化</span>
                      <h3>外部環境と生成AIの変化速度</h3>
                      <p>
                        {velocityBaseQuarter}を100とした指数で、経営判断に直結する環境変化と
                        技術進化のギャップを比較し、見落としがちな兆しを捉えます。
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
            {renderStageCta("evaluate", {
              secondary: {
                label: "ROIシミュレーションを試す",
                href: "#roi-preview",
              },
            })}
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
            {renderStageCta("decide", {
              secondaryButton: {
                label: "料金プランを表示",
                onClick: () => setPricingModalOpen(true),
              },
            })}
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
            {renderStageCta("decide")}
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
              <h2 id="faq-heading">経営者の疑問とリスク対策</h2>
              <ul className="section-intro">
                <li>診断士と生成AIの二軸で、意思決定の迷いをすばやく解消。</li>
                <li>導入後の継続運用まで視野に入れた伴走体制をご提示します。</li>
              </ul>
            </div>
            <div className="faq-layout" data-animate>
              <div className="faq-overview">
                <span className="faq-overview__badge">診断士×生成AIの伴走設計</span>
                <h3 className="faq-overview__title">経営判断を磨き込むための支援フロー</h3>
                <p className="faq-overview__lead">
                  現場の温度感とデータの裏付けを同時に扱い、経営者さまが納得して舵を切れる状態を整えます。福岡を拠点に、全国の中小企業の経営計画づくりと実行管理を支えるチームが、質問の背景にある課題まで一緒に整理します。
                </p>
                <figure className="faq-overview__image">
                  <img
                    src={faqVisual}
                    alt="経営計画のフローを可視化したイラスト"
                    loading="lazy"
                  />
                </figure>
                <ul className="faq-overview__highlights">
                  <li>
                    <h4>目的を共有する</h4>
                    <p>経営者さまの目指す姿を言語化し、AIにも共有できる指針へ翻訳。判断の軸を全員が理解できる形で整理します。</p>
                  </li>
                  <li>
                    <h4>戦略を描き出す</h4>
                    <p>業界分析・顧客分析・商品分析を組み合わせ、五か年の経営計画と月次の動き方をダッシュボードで見える化します。</p>
                  </li>
                  <li>
                    <h4>実行を支える</h4>
                    <p>日々のレポートとアクション管理を生成AIが補助し、診断士が伴走。社内から信頼される決め方を保てます。</p>
                  </li>
                </ul>
                <div className="faq-overview__trust">
                  <span>秘密保持契約の締結</span>
                  <span>監査対応マニュアル完備</span>
                  <span>専任チームが常時サポート</span>
                </div>
                <div className="faq-overview__cta">
                  <a className="btn btn-primary" href="#contact">
                    無料相談を申し込む
                  </a>
                  <a className="link-button" href="#stories">
                    導入事例を見る
                  </a>
                </div>
              </div>
              <div className="faq-panel">
                <div className="faq-panel__header">
                  <p className="faq-panel__eyebrow">Q&amp;Aガイド</p>
                  <p className="faq-panel__title">疑問の背景から解きほぐす回答集</p>
                  <p className="faq-panel__description">
                    投資判断に直結する論点を5つに整理しました。気になる質問を開くと、準備すべき資料や進め方の流れまで確認できます。
                  </p>
                </div>
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
                <div className="faq-panel__footer">
                  <p>よくある課題別の進め方や伴走レポートも個別相談でご覧いただけます。</p>
                </div>
              </div>
            </div>
            {renderStageCta("evaluate", {
              secondary: { label: "導入事例も確認する", href: "#stories" },
            })}
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
                          <span className="story-scale">{story.projectScale}</span>
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
                      <div className="story-project" aria-label="案件規模">
                        <span className="story-project__label">案件規模</span>
                        <strong className="story-project__value">{story.projectScale}</strong>
                      </div>
                      <p className="story-summary">{story.summary}</p>
                      <ul className="story-metrics">
                        {story.metrics.map((metric) => {
                          const max = Math.max(
                            metric.beforeValue ?? 0,
                            metric.afterValue ?? 0,
                            1
                          );
                          const beforePercent =
                            metric.beforeValue !== undefined
                              ? Math.max(6, (metric.beforeValue / max) * 100)
                              : null;
                          const afterPercent =
                            metric.afterValue !== undefined
                              ? Math.max(6, (metric.afterValue / max) * 100)
                              : null;
                          return (
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
                              {beforePercent !== null && afterPercent !== null && (
                                <div className="story-metric__chart" aria-hidden="true">
                                  <div
                                    className="story-metric__bar story-metric__bar--before"
                                    style={{ width: `${beforePercent}%` }}
                                  />
                                  <div
                                    className="story-metric__bar story-metric__bar--after"
                                    style={{ width: `${afterPercent}%` }}
                                  />
                                  {metric.unit && (
                                    <span className="story-metric__unit">{metric.unit}</span>
                                  )}
                                </div>
                              )}
                              <strong className="story-metric__impact">{metric.impact}</strong>
                            </li>
                          );
                        })}
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
            {renderStageCta("evaluate", {
              secondary: { label: "資料で出力例を見る", href: "#resources" },
            })}
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
            {renderStageCta("learn", {
              secondary: { label: "72時間診断の流れを見る", href: "#hero" },
            })}
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
                <h3>生成AI経営セミナー・イベント</h3>
                <p>
                  最新の成功事例や信頼を得た伝え方を学べるオンライン／オフラインイベントを定期開催。
                  年商5,000万円〜15億円規模の経営者が、自ら舵を取れる判断軸を持ち帰れます。
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
            {renderStageCta("learn")}
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
            {renderStageCta("decide")}
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
              {decideStage && (
                <span className="final-cta__stage">{decideStage.stageLabel}</span>
              )}
              <h2 id="final-cta-heading">意思決定の質・速さ・先見性を高める経営計画を今すぐ</h2>
              <p>
                経営者の時間は有限です。160件の案件で磨いた専門家が生成AIの出力を精査し、意思決定リードタイム52%短縮・計画作成工数80%削減・粗利18%増・キャッシュ1.8倍という成果創出を後押しします。
                まずは無料AI診断で現状と優先課題を把握し、必要な資料は後からダウンロードできます。
              </p>
              <div className="final-cta__actions">
                <a className="btn btn-cta" href="#contact">
                  {decideStage?.buttonLabel ?? primaryCtaLabel}
                </a>
                <a
                  className="btn btn-outline"
                  href={evaluateStage?.href ?? "#roi-preview"}
                >
                  {evaluateStage?.buttonLabel ?? "ROIを試算する"}
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
              {decideStage && (
                <span className="section-header__stage">{decideStage.stageLabel}</span>
              )}
              <h2 id="contact-heading">無料AI診断・相談申し込み</h2>
              <p>
                メールアドレスを入力するだけでスピード診断がスタート。追加のヒアリング内容は任意で、1営業日以内に専門家が具体的な日程とレポート共有方法をご案内します。
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

            <div id="roi-preview" className="contact-roi" data-animate>
              <div className="contact-roi__header">
                <div>
                  <span className="contact-roi__eyebrow">Quick ROI simulator</span>
                  <h3>導入前に投資対効果を60秒で把握</h3>
                  <p>
                    年商規模・社内稼働・投資額を入力するだけで、期待ROIや投資回収目安が算出されます。フォーム入力とは切り離してご利用いただけます。
                  </p>
                </div>
                <button
                  type="button"
                  className="contact-roi__modal"
                  onClick={() => setRoiModalOpen(true)}
                >
                  ROIを試算する
                  <ArrowUpRight aria-hidden />
                </button>
              </div>
              <div className="contact-roi__summary" role="list">
                {simulatorSummaryMetrics.slice(0, 3).map((metric) => {
                  const MetricIcon = metric.icon;
                  return (
                    <div key={metric.label} className="contact-roi__summary-item" role="listitem">
                      <span className="contact-roi__summary-badge">{metric.badge}</span>
                      <div className="contact-roi__summary-icon" aria-hidden="true">
                        <MetricIcon />
                      </div>
                      <div className="contact-roi__summary-body">
                        <strong>{metric.value}</strong>
                        <p>{metric.helper}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="contact-roi__note">
                詳細な条件を試算したい場合は上記ボタンからモーダルを開いてください。入力内容は保存されません。
              </p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              {formError && (
                <div className="form-error form-error--inline" role="alert" aria-live="assertive">
                  {formError}
                </div>
              )}
              <div className="contact-form__grid">
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
              <div className="contact-form__grid contact-form__grid--optional">
                <label className="optional">
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
                <label className="optional">
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
              <label className="full-width">
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
              <div className="form-actions">
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
            {decideStage && (
              <span className="mobile-form-cta__stage">{decideStage.stageLabel}</span>
            )}
            <a className="btn btn-cta" href="#contact">
              {decideStage?.buttonLabel ?? primaryCtaLabel}
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
          {decideStage && (
            <span className="floating-cta__stage">{decideStage.stageLabel}</span>
          )}
          <a className="floating-cta__button" href="#contact">
            {decideStage?.buttonLabel ?? primaryCtaLabel}
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
