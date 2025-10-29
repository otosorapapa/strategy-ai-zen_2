import { Button } from "@/components/ui/button";
import commandCenterVisual from "@/assets/dashboard-preview.jpg";
import { PRIMARY_CTA } from "@/lib/ctaVariants";
import AnimatedCounter from "@/components/AnimatedCounter";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  JapaneseYen,
  LineChart,
  Lock,
  PiggyBank,
  PieChart,
  ShieldCheck,
  Sparkle,
  Timer,
} from "lucide-react";

const executiveMetrics = [
  {
    label: "判断リードタイム",
    value: "-52%",
    context: "AIレポート×専門家レビューで意思決定を先回り",
  },
  {
    label: "計画作成工数",
    value: "-80%",
    context: "経営計画ドラフトと根拠資料を自動生成",
  },
  {
    label: "粗利率インパクト",
    value: "+6.0pt",
    context: "案件別シナリオ比較で優先投資を可視化",
  },
];

const commandSignals = [
  "需給や原価の急変を24時間以内に検知し、経営会議に反映",
  "キャッシュポジションと投資余力を日次シミュレーション",
  "決定事項をタスク化し、Slack/Teamsへ自動配信",
];

const trustMarks = [
  "中小企業診断士によるダブルチェック",
  "金融機関・投資家向け根拠資料を同時生成",
  "統合ダッシュボードと運用ガイドを提供",
];

const heroStats = [
  {
    label: "意思決定までの時間削減",
    value: 50,
    suffix: "%",
    duration: 1400,
    annotation: "AIレポート導入後の平均削減率",
  },
  {
    label: "会議準備にかかる時間短縮",
    value: 66,
    suffix: "%",
    duration: 1600,
    annotation: "資料作成・根拠整理の自動化",
  },
  {
    label: "キャッシュ創出インパクト",
    value: 1.8,
    suffix: "倍",
    duration: 1800,
    annotation: "AIが提案した施策採用案件",
    decimals: 1,
  },
  {
    label: "年間で削減した単純作業",
    value: 1200,
    suffix: "時間",
    duration: 1900,
    annotation: "AI自動化で創出した意思決定時間",
  },
];

const heroChecklist = [
  "現場に依存した管理会計で、粗利と案件別の原価がすぐに把握できない",
  "資金繰り表が更新されず、翌月の支払いと投資判断に常に不安が残る",
  "製造・建設プロジェクトの進捗とキャッシュのズレが会議で共有されない",
];

const heroSolutionHighlights = [
  "AIダッシュボードが粗利とキャッシュの差異要因を10分で図解し、優先すべき現場アクションを自動提示",
  "週1回のAIレポートで管理会計と資金繰りを一本化し、意思決定までの時間を平均50%削減",
  "2ステップの無料経営診断フォームから、翌営業日に実行ロードマップと資金計画案を共有",
];

const servicePillars = [
  {
    icon: BrainCircuit,
    title: "生成AI",
    description:
      "経営指標・現場の声・未整理のナレッジをリアルタイムで取り込み、生成AIが複数シナリオと期待インパクトを提示。意思決定と実行が一気通貫でつながります。",
  },
  {
    icon: BarChart3,
    title: "管理会計",
    description:
      "部門別KPIとキャッシュドライバーを可視化し、AIが示す打ち手と収益インパクトを同じ画面で確認。経営会議が即アクションに転換します。",
  },
  {
    icon: PiggyBank,
    title: "資金繰り",
    description:
      "資金ショートの兆しと投資余力を生成AIが確率で示し、資本政策や投資計画の意思決定を後押しします。",
  },
];

const proofPoints = [
  {
    icon: Sparkle,
    title: "生成AIワークフロー",
    description:
      "furumachi-smec.lognowa.com のデモ同様、分散したデータを束ねて粗利改善・在庫最適化のシナリオを即時生成。",
  },
  {
    icon: BarChart3,
    title: "ワンクリック経営ダッシュボード",
    description:
      "会計・販売・Excelを統合し、生成AIが粗利・LTV・キャッシュのギャップを事業別に可視化します。",
  },
  {
    icon: BrainCircuit,
    title: "伴走型AIトレーニング",
    description:
      "現場の会議と定例業務にAIを定着させ、社長が未来の成長シナリオ選定に専念できる体制を構築します。",
  },
];

const aiVisualHighlights = [
  {
    icon: LineChart,
    title: "粗利ドライバーの即時解析",
    description: "AIが売上・粗利・在庫の変動要因をグラフで提示し、注力領域を数分で判断。",
  },
  {
    icon: PieChart,
    title: "キャッシュフロー予測",
    description: "3ヶ月先の資金曲線と投資余力を自動算出。投資判断に必要な指標が揃います。",
  },
];

const HeroSection = () => {
  const scrollToContact = () => {
    const ctaSection = document.getElementById("cta-section");
    ctaSection?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSimulator = () => {
    const simulatorSection = document.getElementById("ai-simulator");
    simulatorSection?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50 to-slate-100/50">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="hero-curve-overlay" />
        <div className="hero-aurora hero-aurora--one" />
        <div className="hero-aurora hero-aurora--two" />
        <div className="hero-aurora hero-aurora--three" />
        <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 pb-16 pt-16 md:pb-24 md:pt-24">
          <div className="md:hidden">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-highlight/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-highlight-foreground">
                年商5,000万円～15億円企業限定
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-accent">
                3ヶ月集中プログラム
              </span>
            </div>
            <h1 className="mt-5 text-balance text-[1.9rem] font-bold leading-[1.25] text-slate-900">
              経営改善に鍛えられた中小企業診断士×生成AI＝意思決定の質・速さ・先見性を高める経営計画
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.32em] text-primary/80">
              経営者の判断時間を半減し、先読みできる打ち手を届ける
            </p>
            <div className="mt-4 space-y-3 text-[0.95rem] leading-relaxed text-muted-foreground">
              <p>
                現場・会計・市場のデータを生成AIが束ね、意思決定に必要な数字と根拠を即時に提示。診断士がシナリオの妥当性を検証し、実行ロードマップまで伴走します。
              </p>
              <p>
                重要指標の監視とレポートを自動化し、経営会議の準備時間を50％以上短縮。先行指標まで可視化された経営計画で、判断の速さと再現性を両立させます。
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="cta"
                size="lg"
                className="interactive-cta flex h-auto w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold motion-safe:animate-[floatPulse_3.6s_ease-in-out_infinite]"
                onClick={scrollToContact}
                data-cta-id={PRIMARY_CTA.id}
                data-cta-attention="hero-primary"
                data-cta-attention-delay="420"
                aria-label="30分の無料経営診断を予約する"
              >
                {PRIMARY_CTA.label}
                <ArrowRight className="cta-arrow h-5 w-5" aria-hidden="true" />
                <CheckCircle2 className="cta-check h-5 w-5" aria-hidden="true" />
              </Button>
              <a
                href="#resources"
                className="text-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                data-cta-id="secondary-hero"
              >
                資料ダウンロードはこちら
              </a>
              <p className="text-center text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                初回相談は無料｜所要30分
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <details className="group rounded-3xl border border-highlight/30 bg-highlight/10 p-5 text-highlight-foreground">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-highlight-foreground/80 [&::-webkit-details-marker]:hidden">
                  実感できる成果
                  <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-[0.95rem] font-semibold leading-relaxed text-highlight-foreground">
                  決断までの時間を50％削減。3ヶ月で利益とキャッシュが同時に増える仕組みをチームで並走構築します。
                </p>
              </details>

              <details className="group rounded-3xl border border-primary/20 bg-white/90 p-5 shadow-card">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary/80 [&::-webkit-details-marker]:hidden">
                  3分で棚卸しできる課題
                  <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="mt-4 space-y-3">
                  {heroChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-left text-[0.95rem] leading-relaxed text-muted-foreground">
                      <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-highlight/20 text-[0.75rem] font-bold text-highlight-foreground">
                        ●
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold text-muted-foreground">
                  生成AIが御社の数字を整理し、意思決定に必要なレポートと施策案を10分で提示します。
                </p>
              </details>

              <details className="group rounded-3xl border border-primary/20 bg-white/92 p-5 shadow-card">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary/80 [&::-webkit-details-marker]:hidden">
                  生成AIができること
                  <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="mt-4 space-y-3">
                  {heroSolutionHighlights.map((item) => (
                    <p key={item} className="flex items-start gap-2 text-[0.95rem] leading-relaxed text-foreground/90">
                      <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-highlight/20 text-[0.8rem] font-bold text-highlight-foreground">
                        ✓
                      </span>
                      {item}
                    </p>
                  ))}
                </div>
              </details>
            </div>

            <div className="mt-6 space-y-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">サービスの柱</h2>
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1">
                {servicePillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.title}
                      className="min-w-[220px] snap-start rounded-3xl border border-primary/15 bg-white/90 p-4 shadow-card"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-3 text-base font-semibold text-foreground">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">信頼の理由</h2>
              <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1">
                {proofPoints.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="min-w-[200px] snap-start rounded-3xl border border-primary/15 bg-white/90 p-4 shadow-card"
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-2 gap-4 rounded-3xl border border-primary/15 bg-gradient-to-r from-white to-secondary/10 p-4 shadow-card">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/85 p-4 text-center shadow-sm">
                    <AnimatedCounter
                      value={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={stat.duration}
                      className="mx-auto text-2xl font-black text-primary"
                    />
                    <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                      {stat.label}
                    </p>
                    {stat.annotation && (
                      <p className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-muted-foreground/70">
                        {stat.annotation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.75rem] font-medium uppercase tracking-[0.32em] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                  60秒で完了
                </span>
                <span className="inline-flex items-center gap-1">
                  <JapaneseYen className="h-3.5 w-3.5" aria-hidden="true" />
                  月額18万円〜
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  30日間返金保証
                </span>
                <span className="inline-flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  NDA対応
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToSimulator}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/80 px-5 py-3 text-sm font-semibold text-primary transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary/40"
            >
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
              3分でAI診断を試す
            </button>
          </div>

          <div className="hidden md:grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
            <div className="space-y-10 lg:pr-8">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-highlight/15 px-5 py-2 text-[0.95rem] font-semibold uppercase tracking-[0.28em] text-highlight-foreground">
                    年商5,000万円～15億円企業限定
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-[0.85rem] font-semibold uppercase tracking-[0.28em] text-accent">
                    3ヶ月集中プログラム
                  </span>
                </div>
                <h1 className="text-balance text-3xl font-bold leading-[1.25] text-foreground md:text-4xl lg:text-[3.05rem] lg:leading-[1.25]">
                  経営改善に鍛えられた中小企業診断士×生成AI＝意思決定の質・速さ・先見性を高める経営計画
                </h1>
                <div className="space-y-3 rounded-3xl bg-white/92 px-6 py-5 shadow-lg shadow-primary/10 ring-1 ring-primary/15">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80">
                    経営者の判断時間を半減し、未来の一手を先読み
                  </p>
                  <div className="space-y-2 text-[1.05rem] leading-relaxed text-muted-foreground md:text-lg">
                    <p>生成AIが会計・現場・市場データを統合し、意思決定に必要な根拠と数値を即時に整理。</p>
                    <p>中小企業診断士がシナリオのリスクと実行手順を補強し、先読みできる経営計画へ落とし込みます。</p>
                  </div>
                </div>
                <div className="max-w-3xl space-y-2 text-[1.05rem] leading-relaxed text-muted-foreground md:text-lg">
                  <p>AIレポートが粗利・キャッシュ・在庫の変化を数分で図解し、判断材料をワンクリックで共有。</p>
                  <p>会議準備を50％以上短縮しつつ、先行指標と複数シナリオを提示することで、意思決定の確度とスピードを両立します。</p>
                </div>
                <div className="flex flex-col gap-3 rounded-3xl border border-highlight/30 bg-highlight/10 px-6 py-5 text-highlight-foreground">
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-highlight-foreground/80">実感できる成果</span>
                  <p className="text-[1.05rem] font-semibold leading-relaxed md:text-lg">
                    決断までの時間を50％削減。3ヶ月で利益とキャッシュが同時に増える仕組みをチームで並走構築します。
                  </p>
                </div>
                <div className="space-y-3 rounded-3xl border border-primary/20 bg-white/82 p-6 shadow-card">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">課題を3分で棚卸し</p>
                  <ul className="space-y-2">
                    {heroChecklist.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-left text-[1.05rem] leading-relaxed text-muted-foreground">
                        <span className="mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-highlight/20 text-[0.75rem] font-bold text-highlight-foreground">●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold text-muted-foreground">
                    生成AIが御社の数字を整理し、意思決定に必要なレポートと施策案を10分で提示します。
                  </p>
                </div>
              </div>

              <div className="grid gap-3 rounded-3xl border border-primary/20 bg-white/95 p-6 shadow-card sm:grid-cols-3">
                {servicePillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="flex flex-col gap-2">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-base font-semibold text-foreground">{pillar.title}</h3>
                      <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{pillar.description}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid gap-3 rounded-3xl border border-primary/20 bg-white/95 p-6 shadow-card md:grid-cols-1">
                {heroSolutionHighlights.map((item) => (
                  <p
                    key={item}
                    className="group flex items-start gap-3 rounded-2xl border border-transparent px-4 py-4 text-[1.05rem] text-foreground transition-all duration-300 hover:border-highlight/50 hover:bg-highlight/10"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-highlight/20 text-[0.9rem] font-bold text-highlight-foreground transition-transform duration-300 group-hover:scale-110">
                      ✓
                    </span>
                    <span className="leading-relaxed text-left text-foreground/90">{item}</span>
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="cta"
                  size="lg"
                  className="group interactive-cta h-auto rounded-full px-10 py-5 text-[1.05rem]"
                  onClick={scrollToContact}
                  data-cta-id={PRIMARY_CTA.id}
                  data-cta-attention="hero-primary"
                  data-cta-attention-delay="420"
                  aria-label="30分の無料経営診断を予約する"
                >
                  <span className="flex items-center gap-2">
                    {PRIMARY_CTA.label}
                    <ArrowRight className="cta-arrow h-5 w-5" aria-hidden="true" />
                    <CheckCircle2 className="cta-check h-5 w-5" aria-hidden="true" />
                  </span>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[0.95rem] text-muted-foreground">
                <a
                  href="#resources"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                  data-cta-id="secondary-hero"
                >
                  資料ダウンロードはこちら
                </a>
                <span>平日9:00-18:00｜オンライン・訪問どちらも対応</span>
              </div>
              <div className="cta-reassurance-group text-muted-foreground/90">
                <span className="cta-reassurance">
                  <Timer aria-hidden="true" />
                  60秒で完了
                </span>
                <span className="cta-reassurance">
                  <JapaneseYen aria-hidden="true" />
                  月額18万円〜
                </span>
                <span className="cta-reassurance">
                  <ShieldCheck aria-hidden="true" />
                  初回30日間返金保証
                </span>
                <span className="cta-reassurance">
                  <Lock aria-hidden="true" />
                  秘密厳守（NDA対応）
                </span>
              </div>
              <button
                type="button"
                onClick={scrollToSimulator}
                className="floating-scroll-indicator group"
              >
                <span className="floating-scroll-indicator__icon" aria-hidden="true">
                  <ChevronDown className="h-5 w-5" />
                </span>
                <span className="floating-scroll-indicator__label">3分でAI診断を試す</span>
              </button>
              <p className="text-[0.95rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                初回相談は無料｜所要30分｜オンライン/訪問どちらも対応
              </p>

              <div className="grid gap-6 rounded-3xl border border-primary/15 bg-gradient-to-r from-white to-secondary/10 p-6 shadow-card sm:grid-cols-2 lg:grid-cols-4">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <AnimatedCounter
                      value={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={stat.duration}
                      className="mx-auto inline-flex items-center justify-center rounded-2xl bg-primary/10 px-5 py-3 text-[2.05rem] font-black text-primary md:text-[2.7rem]"
                    />
                    <p className="mt-3 text-[0.95rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                      {stat.label}
                    </p>
                    {stat.annotation && (
                      <p className="mt-1 text-[0.75rem] font-medium uppercase tracking-[0.3em] text-muted-foreground/70">
                        {stat.annotation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col gap-6">
              <div className="relative overflow-hidden rounded-[40px] border border-primary/20 bg-slate-950 text-slate-50 shadow-[0_45px_120px_-60px_rgba(30,64,175,0.55)]">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" aria-hidden="true" />
                <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-indigo-500/25 blur-[110px]" aria-hidden="true" />
                <div className="relative z-10 flex flex-col gap-8 p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-slate-100/90">
                      Executive Playbook
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/25 px-3.5 py-1 text-[0.75rem] font-semibold uppercase tracking-[0.28em] text-sky-50">
                      <Sparkle className="h-4 w-4" aria-hidden="true" />
                      信頼スコア 97%
                    </span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold leading-snug text-white lg:text-[2.1rem]">
                      変化を味方にする意思決定コックピット
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-200/90">
                      経営指標・現場シグナル・資金計画を一画面に束ね、AIが提案する複数シナリオを診断士が監査。経営者は判断とストーリーづくりに集中できます。
                    </p>
                    <p className="text-sm leading-relaxed text-slate-200/90">
                      リアルタイムに更新されるダッシュボードが、会議前の準備と意思決定の根拠説明を同時に完了させます。
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {executiveMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-white/12 bg-white/10 p-4 shadow-[0_12px_32px_-18px_rgba(148,163,184,0.9)]"
                      >
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-slate-200/80">{metric.label}</p>
                        <p className="mt-3 text-3xl font-bold text-white">{metric.value}</p>
                        <p className="mt-2 text-xs leading-relaxed text-slate-200/75">{metric.context}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="flex flex-col gap-4 rounded-2xl border border-white/12 bg-white/10 p-5">
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-slate-200/80">Executive Signals</p>
                      <div className="space-y-3">
                        {commandSignals.map((signal) => (
                          <p key={signal} className="flex items-start gap-2 text-sm leading-relaxed text-slate-100/95">
                            <span className="mt-1 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/35 text-[0.75rem] font-bold text-white">
                              ✓
                            </span>
                            <span>{signal}</span>
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {trustMarks.map((mark) => (
                          <span
                            key={mark}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 px-3 py-1 text-[0.75rem] font-semibold text-slate-100 ring-1 ring-white/15"
                          >
                            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                            {mark}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-slate-950/40 shadow-[0_28px_90px_-50px_rgba(15,23,42,0.9)]">
                      <img
                        src={commandCenterVisual}
                        alt="意思決定ダッシュボードのプレビュー"
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent" aria-hidden="true" />
                      <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3 rounded-2xl border border-white/15 bg-slate-950/85 p-4 backdrop-blur-md">
                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-slate-200/80">Real-Time Board</p>
                        <p className="text-sm leading-relaxed text-slate-100">
                          週次レビューで投資余力・粗利・在庫の動きを一望。経営会議の論点と根拠資料が同じ画面に揃います。
                        </p>
                        <p className="text-xs leading-relaxed text-slate-300/80">
                          AIがデータを集約し、診断士が妥当性を監査。意思決定の背景をチーム全体に共有できます。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl border border-primary/15 bg-white/95 p-6 shadow-[0_28px_90px_-50px_rgba(30,64,175,0.35)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">導入設計まで一気通貫</p>
                  <div className="mt-5 space-y-4">
                    {proofPoints.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex items-start gap-3">
                          <span className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{item.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="rounded-3xl border border-sky-200/70 bg-gradient-to-br from-sky-50/80 via-white to-blue-50/70 p-6 shadow-[0_32px_95px_-55px_rgba(56,189,248,0.55)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700/80">リアルタイムで把握できる指標</p>
                  <div className="mt-5 grid gap-4">
                    {aiVisualHighlights.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="group flex items-start gap-3 rounded-2xl border border-sky-200/60 bg-white/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                        >
                          <span className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{item.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 rounded-2xl border border-primary/15 bg-white/80 p-4 text-sm leading-relaxed text-muted-foreground shadow-inner">
                    週次レビューと月次アロケーションをひとつの意思決定ボードで共有。経営陣・財務・現場が同じ数値と根拠を見て迷いなく判断できます。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
