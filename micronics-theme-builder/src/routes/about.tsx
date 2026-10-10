import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/about")({
  head: () => seo({ title: "About | Micronics Devlon", description: "Learn about Micronics Devlon's recovery-first approach to backup and data protection.", image: imageBank.team }),
  component: AboutPage,
});
