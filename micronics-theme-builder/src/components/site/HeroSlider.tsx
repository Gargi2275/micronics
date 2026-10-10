import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Boxes,
  Sparkles,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UniversalSearch } from "@/components/site/UniversalSearch";
import { DemoVideoModal } from "@/components/site/DemoVideoModal";
import { HeroCyberBackground } from "@/components/site/HeroCyberBackground";
import { HeroVisualShowcase } from "@/components/site/HeroVisualShowcase";
import { TaxComplianceBanner } from "@/components/site/TaxComplianceBanner";
import { useAppData } from "@/lib/useAppData";

export function HeroSlider() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isTaxComplianceOpen, setIsTaxComplianceOpen] = useState(false);
  const { settings } = useAppData();

  const valuePillars = [
    {
      icon: Zap,
      title: "< 1.4s Instant RTO",
      desc: "Instant sandbox mount & automated restore verification.",
      badge: "Sub-Second",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: Lock,
      title: "Immutable WORM Vaults",
      desc: "Cryptographically locked snapshots immune to ransomware.",
      badge: "Zero-Trust",
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: Boxes,
      title: "30+ Unified Workloads",
      desc: "Microsoft 365, VMware, Proxmox, SQL, Oracle & NAS.",
      badge: "Unified Mesh",
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      icon: ShieldCheck,
      title: "99.999% Verified SLA",
      desc: "Automated checksum audits & executive certificates.",
      badge: "Audit-Ready",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  const defaultProtectionSources = [
    { label: "Google Workspace", logo: "https://cdn.simpleicons.org/google" },
    { label: "Microsoft 365", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
    { label: "VMware", logo: "https://cdn.simpleicons.org/vmware" },
    { label: "Hyper-V", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
    { label: "Microsoft Exchange", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
    { label: "Microsoft SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg" },
    { label: "Oracle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
    { label: "MySQL", logo: "https://cdn.simpleicons.org/mysql" },
    { label: "MariaDB", logo: "https://cdn.simpleicons.org/mariadb" },
    { label: "Backup File", logo: "https://cdn.simpleicons.org/files" },
    { label: "QNAP NAS", logo: "https://cdn.simpleicons.org/qnap" },
    { label: "Synology NAS", logo: "https://cdn.simpleicons.org/synology" },
    { label: "Android", logo: "https://cdn.simpleicons.org/android" },
    { label: "iOS", logo: "https://cdn.simpleicons.org/apple" },
    { label: "Linux Bare Metal", logo: "https://cdn.simpleicons.org/linux" },
    { label: "Tibero", logo: "https://cdn.simpleicons.org/database" },
    { label: "Proxmox VE", logo: "https://cdn.simpleicons.org/proxmox" },
    { label: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql" },
  ];

  const defaultProtectionDestinations = [
    { label: "Aliyun", logo: "https://cdn.simpleicons.org/alibabacloud" },
    { label: "Amazon S3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
    { label: "Backblaze B2", logo: "https://cdn.simpleicons.org/backblaze" },
    { label: "CTYun", logo: "https://cdn.simpleicons.org/cloudflare" },
    { label: "Dropbox", logo: "https://cdn.simpleicons.org/dropbox" },
    { label: "Google Cloud Storage", logo: "https://cdn.simpleicons.org/googlecloud" },
    { label: "Google Drive", logo: "https://cdn.simpleicons.org/googledrive" },
    { label: "Microsoft Azure", logo: "https://cdn.simpleicons.org/microsoftazure" },
    { label: "OneDrive", logo: "https://cdn.simpleicons.org/onedrive" },
    { label: "OpenStack", logo: "https://cdn.simpleicons.org/openstack" },
    { label: "Rackspace", logo: "https://cdn.simpleicons.org/cloudflare" },
    { label: "Wasabi", logo: "https://cdn.simpleicons.org/wasabi" },
    { label: "Local / Network Share", logo: "https://cdn.simpleicons.org/files" },
    { label: "USB Drive", logo: "https://cdn.simpleicons.org/usbdrive" },
  ];
  const protectionSources = settings.heroSources.length > 0 ? settings.heroSources : defaultProtectionSources;
  const protectionDestinations = settings.heroDestinations.length > 0 ? settings.heroDestinations : defaultProtectionDestinations;

  return (
    <section className="relative overflow-hidden bg-hero text-hero-foreground pt-24 pb-20 sm:pt-28 sm:pb-28 transition-colors duration-300">
      {/* 🌟 Dynamic Cyber Video / Canvas Mesh Background */}
      <HeroCyberBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Trust Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-card/85 px-4 py-1.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/[0.07] dark:text-white/90"
        >
          <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span>Next-Gen Enterprise Cyber Recovery & Backup</span>
          <span className="text-muted-foreground/50">•</span>
          <span className="text-amber-600 dark:text-amber-300 font-bold flex items-center gap-1">
            <Sparkles className="size-3" /> 2026 Edition
          </span>
        </motion.div>

        <div className="grid items-start gap-8 text-left lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl font-display text-4xl sm:text-6xl lg:col-start-1 lg:row-start-1 lg:text-[4rem] font-black leading-[1.08] tracking-tight"
        >
          Enterprise Data Protection &{" "}
          <span className="gradient-text">Instant Sub-Second Recovery</span>.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-3xl text-base sm:text-xl lg:col-start-1 lg:row-start-2 leading-relaxed text-muted-foreground dark:text-slate-300 font-normal"
        >
          Secure your Microsoft 365, VMware clusters, databases, and NAS repositories with immutable air-gapped vaults and verified sub-second restore paths.
        </motion.p>

        {/* Protection path highlights: visible immediately in the hero */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mx-auto mt-0 w-full max-w-4xl rounded-3xl border border-border/80 bg-card/85 p-3 text-left shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65 lg:col-start-2 lg:row-span-5 lg:row-start-1 sm:p-4"
        >
          <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <div>
              <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-primary sm:text-left">Back up from</p>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {protectionSources.map((item) => {
                  return (
                    <div key={item.label} className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg border border-border/80 bg-background/80 px-1 py-1.5 text-center text-[9px] font-semibold leading-tight text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-card shadow-sm">
                        <img
                          src={item.logo}
                          alt={`${item.label} logo`}
                          className="size-6 object-contain"
                          loading="lazy"
                        />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mx-auto mt-2 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary lg:mt-8">
              <ArrowRight className="hidden size-5 lg:block" />
              <span className="text-lg lg:hidden">↓</span>
            </div>

            <div>
              <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400 sm:text-left">Protect to</p>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {protectionDestinations.map((item) => {
                  return (
                    <div key={item.label} className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg border border-border/80 bg-background/80 px-1 py-1.5 text-center text-[9px] font-semibold leading-tight text-foreground transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-card shadow-sm">
                        <img
                          src={item.logo}
                          alt={`${item.label} logo`}
                          className="size-6 object-contain"
                          loading="lazy"
                        />
                      </span>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-[10px] leading-4 text-muted-foreground">One recovery platform for SaaS, virtual machines, databases, files, endpoints, cloud and local destinations.</p>
        </motion.div>

        {/* Universal Search & Discovery Bar */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-7 flex w-full max-w-[560px] flex-col items-center justify-self-center px-4 lg:-mt-24 lg:col-span-2 lg:col-start-1 lg:row-start-6"
        >
          <UniversalSearch className="mx-auto" />
        </motion.div>

        {/* Dual CTA Buttons with Video Play Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 flex flex-col items-center gap-3.5 sm:flex-row sm:justify-center lg:col-span-2 lg:col-start-1 lg:row-start-7"
        >
          <Button asChild variant="orange" size="xl" className="shadow-amber-glow text-sm font-bold">
            <Link to="/free-trial">
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <Button
            variant="glass"
            size="xl"
            onClick={() => setIsVideoOpen(true)}
            className="group text-sm font-bold border-border/80 bg-card/70 hover:bg-card/95 text-foreground dark:text-white"
          >
            <div className="flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary mr-1 transition-transform group-hover:scale-110">
              <Play className="size-3 fill-primary text-primary ml-0.5" />
            </div>
            <span>Watch 2-Min Product Tour</span>
          </Button>
        </motion.div>

        {/* Trust Guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs font-medium text-muted-foreground dark:text-slate-400 lg:col-span-2 lg:col-start-1 lg:row-start-8"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3.5 text-blue-500" />
            Instant 5-minute deployment
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-amber-500" />
            SOC-2 & AES-256 compliant
          </span>
        </motion.div>
        </div>

        {/* 🌟 Masterpiece High-Definition Visual Image & Video Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14"
        >
          <HeroVisualShowcase onWatchVideo={() => setIsVideoOpen(true)} />
        </motion.div>

        {/* 4 Feature Value Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left"
        >
          {valuePillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-5 shadow-card backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/40 dark:hover:bg-slate-900/80"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                    <Icon className="size-5" />
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border ${item.color}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-base font-bold text-card-foreground group-hover:text-primary transition-colors dark:text-white dark:group-hover:text-blue-400">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-muted-foreground dark:text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <TaxComplianceBanner
            isOpen={isTaxComplianceOpen}
            onOpenChange={setIsTaxComplianceOpen}
          />
        </motion.div>
      </div>

      {/* Interactive Video Tour Modal */}
      <DemoVideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
}
