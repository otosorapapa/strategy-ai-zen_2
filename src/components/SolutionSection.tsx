import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  LineChart,
  PiggyBank,
  ShieldCheck,
  Sparkle,
  Workflow,
} from "lucide-react";
import solutionImage from "@/assets/financial-analysis.jpg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";

const phases = [
  {
    month: "着手〜1ヶ月",
    headline: "数字と現場の棚卸し",
    bullets: [
      "財務・販売・在庫データを生成AI学習用に整備し、KPI仮説と相関関係を洗い出し",
      "経営陣/管理部/営業責任者の三者ヒアリングで課題構造とデータ化可能な意思決定を可視化",
      "当座対応が必要な資金繰りリスクとAIで検証すべき改善テーマを提示",
    ],
    deliverable: "生成AIに接続した管理会計ダッシュボード雛形と意思決定時間の測定指標",
  },
  {
    month: "2〜3ヶ月",
    headline: "管理会計とAIオペレーション設計",
    bullets: [
      "部門別損益・粗利ドライバーを可視化するレポート基盤を構築し、AIの提示根拠を説明可能に",
      "生成AIを活用した案件管理/需要予測/問い合わせ対応のユースケースをPoCしROIを定量化",
      "金融機関との面談に備えた資金繰りシナリオの論点を整理",
    ],
    deliverable: "経営会議テンプレート・生成AIワークフロー・資金繰りシナリオ3本",
  },
  {
    month: "4〜6ヶ月",
    headline: "改善アクションを現場に定着",
    bullets: [
      "週次モニタリングでKPIとキャッシュの変化を追跡し、生成AIが施策をチューニング",
      "AIの運用ルールと教育コンテンツを整備し、社内チームが自走できるプロンプト体系を構築",
      "必要に応じて金融機関連携の打ち合わせ準備と振り返りを伴走",
    ],
    deliverable: "改善定着マニュアルと運用チェックリスト、AIが可視化する意思決定時間レポート",
  },
];

const readinessOptions = [
  {
    value: "diagnosis",
    label: "まずは数字の見える化から着手したい",
    recommended: 0,
    description: "現状のKPIと資金繰りを棚卸しし、優先課題を抽出するフェーズが最適です。",
  },
  {
    value: "design",
    label: "AIの設計と実装プランを固めたい",
    recommended: 1,
    description: "AIユースケースのPoCと管理会計の整備を同時に進めることで成果が出やすくなります。",
  },
  {
    value: "rollout",
    label: "改善施策を現場に定着させたい",
    recommended: 2,
    description: "週次レビューと教育コンテンツの整備で、改善アクションを継続させるフェーズが効果的です。",
  },
];

type ServiceMetric = {
  value: string;
  label: string;
  caption?: string;
};

type ServiceImpact = {
  value: string;
  label: string;
  detail: string;
};

type ServiceDefinition = {
  icon: LucideIcon;
  title: string;
  tag: string;
  primaryMetric: ServiceMetric;
  description: string;
  impact: ServiceImpact[];
  trust: string[];
  outputs: string[];
};

const services: ServiceDefinition[] = [
  {
    icon: Workflow,
    title: "伴走型経営PMO",
    tag: "BOARD PMO",
    primaryMetric: {
      value: "48h",
      label: "意思決定リードタイム",
      caption: "週次レビューから48時間以内に経営判断を収束",
    },
    description:
      "経営課題の優先度を整理し、生成AIが提示するシナリオを経営判断に組み込むPMO機能。経営会議の設計、意思決定の根拠整理、指標管理まで一貫して支援します。",
    impact: [
      {
        value: "▲35%",
        label: "会議準備工数",
        detail: "経営陣・管理部・現場の論点を一枚のレビューシートに集約",
      },
      {
        value: "+2.3pt",
        label: "粗利率改善余地",
        detail: "KPIとキャッシュの相関をAIで補足し、打ち手の優先度を明確化",
      },
    ],
    trust: ["製造/IT/物流で導入", "経営会議のファシリ10年以上"],
    outputs: [
      "週次レビュー/経営会議ファシリテーション",
      "AI連動タスクボード運用",
      "KPI・キャッシュ進捗サマリーの共有",
      "投資判断メモとリスク整理テンプレート",
    ],
  },
  {
    icon: BrainCircuit,
    title: "AI導入・活用設計",
    tag: "AI OPS DESIGN",
    primaryMetric: {
      value: "90日",
      label: "PoC〜現場定着",
      caption: "需要予測/営業/サポートでROI試算まで到達",
    },
    description:
      "生成AI・需要予測AI・ワークフロー自動化を業務にフィットさせ、PoCで検証しながら現場に定着させます。",
    impact: [
      {
        value: "+18%",
        label: "案件成約率",
        detail: "スコアリングAI×営業現場ノウハウで確度の高いフォローを支援",
      },
      {
        value: "▲40%",
        label: "問い合わせ応答時間",
        detail: "プロンプト/フローを標準化し、一次回答を自動化",
      },
    ],
    trust: ["Slack/Teams公式連携実績", "生成AI専門家資格パートナー"],
    outputs: [
      "ユースケース設計とROI試算",
      "プロンプト/テンプレートの社内標準化",
      "Slack/Teams連携による運用支援",
      "運用SOPと教育シナリオ",
    ],
  },
  {
    icon: LineChart,
    title: "管理会計・KPI設計",
    tag: "MANAGEMENT ACCOUNTING",
    primaryMetric: {
      value: "14日",
      label: "月次決算速報化",
      caption: "部門別粗利を2週間以内に可視化",
    },
    description:
      "部門別/案件別の収益構造を可視化し、粗利率・回転率・受注単価を改善するための指標体系を構築します。",
    impact: [
      {
        value: "+1.8x",
        label: "利益シナリオ数",
        detail: "感度分析で赤字リスクと投資余力を同時に把握",
      },
      {
        value: "▲25%",
        label: "レポート作成時間",
        detail: "ダッシュボード自動化で属人的な集計を解消",
      },
    ],
    trust: ["会計士/税理士ネットワーク連携", "上場準備企業の管理会計支援"],
    outputs: [
      "ダッシュボード・帳票テンプレート",
      "KPIレビュー手順書",
      "意思決定のための感度分析シナリオ",
      "モニタリング用プレイブック",
    ],
  },
  {
    icon: PiggyBank,
    title: "資金繰り最適化と金融機関連携",
    tag: "CASH MANAGEMENT",
    primaryMetric: {
      value: "6ヶ月",
      label: "キャッシュ視認性",
      caption: "最悪/標準/成長シナリオを半年先まで可視化",
    },
    description:
      "資金繰り表とキャッシュフローモデルを自動化し、金融機関との面談で共有すべき論点を整理。必要に応じて面談資料や議事メモの型化を支援します。",
    impact: [
      {
        value: "+3.5pt",
        label: "与信確度",
        detail: "金融機関との面談資料を統一フォーマットで提示",
      },
      {
        value: "▲45%",
        label: "資金繰りシミュレーション時間",
        detail: "キャッシュフロー自動更新と警戒シグナル通知",
      },
    ],
    trust: ["メガバンク/信金連携実績", "資本政策の伴走支援"],
    outputs: [
      "キャッシュフロー予測テンプレート",
      "金融機関面談サマリーとTODO管理ボード",
      "金融機関向け説明ポイントの整理",
      "リスク逆転のための保証/返金条件設計",
    ],
  },
];

type Phase = (typeof phases)[number];
type Service = (typeof services)[number];

const PhaseCard = ({ phase, index, isActive }: { phase: Phase; index: number; isActive: boolean }) => {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>({ threshold: 0.25 });

  return (
    <article
      ref={ref}
      className={cn(
        "relative flex h-full flex-col gap-5 rounded-[28px] border p-6 transition-all duration-700 ease-out",
        isActive ? "border-primary/40 bg-primary/10 shadow-lg shadow-primary/20" : "border-muted/20 bg-white/95",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <span
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-transform duration-300",
          isActive ? "bg-primary text-white" : "bg-muted text-muted-foreground",
        )}
      >
        {index + 1}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">{phase.month}</p>
        <h3 className="mt-3 text-xl font-bold text-foreground md:text-2xl">{phase.headline}</h3>
      </div>
      <ul className="space-y-3">
        {phase.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground transition-transform duration-300 hover:translate-x-1"
          >
            <span
              aria-hidden="true"
              className={cn(
                "mt-1.5 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full",
                isActive ? "bg-primary" : "bg-muted",
              )}
            />
            {bullet}
          </li>
        ))}
      </ul>
      <div className={cn("mt-auto rounded-2xl border p-4 transition-colors duration-300", isActive ? "border-secondary/50 bg-secondary/10" : "border-secondary/20 bg-secondary/5")}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary-foreground/80">納品物</p>
        <p className="mt-2 text-sm text-muted-foreground">{phase.deliverable}</p>
      </div>
      {index < phases.length - 1 && (
        <span className="absolute right-[-16px] top-14 hidden h-0.5 w-8 bg-gradient-to-r from-primary/40 to-accent/60 lg:block" aria-hidden="true" />
      )}
    </article>
  );
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const Icon = service.icon;
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>({ threshold: 0.2 });

  return (
    <article
      ref={ref}
      className={cn(
        "group relative flex h-full flex-col gap-6 rounded-[28px] border border-primary/15 bg-gradient-to-br from-white via-white to-primary/5 p-8 shadow-card transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <span
        className="pointer-events-none absolute inset-x-8 top-0 h-1 rounded-b-full bg-gradient-to-r from-primary/60 via-accent/40 to-secondary/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="relative inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner shadow-primary/10">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary/70">{service.tag}</p>
              <h3 className="mt-1 text-2xl font-bold text-foreground md:text-[28px]">{service.title}</h3>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-primary/40 bg-white/80 px-4 py-3 text-right shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-primary/60">KEY KPI</p>
            <div className="mt-1 flex items-baseline justify-end gap-1 text-primary">
              <span className="text-2xl font-black leading-none md:text-3xl">{service.primaryMetric.value}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold text-primary/80">{service.primaryMetric.label}</p>
            {service.primaryMetric.caption && (
              <p className="mt-1 text-[11px] text-muted-foreground">{service.primaryMetric.caption}</p>
            )}
          </div>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground">{service.description}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {service.impact.map((item) => (
          <div
            key={`${service.title}-${item.label}`}
            className="rounded-2xl border border-muted/20 bg-white/80 px-4 py-4 shadow-sm"
          >
            <p className="text-2xl font-bold text-foreground md:text-[28px]">{item.value}</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
              {item.label}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {service.trust.map((badge) => (
          <span
            key={`${service.title}-${badge}`}
            className="inline-flex items-center gap-2 rounded-full border border-muted/20 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground"
          >
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            {badge}
          </span>
        ))}
      </div>
      <div className="rounded-2xl border border-secondary/30 bg-secondary/10 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary-foreground/80">納品物</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {service.outputs.map((output) => (
            <li key={output} className="flex items-start gap-2 text-sm leading-relaxed text-secondary-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary" aria-hidden="true" />
              {output}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const SolutionSection = () => {
  const [readiness, setReadiness] = useState(readinessOptions[0].value);

  const activePhaseIndex = useMemo(() => {
    const matched = readinessOptions.find((option) => option.value === readiness);
    return matched?.recommended ?? 0;
  }, [readiness]);

  const { ref: solutionImageRef, style: solutionImageStyle } = useParallax<HTMLDivElement>({ intensity: 0.3, maxTranslate: 26 });
  const { ref: imageRevealRef, isVisible: imageVisible } = useRevealOnScroll<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <div
            ref={imageRevealRef}
            className={cn(
              "order-2 overflow-hidden rounded-3xl shadow-elegant transition-all duration-700 ease-out lg:order-1",
              imageVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
            )}
          >
            <div ref={solutionImageRef} style={solutionImageStyle} className="will-change-transform">
              <img
                src={solutionImage}
                alt="AI×管理会計の統合ソリューション"
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.3em] text-primary">
              解決策
            </span>
            <h2 className="mt-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl leading-tight">
              課題の棚卸し → AI設計 → 意思決定時間の創出
            </h2>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              生成AI・管理会計・資金繰りを統合し、利益シナリオの比較から資金戦略の意思決定までを一つのループで回します。社長が確認すべき数字とリスクはAIが整理し、経営チームは価値ある打ち手に集中できます。
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 rounded-[32px] border border-primary/15 bg-white/95 p-7 shadow-card lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                <Sparkle className="h-4 w-4" aria-hidden="true" />
                貴社の現在地を選択
              </span>
              <p className="text-lg font-semibold text-foreground">最適なステップをハイライトします。</p>
            </div>
            <Select value={readiness} onValueChange={setReadiness}>
              <SelectTrigger className="w-full rounded-2xl border-primary/30 bg-white/90 text-left text-base font-medium text-foreground">
                <SelectValue placeholder="現在の状況を選択" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-primary/20 bg-white">
                {readinessOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-sm text-foreground">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {readinessOptions.find((option) => option.value === readiness)?.description}
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-8 right-8 top-8 h-1 bg-gradient-to-r from-primary via-secondary to-accent" aria-hidden="true" />
            <div className="relative grid gap-6 lg:grid-cols-3">
              {phases.map((phase, index) => (
                <PhaseCard key={phase.month} phase={phase} index={index} isActive={index === activePhaseIndex} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
