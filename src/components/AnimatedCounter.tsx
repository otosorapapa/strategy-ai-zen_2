import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type AnimatedCounterProps = {
  value: number;
  /** How many decimal places to display. */
  decimals?: number;
  /** Duration of the counting animation in milliseconds. */
  duration?: number;
  /** Optional prefix to show before the number (e.g. +, -, ¥). */
  prefix?: string;
  /** Optional suffix to show after the number (e.g. %, 件, ヶ月). */
  suffix?: string;
  className?: string;
};

const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

export const AnimatedCounter = ({
  value,
  decimals = 0,
  duration = 1200,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const frameRef = useRef<number>();
  const previousValueRef = useRef(0);
  const { ref, isVisible } = useRevealOnScroll<HTMLSpanElement>({ threshold: 0.35 });

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      previousValueRef.current = value;
      return;
    }

    const startValue = previousValueRef.current;
    const valueDelta = value - startValue;
    const startTimestamp = { current: 0 };

    const step = (timestamp: number) => {
      if (!startTimestamp.current) {
        startTimestamp.current = timestamp;
      }

      const elapsed = timestamp - startTimestamp.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const nextValue = startValue + valueDelta * easedProgress;

      setDisplayValue(nextValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        previousValueRef.current = value;
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, isVisible, value]);

  const formattedValue = displayValue.toLocaleString("ja-JP", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
