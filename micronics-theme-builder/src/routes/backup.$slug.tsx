import { createFileRoute, notFound } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/ListPages";
import { getAppData } from "@/services/content";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/backup/$slug")({
  loader: ({ params }) => {
    const item = getAppData().platforms.find((platform) => platform.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData }) => seo({ title: loaderData?.seoTitle ?? "Backup Platform | Micronics Devlon", description: loaderData?.seoDescription ?? "Micronics Devlon platform backup.", image: loaderData?.image }),
  component: BackupDetailRoute,
});

function BackupDetailRoute() {
  const item = Route.useLoaderData();
  return <DetailPage item={item} section="backup" parentPath="/features" />;
}
