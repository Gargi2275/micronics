import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Zap,
  Lock,
  Cloud,
  Server,
  ShieldCheck,
  Activity,
  Maximize2,
  Layers,
  CheckCircle2,
  Sparkles,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";

interface HeroVisualShowcaseProps {
  onWatchVideo: () => void;
}

export function HeroVisualShowcase({ onWatchVideo }: HeroVisualShowcaseProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const scenes = [
    {
      id: "global-mesh",
      label: "Global Cloud Mesh",
      subtitle: "Unified Autonomous Policy Sync",
      icon: Cloud,
      image: "/images/hero_global_mesh.jpg",
      highlight: "Multi-Region Cloud Mesh",
      badge: "Real-Time Mesh",
      metricTitle: "Multi-Cloud Nodes",
      metricValue: "4,850+ Protected",
      latency: "0.4s Sync",
      accent: "from-blue-500 to-indigo-600",
    },
    {
      id: "cyber-vault",
      label: "Air-Gapped Cyber Vault",
      subtitle: "Hardware WORM Immutability",
      icon: Lock,
      image: "/images/hero_cyber_vault.jpg",
      highlight: "Cryptographic Ransomware Immunity",
      badge: "Zero-Trust",
      metricTitle: "Immutable Storage",
      metricValue: "1.45 PB Locked",
      latency: "100% Isolated",
      accent: "from-amber-500 to-orange-600",
    },
    {
      id: "hypervisor-boot",
      label: "Instant VM Run Direct",
      subtitle: "Sub-Second Hypervisor Mount",
      icon: Zap,
      image: "/images/hero_hypervisor_boot.jpg",
      highlight: "Live VMware & Hyper-V Instant Boot",
      badge: "< 1.4s Instant RTO",
      metricTitle: "Instant Boot Speed",
      metricValue: "0.9s Verified",
      latency: "Sub-Second RTO",
      accent: "from-emerald-500 to-teal-600",
    },
    {
      id: "ransomware-defense",
      label: "Quantum Defense Grid",
      subtitle: "Automated Daily Restore Drills",
      icon: ShieldCheck,
      image: "/images/ransomware_vault.jpg",
      highlight: "AI-Powered Anomaly & Corruption Detection",
      badge: "99.999% SLA",
      metricTitle: "Drill Verification",
      metricValue: "100% Pass Rate",
      latency: "Audit Ready",
      accent: "from-purple-500 to-pink-600",
    },
  ];

  const currentScene = scenes[activeTab] ?? scenes[0]!;

  // Auto-advance scenes when simulation is playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((cur) => (cur + 1) % scenes.length);
          return 0;
        }
        return prev + 1.25;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, scenes.length]);

  return (
    <div className="w-full">
      {/* Visual Scene Switcher Navigation Bar */}
      <div className="mb-4 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-border/80 bg-card/85 p-1.5 shadow-card backdrop-blur-xl dark:border-white/15 dark:bg-slate-900/80">
        {scenes.map((scene, idx) => {
          const Icon = scene.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => {
                setActiveTab(idx);
                setProgress(0);
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              }`}
            >
              <Icon className="size-3.5" />
              <span>{scene.label}</span>
            </button>
          );
        })}
      </div>

      {/* Cinematic Showcase Glass Frame */}
      <div className="group relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-2 sm:p-3 shadow-2xl transition-all duration-300 dark:border-white/20 dark:bg-slate-950">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border/60 dark:border-white/10 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-red-500/80" />
            <span className="size-2.5 rounded-full bg-amber-500/80" />
            <span className="size-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground dark:text-slate-300">
            <span className="flex size-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-foreground dark:text-white">LIVE VISUAL FEED</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-muted-foreground dark:text-slate-400">micronics.vault.visual.feed</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/80 px-2.5 py-1 text-[11px] font-mono font-bold text-foreground hover:bg-secondary transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="size-3 text-amber-500" />
                  <span>Autoplay Active</span>
                </>
              ) : (
                <>
                  <Play className="size-3 text-primary fill-primary" />
                  <span>Resume Visual</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Visual Image & Holographic HUD Container */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-950 shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="relative h-full w-full"
            >
              {/* Ultra High-Res Cinematic Visual Image */}
              <img
                src={currentScene.image}
                alt={currentScene.label}
                className="h-full w-full object-cover"
              />

              {/* Subtle Scanline Overlay for Cyber Feel */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] opacity-40" />

              {/* Animated Laser Scanning Beam */}
              <motion.div
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] opacity-75"
              />

              {/* Floating Top Left Telemetry HUD Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md">
                  <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span>{currentScene.badge}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-cyan-300 font-mono text-[11px]">{currentScene.latency}</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-mono text-slate-300 backdrop-blur-sm">
                  <Activity className="size-3 text-emerald-400" />
                  <span>AES-256 GCM • 99.999% SLA</span>
                </div>
              </div>

              {/* Floating Top Right Live Metric HUD Badge */}
              <div className="absolute top-4 right-4 hidden sm:flex items-center gap-3 rounded-xl border border-white/20 bg-slate-950/80 px-3.5 py-2 text-right shadow-xl backdrop-blur-md">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    {currentScene.metricTitle}
                  </div>
                  <div className="text-sm font-black text-amber-400 font-display">
                    {currentScene.metricValue}
                  </div>
                </div>
                <div className="flex size-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Radio className="size-4 animate-pulse" />
                </div>
              </div>

              {/* Big Center Play Video Button Overlay on Hover */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  type="button"
                  onClick={onWatchVideo}
                  className="pointer-events-auto group/play flex items-center gap-3 rounded-full border border-white/30 bg-slate-950/75 px-6 py-3 text-sm font-bold text-white shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:bg-slate-900"
                >
                  <div className="flex size-9 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-[0_0_20px_#f59e0b] transition-transform group-hover/play:scale-110">
                    <Play className="size-4 fill-slate-950 ml-0.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                      High-Def Visual Tour
                    </div>
                    <div className="text-xs font-bold sm:text-sm">Watch 2-Min 4K Demo Video</div>
                  </div>
                </button>
              </div>

              {/* Bottom Information and Visual Progress Bar */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 sm:p-6 text-left">
                {/* Visual Cycle Progress Indicator */}
                <div className="mb-3 h-1 w-full bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 via-amber-400 to-emerald-400 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="size-3" />
                      <span>{currentScene.subtitle}</span>
                    </span>
                    <h3 className="font-display text-sm sm:text-lg font-black text-white">
                      {currentScene.highlight}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="orange"
                      size="sm"
                      onClick={onWatchVideo}
                      className="shadow-amber-glow text-xs font-bold"
                    >
                      <Play className="size-3 mr-1.5 fill-current" />
                      <span>Play 4K Video</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
