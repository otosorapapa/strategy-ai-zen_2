import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ActivitySquare,
  AlarmClock,
  BarChart3,
  BrainCircuit,
  Database,
  FileText,
  PlayCircle,
  Sparkles,
  Target,
} from "lucide-react";

const flowSteps = [
  {
    icon: Database,
    title: "データを自動収集",
    description:
      "会計・販売・在庫・CRM・Excelを日次で同期。furumachi-smec.lognowa.com と同じ構成で、生成AIが学習しやすい粒度へ整形します。",
    output: "売上/粗利/キャッシュの指標をリアルタイム可視化",
  },
  {
    icon: BrainCircuit,
    title: "AIが差異要因を解析",
    description:
      "粗利率・受注単価・在庫滞留の変動を10分以内に分解。危険信号を見つけると、意思決定に必要な背景データとともにアラートします。",
    output: "重点顧客・重点商品を自動サジェスト",
  },
  {
    icon: BarChart3,
    title: "打ち手シナリオを生成",
    description:
      "AIが3ヶ月以内に実行できる施策案を粗利インパクト順に提示。管理会計の感度分析を掛け合わせ、投資対効果を定量評価します。",
    output: "AI推奨シナリオ×期待効果レポート",
  },
  {
    icon: FileText,
    title: "資料とアクションを自動作成",
    description:
      "経営会議資料・金融機関向け説明資料・プロジェクトの議事メモを生成。会議の意思決定事項はタスクボードに自動連携します。",
    output: "会議準備・報告業務を70%短縮",
  },
];

const alertScenarios = [
  {
    label: "粗利が2週連続で計画比-8%",
    detail: "AIが対象案件と値引き履歴を抽出し、即改善案を提示",
    improvement: "改善までのリードタイム 5日→1日",
  },
  {
    label: "翌月のキャッシュ残高が危険水域",
    detail: "資金繰りシナリオを再計算し、借入・投資計画の調整案を提示",
    improvement: "資金ショック検知を30日前倒し",
  },
  {
    label: "生成AIが経営計画書の初稿を自動生成",
    detail: "部門別数値と現場ヒアリングを反映したドラフトを30分で作成",
    improvement: "会議資料作成時間 210分→70分",
  },
];

const impactMetrics = [
  {
    label: "社長の意思決定時間削減",
    value: 72,
    suffix: "%削減",
    description: "AIが論点と根拠データを先回りで整理",
  },
  {
    label: "会議準備時間を1/3に短縮",
    prefix: "1/",
    value: 3,
    suffix: "",
    description: "経営計画書・ダッシュボード・議事録を自動生成",
  },
  {
    label: "キャッシュ創出シナリオ",
    value: 12,
    suffix: "本",
    description: "優先順位付きの増収・資金繰り改善策を提示",
  },
];

const AIWorkflowShowcase = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" aria-hidden="true" />
      <div className="container relative mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div className="space-y-7">
            <ScrollReveal className="space-y-4" variant="fade">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/80">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                生成AIの活用イメージ
              </span>
              <h2 className="text-balance text-3xl font-bold leading-snug text-white md:text-4xl">
                <span className="serif-accent">AIが「次に取るべき打ち手」を図解で提示し、社長の意思決定を週単位で前倒し</span>
              </h2>
              <p className="text-lg leading-relaxed text-slate-200">
                売上とキャッシュフローのデータを自動分析し、危険信号やチャンスを数字と文章で提示。furumachi-smec.lognowa.com のデモと同じワークフローを、貴社のデータに最短2週間で適用します。
              </p>
            </ScrollReveal>

            <div className="grid gap-5">
              {flowSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal
                    key={step.title}
                    className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-primary/10 transition-colors duration-300 hover:border-primary/40 hover:bg-white/10"
                    variant="fade-up"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-200">{step.description}</p>
                    <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                      <Target className="h-4 w-4" aria-hidden="true" />
                      {step.output}
                    </p>
                  </ScrollReveal>
                );
              })}
            </div>

            <div className="grid gap-5 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-inner sm:grid-cols-3">
              {impactMetrics.map((metric) => (
                <div key={metric.label} className="space-y-2 text-center">
                  <AnimatedCounter
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    duration={1500}
                    className="mx-auto inline-flex items-center justify-center rounded-2xl bg-primary/20 px-4 py-3 text-3xl font-black text-primary"
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-300">{metric.label}</p>
                  <p className="text-[0.8rem] leading-relaxed text-slate-300/80">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <ScrollReveal className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-inner" variant="fade-up">
              <div className="flex items-center gap-3 text-left">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <ActivitySquare className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-white">AIが検知するリアルタイムアラート例</h3>
                  <p className="text-sm text-slate-200">
                    危険信号が出た瞬間にSlack/Teamsへ通知し、意思決定のための材料と推奨アクションを添えてお届けします。
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {alertScenarios.map((scenario) => (
                  <div key={scenario.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white">{scenario.label}</p>
                        <p className="mt-1 text-xs text-slate-200/80">{scenario.detail}</p>
                      </div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary">
                        <AlarmClock className="h-4 w-4" aria-hidden="true" />
                        {scenario.improvement}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIWorkflowShowcase;
