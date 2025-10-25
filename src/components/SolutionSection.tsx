import { useMemo, useState } from "react";
import { BrainCircuit, LineChart, PiggyBank, Sparkle, Workflow } from "lucide-react";
import solutionImage from "@/assets/solution-illustration.jpg";
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

const services = [
  {
    icon: Workflow,
    title: "伴走型経営PMO",
    description:
      "経営課題の優先度を整理し、生成AIが提示するシナリオを経営判断に組み込むPMO機能。経営会議の設計、意思決定の根拠整理、指標管理まで一貫して支援します。",
    outputs: ["週次レビュー/経営会議ファシリテーション", "AI連動タスクボード運用", "KPI・キャッシュ進捗サマリーの共有"],
  },
  {
    icon: BrainCircuit,
    title: "AI導入・活用設計",
    description:
      "生成AI・需要予測AI・ワークフロー自動化を業務にフィットさせ、PoCで検証しながら現場に定着させます。",
    outputs: ["ユースケース設計とROI試算", "プロンプト/テンプレートの社内標準化", "Slack/Teams連携による運用支援"],
  },
  {
    icon: LineChart,
    title: "管理会計・KPI設計",
    description:
      "部門別/案件別の収益構造を可視化し、粗利率・回転率・受注単価を改善するための指標体系を構築します。",
    outputs: ["ダッシュボード・帳票テンプレート", "KPIレビュー手順書", "意思決定のための感度分析シナリオ"],
  },
  {
    icon: PiggyBank,
    title: "資金繰り最適化と金融機関連携",
    description:
      "資金繰り表とキャッシュフローモデルを自動化し、金融機関との面談で共有すべき論点を整理。必要に応じて面談資料や議事メモの型化を支援します。",
    outputs: ["キャッシュフロー予測テンプレート", "金融機関面談サマリーとTODO管理ボード", "金融機関向け説明ポイントの整理"],
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
        "flex h-full flex-col gap-5 rounded-[28px] border border-primary/15 bg-white p-8 shadow-card transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="flex items-center gap-4">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
      </div>
      <p className="text-base leading-relaxed text-muted-foreground">{service.description}</p>
      <ul className="space-y-3">
        {service.outputs.map((output) => (
          <li key={output} className="flex items-start gap-3 text-base text-muted-foreground">
            <span aria-hidden="true" className="mt-1.5 inline-block h-2.5 w-2.5 rounded-full bg-accent flex-shrink-0" />
            {output}
          </li>
        ))}
      </ul>
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
