import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105", className)}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Micronics Devlon logo"
    >
      <defs>
        <linearGradient id="md-blue" x1="10" x2="54" y1="52" y2="12">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="md-orange" x1="7" x2="58" y1="52" y2="8">
          <stop stopColor="#f59e0b" />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#md-blue)" strokeWidth="3" opacity="0.4" />
      <path
        fill="none"
        stroke="url(#md-orange)"
        strokeWidth="5"
        strokeLinecap="round"
        d="M14 44a22 22 0 1 1 35 1"
      />
      <path fill="url(#md-orange)" d="M47 18.5 57 16l-2.3 9.5Z" />
      <path
        fill="currentColor"
        d="M17 46V21h7.5l6.5 11 6.5-11H45v25h-6.5V32.5L33 41.5h-4L23.5 32.5V46Z"
      />
      <path fill="url(#md-blue)" d="M24 21h4.5l2.8 5.5 2.8-5.5H38L31.3 33.5Z" />
    </svg>
  );
}

export function Logo({
  compact = false,
  to = "/",
  className,
  variant = "default",
  logoUrl,
  logoSize = 36,
  brandName,
  brandSubtitle,
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
  const isPrimary = className?.includes("text-primary");

  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex min-w-0 max-w-full items-center gap-3 overflow-hidden rounded-xl px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${brandName ?? "Brand"} logo`}
          className="shrink-0 rounded-lg object-contain"
          style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
        />
      ) : isWhite ? <BrandMark className="text-white" /> : <BrandMark />}
      {!compact && (
        <span className="flex shrink-0 flex-col leading-tight">
          <span
            className={cn(
              "whitespace-nowrap font-display text-base sm:text-lg font-black tracking-tight transition-colors",
              isWhite
                ? "text-white group-hover:text-amber-300"
                : isPrimary
                  ? "text-primary group-hover:text-primary"
                  : "text-foreground group-hover:text-primary"
            )}
          >
            {brandName ?? "Micronics Devlon"}
          </span>
          <span
            className={cn(
              "whitespace-nowrap text-[10px] font-bold uppercase tracking-widest",
              isWhite ? "text-slate-300" : "text-muted-foreground"
            )}
          >
            {brandSubtitle ?? "Data Protection"}
          </span>
        </span>
      )}
    </Link>
  );
}
