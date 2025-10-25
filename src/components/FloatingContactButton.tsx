import { useCallback, useEffect, useState } from "react";
import { ArrowUp, CalendarDays, Phone } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { PRIMARY_CTA } from "@/lib/ctaVariants";
import { cn } from "@/lib/utils";

const FloatingContactButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 160);
      setShowBackToTop(scrollY > 480);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback(() => {
    const ctaSection = document.getElementById("cta-section");
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-4 z-40 flex flex-col items-end justify-end gap-3 sm:right-6 sm:flex-row md:hidden",
        "transition-all duration-500 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      {showBackToTop ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-12 w-12 rounded-full border border-highlight/50 bg-white/80 text-highlight shadow-card transition-transform duration-300 hover:-translate-y-0.5 hover:bg-highlight/20 hover:text-highlight-foreground"
          onClick={handleBackToTop}
          aria-label="ページ上部に戻る"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </Button>
      ) : null}
      <a
        href="tel:+81922312920"
        aria-label="電話をかける"
        className={cn(
          buttonVariants({ variant: "hero", size: "lg" }),
          "flex h-12 w-full min-w-[220px] items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold shadow-elegant transition-transform hover:-translate-y-0.5 focus-visible:ring-primary/30 sm:h-12 sm:w-auto",
        )}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        電話をかける
      </a>
      <Button
        type="button"
        variant="cta"
        size="lg"
        className="interactive-cta flex h-14 w-full min-w-[220px] items-center justify-center gap-2 rounded-full px-6 text-base font-bold shadow-elegant drop-shadow-lg focus-visible:ring-4 focus-visible:ring-primary/30 motion-safe:animate-[floatPulse_3.4s_ease-in-out_infinite] sm:h-16 sm:w-auto"
        onClick={handleClick}
        aria-label="無料経営診断フォームに移動する"
        data-cta-attention="floating-contact"
        data-cta-attention-delay="720"
      >
        <CalendarDays className="cta-arrow h-5 w-5" aria-hidden="true" />
        {PRIMARY_CTA.label}
      </Button>
    </div>
  );
};

export default FloatingContactButton;
