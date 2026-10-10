import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaManager } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/media")({
  head: () => seo({ title: "Media Library Admin | Micronics Devlon", description: "Local preview media library for Micronics Devlon admin." }),
  component: () => <AdminGuard><AdminShell title="Media library" description="Upload preview images, copy object URLs and delete local media."><MediaManager /></AdminShell></AdminGuard>,
});
