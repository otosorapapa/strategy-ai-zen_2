import {
  TrendingUp,
  DollarSign,
  Target,
  Quote,
  LineChart,
  Timer,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import growthChart from "@/assets/growth-chart.jpg";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useParallax } from "@/hooks/useParallax";
import { cn } from "@/lib/utils";

const results = [
  {
    icon: TrendingUp,
    industry: "建材卸（年商9.2億円）",
    company: "K.M.社",
    logoInitials: "KM",
    person: "代表取締役 Y.H.さま",
    challenge: "商談情報が担当者の頭にあり、粗利の高い案件ほど値引きで失注。",
    approach: "営業日報と受発注データをAIが学習し、顧客属性×提案シナリオを標準化。",
    outcome: "3ヶ月で粗利率が19%→26%に改善し、受注単価が14%向上。",
    improvement: "+7pt",
    duration: "着手から13週",
    metricLabel: "粗利率",
    beforeValue: 19,
    afterValue: 26,
    unit: "%",
    chartMax: 30,
    quote: "属人化していた見積の根拠が数字で共有できるようになりました。",
    roiLabel: "受注単価 +14%",
    roiClass: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: DollarSign,
    industry: "食品製造（年商8.5億円）",
    company: "T.F.社",
    logoInitials: "TF",
    person: "代表取締役 Y.A.さま",
    challenge: "需要予測のばらつきで過剰在庫と欠品が同時発生、廃棄コストが増加。",
    approach: "POS・受注・天候データをAIが予測モデル化し、週次の生産計画を自動生成。",
    outcome: "在庫回転率は1.1→2.1倍、廃棄コストは55%削減。",
    improvement: "+1.0倍",
    duration: "導入4ヶ月",
    metricLabel: "在庫回転率",
    beforeValue: 1.1,
    afterValue: 2.1,
    unit: "倍",
    chartMax: 2.5,
    quote: "AIの提案理由が日本語で表示されるので、現場が納得して修正できます。",
    roiLabel: "廃棄コスト -55%",
    roiClass: "bg-sky-100 text-sky-700",
  },
  {
    icon: Target,
    industry: "建設業（年商9.8億円）",
    company: "S.K.社",
    logoInitials: "SK",
    person: "代表取締役 T.R.さま",
    challenge: "原価進捗が月末にしか分からず、金融機関への説明資料作成に追われていた。",
    approach: "工程管理と会計をリアルタイム連携し、AIが出来高と原価乖離を自動判定。",
    outcome: "見積原価乖離率を18%→6%に抑制し、資料作成時間を70%削減。",
    improvement: "▲12pt",
    duration: "6ヶ月伴走",
    metricLabel: "原価乖離率",
    beforeValue: 18,
    afterValue: 6,
    unit: "%",
    chartMax: 20,
    quote: "キャッシュの見通しが早期に分かり、銀行との対話が攻めに転じました。",
    roiLabel: "資料作成 -70%",
    roiClass: "bg-amber-100 text-amber-700",
  },
  {
    icon: LineChart,
    industry: "アパレルEC（年商5.4億円）",
    company: "H.N.社",
    logoInitials: "HN",
    person: "代表取締役 M.I.さま",
    challenge: "広告チャネルごとのROIが不透明で、在庫と広告の両面でムダな投資が発生。",
    approach: "販売・広告・顧客データを統合し、AIがLTV予測にもとづく入札調整を自動化。",
    outcome: "広告ROIが1.4→2.6倍に改善し、在庫過多商品を30%圧縮。",
    improvement: "+1.2倍",
    duration: "ローンチ後3ヶ月",
    metricLabel: "広告ROI",
    beforeValue: 1.4,
    afterValue: 2.6,
    unit: "倍",
    chartMax: 3,
    quote: "AIの入札調整結果が説明付きで提示され、チーム連携がスムーズに。",
    roiLabel: "ROI 2.6倍",
    roiClass: "bg-violet-100 text-violet-700",
  },
];

const decisionImpacts = [
  {
    label: "経営会議準備",
    before: 210,
    after: 90,
    unit: "分/週",
    description: "生成AIが会議の論点・損益とキャッシュへの波及・推奨シナリオを事前に組み立て、経営陣は例外確認と意思選択に集中",
  },
  {
    label: "資金繰り更新",
    before: 120,
    after: 35,
    unit: "分/週",
    description: "入出金予測と借入条件を自動同期し、AIがキャッシュリスクの確率と優先すべき打ち手を提示するため承認プロセスだけで完了",
  },
  {
    label: "レポート共有",
    before: 180,
    after: 40,
    unit: "分/月",
    description: "furumachi-smec.lognowa.com のテンプレートを基盤に、生成AIが数値の意図と意思決定の示唆をストーリー仕立てで解説",
  },
];

const aggregateHighlights = [
  {
    label: "平均粗利率改善",
    value: 6.7,
    suffix: "pt",
    description: "生成AIが案件別粗利と在庫を照合し、勝ち筋の価格戦略を提案",
    decimals: 1,
  },
  {
    label: "年間削減した単純作業",
    value: 1200,
    suffix: "時間",
    description: "レポート作成と会議アジェンダを自動化し、意思決定に専念",
  },
  {
    label: "平均ROI",
    value: 2.3,
    suffix: "倍",
    description: "マーケ・営業・製造のAIシナリオ検証で投資対効果を最大化",
    decimals: 1,
  },
];

const ResultCard = ({ result, index }: { result: (typeof results)[number]; index: number }) => {
  const Icon = result.icon;
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>({ threshold: 0.25 });

  const beforeDecimals = Number.isInteger(result.beforeValue) ? 0 : result.beforeValue.toString().split(".")[1]?.length ?? 0;
  const afterDecimals = Number.isInteger(result.afterValue) ? 0 : result.afterValue.toString().split(".")[1]?.length ?? 0;
  const beforeHeight = Math.max((result.beforeValue / result.chartMax) * 100, 12);
  const afterHeight = Math.max((result.afterValue / result.chartMax) * 100, 18);

  return (
    <Card
      ref={ref}
      className={cn(
        "rounded-3xl border border-border/70 bg-card/90 p-8 shadow-card transition-all duration-700 ease-out",
        "hover:-translate-y-1 hover:shadow-elegant",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/80 text-primary font-bold text-xl shadow-inner">
              {result.logoInitials}
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary/80 mb-1">{result.industry}</p>
              <h3 className="text-2xl font-bold text-foreground mb-1">{result.company}</h3>
              <p className="text-base text-muted-foreground">{result.person}</p>
            </div>
          </div>
          <div className="inline-flex items-center justify-center self-start rounded-xl bg-primary/10 p-4 text-primary shadow-sm">
            <Icon className="h-8 w-8" />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold tracking-wide uppercase text-muted-foreground mb-2">課題</p>
              <p className="text-lg text-muted-foreground leading-relaxed">{result.challenge}</p>
            </div>
            <div>
              <p className="text-sm font-bold tracking-wide uppercase text-muted-foreground mb-2">AI活用</p>
              <p className="text-lg text-muted-foreground leading-relaxed">{result.approach}</p>
            </div>
            <div>
              <p className="text-sm font-bold tracking-wide uppercase text-muted-foreground mb-2">成果</p>
              <p className="text-xl font-bold text-primary leading-relaxed">{result.outcome}</p>
              <p className="text-base text-muted-foreground mt-2">{result.duration}</p>
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-border/60 bg-secondary/60 p-6 shadow-inner">
            <div className="flex items-center justify-between gap-3">
              <p className="text-base font-bold uppercase tracking-wide text-muted-foreground">Before → After</p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/15 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                  {result.improvement}
                </span>
                <span className={`inline-flex items-center rounded-full px-4 py-1 text-sm font-semibold ${result.roiClass}`}>
                  {result.roiLabel}
                </span>
              </div>
            </div>
            <p className="text-lg font-semibold text-foreground">{result.metricLabel}</p>
            <div className="flex flex-col gap-5">
              <div className="flex h-56 items-end justify-around gap-6 rounded-2xl bg-white/80 p-4">
                <div className="flex h-full w-20 flex-col items-center justify-end gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Before</span>
                  <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-full bg-muted">
                    <div
                      className="w-full rounded-full bg-muted-foreground/60"
                      style={{
                        height: isVisible ? `${beforeHeight}%` : "0%",
                        transition: `height 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${0.12 + index * 0.04}s`,
                      }}
                    />
                  </div>
                  <AnimatedCounter
                    value={result.beforeValue}
                    decimals={beforeDecimals}
                    suffix={result.unit}
                    className="text-sm font-semibold text-muted-foreground"
                  />
                </div>
                <div className="flex h-full w-20 flex-col items-center justify-end gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">After</span>
                  <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-full bg-primary/10">
                    <div
                      className="w-full rounded-full bg-primary"
                      style={{
                        height: isVisible ? `${afterHeight}%` : "0%",
                        transition: `height 1s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + index * 0.05}s`,
                      }}
                    />
                  </div>
                  <AnimatedCounter
                    value={result.afterValue}
                    decimals={afterDecimals}
                    suffix={result.unit}
                    className="text-sm font-semibold text-primary"
                  />
                </div>
              </div>
              <p className="rounded-2xl border border-primary/20 bg-white/90 p-3 text-xs leading-relaxed text-muted-foreground">
                AIが施策のROIやキャッシュインパクトを色分けで可視化し、経営会議での意思決定を短時間で完了させました。
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-white/70 p-6">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <Quote className="h-5 w-5" />
            <span className="text-sm font-bold tracking-wide uppercase">Voice</span>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">{result.quote}</p>
        </div>
      </div>
    </Card>
  );
};

const ResultsSection = () => {
  const { ref: chartRef, style: chartStyle } = useParallax<HTMLDivElement>({ intensity: 0.2, maxTranslate: 16 });
  const { ref: chartRevealRef, isVisible: chartVisible } = useRevealOnScroll<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className="py-20 bg-white" id="case-studies">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Results</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-4">
            生成AIが意思決定時間を創出した4つのストーリー
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            furumachi-smec.lognowa.com のデモと同じワークフローを導入し、営業・製造・建設・ECの判断スピードを高めた実例です。
            いずれの案件でもAIが選択肢と根拠を提示し、最終判断は経営陣が担うOECD推奨の協働スタイルを徹底しています。
          </p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="relative">
          <div className="pointer-events-none absolute inset-y-6 left-0 hidden w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-white via-white/90 to-transparent shadow-[10px_0_40px_rgba(15,23,42,0.08)] md:flex">
            <ArrowLeft className="h-5 w-5 text-muted-foreground/70" />
          </div>
          <div className="pointer-events-none absolute inset-y-6 right-0 hidden w-16 items-center justify-center rounded-3xl bg-gradient-to-l from-white via-white/90 to-transparent shadow-[-10px_0_40px_rgba(15,23,42,0.08)] md:flex">
            <ArrowRight className="h-5 w-5 text-muted-foreground/70" />
          </div>
          <CarouselContent>
            {results.map((result, index) => (
              <CarouselItem key={result.company} className="md:basis-1/2 lg:basis-2/3 xl:basis-1/2">
                <ResultCard result={result} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6 hidden md:flex" />
          <CarouselNext className="-right-6 hidden md:flex" />
        </Carousel>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground md:hidden">
          <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-white/90 px-4 py-2 shadow-sm">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium tracking-wide">スワイプで他の事例を見る</span>
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>

        <div
          ref={chartRevealRef}
          className={cn(
            "mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] items-center rounded-[32px] border border-primary/20 bg-primary/5 p-7 shadow-card transition-all duration-700 ease-out",
            chartVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
          )}
        >
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <Timer className="h-4 w-4" />
              TIME TO DECIDE
            </div>
            <h3 className="text-3xl font-bold text-primary">意思決定時間の短縮効果</h3>
            <p className="text-sm text-primary/80">
              生成AIが管理会計ダッシュボードと結びつき、論点抽出・利益インパクト・資金影響をワンビューで提示。判断材料が同じ土台
              にそろうことで、経営陣は意思決定の質を落とさずに判断までの時間を圧縮できます。
            </p>
            <div className="rounded-2xl border border-white/80 bg-white/90 p-4">
              <img
                src={growthChart}
                alt="意思決定時間の短縮チャート"
                ref={chartRef}
                style={chartStyle}
                className="w-full rounded-xl object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {decisionImpacts.map((impact) => (
                <div key={impact.label} className="rounded-2xl border border-primary/30 bg-white/90 p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{impact.label}</p>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Before</span>
                      <AnimatedCounter value={impact.before} suffix={impact.unit} className="font-semibold" />
                    </div>
                    <div className="flex items-center justify-between text-primary font-bold">
                      <span>After</span>
                      <AnimatedCounter value={impact.after} suffix={impact.unit} className="font-bold text-primary" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{impact.description}</p>
                </div>
              ))}
            </div>
            <p className="rounded-2xl border border-primary/30 bg-white/90 p-6 text-sm leading-relaxed text-muted-foreground">
              主要KPIと意思決定時間は初回相談で定義し、週次レポートでモニタリング。粗利率は平均+6.7pt、キャッシュ創出は+1.4億円を達成し、意思決定のスピードと納得感を同時に引き上げています。
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-[32px] border border-primary/25 bg-gradient-to-br from-white via-sky-50 to-emerald-50/60 p-8 shadow-card">
          <div className="mb-6 flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">CUMULATIVE IMPACT</p>
              <h3 className="text-3xl font-bold text-foreground md:text-4xl">生成AI導入後の累積インフォグラフィック</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground md:max-w-sm">
              3ヶ月の伴走で創出された成長余力と時間価値をグラフィック化。投資対効果と経営インパクトを一目で把握できます。
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {aggregateHighlights.map((highlight, index) => (
              <div
                key={highlight.label}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-primary/15 bg-white/90 p-6 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-elegant"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">{highlight.label}</p>
                <AnimatedCounter
                  value={highlight.value}
                  suffix={highlight.suffix}
                  decimals={highlight.decimals}
                  duration={1100}
                  className="text-4xl font-black text-primary"
                />
                <p className="text-sm leading-relaxed text-muted-foreground">{highlight.description}</p>
                <div className="mt-auto h-1 rounded-full bg-gradient-to-r from-primary via-accent to-secondary" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
