import { createFileRoute } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/content")({
  validateSearch: (search: Record<string, unknown>) => ({
    tab: (search["tab"] as any) || "solutions",
  }),
  head: () =>
    seo({
      title: "Content Admin | Micronics Devlon",
      description:
        "Manage products, services, solutions, features, platforms, pricing, FAQs, testimonials and articles dynamically.",
    }),
  component: ContentAdminRoute,
});

function ContentAdminRoute() {
  const search = Route.useSearch();
  return (
    <AdminGuard>
      <AdminShell
        title="Content Management Console"
        description="Add, edit, filter, and delete catalog data plus the managed Company, Company Management, Video Gallery, and Testimonials pages."
      >
        <ContentManager key={search.tab} defaultType={search.tab} />
      </AdminShell>
    </AdminGuard>
  );
}
