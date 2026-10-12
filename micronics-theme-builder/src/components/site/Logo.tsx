import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/images/brandmark.png"
      alt="Micronics Devlon"
      className={cn("h-10 w-auto object-contain shrink-0", className)}
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
    logoUrl !== "/images/logo_hd.png" &&
    logoUrl !== "/images/logo.png" &&
    logoUrl !== "/images/brandmark.png";

  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2.5 sm:gap-3 select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:opacity-95 shrink-0",
        className
      )}
    >
      {/* 1. Compact icon-only view for collapsed sidebars */}
      {compact ? (
        <img
          src="/images/brandmark.png"
          alt={brandName ?? "Micronics Devlon"}
          style={{ height: logoSize ? `${logoSize}px` : "36px" }}
          className="w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
          loading="eager"
        />
      ) : isCustomLogo ? (
        /* 2. Custom uploaded logo image if provided */
        <img
          src={logoUrl}
          alt={brandName ?? "Micronics Devlon"}
          style={logoSize ? { height: `${logoSize}px` } : undefined}
          className="w-auto max-w-[280px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          loading="eager"
        />
      ) : (
        /* 3. Official Crisp Brandmark + Pixel-Perfect Vector Typography Lockup */
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Official Emblem Mark: High-DPI 3D Blue M + Orange Swoosh D */}
          <img
            src="/images/brandmark.png"
            alt={brandName ?? "Micronics Devlon"}
            className={cn(
              "w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]",
              "h-11 sm:h-12 xl:h-[52px]"
            )}
            loading="eager"
          />

          {/* Crisp, Razor-Sharp Vector Typography */}
          <div className="flex flex-col justify-center leading-none tracking-normal select-none pt-0.5">
            {/* Line 1: MICRONICS DEVLON */}
            <div className="flex items-baseline tracking-tight font-black leading-none font-sans">
              <span
                className={cn(
                  "text-[1.2rem] sm:text-[1.32rem] xl:text-[1.38rem] tracking-[-0.03em] font-black transition-colors",
                  isWhite
                    ? "text-white"
                    : "text-slate-900 dark:text-white"
                )}
              >
                MICRONICS
              </span>
              <span className="ml-1 sm:ml-1.5 text-[1.2rem] sm:text-[1.32rem] xl:text-[1.38rem] tracking-[-0.02em] font-black text-orange-600 dark:text-orange-500">
                DEVLON
              </span>
            </div>

            {/* Line 2: DATA PRIVATE LIMITED */}
            <div className="mt-1 sm:mt-1.5 flex items-center">
              <span
                className={cn(
                  "text-[8.5px] sm:text-[9.5px] xl:text-[10px] font-bold tracking-[0.24em] uppercase leading-none transition-colors",
                  isWhite
                    ? "text-slate-300"
                    : "text-slate-600 dark:text-slate-300"
                )}
              >
                DATA PRIVATE LIMITED
              </span>
            </div>

            {/* Line 3: COMPLIANT BACKUP • GUARANTEED RECOVERY */}
            <div className="mt-1 flex items-center gap-1.5">
              <span
                className={cn(
                  "text-[7px] sm:text-[7.5px] xl:text-[8px] font-bold tracking-[0.14em] uppercase leading-none transition-colors",
                  isWhite
                    ? "text-cyan-300"
                    : "text-cyan-700 dark:text-cyan-400"
                )}
              >
                COMPLIANT BACKUP
              </span>
              <span className="text-[6.5px] text-slate-400 dark:text-slate-500 leading-none">•</span>
              <span
                className={cn(
                  "text-[7px] sm:text-[7.5px] xl:text-[8px] font-bold tracking-[0.14em] uppercase leading-none transition-colors",
                  isWhite
                    ? "text-cyan-300"
                    : "text-cyan-700 dark:text-cyan-400"
                )}
              >
                GUARANTEED RECOVERY
              </span>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
