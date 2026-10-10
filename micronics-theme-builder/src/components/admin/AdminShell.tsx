import { useMemo, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronLeft,
  Database,
  ExternalLink,
  FileText,
  Building2,
  GalleryHorizontalEnd,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Layers,
  Zap,
  Boxes,
  HelpCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/site/Logo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { logout, getAppData, fetchFromBackend } from "@/services/content";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, badge: null },
  { label: "Solutions", to: "/admin/content", icon: Layers, query: "solutions", badge: "30+" },
  { label: "Features", to: "/admin/content", icon: Zap, query: "features", badge: "35+" },
  { label: "Services", to: "/admin/content", icon: ShieldCheck, query: "services", badge: "10" },
  { label: "Products", to: "/admin/content", icon: Boxes, query: "products", badge: "7" },
  { label: "All Content", to: "/admin/content", icon: FileText, badge: null },
  { label: "Blogs", to: "/admin/content", icon: FileText, query: "blogs", badge: null },
  { label: "About Pages", to: "/admin/about-pages", icon: Building2, badge: "4" },
  { label: "Hero Slides", to: "/admin/hero-slides", icon: GalleryHorizontalEnd, badge: null },
  { label: "Leads & Inquiries", to: "/admin/leads", icon: Database, badge: "New" },
  { label: "Media Library", to: "/admin/media", icon: GalleryHorizontalEnd, badge: null },
  { label: "Users & Roles", to: "/admin/users", icon: Users, badge: null },
  { label: "Settings", to: "/admin/settings", icon: Settings, badge: null },
  { label: "Activity Log", to: "/admin/activity", icon: ShieldCheck, badge: null },
] as const;

export function AdminShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();
  const data = getAppData();

  const crumbs = useMemo(
    () => pathname.split("/").filter(Boolean).map((part) => part.replace(/-/g, " ")),
    [pathname]
  );

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin/login", replace: true });
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between">
      <div className="p-3 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-admin-sidebar-foreground/50">
          {!collapsed && "Management Console"}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.to &&
            (!("query" in item) || window.location.search.includes(item.query ?? ""));

          const content = (
            <>
              <div className="flex items-center gap-3">
                <Icon className="size-4 shrink-0 transition-transform group-hover:scale-110" />
                {!collapsed && <span>{item.label}</span>}
              </div>
              {!collapsed && item.badge && (
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold",
                    item.badge === "New"
                      ? "bg-accent text-accent-foreground"
                      : "bg-white/10 text-admin-sidebar-foreground/80"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </>
          );

          const className = cn(
            "group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold text-admin-sidebar-foreground/75 transition-all hover:bg-primary/20 hover:text-primary",
            isActive && "bg-primary text-admin-sidebar-foreground font-bold shadow-sm"
          );

          if ("query" in item && item.query) {
            return (
              <Link
                key={item.label}
                to={item.to as any}
                search={{ tab: item.query } as any}
                className={className}
              >
                {content}
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.to as any}
              className={className}
            >
              {content}
            </Link>
          );
        })}
      </div>

      {/* User Info & Live Site Button */}
      <div className="border-t border-white/10 p-3 space-y-2">
        <Button
          asChild
          variant="glass"
          size="sm"
          className="w-full justify-start text-xs font-semibold text-admin-sidebar-foreground/80 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
        >
          <Link to="/" target="_blank">
            <ExternalLink className="size-3.5 mr-2 shrink-0" />
            {!collapsed && <span>View Live Site</span>}
          </Link>
        </Button>

        <div className="flex items-center justify-between rounded-xl bg-white/5 p-2 text-xs">
          {!collapsed && (
            <div className="min-w-0 pr-2">
              <span className="block truncate font-bold text-admin-sidebar-foreground">
                Admin Demo
              </span>
              <span className="block truncate text-[10px] text-admin-sidebar-foreground/50">
                admin@micronicsdevlon.com
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Sign out"
            className="size-8 text-admin-sidebar-foreground hover:bg-destructive/20 hover:text-destructive shrink-0"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Sticky Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 hidden flex-col border-r border-border/80 bg-admin-sidebar text-admin-sidebar-foreground shadow-2xl transition-all lg:flex",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex h-16 min-w-0 items-center gap-2 overflow-hidden border-b border-white/10 px-3 sm:px-4">
          <Logo
            compact={collapsed}
            to="/admin"
            logoUrl={data.settings.brandLogo}
            logoSize={32}
            brandName={data.settings.brandName || data.settings.companyName}
            brandSubtitle={data.settings.brandSubtitle || "Data Protection"}
            className="min-w-0 flex-1 text-primary hover:text-primary"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((v) => !v)}
            className="size-8 shrink-0 text-admin-sidebar-foreground hover:bg-white/10"
          >
            <ChevronLeft
              className={cn("size-4 transition-transform", collapsed && "rotate-180")}
            />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">{navContent}</div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md lg:hidden">
          <div className="h-full w-72 bg-admin-sidebar text-admin-sidebar-foreground shadow-2xl flex flex-col">
            <div className="flex h-16 min-w-0 items-center gap-2 overflow-hidden border-b border-white/10 px-3 sm:px-4">
              <Logo
                to="/admin"
                logoUrl={data.settings.brandLogo}
                logoSize={32}
                brandName={data.settings.brandName || data.settings.companyName}
                brandSubtitle={data.settings.brandSubtitle || "Data Protection"}
                className="min-w-0 flex-1 text-primary hover:text-primary"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                className="size-8 shrink-0 text-admin-sidebar-foreground"
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">{navContent}</div>
          </div>
        </div>
      )}

      {/* Main Content Area - Full Bleed Width */}
      <div
        className={cn(
          "min-w-0 flex-1 transition-all flex flex-col min-h-screen w-full",
          collapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center gap-3">
              <Button
                variant="glass"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="size-5" />
              </Button>
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <span>Admin Console</span>
                <span>/</span>
                <span className="capitalize text-foreground font-bold">
                  {crumbs[crumbs.length - 1] || "Dashboard"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const result = await fetchFromBackend();
                    if (result) {
                      toast.success("Database synchronized successfully!");
                    } else {
                      toast.info("Database cache active");
                    }
                  } catch {
                    toast.error("Failed to sync database");
                  }
                }}
                className="hidden md:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 text-xs text-emerald-400 font-medium transition-colors"
                title="Click to sync latest data from database"
              >
                <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
                <RefreshCw className="size-3" />
                <span>Database Synced</span>
              </button>

              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden sm:inline-flex text-xs font-semibold"
              >
                <Link to="/" target="_blank">
                  <ExternalLink className="size-3.5 mr-1.5" />
                  Live Site
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content Body - Full Width */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                {title}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
