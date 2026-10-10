import { useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Boxes,
  Database,
  Cloud,
  HardDrive,
  Star,
  Sparkles,
  Server,
  RefreshCw,
  Sliders,
  DollarSign,
  TrendingDown,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/site/HeroSlider";
import { ItemGrid, PlatformGrid, PricingCards, FinalCta } from "@/components/site/ContentBlocks";
import { InteractiveCard } from "@/components/site/InteractiveCard";
import { Reveal, Section } from "@/components/site/Section";
import { useAppData } from "@/lib/useAppData";
import { listPublished } from "@/services/content";
import { iconMap } from "@/data/mock";
import { seo } from "@/lib/seo";

import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Micronics Devlon | Enterprise Backup, Disaster Recovery & Data Protection",
      description:
        "Modern, recovery-first data protection platform for Cloud SaaS, Virtual Machines, Databases, NAS, and Endpoints.",
    }),
  component: HomePage,
});

function HomePage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data = useAppData();
  const platforms = listPublished(data.platforms);
  const products = listPublished(data.products);
  const services = listPublished(data.services);
  const features = listPublished(data.features);
  const testimonials = useMemo(() => listPublished(data.testimonials), [data.testimonials]);
  const blogs = useMemo(() => listPublished(data.blogs).slice(0, 3), [data.blogs]);

  // Interactive ROI Calculator State
  const [dataSizeTb, setDataSizeTb] = useState(25);
  const [selectedWorkload, setSelectedWorkload] = useState("VMware & Hypervisors");

  const dedupeSavings = Math.round(dataSizeTb * 0.72);
  const estimatedAnnualSavings = dedupeSavings * 480;
  const simulatedRestoreSeconds = (1.2 + (dataSizeTb / 100)).toFixed(1);

  const platformRibbon = [
    { name: "Microsoft 365", icon: Cloud },
    { name: "VMware vSphere", icon: Boxes },
    { name: "PostgreSQL", icon: Database },
    { name: "Google Workspace", icon: Cloud },
    { name: "Synology NAS", icon: HardDrive },
    { name: "Oracle Database", icon: Database },
    { name: "Hyper-V", icon: Boxes },
    { name: "Amazon S3", icon: Cloud },
    { name: "Microsoft SQL Server", icon: Database },
    { name: "Proxmox VE", icon: Server },
    { name: "QNAP Storage", icon: HardDrive },
    { name: "Linux & Windows", icon: Server },
  ];

  const vaultImage = isDark ? "/images/ransomware_vault.jpg" : "/images/ransomware_vault_light.jpg";
  const instantVmImage = isDark ? "/images/instant_vm_recovery.jpg" : "/images/instant_vm_light.jpg";

  return (
    <>
      {/* 1. Ultra-Sleek Hero Section with AI Dashboard Showcase & Video Tour Modal */}
      <HeroSlider />

      {/* 2. Platform Logo Ribbon */}
      <section className="relative overflow-hidden border-y border-border/80 bg-card/60 py-6 backdrop-blur-md transition-colors duration-300">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="marquee-container flex overflow-hidden whitespace-nowrap">
          <div className="marquee-track flex items-center gap-10 sm:gap-14 pr-10">
            {[...platformRibbon, ...platformRibbon].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={`${item.name}-${index}`}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="size-4 text-primary" />
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Interactive Workload Studio (Spotlight + Curated Category Cards) */}
      <Section
        eyebrow="Unified Workload Coverage"
        title="Everything you run, protected and instantly restorable."
        intro="From multi-tenant cloud suites and distributed VMs to enterprise database clusters, NAS repositories, and mobile fleets."
      >
        <PlatformGrid platforms={platforms} />
      </Section>

      {/* 4. Deep-Dive Visual Showcase 1: Air-Gapped Ransomware Immunity */}
      <Section
        className="bg-secondary/30"
        eyebrow="Zero-Trust Cyber Resilience"
        title="Immutable WORM Vaults & Ransomware Immunity"
        intro="Protection snapshots are cryptographically locked with Write-Once-Read-Many policies. Even if primary domain credentials are compromised, historical backups remain completely unalterable."
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-4" />
              3-2-1-1-0 Compliance Standard
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black text-foreground">
              Air-Gapped Isolation with Automated Canary Detection
            </h3>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Our autonomous scanner analyzes data entropy during ingestion. Any anomalous encryption attempts trigger instantaneous air-gap isolation and alert recovery specialists via webhook and SMS.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/80 bg-card p-4">
                <span className="text-xs font-bold text-foreground block">Strict Object Lock</span>
                <span className="text-xs text-muted-foreground mt-0.5 block">S3 & on-prem WORM retention</span>
              </div>
              <div className="rounded-2xl border border-border/80 bg-card p-4">
                <span className="text-xs font-bold text-foreground block">Entropy Anomaly Shield</span>
                <span className="text-xs text-muted-foreground mt-0.5 block">Early ransomware warning</span>
              </div>
              <div className="rounded-2xl border border-border/80 bg-card p-4">
                <span className="text-xs font-bold text-foreground block">Zero Backdoors</span>
                <span className="text-xs text-muted-foreground mt-0.5 block">Multi-party authorization</span>
              </div>
              <div className="rounded-2xl border border-border/80 bg-card p-4">
                <span className="text-xs font-bold text-foreground block">256-bit AES GCM</span>
                <span className="text-xs text-muted-foreground mt-0.5 block">End-to-end encryption keys</span>
              </div>
            </div>

            <div className="pt-2">
              <Button asChild variant="orange" size="sm">
                <Link to="/features">
                  <span>Explore Security Architecture</span>
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* AI Generated Vault Image with Glassmorphism */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border/80 bg-slate-950 shadow-2xl">
            <img
              src={vaultImage}
              alt="Air-Gapped Immutable Vault"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">Air-Gapped Storage Active</span>
              </div>
              <span className="rounded bg-white/10 px-2.5 py-1 font-mono text-[11px] text-amber-300">
                WORM Locked
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Deep-Dive Visual Showcase 2: Instant VM Boot & Sub-Second RTO */}
      <Section
        eyebrow="Instant Disaster Recovery"
        title="Boot Failed Virtual Machines in Under 15 Seconds"
        intro="Eliminate hours of recovery downtime. Mount virtual machine disk images directly from high-speed deduplicated cache into VMware ESXi, Hyper-V, or Proxmox instantly."
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] items-center">
          {/* AI Generated Instant VM Recovery Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border/80 bg-slate-950 shadow-2xl order-2 lg:order-1">
            <img
              src={instantVmImage}
              alt="Instant VM Boot & Recovery HUD"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2">
                <Zap className="size-4 text-amber-400" />
                <span className="font-bold">Boot Latency: 1.4 Seconds</span>
              </div>
              <span className="rounded bg-emerald-500/20 px-2.5 py-1 font-mono text-[11px] text-emerald-300 border border-emerald-500/30">
                100% Verified
              </span>
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Zap className="size-4" />
              Sub-Second RTO Technology
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black text-foreground">
              Automated Sandbox Recovery Drills
            </h3>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Restores shouldn&apos;t be a leap of faith. Devlon automatically spins up sandboxed virtual machines in isolated VLANs, verifies OS kernel health and database integrity, and emails executive certificates of recovery readiness.
            </p>

            <ul className="space-y-3">
              {[
                { title: "No Data Migration Wait", desc: "Instant NFS/iSCSI target presentation directly to hypervisors." },
                { title: "Point-in-Time Granularity", desc: "Select any snapshot down to the exact second before disaster struck." },
                { title: "Cross-Platform Restore", desc: "Restore VMware VMs directly to Hyper-V or Proxmox on demand." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-3 font-bold" />
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-foreground">{item.title}</strong>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Button asChild variant="blue" size="sm">
                <Link to="/solutions">
                  <span>View All Hypervisors</span>
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Interactive Live RTO & Storage ROI Calculator */}
      <Section
        className="bg-secondary/40"
        eyebrow="Interactive ROI Estimator"
        title="Calculate your storage savings and restore velocity"
        intro="See how global block-level deduplication and sub-second instant mounting slash your annual infrastructure spend."
      >
        <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-10 shadow-card">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            {/* Left: Interactive Controls */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Primary Data Footprint
                  </label>
                  <span className="font-display text-2xl font-black text-foreground">
                    {dataSizeTb} TB
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={dataSizeTb}
                  onChange={(e) => setDataSizeTb(Number(e.target.value))}
                  className="h-2.5 w-full cursor-pointer rounded-lg bg-secondary accent-primary"
                />
                <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
                  <span>5 TB</span>
                  <span>100 TB</span>
                  <span>200 TB+</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                  Workload Environment
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["VMware & Hypervisors", "Microsoft 365 SaaS", "Databases & SQL", "Synology / QNAP NAS", "Hybrid Enterprise"].map((wl) => (
                    <button
                      key={wl}
                      type="button"
                      onClick={() => setSelectedWorkload(wl)}
                      className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all text-left ${
                        selectedWorkload === wl
                          ? "bg-primary text-primary-foreground font-bold shadow-sm"
                          : "border border-border/80 bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {wl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Live Calculated Output */}
            <div className="grid grid-cols-2 gap-4 bg-gradient-to-br from-primary/5 via-secondary/50 to-accent/5 p-6 rounded-2xl border border-border/80">
              <div className="rounded-2xl border border-border/60 bg-card p-4">
                <span className="text-[11px] font-bold text-muted-foreground block">
                  Simulated Restore RTO
                </span>
                <div className="mt-2 font-display text-3xl font-black text-amber-500 flex items-baseline gap-1">
                  {simulatedRestoreSeconds}s
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  Sub-second instant mount
                </span>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-4">
                <span className="text-[11px] font-bold text-muted-foreground block">
                  Deduplication Savings
                </span>
                <div className="mt-2 font-display text-3xl font-black text-emerald-500 flex items-baseline gap-1">
                  {dedupeSavings} TB
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  72% storage footprint reduction
                </span>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-4 col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-muted-foreground">
                    Estimated Cloud & Storage Savings
                  </span>
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                    Annual ROI
                  </span>
                </div>
                <div className="mt-2 font-display text-4xl font-black text-foreground">
                  ${estimatedAnnualSavings.toLocaleString()}{" "}
                  <span className="text-sm font-medium text-muted-foreground">/ year</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Based on standard enterprise cloud storage costs, egress elimination, and automated management hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Products & Services Bento Showcase */}
      <Section
        eyebrow="Software & Managed Operations"
        title="Engineered for administrators, MSPs, and resilient teams"
        intro="Deploy modular software controllers across your infrastructure, or leverage our 24/7 managed recovery specialists."
      >
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-foreground">
              Software Modules
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Policy-driven backup controllers with zero-trust encryption
            </p>
          </div>
          <Button asChild variant="glass">
            <Link to="/products">
              <span>All products</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <ItemGrid items={products.slice(0, 6)} basePath="/products" />

        <div className="mb-8 mt-20 flex items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-foreground">
              Managed Services & Implementation
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              White-glove deployment, 24/7 disaster recovery drills, and custom MSP branding
            </p>
          </div>
          <Button asChild variant="glass">
            <Link to="/services">
              <span>All services</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <ItemGrid items={services.slice(0, 6)} basePath="/services" />
      </Section>

      {/* 8. Why Micronics Devlon & Testimonial Proof */}
      <Section
        className="bg-secondary/30"
        eyebrow="Measurable Operational Proof"
        title="Designed for the day you need the restore"
        intro="Discover why high-growth IT organizations and MSPs rely on Micronics Devlon for their most sensitive environments."
      >
        <div className="grid gap-8">
          <InteractiveCard className="p-8">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              The Devlon Difference
            </span>
            <h3 className="mt-4 font-display text-2xl sm:text-3xl font-black tracking-tight text-card-foreground">
              Proactive readiness beats reactive recovery panic.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Most backup software merely checks if a job finished. We automatically spin up sandboxed restore points, run checksum audits, and provide verified certificates of recovery.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                { title: "Continuous Policy Automation", desc: "Set-and-forget SLAs with automated anomaly alerts" },
                { title: "Cryptographic Immutability", desc: "Zero risk of ransomware modification on air-gapped snapshots" },
                { title: "Plain-Language Executive Audit", desc: "Instant compliance reports for HIPAA, SOC-2, and ISO 27001" },
                { title: "Live Specialist Escort", desc: "Direct phone and Slack access to dedicated recovery engineers" },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="size-3.5" />
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-foreground">
                      {item.title}
                    </strong>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </InteractiveCard>
        </div>
      </Section>

      {/* 9. Testimonial marquee */}
      <Section className="overflow-hidden" eyebrow="Customer proof" title="Trusted by teams that need recovery to work">
        <div className="relative overflow-hidden">
          <div className="marquee-track flex w-max gap-5">
            {[...testimonials, ...testimonials].map((item, index) => (
              <article key={`${item.id}-${index}`} className="w-[min(82vw,360px)] shrink-0 rounded-2xl border border-border/80 bg-card p-6 shadow-card">
                <div className="mb-4 flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} className="size-4 fill-amber-500" />)}
                </div>
                <p className="text-sm leading-7 text-muted-foreground">“{item.quote || item.body}”</p>
                <div className="mt-5 border-t border-border/60 pt-4">
                  <p className="text-sm font-bold text-foreground">{item.person}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.company}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* 10. Blogs */}
      <Section
        className="bg-secondary/30"
        eyebrow="Insights"
        title="Ideas from recovery teams."
        intro="Explore practical guidance from Micronics Devlon specialists."
      >
        <div className="grid gap-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.length > 0 ? blogs.map((blog) => (
              <Link key={blog.id} to="/blogs/$slug" params={{ slug: blog.slug }} className="block h-full">
              <InteractiveCard className="flex min-w-0 flex-col overflow-hidden p-0" spotlight={false}>
                <div className="aspect-[16/9] w-full overflow-hidden bg-secondary">
                  {blog.image ? <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-xs text-muted-foreground">Micronics Devlon Blog</div>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">{blog.author || "Micronics Devlon"}</p>
                  <h3 className="mt-2 font-display text-lg font-black leading-tight text-foreground">{blog.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{blog.shortDescription || blog.body}</p>
                  <span className="mt-auto pt-4 text-sm font-bold text-primary">Read article →</span>
                </div>
              </InteractiveCard>
              </Link>
            )) : <p className="text-sm text-muted-foreground">New blog articles will appear here soon.</p>}
          </div>
        </div>
        <div className="mt-7 flex flex-wrap gap-4">
          <Button asChild variant="outline" size="sm"><Link to="/blogs">Read all blogs <ArrowRight className="ml-1 size-4" /></Link></Button>
        </div>
      </Section>

      {/* 10. Pricing Section */}
      <Section
        eyebrow="Transparent Investment"
        title="Start with a plan. Scale seamlessly as workloads grow."
        intro="Clear pricing with no hidden egress penalties or restore charges. Switch between monthly and annual savings anytime."
      >
        <PricingCards plans={listPublished(data.pricingPlans)} />
      </Section>

      {/* 10. Radiant Final CTA */}
      <FinalCta />
    </>
  );
}
