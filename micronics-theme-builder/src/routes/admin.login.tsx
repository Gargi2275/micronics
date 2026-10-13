import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/site/Logo";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { login } from "@/services/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/login")({
  head: () =>
    seo({
      title: "Admin Login | Micronics Devlon",
      description: "Admin portal login for Micronics Devlon content management.",
    }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (login(email.trim(), password.trim())) {
        toast.success("Welcome back! Signed in to Admin Console.");
        navigate({ to: "/admin", replace: true });
      } else {
        toast.error("Invalid email or password. Please try again.");
        setIsLoading(false);
      }
    }, 250);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background selection:bg-accent/20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-hero opacity-30 dark:opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md my-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to website
          </Link>
          <ThemeToggle />
        </div>

        {/* Card Container */}
        <div className="rounded-3xl border border-border/80 bg-card/95 text-card-foreground p-7 sm:p-9 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Logo to="/" />
            <div className="flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent border border-accent/20">
              <ShieldCheck className="size-6" />
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Admin Portal
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage website content, leads, media and settings.
            </p>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="h-11 rounded-xl bg-background text-foreground border-border focus-visible:ring-2 focus-visible:ring-primary font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 rounded-xl bg-background text-foreground border-border focus-visible:ring-2 focus-visible:ring-primary font-medium"
              />
            </div>

            <Button
              type="submit"
              variant="orange"
              size="lg"
              disabled={isLoading}
              className="w-full mt-2 h-12 rounded-xl text-base font-bold shadow-lg shadow-accent/20"
            >
              {isLoading ? "Signing in..." : "Sign in to Dashboard"}
            </Button>
          </form>

          {/* Bottom Security Note */}
          <div className="mt-6 pt-5 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3.5 text-success" />
            <span>End-to-end encrypted session</span>
          </div>
        </div>
      </div>
    </div>
  );
}
