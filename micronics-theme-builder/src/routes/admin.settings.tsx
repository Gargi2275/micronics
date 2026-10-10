import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { SettingsManager } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/settings")({
  head: () => seo({ title: "Site Settings Admin | Micronics Devlon", description: "Manage site settings and branding for Micronics Devlon." }),
  component: () => <AdminGuard><AdminShell title="Site settings" description="Update brand, contact, footer and theme defaults in real time."><SettingsManager /></AdminShell></AdminGuard>,
});
