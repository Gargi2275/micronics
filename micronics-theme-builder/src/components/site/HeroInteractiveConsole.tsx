import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Lock,
  Boxes,
  Database,
  Cloud,
  CheckCircle2,
  Server,
  Activity,
  HardDrive,
  RefreshCw,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Sliders,
  Play,
  Pause,
} from "lucide-react";
import { useTheme } from "@/lib/theme";
import { BrandMark } from "@/components/site/Logo";

interface HeroInteractiveConsoleProps {
  activeTab: "dashboard" | "vm" | "vault" | "cloud";
  onWatchVideo: () => void;
}

export function HeroInteractiveConsole({ activeTab, onWatchVideo }: HeroInteractiveConsoleProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [tick, setTick] = useState(0);
  const [activeNode, setActiveNode] = useState(0);
  const [simulatedRto, setSimulatedRto] = useState(1.4);

  // Subtle live data oscillation to make it feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
      setSimulatedRto((r) => +(1.2 + Math.sin(Date.now() / 1500) * 0.3).toFixed(1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { name: "VMware vSphere Cluster", count: "48 Nodes", status: "Protected", rto: "< 1.2s", color: "text-blue-500", icon: Server },
    { name: "Microsoft 365 & Teams", count: "4,250 Users", status: "Immutable", rto: "< 0.8s", color: "text-amber-500", icon: Cloud },
    { name: "PostgreSQL & MS SQL", count: "14 DB Instances", status: "Zero-Data-Loss", rto: "< 1.5s", color: "text-emerald-500", icon: Database },
    { name: "Synology & QNAP Vaults", count: "185 TB Data", status: "WORM Locked", rto: "< 2.0s", color: "text-indigo-500", icon: HardDrive },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-card p-4 sm:p-6 text-foreground transition-colors duration-300">
      {/* 1. Header Bar of Console */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BrandMark className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-foreground">
                Micronics <span className="text-primary font-bold">Devlon</span> Vault Console
              </span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.2 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground font-mono">
              Cluster ID: devlon-enterprise-east-01 • Uptime: 99.999%
            </span>
          </div>
        </div>

        {/* Top Right Quick Stats */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs">
          <div className="rounded-xl border border-border/70 bg-secondary/50 px-3 py-1.5 text-right hidden sm:block">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Total Protected
            </span>
            <span className="font-display font-black text-foreground">1.45 PB</span>
          </div>
          <div className="rounded-xl border border-border/70 bg-secondary/50 px-3 py-1.5 text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              Average RTO
            </span>
            <span className="font-display font-black text-amber-500">{simulatedRto}s</span>
          </div>
        </div>
      </div>

      {/* 2. Main 3-Column Metrics HUD */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-5">
        {/* Metric 1: 99.999% SLA Speedometer Card */}
        <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-emerald-500/5 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground">Recovery SLA</span>
            <span className="rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              Active
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl font-black text-foreground">99.999%</span>
            <span className="text-xs font-bold text-emerald-500">Verified</span>
          </div>
          <div className="mt-3 h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[99.9%]" />
          </div>
          <span className="text-[10px] text-muted-foreground mt-1.5 block">0 Failed Restores (30-day window)</span>
        </div>

        {/* Metric 2: Instant VM Boot Latency */}
        <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-amber-500/5 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground">Instant VM Boot</span>
            <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
              Sub-Second
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl font-black text-foreground">{simulatedRto}s</span>
            <span className="text-xs font-bold text-amber-500">Avg RTO</span>
          </div>
          {/* Animated SVG Chart Line */}
          <div className="mt-2 h-6 w-full flex items-end gap-1">
            {[35, 45, 30, 60, 50, 40, 75, 55, 65, 80, 70, 85].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all duration-500 ${
                  i === 11 ? "bg-amber-500 animate-pulse" : "bg-primary/30"
                }`}
                style={{ height: `${(h + ((tick + i) % 5) * 4) % 100}%` }}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground mt-1 block">Continuous live boot verification</span>
        </div>

        {/* Metric 3: Immutable Vault Lock */}
        <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-blue-500/5 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground">Immutable Vault</span>
            <span className="rounded-md bg-blue-500/15 px-1.5 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
              WORM Active
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl font-black text-foreground">340 TB</span>
            <span className="text-xs font-bold text-blue-500">Locked</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3.5 text-emerald-500" />
            <span className="font-semibold text-foreground text-[11px]">Strict Air-Gapped Retention</span>
          </div>
          <span className="text-[10px] text-muted-foreground mt-1 block">Ransomware immune snapshot policy</span>
        </div>

        {/* Metric 4: Global Deduplication */}
        <div className="rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card to-indigo-500/5 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted-foreground">Deduplication Ratio</span>
            <span className="rounded-md bg-indigo-500/15 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
              78% Saved
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-3xl font-black text-foreground">9.4 : 1</span>
            <span className="text-xs font-bold text-indigo-500">Global</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="size-3.5 text-emerald-500" />
            <span className="font-semibold text-foreground text-[11px]">$14,200/mo Saved</span>
          </div>
          <span className="text-[10px] text-muted-foreground mt-1 block">Source-side & in-flight compression</span>
        </div>
      </div>

      {/* 3. Live Protected Workloads Grid */}
      <div className="rounded-2xl border border-border/80 bg-secondary/30 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="size-3.5 text-primary" /> Active Workload Protection Status
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">4 of 4 Clusters Healthy</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            const isSelected = activeNode === i;
            return (
              <div
                key={node.name}
                onClick={() => setActiveNode(i)}
                className={`cursor-pointer rounded-xl border p-3 transition-all ${
                  isSelected
                    ? "border-primary bg-card shadow-md scale-[1.02]"
                    : "border-border/70 bg-card/60 hover:bg-card hover:border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    {node.status}
                  </span>
                </div>
                <h4 className="mt-2 text-xs font-bold text-foreground truncate">{node.name}</h4>
                <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{node.count}</span>
                  <span className="font-mono font-bold text-primary">{node.rto}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Live Backup Stream Activity Heatmap */}
      <div className="rounded-2xl border border-border/80 bg-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-foreground">
              Continuous Backup Stream & Checksum Audits
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            124 granular recovery checkpoints generated in the last 24 hours.
          </p>
        </div>

        {/* Heatmap Blocks */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full">
          {Array.from({ length: 24 }).map((_, idx) => (
            <div
              key={idx}
              className={`size-4 rounded-sm transition-all duration-300 ${
                idx === 23
                  ? "bg-emerald-400 animate-pulse"
                  : idx % 6 === 0
                  ? "bg-blue-500"
                  : idx % 4 === 0
                  ? "bg-emerald-500"
                  : "bg-emerald-500/60"
              }`}
              title={`Hour ${idx}:00 - 100% verified`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
