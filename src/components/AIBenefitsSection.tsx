import { BrainCircuit, FileText, LineChart, PiggyBank } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const features = [
  {
    icon: BrainCircuit,
    title: "AI分析",
    description:
      "議事録・販売・会計データを生成AIが解析し、粗利とキャッシュの異常値をリアルタイム通知。経営課題ごとの解決シナリオと期待利益まで提示します。",
    benefit: "利益創出までのリードタイム -45%",
  },
  {
    icon: LineChart,
    title: "管理会計ノウハウ",
    description:
      "部門別KPIとキャッシュドライバーを整備し、生成AIが提案する打ち手を定量評価。数字が共通言語になり、議論が戦略に直結します。",
    benefit: "粗利改善シナリオ 12本自動提案",
  },
  {
    icon: PiggyBank,
    title: "資金繰り改善",
    description:
      "入出金予定を自動同期し、生成AIが複数の投資・資金繰りシナリオをシミュレーション。資金ショートの確率や投資余力が一目で分かります。",
    benefit: "キャッシュ予測誤差 -60%",
  },
  {
    icon: FileText,
    title: "金融機関連携",
    description:
      "金融機関ごとの論点に沿って決算説明のストーリーを整理し、面談資料や議事メモを自動生成。借入条件や約定確認のフォローが効率化されます。",
    benefit: "面談準備と議事作成時間 -40%",
  },
];

const timeSavings = [
  { label: "導入前", minutes: 210 },
  { label: "生成AI意思決定OS", minutes: 45 },
  { label: "データ駆動経営", minutes: 10 },
];

const outcomeHighlights = [
  "利益設計：生成AIが顧客・商品別の粗利シナリオを自動生成し、勝ち筋投資を加速",
  "リスク制御：キャッシュ不足の確率と要因を可視化し、予防策を即決定",
  "戦略実行：AIが行動計画と進捗レビューを提示し、現場が自律的に動く",
];

const automationFlow = [
  {
    step: "1",
    title: "課題の棚卸し",
    detail: "売上停滞・資金繰り不安・時間不足をワークショップで可視化し、AIに学習させるデータ構造を整理",
  },
  {
    step: "2",
    title: "AI×管理会計設計",
    detail: "データ連携とKPI整備を同時に行い、AI分析が示す打ち手を定量評価するフレームを構築",
  },
  {
    step: "3",
    title: "成果の定着",
    detail: "週次レビューで粗利・キャッシュの変化を確認し、AIが提案する施策を高速に検証",
  },
];

const TimeSavingRow = ({ item, index }: { item: (typeof timeSavings)[number]; index: number }) => {
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>({ threshold: 0.3 });
  const width = Math.max(20, (item.minutes / 240) * 100);

  return (
    <div
      ref={ref}
      className="space-y-2 rounded-2xl bg-white/70 p-4 shadow-sm transition-all duration-700 ease-out"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center justify-between text-[0.95rem] font-semibold uppercase tracking-[0.28em] text-secondary-foreground/70">
        <span>{item.label}</span>
        <AnimatedCounter value={item.minutes} suffix="分" duration={900} className="text-secondary-foreground" />
      </div>
      <div className="h-3 rounded-full bg-secondary/15">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-secondary via-primary to-accent transition-all duration-700 ease-out"
          style={{ width: isVisible ? `${width}%` : "0%" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

const AIBenefitsSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/70 to-white py-16">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" aria-hidden="true" />
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center">
          <div className="space-y-6">
            <ScrollReveal className="space-y-4" variant="fade">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-[0.95rem] font-semibold uppercase tracking-[0.3em] text-primary">
                <BrainCircuit className="h-4 w-4" aria-hidden="true" />
                生成AIの即効性
              </span>
              <h2 className="text-3xl font-bold leading-snug text-foreground md:text-4xl">
                <span className="serif-accent">生成AIが「利益の見える化→施策判断→実行管理」を一気通貫で支える</span>
              </h2>
              <ul className="list-disc space-y-2 pl-5 text-lg leading-relaxed text-muted-foreground">
                <li>経営会議や現場のオペレーションに生成AIを組み込み、判断材料の収集からシナリオ比較、打ち手の落とし込みまでを短時間で完結</li>
                <li>粗利改善とキャッシュ創出のサイクルを前倒し</li>
                <li>意思決定を未来志向に転換</li>
              </ul>
              <ScrollReveal
                className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-card"
                delay={120}
                variant="fade-up"
              >
                <h3 className="text-xl font-semibold text-foreground">地方製造業での生成AI導入ストーリー</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                  営業担当が日報を入力すると、生成AIが受発注データと突き合わせて利益インパクトを算出。翌朝には顧客別の提案書と投資対効果の試算が届き、社長は最適シナリオを選ぶだけで施策が走り出します。その結果、粗利率は19%から26%へ改善し、役員会は成長投資の検討に時間を割けるようになりました。
                </p>
              </ScrollReveal>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <ScrollReveal
                    key={feature.title}
                    as="article"
                    delay={index * 90}
                    className="flex h-full flex-col gap-4 rounded-3xl border border-primary/15 bg-gradient-to-br from-white via-white to-primary/5 p-6 shadow-card"
                  >
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{feature.description}</p>
                    <p className="mt-auto inline-flex items-center justify-start rounded-full bg-primary/10 px-4 py-2 text-[0.9rem] font-semibold text-primary">
                      {feature.benefit}
                    </p>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <ScrollReveal className="rounded-3xl border border-secondary/30 bg-secondary/5 p-7 shadow-card" variant="fade">
              <h3 className="text-2xl font-semibold text-secondary-foreground">経営会議準備時間の削減効果</h3>
              <p className="mt-2 text-[0.95rem] text-secondary-foreground/80">
                生成AIが全社データや現場ナレッジを即座に統合し、経営課題を「何が本質的な論点か」「どの価値シナリオが最適か」
                まで翻訳して提示します。経営陣は把握すべきリスクとレバレッジポイントを一目で捉え、判断に直結する対話と決断に
                集中できます。
              </p>
              <div className="mt-5 space-y-3">
                {timeSavings.map((item, index) => (
                  <TimeSavingRow key={item.label} item={item} index={index} />
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal className="rounded-3xl border border-primary/20 bg-white p-7 shadow-card">
              <h3 className="text-2xl font-semibold text-foreground">AI活用のステップ</h3>
              <ul className="mt-5 space-y-3 rounded-2xl border border-muted/40 bg-muted/10 p-5 text-[0.95rem] text-muted-foreground">
                {outcomeHighlights.map((item, index) => (
                  <ScrollReveal
                    as="li"
                    key={item}
                    delay={index * 70}
                    className="flex items-start gap-2 text-foreground"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {item}
                  </ScrollReveal>
                ))}
              </ul>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {automationFlow.map((item, index) => (
                  <ScrollReveal
                    key={item.step}
                    delay={index * 90}
                    className="relative rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 via-white to-accent/5 p-5"
                  >
                    <span className="absolute -top-4 left-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-[0.95rem] font-bold text-white shadow-lg">
                      {item.step}
                    </span>
                    <h4 className="mt-4 text-[1.05rem] font-semibold text-foreground">{item.title}</h4>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{item.detail}</p>
                    {index < automationFlow.length - 1 && (
                      <span className="absolute right-3 top-1/2 hidden h-0.5 w-8 -translate-y-1/2 bg-gradient-to-r from-primary/40 to-accent/60 md:block" aria-hidden="true" />
                    )}
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIBenefitsSection;
