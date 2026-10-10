import { createFileRoute } from "@tanstack/react-router";
import { FeaturesPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/features/")({
  head: () =>
    seo({
      title: "Enterprise Backup Features | Micronics Devlon",
      description:
        "Explore over 35+ enterprise backup features: immutable vaults, AI anomaly detection, instant VM boot, deduplication, and automated DR testing.",
    }),
  component: FeaturesPage,
});
