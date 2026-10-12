import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/images/brandmark.png"
      alt="Micronics Devlon"
      className={cn("h-9 sm:h-10 w-auto object-contain shrink-0", className)}
      loading="eager"
    />
  );
}

export function Logo({
  compact = false,
  to = "/",
  className,
  variant = "default",
  logoUrl,
  logoSize,
  brandName = "Micronics Devlon",
  brandSubtitle = "DATA PRIVATE LIMITED",
}: {
  compact?: boolean;
  to?: string;
  className?: string;
  variant?: "default" | "light" | "white";
  logoUrl?: string;
  logoSize?: number;
  brandName?: string;
  brandSubtitle?: string;
}) {
  const isWhite = variant === "white" || className?.includes("text-white");
  const isCustomLogo =
    Boolean(logoUrl) &&
    logoUrl !== "/images/logo.png" &&
    logoUrl !== "/images/brandmark.png";

  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-3 select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:opacity-95 shrink-0",
        className
      )}
    >
      {/* 1. If custom uploaded logo image is provided, display it */}
      {isCustomLogo ? (
        <img
          src={logoUrl}
          alt={brandName ?? "Micronics Devlon"}
          style={logoSize ? { height: `${logoSize}px` } : undefined}
          className={cn(
            "object-contain transition-transform duration-200 group-hover:scale-[1.02]",
            compact ? "h-8 w-auto max-w-[140px]" : "h-10 sm:h-11 w-auto max-w-[240px]"
          )}
        />
      ) : (
        /* 2. Official High-DPI Hybrid Lockup: Crystal-Sharp Brandmark + Vector Typography */
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <img
            src="/images/brandmark.png"
            alt={brandName ?? "Micronics Devlon"}
            className={cn(
              "object-contain shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
              compact
                ? "h-8 w-auto"
                : "h-10 sm:h-11 xl:h-12 w-auto"
            )}
            loading="eager"
          />

          {!compact && (
            <div className="flex flex-col justify-center leading-none tracking-normal min-w-0 pt-0.5 sm:pt-1">
              <div className="flex items-baseline tracking-tight font-black leading-none font-sans">
                <span
                  className={cn(
                    "text-[1.12rem] sm:text-[1.26rem] xl:text-[1.32rem] tracking-[-0.03em] font-extrabold transition-colors",
                    isWhite
                      ? "text-white"
                      : "text-slate-900 dark:text-white"
                  )}
                >
                  MICRONICS
                </span>
                <span className="ml-1 sm:ml-1.5 text-[1.12rem] sm:text-[1.26rem] xl:text-[1.32rem] tracking-[-0.02em] font-extrabold text-orange-600 dark:text-orange-500">
                  DEVLON
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5">
                <span
                  className={cn(
                    "text-[8px] sm:text-[9px] xl:text-[9.5px] font-bold tracking-[0.24em] uppercase leading-none transition-colors",
                    isWhite
                      ? "text-slate-300/90"
                      : "text-slate-500 dark:text-slate-400"
                  )}
                >
                  {brandSubtitle || "DATA PRIVATE LIMITED"}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
