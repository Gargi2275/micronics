import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo({
      title: "Backup Services | Micronics Devlon",
      description:
        "Managed backup, implementation, key recovery, server upgrades and white-label backup services.",
      image: imageBank.team,
    }),
  component: ServicesPage,
});
