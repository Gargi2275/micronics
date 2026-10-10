import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  X,
  ArrowRight,
  Sparkles,
  Cloud,
  Boxes,
  Database,
  HardDrive,
  ShieldCheck,
  Server,
  FileCheck,
  Laptop,
  CheckCircle2,
} from "lucide-react";
import { useAppData } from "@/lib/useAppData";

const quickChips = [
  { label: "Microsoft 365", category: "SaaS", path: "/backup/microsoft-365" },
  { label: "VMware vSphere", category: "Virtualization", path: "/backup/vmware" },
  { label: "PostgreSQL", category: "Databases", path: "/backup/postgresql" },
  { label: "Ransomware Vault", category: "Security", path: "/solutions/ransomware-protection" },
  { label: "Synology NAS", category: "Storage", path: "/backup/synology-nas" },
  { label: "Google Workspace", category: "SaaS", path: "/backup/google-workspace" },
  { label: "Microsoft SQL Server", category: "Databases", path: "/backup/sql-server" },
];

export function UniversalSearch({ className }: { className?: string }) {
  const data = useAppData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter search results dynamically
  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase().trim();

    const matchedPlatforms = data.platforms
      .filter((p) => (category === "all" || p.category.toLowerCase().includes(category)) && (p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)))
      .slice(0, 4)
      .map((item) => ({ ...item, type: "Workload", url: `/backup/${item.slug}` }));

    const matchedProducts = data.products
      .filter((p) => p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q))
      .slice(0, 3)
      .map((item) => ({ ...item, type: "Software Module", url: `/products/${item.slug}` }));

    const matchedServices = data.services
      .filter((s) => s.title.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q))
      .slice(0, 3)
      .map((item) => ({ ...item, type: "Service", url: `/services/${item.slug}` }));

    const matchedSolutions = data.solutions
      .filter((s) => s.title.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q))
      .slice(0, 2)
      .map((item) => ({ ...item, type: "Solution", url: `/solutions/${item.slug}` }));

    return [...matchedPlatforms, ...matchedProducts, ...matchedServices, ...matchedSolutions];
  }, [query, category, data]);

  return (
    <div ref={containerRef} className={`relative mx-auto w-full max-w-3xl text-center ${className ?? ""}`}>
      {/* Search Input Box */}
      <div className="relative flex flex-col sm:flex-row items-stretch rounded-2xl border-2 border-border/80 bg-card/95 p-2 shadow-elevated backdrop-blur-2xl transition-all duration-300 focus-within:border-primary focus-within:shadow-[0_0_35px_rgba(59,130,246,0.2)] dark:border-white/20 dark:bg-slate-950/85 dark:focus-within:border-blue-500/60">
        {/* Category Selector */}
        <div className="flex items-center justify-center gap-1.5 border-b sm:w-[170px] sm:shrink-0 sm:border-b-0 sm:border-r border-border/60 px-3 py-2 text-center text-xs font-semibold text-muted-foreground dark:border-white/10 dark:text-slate-300">
          <span className="text-muted-foreground">Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="cursor-pointer bg-transparent font-bold text-primary dark:text-blue-400 focus:outline-none"
          >
            <option value="all" className="bg-popover text-popover-foreground dark:bg-slate-900 dark:text-slate-200">All Workloads</option>
            <option value="saas" className="bg-popover text-popover-foreground dark:bg-slate-900 dark:text-slate-200">SaaS & Cloud</option>
            <option value="virtualization" className="bg-popover text-popover-foreground dark:bg-slate-900 dark:text-slate-200">Virtualization</option>
            <option value="database" className="bg-popover text-popover-foreground dark:bg-slate-900 dark:text-slate-200">Databases</option>
            <option value="nas" className="bg-popover text-popover-foreground dark:bg-slate-900 dark:text-slate-200">NAS & Systems</option>
          </select>
        </div>

        {/* Input Field */}
        <div className="relative flex flex-1 items-center px-3 py-1.5">
          <Search className="size-4 text-muted-foreground dark:text-slate-400 shrink-0 mr-2.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsFocused(true);
            }}
            onFocus={() => setIsFocused(true)}
            placeholder="Search workloads, databases, SaaS, or recovery options..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none dark:text-white dark:placeholder:text-slate-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIsFocused(false);
              }}
              className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Search CTA Button */}
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 px-6 py-3 sm:py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:brightness-110 active:scale-95 transition-all mt-2 sm:mt-0"
        >
          <span>Find Protection</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Live Search Results Dropdown */}
      {isFocused && results && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-border bg-popover/98 p-3 shadow-2xl backdrop-blur-2xl dark:border-white/15 dark:bg-slate-950/95">
          <div className="mb-2 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground dark:text-slate-400 flex items-center justify-between">
            <span>Matching Protection Modules ({results.length})</span>
            <span className="text-emerald-600 dark:text-emerald-400">Instant Restore Ready</span>
          </div>
          <div className="space-y-1">
            {results.map((item, idx) => (
              <Link
                key={idx}
                to={item.url as any}
                onClick={() => setIsFocused(false)}
                className="group flex items-center justify-between rounded-xl p-3 text-left transition-colors hover:bg-secondary/70 dark:hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-blue-500/15 dark:text-blue-400 group-hover:scale-105 transition-transform">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <span className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors dark:text-white dark:group-hover:text-blue-400">
                      {item.title}
                    </span>
                    <span className="block text-xs text-muted-foreground dark:text-slate-400 line-clamp-1">
                      {item.shortDescription}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-mono font-medium text-muted-foreground dark:bg-white/10 dark:text-slate-300">
                    {item.type}
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all dark:text-slate-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick Search Recommendation Chips */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-muted-foreground dark:text-slate-400 font-semibold flex items-center gap-1">
          <Sparkles className="size-3 text-amber-500" /> Popular searches:
        </span>
        {quickChips.map((chip) => (
          <Link
            key={chip.label}
            to={chip.path as any}
            className="rounded-full border border-border/80 bg-card/80 px-3 py-1 font-medium text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-card hover:text-foreground shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/15 dark:hover:text-white"
          >
            {chip.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
