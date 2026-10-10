import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { UsersManager } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/users")({
  head: () => seo({ title: "Users & Roles Admin | Micronics Devlon", description: "UI-only users and roles management for the Micronics Devlon demo." }),
  component: () => <AdminGuard><AdminShell title="Users and roles" description="Invite, assign and deactivate demo users with local-only persistence."><UsersManager /></AdminShell></AdminGuard>,
});
