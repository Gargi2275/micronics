import { createFileRoute } from "@tanstack/react-router";
import { ResourcesPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/resources/")({
  head: () =>
    seo({
      title: "Resources | Micronics Devlon",
      description:
        "Backup and data-protection resources, checklists and recovery planning guides.",
      image: imageBank.dashboard,
    }),
  component: ResourcesPage,
});
