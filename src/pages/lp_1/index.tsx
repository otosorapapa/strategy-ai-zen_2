import { useEffect, useMemo, useState } from "react";
import EvidenceSection from "@/components/EvidenceSection";
import ProcessSteps from "@/components/ProcessSteps";
import "@/assets/index-lp1.css"; // 新LPのトーン&マナーを読み込む

const evidenceItems = [
  {
    id: "stanford-hai",
    title: "世界的に加速するAI活用",
    stat: "企業の78%がAIを活用",
    description:
      "Stanford HAIのAI Indexによると、2024年には企業の78%がAIを活用し、生産性向上と技能格差縮小に寄与しています。",
    sourceLabel: "Stanford HAI AI Index 2025",
    sourceUrl: "https://hai.stanford.edu/ai-index/2025-ai-index-report#:~:text=",
  },
  {
    id: "smb-growth",
    title: "中小企業でも導入が進行",
    stat: "52%がAIを利用 (48%→52%)",
    description:
      "AI and US SMBs 2024レポートでは、米国中小企業のAI利用率が数か月で48%から52%へ上昇したと報告。決断のスピードが競争力を左右しています。",
    sourceLabel: "AI and US SMBs 2024 Report",
    sourceUrl: "https://www.smallbusinessdigitalalliance.com/wp-content/uploads/2024/01/AI-and-US-SMBs-2024-Report.pdf#:~:text=Our%20research%20highlights%20that%2052,just%20a%20few%20months%20back",
  },
  {
    id: "nber-productivity",
    title: "生成AIによる生産性向上",
    stat: "平均14%の効率化",
    description:
      "NBERの研究では、生成AIがカスタマーサポート業務の生産性を平均14%引き上げたと結論付けており、バックオフィス業務にも応用が期待されます。",
    sourceLabel: "NBER Working Paper 31161",
    sourceUrl: "https://www.nber.org/system/files/working_papers/w31161/w31161.pdf#:~:text=tool%20increases%20productivity%2C%20as%20measured,heterogeneity%20in%20effects%20across%20workers",
  },
  {
    id: "quarterly-update",
    title: "戦略の更新頻度が上昇",
    stat: "49%が四半期で戦略更新",
    description:
      "Association for Project Managementの調査では、経営者の49%が四半期ごとに戦略を更新。AIによる分析サイクルが意思決定を後押しします。",
    sourceLabel: "Association for Project Management / Business Wire",
    sourceUrl: "https://www.businesswire.com/news/home/20241211770440/en/49-of-Business-Leaders-Update-Strategies-Every-Quarter-Amid-Rising-AI-and-Global-Instability-Pressures#:~:text=LONDON,organisation%20for%20the%20project%20profession",
  },
];

const useFadeInOnScroll = () => {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-fade="true"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
};

const HeroSection = () => (
  <section className="lp1-hero" id="hero" data-fade="true">
    <div className="lp1-container lp1-hero-inner">
      <div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontWeight: 500 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--lp1-gold-400)" }} />
          経営計画 × 生成AI × 専門家伴走
        </span>
        <h1>最短1日で経営計画のドラフトを生成AIが作成。経営者の意思決定と専門家の知見で、貴社の未来を描く</h1>
        <p>
          市場分析から財務予測までAIが自動生成し、中小企業診断士がブラッシュアップ。
          経営者の情熱を中心に据えた計画づくりで、透明性と堅実性を両立させます。
        </p>
        <div className="lp1-cta-group">
          <button type="button" className="lp1-button lp1-button-primary">無料相談</button>
          <button type="button" className="lp1-button lp1-button-outline">資料請求</button>
          <button
            type="button"
            className="lp1-button lp1-button-outline"
            style={{ borderColor: "rgba(255, 255, 255, 0.4)", background: "rgba(255,255,255,0.12)" }}
          >
            チャットで質問
          </button>
        </div>
      </div>
    </div>
  </section>
);

const PassionSection = () => (
  <section className="lp1-section" data-fade="true">
    <div className="lp1-container">
      <h2 className="lp1-section-title">AIは意思決定を補完する参謀</h2>
      <p className="lp1-section-subtitle">
        生成AIは経営者の判断を支えるためにあり、最も重要なのは貴社のビジョンと情熱です。
        私たちは意思決定の背景を整理し、透明なエビデンスと共に未来像を描くお手伝いをします。
      </p>
      <div className="lp1-card-grid">
        {[
          {
            title: "データ統合とリスクシミュレーション",
            description: "市場・財務・人材データを横断的に分析し、経営者が確認すべきポイントを絞り込みます。",
          },
          {
            title: "意思決定の見える化",
            description: "AIが複数シナリオを提示し、意思決定の根拠と期待成果を明文化。社内共有がスムーズになります。",
          },
          {
            title: "専門家による妥当性検証",
            description: "中小企業診断士と金融機関出身者が前提条件を検証し、堅実な計画に整えます。",
          },
        ].map((card) => (
          <article className="lp1-card" key={card.title} data-fade="true">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
      <div className="lp1-emphasis-text" data-fade="true">
        AIはデータ分析や予測を迅速に行い、社長がビジョン策定に集中できるよう支援します。
        最終判断を下すのは経営者自身であり、その意思が計画書全体の価値を決定づけます。
      </div>
    </div>
  </section>
);

const CTABand = () => (
  <section className="lp1-section" style={{ paddingTop: "2rem" }} data-fade="true">
    <div className="lp1-container" style={{ background: "linear-gradient(135deg, rgba(6,22,44,0.9), rgba(28,156,138,0.85))", borderRadius: "24px", padding: "2.8rem", color: "var(--lp1-white)", boxShadow: "0 24px 48px rgba(6,22,44,0.22)" }}>
      <h2 style={{ fontWeight: 700, margin: 0, fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>貴社の次の一手を共に描きませんか</h2>
      <p style={{ marginTop: "1rem", marginBottom: "2rem", fontSize: "1.05rem", lineHeight: 1.8 }}>
        最短1日でAIドラフトをお渡しし、専門家が責任を持って仕上げます。
        四半期ごとのアップデートまで伴走することで、経営の意思決定を透明にし、ステークホルダーからの信頼を築きます。
      </p>
      <div className="lp1-cta-group">
        <button type="button" className="lp1-button lp1-button-primary" style={{ background: "linear-gradient(135deg, var(--lp1-gold-400), var(--lp1-gold-500))" }}>
          無料相談
        </button>
        <button type="button" className="lp1-button lp1-button-outline" style={{ borderColor: "rgba(255,255,255,0.6)" }}>
          資料請求
        </button>
        <button type="button" className="lp1-button lp1-button-outline" style={{ borderColor: "rgba(255,255,255,0.6)" }}>
          チャットで質問
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="lp1-footer">
    <div className="lp1-container">
      <p style={{ fontWeight: 600 }}>© AI経営計画ラボ</p>
      <div className="lp1-sources">
        <p>
          出典：
          <a href="https://hai.stanford.edu/ai-index/2025-ai-index-report#:~:text=" target="_blank" rel="noreferrer">Stanford HAI AI Index 2025</a>、
          <a href="https://www.smallbusinessdigitalalliance.com/wp-content/uploads/2024/01/AI-and-US-SMBs-2024-Report.pdf#:~:text=Our%20research%20highlights%20that%2052,just%20a%20few%20months%20back" target="_blank" rel="noreferrer">AI and US SMBs 2024</a>、
          <a href="https://www.nber.org/system/files/working_papers/w31161/w31161.pdf#:~:text=tool%20increases%20productivity%2C%20as%20measured,heterogeneity%20in%20effects%20across%20workers" target="_blank" rel="noreferrer">NBER Working Paper 31161</a>、
          <a href="https://www.businesswire.com/news/home/20241211770440/en/49-of-Business-Leaders-Update-Strategies-Every-Quarter-Amid-Rising-AI-and-Global-Instability-Pressures#:~:text=LONDON,organisation%20for%20the%20project%20profession" target="_blank" rel="noreferrer">Business Wire / Association for Project Management</a>
        </p>
      </div>
    </div>
  </footer>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const recommendations = useMemo(
    () => [
      { id: "question", label: "導入の進め方を知りたい" },
      { id: "demo", label: "デモを希望したい" },
      { id: "schedule", label: "相談日程を調整したい" },
    ],
    [],
  );

  return (
    <div className="lp1-chat-widget">
      {isOpen && (
        <div className="lp1-chat-panel" data-fade="true">
          <h4>AIコンシェルジュ</h4>
          <p>よくある質問にすぐ回答し、面談のご予約も承ります。</p>
          <div className="lp1-chat-actions">
            {recommendations.map((item) => (
              <button
                type="button"
                key={item.id}
                className="lp1-button lp1-button-primary"
                style={{ padding: "0.6rem 1.4rem", fontSize: "0.9rem" }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <button type="button" className="lp1-chat-toggle" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? "チャットを閉じる" : "チャットで質問"}
      </button>
    </div>
  );
};

const LP1Page = () => {
  useFadeInOnScroll();

  useEffect(() => {
    document.title = "生成AIを活用した経営計画書策定支援サービス｜AI経営計画ラボ";
  }, []);

  return (
    <div className="lp1-page">
      <HeroSection />
      <PassionSection />
      <EvidenceSection items={evidenceItems} />
      <ProcessSteps />
      <CTABand />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default LP1Page;
