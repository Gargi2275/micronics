import { Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles } from "lucide-react";
import { imageBank } from "@/data/mock";

export function PageHero({
  title,
  eyebrow,
  description,
  image = imageBank.servers,
  crumbs = [],
}: {
  title: string;
  eyebrow?: string;
  description: string;
  image?: string;
  crumbs?: { label: string; to?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/[0.05] via-background to-background pb-16 pt-28 sm:pt-32 sm:pb-20 text-foreground dark:from-slate-950 dark:via-background dark:to-background">
      {/* Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/3 h-[450px] w-[700px] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-600/15" />
        <div className="absolute top-10 right-10 h-[350px] w-[450px] rounded-full bg-indigo-500/10 blur-[100px] dark:bg-indigo-600/15" />
        <div className="absolute inset-0 bg-perspective-grid opacity-[0.10] dark:opacity-25" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground dark:text-slate-400"
          aria-label="Breadcrumb"
        >
          <Link
            to="/"
            className="hover:text-foreground dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="inline-flex items-center gap-2">
              <ChevronRight className="size-3.5 text-muted-foreground/60 dark:text-slate-500" />
              {crumb.to ? (
                <Link
                  to={crumb.to as any}
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground font-bold dark:text-slate-200">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/25 dark:bg-primary/15 dark:text-primary-soft dark:border-primary/30">
            <Sparkles className="size-3" />
            {eyebrow}
          </span>
        )}

        <h1 className="max-w-4xl font-display text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.12] tracking-tight text-foreground dark:text-white">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground dark:text-slate-300 font-normal">
          {description}
        </p>
      </div>
    </section>
  );
}
