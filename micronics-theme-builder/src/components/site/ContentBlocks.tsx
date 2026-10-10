import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  Lock,
  ArrowUpRight,
  Layers,
  Search,
  Server,
  Database,
  Cloud,
  HardDrive,
  Laptop,
  Play,
  Check,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InteractiveCard } from "@/components/site/InteractiveCard";
import { Reveal, Section } from "@/components/site/Section";
import { iconMap, type BaseItem, type Platform, type PricingPlan } from "@/data/mock";
import { LeadForm } from "@/components/site/forms";

export function ItemGrid({
  items,
  basePath,
}: {
  items: BaseItem[];
  basePath: "/products" | "/services" | "/solutions" | "/resources";
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] ?? CheckCircle2;
        const to = `${basePath}/$slug` as
          | "/products/$slug"
          | "/services/$slug"
          | "/solutions/$slug"
          | "/resources/$slug";
        return (
          <Reveal key={item.id} delay={index * 0.05}>
            <InteractiveCard className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-indigo-500/10 text-primary border border-primary/20 shadow-sm">
                    <Icon className="size-6" />
                  </div>
                  <span className="rounded-full bg-secondary/80 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                    Instant Recovery
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold tracking-tight text-card-foreground">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.shortDescription}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                <Button asChild variant="link" className="group p-0 text-sm font-semibold">
                  <Link to={to} params={{ slug: item.slug }} className="inline-flex items-center gap-1.5 text-primary">
                    <span>Learn details</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <span className="text-xs font-mono text-muted-foreground">AES-256</span>
              </div>
            </InteractiveCard>
          </Reveal>
        );
      })}
    </div>
  );
}

import { useTheme } from "@/lib/theme";

export function PlatformGrid({ platforms }: { platforms: Platform[] }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [activeCategory, setActiveCategory] = useState("Cloud & SaaS");
  const [simulatingRestore, setSimulatingRestore] = useState(false);
  const [restoreProgress, setRestoreProgress] = useState(0);

  const categories = [
    { name: "Cloud & SaaS", icon: Cloud, count: 6 },
    { name: "Virtualization", icon: Server, count: 5 },
    { name: "Databases", icon: Database, count: 5 },
    { name: "Systems & NAS", icon: HardDrive, count: 6 },
  ];

  const categorySpotlights: Record<
    string,
    {
      title: string;
      subtitle: string;
      darkImage: string;
      lightImage: string;
      badge: string;
      specs: { label: string; value: string }[];
    }
  > = {
    "Cloud & SaaS": {
      title: "Microsoft 365 & Google Workspace Protection",
      subtitle: "Agentless multi-tenant protection with sub-second search and granular item restore.",
      darkImage: "/images/cloud_saas_protection.jpg",
      lightImage: "/images/cloud_saas_light.jpg",
      badge: "SaaS Recovery Mesh",
      specs: [
        { label: "Restore Speed", value: "< 1.5s per mailbox" },
        { label: "Deduplication", value: "8:1 Storage Ratio" },
        { label: "Legal Hold", value: "Unlimited Compliance" },
      ],
    },
    "Virtualization": {
      title: "VMware ESXi, Hyper-V & Proxmox Instant Boot",
      subtitle: "Run crashed virtual machines directly from deduplicated backup storage without waiting for data transfer.",
      darkImage: "/images/instant_vm_recovery.jpg",
      lightImage: "/images/instant_vm_light.jpg",
      badge: "Sub-Second Live Boot",
      specs: [
        { label: "Boot RTO", value: "< 15s Verified" },
        { label: "Agentless", value: "CBT Tracking" },
        { label: "Sandbox Drills", value: "Auto-Verification" },
      ],
    },
    "Databases": {
      title: "Transactional Consistency for SQL & Oracle",
      subtitle: "Hot backups with automated transaction log truncation and point-in-time database rollback.",
      darkImage: "/images/hero_dashboard.jpg",
      lightImage: "/images/hero_dashboard_light.jpg",
      badge: "Point-in-Time RPO",
      specs: [
        { label: "Transaction RPO", value: "0 Data Loss" },
        { label: "Consistency", value: "VSS & ACID Safe" },
        { label: "Granular Restore", value: "Table & DB Level" },
      ],
    },
    "Systems & NAS": {
      title: "Air-Gapped Immutable NAS & Bare-Metal Storage",
      subtitle: "Cryptographic WORM policy retention across Synology, QNAP, Linux, and Windows bare-metal images.",
      darkImage: "/images/ransomware_vault.jpg",
      lightImage: "/images/ransomware_vault_light.jpg",
      badge: "WORM Immutability",
      specs: [
        { label: "Vault Lock", value: "100% Immutable" },
        { label: "Air-Gap Mode", value: "Physical / Cloud" },
        { label: "Hardware Support", value: "Universal Drivers" },
      ],
    },
  };

  const defaultSpotlight = {
    title: "Microsoft 365 & Google Workspace Protection",
    subtitle: "Agentless multi-tenant protection with sub-second search and granular item restore.",
    darkImage: "/images/cloud_saas_protection.jpg",
    lightImage: "/images/cloud_saas_light.jpg",
    badge: "SaaS Recovery Mesh",
    specs: [
      { label: "Restore Speed", value: "< 1.5s per mailbox" },
      { label: "Deduplication", value: "8:1 Storage Ratio" },
      { label: "Legal Hold", value: "Unlimited Compliance" },
    ],
  };

  const currentSpotlight = categorySpotlights[activeCategory] ?? defaultSpotlight;
  const currentSpotlightImage = isDark ? currentSpotlight.darkImage : currentSpotlight.lightImage;

  const filtered = platforms.filter((item) => {
    if (activeCategory === "Cloud & SaaS") return item.category === "SaaS" || item.category === "Cloud & Mobile";
    if (activeCategory === "Virtualization") return item.category === "Virtualization";
    if (activeCategory === "Databases") return item.category === "Databases";
    return item.category === "Systems & NAS" || item.category === "Onsite Systems";
  });

  const handleSimulateRestore = () => {
    setSimulatingRestore(true);
    setRestoreProgress(10);
    const i1 = setTimeout(() => setRestoreProgress(45), 400);
    const i2 = setTimeout(() => setRestoreProgress(80), 800);
    const i3 = setTimeout(() => {
      setRestoreProgress(100);
      setTimeout(() => {
        setSimulatingRestore(false);
        setRestoreProgress(0);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="space-y-10">
      {/* 1. Category Switcher Pills */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveCategory(cat.name)}
              className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "border border-border/80 bg-card/80 text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              <span>{cat.name}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-mono ${
                  isActive ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Interactive Spotlight Feature Banner with AI Visual & Live Restore Trigger */}
      <div className="overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-secondary/50 p-6 sm:p-8 shadow-card backdrop-blur-xl">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-4">
              <Sparkles className="size-3.5" />
              {currentSpotlight.badge}
            </div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
              {currentSpotlight.title}
            </h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
              {currentSpotlight.subtitle}
            </p>

            {/* Live Specs Matrix */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {currentSpotlight.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-2xl border border-border/70 bg-background/80 p-3 text-left shadow-sm"
                >
                  <span className="text-[11px] font-bold text-muted-foreground block truncate">
                    {spec.label}
                  </span>
                  <strong className="mt-1 block font-display text-xs sm:text-sm font-black text-foreground">
                    {spec.value}
                  </strong>
                </div>
              ))}
            </div>

            {/* Interactive Live Restore Simulator Button */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                variant="orange"
                size="default"
                disabled={simulatingRestore}
                onClick={handleSimulateRestore}
                className="shadow-sm text-xs font-bold"
              >
                {simulatingRestore ? (
                  <>
                    <RefreshCw className="size-3.5 mr-1.5 animate-spin" />
                    Mounting Instant VM ({restoreProgress}%)...
                  </>
                ) : (
                  <>
                    <Play className="size-3.5 mr-1.5 fill-current" />
                    Run Live Restore Simulation
                  </>
                )}
              </Button>
              <Button asChild variant="ghost" size="sm" className="text-xs font-semibold text-primary">
                <Link to="/solutions">Browse all solutions →</Link>
              </Button>
            </div>
          </div>

          {/* Spotlight AI Visual Container */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/80 bg-slate-950 shadow-xl">
            <img
              src={currentSpotlightImage}
              alt={currentSpotlight.title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
              <span className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="size-4 text-emerald-400" />
                Verified Immutable Image
              </span>
              <span className="font-mono text-[11px] text-cyan-300">
                AES-256 GCM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Curated Workload Grid with Brand Badges & RTO */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((platform) => {
          const Icon = iconMap[platform.icon] ?? CheckCircle2;
          return (
            <Link
              key={platform.id}
              to="/backup/$slug"
              params={{ slug: platform.slug }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-elevated"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-muted-foreground">
                    {platform.category}
                  </span>
                </div>

                <h4 className="mt-4 font-display text-base font-bold tracking-tight text-card-foreground group-hover:text-primary transition-colors">
                  {platform.title}
                </h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  {platform.shortDescription}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-border/40 text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                  <Zap className="size-3" /> &lt; 1.4s RTO
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-primary transition-transform group-hover:translate-x-1">
                  Explore <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function PricingCards({ plans }: { plans: PricingPlan[] }) {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      {/* Annual / Monthly Toggle */}
      <div className="mb-12 flex items-center justify-center gap-3">
        <span
          className={`text-sm font-semibold ${
            !annual ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Monthly billing
        </span>
        <button
          type="button"
          onClick={() => setAnnual(!annual)}
          className="relative inline-flex h-7 w-14 items-center rounded-full bg-slate-800 p-1 transition-colors dark:bg-slate-700"
          aria-label="Toggle annual billing"
        >
          <span
            className={`inline-block size-5 rounded-full bg-white shadow-md transition-transform ${
              annual ? "translate-x-7 bg-amber-400" : "translate-x-0"
            }`}
          />
        </button>
        <span
          className={`text-sm font-semibold flex items-center gap-1.5 ${
            annual ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          Annual billing
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            Save 20%
          </span>
        </span>
      </div>

      {/* Pricing Grid */}
      <div className="grid gap-8 lg:grid-cols-3 items-stretch">
        {plans.map((plan) => {
          const isPopular = plan.popular;
          let displayedPrice = plan.price;
          if (plan.price.startsWith("$") && annual) {
            const rawNum = parseInt(plan.price.replace("$", ""), 10);
            if (!isNaN(rawNum)) {
              displayedPrice = `$${Math.round(rawNum * 0.8)}`;
            }
          }

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                isPopular
                  ? "border-2 border-amber-500/60 bg-gradient-to-b from-card to-card/90 shadow-elevated shadow-amber-500/10 lg:-translate-y-2"
                  : "border border-border/80 bg-card/75 shadow-card backdrop-blur-md hover:border-primary/40 hover:shadow-elevated"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-amber-500/25">
                    <Sparkles className="size-3" /> Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-display text-2xl font-black tracking-tight text-card-foreground">
                  {plan.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {plan.shortDescription}
                </p>

                <div className="mt-6 flex items-baseline gap-1 border-y border-border/50 py-4">
                  <span className="font-display text-4xl sm:text-5xl font-black text-foreground">
                    {displayedPrice}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {plan.cadence}
                  </span>
                </div>

                <ul className="mt-6 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6">
                <Button
                  asChild
                  variant={isPopular ? "orange" : "blue"}
                  size="lg"
                  className="w-full"
                >
                  <Link to="/contact">
                    <span>Choose {plan.title}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FinalCta() {
  return (
    <Section className="py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
        {/* Ambient Aurora Glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-perspective-grid opacity-20" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_auto] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-bold text-amber-300">
              <Sparkles className="size-3.5" /> Instant Recovery Proof
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Protect every critical workload with proven recovery readiness.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Start with a 14-day fully-featured trial, test instant restores on your own test data, and experience effortless protection.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                14-day full feature trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-blue-400" />
                Zero setup fee
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="size-3.5 text-amber-400" />
                AES-256 & SOC-2
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild variant="orange" size="xl" className="shadow-amber-glow">
              <Link to="/free-trial">
                <span>Start Free Trial</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="glassHero" size="xl">
              <Link to="/contact">
                <span>Book Live Demo</span>
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function QuotePanel({ type = "quote" }: { type?: "contact" | "demo" | "trial" | "quote" }) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card/90 p-6 sm:p-8 shadow-card backdrop-blur-md">
      <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
        <div>
          <h2 className="font-display text-2xl font-black tracking-tight text-card-foreground">
            {type === "trial"
              ? "Start Your 14-Day Free Trial"
              : type === "demo"
              ? "Schedule a Live Technical Demo"
              : "Request a Tailored Protection Quote"}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            No obligation. We will configure policies and trial credits tailored to your stack.
          </p>
        </div>
        <div className="hidden sm:flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShieldCheck className="size-5" />
        </div>
      </div>
      <LeadForm type={type} />
    </div>
  );
}
