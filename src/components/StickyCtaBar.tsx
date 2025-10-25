import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ArrowUp, Phone } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { PRIMARY_CTA } from "@/lib/ctaVariants";
import { cn } from "@/lib/utils";

const StickyCtaBar = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsCompact(scrollY > 80);
      setHasScrolled(scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = useCallback(() => {
    const ctaSection = document.getElementById("cta-section");
    ctaSection?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 hidden transition-all duration-500 ease-out md:block">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "flex flex-col gap-4 rounded-full border border-primary/10 bg-white/85 px-5 py-3 text-center shadow-card backdrop-blur-xl transition-all duration-500 md:flex-row md:items-center md:justify-between md:text-left",
            isCompact ? "py-2" : "py-3",
            hasScrolled ? "opacity-100" : "opacity-95",
          )}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "inline-flex h-10 w-10 rounded-full border border-highlight/60 bg-white/70 text-highlight shadow-sm transition-transform duration-500 hover:bg-highlight/20 hover:text-highlight-foreground md:h-11 md:w-11",
                isCompact ? "scale-95" : "scale-100",
              )}
              onClick={scrollToTop}
              aria-label="ページ上部に戻る"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </Button>
            <p className="text-sm font-semibold text-muted-foreground md:text-left">
              {PRIMARY_CTA.supportText}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 md:justify-end">
            <Button
              type="button"
              variant="cta"
              size="lg"
              className={cn(
                "interactive-cta sticky-cta-button rounded-full px-6 font-bold transition-transform duration-500",
                isCompact ? "scale-[0.94] py-3 text-sm" : "scale-100 px-8 py-4 text-base",
              )}
              data-cta-id={`${PRIMARY_CTA.id}-sticky`}
              data-cta-attention="sticky-bar"
              data-cta-attention-delay="960"
              onClick={scrollToContact}
            >
              {PRIMARY_CTA.label}
              <ArrowRight className="cta-arrow ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <a
              href="tel:+81922312920"
              aria-label="電話する"
              className={cn(
                buttonVariants({ variant: "hero", size: isCompact ? "sm" : "lg" }),
                "call-now-button rounded-full font-semibold transition-transform duration-500",
                isCompact ? "px-4 py-2 text-xs" : "px-6 py-3 text-sm",
              )}
            >
              <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
              お電話で相談
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StickyCtaBar;
