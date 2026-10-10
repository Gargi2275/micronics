import { createFileRoute } from "@tanstack/react-router";
import { PricingPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/pricing")({
  head: () => seo({ title: "Pricing | Micronics Devlon", description: "Compare Micronics Devlon backup plans and request a quote for tailored data protection.", image: imageBank.ops }),
  component: PricingPage,
});
