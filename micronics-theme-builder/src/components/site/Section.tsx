import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  eyebrow,
  title,
  intro,
  dark = false,
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const reduce = useReducedMotion();
  const motionProps = !reduce
    ? {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 sm:py-28",
        dark ? "bg-navy-section text-primary-foreground" : "bg-background text-foreground",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {(eyebrow || title || intro) && (
          <motion.div
            {...motionProps}
            className={cn(
              "mb-14 max-w-3xl",
              align === "center" ? "mx-auto text-center" : "text-left"
            )}
          >
            {eyebrow && (
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-current leading-tight">
                {title}
              </h2>
            )}
            {intro && (
              <p
                className={cn(
                  "mt-4 text-base sm:text-lg leading-relaxed font-normal",
                  dark ? "text-primary-foreground/80" : "text-muted-foreground"
                )}
              >
                {intro}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const motionProps = !reduce
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, delay },
      }
    : {};

  return (
    <motion.div {...motionProps} className={className ?? ""}>
      {children}
    </motion.div>
  );
}
