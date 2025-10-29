import "../../styles/lp.css";

const heroHeadlines = {
  main: "変化を先読みする経営判断",
  sub: "生成AIと診断士で意思決定リードタイム▲35%（例）、粗利率＋2.3pt（例）を実現。週1回のレポートで次の一手を迷わず選べます。",
  value: "年商5,000万円〜15億円の経営者が、意思決定に専念できる時間を週6時間（例）創出。",
};

const primaryCtas = [
  {
    id: "consultation",
    label: "30分で仮説整理を始める",
    description: "無料相談で経営課題の優先順位と必要データを整理します。",
  },
  {
    id: "diagnosis",
    label: "1週間で意思決定レポートを試す",
    description: "仮診断で週次AIレポートと意思決定ボードの試用版を提供。",
  },
  {
    id: "materials",
    label: "生成AI活用ガイドを今すぐ読む",
    description: "資料ダウンロードで管理会計テンプレートと外部環境チェックリストを入手。",
  },
];

const whySignals = [
  {
    title: "金利上昇と資金調達コスト",
    detail:
      "政策金利の引き上げで借入コストが平均▲0.6pt（例）。更新の遅れは粗利率と投資判断を直撃。",
  },
  {
    title: "需給変動の両極化",
    detail:
      "業種によって需要が月次から週次に変動。需給ギャップを先読みできないと在庫と受注の機会損失が発生。",
  },
  {
    title: "制度変更の高速化",
    detail:
      "補助金・税制の要件更新が四半期ごとに実施。追随が遅れると採択・優遇の機会を逃す。",
  },
  {
    title: "テクノロジー導入の加速",
    detail:
      "生成AI活用企業は意思決定速度が平均1.4倍（例）。後追いでは顧客対応が遅れ、離脱率＋12％（例）に。",
  },
  {
    title: "競争環境の再編",
    detail:
      "DXを前提とした新規参入が増加。意思決定の遅延がサプライチェーン全体のコスト増を招く。",
  },
];

const problemStatements = [
  {
    label: "財務の遅れ",
    detail: "粗利率が過去3年で平均▲1.8pt（例）、資金余剰日数が14日→9日へ縮小。",
  },
  {
    label: "意思決定リードタイム",
    detail: "経営会議の決裁まで平均12日（例）。週次サイクルに追いつけない。",
  },
  {
    label: "情報の分断",
    detail: "管理会計・外部環境データが散在し、会議前夜まで論点が固まらない。",
  },
];

const promiseMetrics = [
  "粗利率＋2〜4pt（例）",
  "在庫回転＋18％（例）",
  "意思決定リードタイム▲35％（例）",
];

const valueAssets = [
  {
    name: "外部環境スナップショット",
    value: "政策・需給・競争データを週次で整理し、先読みの判断材料を共有。",
  },
  {
    name: "意思決定ボード",
    value: "粗利・資金・KPIを一画面で可視化。AIが次の一手候補を提示。",
  },
  {
    name: "週次レビュー伴走",
    value: "診断士がAI提案を検証し、優先アクションと責任者を確定。",
  },
];

const howSteps = [
  {
    title: "現状診断",
    detail: "決算・試算表・受注残を診断シートで整理し、ベンチマークと差異を可視化。",
    deliverable: "初回ヒアリング資料／状況診断シート",
  },
  {
    title: "仮説設計",
    detail: "経営課題マップで粗利・資金・成長テーマの仮説を設定。",
    deliverable: "経営課題マップ／優先順位リスト",
  },
  {
    title: "生成AI分析",
    detail: "外部環境スナップショットと粗利・資金繰り予測レポートをAIが作成。",
    deliverable: "外部環境スナップショット／予測レポート",
  },
  {
    title: "経営計画",
    detail: "意思決定ボードと中期数値シートで数値・施策を確定します。",
    deliverable: "意思決定ボード／中期数値シート",
  },
  {
    title: "実行管理",
    detail: "月次KPIレポートと週次会議体で進捗を追跡。AIが乖離要因と代替案を提示。",
    deliverable: "月次KPIレポート／週次意思決定ノート",
  },
  {
    title: "検証・改善",
    detail: "差異分析ダッシュボードで仮説を更新し、次月アクションを決定。",
    deliverable: "差異分析ダッシュボード／次月アクションリスト",
  },
];

const caseStudies = [
  {
    industry: "食品製造",
    revenue: "年商8億円",
    impact: "在庫回転＋28％（例）／意思決定リードタイム▲41％（例）／欠品率▲35％（例）",
  },
  {
    industry: "精密部品加工",
    revenue: "年商12億円",
    impact: "粗利率＋3.1pt（例）／補助金採択2件／資金余剰日数＋11日（例）",
  },
  {
    industry: "地域建設",
    revenue: "年商5.5億円",
    impact: "利益率＋2.4pt（例）／案件選定の週次化／現場会議時間▲30％（例）",
  },
];

const faqItems = [
  {
    question: "費用はどのくらいですか？",
    answer:
      "月額22万円（例）の伴走プランと成果指標連動型プランをご用意。初回相談でROIシミュレーションを提示します。",
  },
  {
    question: "支援期間の目安は？",
    answer: "初月で計画ドラフトを完成、2ヶ月目で週次レポート運用開始、6ヶ月で改善サイクルを定着させます。",
  },
  {
    question: "社内体制はどの程度必要ですか？",
    answer:
      "経営者・財務担当・現場責任者の3名が参加すれば十分。必要に応じて当社が会議体運営を代行します。",
  },
  {
    question: "データの扱いは安全ですか？",
    answer:
      "NDA締結後、暗号化クラウドに保管。アクセス権限を分離し、月次で操作ログを共有します。",
  },
  {
    question: "AIの精度はどの程度ですか？",
    answer:
      "過去3年の実績データと外部指標を掛け合わせ、予測誤差平均±6％（例）。診断士が全件レビューし説明可能性を担保します。",
  },
  {
    question: "補助金申請にも対応できますか？",
    answer:
      "ものづくり補助金・事業再構築補助金など主要制度に対応。採択ストーリーと必要書類をセットで提供します。",
  },
];

const riskMitigation = [
  "1ヶ月トライアルで週次AIレポートと意思決定ボードを試用。合意したKPIに届かなければ本契約を再協議。",
  "着手前に粗利・資金・KPIターゲットを設定し、効果測定ダッシュボードで透明に共有。",
];

const trustPoints = [
  "代表・古町聖文（中小企業診断士）が主導し、中小企業支援法と中小企業庁ガイドラインに準拠。",
  "プロジェクト開始時にNDA締結。社内でも最小限のアクセス権限に限定し、守秘義務を徹底。",
  "国内リージョンの暗号化クラウドとISO27001取得パートナーを活用。バックアップは日次で取得し、ログを共有。",
];

const finalCta = {
  heading: "次の一手を週次で確信に変える準備はできていますか？",
  description:
    "初回30分の無料相談で、生成AIと診断士が示す“今すぐ着手すべき3つの施策”をお持ち帰りください。",
};

const Index = () => {
  return (
    <div className="lp-root">
      <header className="lp-header">
        <div className="container lp-header__inner">
          <div className="lp-brand">
            <span className="lp-brand__title">株式会社創和経営コンサルティング</span>
            <span className="lp-brand__subtitle">専門家×生成AI 経営計画・実行支援</span>
          </div>
          <nav className="lp-nav" aria-label="主要ナビゲーション">
            <ul>
              <li>
                <a href="#hero">概要</a>
              </li>
              <li>
                <a href="#why">Why</a>
              </li>
              <li>
                <a href="#problem">課題</a>
              </li>
              <li>
                <a href="#what">What</a>
              </li>
              <li>
                <a href="#how">How</a>
              </li>
              <li>
                <a href="#cases">事例</a>
              </li>
              <li>
                <a href="#offer">オファー</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </nav>
          <a className="btn btn-primary" href="#contact">
            無料相談へ進む
          </a>
        </div>
      </header>

      <main>
        <section id="hero" className="lp-hero">
          <div className="container lp-hero__content">
            <div>
              <h1>{heroHeadlines.main}</h1>
              <p className="lp-hero__lead">{heroHeadlines.sub}</p>
              <p className="lp-hero__support">{heroHeadlines.value}</p>
              <div className="lp-hero__ctas" role="group" aria-label="主要CTA">
                {primaryCtas.map((cta) => (
                  <a key={cta.id} className="btn btn-cta" href={`#${cta.id}`}>
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="lp-hero__evidence">
              <h2>Why：意思決定の質・速さ・先見性が生命線に</h2>
              <ul>
                {whySignals.slice(0, 3).map((signal) => (
                  <li key={signal.title}>
                    <span className="lp-hero__evidence-title">{signal.title}</span>
                    <span>{signal.detail}</span>
                  </li>
                ))}
              </ul>
              <p className="lp-hero__note">
                外部環境の更新速度は月次から週次へ。意思決定を前倒しできる組織だけが機会を捕まえられます。
              </p>
            </div>
          </div>
        </section>

        <section id="why" className="lp-section">
          <div className="container">
            <h2>外部環境が迫る危機と機会</h2>
            <div className="lp-grid lp-grid--three">
              {whySignals.map((signal) => (
                <article key={signal.title} className="lp-card">
                  <h3>{signal.title}</h3>
                  <p>{signal.detail}</p>
                </article>
              ))}
            </div>
            <p className="lp-section__summary">
              環境変化を先回りしなければ、意思決定の遅延が利益とキャッシュを侵食します。一方で、週次で先読みできれば競争優位が拡張します。
            </p>
          </div>
        </section>

        <section id="problem" className="lp-section lp-section--muted">
          <div className="container">
            <h2>意思決定を鈍らせる現状</h2>
            <div className="lp-grid lp-grid--three">
              {problemStatements.map((item) => (
                <article key={item.label} className="lp-card">
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
            <p className="lp-section__summary">
              情報収集と資料づくりに追われ、経営者が判断に使える時間が削られています。
            </p>
          </div>
        </section>

        <section id="what" className="lp-section">
          <div className="container">
            <h2>What：専門家×生成AIが約束する成果</h2>
            <p className="lp-section__summary">
              私たちは、専門家の洞察と生成AIの先読みで以下の成果を目指します。
            </p>
            <ul className="lp-metric-list">
              {promiseMetrics.map((metric) => (
                <li key={metric}>{metric}</li>
              ))}
            </ul>
            <div className="lp-grid lp-grid--three">
              {valueAssets.map((asset) => (
                <article key={asset.name} className="lp-card">
                  <h3>{asset.name}</h3>
                  <p>{asset.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="lp-section lp-section--muted">
          <div className="container">
            <h2>How：6ステップで意思決定サイクルを高速化</h2>
            <ol className="lp-step-list">
              {howSteps.map((step, index) => (
                <li key={step.title}>
                  <div className="lp-step-number">{index + 1}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                    <p className="lp-step-deliverable">成果物：{step.deliverable}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="cases" className="lp-section">
          <div className="container">
            <h2>匿名事例で見る成果</h2>
            <div className="lp-grid lp-grid--three">
              {caseStudies.map((item) => (
                <article key={item.industry} className="lp-card lp-card--case">
                  <h3>{item.industry}</h3>
                  <p className="lp-card__meta">{item.revenue}</p>
                  <p>{item.impact}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="offer" className="lp-section lp-section--accent">
          <div className="container">
            <h2>行動を選べる三段オファー</h2>
            <div className="lp-grid lp-grid--three">
              {primaryCtas.map((cta) => (
                <article key={cta.id} className="lp-card lp-card--offer" id={cta.id}>
                  <h3>{cta.label}</h3>
                  <p>{cta.description}</p>
                  <a className="btn btn-outline" href="#contact">
                    今すぐ相談する
                  </a>
                </article>
              ))}
            </div>
            <div className="lp-contact" id="contact">
              <p>
                お急ぎの方は <a href="tel:092-231-2920">092-231-2920</a>（平日9:00-18:00）または
                <a href="mailto:k.furumachi@lognowa.com"> k.furumachi@lognowa.com</a> までご連絡ください。
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="lp-section">
          <div className="container">
            <h2>FAQ</h2>
            <div className="lp-faq">
              {faqItems.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section--muted">
          <div className="container">
            <h2>小さく試し、透明に進めるために</h2>
            <ul className="lp-bullet-list">
              {riskMitigation.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lp-section">
          <div className="container">
            <h2>信頼を支える3つの約束</h2>
            <ul className="lp-bullet-list">
              {trustPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lp-section lp-section--cta">
          <div className="container lp-final-cta">
            <h2>{finalCta.heading}</h2>
            <p>{finalCta.description}</p>
            <div className="lp-hero__ctas" role="group" aria-label="最終CTA">
              {primaryCtas.map((cta) => (
                <a key={cta.id} className="btn btn-cta" href={`#${cta.id}`}>
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="lp-floating-cta">
        <a className="btn btn-cta" href="#consultation">
          無料相談で話を聞く
        </a>
      </div>
    </div>
  );
};

export default Index;
