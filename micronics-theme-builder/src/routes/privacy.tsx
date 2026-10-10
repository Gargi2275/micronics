import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo({ title: "Privacy Policy | Micronics Devlon", description: "Privacy information for the Micronics Devlon frontend demo website." }),
  component: () => <PolicyPage type="privacy" />,
});
