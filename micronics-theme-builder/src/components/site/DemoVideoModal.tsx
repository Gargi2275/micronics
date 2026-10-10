import { useState, useEffect } from "react";
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, ShieldCheck, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      title: "1. Automated Cloud Snapshot Engine",
      time: "00:15",
      desc: "Agentless multi-cloud policy engine initiating continuous snapshot streams.",
      image: "/images/cloud_saas_protection.jpg",
      tag: "Agentless",
    },
    {
      title: "2. Cryptographic WORM Immutability",
      time: "00:45",
      desc: "Air-gapped vault locks with strict Write-Once-Read-Many ransomware immunity.",
      image: "/images/ransomware_vault.jpg",
      tag: "Zero-Trust",
    },
    {
      title: "3. 1-Click Instant Hypervisor Boot",
      time: "01:20",
      desc: "Sub-second live boot directly from deduplicated storage cache (<15s RTO).",
      image: "/images/instant_vm_recovery.jpg",
      tag: "< 15s RTO",
    },
    {
      title: "4. Global Protection Dashboard & Telemetry",
      time: "02:10",
      desc: "Centralized single-pane-of-glass management for multi-tenant organizations.",
      image: "/images/hero_dashboard.jpg",
      tag: "99.999% SLA",
    },
  ];

  // Auto increment progress when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        const next = prev + 1;
        if (next >= 75) setActiveChapter(3);
        else if (next >= 50) setActiveChapter(2);
        else if (next >= 25) setActiveChapter(1);
        else setActiveChapter(0);
        return next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  const defaultChapter = {
    title: "1. Automated Cloud Snapshot Engine",
    time: "00:15",
    desc: "Agentless multi-cloud policy engine initiating continuous snapshot streams.",
    image: "/images/cloud_saas_protection.jpg",
    tag: "Agentless",
  };

  const current = chapters[activeChapter] ?? defaultChapter;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-slate-900 text-white shadow-2xl"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="flex size-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Micronics Devlon • Interactive Product Architecture Tour
                <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-mono text-primary-foreground border border-primary/30">
                  HD 4K Demo
                </span>
              </h3>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="size-8 rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Video Screen & Animated Showcase */}
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <img
            src={current.image}
            alt={current.title}
            className="h-full w-full object-cover transition-all duration-700 filter brightness-95"
          />

          {/* Holographic HUD Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-6 sm:p-8 flex flex-col justify-between pointer-events-none">
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                <Sparkles className="size-3.5 text-amber-400" />
                Live Architecture Demonstration
              </span>
              <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-mono font-bold text-emerald-300 border border-emerald-500/30">
                {current.tag}
              </span>
            </div>

            {/* Bottom Caption */}
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-cyan-400">{current.time}</span>
              <h4 className="font-display text-xl sm:text-2xl font-black text-white">
                {current.title}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {current.desc}
              </p>
            </div>
          </div>

          {/* Central Play/Pause Watermark Overlay */}
          <div
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          >
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/80 text-white shadow-lg backdrop-blur-md transition-transform group-hover:scale-110">
              {isPlaying ? <Pause className="size-7" /> : <Play className="size-7 ml-1" />}
            </div>
          </div>
        </div>

        {/* Timeline Scrub Bar */}
        <div className="relative h-1.5 w-full bg-slate-800 cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const pct = Math.round((clickX / rect.width) * 100);
          setProgress(pct);
        }}>
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-primary to-amber-400 transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Bottom Control Bar & Interactive Chapter Selector */}
        <div className="bg-slate-950 p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Playback Controls */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="size-9 rounded-xl bg-white/10 text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setProgress(0);
                  setActiveChapter(0);
                }}
                className="size-9 rounded-xl bg-white/5 text-slate-400 hover:text-white"
                title="Restart"
              >
                <RotateCcw className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="size-9 rounded-xl bg-white/5 text-slate-400 hover:text-white"
              >
                {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </Button>
              <span className="text-xs font-mono text-slate-400">
                01:{String(Math.floor((progress / 100) * 60)).padStart(2, "0")} / 02:30
              </span>
            </div>

            {/* Chapter Selection Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.title}
                  type="button"
                  onClick={() => {
                    setActiveChapter(idx);
                    setProgress(idx * 25 + 5);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    activeChapter === idx
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {ch.time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
