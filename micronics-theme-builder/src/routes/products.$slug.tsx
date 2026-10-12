import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/ListPages";
import { getAppData } from "@/services/content";
import { seo } from "@/lib/seo";
import { FRONTEND_CONTENT_OVERRIDES } from "@/data/overrides";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const item = getAppData().products.find((product) => product.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData, params }) => {
    const override = params.slug ? FRONTEND_CONTENT_OVERRIDES[params.slug] : undefined;
    return seo({
      title: override?.title ?? loaderData?.seoTitle ?? "Product | Micronics Devlon",
      description: override?.description ?? loaderData?.seoDescription ?? "Micronics Devlon backup product.",
      image: loaderData?.image,
    });
  },
  component: ProductDetailRoute,
});

function ProductDetailRoute() {
  const item = Route.useLoaderData();
  return <DetailPage item={item} section="products" parentPath="/products" />;
}
