import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager } from "@/components/admin/AdminTables";
import { seo } from "@/lib/seo";
import { Building2, GalleryHorizontalEnd, MessageSquareQuote, UsersRound } from "lucide-react";

export const Route = createFileRoute("/admin/about-pages")({
  head: () =>
    seo({
      title: "About Pages Admin | Micronics Devlon",
      description: "Manage Company, Company Management, Video Gallery, and Testimonials pages.",
    }),
  component: AboutPagesAdminRoute,
});

function AboutPagesAdminRoute() {
  const pages = [
    {
      title: "Company",
      description: "Edit the main About page company story and content.",
      publicPath: "/about",
      category: "Company",
      icon: Building2,
    },
    {
      title: "Company Management",
      description: "Manage leadership and company management information.",
      publicPath: "/company-management",
      category: "Company Management",
      icon: UsersRound,
    },
    {
      title: "Video Gallery",
      description: "Add YouTube links or upload videos with previews.",
      publicPath: "/video-gallery",
      category: "Video Gallery",
      icon: GalleryHorizontalEnd,
    },
    {
      title: "Testimonials",
      description: "Add customer quotes, images, and optional videos.",
      publicPath: "/testimonials",
      category: "Testimonials",
      icon: MessageSquareQuote,
    },
  ] as const;

  return (
    <AdminGuard>
      <AdminShell
        title="About Pages"
        description="Manage the four pages shown under the About menu. Choose a page type, then add or edit its published content."
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <div key={page.title} className="rounded-2xl border border-border/80 bg-card p-4 shadow-card">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <h2 className="font-display text-sm font-bold text-foreground">{page.title}</h2>
                </div>
                <p className="min-h-10 text-xs leading-5 text-muted-foreground">{page.description}</p>
                <Link
                  to={page.publicPath as any}
                  target="_blank"
                  className="mt-3 inline-flex text-xs font-bold text-primary hover:underline"
                >
                  View public page →
                </Link>
              </div>
            );
          })}
        </div>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">How page assignment works:</strong>{" "}
          Company, Company Management, and Video Gallery use Resources & Articles with the matching category. Testimonials use the Testimonials tab.
          Use the matching category button below for the first three pages, or select Testimonials to manage customer reviews.
        </div>
        <ContentManager
          allowedTypes={["posts", "testimonials"]}
          allowedCategories={["Company", "Company Management", "Video Gallery"]}
          readOnlyTypes={["posts"]}
          defaultType="posts"
        />
      </AdminShell>
    </AdminGuard>
  );
}
