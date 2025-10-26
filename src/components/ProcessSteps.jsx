import { FileEdit, ShieldCheck, Handshake, RefreshCcw } from "lucide-react";

// サービスの流れを明示的に示し安心感を高めるステップ表示
const steps = [
  {
    id: "ai-draft",
    icon: <FileEdit size={22} strokeWidth={1.8} />, // AIドラフト作成を示す
    title: "AIドラフト作成",
    description: "経営データと市場データを入力すると、生成AIが1日で財務・戦略ドラフトを作成。",
    note: "AIはデータ整理と仮説生成を担当し、社長は意思決定に集中できます。",
  },
  {
    id: "expert-review",
    icon: <ShieldCheck size={22} strokeWidth={1.8} />, // 専門家レビューの信頼性を強調
    title: "専門家レビュー",
    description: "中小企業診断士がリスクや前提を検証し、金融機関提出にも耐える品質へ整えます。",
    note: "AIの提案を現実的な計画に磨き上げる工程です。",
  },
  {
    id: "ceo-session",
    icon: <Handshake size={22} strokeWidth={1.8} />, // 経営者との対話を象徴
    title: "経営者との打合せ",
    description: "経営者の情熱と意思を中心に、実行戦略・ガバナンスをすり合わせます。",
    note: "AIはデータ分析や予測を迅速に行い、社長がビジョン策定に集中できるよう支援します。",
  },
  {
    id: "quarterly-update",
    icon: <RefreshCcw size={22} strokeWidth={1.8} />, // 四半期ごとの更新
    title: "四半期ごとの更新",
    description: "49%の経営者が行う四半期レビューを基準に、変化点をAIがモニタリングしてアップデート。",
    note: "最新データで継続的に計画を進化させます。",
  },
];

const ProcessSteps = () => (
  <section className="lp1-section" id="process" data-fade="true">
    <div className="lp1-container">
      <h2 className="lp1-section-title">サービスの進め方</h2>
      <p className="lp1-section-subtitle">
        経営者の意思決定を主軸に、AIと専門家が計画のドラフトから伴走までを支援します。
      </p>
      <div className="lp1-process-grid">
        {steps.map((step, index) => (
          <article className="lp1-step-card" key={step.id} data-fade="true">
            <div className="lp1-step-icon">{step.icon}</div>
            <p style={{ fontWeight: 700, color: "var(--lp1-navy-700)", marginBottom: "0.4rem" }}>STEP {index + 1}</p>
            <h3 className="lp1-step-title">{step.title}</h3>
            <p className="lp1-step-text">{step.description}</p>
            <p style={{ color: "var(--lp1-text-secondary)", fontSize: "0.95rem", fontWeight: 500 }}>{step.note}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSteps;
