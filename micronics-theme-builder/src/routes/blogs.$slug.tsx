import { createFileRoute } from "@tanstack/react-router";
import { DetailPage } from "@/components/site/ListPages";
import { fetchFromBackend, getAppData } from "@/services/content";
import { seo } from "@/lib/seo";
import { useAppData } from "@/lib/useAppData";

export const Route = createFileRoute("/blogs/$slug")({
  loader: async ({ params }) => {
    let item = getAppData().blogs.find((blog) => blog.slug === params.slug);

    if (!item) {
      const syncedData = await fetchFromBackend();
      item = syncedData?.blogs.find((blog) => blog.slug === params.slug);
    }

    return item;
  },
  head: ({ loaderData }) =>
    seo({
      title: loaderData?.seoTitle ?? "Blog | Micronics Devlon",
      description: loaderData?.seoDescription ?? "Micronics Devlon blog article.",
      image: loaderData?.image,
    }),
  component: BlogDetailRoute,
});

function BlogDetailRoute() {
  const loadedItem = Route.useLoaderData();
  const { slug } = Route.useParams();
  const data = useAppData();
  const item = loadedItem ?? data.blogs.find((blog) => blog.slug === slug);

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl font-black text-foreground">Blog article not found</h1>
        <p className="mt-3 text-muted-foreground">This article may have been removed or is still syncing.</p>
      </div>
    );
  }

  return <DetailPage item={item} section="blogs" parentPath="/blogs" />;
}
