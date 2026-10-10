import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => seo({ title: "Terms of Service | Micronics Devlon", description: "Terms for using the Micronics Devlon frontend demo website." }),
  component: () => <PolicyPage type="terms" />,
});
