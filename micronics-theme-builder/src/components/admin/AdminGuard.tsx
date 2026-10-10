import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { isLoggedIn } from "@/services/content";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!isLoggedIn()) navigate({ to: "/admin/login", replace: true });
    else setReady(true);
  }, [navigate]);
  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-background p-6">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-card max-w-md w-full">
          <h1 className="font-display text-2xl font-black text-foreground">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage the demo website.</p>
          <Button asChild variant="orange" className="mt-5 w-full">
            <Link to="/admin/login">Go to login</Link>
          </Button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
