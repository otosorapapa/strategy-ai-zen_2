import { useEffect } from "react";

/**
 * Adds a short-lived CSS class to interactive CTA buttons so that click
 * feedback animations can run without interfering with existing handlers.
 */
const useInteractiveCtaFeedback = () => {
  useEffect(() => {
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (isReducedMotion) {
      return;
    }

    const activeTimeouts = new Set<number>();
    const attentionStartTimeouts = new Map<Element, number>();
    const attentionEndTimeouts = new Map<Element, number>();

    const handleClick = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const button = target.closest<HTMLElement>(".interactive-cta");
      if (!button) {
        return;
      }

      button.classList.remove("cta-clicked");
      // Force reflow so that the animation can be retriggered on rapid clicks.
      void button.offsetWidth;
      button.classList.add("cta-clicked");

      const timeout = window.setTimeout(() => {
        button.classList.remove("cta-clicked");
        activeTimeouts.delete(timeout);
      }, 650);
      activeTimeouts.add(timeout);

      const cleanup = () => {
        window.clearTimeout(timeout);
        activeTimeouts.delete(timeout);
        button.removeEventListener("mouseleave", cleanup);
        button.removeEventListener("blur", cleanup);
      };

      button.addEventListener("mouseleave", cleanup, { once: true });
      button.addEventListener("blur", cleanup, { once: true });
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleClick, true);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          if (element.dataset.ctaAttentionPlayed === "true") {
            return;
          }

          element.dataset.ctaAttentionPlayed = "true";

          const delayAttribute = element.getAttribute("data-cta-attention-delay");
          const attentionDelay = Number(delayAttribute ?? "280");

          const startTimeout = window.setTimeout(() => {
            element.classList.add("cta-attention");

            const endTimeout = window.setTimeout(() => {
              element.classList.remove("cta-attention");
              attentionEndTimeouts.delete(element);
            }, 2200);

            attentionEndTimeouts.set(element, endTimeout);
            attentionStartTimeouts.delete(element);
          }, Number.isNaN(attentionDelay) ? 280 : attentionDelay);

          attentionStartTimeouts.set(element, startTimeout);
        });
      },
      {
        threshold: 0.65,
      },
    );

    const observeInteractiveCtas = () => {
      document
        .querySelectorAll<HTMLElement>(".interactive-cta[data-cta-attention]")
        .forEach((element) => {
          intersectionObserver.observe(element);
        });
    };

    observeInteractiveCtas();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          if (node.matches(".interactive-cta[data-cta-attention]")) {
            intersectionObserver.observe(node);
          }

          node
            .querySelectorAll<HTMLElement>(".interactive-cta[data-cta-attention]")
            .forEach((element) => {
              intersectionObserver.observe(element);
            });
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleClick, true);
      activeTimeouts.forEach((timeout) => {
        window.clearTimeout(timeout);
      });
      activeTimeouts.clear();

      attentionStartTimeouts.forEach((timeout) => {
        window.clearTimeout(timeout);
      });
      attentionStartTimeouts.clear();

      attentionEndTimeouts.forEach((timeout) => {
        window.clearTimeout(timeout);
      });
      attentionEndTimeouts.clear();

      mutationObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);
};

export default useInteractiveCtaFeedback;
