import InteractiveChart from "./InteractiveChart";

// データの信頼性を視覚化するセクションを分離して再利用性を高める
const EvidenceSection = ({ items }) => (
  <section className="lp1-section" id="ai-evidence" data-fade="true">
    <div className="lp1-container">
      <div className="lp1-section-header" data-fade="true">
        <h2 className="lp1-section-title">AI導入が必須となる理由</h2>
        <p className="lp1-section-subtitle">
          最新の調査が示すように、生成AIはすでに経営のスピードと精度を高める中核テクノロジーです。
          数字の裏付けを把握しながら次の一手を描きましょう。
        </p>
      </div>

      <InteractiveChart />

      <div className="lp1-card-grid" style={{ marginTop: "2.5rem" }}>
        {items.map((item) => (
          <article key={item.id} className="lp1-card" data-fade="true">
            <h3>{item.title}</h3>
            <p style={{ fontWeight: 700, color: "var(--lp1-navy-700)", marginBottom: "0.75rem" }}>
              {item.stat}
            </p>
            <p>{item.description}</p>
            <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--lp1-text-secondary)" }}>
              出典：
              <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                {item.sourceLabel}
              </a>
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default EvidenceSection;
