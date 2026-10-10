import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/ListPages";
import { getAppData } from "@/services/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const item = getAppData().solutions.find((solution) => solution.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => seo({ title: loaderData?.seoTitle ?? "Solution | Micronics Devlon", description: loaderData?.seoDescription ?? "Micronics Devlon backup solution.", image: loaderData?.image }),
  component: SolutionDetailRoute,
});

function SolutionDetailRoute() {
  const item = Route.useLoaderData();
  return <DetailPage item={item} section="solutions" parentPath="/solutions" />;
}
