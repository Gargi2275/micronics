import { createFileRoute } from "@tanstack/react-router";
import { VideoGalleryPage } from "@/components/site/ListPages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/video-gallery")({
  head: () => seo({ title: "Video Gallery | Micronics Devlon", description: "Product walkthroughs and recovery demonstrations from Micronics Devlon." }),
  component: VideoGalleryPage,
});
