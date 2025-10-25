import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, FileText, Download } from "lucide-react";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/ctaVariants";

const resources = [
  {
    title: "生成AI活用ガイド",
    description:
      "製造・建設業で成果を出した生成AI活用事例、プロンプト設計の型、導入チェックリストを一冊にまとめた18ページのeBook。",
    icon: BookOpen,
    takeaway: "現場で使えるプロンプトテンプレートとROI計算シート付き",
  },
  {
    title: "資金繰り改善チェックリスト",
    description: "キャッシュフローのボトルネックを30分で洗い出せるテンプレートと金融機関への説明資料サンプル。",
    icon: FileText,
    takeaway: "毎月の資金計画シート（Excel）をダウンロード可能",
  },
];

const ResourcesSection = () => {
  const scrollToContact = () => {
    const ctaSection = document.getElementById("cta-section");
    ctaSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="resources" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal className="mb-10 space-y-4 text-center" variant="fade">
            <h2 className="text-3xl font-bold md:text-4xl">無料ダウンロード資料</h2>
            <p className="text-muted-foreground">
              相談予約でも資料DLでも選べる2ステップ。フォーム送信後すぐにPDFとテンプレートをメールでお届けします。
              AI導入手順、社内展開ロードマップ、失敗を避ける検証ポイントまで網羅しています。
            </p>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <ScrollReveal key={resource.title} delay={index * 90} className="h-full" variant="fade-up">
                  <Card className="flex h-full flex-col justify-between border border-border bg-card p-5 shadow-card">
                    <div>
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{resource.title}</h3>
                          <p className="flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-primary">
                            <Download className="h-3 w-3 text-primary" /> PDF / Excel
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
                      <p className="mt-3 text-xs font-medium text-muted-foreground">{resource.takeaway}</p>
                    </div>
                    <div className="mt-5 flex flex-col gap-3">
                      <Button
                        variant="outline"
                        className="w-full border-2 border-secondary/50 text-secondary hover:bg-secondary/20 hover:text-secondary"
                        onClick={scrollToContact}
                      >
                        {SECONDARY_CTA.label}
                      </Button>
                      <p className="text-center text-xs text-muted-foreground">
                        無料経営診断をご希望の方はページ下部の <span className="font-semibold text-primary">{PRIMARY_CTA.label}</span> からどうぞ。
                      </p>
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal
            className="mt-10 rounded-3xl border border-primary/30 bg-white/90 p-7 text-left shadow-card"
            delay={140}
            variant="fade-up"
          >
            <h3 className="text-xl font-semibold text-foreground">無料経営診断でできること</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              専門コンサルタントが御社の業務フローをヒアリングし、「どの業務で生成AIが役立つか」「データ準備に必要なステップ」「導入初月に達成すべきKPI」を具体的に提案します。furumachi-smec.lognowa.com で公開しているデモをベースに、貴社向けカスタマイズ案もその場でお渡しします。
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
