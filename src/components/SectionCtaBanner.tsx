import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { PRIMARY_CTA } from "@/lib/ctaVariants";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  JapaneseYen,
  Lock,
  ShieldCheck,
  Timer,
} from "lucide-react";

interface SectionCtaBannerProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

const reassuranceItems = [
  { icon: Timer, label: "60秒で完了" },
  { icon: JapaneseYen, label: "月額18万円〜" },
  { icon: ShieldCheck, label: "初回30日間返金保証" },
  { icon: Lock, label: "秘密厳守・NDA対応" },
] as const;

const SectionCtaBanner = ({ eyebrow = "60秒で完了・秘密厳守", title, description, className }: SectionCtaBannerProps) => {
  const handleClick = () => {
    const ctaSection = document.getElementById("cta-section");
    ctaSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={cn("py-10", className)} aria-label="セクション区切りCTA">
      <div className="container mx-auto px-4">
        <ScrollReveal
          className="relative overflow-hidden rounded-[28px] border border-highlight/30 bg-gradient-to-br from-white via-highlight/15 to-primary/10 p-7 shadow-card"
          variant="fade-up"
        >
          <div className="absolute inset-y-0 right-0 hidden w-1/3 rounded-[28px] bg-gradient-to-l from-highlight/25 via-primary/15 to-transparent md:block" aria-hidden="true" />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
                {eyebrow}
              </span>
              <h3 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h3>
              {description ? (
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
              ) : null}
              <div className="cta-reassurance-group text-muted-foreground/90">
                {reassuranceItems.map(({ icon: Icon, label }) => (
                  <span key={label} className="cta-reassurance">
                    <Icon aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <Button
              variant="cta"
              size="lg"
              className="interactive-cta group w-full max-w-xs rounded-full px-8 py-5 text-lg font-bold md:w-auto"
              onClick={handleClick}
              data-cta-id={PRIMARY_CTA.id}
              data-cta-attention="section-banner"
              data-cta-attention-delay="320"
            >
              <span className="flex items-center justify-center gap-2">
                {PRIMARY_CTA.label}
                <ArrowRight className="cta-arrow h-5 w-5" aria-hidden="true" />
                <CheckCircle2 className="cta-check h-5 w-5" aria-hidden="true" />
              </span>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SectionCtaBanner;
