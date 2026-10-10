import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/ListPages";
import { getAppData } from "@/services/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const item = getAppData().posts.find((post) => post.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => seo({ title: loaderData?.seoTitle ?? "Resource | Micronics Devlon", description: loaderData?.seoDescription ?? "Micronics Devlon resource.", image: loaderData?.image }),
  component: ResourceDetailRoute,
});

function ResourceDetailRoute() {
  const item = Route.useLoaderData();
  return <DetailPage item={item} section="resources" parentPath="/resources" />;
}
