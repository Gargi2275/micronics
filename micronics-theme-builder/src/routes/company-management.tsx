import { createFileRoute } from "@tanstack/react-router";
import { CompanyManagementPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/company-management")({
  head: () => seo({ title: "Company Management | Micronics Devlon", description: "Meet the team and operating principles behind Micronics Devlon." }),
  component: CompanyManagementPage,
});
