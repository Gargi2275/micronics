import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function InteractiveCard({
  children,
  className,
  spotlight = true,
}: {
  children: React.ReactNode;
  className?: string;
  spotlight?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const reduce = useReducedMotion();
  const background = useMotionTemplate`radial-gradient(320px circle at ${x}% ${y}%, var(--spotlight), transparent 80%)`;

  const motionProps = !reduce ? { whileHover: { y: -4, transition: { duration: 0.2 } } } : {};
  const styleProp = spotlight ? { backgroundImage: background } : {};

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-6 shadow-card backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:shadow-elevated",
        className
      )}
      style={styleProp}
      {...motionProps}
      onMouseMove={(event) => {
        if (reduce || !spotlight) return;
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return;
        x.set(((event.clientX - bounds.left) / bounds.width) * 100);
        y.set(((event.clientY - bounds.top) / bounds.height) * 100);
      }}
    >
      {/* Subtle Gradient Border Glow Highlight */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
