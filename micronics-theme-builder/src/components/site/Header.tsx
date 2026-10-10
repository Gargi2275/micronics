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
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const data = useAppData();

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
  }, [pathname]);

  const closeDropdown = () => setActiveDropdown(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Grouped Solutions (Matches Reference Image 1)
  const solutionsByCat = {
    cloud: data.solutions.filter((s) => s.category === "Cloud Applications Backup"),
    onsite: data.solutions.filter((s) => s.category === "Onsite Systems Backup"),
    personal: data.solutions.filter((s) => s.category === "Personal Backup (FREE)"),
  };

  // Grouped Features (Matches Reference Image 2)
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
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo
          logoUrl={data.settings.brandLogo}
          logoSize={data.settings.brandLogoSize}
          brandName={data.settings.brandName || data.settings.companyName}
          brandSubtitle={data.settings.brandSubtitle || "Data Protection"}
        />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {/* 1. SOLUTIONS MEGA MENU */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("solutions")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/solutions"
              onClick={closeDropdown}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
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
                            {item.title}
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
                    {solutionsByCat.onsite.slice(0, 14).map((item) => (
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
                            {item.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 3: Personal Backup (FREE) & Quick Highlights */}
                <div>
                  <h4 className="mb-3 flex items-center justify-between font-display text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400 border-b border-border/60 pb-2">
                    <span>Personal Backup (FREE)</span>
                  </h4>
                  <ul className="space-y-1 text-xs mb-6">
                    {solutionsByCat.personal.map((item) => (
                      <li key={item.id}>
                        <Link
                          to="/solutions/$slug"
                          params={{ slug: item.slug }}
                          onClick={closeDropdown}
                          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
                        >
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Highlight Box */}
                  <div className="rounded-xl border border-accent/20 bg-accent/5 p-3.5 text-xs">
                    <span className="flex items-center gap-1 font-bold text-accent uppercase tracking-wider text-[10px]">
                      <Sparkles className="size-3" /> Universal Compatibility
                    </span>
                    <p className="mt-1.5 text-muted-foreground leading-relaxed">
                      Deploy on physical, virtual, or cloud environments with zero-friction RTO.
                    </p>
                    <Link
                      to="/free-trial"
                      onClick={closeDropdown}
                      className="mt-2 inline-flex items-center gap-1 font-bold text-accent hover:underline text-[11px]"
                    >
                      <span>Start 14-Day Free Trial</span>
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3 text-xs">
                <span className="text-muted-foreground">Looking for a custom enterprise setup?</span>
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

          {/* 2. FEATURES MEGA MENU */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("features")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/features"
              onClick={closeDropdown}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
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

          {/* 3. SERVICES MENU */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/services"
              onClick={closeDropdown}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
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
                        {item.title}
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

          <Link
            to="/pricing"
            className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
          >
            Pricing
          </Link>
          <Link
            to="/support"
            className="rounded-full px-4 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:text-primary hover:bg-secondary/60"
          >
            Support
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("about")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/about"
              onClick={closeDropdown}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-foreground/85 transition-colors hover:bg-secondary/60 hover:text-primary"
            >
              <span>About</span>
              <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-200", activeDropdown === "about" && "rotate-180")} />
            </Link>
            <div
              className={cn(
                "absolute right-0 top-full w-64 translate-y-2 rounded-2xl border border-border/80 bg-popover/98 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-200 dark:border-white/15 dark:bg-slate-950/95",
                activeDropdown === "about"
                  ? "visible pointer-events-auto translate-y-0 opacity-100"
                  : "invisible pointer-events-none opacity-0",
              )}
            >
              {[
                ["/about", "Company"],
                ["/company-management", "Company Management"],
                ["/video-gallery", "Video Gallery"],
                ["/testimonials", "Testimonials"],
              ].map(([to, label]) => (
                <Link
                  key={to}
                  to={to as any}
                  onClick={closeDropdown}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right CTA Group */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/products"
            className="flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground"
          >
            <Search className="size-3.5" />
            <span>Search workloads...</span>
          </Link>

          <ThemeToggle />

          <Button asChild variant="orange" size="lg" className="shadow-amber-glow">
            <Link to="/free-trial">
              <span>Free Trial</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Nav Drawer */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="glass" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm border-border bg-background p-0 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-border p-5">
                <Logo
                  logoUrl={data.settings.brandLogo}
                  logoSize={data.settings.brandLogoSize}
                  brandName={data.settings.brandName || data.settings.companyName}
                  brandSubtitle={data.settings.brandSubtitle || "Data Protection"}
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
              <nav className="grid gap-1 p-5">
                {[
                  { label: "Solutions", to: "/solutions" as const },
                  { label: "Features", to: "/features" as const },
                  { label: "Services", to: "/services" as const },
                  { label: "Products", to: "/products" as const },
                  { label: "Pricing", to: "/pricing" as const },
                  { label: "Support", to: "/support" as const },
                  { label: "Resources", to: "/resources" as const },
                  { label: "Company", to: "/about" as const },
                  { label: "Company Management", to: "/company-management" as const },
                  { label: "Video Gallery", to: "/video-gallery" as const },
                  { label: "Testimonials", to: "/testimonials" as const },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-bold text-foreground hover:bg-secondary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button
                  asChild
                  variant="orange"
                  size="lg"
                  className="mt-4 w-full shadow-amber-glow"
                >
                  <Link to="/free-trial" onClick={() => setOpen(false)}>
                    <span>Start Free Trial</span>
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
