import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { NewsletterForm } from "@/components/site/forms";
import { useAppData } from "@/lib/useAppData";

function formatFooterTitle(title: string): string {
  if (!title) return "";
  const parts = title.split(" | ");
  if (parts.length > 1) {
    const suffix = parts[1].trim();
    if (suffix !== "Micronics Devlon" && suffix.length > 0) {
      return suffix;
    }
    return parts[0].trim();
  }
  return title.trim();
}

export function Footer() {
  const data = useAppData();

  const columns = [
    {
      title: "Solutions",
      items: data.solutions.slice(0, 6).map((item) => ({
        label: formatFooterTitle(item.title),
        to: "/solutions/$slug",
        params: { slug: item.slug },
      })),
    },
    {
      title: "Features",
      items: data.features.slice(0, 6).map((item) => ({
        label: formatFooterTitle(item.title),
        to: "/features/$slug",
        params: { slug: item.slug },
      })),
    },
    {
      title: "Services",
      items: data.services.slice(0, 6).map((item) => ({
        label: formatFooterTitle(item.title),
        to: "/services/$slug",
        params: { slug: item.slug },
      })),
    },
    {
      title: "Products",
      items: data.products.slice(0, 6).map((item) => ({
        label: formatFooterTitle(item.title),
        to: "/products/$slug",
        params: { slug: item.slug },
      })),
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/80 bg-slate-950 text-slate-200">
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl 2xl:max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12 pb-12 pt-16">
        {/* Main Footer Row */}
        <div className="grid gap-12 lg:gap-14 xl:gap-16 lg:grid-cols-[380px_1fr] 2xl:grid-cols-[420px_1fr]">
          {/* Brand & Newsletter Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <Logo variant="white" />
              <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
                {data.settings.footerText ||
                  "Resilient backup operations for modern infrastructure. Protect cloud applications, virtual machines, databases, NAS storage, and endpoints with sub-second restore confidence."}
              </p>

              {/* Live Status Indicator */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-3.5 py-1.5 text-xs text-emerald-300">
                <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="font-semibold">All Protection Vaults Operational (99.999% SLA)</span>
              </div>
            </div>

            <div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-300">
                  Subscribe for recovery advisories & security bulletins
                </p>
                <div className="max-w-sm">
                  <NewsletterForm />
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold">
                {data.settings.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-400 transition-colors hover:text-white"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight className="size-3 text-slate-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links: 5 Balanced Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 xl:gap-8">
            {columns.map((column) => (
              <div key={column.title} className="min-w-0">
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-white/10 pb-2 mb-3">
                  {column.title}
                </h3>
                <ul className="space-y-2.5">
                  {column.items.map((item) => (
                    <li key={item.label} className="min-w-0">
                      {"params" in item && item.params ? (
                        <Link
                          to={item.to as any}
                          params={item.params as any}
                          className="block text-xs text-slate-400 transition-colors hover:text-white line-clamp-2 leading-relaxed"
                          title={item.label}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <Link
                          to={item.to as any}
                          className="block text-xs text-slate-400 transition-colors hover:text-white line-clamp-2 leading-relaxed"
                          title={item.label}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Column 5: Company */}
            <div className="min-w-0">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-100 border-b border-white/10 pb-2 mb-3">
                Company
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link to="/about" className="block hover:text-white transition-colors leading-relaxed">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="block hover:text-white transition-colors leading-relaxed">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="block hover:text-white transition-colors leading-relaxed">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="block hover:text-white transition-colors leading-relaxed">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="block hover:text-white transition-colors leading-relaxed">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comprehensive Workload & Solutions Directory */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/10 pb-3">
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
                Workload & Solutions Directory
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Comprehensive support across multi-cloud environments, enterprise databases, and virtual infrastructure.
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Enterprise Verified
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-400 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data.platforms.map((platform) => (
              <Link
                key={platform.id}
                to="/backup/$slug"
                params={{ slug: platform.slug }}
                className="group flex items-center gap-2 hover:text-orange-400 transition-colors py-0.5 min-w-0"
              >
                <span className="size-1 rounded-full bg-slate-600 transition-colors group-hover:bg-orange-400 shrink-0" />
                <span className="truncate">{platform.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Certification */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © Copyright 2015 – {new Date().getFullYear()} | Micronics Devlon Data Private Limited | All Rights Reserved
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-500">
            <span>SOC-2 Type II Certified</span>
            <span>•</span>
            <span>ISO 27001</span>
            <span>•</span>
            <span>DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
