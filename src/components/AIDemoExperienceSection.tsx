import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import growthImage from "@/assets/growth-chart.jpg";
import {
  Gauge,
  LayoutDashboard,
  MonitorSmartphone,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";

const chartConfig = {
  manual: {
    label: "従来の準備時間",
    color: "hsl(217 62% 55%)",
  },
  ai: {
    label: "AIが整理した時間",
    color: "hsl(156 62% 45%)",
  },
} as const;

type Metric = {
  label: string;
  value: string;
  helper: string;
  tone: "emerald" | "sky" | "amber";
};

type DemoFrame = {
  id: string;
  label: string;
  description: string;
  chart: Array<{ stage: string; manual: number; ai: number }>;
  metrics: Metric[];
};

type DemoScenario = {
  id: string;
  label: string;
  description: string;
  accent: string;
  frames: DemoFrame[];
};

const metricToneClass: Record<Metric["tone"], string> = {
  emerald: "text-emerald-600",
  sky: "text-sky-600",
  amber: "text-amber-600",
};

const formatHours = (value: number | string) =>
  typeof value === "number" ? `${value.toFixed(0)}h` : `${value}`;

const demoScenarios: DemoScenario[] = [
  {
    id: "dashboard",
    label: "AI経営ダッシュボード",
    description:
      "粗利やキャッシュドライバーをAIがリアルタイムに整理し、経営会議で使える資料として提示するデモです。",
    accent: "from-sky-400 via-primary to-emerald-500",
    frames: [
      {
        id: "baseline",
        label: "現状の会議準備",
        description: "資料集めと分析に追われ、判断材料が揃うまでに時間がかかる状態。",
        chart: [
          { stage: "資料収集", manual: 36, ai: 16 },
          { stage: "指標分析", manual: 28, ai: 12 },
          { stage: "意思決定", manual: 18, ai: 10 },
        ],
        metrics: [
          { label: "資料作成時間", value: "36h → 16h", helper: "週20時間削減", tone: "emerald" },
          { label: "粗利差異の可視化", value: "3指標 → 9指標", helper: "見逃しゼロへ", tone: "sky" },
          { label: "会議準備の心理的負荷", value: "高 → 中", helper: "AIが根拠を添付", tone: "amber" },
        ],
      },
      {
        id: "projection",
        label: "AI提示シナリオ",
        description: "生成AIが粗利・キャッシュ・需要を組み合わせたシナリオを提示。優先施策を自動で整理します。",
        chart: [
          { stage: "資料収集", manual: 18, ai: 10 },
          { stage: "指標分析", manual: 14, ai: 8 },
          { stage: "意思決定", manual: 9, ai: 6 },
        ],
        metrics: [
          { label: "提案スピード", value: "45分 → 12分", helper: "AIが差分を要約", tone: "emerald" },
          { label: "会議で採用される施策", value: "52% → 81%", helper: "根拠付きで可視化", tone: "sky" },
          { label: "リスク検知", value: "翌週 → 当日", helper: "異常値を即アラート", tone: "amber" },
        ],
      },
      {
        id: "execution",
        label: "実行モニタリング",
        description: "着地のブレをAIが日次で補正し、実行計画とキャッシュ影響を同じ画面で追跡します。",
        chart: [
          { stage: "資料収集", manual: 14, ai: 8 },
          { stage: "指標分析", manual: 10, ai: 6 },
          { stage: "意思決定", manual: 6, ai: 4 },
        ],
        metrics: [
          { label: "キャッシュ誤差", value: "±12% → ±3%", helper: "日次で補正", tone: "emerald" },
          { label: "経営会議時間", value: "120分 → 75分", helper: "要点を要約", tone: "sky" },
          { label: "現場ヒアリング", value: "翌日共有", helper: "ボトルネックを自動記録", tone: "amber" },
        ],
      },
    ],
  },
  {
    id: "cash",
    label: "資金繰りシナリオ",
    description:
      "資金繰り表と投資余力をAIが更新し、金融機関とのコミュニケーションに使える資料を自動で用意するデモです。",
    accent: "from-emerald-400 via-teal-400 to-sky-500",
    frames: [
      {
        id: "baseline",
        label: "資金繰りの整理",
        description: "口座残高とExcelの転記で追い付かず、意思決定が後手に回っている状態。",
        chart: [
          { stage: "残高確認", manual: 18, ai: 8 },
          { stage: "シミュレーション", manual: 22, ai: 12 },
          { stage: "打ち手整理", manual: 16, ai: 9 },
        ],
        metrics: [
          { label: "資金繰り表作成時間", value: "56h → 29h", helper: "27時間削減", tone: "emerald" },
          { label: "資金ショート予測", value: "2週前 → 6週前", helper: "早期警戒", tone: "sky" },
          { label: "担当者の負担感", value: "高 → 中", helper: "AIが入力補完", tone: "amber" },
        ],
      },
      {
        id: "projection",
        label: "投資余力の試算",
        description: "借入返済と投資計画を組み合わせ、AIが判断材料をグラフィカルに提示します。",
        chart: [
          { stage: "残高確認", manual: 12, ai: 7 },
          { stage: "シミュレーション", manual: 16, ai: 9 },
          { stage: "打ち手整理", manual: 10, ai: 6 },
        ],
        metrics: [
          { label: "投資判断までの時間", value: "10日 → 3日", helper: "根拠資料を自動生成", tone: "emerald" },
          { label: "資金余力", value: "+8.2%", helper: "余力を可視化", tone: "sky" },
          { label: "金融機関との共有", value: "メール添付 → ダッシュボード共有", helper: "履歴を自動保存", tone: "amber" },
        ],
      },
      {
        id: "execution",
        label: "金融機関連携",
        description: "金融機関との面談前にAIが論点とQ&Aを整理し、当日の議事録まで自動生成します。",
        chart: [
          { stage: "残高確認", manual: 9, ai: 6 },
          { stage: "シミュレーション", manual: 12, ai: 7 },
          { stage: "打ち手整理", manual: 8, ai: 5 },
        ],
        metrics: [
          { label: "議事録作成", value: "180分 → 35分", helper: "AIがドラフト作成", tone: "emerald" },
          { label: "稟議スピード", value: "2週間 → 5日", helper: "根拠が共有済み", tone: "sky" },
          { label: "ヒアリング漏れ", value: "20項目を自動フォロー", helper: "質問集を生成", tone: "amber" },
        ],
      },
    ],
  },
];

const animationIntervalMs = 3400;

const AIDemoExperienceSection = () => {
  const [scenarioId, setScenarioId] = useState<DemoScenario["id"]>(demoScenarios[0].id);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const scenario = useMemo(
    () => demoScenarios.find((item) => item.id === scenarioId) ?? demoScenarios[0],
    [scenarioId],
  );

  const frame = scenario.frames[frameIndex] ?? scenario.frames[0];

  useEffect(() => {
    setFrameIndex(0);
  }, [scenario]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const timer = window.setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % scenario.frames.length);
    }, animationIntervalMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, scenario.frames.length]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        setIsPlaying(false);
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const progress = ((frameIndex + 1) / scenario.frames.length) * 100;

  return (
    <section className="surface-soft py-20">
      <div className="container mx-auto px-4">
        <ScrollReveal className="mx-auto max-w-4xl text-center" variant="fade">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            生成AIデモを体験
          </span>
          <h2 className="mt-6 text-balance text-3xl font-bold text-foreground md:text-4xl">
            インタラクティブなダッシュボードでAIの提案根拠と操作感を確認
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            シナリオを切り替えると、AIがレポートをどう組み立て、どの指標を強調するのかが分かります。忙しい経営者でも片手で操作できる
            よう、モバイル表示を最適化した体験に仕上げました。
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ScrollReveal className="space-y-6" variant="fade-up">
            <Card className="border-primary/25 bg-white/90 shadow-card">
              <CardContent className="space-y-6 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-left text-base font-semibold text-primary/80">シナリオを選択</p>
                  <div className="flex flex-wrap gap-2">
                    {demoScenarios.map((item) => (
                      <Button
                        key={item.id}
                        type="button"
                        variant="outline"
                        size="sm"
                        aria-pressed={scenario.id === item.id}
                        className={cn(
                          "rounded-full border-2 px-4 py-2 text-xs font-semibold transition-all",
                          scenario.id === item.id
                            ? "border-primary bg-white text-primary shadow-sm"
                            : "border-muted/40 bg-muted/40 text-muted-foreground hover:border-primary/50 hover:text-primary",
                        )}
                        onClick={() => {
                          setScenarioId(item.id);
                          setIsPlaying(true);
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-primary/15 bg-primary/5 p-5">
                  <h3 className="text-lg font-bold text-foreground">{frame.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{frame.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    type="button"
                    variant="cta"
                    size="lg"
                    className="interactive-cta rounded-full px-6 py-4 text-sm font-bold"
                    onClick={() => setIsPlaying((prev) => !prev)}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4" aria-hidden="true" />
                        一時停止
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" aria-hidden="true" />
                        デモを再生
                      </>
                    )}
                  </Button>
                  <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-muted-foreground">
                    <MonitorSmartphone className="h-4 w-4 text-primary" aria-hidden="true" />
                    モバイルでも同じ操作感
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 rounded-full bg-primary/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500"
                      style={{ width: `${progress}%` }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                    {frameIndex + 1} / {scenario.frames.length} シーン
                  </p>
                </div>
              </CardContent>
            </Card>

            <ScrollReveal className="grid gap-4 md:grid-cols-3" variant="fade">
              {frame.metrics.map((metric) => (
                <div
                  key={`${frame.id}-${metric.label}`}
                  className="flex flex-col gap-2 rounded-2xl border border-primary/10 bg-white/80 p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/70">{metric.label}</p>
                  <p className={cn("text-xl font-bold", metricToneClass[metric.tone])}>{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.helper}</p>
                </div>
              ))}
            </ScrollReveal>
          </ScrollReveal>

          <ScrollReveal className="space-y-6" variant="fade-up" delay={80}>
            <div className="relative rounded-[36px] border border-primary/20 bg-white/90 p-6 shadow-elegant">
              <div
                className={cn(
                  "demo-screen overflow-hidden border border-primary/15",
                  "bg-gradient-to-br",
                  scenario.accent,
                )}
                aria-hidden="true"
              >
                <img
                  src={growthImage}
                  alt="生成AIダッシュボードのイメージ"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="mt-6 rounded-3xl border border-primary/10 bg-white/85 p-4 shadow-inner">
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="h-5 w-5 text-primary" aria-hidden="true" />
                  <p className="text-sm font-semibold text-primary/80">リアルタイムで推移するダッシュボード</p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  グラフはスクロールに合わせてふわりとフェードイン。会議中に気になる指標をタップすると、AIが説明を表示し、そのまま次の
                  アクションをアサインできます。
                </p>
              </div>
            </div>

            <div className="rounded-[36px] border border-primary/20 bg-white/95 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="text-lg font-bold text-foreground">シミュレーションの挙動を見る</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                マウスオーバーやタップで、AIがどのデータを根拠に意思決定をサポートしているかを確認できます。ホバーアニメーションで視線
                を誘導し、過剰な動きは避けつつ落ち着いたリズムで演出しました。
              </p>
              <div className="mt-5 rounded-3xl border border-primary/15 bg-gradient-to-r from-white via-primary/5 to-secondary/20 p-5">
                <ChartContainer config={chartConfig} className="h-[280px] w-full">
                  <ResponsiveContainer>
                    <AreaChart data={frame.chart} margin={{ top: 16, right: 12, left: 0, bottom: 4 }}>
                      <CartesianGrid strokeDasharray="4 8" stroke="hsl(215 33% 82%)" />
                      <XAxis dataKey="stage" tickLine={false} axisLine={false} tick={{ fill: "hsl(215 23% 36%)", fontSize: 11 }} />
                      <YAxis tickLine={false} axisLine={false} width={36} tick={{ fill: "hsl(215 23% 36%)", fontSize: 11 }} />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent formatter={(value) => [formatHours(value), "工数"]} />}
                      />
                      <Area
                        type="monotone"
                        dataKey="manual"
                        stroke="var(--color-manual)"
                        fill="var(--color-manual)"
                        fillOpacity={0.18}
                        strokeWidth={2.5}
                        dot={{ r: 3.5, strokeWidth: 1.5, stroke: "white" }}
                        isAnimationActive
                      />
                      <Area
                        type="monotone"
                        dataKey="ai"
                        stroke="var(--color-ai)"
                        fill="var(--color-ai)"
                        fillOpacity={0.25}
                        strokeWidth={2.5}
                        dot={{ r: 3.5, strokeWidth: 1.5, stroke: "white" }}
                        isAnimationActive
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <p className="mt-3 text-xs text-muted-foreground">
                  ※ デモでは実データを匿名加工しています。数値はシナリオに合わせて自動で変化します。
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AIDemoExperienceSection;
