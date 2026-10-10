import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { NewsletterManager } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/newsletter")({
  head: () => seo({ title: "Newsletter Admin | Micronics Devlon", description: "Manage live newsletter subscribers for the site." }),
  component: () => <AdminGuard><AdminShell title="Newsletter subscribers" description="View and export newsletter signups saved in the database."><NewsletterManager /></AdminShell></AdminGuard>,
});
