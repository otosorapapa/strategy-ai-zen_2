import { ArrowUpRight, Clock3, DollarSign, LineChart, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const benefitLinks = [
  {
    icon: Clock3,
    title: "経営者の時間を削減",
    description:
      "AIが会議資料と判断材料を自動生成し、週あたり8〜12時間の意思決定工数を削減。リアルタイム分析で即断に集中できます。",
    href: "#case-studies",
    anchorLabel: "時短事例を見る",
  },
  {
    icon: LineChart,
    title: "意思決定の確度を上げる",
    description:
      "現場データと財務指標を秒で統合し、粗利・在庫・需要シナリオを比較。AIレポートが最適施策と根拠を提示します。",
    href: "#ai-simulator",
    anchorLabel: "AIシミュレーターへ",
  },
  {
    icon: DollarSign,
    title: "資金繰りを改善",
    description:
      "キャッシュフロー予測と借入計画を同じ画面で管理し、資金ショート確率と打ち手をAIが優先順位付きで提示します。",
    href: "#cta-section",
    anchorLabel: "無料診断を予約",
  },
  {
    icon: ShieldCheck,
    title: "補助金・調達を支援",
    description:
      "成長投資や補助金申請に必要なKPIを整備し、申請書ドラフトと審査想定問答をAIが自動作成。採択率向上を後押しします。",
    href: "#resources",
    anchorLabel: "申請テンプレートを見る",
  },
] as const;

const ExecutiveBenefitsQuickLinks = () => {
  return (
    <section className="relative -mt-6 bg-white/95 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"> 
      <div className="container mx-auto px-4">
        <ScrollReveal as="div" className="mx-auto max-w-4xl text-center" variant="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            KEY BENEFITS
          </span>
          <h2 className="mt-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            生成AIが経営の意思決定を前倒しする4つのメリット
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            まずは最重要な成果を把握し、気になる領域の詳細セクションへショートカットできます。
          </p>
        </ScrollReveal>

        <div className="mt-8 md:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {benefitLinks.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article
                  key={benefit.title}
                  className="min-w-[240px] snap-start rounded-3xl border border-primary/15 bg-white/95 p-5 shadow-card"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
                  <a
                    href={benefit.href}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary"
                  >
                    {benefit.anchorLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 hidden gap-6 md:grid lg:grid-cols-4">
          {benefitLinks.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <ScrollReveal
                key={benefit.title}
                as="article"
                delay={index * 90}
                variant="fade-up"
                className="group flex h-full flex-col gap-4 rounded-3xl border border-primary/15 bg-gradient-to-br from-white via-primary/5 to-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{benefit.description}</p>
                <a
                  href={benefit.href}
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-primary/80"
                >
                  {benefit.anchorLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveBenefitsQuickLinks;
