import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { cn } from "@/lib/utils";

export type ScrollRevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "fade-up";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export const ScrollReveal = <T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  variant = "fade-up",
  ...props
}: ScrollRevealProps<T>) => {
  const Component = (as ?? "div") as ElementType;
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>({ threshold: 0.2 });

  const baseStyles = "will-change-transform transition-all duration-700 ease-out";
  const hiddenStyles =
    variant === "fade"
      ? "translate-y-0 opacity-0"
      : "translate-y-6 opacity-0";
  const visibleStyles = "translate-y-0 opacity-100";

  return (
    <Component
      ref={ref as (node: HTMLElement | null) => void}
      className={cn(baseStyles, isVisible ? visibleStyles : hiddenStyles, className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
