import { createFileRoute } from "@tanstack/react-router";
import { ProductsPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/products/")({
  head: () =>
    seo({
      title: "Backup Products | Micronics Devlon",
      description:
        "Explore Micronics Devlon backup products for servers, workstations, SaaS, virtual machines, databases, NAS and mobile devices.",
      image: imageBank.servers,
    }),
  component: ProductsPage,
});
