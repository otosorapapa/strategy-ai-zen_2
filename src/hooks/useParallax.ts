import { useEffect, useRef, useState } from "react";

type UseParallaxOptions = {
  /** How strongly the element should react to scroll (higher values = bigger movement). */
  intensity?: number;
  /** Limit for the translate value to keep the effect subtle. */
  maxTranslate?: number;
  /** Direction of the parallax movement. */
  axis?: "x" | "y";
};

export const useParallax = <T extends HTMLElement = HTMLElement>({
  intensity = 0.35,
  maxTranslate = 32,
  axis = "y",
}: UseParallaxOptions = {}) => {
  const elementRef = useRef<T | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const shouldReduceMotion = mediaQuery?.matches;

    if (shouldReduceMotion) {
      setOffset(0);
      return;
    }

    const updateOffset = () => {
      if (!elementRef.current) {
        return;
      }

      const rect = elementRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.min(Math.max(progress, 0), 1);
      const translate = (clampedProgress - 0.5) * intensity * 100;
      const limitedTranslate = Math.max(Math.min(translate, maxTranslate), -maxTranslate);

      setOffset(limitedTranslate);
    };

    updateOffset();
    window.addEventListener("scroll", updateOffset, { passive: true });
    window.addEventListener("resize", updateOffset);

    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, [intensity, maxTranslate]);

  const transform = axis === "y" ? `translateY(${offset}px)` : `translateX(${offset}px)`;

  return { ref: elementRef, style: { transform, willChange: "transform" as const } } as const;
};

export type UseParallaxReturn<T extends HTMLElement = HTMLElement> = ReturnType<typeof useParallax<T>>;
