import { createFileRoute } from "@tanstack/react-router";
import { TestimonialsPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/testimonials")({
  head: () => seo({ title: "Testimonials | Micronics Devlon", description: "Customer stories about measurable backup and recovery operations." }),
  component: TestimonialsPage,
});
