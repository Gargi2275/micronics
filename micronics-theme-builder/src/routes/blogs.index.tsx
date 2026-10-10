import { createFileRoute } from "@tanstack/react-router";
import { BlogsPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blogs/")({
  head: () =>
    seo({
      title: "Blogs | Micronics Devlon",
      description: "Practical backup, recovery, security, and resilience guidance from Micronics Devlon.",
    }),
  component: BlogsPage,
});
