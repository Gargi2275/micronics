import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/ListPages";
import { getAppData } from "@/services/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/features/$slug")({
  loader: ({ params }) => {
    const item = getAppData().features.find((feature) => feature.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) =>
    seo({
      title: loaderData?.seoTitle ?? `${loaderData?.title ?? "Feature"} | Micronics Devlon`,
      description: loaderData?.seoDescription ?? loaderData?.shortDescription ?? "Enterprise backup feature capability.",
      image: loaderData?.image,
    }),
  component: FeatureDetailRoute,
});

function FeatureDetailRoute() {
  const item = Route.useLoaderData();
  return <DetailPage item={item} section="features" parentPath="/features" />;
}
