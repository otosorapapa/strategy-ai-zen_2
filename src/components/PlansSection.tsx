import { forwardRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Card } from "@/components/ui/card";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  ChevronDown,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/ctaVariants";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "伴走スタンダード",
    summary: "管理会計と資金繰りの基盤づくりを3ヶ月で固める",
    target: "年商3〜8億円 / 管理部と営業責任者が兼務している企業",
    price: "180,000",
    insight: "粗利とキャッシュの同時改善で投資余力を確保",
    metrics: [
      { label: "平均ROI", value: "3.6x" },
      { label: "改善スピード", value: "90日" },
      { label: "推奨期間", value: "6ヶ月" },
    ],
    features: [
      "月1回のハイブリッド伴走（訪問+オンライン）",
      "部門別損益と資金繰り表の可視化テンプレート構築",
      "粗利・回転・受注の主要KPIモニタリング（週次）",
      "金融機関向け説明資料と面談想定問答の整備",
      "AI活用ミニワークショップ（全2回）",
    ],
    outcomes: [
      "粗利率+5pt、回収サイト▲12日（導入3ヶ月平均）",
      "金融機関連携の事前準備時間を60%削減",
    ],
    subsidy: "金融機関ごとの着眼点を整理し、モニタリング資料の更新スケジュールを設計",
    popular: false,
    ctaLabel: "スタンダードで相談する",
  },
  {
    name: "成長アクセラレート",
    summary: "AIと伴走PMOで全社の改善と新規投資を同時推進",
    target: "年商8〜15億円 / 管理部に専任1〜2名 / DXを本格化したい企業",
    price: "280,000",
    insight: "投資判断と現場オペレーションをデータで一体化",
    metrics: [
      { label: "平均ROI", value: "5.2x" },
      { label: "投資意思決定まで", value: "45日" },
      { label: "推奨期間", value: "9ヶ月" },
    ],
    features: [
      "月1回の経営会議・Slack等伴走（訪問+オンライン）",
      "AI需要予測・案件管理のPoCと本番運用設計",
      "キャッシュフローシナリオと投資回収計画の複線管理",
      "人材採用・定着支援のKPI設計とOKR運用",
      "必要に応じた金融機関面談の同席とフォローアップサマリー作成",
    ],
    outcomes: [
      "売上成長率+12pt、EBITDAマージン+3.8pt（導入6ヶ月平均）",
      "AI活用案件の定着率87%、年間1,200時間の工数削減",
    ],
    subsidy: "大型投資に向けた金融機関交渉シナリオとレポーティング体制を共同設計",
    popular: true,
    ctaLabel: "アクセラレートで相談する",
  },
];

const comparisonPoints = [
  {
    label: "伴走頻度",
    starter: "月1回（経営会議の事前レビュー含む）",
    premium: "月2回＋Slack/Teams常時サポート",
  },
  {
    label: "データ連携範囲",
    starter: "会計・販売・在庫データのテンプレ連携",
    premium: "基幹/施工/勤怠/CRMまでフル連携",
  },
  {
    label: "AI活用レベル",
    starter: "営業・資金繰りのAIレポートを月次提供",
    premium: "需要予測・案件スコアリングをリアルタイム運用",
  },
  {
    label: "金融機関連携",
    starter: "四半期ごとの面談資料アップデートと想定問答の共有",
    premium: "月次のモニタリングレポートと面談サマリーの共同作成",
  },
  {
    label: "人材/社内浸透",
    starter: "マニュアルとKPIレビューのセット提供",
    premium: "現場研修2回＋OKR運用と人材定着プログラム",
  },
  {
    label: "レポーティング",
    starter: "週次ダッシュボードと月次レビュー",
    premium: "週次ダッシュボード＋経営陣報告書＋投資家向けサマリー",
  },
];

const trustStats = [
  { label: "契約継続率", value: "92%" },
  { label: "投資回収の平均期間", value: "2.3ヶ月" },
  { label: "経営陣満足度スコア", value: "4.8 / 5.0" },
];

const executiveSignals = [
  {
    title: "経営課題の優先度設計",
    description:
      "経営会議・金融機関・現場チームの認識ギャップを1枚のマップで統合し、投資判断を支援します。",
    icon: Layers,
  },
  {
    title: "AI活用の実装ライン",
    description:
      "既存システムとAPI連携し、現場に合わせたオートメーションとレポーティングを最短4週間で構築します。",
    icon: Cpu,
  },
  {
    title: "経営可視化と意思決定速度",
    description:
      "KPIとキャッシュフローを同じダッシュボードでモニタリングし、投資回収シナリオを複線管理します。",
    icon: BarChart3,
  },
];

const assurancePoints = [
  "オンボーディング週次レビューで進捗とROIの仮説検証を共同設計",
  "Slack/Teamsの専用チャンネルで24時間以内にエスカレーション対応",
  "経営・金融・組織開発の専門チームがKPIとリスクを四半期ごとに監査",
];

type PlansSectionProps = {
  id?: string;
  className?: string;
  onOpenPricingModal?: () => void;
};

const PlansSection = forwardRef<HTMLElement, PlansSectionProps>(
  ({ id = "pricing", className, onOpenPricingModal }, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative overflow-hidden bg-slate-950 py-24 text-slate-100", className)}
      aria-labelledby="pricing-heading"
    >
      <div className="absolute inset-0">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-primary/40 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[26rem] w-[26rem] rounded-full bg-secondary/30 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.25),_transparent_55%)]" />
      </div>

      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal as="div" variant="fade-up" className="mb-12 text-center">
              <div className="mb-5 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Executive Pricing Suite
              </div>
              <h2 id="pricing-heading" className="mb-6 text-3xl font-bold leading-tight text-white md:mb-7 md:text-5xl lg:text-6xl">
                伴走型AI経営支援の料金プラン
              </h2>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                CFO/COOの意思決定を加速し、資金繰り・成長投資・人材戦略を一つのダッシュボードに統合。年商5,000万円〜15億円企業に特化した設計で、導入3ヶ月以内の成果コミットメントをお約束します。
              </p>
            </ScrollReveal>

            <ScrollReveal as="div" variant="fade-up" delay={120} className="mb-14">
              <div className="flex flex-col items-center gap-6">
                <div className="grid w-full gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:grid-cols-3">
                  {trustStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center justify-center gap-2 text-center md:items-start md:text-left"
                    >
                      <span className="text-3xl font-bold text-white md:text-4xl">{stat.value}</span>
                      <span className="text-sm font-semibold uppercase tracking-wide text-primary/70">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {onOpenPricingModal && (
                  <div className="flex flex-col items-center gap-3 text-sm text-slate-300 md:flex-row md:gap-4">
                    <button
                      type="button"
                      onClick={onOpenPricingModal}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      詳細な料金表を見る
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="text-xs uppercase tracking-[0.3em] text-primary/60 md:text-left">
                      ROIシミュレーションと支援スコープをPDFで確認
                    </span>
                  </div>
                )}
              </div>
            </ScrollReveal>

            <div className="relative mb-12 grid gap-8 md:grid-cols-2">
              {plans.map((plan, index) => (
                <ScrollReveal key={plan.name} variant="fade-up" delay={index * 140} className="h-full">
                  <Card
                    className={`relative flex h-full flex-col justify-between overflow-hidden border-white/10 bg-slate-900/50 p-7 shadow-[0_32px_120px_rgba(15,23,42,0.45)] transition duration-500 hover:-translate-y-1 hover:border-primary/60 hover:bg-slate-900/70 hover:shadow-[0_38px_150px_rgba(14,116,144,0.45)] md:p-8 ${
                      plan.popular ? "ring-2 ring-primary/80" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground shadow-lg">
                        <Star className="h-4 w-4" />
                        Most Chosen
                      </div>
                    )}

                    <div className="mb-8 space-y-6">
                      <div className="pt-6">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary/70">{plan.target}</p>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-3xl font-bold text-white md:text-4xl">{plan.name}</h3>
                            <p className="mt-3 text-base leading-relaxed text-slate-300 md:text-lg">{plan.summary}</p>
                          </div>
                          <div className="rounded-2xl bg-white/10 px-4 py-3 text-right text-white shadow-inner">
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">月額</p>
                            <div className="flex items-baseline gap-1">
                              <span className="text-3xl font-bold md:text-4xl">¥{plan.price}</span>
                              <span className="text-xs text-slate-400">(税別)</span>
                            </div>
                          </div>
                        </div>
                        <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          {plan.insight}
                        </p>
                      </div>

                      <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm sm:grid-cols-3">
                        {plan.metrics.map((metric) => (
                          <div key={metric.label} className="flex flex-col gap-1 text-center">
                            <span className="text-xl font-semibold text-white md:text-2xl">{metric.value}</span>
                            <span className="text-xs uppercase tracking-wide text-slate-400">{metric.label}</span>
                          </div>
                        ))}
                      </div>

                      <ul className="space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm text-slate-200 md:text-base">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary">
                              <Check className="h-4 w-4" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="space-y-3 rounded-2xl border border-white/5 bg-white/[0.03] p-5">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-primary/70">導入後3〜6ヶ月の成果指標</h4>
                        <ul className="space-y-2 text-sm text-slate-200 md:text-base">
                          {plan.outcomes.map((outcome) => (
                            <li key={outcome} className="flex items-start gap-2">
                              <ArrowUpRight className="mt-1 h-4 w-4 text-primary" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="rounded-2xl border border-dashed border-primary/40 bg-primary/10 p-4 text-sm leading-relaxed text-primary/90">
                        {plan.subsidy}
                      </p>
                    </div>

                    <div className="mt-auto flex flex-col gap-3">
                      <a
                        href={`#${PRIMARY_CTA.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-primary hover:text-primary-foreground"
                      >
                        {plan.ctaLabel}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <p className="text-center text-xs text-slate-400">
                        ご契約前にリスクとROIシナリオを無料でシミュレーションいたします。
                      </p>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal as="div" variant="fade-up" delay={220} className="mb-14">
              <h3 className="mb-6 text-center text-2xl font-bold text-white md:mb-8">プラン比較</h3>

              <div className="space-y-3 md:hidden">
                {comparisonPoints.map((point) => (
                  <details key={point.label} className="group rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-inner">
                    <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                      {point.label}
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                      <p>
                        <span className="mr-2 inline-flex min-w-[88px] justify-center rounded-full bg-primary/20 px-2 py-1 text-xs font-semibold text-primary-foreground">
                          スタンダード
                        </span>
                        {point.starter}
                      </p>
                      <p>
                        <span className="mr-2 inline-flex min-w-[88px] justify-center rounded-full bg-secondary/25 px-2 py-1 text-xs font-semibold text-secondary">
                          アクセラレート
                        </span>
                        {point.premium}
                      </p>
                    </div>
                  </details>
                ))}
              </div>

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="w-1/5 px-6 py-5 text-left text-sm font-semibold uppercase tracking-widest text-slate-300">
                        項目
                      </th>
                      <th className="px-6 py-5 text-left text-base font-semibold text-white">スタンダード</th>
                      <th className="px-6 py-5 text-left text-base font-semibold text-white">アクセラレート</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonPoints.map((point, index) => (
                      <tr key={point.label} className={index % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.06]"}>
                        <td className="px-6 py-5 align-top text-base font-semibold text-white">{point.label}</td>
                        <td className="px-6 py-5 text-base text-slate-300">{point.starter}</td>
                        <td className="px-6 py-5 text-base text-slate-300">{point.premium}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>

            <ScrollReveal as="div" variant="fade-up" delay={320} className="space-y-12 rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-[0_24px_120px_rgba(15,23,42,0.65)] backdrop-blur md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-widest text-primary/70">返金・成果保証</p>
                      <p className="text-xl font-semibold text-white">成果未達時のリスクを徹底的にゼロへ</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm leading-relaxed text-slate-200 md:text-base">
                    <li>
                      3か月以内に以下のいずれかの成果が未達の場合、顧問料を全額返金または次月無料。
                    </li>
                    <li>
                      ・キックオフで設定した主要KPI（売上成長率 or 粗利率 or 受注率）が既定の目標値（前月比+5% / 粗利率+3pt / 受注率+8pt）に届かない。
                    </li>
                    <li>
                      ・週次モニタリングレポートと改善アクションの実行状況を共有いただいた場合に適用。
                    </li>
                  </ul>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary/70">
                      <TrendingUp className="h-4 w-4" />
                      エグゼクティブ向けオペレーティングモデル
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-200 md:text-base">
                      {assurancePoints.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <ArrowUpRight className="mt-1 h-4 w-4 text-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-primary/70">導入の進め方</h4>
                    <p className="text-sm text-slate-200 md:text-base">
                      成果測定は初回キックオフで御社と合意したKPIを元に行います。現状値をヒアリングし、改善目標と測定方法を明文化した「成果コミットメントシート」を作成して共有します。
                    </p>
                    <p className="text-sm text-slate-200 md:text-base">
                      目標未達の場合は返金または次月無料のいずれかをお選びいただけます。万一の際もリスクなく改善サイクルを継続いただけるようご用意しています。
                    </p>
                  </div>

                  <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <h4 className="text-sm font-semibold uppercase tracking-widest text-primary/70">エグゼクティブが評価する理由</h4>
                    <div className="space-y-5">
                      {executiveSignals.map(({ icon: Icon, title, description }) => (
                        <div key={title} className="flex gap-4">
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-base font-semibold text-white">{title}</p>
                            <p className="mt-1 text-sm text-slate-300 md:text-base">{description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-white/20 bg-white/[0.02] p-6 text-center text-sm text-slate-300">
                ※ アプリ開発費用は無料（顧問料内で提供） / 初回相談は無料・守秘義務契約の上対応 / 地方銀行・信金との連携実績に基づき、面談準備からフォローまで伴走します。
                <br className="hidden md:block" />
                {SECONDARY_CTA.label} または <span className="font-semibold text-primary">{PRIMARY_CTA.label}</span> からご連絡いただくと、金融機関との対話設計や面談準備の進め方をご提案します。
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
});

PlansSection.displayName = "PlansSection";

export default PlansSection;
