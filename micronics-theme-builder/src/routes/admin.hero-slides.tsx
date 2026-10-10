import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/hero-slides")({
  head: () => seo({ title: "Hero Slides Admin | Micronics Devlon", description: "Manage homepage hero slides dynamically for Micronics Devlon." }),
  component: () => <AdminGuard><AdminShell title="Hero slides" description="Edit slide images, headlines, CTAs, order and status."><ContentManager defaultType="heroSlides" /></AdminShell></AdminGuard>,
});
