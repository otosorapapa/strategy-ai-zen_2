import { useEffect, useRef, useState } from "react";

type UseRevealOnScrollOptions = {
  /** Intersection ratio required before marking the element as visible */
  threshold?: number | number[];
  /** Margin around the root when calculating visibility */
  rootMargin?: string;
  /** Whether the element should only animate the first time it enters the viewport */
  once?: boolean;
};

export const useRevealOnScroll = <T extends HTMLElement = HTMLElement>(
  { threshold = 0.2, rootMargin = "0px", once = true }: UseRevealOnScrollOptions = {},
) => {
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) {
      return;
    }

    const isReducedMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (isReducedMotion) {
      setIsVisible(true);
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref: elementRef, isVisible } as const;
};

export type UseRevealOnScrollReturn<T extends HTMLElement = HTMLElement> = ReturnType<
  typeof useRevealOnScroll<T>
>;
