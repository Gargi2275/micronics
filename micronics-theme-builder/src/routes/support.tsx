import { createFileRoute } from "@tanstack/react-router";
import { SupportPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/support")({
  head: () => seo({ title: "Support | Micronics Devlon", description: "Get support for backup operations, recovery workflows and Micronics Devlon protected environments.", image: imageBank.team }),
  component: SupportPage,
});
