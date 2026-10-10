import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/contact")({
  head: () => seo({ title: "Contact | Micronics Devlon", description: "Contact Micronics Devlon for backup software demos, quotes and data-protection planning.", image: imageBank.ops }),
  component: ContactPage,
});
