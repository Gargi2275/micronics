import { createFileRoute } from "@tanstack/react-router";
import { SolutionsPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/solutions/")({
  head: () =>
    seo({
      title: "Backup Solutions | Micronics Devlon",
      description:
        "Backup and recovery solutions for small businesses, MSPs, enterprises, SaaS apps, ransomware protection and disaster recovery.",
      image: imageBank.cyber,
    }),
  component: SolutionsPage,
});
