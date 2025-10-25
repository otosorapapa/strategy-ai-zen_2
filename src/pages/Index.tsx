import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import "../../styles/lp.css";

const navItems = [
  { id: "hero", label: "トップ" },
  { id: "benefits", label: "導入メリット" },
  { id: "flow", label: "支援フロー" },
  { id: "quarterly", label: "四半期レビュー" },
  { id: "decision", label: "意思決定支援" },
  { id: "experts", label: "専門家" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "お問い合わせ" },
  { id: "references", label: "参考資料" },
];

const stats = [
  {
    value: "75%",
    title: "知識労働者が既にAIを活用",
    description:
      "MicrosoftとLinkedInの2024 Work Trend Indexでは、知識労働者の75%がAIを仕事に組み込んでいると回答しました。",
    source: "Microsoft & LinkedIn Work Trend Index 2024",
  },
  {
    value: "90%",
    title: "AIで時間を節約",
    description:
      "AIを活用する人の90%が、重要業務に時間を割けるようになったと回答。迅速な計画策定が実現します。",
    source: "Microsoft & LinkedIn Work Trend Index 2024",
  },
  {
    value: "85%",
    title: "重要業務へ集中",
    description:
      "AIがルーチンを処理することで、85%が戦略的な仕事に集中できると報告。経営者の意思決定時間を創出します。",
    source: "Microsoft & LinkedIn Work Trend Index 2024",
  },
  {
    value: "79%",
    title: "経営者が導入を必須と認識",
    description:
      "経営者の79%が、競争力維持にはAI導入が不可欠だと回答。意思決定の遅れが競争力の低下に直結します。",
    source: "Microsoft & LinkedIn Work Trend Index 2024",
  },
];

const flowSteps = [
  {
    step: "01",
    title: "ヒアリングとゴール設計",
    detail:
      "経営者のビジョンと現状課題を丁寧にヒアリングし、年商5,000万円〜15億円規模に最適化した目標とKPIを設計します。",
    aiRole: "事前質問票から課題を要約し、想定シナリオを準備",
    expertRole: "中小企業診断士が事業構造と制約条件を整理",
  },
  {
    step: "02",
    title: "データ収集と入力支援",
    detail:
      "売上目標・投資予定・人員計画など必要情報を安全なポータルで入力。入力時にはリアルタイムで不足データを通知します。",
    aiRole: "過去データとの整合性チェックと補完提案",
    expertRole: "財務専門家が前提条件と投資配分をレビュー",
  },
  {
    step: "03",
    title: "生成AIによる分析とドラフト",
    detail:
      "最新の市場統計と規制情報を参照し、競合比較・財務予測・アクションプランを最短1日でドラフト生成します。",
    aiRole: "市場分析・財務モデリング・シナリオ自動化",
    expertRole: "ドラフトの妥当性をチェックし優先施策を選定",
  },
  {
    step: "04",
    title: "専門家レビューとブラッシュアップ",
    detail:
      "生成された計画を中小企業診断士・会計士が精査。金融機関審査に耐える形式へ整え、実行可能性を磨き上げます。",
    aiRole: "フィードバックを反映し再計算・資料整形",
    expertRole: "リスク評価と代替案の提示、ディスカッション",
  },
  {
    step: "05",
    title: "納品と四半期ごとの伴走",
    detail:
      "PowerPoint/PDFで納品し、経営会議での説明資料と想定問答を同梱。四半期ごとのアップデートも伴走します。",
    aiRole: "アクションプランの進捗トラッキングと再提案",
    expertRole: "進捗確認と次期施策の共同検討",
  },
];

const reviewHighlights = [
  {
    title: "激しい外部環境変化",
    description:
      "SCOREは競争が激しい市場ではビジネスプランを四半期ごとに見直すべきだと指摘し、Appleは90日ごとに更新しています。",
    source: "SCORE When and Why Should You Review Your Business Plan",
  },
  {
    title: "高成長企業は四半期更新が必須",
    description:
      "Investopediaは新規事業や急成長企業では四半期ごとに事業計画を改訂する必要があると解説。",
    source: "Investopedia Business Plan",
  },
  {
    title: "AIでレビューを高速化",
    description:
      "生成AIが市場指標を自動収集し、差分分析と施策草案を提示。経営者は意思と情熱に集中できます。",
    source: "Microsoft & LinkedIn Work Trend Index 2024",
  },
];

const aiSupportPoints = [
  {
    title: "ルーチンワークを数分に短縮",
    detail:
      "ハーバード大学DCEは、コピーライティングやデータ収集、ビジュアル作成といった作業が数時間から数分に短縮されると報告。",
    source: "Harvard DCE AI Will Shape the Future of Marketing",
  },
  {
    title: "経営者の判断軸を引き出す",
    detail:
      "AIが下準備を担うことで、経営者は意思決定の背景となる価値観やリスク許容度の明文化に集中できます。",
    source: "Strategy AI-Zen",
  },
  {
    title: "最終判断は経営者自身",
    detail:
      "私たちはAIをあくまで思考パートナーと位置づけ、経営者の意思と情熱を引き出すファシリテーションに注力します。",
    source: "Strategy AI-Zen",
  },
];

const expertTeam = [
  {
    name: "田中 圭",
    role: "中小企業診断士 / 元メガバンク法人担当",
    description:
      "調達・再生案件を50社以上支援。金融機関の審査観点を踏まえた計画書作成を得意とします。",
  },
  {
    name: "小林 真",
    role: "戦略コンサルタント",
    description:
      "成長戦略・M&A後統合を中心に、年商5億〜30億規模の企業で変革プロジェクトをリード。",
  },
  {
    name: "斎藤 美咲",
    role: "公認会計士 / 税理士",
    description:
      "事業計画の財務モデル設計と補助金申請の支援実績が豊富。実行性を重視したキャッシュフロー設計が強みです。",
  },
];

const faqItems = [
  {
    question: "生成AIに機密情報を入力しても安全ですか？",
    answer:
      "通信・保存ともにAES-256で暗号化し、国内データセンターで管理。アクセス権限は役割ベースで制御し、NDA締結後に環境を発行します。",
  },
  {
    question: "料金体系はどのようになっていますか？",
    answer:
      "年商や支援範囲に応じたカスタム見積りです。初回相談で現状とゴールを伺い、四半期レビューを含むプランをご提案します。",
  },
  {
    question: "生成AIが作成した内容の正確性はどう担保しますか？",
    answer:
      "専門家がすべてのドラフトをレビューし、根拠となる指標や仮定を明示。必要に応じて裏付け資料とともに納品します。",
  },
  {
    question: "社内にAIの知見がなくても導入できますか？",
    answer:
      "初期オンボーディングで利用方法をレクチャーし、社内共有用のマニュアルも提供。操作に関する質問にはチャットで即時対応します。",
  },
];

const references = [
  {
    id: "※1",
    label: "Microsoft & LinkedIn. (2024). Work Trend Index: AI at Work is Here",
    url: "https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part",
  },
  {
    id: "※2",
    label: "SCORE. (2023). When and Why Should You Review Your Business Plan?",
    url: "https://www.score.org/greaterphoenix/resource/blog-post/when-and-why-should-you-review-your-business-plan",
  },
  {
    id: "※3",
    label: "Investopedia. (2024). Business Plan",
    url: "https://www.investopedia.com/terms/b/business-plan.asp",
  },
  {
    id: "※4",
    label: "Harvard DCE. (2024). AI Will Shape the Future of Marketing",
    url: "https://professional.dce.harvard.edu/blog/ai-will-shape-the-future-of-marketing/",
  },
];

const initialForm = {
  name: "",
  company: "",
  role: "",
  email: "",
  phone: "",
  message: "",
};

type ContactFormState = typeof initialForm;

type SectionRefMap = Record<string, HTMLElement | null>;

const Index = () => {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [formData, setFormData] = useState<ContactFormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const sectionRefs = useRef<SectionRefMap>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              setActiveSection(id);
            }
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    navItems.forEach((item) => {
      const node = sectionRefs.current[item.id];
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = sectionRefs.current[id];
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="lp-root">
      <header className={`top-nav ${activeSection !== "hero" ? "is-scrolled" : ""}`}>
        <div className="container nav-inner">
          <a href="#hero" className="brand" aria-label="AI経営計画パートナー ホーム">
            STRATEGY AI-ZEN
          </a>
          <nav aria-label="メインナビゲーション">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "is-active" : ""}
                onClick={(event) => handleNavClick(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <a className="btn btn-outline" href="#contact">
              無料相談を予約
            </a>
            <a className="contact-phone" href="tel:03-1234-5678">
              03-1234-5678
            </a>
          </div>
        </div>
      </header>

      <main>
        <section
          id="hero"
          ref={(node) => {
            sectionRefs.current.hero = node ?? null;
          }}
          className="hero-section"
        >
          <div className="container hero-layout">
            <div className="hero-copy" data-animate>
              <span className="hero-badge">年商5,000万円〜15億円の経営者さまへ</span>
              <h1>
                AI × 経営者の情熱で、未来を描く。
                <span>生成AIが市場分析と財務予測を最短1日で行い、意思決定を加速します。</span>
              </h1>
              <p>
                生成AIは意思決定を代替するのではなく、経営者の判断を磨き上げるためのパートナーです。
                MicrosoftとLinkedInの調査ではAI活用者の90%が時間を節約し、85%が重要業務へ集中できたと回答しています。
                今こそ、経営者の意思と情熱に集中する時間を取り戻しましょう。
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">
                  無料相談を予約する
                </a>
                <a className="btn btn-ghost" href="mailto:info@strategy-ai-zen.jp">
                  info@strategy-ai-zen.jp
                </a>
              </div>
              <div className="hero-contact">
                <div>
                  <span>受付時間</span>
                  <strong>平日 9:00〜18:00</strong>
                </div>
                <div>
                  <span>拠点</span>
                  <strong>東京・新潟（オンライン全国対応）</strong>
                </div>
              </div>
            </div>
            <div className="hero-visual" aria-hidden="true">
              <div className="glow" />
              <div className="orb" />
              <div className="grid" />
            </div>
          </div>
        </section>

        <section
          id="benefits"
          ref={(node) => {
            sectionRefs.current.benefits = node ?? null;
          }}
          className="section benefits"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <span className="section-kicker">BENEFITS</span>
              <h2>生成AI導入で得られる4つの経営インパクト</h2>
              <p>
                生成AIは市場分析・財務予測・資料ドラフトを高速化し、経営者が戦略判断に集中できる環境をつくります。
                データはすべて信頼できる公的レポートに基づいています。
              </p>
            </div>
            <div className="stats-grid">
              {stats.map((stat) => (
                <article key={stat.title} className="stat-card" data-animate>
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                  <span title={stat.source}>{stat.description}</span>
                </article>
              ))}
            </div>
            <div className="benefit-note" data-animate>
              <p>
                AIが外部環境の変化をいち早く捉え、経営者が判断すべき論点を浮き彫りにします。
                最終的な意思決定とビジョンの策定は経営者自身が担い、私たちはその準備と対話を徹底的に支援します。
              </p>
            </div>
          </div>
        </section>

        <section
          id="flow"
          ref={(node) => {
            sectionRefs.current.flow = node ?? null;
          }}
          className="section flow"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <span className="section-kicker">SERVICE FLOW</span>
              <h2>経営者の意思決定を支える5つのステップ</h2>
              <p>
                AIが収集・分析を、専門家が妥当性検証を担い、経営者が最終判断に集中できる体制を築きます。
              </p>
            </div>
            <ol className="flow-steps">
              {flowSteps.map((step) => (
                <li key={step.step} className="flow-step" data-animate>
                  <div className="flow-index">{step.step}</div>
                  <div className="flow-body">
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                    <div className="flow-roles">
                      <div>
                        <span>AIの役割</span>
                        <strong>{step.aiRole}</strong>
                      </div>
                      <div>
                        <span>専門家の役割</span>
                        <strong>{step.expertRole}</strong>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="quarterly"
          ref={(node) => {
            sectionRefs.current.quarterly = node ?? null;
          }}
          className="section quarterly"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <span className="section-kicker">WHY NOW</span>
              <h2>四半期ごとの見直しが競争力を生む時代</h2>
              <p>
                SCOREとInvestopediaは、外部環境が激変する現在では四半期単位でビジネスプランを更新する必要性を強調しています。
                AIがレビューの高速化と客観性の担保を実現します。
              </p>
            </div>
            <div className="timeline">
              {reviewHighlights.map((item) => (
                <article key={item.title} className="timeline-card" data-animate>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span>{item.source}</span>
                </article>
              ))}
            </div>
            <div className="quarterly-bottom" data-animate>
              <div>
                <h3>四半期サイクルを支えるAIダッシュボード</h3>
                <ul>
                  <li>市場指標・補助金・規制情報を自動収集し、経営陣へダイジェスト配信。</li>
                  <li>実績と計画の差分を可視化し、次四半期のアクションプラン案を生成。</li>
                  <li>経営会議前にはエビデンス付きの資料セットを自動整形。</li>
                </ul>
              </div>
              <div className="quarterly-cta">
                <h4>導入しないリスク</h4>
                <p>
                  生成AIを活用しない企業は、意思決定のスピードと正確性で遅れを取り、
                  AIを使いこなす競合に市場機会を奪われる可能性があります。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="decision"
          ref={(node) => {
            sectionRefs.current.decision = node ?? null;
          }}
          className="section decision"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <span className="section-kicker">AI SUPPORT</span>
              <h2>AIは経営者の意思を引き出す“参謀”です</h2>
              <p>
                ハーバード大学DCEは、AIを活用しない人材はAIを使う人材に取って代わられると警告しています。
                私たちの支援はAIと専門家の二重体制で、経営者の判断軸を明確にします。
              </p>
            </div>
            <div className="decision-grid">
              {aiSupportPoints.map((point) => (
                <article key={point.title} className="decision-card" data-animate>
                  <h3>{point.title}</h3>
                  <p>{point.detail}</p>
                  <span>{point.source}</span>
                </article>
              ))}
            </div>
            <div className="decision-quote" data-animate>
              <p>
                「AIがレポートをドラフトし、専門家が裏付けを整える。経営者は自社のビジョンとリーダーシップに集中し、
                最終的な意思決定を下す。」——これがSTRATEGY AI-ZENの価値提供です。
              </p>
            </div>
          </div>
        </section>

        <section
          id="experts"
          ref={(node) => {
            sectionRefs.current.experts = node ?? null;
          }}
          className="section experts"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <span className="section-kicker">TEAM</span>
              <h2>専門家が伴走し、金融機関にも信頼される計画書へ</h2>
              <p>
                中小企業診断士・会計士・戦略コンサルタントがチームで支援。顔の見える伴走で安心感を提供します。
              </p>
            </div>
            <div className="experts-grid">
              {expertTeam.map((expert) => (
                <article key={expert.name} className="expert-card" data-animate>
                  <div className="avatar" aria-hidden="true">{expert.name.charAt(0)}</div>
                  <div>
                    <h3>{expert.name}</h3>
                    <span>{expert.role}</span>
                    <p>{expert.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="expert-support" data-animate>
              <ul>
                <li>金融機関提出用の根拠資料・財務シートをセットで納品</li>
                <li>導入後も月次・四半期レビュー会議をファシリテーション</li>
                <li>経営陣・現場向けにAI活用トレーニングを提供</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="faq"
          ref={(node) => {
            sectionRefs.current.faq = node ?? null;
          }}
          className="section faq"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <span className="section-kicker">FAQ</span>
              <h2>よくある質問</h2>
              <p>データの扱いや料金体系など、透明性を重視してお答えします。</p>
            </div>
            <div className="faq-list">
              {faqItems.map((item) => (
                <details key={item.question} data-animate>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          ref={(node) => {
            sectionRefs.current.contact = node ?? null;
          }}
          className="section contact"
        >
          <div className="container contact-layout">
            <div className="contact-intro" data-animate>
              <span className="section-kicker">CONTACT</span>
              <h2>まずは無料相談で課題とゴールを共有しましょう</h2>
              <p>
                初回相談では、現状の課題と目指す姿をヒアリングし、必要な支援内容とスケジュールをご提案します。
                オンライン・対面どちらも可能です。
              </p>
              <div className="contact-info">
                <div>
                  <span>電話</span>
                  <a href="tel:03-1234-5678">03-1234-5678</a>
                </div>
                <div>
                  <span>メール</span>
                  <a href="mailto:info@strategy-ai-zen.jp">info@strategy-ai-zen.jp</a>
                </div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} data-animate>
              <label>
                お名前
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                会社名
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                役職
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                />
              </label>
              <label>
                メールアドレス
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                電話番号
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
              <label>
                ご相談内容
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="例：事業計画のブラッシュアップ、金融機関向け資料の準備 など"
                />
              </label>
              <button type="submit" className="btn btn-primary">
                相談内容を送信する
              </button>
              {submitted && (
                <p className="form-notice">送信が完了しました。担当者より2営業日以内にご連絡します。</p>
              )}
            </form>
          </div>
        </section>

        <section
          id="references"
          ref={(node) => {
            sectionRefs.current.references = node ?? null;
          }}
          className="section references"
        >
          <div className="container">
            <div className="section-header" data-animate>
              <span className="section-kicker">EVIDENCE</span>
              <h2>引用・参考資料</h2>
              <p>本文中の統計や主張は以下の一次情報・権威あるメディアを参照しています。</p>
            </div>
            <ul className="references-list">
              {references.map((reference) => (
                <li key={reference.id} data-animate>
                  <span>{reference.id}</span>
                  <a href={reference.url} target="_blank" rel="noreferrer">
                    {reference.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="page-footer">
        <div className="container footer-inner">
          <div>
            <strong>STRATEGY AI-ZEN</strong>
            <p>生成AIと専門家の伴走で、経営計画の精度とスピードを両立します。</p>
          </div>
          <div className="footer-contact">
            <a href="tel:03-1234-5678">03-1234-5678</a>
            <a href="mailto:info@strategy-ai-zen.jp">info@strategy-ai-zen.jp</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
