import ScrollReveal from "@/components/ScrollReveal";
import { Card } from "@/components/ui/card";
import { Check, ChevronDown, ShieldCheck, Star } from "lucide-react";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/ctaVariants";

const plans = [
  {
    name: "伴走スタンダード",
    summary: "毎日の数字と現場の声を揃えて意思決定の土台を整える",
    target: "年商数億円規模 / 管理部と営業責任者が兼務する企業",
    price: "180,000",
    features: [
      "月1回の訪問とオンラインで経営会議の型を設計",
      "部門別の損益と資金の動きを見える化する専用ダッシュボード",
      "受注・粗利・回転などの主要指標を週次レポートで共有",
      "金融機関向けの説明資料と対話シナリオを共創",
      "AI活用の基礎ワークショップを2回実施",
    ],
    outcomes: [
      "会議で使う数字と現場の状況が一目で揃い判断が速くなる",
      "金融機関との打ち合わせ準備がスムーズになり信頼感が高まる",
    ],
    subsidy: "金融機関ごとの注目点を整理し、モニタリング資料の更新リズムまで伴走",
    popular: false,
  },
  {
    name: "成長アクセラレート",
    summary: "投資判断と全社改善を並行させる指揮系統をつくる",
    target: "年商十数億円規模 / 管理部に専任1〜2名 / 仕組み強化に挑む企業",
    price: "280,000",
    features: [
      "月2回の経営会議支援と日々のチャットサポート",
      "需要予測や案件管理をAIで試しながら本番運用へ移行",
      "複数シナリオで資金計画と投資判断を並行管理",
      "採用・定着の指標設計と目標管理の伴走",
      "必要に応じて金融機関面談に同席し要点を整理",
    ],
    outcomes: [
      "中期計画と現場の動きが一本化され投資が迷いなく進む",
      "データに基づく議論が日常となり組織のまとまりが高まる",
    ],
    subsidy: "大型投資に備えた金融機関との対話設計と報告体制を共同で設計",
    popular: true,
  },
];

const comparisonPoints = [
  {
    label: "伴走頻度",
    starter: "月1回の経営会議設計と事前レビュー",
    premium: "月2回の経営会議支援と常時チャットサポート",
  },
  {
    label: "データ連携範囲",
    starter: "会計・販売・在庫データをテンプレで連携",
    premium: "基幹・施工・勤怠・顧客管理まで幅広く連携",
  },
  {
    label: "AI活用レベル",
    starter: "営業と資金のレポートをAIで月次提供",
    premium: "需要予測と案件スコアリングを日常運用",
  },
  {
    label: "金融機関連携",
    starter: "四半期ごとの面談資料更新と想定問答の共有",
    premium: "月次のモニタリングレポートと面談サマリーを共同作成",
  },
  {
    label: "人材・社内浸透",
    starter: "マニュアルと指標レビューのセットを提供",
    premium: "現場研修2回と目標管理の定着プログラム",
  },
  {
    label: "レポーティング",
    starter: "週次ダッシュボードと月次レビュー",
    premium: "週次ダッシュボードに加え経営陣・出資者向け報告",
  },
];

const PlansSection = () => {
  return (
    <section className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal as="div" variant="fade-up" className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:mb-6 md:text-5xl lg:text-6xl">料金プラン</h2>
            <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
              3ヶ月で基盤構築、6ヶ月で成果定着
            </p>
          </ScrollReveal>

          <div className="mb-10 grid gap-7 md:grid-cols-2">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.name} variant="fade-up" delay={index * 120} className="h-full">
                <Card
                  className={`relative p-6 shadow-card transition-smooth hover:shadow-elegant md:p-7 ${
                    plan.popular ? "border-2 border-primary" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      おすすめ
                    </div>
                  )}

                  <div className="mb-7 text-center">
                    <h3 className="mb-3 text-2xl font-bold text-foreground md:text-4xl">{plan.name}</h3>
                    <p className="mb-3 text-base leading-relaxed text-muted-foreground md:text-lg">{plan.summary}</p>
                    <p className="mb-4 text-sm font-bold uppercase tracking-wide text-primary md:mb-5 md:text-base">{plan.target}</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-primary md:text-7xl">¥{plan.price}</span>
                      <span className="text-base text-muted-foreground md:text-xl">/ 月</span>
                    </div>
                  </div>

                  <ul className="mb-7 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-primary md:h-7 md:w-7" />
                        <span className="text-sm text-muted-foreground md:text-lg">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-5 rounded-lg bg-muted/40 p-5 md:p-6">
                    <h4 className="mb-3 text-sm font-bold text-foreground md:text-base">成果の目安</h4>
                    <ul className="space-y-2.5">
                      {plan.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3 text-sm text-muted-foreground md:text-base">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary md:h-5 md:w-5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">{plan.subsidy}</p>

                  <p className="text-center text-sm text-muted-foreground">
                    詳細はページ下部の <span className="font-semibold text-primary">{PRIMARY_CTA.label}</span> からお問い合わせください。
                  </p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal as="div" variant="fade-up" delay={220} className="mb-12">
            <h3 className="mb-6 text-center text-2xl font-bold text-foreground md:mb-8">プラン比較</h3>

            <div className="space-y-3 md:hidden">
              {comparisonPoints.map((point) => (
                <details key={point.label} className="group rounded-2xl border border-primary/20 bg-white/90 p-4 shadow-card">
                  <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    {point.label}
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    <p>
                      <span className="mr-2 inline-flex min-w-[88px] justify-center rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                        スタンダード
                      </span>
                      {point.starter}
                    </p>
                    <p>
                      <span className="mr-2 inline-flex min-w-[88px] justify-center rounded-full bg-secondary/15 px-2 py-1 text-xs font-semibold text-secondary">
                        アクセラレート
                      </span>
                      {point.premium}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full overflow-hidden rounded-lg border border-border shadow-card">
                <thead className="bg-muted/60">
                  <tr>
                    <th className="w-1/5 px-6 py-4 text-left text-base font-bold text-foreground">項目</th>
                    <th className="px-6 py-4 text-left text-base font-bold text-foreground">スタンダード</th>
                    <th className="px-6 py-4 text-left text-base font-bold text-foreground">アクセラレート</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonPoints.map((point, index) => (
                    <tr key={point.label} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      <td className="px-6 py-5 align-top text-base font-semibold text-foreground">{point.label}</td>
                      <td className="px-6 py-5 text-base text-muted-foreground">{point.starter}</td>
                      <td className="px-6 py-5 text-base text-muted-foreground">{point.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <ScrollReveal as="div" variant="fade-up" delay={320} className="space-y-4 rounded-lg bg-card p-6 text-center shadow-card md:p-7">
            <p className="text-sm text-muted-foreground">
              ※ アプリ開発費用は無料（顧問料内で提供）
            </p>
            <p className="text-sm text-muted-foreground">
              ※ 初回相談は無料・守秘義務契約の上対応いたします
            </p>
            <p className="text-sm text-muted-foreground">
              ※ 地方銀行・信金との連携実績に基づき、面談準備からフォローまで伴走します
            </p>
            <div className="grid gap-5 pt-4 text-left lg:grid-cols-[1fr_1.2fr]">
              <Card className="border-primary/30 bg-muted/40 shadow-none">
                <div className="flex flex-col gap-4 p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">伴走品質保証</p>
                      <p className="text-xs text-muted-foreground">
                        安心して導入いただけるよう約束します
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
                    <li>3か月以内に合意した指標が期待水準に届かない場合、顧問料を返金または次月分を無料にします。</li>
                    <li>キックオフで共有した優先指標の推移と改善行動が確認できることを条件とします。</li>
                    <li>一緒に振り返りを行い、次の打ち手まで丁寧に整えてから終了します。</li>
                  </ul>
                </div>
              </Card>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  成果測定は初回キックオフで合意した指標を基に行います。現状の把握と改善目標、測定方法を整理した「成果コミットメントシート」を作成し共有します。
                </p>
                <p>
                  万一目標に届かない場合は返金または次月無料のいずれかをお選びいただけます。経営者の覚悟と歩調を合わせ、安心して改善サイクルを回し続けられるように設計しています。
                </p>
              </div>
            </div>
            <p className="pt-5 text-center text-sm text-muted-foreground">
              {SECONDARY_CTA.label} または <span className="font-semibold text-primary">{PRIMARY_CTA.label}</span> からご連絡いただくと、金融機関との対話設計や面談準備の進め方をご提案します。
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
