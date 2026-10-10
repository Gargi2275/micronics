import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

export function HeroCyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Particle nodes
    const particleCount = Math.min(Math.floor(width / 24), 55);
    const particles: Particle[] = [];
    const colors = isDark
      ? ["#38bdf8", "#818cf8", "#f59e0b", "#34d399", "#60a5fa"]
      : ["#0284c7", "#6366f1", "#d97706", "#059669", "#2563eb"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)] ?? "#38bdf8",
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Scanning wave
    let scanY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle scanning laser beam
      scanY = (scanY + 1.2) % height;
      const scanGradient = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      if (isDark) {
        scanGradient.addColorStop(0, "rgba(56, 189, 248, 0)");
        scanGradient.addColorStop(0.5, "rgba(56, 189, 248, 0.08)");
        scanGradient.addColorStop(1, "rgba(56, 189, 248, 0)");
      } else {
        scanGradient.addColorStop(0, "rgba(2, 132, 199, 0)");
        scanGradient.addColorStop(0.5, "rgba(2, 132, 199, 0.05)");
        scanGradient.addColorStop(1, "rgba(2, 132, 199, 0)");
      }
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 40, width, 80);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]!;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]!;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * (isDark ? 0.22 : 0.14);
            ctx.strokeStyle = isDark
              ? `rgba(99, 102, 241, ${lineAlpha})`
              : `rgba(2, 132, 199, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Render & update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;
        const clampedAlpha = Math.max(0.15, Math.min(0.85, p.alpha));

        ctx.save();
        ctx.globalAlpha = clampedAlpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Dynamic Animated Canvas for Data Packets and Connection Mesh */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />

      {/* Ambient Moving Glow Spheres */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[550px] w-[950px] rounded-full bg-blue-500/15 dark:bg-blue-600/20 blur-[140px] animate-pulse" />
      <div className="absolute top-1/4 -left-20 h-[450px] w-[500px] rounded-full bg-indigo-500/15 dark:bg-indigo-600/20 blur-[140px]" />
      <div className="absolute top-1/3 -right-20 h-[450px] w-[500px] rounded-full bg-amber-500/15 blur-[140px]" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-perspective-grid opacity-25 dark:opacity-35" />

      {/* Seamless Fade into Bottom Sections */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
