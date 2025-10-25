import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/ctaVariants";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "料金や契約期間は？",
    answer:
      "月額18万円〜（税別）で、初回契約は3ヶ月間からスタートします。1ヶ月目で現状棚卸しとロードマップ策定、2〜3ヶ月目でAIレポートと管理会計の運用を定着させ、4ヶ月目以降は成果に応じて四半期ごとに継続の可否を見直します。",
  },
  {
    question: "どの規模・業種が対象ですか？",
    answer:
      "年商5000万円～15億円・従業員10〜100名の中小企業さまが中心です。製造、建設、設備工事、卸売、サービス、D2Cなど現場の属人化と資金繰り課題を抱える業種で成果が出ています。",
  },
  {
    question: "オンラインのみの支援ですか？",
    answer:
      "基本はオンライン伴走ですが、福岡・九州は訪問サポートも実施します。他地域も月1回の現地ワークショップを組み合わせ可能で、複数拠点や多店舗展開でもダッシュボードと会議体を統合します。",
  },
  {
    question: "成果が出るまでのステップは？",
    answer:
      "初月で現状ヒアリングとデータ整備を完了し、2ヶ月目からAIレポートと意思決定会議を週次で運用します。3ヶ月目には粗利とキャッシュフローの改善施策が実行段階に入り、半年以内にROIをレポーティングできる体制を構築します。",
  },
  {
    question: "社内リソースが限られていても進められますか？",
    answer:
      "経営陣と管理部・営業責任者の小チームで進められるよう、週次のタスクボードと議事メモをこちらで用意します。必要に応じて当社がPMOを代行し、AIレポートの配信とアクション管理まで伴走します。",
  },
  {
    question: "AIやデータに詳しくなくても大丈夫？",
    answer:
      "操作マニュアルとトレーニング動画、初月2回のワークショップをご提供。生成AIや予測モデルは業務フローに合わせてカスタマイズするため、専門知識がなくても活用できます。",
  },
  {
    question: "生成AIデモはどこで確認できますか？",
    answer:
      "本ページ中ほどの「AI診断シミュレーター」と「AIコンシェルジュ」チャットで無料体験できます。無料経営診断では、御社データをもとにリアルタイムでシナリオ生成とROI試算をご覧いただけます。",
  },
  {
    question: "費用対効果やROIはどのように測定しますか？",
    answer:
      "着手時に粗利率・在庫回転率・手元資金カバレッジ・意思決定時間などのKPIを定義し、週次／月次でBefore-Afterをレポート。改善金額と投資額の差分からROIを算出し、累積効果を可視化します。",
  },
  {
    question: "金融機関や補助金申請も支援してもらえますか？",
    answer:
      "決算説明のストーリーや面談資料、補助金申請書のドラフトをAIで自動生成し、人がブラッシュアップします。必要に応じて面談同席や想定問答集の作成、資金繰り計画の見直しまでサポートします。",
  },
  {
    question: "初回相談では何を準備すれば良いですか？",
    answer:
      "直近3期分の決算書と月次試算表（可能であれば）、主要な業績管理資料をご用意ください。ヒアリングシートを事前送付するため、当日は課題整理と優先順位付けに集中いただけます。",
  },
  {
    question: "機密情報の取り扱いは安全ですか？",
    answer:
      "NDA（秘密保持契約）を締結のうえ、クラウド環境で暗号化とアクセス制御を徹底します。AIモデルの学習には匿名化したデータのみを使用し、目的外利用や外部共有は一切行いません。",
  },
];

const FAQSection = () => {
  const scrollToSection = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="faq" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="inline-flex items-center gap-2 text-primary/80 text-sm font-semibold uppercase tracking-[0.3em]">
              <HelpCircle className="h-4 w-4" /> FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">よくあるご質問</h2>
            <p className="text-muted-foreground mt-2">
              サービス導入前に多く寄せられるご質問をまとめました。ご不明点はお気軽にお問い合わせください。
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-card">
            <Accordion type="single" collapsible>
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div
            id="consultation-cta"
            className="mt-10 p-7 bg-secondary/40 border border-primary/30 rounded-xl text-center space-y-4"
          >
            <h3 className="text-2xl font-bold text-foreground">{SECONDARY_CTA.label}</h3>
            <p className="text-sm text-muted-foreground">
              {SECONDARY_CTA.description} フォーム送信時に希望日時をご記入いただければ優先的にご連絡します。
            </p>
            <p className="text-sm text-primary font-semibold">
              {PRIMARY_CTA.label} へのリンクはページ下部のフォームにご用意しています。
            </p>
            <p className="text-xs text-muted-foreground">
              まずは {SECONDARY_CTA.label} で資料をご覧いただき、面談をご希望の場合は {PRIMARY_CTA.label} とご記入ください。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button variant="outline" onClick={scrollToSection("ai-chatbot")}>
                生成AIデモを試す
              </Button>
              <Button variant="cta" onClick={scrollToSection("cta-section")}>
                無料診断を予約
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
