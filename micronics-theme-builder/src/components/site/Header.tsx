import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  Search,
  Star,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Boxes,
  Server,
  Cloud,
  FileText,
  LifeBuoy,
  Users,
  Video,
  Building2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/Logo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { useAppData } from "@/lib/useAppData";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const data = useAppData();

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  const closeDropdown = () => setActiveDropdown(null);
  const toggleMobile = (name: string) => {
    setMobileExpanded((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Grouped Solutions
  const solutionsByCat = {
    cloud: data.solutions.filter((s) => s.category === "Cloud Applications Backup"),
    onsite: data.solutions.filter((s) => s.category === "Onsite Systems Backup"),
    personal: data.solutions.filter((s) => s.category === "Personal Backup (FREE)"),
  };

  // Grouped Features
  const featuresByCat = {
    newFeatures: data.features.filter((f) => f.category === "New"),
    highlights: data.features.filter((f) => f.category === "Highlights"),
    general: data.features.filter((f) => f.category === "General"),
    sysMgmt: data.features.filter((f) => f.category === "System Management"),
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl 2xl:max-w-[1536px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo
          logoUrl={data.settings.brandLogo}
          brandName={data.settings.brandName || data.settings.companyName}
          brandSubtitle={data.settings.brandSubtitle || "DATA PRIVATE LIMITED"}
        />

        {/* ======================================================== */}
        {/* DESKTOP NAVIGATION                                      */}
        {/* ======================================================== */}
        <nav className="hidden items-center gap-1 xl:gap-2 lg:flex mx-3 xl:mx-6" aria-label="Primary navigation">
          {/* 1. SOLUTIONS MEGA MENU */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/solutions"
              onClick={closeDropdown}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-[13px] xl:text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
            >
              <span>Solutions</span>
              <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-200", activeDropdown === "solutions" && "rotate-180")} />
            </Link>

            <div
              className={cn(
                "absolute left-1/2 top-full w-[880px] -translate-x-1/2 translate-y-2 rounded-2xl border border-border/80 bg-popover/98 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-200 dark:border-white/15 dark:bg-slate-950/95",
                activeDropdown === "solutions"
                  ? "visible pointer-events-auto translate-y-0 opacity-100"
                  : "invisible pointer-events-none opacity-0"
              )}
            >
              <div className="grid grid-cols-3 gap-6">
                {/* Col 1: Cloud Applications Backup */}
                <div>
                  <h4 className="mb-3 flex items-center justify-between font-display text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 border-b border-border/60 pb-2">
                    <span>Cloud Applications Backup</span>
                  </h4>
                  <ul className="space-y-1 text-xs">
                    {solutionsByCat.cloud.map((item) => (
                      <li key={item.id}>
                        <Link
                          to="/solutions/$slug"
                          params={{ slug: item.slug }}
                          onClick={closeDropdown}
                          className="group/link flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium text-popover-foreground transition-colors hover:bg-secondary/80 hover:text-primary"
                        >
                          {item.starred && (
                            <Star className="size-3 fill-amber-500 text-amber-500 shrink-0" />
                          )}
                          <span className={item.starred ? "font-bold text-foreground" : "text-muted-foreground group-hover/link:text-foreground"}>
                            {item.title.split(" | ")[0]}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 2: Onsite Systems Backup */}
                <div>
                  <h4 className="mb-3 flex items-center justify-between font-display text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 border-b border-border/60 pb-2">
                    <span>Onsite Systems Backup</span>
                  </h4>
                  <ul className="space-y-1 text-xs">
                    {solutionsByCat.onsite.map((item) => (
                      <li key={item.id}>
                        <Link
                          to="/solutions/$slug"
                          params={{ slug: item.slug }}
                          onClick={closeDropdown}
                          className="group/link flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
                        >
                          {item.starred && (
                            <Star className="size-3 fill-amber-500 text-amber-500 shrink-0" />
                          )}
                          <span className={item.starred ? "font-bold text-foreground" : ""}>
                            {item.title.split(" | ")[0]}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 3: Personal & Featured */}
                <div>
                  <h4 className="mb-3 flex items-center justify-between font-display text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-border/60 pb-2">
                    <span>Personal Backup (FREE)</span>
                  </h4>
                  <ul className="space-y-1 text-xs">
                    {solutionsByCat.personal.map((item) => (
                      <li key={item.id}>
                        <Link
                          to="/solutions/$slug"
                          params={{ slug: item.slug }}
                          onClick={closeDropdown}
                          className="group/link flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
                        >
                          <span>{item.title.split(" | ")[0]}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-3.5">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-primary">
                      <Sparkles className="size-3.5" />
                      <span>Zero-Trust Architecture</span>
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                      Cryptographic WORM immutability, automated RPO drill testing, and instant sandbox mount.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                <span className="text-muted-foreground">Tailored disaster recovery solutions for every tier.</span>
                <Link
                  to="/solutions"
                  onClick={closeDropdown}
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore all solutions</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2. PRODUCTS DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("products")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/products"
              onClick={closeDropdown}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-[13px] xl:text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
            >
              <span>Products</span>
              <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-200", activeDropdown === "products" && "rotate-180")} />
            </Link>

            <div
              className={cn(
                "absolute left-1/2 top-full w-[460px] -translate-x-1/2 translate-y-2 rounded-2xl border border-border/80 bg-popover/98 p-5 shadow-2xl backdrop-blur-2xl transition-all duration-200 dark:border-white/15 dark:bg-slate-950/95",
                activeDropdown === "products"
                  ? "visible pointer-events-auto translate-y-0 opacity-100"
                  : "invisible pointer-events-none opacity-0"
              )}
            >
              <div className="space-y-1">
                {data.products.slice(0, 6).map((item) => (
                  <Link
                    key={item.id}
                    to="/products/$slug"
                    params={{ slug: item.slug }}
                    onClick={closeDropdown}
                    className="group/prod flex items-center justify-between rounded-xl p-2.5 transition-colors hover:bg-secondary/80"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Boxes className="size-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-foreground group-hover/prod:text-primary">
                          {item.title.split(" | ")[0]}
                        </p>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {item.shortDescription}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 border-t border-border/60 pt-3 text-xs flex justify-between items-center">
                <span className="text-muted-foreground">Enterprise Backup Software Suite</span>
                <Link to="/products" onClick={closeDropdown} className="font-bold text-primary hover:underline">
                  All Products →
                </Link>
              </div>
            </div>
          </div>

          {/* 3. FEATURES MEGA MENU */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("features")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/features"
              onClick={closeDropdown}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-[13px] xl:text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
            >
              <span>Features</span>
              <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-200", activeDropdown === "features" && "rotate-180")} />
            </Link>

            <div
              className={cn(
                "absolute left-1/2 top-full w-[940px] -translate-x-1/2 translate-y-2 rounded-2xl border border-border/80 bg-popover/98 p-6 shadow-2xl backdrop-blur-2xl transition-all duration-200 dark:border-white/15 dark:bg-slate-950/95",
                activeDropdown === "features"
                  ? "visible pointer-events-auto translate-y-0 opacity-100"
                  : "invisible pointer-events-none opacity-0"
              )}
            >
              <div className="grid grid-cols-4 gap-5">
                {/* Col 1: New */}
                <div>
                  <h4 className="mb-3 flex items-center justify-between font-display text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 border-b border-border/60 pb-2">
                    <span>New Features</span>
                  </h4>
                  <ul className="space-y-1 text-xs">
                    {featuresByCat.newFeatures.map((item) => (
                      <li key={item.id}>
                        <Link
                          to="/features/$slug"
                          params={{ slug: item.slug }}
                          onClick={closeDropdown}
                          className="group/link flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium text-popover-foreground transition-colors hover:bg-secondary/80 hover:text-primary"
                        >
                          {item.starred && (
                            <Star className="size-3 fill-amber-500 text-amber-500 shrink-0" />
                          )}
                          <span className={item.starred ? "font-bold text-foreground" : "text-muted-foreground group-hover/link:text-foreground"}>
                            {item.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 2: Highlights */}
                <div>
                  <h4 className="mb-3 flex items-center justify-between font-display text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 border-b border-border/60 pb-2">
                    <span>Highlights</span>
                  </h4>
                  <ul className="space-y-1 text-xs">
                    {featuresByCat.highlights.slice(0, 10).map((item) => (
                      <li key={item.id}>
                        <Link
                          to="/features/$slug"
                          params={{ slug: item.slug }}
                          onClick={closeDropdown}
                          className="group/link flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
                        >
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 3: General */}
                <div>
                  <h4 className="mb-3 flex items-center justify-between font-display text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 border-b border-border/60 pb-2">
                    <span>General</span>
                  </h4>
                  <ul className="space-y-1 text-xs">
                    {featuresByCat.general.map((item) => (
                      <li key={item.id}>
                        <Link
                          to="/features/$slug"
                          params={{ slug: item.slug }}
                          onClick={closeDropdown}
                          className="group/link flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
                        >
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 4: System Management */}
                <div>
                  <h4 className="mb-3 flex items-center justify-between font-display text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 border-b border-border/60 pb-2">
                    <span>System Management</span>
                  </h4>
                  <ul className="space-y-1 text-xs">
                    {featuresByCat.sysMgmt.slice(0, 10).map((item) => (
                      <li key={item.id}>
                        <Link
                          to="/features/$slug"
                          params={{ slug: item.slug }}
                          onClick={closeDropdown}
                          className="group/link flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
                        >
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                <span className="text-muted-foreground">Automated restore testing and continuous verification built-in.</span>
                <Link
                  to="/features"
                  onClick={closeDropdown}
                  className="font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Explore all 35+ features</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* 4. SERVICES MENU */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/services"
              onClick={closeDropdown}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-[13px] xl:text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
            >
              <span>Services</span>
              <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-200", activeDropdown === "services" && "rotate-180")} />
            </Link>

            <div
              className={cn(
                "absolute left-1/2 top-full w-[440px] -translate-x-1/2 translate-y-2 rounded-2xl border border-border/80 bg-popover/98 p-5 shadow-2xl backdrop-blur-2xl transition-all duration-200 dark:border-white/15 dark:bg-slate-950/95",
                activeDropdown === "services"
                  ? "visible pointer-events-auto translate-y-0 opacity-100"
                  : "invisible pointer-events-none opacity-0"
              )}
            >
              <div className="space-y-1">
                {data.services.map((item) => (
                  <Link
                    key={item.id}
                    to="/services/$slug"
                    params={{ slug: item.slug }}
                    onClick={closeDropdown}
                    className="group/svc flex items-center justify-between rounded-xl p-2.5 transition-colors hover:bg-secondary/80"
                  >
                    <div className="flex items-center gap-2">
                      {item.starred && (
                        <Star className="size-3.5 fill-amber-500 text-amber-500 shrink-0" />
                      )}
                      <span className={`text-xs ${item.starred ? "font-bold text-foreground" : "font-medium text-muted-foreground group-hover/svc:text-foreground"}`}>
                        {item.title.split(" | ")[0]}
                      </span>
                    </div>
                    {item.badge && (
                      <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              <div className="mt-4 border-t border-border/60 pt-3 text-xs flex justify-between items-center">
                <span className="text-muted-foreground">24/7 Managed Operations</span>
                <Link to="/services" onClick={closeDropdown} className="font-bold text-primary hover:underline">
                  All Services →
                </Link>
              </div>
            </div>
          </div>

          {/* 5. PRICING */}
          <Link
            to="/pricing"
            className="rounded-full px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-[13px] xl:text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
          >
            Pricing
          </Link>

          {/* 6. RESOURCES */}
          <Link
            to="/resources"
            className="rounded-full px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-[13px] xl:text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
          >
            Resources
          </Link>

          {/* 7. SUPPORT */}
          <Link
            to="/support"
            className="rounded-full px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-[13px] xl:text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
          >
            Support
          </Link>

          {/* 8. ABOUT MENU */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("about")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/about"
              onClick={closeDropdown}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 xl:px-3.5 xl:py-2 text-[13px] xl:text-sm font-semibold text-foreground/85 transition-colors hover:bg-secondary/60 hover:text-primary"
            >
              <span>About</span>
              <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-200", activeDropdown === "about" && "rotate-180")} />
            </Link>
            <div
              className={cn(
                "absolute right-0 top-full w-64 translate-y-2 rounded-2xl border border-border/80 bg-popover/98 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-200 dark:border-white/15 dark:bg-slate-950/95",
                activeDropdown === "about"
                  ? "visible pointer-events-auto translate-y-0 opacity-100"
                  : "invisible pointer-events-none opacity-0"
              )}
            >
              {[
                ["/about", "Company Overview", Building2],
                ["/company-management", "Company Management", Users],
                ["/video-gallery", "Video Gallery", Video],
                ["/testimonials", "Customer Stories", Star],
              ].map(([to, label, Icon]: any) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeDropdown}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Icon className="size-4 text-primary shrink-0" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* ======================================================== */}
        {/* RIGHT CTA GROUP                                          */}
        {/* ======================================================== */}
        <div className="hidden items-center gap-2.5 lg:flex shrink-0">
          <Link
            to="/products"
            className="hidden xl:flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
          >
            <Search className="size-3.5" />
            <span>Search workloads...</span>
          </Link>

          <ThemeToggle />

          <Button asChild variant="orange" size="lg" className="shadow-amber-glow font-bold">
            <Link to="/free-trial">
              <span>Free Trial</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* ======================================================== */}
        {/* MOBILE NAVIGATION DRAWER                                */}
        {/* ======================================================== */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="glass" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm border-border bg-background p-0 flex flex-col h-full overflow-hidden">
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-border/80 p-4">
                <Logo
                  logoUrl={data.settings.brandLogo}
                  brandName={data.settings.brandName || data.settings.companyName}
                  brandSubtitle={data.settings.brandSubtitle || "DATA PRIVATE LIMITED"}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </Button>
              </div>

              {/* Drawer Search */}
              <div className="p-4 border-b border-border/60">
                <Link
                  to="/products"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-secondary/50 px-3.5 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40"
                >
                  <Search className="size-4 text-primary" />
                  <span>Search workloads, databases, SaaS...</span>
                </Link>
              </div>

              {/* Drawer Scrollable Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1 text-sm font-semibold">
                {/* 1. SOLUTIONS (Collapsible) */}
                <div className="rounded-xl border border-border/60 overflow-hidden bg-card/40">
                  <div className="flex items-center justify-between px-3.5 py-2.5">
                    <Link
                      to="/solutions"
                      onClick={() => setOpen(false)}
                      className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Cloud className="size-4 text-primary" />
                      <span>Solutions</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobile("solutions")}
                      className="p-1 rounded-lg hover:bg-secondary text-muted-foreground"
                      aria-label="Toggle solutions"
                    >
                      <ChevronDown className={cn("size-4 transition-transform duration-200", mobileExpanded === "solutions" && "rotate-180")} />
                    </button>
                  </div>
                  {mobileExpanded === "solutions" && (
                    <div className="border-t border-border/60 bg-secondary/30 px-3 py-2 space-y-1 text-xs">
                      <Link
                        to="/solutions"
                        onClick={() => setOpen(false)}
                        className="block py-1.5 px-2 font-bold text-primary hover:underline"
                      >
                        All Solutions Overview →
                      </Link>
                      {data.solutions.slice(0, 6).map((item) => (
                        <Link
                          key={item.id}
                          to="/solutions/$slug"
                          params={{ slug: item.slug }}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 px-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md"
                        >
                          {item.title.split(" | ")[0]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. PRODUCTS (Collapsible) */}
                <div className="rounded-xl border border-border/60 overflow-hidden bg-card/40">
                  <div className="flex items-center justify-between px-3.5 py-2.5">
                    <Link
                      to="/products"
                      onClick={() => setOpen(false)}
                      className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Boxes className="size-4 text-primary" />
                      <span>Products</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobile("products")}
                      className="p-1 rounded-lg hover:bg-secondary text-muted-foreground"
                      aria-label="Toggle products"
                    >
                      <ChevronDown className={cn("size-4 transition-transform duration-200", mobileExpanded === "products" && "rotate-180")} />
                    </button>
                  </div>
                  {mobileExpanded === "products" && (
                    <div className="border-t border-border/60 bg-secondary/30 px-3 py-2 space-y-1 text-xs">
                      <Link
                        to="/products"
                        onClick={() => setOpen(false)}
                        className="block py-1.5 px-2 font-bold text-primary hover:underline"
                      >
                        All Products Suite →
                      </Link>
                      {data.products.slice(0, 6).map((item) => (
                        <Link
                          key={item.id}
                          to="/products/$slug"
                          params={{ slug: item.slug }}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 px-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md"
                        >
                          {item.title.split(" | ")[0]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. FEATURES */}
                <Link
                  to="/features"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-foreground hover:bg-secondary transition-colors"
                >
                  <span className="flex items-center gap-2 font-bold">
                    <Sparkles className="size-4 text-primary" />
                    <span>Features</span>
                  </span>
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    35+ Capabilities
                  </span>
                </Link>

                {/* 4. SERVICES (Collapsible) */}
                <div className="rounded-xl border border-border/60 overflow-hidden bg-card/40">
                  <div className="flex items-center justify-between px-3.5 py-2.5">
                    <Link
                      to="/services"
                      onClick={() => setOpen(false)}
                      className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Server className="size-4 text-primary" />
                      <span>Services</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobile("services")}
                      className="p-1 rounded-lg hover:bg-secondary text-muted-foreground"
                      aria-label="Toggle services"
                    >
                      <ChevronDown className={cn("size-4 transition-transform duration-200", mobileExpanded === "services" && "rotate-180")} />
                    </button>
                  </div>
                  {mobileExpanded === "services" && (
                    <div className="border-t border-border/60 bg-secondary/30 px-3 py-2 space-y-1 text-xs">
                      <Link
                        to="/services"
                        onClick={() => setOpen(false)}
                        className="block py-1.5 px-2 font-bold text-primary hover:underline"
                      >
                        All Managed Services →
                      </Link>
                      {data.services.slice(0, 6).map((item) => (
                        <Link
                          key={item.id}
                          to="/services/$slug"
                          params={{ slug: item.slug }}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 px-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md"
                        >
                          {item.title.split(" | ")[0]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. PRICING */}
                <Link
                  to="/pricing"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-bold text-foreground hover:bg-secondary transition-colors"
                >
                  <ShieldCheck className="size-4 text-primary" />
                  <span>Pricing</span>
                </Link>

                {/* 6. RESOURCES */}
                <Link
                  to="/resources"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-bold text-foreground hover:bg-secondary transition-colors"
                >
                  <FileText className="size-4 text-primary" />
                  <span>Resources & Knowledge</span>
                </Link>

                {/* 7. SUPPORT */}
                <Link
                  to="/support"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-bold text-foreground hover:bg-secondary transition-colors"
                >
                  <LifeBuoy className="size-4 text-primary" />
                  <span>24/7 Support</span>
                </Link>

                {/* 8. ABOUT (Collapsible) */}
                <div className="rounded-xl border border-border/60 overflow-hidden bg-card/40">
                  <div className="flex items-center justify-between px-3.5 py-2.5">
                    <Link
                      to="/about"
                      onClick={() => setOpen(false)}
                      className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <Building2 className="size-4 text-primary" />
                      <span>About Company</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobile("about")}
                      className="p-1 rounded-lg hover:bg-secondary text-muted-foreground"
                      aria-label="Toggle about"
                    >
                      <ChevronDown className={cn("size-4 transition-transform duration-200", mobileExpanded === "about" && "rotate-180")} />
                    </button>
                  </div>
                  {mobileExpanded === "about" && (
                    <div className="border-t border-border/60 bg-secondary/30 px-3 py-2 space-y-1 text-xs">
                      <Link
                        to="/about"
                        onClick={() => setOpen(false)}
                        className="block py-1.5 px-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md"
                      >
                        Company Overview
                      </Link>
                      <Link
                        to="/company-management"
                        onClick={() => setOpen(false)}
                        className="block py-1.5 px-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md"
                      >
                        Company Management
                      </Link>
                      <Link
                        to="/video-gallery"
                        onClick={() => setOpen(false)}
                        className="block py-1.5 px-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md"
                      >
                        Video Gallery
                      </Link>
                      <Link
                        to="/testimonials"
                        onClick={() => setOpen(false)}
                        className="block py-1.5 px-2 text-muted-foreground hover:text-foreground hover:bg-secondary/60 rounded-md"
                      >
                        Customer Testimonials
                      </Link>
                    </div>
                  )}
                </div>
              </nav>

              {/* Drawer Footer CTA */}
              <div className="p-4 border-t border-border/80 bg-card/60">
                <Button
                  asChild
                  variant="orange"
                  size="lg"
                  className="w-full shadow-amber-glow font-bold"
                >
                  <Link to="/free-trial" onClick={() => setOpen(false)}>
                    <span>Start 14-Day Free Trial</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                  <CheckCircle2 className="size-3 text-emerald-500" />
                  <span>SOC-2 & AES-256 Compliant</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
