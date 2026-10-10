import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/ListPages";
import { getAppData } from "@/services/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const item = getAppData().services.find((service) => service.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => seo({ title: loaderData?.seoTitle ?? "Service | Micronics Devlon", description: loaderData?.seoDescription ?? "Micronics Devlon backup service.", image: loaderData?.image }),
  component: ServiceDetailRoute,
});

function ServiceDetailRoute() {
  const item = Route.useLoaderData();
  return <DetailPage item={item} section="services" parentPath="/services" />;
}
