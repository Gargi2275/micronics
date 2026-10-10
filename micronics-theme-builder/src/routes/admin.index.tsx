import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { DashboardView } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/")({
  head: () =>
    seo({
      title: "Admin Dashboard | Micronics Devlon",
      description: "Control center for Micronics Devlon site content, catalog, leads and settings.",
    }),
  component: () => (
    <AdminGuard>
      <AdminShell title="Dashboard" description="Real-time analytics, leads and content orchestration.">
        <DashboardView />
      </AdminShell>
    </AdminGuard>
  ),
});
