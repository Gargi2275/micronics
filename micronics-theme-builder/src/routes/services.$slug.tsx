import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/ListPages";
import { getAppData } from "@/services/content";
import { seo } from "@/lib/seo";
import { FRONTEND_CONTENT_OVERRIDES } from "@/data/overrides";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const item = getAppData().services.find((service) => service.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData, params }) => {
    const override = params.slug ? FRONTEND_CONTENT_OVERRIDES[params.slug] : undefined;
    return seo({
      title: override?.title ?? loaderData?.seoTitle ?? "Service | Micronics Devlon",
      description: override?.description ?? loaderData?.seoDescription ?? "Micronics Devlon backup service.",
      image: loaderData?.image,
    });
  },
  component: ServiceDetailRoute,
});

function ServiceDetailRoute() {
  const item = Route.useLoaderData();
  return <DetailPage item={item} section="services" parentPath="/services" />;
}
