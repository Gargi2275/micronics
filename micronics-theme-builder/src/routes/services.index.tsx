import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo({
      title: "Managed BaaS & Cloud Data Backup Services | Micronics Devlon",
      description:
        "Explore Micronics Devlon's enterprise cloud data backup services. From self-managed cloud vaults to 24/7 Managed Backup-as-a-Service (MBaaS) with guaranteed Recovery SLAs. Secure your Tally and SQL databases with AES-256 encryption.",
      image: imageBank.team,
    }),
  component: ServicesPage,
});
