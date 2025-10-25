import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import "../../styles/lp.css";

const PLACEHOLDER_IMAGE = `${import.meta.env.BASE_URL}placeholder.svg`;

type SimulationFormData = {
  goalRevenue: number;
  initialInvestment: number;
  marketSize: number;
  grossMargin: number;
};

const DEFAULT_FORM_DATA: SimulationFormData = {
  goalRevenue: 5000,
  initialInvestment: 800,
  marketSize: 120,
  grossMargin: 45,
};

const formatNumber = (value: number) => Math.round(value).toLocaleString("ja-JP");

const clampValue = (value: number, min: number, max?: number) => {
  const clampedMin = Math.max(value, min);
  if (typeof max === "number") {
    return Math.min(clampedMin, max);
  }
  return clampedMin;
};

const Index = () => {
  const [formData, setFormData] = useState<SimulationFormData>(DEFAULT_FORM_DATA);
  const { sixMonthRevenue, annualRevenue, sixMonthCashFlow, annualCashFlow } = useMemo(() => {
    const goalRevenue = Math.max(formData.goalRevenue, 0);
    const initialInvestment = Math.max(formData.initialInvestment, 0);
    const marketSize = Math.max(formData.marketSize, 0);
    const grossMarginRate = clampValue(formData.grossMargin, 0, 100) / 100;

    const sixMonthRevenueValue = goalRevenue * 0.48;
    const annualRevenueValue = goalRevenue;
    const rampFactor = marketSize > 0 ? Math.min(goalRevenue / (marketSize * 800), 0.35) + 0.65 : 1;
    const sixMonthCashFlowValue = sixMonthRevenueValue * grossMarginRate * rampFactor - initialInvestment * 0.55;
    const annualCashFlowValue = annualRevenueValue * grossMarginRate * rampFactor - initialInvestment;

    return {
      sixMonthRevenue: sixMonthRevenueValue,
      annualRevenue: annualRevenueValue,
      sixMonthCashFlow: sixMonthCashFlowValue,
      annualCashFlow: annualCashFlowValue,
    };
  }, [formData]);

  const simulationChapters = useMemo(() => {
    const marketSize = Math.max(formData.marketSize, 0);
    const goalRevenue = Math.max(formData.goalRevenue, 0);
    const grossMargin = clampValue(formData.grossMargin, 0, 100);
    const marketShare =
      marketSize > 0 ? Math.min((goalRevenue / (marketSize * 1000)) * 100, 80).toFixed(1) : "0.0";

    return [
      `市場分析：想定市場規模 ${marketSize.toLocaleString()} 億円に対し、AI推計シェアは約 ${marketShare}%`,
      `商品・サービス戦略：粗利率 ${grossMargin.toFixed(1)}% を維持する差別化要素と提供価値を整理`,
      `財務計画：売上目標 ${formatNumber(goalRevenue)} 万円を基に、投資回収とキャッシュフローを最適化`,
    ];
  }, [formData]);

  const handleSimulationChange = (key: keyof SimulationFormData) => (event: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = Number.parseFloat(event.target.value);
    const sanitized = Number.isNaN(parsedValue) ? 0 : parsedValue;

    setFormData((previous) => ({
      ...previous,
      [key]:
        key === "grossMargin"
          ? clampValue(sanitized, 0, 100)
          : clampValue(sanitized, 0),
    }));
  };

  const handleSimulationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="lp-root">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">AI経営計画書ラボ</div>
          <nav className="header-nav" aria-label="主要ナビゲーション">
            <a href="#services">サービス特徴</a>
            <a href="#simulator">AIシミュレーター</a>
            <a href="#cases">成功事例</a>
            <a href="#plans">料金プラン</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="badge">生成AI活用の経営計画支援</p>
              <h1>AIで最短1日。誰でもプロ並みの経営計画書を。</h1>
              <p className="subtitle">
                市場分析から財務予測まで、生成AIが貴社専用の経営計画書ドラフトを自動作成。専門家がレビューして完成度を高めます。
              </p>
              <a className="btn btn-accent" href="#consultation">
                無料でAI計画書を体験する
              </a>
            </div>
            <div className="hero-visual">
              <img src={PLACEHOLDER_IMAGE} alt="AI経営計画書のイメージ" />
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="container">
            <h2 className="section-title">サービスの4つの柱</h2>
            <p className="section-lead">
              生成AIと専門家のハイブリッドにより、経営計画書作成のスピードと精度を両立します。
            </p>
            <div className="service-grid">
              <article className="service-card">
                <div className="icon-circle">
                  <i className="fa-solid fa-chart-pie" aria-hidden="true" />
                </div>
                <h3>市場・競合分析の自動化</h3>
                <p>AIが業界データと競合情報を収集・要約し、機会と脅威を一目で把握できます。</p>
              </article>
              <article className="service-card">
                <div className="icon-circle">
                  <i className="fa-solid fa-chart-line" aria-hidden="true" />
                </div>
                <h3>売上・収支予測</h3>
                <p>目標売上や投資額を入力すると、5年間の財務予測グラフと主要指標を生成します。</p>
              </article>
              <article className="service-card">
                <div className="icon-circle">
                  <i className="fa-solid fa-file-lines" aria-hidden="true" />
                </div>
                <h3>文章生成とレポート作成</h3>
                <p>AIが事業概要、戦略、リスク分析、資金計画を日本語でドラフト。説得力ある構成で提示します。</p>
              </article>
              <article className="service-card">
                <div className="icon-circle">
                  <i className="fa-solid fa-user-check" aria-hidden="true" />
                </div>
                <h3>専門家レビューと修正</h3>
                <p>コンサルタントがAIドラフトをチェックし、融資審査や投資家説明に耐える計画書へ仕上げます。</p>
              </article>
            </div>
          </div>
        </section>

        <section id="simulator" className="simulator">
          <div className="container">
            <div className="simulator-header">
              <h2 className="section-title">AI計画書シミュレーター</h2>
              <p className="section-lead">
                目標数値を入力するだけで、6か月後と1年後の売上・キャッシュフロー予測とAIが提案する章立てを確認できます。
              </p>
            </div>
            <div className="simulator-content">
              <form className="sim-form" id="simForm" onSubmit={handleSimulationSubmit}>
                <div className="form-field">
                  <label htmlFor="goalRevenue">目標売上（年額・万円）</label>
                  <input
                    type="number"
                    id="goalRevenue"
                    name="goalRevenue"
                    min="0"
                    value={formData.goalRevenue}
                    onChange={handleSimulationChange("goalRevenue")}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="initialInvestment">初期投資額（万円）</label>
                  <input
                    type="number"
                    id="initialInvestment"
                    name="initialInvestment"
                    min="0"
                    value={formData.initialInvestment}
                    onChange={handleSimulationChange("initialInvestment")}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="marketSize">想定市場規模（億円）</label>
                  <input
                    type="number"
                    id="marketSize"
                    name="marketSize"
                    min="0"
                    step="0.1"
                    value={formData.marketSize}
                    onChange={handleSimulationChange("marketSize")}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="grossMargin">粗利率（%）</label>
                  <input
                    type="number"
                    id="grossMargin"
                    name="grossMargin"
                    min="0"
                    max="100"
                    value={formData.grossMargin}
                    onChange={handleSimulationChange("grossMargin")}
                  />
                </div>
              </form>
              <div className="sim-result">
                <div className="chart-container" role="img" aria-label="売上とキャッシュフロー予測">
                  <div className="chart-legend">
                    <span className="legend-item">
                      <span className="legend-swatch legend-swatch--revenue" />売上予測（万円）
                    </span>
                    <span className="legend-item">
                      <span className="legend-swatch legend-swatch--cashflow" />キャッシュフロー（万円）
                    </span>
                  </div>
                  <div className="chart-bars">
                    {["6か月後", "1年後"].map((timeframe, index) => {
                      const revenue = index === 0 ? sixMonthRevenue : annualRevenue;
                      const cashflow = index === 0 ? sixMonthCashFlow : annualCashFlow;
                      const maxAbs = Math.max(Math.abs(revenue), Math.abs(cashflow), 1);

                      const renderBar = (type: "revenue" | "cashflow", value: number) => {
                        const baseClass = `chart-bar-fill chart-bar-fill--${type}`;
                        const className = value < 0 ? `${baseClass} chart-bar-fill--negative` : baseClass;

                        return (
                          <div className="chart-bar" data-type={type}>
                            <div className={className} style={{ height: `${(Math.abs(value) / maxAbs) * 100}%` }} />
                            <span className="chart-bar-value">{formatNumber(value)}</span>
                          </div>
                        );
                      };

                      return (
                        <div className="chart-group" key={timeframe}>
                          <span className="chart-group-label">{timeframe}</span>
                          <div className="chart-bar-wrapper">
                            {renderBar("revenue", revenue)}
                            {renderBar("cashflow", cashflow)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="sim-summary">
                  <h3>AIが提案する章立て</h3>
                  <ul>
                    {simulationChapters.map((chapter) => (
                      <li key={chapter}>{chapter}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cases" className="cases">
          <div className="container">
            <h2 className="section-title">AI計画書による資金調達成功事例</h2>
            <div className="case-grid">
              <article className="case-card">
                <h3>製造業・年商18億円</h3>
                <dl>
                  <dt>課題</dt>
                  <dd>金融機関に提出する計画書が手作業で時間がかかり、説得力に欠けていた。</dd>
                  <dt>AI活用</dt>
                  <dd>生成AIが市場分析と5年分の財務計画を作成し、専門家がレビュー。</dd>
                  <dt>成果</dt>
                  <dd>計画書作成期間を60%短縮し、銀行融資がスムーズに承認された。</dd>
                </dl>
              </article>
              <article className="case-card">
                <h3>ITサービス・年商4億円</h3>
                <dl>
                  <dt>課題</dt>
                  <dd>VC向けピッチ資料と計画書の整合性が取れず、追加投資が保留になっていた。</dd>
                  <dt>AI活用</dt>
                  <dd>AIが顧客獲得モデルとARR予測を作成し、専門家が投資家目線で校閲。</dd>
                  <dt>成果</dt>
                  <dd>3週間かかっていた資料準備を1週間に短縮し、シリーズBで2億円を調達。</dd>
                </dl>
              </article>
              <article className="case-card">
                <h3>飲食チェーン・年商7億円</h3>
                <dl>
                  <dt>課題</dt>
                  <dd>新店舗展開の資金計画が曖昧で、金融機関からの質問に即答できなかった。</dd>
                  <dt>AI活用</dt>
                  <dd>AIがエリア別需要予測とキャッシュフロー計画を提示し、専門家が改善提案。</dd>
                  <dt>成果</dt>
                  <dd>説得力ある計画書を1週間で提出し、5,000万円の融資枠を確保した。</dd>
                </dl>
              </article>
            </div>
          </div>
        </section>

        <section id="plans" className="plans">
          <div className="container">
            <h2 className="section-title">料金プラン</h2>
            <div className="plan-wrapper">
              <div className="plan">
                <h3>ライトプラン</h3>
                <p className="price">月額8万円</p>
                <table>
                  <tbody>
                    <tr>
                      <th>自動生成内容</th>
                      <td>市場分析、ビジネスモデル、財務予測のドラフト</td>
                    </tr>
                    <tr>
                      <th>専門家レビュー</th>
                      <td>ドラフトチェック（簡易フィードバック）</td>
                    </tr>
                    <tr>
                      <th>サポート範囲</th>
                      <td>メール相談（48時間以内回答）</td>
                    </tr>
                    <tr>
                      <th>納品形態</th>
                      <td>AI生成レポート（PowerPoint／PDF）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="plan plan-featured">
                <h3>プロプラン</h3>
                <p className="price">月額18万円</p>
                <table>
                  <tbody>
                    <tr>
                      <th>自動生成内容</th>
                      <td>詳細な市場分析、競合比較、5年財務モデル</td>
                    </tr>
                    <tr>
                      <th>専門家レビュー</th>
                      <td>コンサルタントによる校閲＆加筆、金融機関向け最終調整</td>
                    </tr>
                    <tr>
                      <th>サポート範囲</th>
                      <td>オンラインMTG（月2回）・金融機関連携サポート</td>
                    </tr>
                    <tr>
                      <th>納品形態</th>
                      <td>カスタムテンプレート、審査向け提出データ一式</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="faq">
          <div className="container">
            <h2 className="section-title">よくある質問</h2>
            <div className="faq-list">
              <article className="faq-item">
                <h3>AIが作成した文章を自社用にカスタマイズできますか？</h3>
                <p>
                  はい。ドラフトは編集可能な形式で納品され、貴社の強みや表現に合わせた調整を行えます。プロプランでは専門家が貴社の用語や語調に合わせて整えます。
                </p>
              </article>
              <article className="faq-item">
                <h3>どんなデータを準備すべきですか？</h3>
                <p>
                  直近の売上・原価・固定費、見込み顧客数、平均単価などの基本数値があれば十分です。ヒアリングシートで不足分を補いながらAIが推計します。
                </p>
              </article>
              <article className="faq-item">
                <h3>金融機関への提出フォーマットにも対応していますか？</h3>
                <p>
                  はい。各金融機関のフォーマットに合わせた提出資料を作成します。プロプランでは提出前レビューとリハーサル支援も提供します。
                </p>
              </article>
              <article className="faq-item">
                <h3>利用開始までの流れはどのようになりますか？</h3>
                <p>
                  お申し込み後、初回ヒアリングで目標を確認し、AIによるドラフト生成（最短1日）→専門家レビュー→最終納品の順で進行します。
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="security">
          <div className="container">
            <h2 className="section-title">セキュリティとデータ保護</h2>
            <p>
              経営計画書データは国内リージョンの暗号化環境で保管し、プロジェクト終了後はご要望に応じて安全に削除します。当社のAIモデルは学習目的で顧客データを二次利用せず、アクセス権限も専任コンサルタントに限定しています。
            </p>
          </div>
        </section>

        <section id="consultation" className="consultation">
          <div className="container">
            <h2 className="section-title">無料相談はこちら</h2>
            <p className="section-lead">サービス内容や導入スケジュールについて、お気軽にお問い合わせください。</p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">氏名</label>
                  <input type="text" id="name" name="name" placeholder="例）山田 太郎" required />
                </div>
                <div className="form-field">
                  <label htmlFor="company">会社名</label>
                  <input type="text" id="company" name="company" placeholder="例）株式会社サンプル" required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">メールアドレス</label>
                  <input type="email" id="email" name="email" placeholder="example@company.jp" required />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">電話番号</label>
                  <input type="tel" id="phone" name="phone" placeholder="090-1234-5678" required />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="message">相談内容</label>
                <textarea id="message" name="message" rows={4} placeholder="導入目的やご相談内容をご記入ください" />
              </div>
              <button type="submit" className="btn btn-accent">
                無料相談を申し込む
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2024 AI経営計画書ラボ</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
