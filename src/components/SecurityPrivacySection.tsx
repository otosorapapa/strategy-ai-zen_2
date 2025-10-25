import { ShieldCheck, Lock, FileText, CreditCard, Database } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const securityMeasures = [
  {
    icon: Lock,
    title: "通信と保管の暗号化",
    detail:
      "通信は常時SSL（TLS1.2 以上）で暗号化し、顧客データは外部クラウド上で安全に管理しています。個人情報へのアクセスは社内権限に応じて制限し、ログを記録・監査しています。",
  },
  {
    icon: Database,
    title: "データ利用ルールの明文化",
    detail: "生成AIの学習にはお客様のデータを二次利用せず、契約で定めた目的範囲のみで活用。削除依頼にも即日対応します。",
  },
  {
    icon: ShieldCheck,
    title: "専門家によるガバナンス",
    detail: "情報セキュリティ責任者と中小企業診断士が監査フローを設計。AIの判断理由も監査ログとして保存します。",
  },
];

const policyLinks = [
  {
    icon: FileText,
    label: "プライバシーポリシー",
    href: "/privacy-policy",
    description: "個人情報の取り扱いと第三者提供基準を公開しています。",
  },
  {
    icon: CreditCard,
    label: "安全な決済ゲートウェイ",
    href: "https://payments.example.com/security",
    description: "決済処理はPCI DSSに準拠した外部決済サービスを利用しています。",
  },
];

const SecurityPrivacySection = () => {
  return (
    <section className="bg-slate-900 py-16 text-slate-50" aria-labelledby="security-heading">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <ScrollReveal as="span" variant="fade" className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            SECURITY
          </ScrollReveal>
          <ScrollReveal as="h2" variant="fade-up" delay={100} id="security-heading" className="text-balance text-3xl font-bold md:text-4xl">
            財務データを守る万全のセキュリティとプライバシー運用
          </ScrollReveal>
          <ScrollReveal as="p" variant="fade-up" delay={160} className="text-lg leading-relaxed text-slate-200">
            お預かりする決算・資金繰り情報は暗号化と厳格なアクセス制御で保護。運用状況は月次でレポートし、必要に応じて監査証跡をご提示します。
          </ScrollReveal>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {securityMeasures.map((measure, index) => {
            const Icon = measure.icon;
            return (
              <ScrollReveal
                key={measure.title}
                variant="fade-up"
                delay={index * 90}
                className="flex h-full flex-col gap-4 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-card"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-200">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold text-white">{measure.title}</h3>
                <p className="text-[0.95rem] leading-relaxed text-slate-200">{measure.detail}</p>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {policyLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <ScrollReveal
                key={link.label}
                variant="fade-up"
                delay={200 + index * 90}
                className="flex h-full flex-col gap-3 rounded-3xl border border-white/10 bg-white/10 p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <a href={link.href} className="text-lg font-semibold text-white underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-emerald-200">
                    {link.label}
                  </a>
                </div>
                <p className="text-sm leading-relaxed text-slate-200">{link.description}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SecurityPrivacySection;
