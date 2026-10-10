import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { NewsletterForm } from "@/components/site/forms";
import { useAppData } from "@/lib/useAppData";

export function Footer() {
  const data = useAppData();

  const columns = [
    {
      title: "Solutions",
      items: data.solutions
        .slice(0, 6)
        .map((item) => ({ label: item.title, to: "/solutions/$slug", params: { slug: item.slug } })),
    },
    {
      title: "Features",
      items: data.features
        .slice(0, 6)
        .map((item) => ({ label: item.title, to: "/features/$slug", params: { slug: item.slug } })),
    },
    {
      title: "Services",
      items: data.services
        .slice(0, 6)
        .map((item) => ({ label: item.title, to: "/services/$slug", params: { slug: item.slug } })),
    },
    {
      title: "Products",
      items: data.products
        .slice(0, 6)
        .map((item) => ({ label: item.title, to: "/products/$slug", params: { slug: item.slug } })),
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/80 bg-slate-950 text-slate-200">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-60 w-60 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand & Newsletter Column */}
          <div className="max-w-md">
            <Logo variant="white" />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {data.settings.footerText}
            </p>

            {/* Live Status Indicator */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs text-emerald-300">
              <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="font-semibold">All Protection Vaults Operational (99.999% SLA)</span>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold text-slate-300">
                Subscribe for recovery advisories & security bulletins
              </p>
              <NewsletterForm />
            </div>

            <div className="mt-6 flex items-center gap-4">
              {data.settings.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 transition-colors hover:text-white"
                >
                  {social.label}
                  <ArrowUpRight className="size-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-100">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      {"params" in item && item.params ? (
                        <Link
                          to={item.to as any}
                          params={item.params as any}
                          className="text-xs text-slate-400 transition-colors hover:text-white line-clamp-1"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <Link
                          to={item.to as any}
                          className="text-xs text-slate-400 transition-colors hover:text-white line-clamp-1"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-100">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE WORKLOAD DIRECTORY (Matches Image 4 "bottom linl") */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md">
          <h4 className="mb-4 font-display text-xs font-bold uppercase tracking-wider text-slate-300">
            Workload & Solutions Directory
          </h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-xs text-slate-400 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data.platforms.map((platform) => (
              <Link
                key={platform.id}
                to="/backup/$slug"
                params={{ slug: platform.slug }}
                className="hover:text-blue-400 transition-colors truncate flex items-center gap-1.5"
              >
                <span className="text-slate-600 dark:text-slate-500">•</span>
                <span>{platform.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© Copyright 2015 – {new Date().getFullYear()} | TECHNOADVISER TECHNOLOGIES PRIVATE LIMITED | All Rights Reserved</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">SOC-2 Type II Certified • ISO 27001</span>
            <Link to="/admin" className="text-slate-400 hover:text-amber-400 transition-colors">
              Admin Portal →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
