import { useEffect, useState } from "react";
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

// Hook that generates a high-contrast light-mode version if an uploaded logo has white text
function useAdaptiveLogo(logoUrl?: string) {
  const [lightLogo, setLightLogo] = useState<string | null>(null);

  useEffect(() => {
    if (!logoUrl || typeof window === "undefined") {
      setLightLogo(null);
      return;
    }

    if (logoUrl.includes("_light.")) {
      setLightLogo(logoUrl);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setLightLogo(logoUrl);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        let whiteCount = 0;

        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3] ?? 0;
          if (a > 20) {
            const r = data[i] ?? 0;
            const g = data[i + 1] ?? 0;
            const b = data[i + 2] ?? 0;
            const isOrange = r > 160 && g < 140 && b < 80;
            const isWhiteOrLight = r > 165 && g > 165 && b > 165;
            if (isWhiteOrLight && !isOrange) {
              whiteCount++;
              // Deep corporate navy (#0f172a) for maximum contrast on light backgrounds
              data[i] = 15;
              data[i + 1] = 23;
              data[i + 2] = 42;
            }
          }
        }

        if (whiteCount > 30) {
          ctx.putImageData(imgData, 0, 0);
          setLightLogo(canvas.toDataURL("image/png"));
        } else {
          setLightLogo(logoUrl);
        }
      } catch (err) {
        setLightLogo(logoUrl);
      }
    };
    img.onerror = () => setLightLogo(logoUrl);
    img.src = logoUrl;
  }, [logoUrl]);

  return lightLogo;
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
  const adaptiveLightLogo = useAdaptiveLogo(logoUrl);

  // Directly respect user's logoSize setting from admin slider (e.g. 16px - 96px, default 48px)
  const currentHeight = logoSize || (compact ? 36 : 48);
  const heightStyle = { height: `${currentHeight}px` };

  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-transform hover:opacity-95 shrink-0",
        className
      )}
    >
      {/* 1. Compact icon-only view for collapsed sidebars */}
      {compact ? (
        <img
          src="/images/brandmark.png"
          alt={brandName ?? "Micronics Devlon"}
          style={heightStyle}
          className="w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
          loading="eager"
        />
      ) : logoUrl ? (
        /* 2. Uploaded / Configured Custom Logo */
        <div className="flex items-center shrink-0">
          {/* Light mode: adaptive dark-navy version so white text is crystal-clear on light background */}
          <img
            src={adaptiveLightLogo || logoUrl}
            alt={brandName ?? "Micronics Devlon"}
            style={heightStyle}
            className={cn(
              "object-contain transition-transform duration-200 group-hover:scale-[1.02]",
              "w-auto max-w-[340px]",
              isWhite ? "hidden" : "dark:hidden block"
            )}
            loading="eager"
          />

          {/* Dark mode & White variant (Footer/Splash): original white-text logo */}
          <img
            src={logoUrl}
            alt={brandName ?? "Micronics Devlon"}
            style={heightStyle}
            className={cn(
              "object-contain transition-transform duration-200 group-hover:scale-[1.02]",
              "w-auto max-w-[340px]",
              isWhite ? "block" : "hidden dark:block"
            )}
            loading="eager"
          />
        </div>
      ) : (
        /* 3. Fallback default official logo */
        <img
          src="/images/logo_hd.png"
          alt={brandName ?? "Micronics Devlon"}
          style={heightStyle}
          className="w-auto max-w-[320px] object-contain"
          loading="eager"
        />
      )}
    </Link>
  );
}
