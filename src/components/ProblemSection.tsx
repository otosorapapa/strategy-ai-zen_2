import { AlertTriangle, BrainCircuit, CalendarClock, DollarSign, Network, TrendingUp, Users } from "lucide-react";
import problemImage from "@/assets/problem-illustration.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { cn } from "@/lib/utils";

type PainPoint = {
  title: string;
  quote: string;
  reasons: string[];
  risk: string;
  focus: string;
  icon: React.ComponentType<{ className?: string }>;
  priority?: number;
};

type StoryFlowItem = {
  stage: string;
  icon: React.ComponentType<{ className?: string }>;
  headline: string;
  copy: string;
  metrics: string[];
};

const pains: PainPoint[] = [
  {
    title: "売上はあるのに現預金が貯まらない",
    quote: "資金繰りが読めず、社長が毎日数字を追いかけている。",
    reasons: [
      "粗利とキャッシュのデータが部門ごとに散在し、リアルタイム連携がない",
      "AIで回せるはずの資金繰りシミュレーションを手作業で更新しており、入出金の山谷が読めない",
      "価格戦略が経験則ベースで、利益率と需要の弾力性を同時に最適化できていない",
    ],
    risk: "短期資金ショックで投資計画が遅延し、金融機関からの信用も低下",
    focus: "AIドリブンの価格・需要分析とキャッシュフローシナリオ自動化",
    icon: DollarSign,
    priority: 5,
  },
  {
    title: "営業現場が属人化している",
    quote: "案件情報が個人の頭の中にあり、引き継ぎが困難。",
    reasons: [
      "顧客接点データがExcelとメールに散在し、会話ログをAIで学習させる土台がない",
      "提案の勝ち筋を示すスコアリング指標が整備されず、属人的な値引き判断に頼っている",
      "ナレッジ共有のワークフローがなく、生成AIによる要約やFAQ化が活用されていない",
    ],
    risk: "商談確度の読み違いで高粗利案件を取り逃がし、営業育成コストも膨らむ",
    focus: "生成AIで商談ログを標準化し、勝ち筋プレイブックを自動更新",
    icon: Network,
    priority: 4,
  },
  {
    title: "回収遅延と在庫でキャッシュが寝ている",
    quote: "入金サイトが読めず、月末に慌てて更新。",
    reasons: [
      "販売・在庫データが分断され、AI需要予測モデルの学習サイクルが回っていない",
      "調達・生産計画が経験則に依存し、在庫アラートを自動生成できていない",
      "与信や回収情報がリアルタイムで共有されず、請求オペレーションが遅延する",
    ],
    risk: "資金が在庫に滞留し、新規投資や大型案件への対応が後手に回る",
    focus: "AI需要予測×調達ルール自動化で在庫と回収を同時最適化",
    icon: CalendarClock,
    priority: 4,
  },
  {
    title: "人材が定着せず組織が疲弊",
    quote: "忙しいのに人が辞め、教育コストがかさむ。",
    reasons: [
      "スキルマップと評価指標が可視化されず、AIによる習熟度診断ができない",
      "OJTコンテンツが属人化し、生成AIでのマイクロラーニング教材化が進まない",
      "離職傾向やモチベーションの兆候をデータで検知できる仕組みが不足",
    ],
    risk: "キーパーソンの離脱でプロジェクトが停滞し、採用・教育コストが雪だるま式に増加",
    focus: "AIパーソナライズ学習とエンゲージメント分析で定着率を高める",
    icon: Users,
  },
  {
    title: "金融機関との情報共有が属人化",
    quote: "面談準備のたびに資料を作り直し、本業の時間が削られる。",
    reasons: [
      "財務ストーリーや資金繰り見通しが部署ごとに分散し、最新数値を一元管理できていない",
      "借入条件やモニタリングの論点が記録されず、金融機関ごとの期待値をチームで共有できない",
      "面談ログやアクションの履歴が残らず、AIで要点を抽出して次回交渉に活かす仕組みがない",
    ],
    risk: "信用評価が下がり、追加融資や条件交渉のタイミングを逃して資金計画が遅延",
    focus: "生成AIで財務ストーリーと交渉履歴を整理し、金融機関との信頼構築を高速化",
    icon: AlertTriangle,
  },
];

const PainAccordionItem = ({ pain, index }: { pain: PainPoint; index: number }) => {
  const Icon = pain.icon;
  const { ref, isVisible } = useRevealOnScroll<HTMLDivElement>({ threshold: 0.3 });

  return (
    <AccordionItem
      ref={ref}
      value={`pain-${index}`}
      className={cn(
        "overflow-hidden rounded-[32px] border border-primary/15 bg-gradient-to-br from-white via-white to-secondary/10 shadow-card transition-all duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <AccordionTrigger className="px-6 py-6 hover:no-underline focus:outline-none">
        <div className="flex w-full flex-col gap-4 text-left sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-start gap-4">
            <span className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{pain.title}</h3>
              <p className="mt-2 text-base italic text-muted-foreground">"{pain.quote}"</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 rounded-2xl border border-primary/20 bg-white/80 px-4 py-3 text-left shadow-sm sm:w-52">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">優先度</span>
            <span className="text-lg font-bold text-primary">{pain.priority ?? index + 1}</span>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6 pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-muted/20 bg-white/95 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">原因</p>
            <ul className="mt-4 space-y-3">
              {pain.reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="mt-1.5 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-primary/25 bg-primary/5 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80">リスク</p>
            <p className="mt-4 text-base leading-relaxed text-primary/90">{pain.risk}</p>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">解決策</p>
            <p className="mt-4 text-base font-semibold leading-relaxed text-foreground">{pain.focus}</p>
          </div>
        </div>
        <footer className="mt-6 flex flex-col gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>年商5000万円～10億円企業のヒアリングから抽出</span>
          <span>クリックで詳細を閉じる</span>
        </footer>
      </AccordionContent>
    </AccordionItem>
  );
};

const storyFlow: StoryFlowItem[] = [
  {
    stage: "課題",
    icon: AlertTriangle,
    headline: "売上停滞と属人的な意思決定",
    copy:
      "粗利の高い案件ほど感覚的な判断で値引きが走り、会議資料は担当者のローカルに散在。数字が揃わず、次の一手が決められません。",
    metrics: ["売上停滞", "案件管理が属人化"],
  },
  {
    stage: "解決",
    icon: BrainCircuit,
    headline: "AI×管理会計×資金繰り支援を3ステップで導入",
    copy:
      "議事録と販売・会計データをAIが自動集約し、管理会計KPIと資金繰りシナリオを同時に可視化。週次レビューで優先課題を判断します。",
    metrics: ["AIが粗利・資金のギャップを提示", "管理会計テンプレートで数値を標準化"],
  },
  {
    stage: "成果",
    icon: TrendingUp,
    headline: "意思決定時間を週8時間創出",
    copy:
      "AIが作成した議事録・改善提案をベースに会議を短縮し、キャッシュの先読みも自動化。売上と資金繰りの不安が解消され、攻めの投資判断が可能になります。",
    metrics: ["粗利率+7pt", "資金繰り更新時間-70%"],
  },
];

const ProblemSection = () => {
  return (
    <section className="bg-gradient-to-b from-white via-slate-50/80 to-slate-100/60 py-28 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-highlight/20 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.3em] text-highlight-foreground">
              よくある課題
            </span>
            <h2 className="text-balance text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              意思決定の時間を奪う<br />5つの停滞要因
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              属人化した会議準備や資金繰りの更新に時間を奪われると、勝ち筋の案件や投資判断が後ろ倒しになりがちです。経営チームの声から抽出したボトルネックを整理しました。
            </p>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-white/60 shadow-elegant">
            <img
              src={problemImage}
              alt="経営課題の可視化"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="rounded-[32px] border border-primary/15 bg-white/95 p-10 shadow-card">
          <div className="grid gap-8 md:grid-cols-3">
            {storyFlow.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.stage} className="flex h-full flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-highlight via-accent to-primary text-white text-base font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/80 md:text-base">
                      {item.stage}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-highlight/20 text-highlight-foreground">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{item.headline}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
                    </div>
                  </div>
                  <ul className="mt-auto space-y-2 rounded-2xl border border-highlight/40 bg-highlight/10 p-4 text-[0.95rem] text-highlight-foreground">
                    {item.metrics.map((metric) => (
                      <li key={metric} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-highlight-foreground" aria-hidden="true" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <Accordion type="single" collapsible className="mt-20 space-y-6">
          {pains.map((pain, index) => (
            <PainAccordionItem key={pain.title} pain={pain} index={index} />
          ))}
        </Accordion>

        <div className="mt-20 rounded-[32px] border border-highlight/30 bg-gradient-to-r from-highlight/20 via-white to-accent/10 p-10 text-center shadow-card">
          <p className="text-xl font-semibold text-foreground">
            初回相談では「意思決定のボトルネック」を30分で特定し、AI・管理会計・資金繰りの順に打ち手を提示します。
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
