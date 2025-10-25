import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Calculator, Gauge, Sparkles, Timer, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type SimulatorInputs = {
  monthlyRevenue: number;
  grossMargin: number;
  manualHours: number;
  cashOnHand: number;
  aiUsage: number;
};

const defaultInputs: SimulatorInputs = {
  monthlyRevenue: 35,
  grossMargin: 28,
  manualHours: 14,
  cashOnHand: 3,
  aiUsage: 18,
};

const chartConfig = {
  revenue: {
    label: "売上高 (百万円)",
    color: "hsl(217 90% 60%)",
  },
  cash: {
    label: "キャッシュ創出 (百万円)",
    color: "hsl(152 70% 45%)",
  },
} as const;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const formatMillions = (value: number) => `${value.toFixed(1)} 百万円`;
const formatSignedMillions = (value: number) => `${value >= 0 ? "+" : "-"}${Math.abs(value).toFixed(1)} 百万円`;
const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const yAxisLabelStyle: CSSProperties = {
  fill: "rgba(15, 23, 42, 0.55)",
  fontSize: 11,
  fontWeight: 600,
};

const AIDiagnosticSimulator = () => {
  const [inputs, setInputs] = useState<SimulatorInputs>(defaultInputs);

  const baselineGrossProfit = useMemo(
    () => (inputs.monthlyRevenue * inputs.grossMargin) / 100,
    [inputs.monthlyRevenue, inputs.grossMargin],
  );

  const estimatedImpact = useMemo(() => {
    const revenueLiftRate = 0.02 + inputs.manualHours / 220 + Math.max(0, 60 - inputs.aiUsage) / 520;
    const estimatedRevenueLift = inputs.monthlyRevenue * revenueLiftRate;

    const executionEfficiency = inputs.manualHours * 0.65 + 4;
    const decisionTimeSaved = Math.round(executionEfficiency);

    const cashSafetyBoost =
      baselineGrossProfit * 0.28 +
      estimatedRevenueLift * 0.55 +
      Math.max(0, 8 - inputs.cashOnHand) * 0.4;

    const readinessScore = clamp(
      35 +
        inputs.manualHours * 1.7 +
        Math.max(0, 8 - inputs.cashOnHand) * 4.2 +
        Math.max(0, 70 - inputs.aiUsage) * 0.55 +
        Math.min(22, inputs.grossMargin * 0.35),
      18,
      100,
    );

    return {
      revenueLift: Number(estimatedRevenueLift.toFixed(1)),
      cashLift: Number(cashSafetyBoost.toFixed(1)),
      decisionTimeSaved,
      readinessScore,
    };
  }, [baselineGrossProfit, inputs.cashOnHand, inputs.grossMargin, inputs.manualHours, inputs.monthlyRevenue, inputs.aiUsage]);

  const chartData = useMemo(() => {
    const { revenueLift, cashLift } = estimatedImpact;
    const halfwayRevenue = inputs.monthlyRevenue + revenueLift * 0.6;
    const halfwayCash = baselineGrossProfit * 0.55 + cashLift * 0.55;

    return [
      {
        stage: "現状",
        revenue: inputs.monthlyRevenue,
        cash: baselineGrossProfit * 0.55,
      },
      {
        stage: "AI導入3カ月",
        revenue: halfwayRevenue,
        cash: halfwayCash,
      },
      {
        stage: "AI導入6カ月",
        revenue: inputs.monthlyRevenue + revenueLift,
        cash: baselineGrossProfit * 0.55 + cashLift,
      },
    ];
  }, [baselineGrossProfit, estimatedImpact, inputs.monthlyRevenue]);

  const readinessTone = estimatedImpact.readinessScore >= 75 ? "text-emerald-600" : "text-amber-600";

  const chartSummary = useMemo(() => {
    const current = chartData[0];
    const future = chartData[chartData.length - 1];

    const revenueDelta = future.revenue - current.revenue;
    const cashDelta = future.cash - current.cash;

    return {
      revenueCurrent: current.revenue,
      revenueFuture: future.revenue,
      revenueDelta,
      revenueGrowthRate: current.revenue ? (revenueDelta / current.revenue) * 100 : 0,
      cashCurrent: current.cash,
      cashFuture: future.cash,
      cashDelta,
      cashGrowthRate: current.cash ? (cashDelta / current.cash) * 100 : 0,
    };
  }, [chartData]);

  const handleSliderChange = (key: keyof SimulatorInputs) => (value: number[]) => {
    setInputs((previous) => ({
      ...previous,
      [key]: Number(value[0]),
    }));
  };

  const scrollToCta = () => {
    document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="ai-simulator" className="bg-sky-50/60 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary shadow-sm shadow-primary/10">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            AI診断シミュレーター
          </span>
          <h2 className="mt-6 text-balance text-3xl font-bold text-slate-900 md:text-4xl">
            3つの数字を入力するだけで、AIが提案する意思決定サポートの効果を可視化
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            現状の売上・粗利率・経営時間を入力すると、生成AIがどの程度まで判断材料を整えられるかを予測します。
            あくまで経営者の最終判断を補助するシナリオとして表示され、根拠データとともにグラフでダウンロード可能です。
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_minmax(0,0.95fr)]">
          <ScrollReveal className="h-full" variant="fade-up">
            <Card className="h-full border-primary/20 bg-white/95 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-left text-2xl font-bold text-slate-900">
                  <Calculator className="h-6 w-6 text-primary" aria-hidden="true" />
                  会社の現状を入力
                </CardTitle>
                <CardDescription className="text-left text-base leading-relaxed">
                  スライダーを動かすと診断結果がリアルタイムで更新されます。数字はおおよその値でも構いません。
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-7">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                  <span>月間売上高</span>
                  <span>{inputs.monthlyRevenue} 百万円</span>
                </div>
                <Slider
                  value={[inputs.monthlyRevenue]}
                  onValueChange={handleSliderChange("monthlyRevenue")}
                  min={5}
                  max={150}
                  step={1}
                  className="mt-3"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                  <span>粗利率</span>
                  <span>{inputs.grossMargin}%</span>
                </div>
                <Slider
                  value={[inputs.grossMargin]}
                  onValueChange={handleSliderChange("grossMargin")}
                  min={10}
                  max={60}
                  step={1}
                  className="mt-3"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                  <span>経営者が数字整理に使う時間（週あたり）</span>
                  <span>{inputs.manualHours} 時間</span>
                </div>
                <Slider
                  value={[inputs.manualHours]}
                  onValueChange={handleSliderChange("manualHours")}
                  min={4}
                  max={30}
                  step={1}
                  className="mt-3"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                  <span>手元資金の保有月数</span>
                  <span>{inputs.cashOnHand} か月</span>
                </div>
                <Slider
                  value={[inputs.cashOnHand]}
                  onValueChange={handleSliderChange("cashOnHand")}
                  min={1}
                  max={12}
                  step={1}
                  className="mt-3"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                  <span>現在のAI活用度</span>
                  <span>{inputs.aiUsage}%</span>
                </div>
                <Slider
                  value={[inputs.aiUsage]}
                  onValueChange={handleSliderChange("aiUsage")}
                  min={0}
                  max={80}
                  step={1}
                  className="mt-3"
                />
              </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal className="h-full" variant="fade-up" delay={80}>
            <Card className="h-full border-sky-200/70 bg-white/95 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-left text-2xl font-bold text-slate-900">
                  <span className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-sky-500" aria-hidden="true" />
                    診断結果
                </span>
                <span className={cn("text-lg font-semibold", readinessTone)}>
                  改善余地 {estimatedImpact.readinessScore}%
                </span>
              </CardTitle>
              <CardDescription className="text-left text-base leading-relaxed">
                生成AIと管理会計を組み合わせた場合の6カ月後シナリオ。売上とキャッシュ創出の伸び率を視覚的に確認できます。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-3xl bg-sky-50/80 p-6 shadow-inner">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-slate-600">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-sky-600 shadow-sm">
                    売上 × キャッシュの推移
                  </span>
                  <span className="text-slate-500">単位: 百万円</span>
                </div>
                <ChartContainer config={chartConfig} className="h-[220px]">
                  <ResponsiveContainer>
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.45} />
                          <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="cashGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-cash)" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="var(--color-cash)" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" stroke="rgba(15, 118, 230, 0.12)" vertical={false} />
                      <XAxis dataKey="stage" stroke="rgba(15, 23, 42, 0.4)" tickLine={false} axisLine={false} />
                      <YAxis
                        stroke="rgba(15, 23, 42, 0.4)"
                        tickFormatter={(value) => `${value}`}
                        tickLine={false}
                        width={54}
                        label={{
                          value: "百万円",
                          angle: -90,
                          position: "insideLeft",
                          offset: -4,
                          style: yAxisLabelStyle,
                        }}
                      />
                      <ChartTooltip
                        cursor={{ strokeDasharray: "4 4" }}
                        content={
                          <ChartTooltipContent
                            formatter={(value, name) => {
                              const numericValue = typeof value === "number" ? value : Number(value);
                              const label = chartConfig[name as keyof typeof chartConfig]?.label ?? name;
                              return [`${numericValue.toFixed(1)} 百万円`, label];
                            }}
                          />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={2.4}
                        fill="url(#revenueGradient)"
                        dot={{ strokeWidth: 2, r: 4 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="cash"
                        stroke="var(--color-cash)"
                        strokeWidth={2.4}
                        fill="url(#cashGradient)"
                        dot={{ strokeWidth: 2, r: 4 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-sky-200/70 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">現状の売上</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{formatMillions(chartSummary.revenueCurrent)}</p>
                  <p className="text-xs text-muted-foreground">粗利率 {inputs.grossMargin}% / 月間</p>
                </div>
                <div className="rounded-2xl border border-sky-200/70 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">6カ月後の売上</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{formatMillions(chartSummary.revenueFuture)}</p>
                  <p className="text-xs text-emerald-600">{formatSignedMillions(chartSummary.revenueDelta)} / {formatPercent(chartSummary.revenueGrowthRate)}</p>
                </div>
                <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">キャッシュ創出</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{formatMillions(chartSummary.cashFuture)}</p>
                  <p className="text-xs text-emerald-600">現状比 {formatSignedMillions(chartSummary.cashDelta)} / {formatPercent(chartSummary.cashGrowthRate)}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-primary/15 bg-white/90 p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-sm font-semibold text-sky-600">
                    <TrendingUp className="h-4 w-4" aria-hidden="true" />
                    推定売上改善額（6カ月）
                  </div>
                  <p className="mt-3 text-2xl font-bold text-slate-900">{formatMillions(estimatedImpact.revenueLift)}</p>
                  <p className="text-sm text-muted-foreground">AIシナリオの平均成長率を3〜6%と仮定した場合の増分です。</p>
                </div>
                <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/60 p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-sm font-semibold text-emerald-700">
                    <Gauge className="h-4 w-4" aria-hidden="true" />
                    キャッシュ創出見込み（6カ月）
                  </div>
                  <p className="mt-3 text-2xl font-bold text-slate-900">{formatMillions(estimatedImpact.cashLift)}</p>
                  <p className="text-sm text-muted-foreground">粗利改善・余剰在庫削減・資金繰り最適化による効果を含みます。</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
                <div className="rounded-2xl border border-sky-200/70 bg-white/90 p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-sm font-semibold text-sky-700">
                    <Timer className="h-4 w-4" aria-hidden="true" />
                    週あたり意思決定に再投資できる時間
                  </div>
                  <p className="mt-3 text-2xl font-bold text-slate-900">約 {estimatedImpact.decisionTimeSaved} 時間</p>
                  <p className="text-sm text-muted-foreground">生成AIが定例レポートと分析を担当することで、社長が戦略に集中できます。</p>
                </div>
                <div className="rounded-2xl border border-primary/20 bg-white/90 p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-sm font-semibold text-primary">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    AI導入レディネス
                  </div>
                  <p className="mt-3 text-2xl font-bold text-slate-900">{estimatedImpact.readinessScore}%</p>
                  <Progress
                    value={estimatedImpact.readinessScore}
                    className="mt-4 h-3 bg-slate-200"
                    indicatorClassName="bg-gradient-to-r from-sky-500 to-emerald-500"
                    aria-label="AI導入レディネス"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    80%以上なら、無料経営診断で具体的なKPI設計とキャッシュ改善ロードマップをご案内します。
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/15 bg-slate-50/80 p-5">
                <div className="max-w-xl text-left text-sm leading-relaxed text-muted-foreground">
                  診断結果はメールでお送りするテンプレートに保存できます。担当コンサルタントが貴社の実際の財務データに当てはめ、
                  投資優先順位とキャッシュ創出計画を60分でご提案します。
                </div>
                <Button
                  variant="cta"
                  size="lg"
                  className="interactive-cta"
                  onClick={scrollToCta}
                  data-cta-attention="simulator-cta"
                  data-cta-attention-delay="360"
                >
                  無料経営診断で結果を深掘りする
                </Button>
              </div>
                </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AIDiagnosticSimulator;
