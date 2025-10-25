import { BrainCircuit, ClipboardCheck, Users } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const overviewItems = [
  {
    icon: BrainCircuit,
    title: "AIの洞察を経営判断に翻訳",
    description:
      "分散した会計・販売・現場メモを生成AIが整理し、施策候補と根拠データを提示。推奨シナリオごとに粗利・キャッシュへの影響が数値化され、意思決定の前提が透明になります。",
  },
  {
    icon: Users,
    title: "人間とAIの協働を徹底",
    description:
      "OECDが提唱する『人間中心のAI』に基づき、最終判断は経営者と経営陣が担う運用設計です。AIは意思決定を補助する存在であり、会議では意思決定責任者が納得できるまで解説を行います。",
  },
  {
    icon: ClipboardCheck,
    title: "説明可能なレポート設計",
    description:
      "生成AIが提案理由を日本語で可視化し、過去データとの比較や感度分析もワンクリックで確認。ブラックボックスに頼らず、監査や金融機関への説明にも耐える資料を整備します。",
  },
];

const collaborationSteps = [
  {
    step: "STEP 1",
    title: "データ連携と仮説共有",
    detail:
      "会計・販売データを暗号化で連携し、経営課題の仮説を30分のワークショップで整理。AIが使う指標と定義を人間が先に設計します。",
  },
  {
    step: "STEP 2",
    title: "AIレポートの検証",
    detail:
      "生成AIが複数の施策シナリオを作成。担当コンサルタントが根拠とリスクをレビューし、経営会議で使える形に整えます。",
  },
  {
    step: "STEP 3",
    title: "経営者が意思決定",
    detail:
      "経営者が最終判断を行い、AIは議事録化と進捗モニタリングを担当。判断の痕跡を残すことで再現性とガバナンスを担保します。",
  },
];

const ServiceOverviewSection = () => {
  return (
    <section className="bg-white py-16" aria-labelledby="service-overview-heading">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal as="span" variant="fade" className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            SERVICE
          </ScrollReveal>
          <ScrollReveal as="h2" variant="fade-up" delay={100} id="service-overview-heading" className="mt-6 text-balance text-3xl font-bold text-foreground md:text-4xl">
            ブラックボックスを排した生成AI経営支援で、意思決定プロセスを見える化
          </ScrollReveal>
          <ScrollReveal as="p" variant="fade-up" delay={160} className="mt-4 text-lg leading-relaxed text-muted-foreground">
            生成AIは経営判断のスピードと精度を高める補助役です。私たちはAIの提案を人が検証する二重チェック体制を整え、経営者が安心して最終決定できるよう伴走します。
          </ScrollReveal>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {overviewItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.title}
                as="article"
                variant="fade-up"
                delay={index * 90}
                className="flex h-full flex-col gap-4 rounded-3xl border border-primary/15 bg-gradient-to-br from-white via-sky-50 to-primary/10 p-6 shadow-card"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{item.description}</p>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {collaborationSteps.map((step, index) => (
            <ScrollReveal
              key={step.title}
              variant="fade-up"
              delay={200 + index * 90}
              className="flex h-full flex-col gap-3 rounded-3xl border border-secondary/30 bg-secondary/10 p-6 text-left"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-secondary-foreground">{step.step}</span>
              <h4 className="text-lg font-semibold text-foreground">{step.title}</h4>
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{step.detail}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceOverviewSection;
