import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ActivityManager } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/activity")({
  head: () => seo({ title: "Activity Log Admin | Micronics Devlon", description: "Local activity log for content and admin demo actions." }),
  component: () => <AdminGuard><AdminShell title="Activity log" description="Track local create, edit, delete and settings activity."><ActivityManager /></AdminShell></AdminGuard>,
});
