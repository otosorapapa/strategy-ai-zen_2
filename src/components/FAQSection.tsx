import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/ctaVariants";
import { Clock, HelpCircle, LineChart, ShieldCheck } from "lucide-react";

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
    <section
      id="faq"
      className="relative isolate overflow-hidden bg-slate-950/[0.03] py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[32rem] max-w-5xl rounded-full bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-24 hidden h-72 w-72 rounded-full bg-highlight/30 blur-3xl lg:block" />

      <div className="relative container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                <HelpCircle className="h-4 w-4" /> FAQ & Risk Control
              </span>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  よくあるご質問とリスク対策
                </h2>
                <p className="text-base leading-relaxed text-slate-600">
                  5000万円〜15億円規模の経営者さまが抱える「AI導入の不安」を、実績に基づいた回答とガバナンス体制でクリアにします。意思決定を止めず、投資対効果を最大化するための検証プロセスをご確認ください。
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-lg shadow-primary/10 backdrop-blur">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <ShieldCheck className="h-4 w-4 text-primary" /> セキュリティ体制
                  </div>
                  <p className="text-2xl font-bold text-slate-900">NDA締結率100%</p>
                  <p className="text-sm text-slate-600">
                    暗号化・アクセス制御・ログ監査まで徹底し、取引先監査にも対応する運用マニュアルを提供。
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Clock className="h-4 w-4 text-primary" /> 導入スピード
                  </div>
                  <p className="text-2xl font-bold text-slate-900">最短4週間で稼働</p>
                  <p className="text-sm text-slate-600">
                    現状棚卸し→ダッシュボード構築→現場定着まで、経営会議に沿ったフェーズで伴走します。
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <LineChart className="h-4 w-4 text-primary" /> ROI可視化
                  </div>
                  <p className="text-2xl font-bold text-slate-900">四半期ごとに成果報告</p>
                  <p className="text-sm text-slate-600">
                    粗利・キャッシュフロー・意思決定時間などのKPIをトラッキングし、定量効果をレポート。
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <HelpCircle className="h-4 w-4 text-primary" /> 専任サポート
                  </div>
                  <p className="text-2xl font-bold text-slate-900">経営陣専用チャネル</p>
                  <p className="text-sm text-slate-600">
                    緊急の意思決定も即日で対応できるよう、経営陣向けに専用チャットと定例レビューを用意。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-2xl shadow-slate-900/5 backdrop-blur">
              <div className="border-b border-slate-200/70 bg-gradient-to-r from-primary/10 via-white to-white px-8 py-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
                  Q&A Navigation
                </p>
                <p className="mt-3 text-xl font-bold text-slate-900">
                  不安をひとつずつ解消して、投資判断をクリアに
                </p>
              </div>
              <div className="px-2 py-2 sm:px-4">
                <Accordion type="single" collapsible>
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger className="px-4 text-left text-base font-semibold text-slate-900 transition-colors hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 text-sm leading-relaxed text-slate-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div
              id="consultation-cta"
              className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 via-white to-secondary/20 p-10 shadow-xl shadow-primary/20"
            >
              <div className="pointer-events-none absolute -right-8 -top-12 h-32 w-32 rounded-full bg-primary/30 blur-2xl" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-highlight/30 blur-3xl" />
              <div className="relative space-y-4 text-center">
                <h3 className="text-2xl font-bold text-slate-900">{SECONDARY_CTA.label}</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {SECONDARY_CTA.description} フォーム送信時に希望日時をご記入いただければ、経営陣向けに優先枠を確保いたします。
                </p>
                <div className="grid gap-3 text-left text-xs text-slate-500 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/60 bg-white/70 px-4 py-3 font-medium shadow-sm">
                    事前ヒアリングシート<br />+現状分析レポート
                  </div>
                  <div className="rounded-xl border border-white/60 bg-white/70 px-4 py-3 font-medium shadow-sm">
                    KPIダッシュボードの<br />サンプルアカウント
                  </div>
                  <div className="rounded-xl border border-white/60 bg-white/70 px-4 py-3 font-medium shadow-sm">
                    ROIシミュレーターで<br />投資判断を事前確認
                  </div>
                </div>
                <p className="text-xs text-primary font-semibold">
                  {PRIMARY_CTA.label} へのリンクはページ下部のフォームにご用意しています。
                </p>
                <div className="relative flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Button variant="outline" size="lg" onClick={scrollToSection("ai-chatbot")}>
                    生成AIデモを試す
                  </Button>
                  <Button variant="cta" size="lg" onClick={scrollToSection("cta-section")}>
                    無料診断を予約
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
