import { createFileRoute } from "@tanstack/react-router";
import { FreeTrialPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";
import { imageBank } from "@/data/mock";

export const Route = createFileRoute("/free-trial")({
  head: () => seo({ title: "Free Trial | Micronics Devlon", description: "Start a guided Micronics Devlon backup trial for your business-critical workloads.", image: imageBank.dataCenter }),
  component: FreeTrialPage,
});
