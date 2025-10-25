import { Mail, Phone, MapPin, Facebook, FileText, Shield } from "lucide-react";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/ctaVariants";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12 text-foreground">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="mb-4 text-2xl font-bold">株式会社創和経営コンサルティング</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              福岡発の伴走型経営顧問。AI×管理会計×資金繰りで、年商5000万円～10億円の中小企業の売上成長とキャッシュ最適化を同時に実現します。
            </p>
            <div className="pt-3">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">認定支援機関</p>
              </div>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>株式会社創和経営コンサルティング</p>
              <p>代表取締役 中小企業診断士 古町 聖文</p>
              <p>福岡県福岡市東区水谷3-14-17</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="mb-4 text-lg font-semibold">お問い合わせ</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <p>
                    〒839-0041
                    <br />
                    福岡県福岡市東区水谷3-14-17
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <a
                  href="tel:+81922312920"
                  className="text-foreground transition-smooth hover:text-primary"
                >
                  092-231-2920
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <a
                  href="mailto:k.furumachi@lognowa.com"
                  className="text-foreground transition-smooth hover:text-primary"
                >
                  k.furumachi@lognowa.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <p>中小企業診断士</p>
              </div>
            </div>
          </div>

          {/* Representative & SNS */}
          <div className="space-y-4">
            <h4 className="mb-4 text-lg font-semibold">代表者情報</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>代表取締役 / 中小企業診断士</p>
              <p className="font-semibold text-foreground">古町 聖文</p>
              <p>福岡県信用保証協会（登録中小企業診断士）</p>
              <p>福岡県中小企業活性化協議会（登録中小企業診断士）</p>
              <p>朝倉商工会議所（経営相談窓口専門家）</p>
              <p>主要取引金融機関：福岡銀行 / 西日本シティ銀行</p>
            </div>
            <div className="pt-5">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Social</p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61575087356301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-secondary/60 p-2 transition-smooth hover:bg-secondary"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://lin.ee/7qmWZMI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-secondary/60 p-2 transition-smooth hover:bg-secondary"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="space-y-4">
            <h4 className="mb-4 text-lg font-semibold">すぐにアクション</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {PRIMARY_CTA.supportText} ご状況に合わせて、{SECONDARY_CTA.description}
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>
                ページ下部のフォームから{" "}
                <a
                  href="#cta-section"
                  className="font-semibold text-primary underline-offset-4 transition-smooth hover:text-primary/80 hover:underline"
                >
                  {PRIMARY_CTA.label}
                </a>{" "}
                にお進みください。
              </p>
              <p>
                {SECONDARY_CTA.label} はフォームでリクエストいただくとメールで即時送付します。
              </p>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <a href="/privacy-policy" className="flex items-center gap-2 hover:text-primary">
                <FileText className="h-4 w-4" /> プライバシーポリシー
              </a>
              <a href="/legal" className="flex items-center gap-2 hover:text-primary">
                <FileText className="h-4 w-4" /> 特定商取引法に基づく表記
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© 2024 株式会社創和経営コンサルティング All Rights Reserved. 最短当日中にご連絡します。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
