import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Headphones, BookOpen, Activity, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/PageHero";
import { ItemGrid, PlatformGrid, PricingCards, QuotePanel, FinalCta } from "@/components/site/ContentBlocks";
import { InteractiveCard } from "@/components/site/InteractiveCard";
import { Section } from "@/components/site/Section";
import { LeadForm, NewsletterForm } from "@/components/site/forms";
import { useAppData } from "@/lib/useAppData";
import { listPublished } from "@/services/content";
import { iconMap, imageBank, initialData, type AppData, type BaseItem, type Blog, type Product, type Service, type Solution, type Platform, type ResourcePost } from "@/data/mock";
import { FRONTEND_CONTENT_OVERRIDES } from "@/data/overrides";
import { cn } from "@/lib/utils";


export function ProductsPage() {
  const data = useAppData();
  return (
    <>
      <PageHero
        title="Backup products for every critical workload"
        eyebrow="Products"
        description="Modular backup software for administrators, MSPs and distributed teams."
        image={imageBank.servers}
        crumbs={[{ label: "Products" }]}
      />
      <Section>
        <ItemGrid items={listPublished(data.products)} basePath="/products" />
      </Section>
      <FinalCta />
    </>
  );
}

export function ServicesPage() {
  const data = useAppData();
  return (
    <>
      <PageHero
        title={
          <>
            Managed BaaS &amp; Cloud Data{" "}
            <span className="gradient-text">Backup Services</span>
            <span className="mt-2.5 block text-lg sm:text-xl font-bold tracking-normal text-muted-foreground/90">
              <span className="text-primary/70 font-light mr-2">|</span>Micronics Devlon
            </span>
          </>
        }
        eyebrow="Services"
        description="Explore Micronics Devlon's enterprise cloud data backup services. From self-managed cloud vaults to 24/7 Managed Backup-as-a-Service (MBaaS) with guaranteed Recovery SLAs. Secure your Tally and SQL databases with AES-256 encryption."
        image={imageBank.team}
        crumbs={[{ label: "Services" }]}
      />
      <Section>
        <ItemGrid items={listPublished(data.services)} basePath="/services" />
      </Section>
      <FinalCta />
    </>
  );
}

export function SolutionsPage() {
  const data = useAppData();
  const [category, setCategory] = useState("All");
  const publishedSolutions = listPublished(data.solutions);
  const categories = ["All", "Cloud Applications Backup", "Onsite Systems Backup", "Personal Backup (FREE)"];

  const filtered =
    category === "All"
      ? publishedSolutions
      : publishedSolutions.filter((item) => item.category === category);

  return (
    <>
      <PageHero
        title="Protection strategies for real operating models"
        eyebrow="Solutions"
        description="Comprehensive backup blueprints for Cloud SaaS, Onsite Hypervisors, Enterprise Databases, and Endpoints."
        image={imageBank.cyber}
        crumbs={[{ label: "Solutions" }]}
      />
      <Section>
        {/* Category Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all",
                category === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border border-border/80 bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <ItemGrid items={filtered} basePath="/solutions" />
      </Section>
      <FinalCta />
    </>
  );
}

export function FeaturesPage() {
  const data = useAppData();
  const [category, setCategory] = useState("All");
  const publishedFeatures = listPublished(data.features);
  const categories = ["All", "New", "Highlights", "General", "System Management"];

  const filtered =
    category === "All"
      ? publishedFeatures
      : publishedFeatures.filter((item) => item.category === category);

  return (
    <>
      <PageHero
        title="Security, automation and restore confidence"
        eyebrow="Features"
        description="Over 35+ enterprise controls, cryptographic immutability, sub-second restore mounting, and multi-tenant management."
        image={imageBank.dashboard}
        crumbs={[{ label: "Features" }]}
      />
      <Section>
        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all",
                category === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border border-border/80 bg-card/80 text-muted-foreground hover:bg-card hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((feature) => {
            const Icon = iconMap[feature.icon] ?? CheckCircle2;
            return (
              <InteractiveCard key={feature.id} className="flex h-full flex-col justify-between p-7">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-indigo-500/10 text-primary border border-primary/20 shadow-sm">
                      <Icon className="size-6" />
                    </div>
                    {feature.starred && (
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <Star className="size-3 fill-amber-500" /> Featured
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-xl font-black tracking-tight text-card-foreground">
                    {feature.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground font-normal line-clamp-3">
                    {feature.body}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs font-semibold">
                  <Button asChild variant="link" className="p-0 h-auto font-bold text-primary">
                    <Link to="/features/$slug" params={{ slug: feature.slug }} className="inline-flex items-center gap-1">
                      <span>Explore feature</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                  <span className="text-muted-foreground font-mono text-[11px]">{feature.category ?? "Enterprise"}</span>
                </div>
              </InteractiveCard>
            );
          })}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}


export function PricingPage() {
  const data = useAppData();
  return (
    <>
      <PageHero
        title="Simple plans with room to tailor"
        eyebrow="Pricing"
        description="Start quickly, then shape retention, storage, tenants and service levels around your environment."
        image={imageBank.ops}
        crumbs={[{ label: "Pricing" }]}
      />
      <Section>
        <PricingCards plans={listPublished(data.pricingPlans)} />
      </Section>
      <Section className="bg-secondary/50" eyebrow="Request a quote" title="Need workload-specific pricing?">
        <QuotePanel />
      </Section>
    </>
  );
}

export function ResourcesPage() {
  const data = useAppData();
  return (
    <>
      <PageHero
        title="Backup and recovery resources"
        eyebrow="Resources"
        description="Guides and practical notes for building a more resilient protection program."
        image={imageBank.dashboard}
        crumbs={[{ label: "Resources" }]}
      />
      <Section>
        <ItemGrid items={listPublished(data.posts)} basePath="/resources" />
      </Section>
      <FinalCta />
    </>
  );
}

export function BlogsPage() {
  const data = useAppData();
  const blogs = listPublished(data.blogs);
  return (
    <>
      <PageHero
        title="Micronics Devlon Blog"
        eyebrow="Blogs"
        description="Practical ideas for backup, recovery readiness, security, and resilient operations."
        image={imageBank.dashboard}
        crumbs={[{ label: "Blogs" }]}
      />
      <Section className="pt-8 sm:pt-12">
        {blogs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
            <h2 className="font-display text-2xl font-black text-foreground">Blogs are coming soon</h2>
            <p className="mt-3 text-sm text-muted-foreground">New recovery and data protection articles will appear here.</p>
          </div>
        )}
      </Section>
      <FinalCta />
    </>
  );
}

function BlogCard({ blog }: { blog: AppData["blogs"][number] }) {
  return (
    <Link to="/blogs/$slug" params={{ slug: blog.slug }} className="block h-full">
    <InteractiveCard className="flex h-full flex-col overflow-hidden p-0" spotlight={false}>
      <div className="aspect-[16/9] w-full overflow-hidden bg-secondary">
        {blog.image ? (
          <img src={blog.image} alt={blog.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-muted-foreground">Micronics Devlon Blog</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">{blog.author || "Micronics Devlon"}</p>
        <h2 className="mt-2 font-display text-xl font-black leading-tight text-foreground">{blog.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{blog.shortDescription || blog.body}</p>
        <span className="mt-auto pt-5 text-sm font-bold text-primary">Read article →</span>
      </div>
    </InteractiveCard>
    </Link>
  );
}

export function SupportPage() {
  const data = useAppData();
  const blogs = listPublished(data.blogs).slice(0, 3);
  return (
    <>
      <PageHero
        title="Support for urgent restore moments"
        eyebrow="Support"
        description="Reach specialists, browse readiness topics or request help with protected environments."
        image={imageBank.team}
        crumbs={[{ label: "Support" }]}
      />
      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          <InteractiveCard className="p-7">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-5">
              <Headphones className="size-6" />
            </div>
            <h2 className="font-display text-2xl font-black text-card-foreground">24/7 Rapid Response</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Priority emergency assistance for active recovery incidents, ransomware triage, and restore validation.
            </p>
          </InteractiveCard>
          <InteractiveCard className="p-7">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-5">
              <BookOpen className="size-6" />
            </div>
            <h2 className="font-display text-2xl font-black text-card-foreground">Knowledge Center</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Technical runbooks for software agents, retention policies, air-gapped repositories, and automated compliance reports.
            </p>
          </InteractiveCard>
          <InteractiveCard className="p-7">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-5">
              <Activity className="size-6" />
            </div>
            <h2 className="font-display text-2xl font-black text-card-foreground">Health Reviews</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Scheduled architecture reviews and simulated disaster recovery exercises to guarantee restore readiness.
            </p>
          </InteractiveCard>
        </div>
      </Section>
      <Section
        className="bg-secondary/30"
        eyebrow="From the blog"
        title="Practical guidance for recovery teams"
        intro="Read the latest articles from Micronics Devlon specialists."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {blogs.length > 0 ? blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          )) : (
            <p className="text-sm text-muted-foreground">Blog articles will be published here soon.</p>
          )}
        </div>
        {blogs.length > 0 && <Link to="/blogs" className="mt-6 inline-flex text-sm font-bold text-primary hover:underline">View all blogs →</Link>}
      </Section>
      <FinalCta />
    </>
  );
}

export function FreeTrialPage() {
  return (
    <>
      <PageHero
        title="Start a guided backup trial"
        eyebrow="Free trial"
        description="Tell us what you want to protect and this demo will store your trial request locally."
        image={imageBank.dataCenter}
        crumbs={[{ label: "Free trial" }]}
      />
      <Section>
        <QuotePanel type="trial" />
      </Section>
    </>
  );
}

export function AboutPage() {
  return <ManagedCompanyPage category="Company" title="A recovery-first company for business data" eyebrow="Company" description="Micronics Devlon helps teams turn backup into a measurable operating discipline." image={imageBank.team} fallback={<AboutFallback />} />;
}

function AboutFallback() {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">Built for the pressure of real incidents.</h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Our software and services are shaped around the moment teams need data back: clear policies, clean reporting, secure storage, and restore paths that have already been battle-tested.
        </p>
      </div>
      <InteractiveCard className="p-7">
        <ul className="grid gap-4">
          {["Recovery planning with verified RTO/RPO targets", "Security-minded backup operations with air-gapped immutability", "Multi-tenant MSP workflows and custom branding", "Straightforward service support from real storage engineers"].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm font-medium text-muted-foreground">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" />
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </InteractiveCard>
    </div>
  );
}

function ManagedCompanyPage({
  category,
  title,
  eyebrow,
  description,
  image,
  fallback,
}: {
  category: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  fallback: React.ReactNode;
}) {
  const data = useAppData();
  const posts = listPublished(data.posts).filter((post) => post.category?.toLowerCase() === category.toLowerCase());
  const content = posts[0];
  const bodySections = (content?.body ?? "").split(/\n\n+/).filter(Boolean);
  const galleryImages = content?.galleryImages ?? [];
  return (
    <>
      <PageHero title={content?.title ?? title} eyebrow={eyebrow} description={content?.shortDescription ?? description} image={content?.image || image} crumbs={[{ label: eyebrow }]} />
      <Section className="pt-8 sm:pt-12">
        {content ? (
          <>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.75fr)] lg:items-start">
              <article className="rounded-3xl border border-border/80 bg-card/70 p-6 shadow-card sm:p-9">
              {content.image && (
                <img
                  src={content.image}
                  alt={content.title}
                  className="mb-7 aspect-[16/7] w-full rounded-2xl object-cover"
                />
              )}
              <div className="mb-7 flex items-center gap-3 border-b border-border/70 pb-5">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Micronics Devlon</p>
                  <p className="text-sm font-semibold text-muted-foreground">Recovery-first operations</p>
                </div>
              </div>
              <div className="space-y-6">
                {bodySections.map((section, index) => (
                  <p
                    key={`${content.id}-section-${index}`}
                    className={cn(
                      "whitespace-pre-line leading-8",
                      index === 0
                        ? "font-display text-2xl font-black tracking-tight text-foreground sm:text-3xl"
                        : "text-base text-muted-foreground sm:text-lg",
                    )}
                  >
                    {section}
                  </p>
                ))}
              </div>
              </article>
              <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["01", "Plan", "Set clear recovery targets and ownership."],
                ["02", "Protect", "Keep critical data secure and available."],
                ["03", "Prove", "Test restore paths before incidents happen."],
              ].map(([number, label, text]) => (
                <InteractiveCard key={number} className="p-5" spotlight={false}>
                  <span className="text-xs font-black tracking-widest text-primary">{number}</span>
                  <h2 className="mt-3 font-display text-lg font-black text-foreground">{label}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </InteractiveCard>
              ))}
              </aside>
            </div>
            {galleryImages.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map((image, index) => (
                  <img
                    key={`${image.slice(0, 24)}-${index}`}
                    src={image}
                    alt={`${content.title} gallery image ${index + 1}`}
                    className="aspect-[4/3] w-full rounded-2xl border border-border/80 object-cover shadow-card"
                  />
                ))}
              </div>
            )}
          </>
        ) : fallback}
      </Section>
      <FinalCta />
    </>
  );
}

export function CompanyManagementPage() {
  return <ManagedCompanyPage category="Company Management" title="Company management" eyebrow="Company Management" description="Meet the operating principles and people behind dependable recovery." image={imageBank.ops} fallback={<AboutFallback />} />;
}

export function VideoGalleryPage() {
  const data = useAppData();
  const videos = listPublished(data.posts).filter((post) => post.category?.toLowerCase() === "video gallery");
  const youtubeId = (url: string) => url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/)?.[1];
  return (
    <>
      <PageHero title="Video Gallery" eyebrow="About" description="Explore product walkthroughs, recovery demonstrations, and operational guidance." image={imageBank.dashboard} crumbs={[{ label: "Video Gallery" }]} />
      <Section
        className="pt-8 sm:pt-12"
        eyebrow="Watch and learn"
        title="Recovery guidance in action"
        intro="Explore practical walkthroughs, restore demonstrations, and operational guidance from Micronics Devlon."
      >
        {videos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <InteractiveCard key={video.id} className="overflow-hidden p-0">
              {video.videoUrl && youtubeId(video.videoUrl) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId(video.videoUrl)}`}
                  title={video.title}
                  className="aspect-video w-full"
                  allowFullScreen
                />
              ) : video.videoUrl ? (
                <video src={video.videoUrl} controls className="aspect-video w-full object-cover" />
              ) : video.image ? (
                <img src={video.image} alt={video.title} className="aspect-video w-full object-cover" />
              ) : null}
              <div className="p-6">
                <h2 className="font-display text-xl font-black text-foreground">{video.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{video.body || video.shortDescription}</p>
                {video.videoUrl && youtubeId(video.videoUrl) && (
                  <a href={video.videoUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-bold text-primary hover:underline">
                    Watch on YouTube →
                  </a>
                )}
              </div>
            </InteractiveCard>
          ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Play className="size-6" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-black text-foreground">Videos are coming soon</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Our team is preparing product tours and recovery demonstrations for this gallery.
            </p>
          </div>
        )}
      </Section>
      <FinalCta />
    </>
  );
}

export function TestimonialsPage() {
  const data = useAppData();
  const testimonials = listPublished(data.testimonials);
  const youtubeId = (url: string) => url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/)?.[1];
  return (
    <>
      <PageHero title="Customer Testimonials" eyebrow="About" description="See how teams build confidence with measurable backup and recovery operations." image={imageBank.team} crumbs={[{ label: "Testimonials" }]} />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <InteractiveCard key={item.id} className="p-7">
              {item.image && <img src={item.image} alt={item.person || item.title} className="mb-5 size-16 rounded-full object-cover" />}
              {item.videoUrl && youtubeId(item.videoUrl) && (
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId(item.videoUrl)}`}
                  title={`${item.person || item.title} testimonial`}
                  className="mb-5 aspect-video w-full rounded-xl"
                  allowFullScreen
                />
              )}
              {item.videoUrl && !youtubeId(item.videoUrl) && <video src={item.videoUrl} controls className="mb-5 aspect-video w-full rounded-xl object-cover" />}
              <p className="text-base leading-7 text-muted-foreground">“{item.body || item.quote}”</p>
              <div className="mt-5 border-t border-border/60 pt-4">
                <p className="font-bold text-foreground">{item.person || item.title}</p>
                {item.company && <p className="mt-1 text-sm text-muted-foreground">{item.company}</p>}
                {item.videoUrl && <a href={item.videoUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-bold text-primary hover:underline">Watch customer story →</a>}
              </div>
            </InteractiveCard>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero
        title="Talk to a backup specialist"
        eyebrow="Contact"
        description="Send a request for a demo, quote or recovery planning conversation."
        image={imageBank.ops}
        crumbs={[{ label: "Contact" }]}
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <h2 className="font-display text-3xl font-black tracking-tight text-foreground">
              Micronics Devlon
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              hello@micronicsdevlon.com<br />
              +1 (555) 014-2026<br />
              Los Angeles, CA
            </p>
            <div className="mt-8 rounded-3xl border border-border/80 bg-card p-6 shadow-card">
              <h3 className="font-display text-xl font-black text-foreground">Recovery Advisory</h3>
              <p className="my-3 text-sm text-muted-foreground">
                Get weekly recovery readiness ideas and data protection bulletins in your inbox.
              </p>
              <NewsletterForm />
            </div>
          </div>
          <QuotePanel type="contact" />
        </div>
      </Section>
    </>
  );
}

export function PolicyPage({ type }: { type: "privacy" | "terms" }) {
  const data = useAppData();
  const title = type === "privacy" ? "Privacy Policy" : "Terms of Service";
  const content =
    type === "privacy"
      ? data.settings.privacyPolicy || initialData.settings.privacyPolicy
      : data.settings.termsOfService || initialData.settings.termsOfService;
  return (
    <>
      <PageHero
        title={title}
        eyebrow="Company"
        description={`How Micronics Devlon handles ${type === "privacy" ? "privacy and personal information" : "service use and customer responsibilities"}.`}
        image={imageBank.network}
        crumbs={[{ label: title }]}
      />
      <Section className="py-8 sm:py-12">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,680px)_240px] lg:items-start lg:gap-16">
        <article className="min-w-0 text-left">
          <div className="space-y-6 sm:space-y-8">
            {content.split(/\n{2,}/).filter(Boolean).map((paragraph, index) => {
              const [heading, ...body] = paragraph.split("\n");
              const isUpdatedDate = heading.toLowerCase().startsWith("last updated:");
              const isHeading = body.length > 0 && !isUpdatedDate;
              return isHeading ? (
                <section key={index}>
                  <h2 className="font-display text-xl font-black text-foreground sm:text-2xl">{heading}</h2>
                  <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{body.join("\n")}</p>
                </section>
              ) : (
                <p key={index} className={cn("whitespace-pre-line text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7", isUpdatedDate && "text-xs font-medium sm:text-sm")}>
                  {isUpdatedDate ? [heading, ...body].join("\n") : heading}
                </p>
              );
            })}
          </div>
        </article>
        <aside className="hidden border-l border-border/70 pl-6 lg:block">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Legal information</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Questions about this {type === "privacy" ? "privacy policy" : "terms of service"}?
          </p>
          <a href="mailto:hello@micronicsdevlon.com" className="mt-4 inline-block text-sm font-bold text-primary hover:underline">
            hello@micronicsdevlon.com
          </a>
        </aside>
        </div>
      </Section>
    </>
  );
}

export function DetailPage({
  item,
  section,
  parentPath,
}: {
  item: Product | Service | Solution | Platform | ResourcePost | Blog | BaseItem;
  section: string;
  parentPath: string;
}) {
  if (section === "blogs") {
    const blog = item as Blog;
    return (
      <>
        <PageHero
          title={blog.title}
          eyebrow="Blog"
          description={blog.shortDescription}
          image={blog.image}
          crumbs={[{ label: "Blogs", to: parentPath }, { label: blog.title }]}
        />
        <Section className="pt-8 sm:pt-12">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-card">
              {blog.image && <img src={blog.image} alt={blog.title} className="aspect-[16/7] w-full object-cover" />}
              <div className="p-6 sm:p-10">
                <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border/70 pb-5 text-xs font-semibold text-muted-foreground">
                  <span className="text-primary">{blog.author || "Micronics Devlon"}</span>
                  {blog.category && <span>{blog.category}</span>}
                </div>
                <div className="whitespace-pre-line text-base leading-8 text-muted-foreground sm:text-lg">
                  {blog.body}
                </div>
                {blog.galleryImages && blog.galleryImages.length > 0 && (
                  <div className="mt-10 grid gap-4 sm:grid-cols-2">
                    {blog.galleryImages.map((image, index) => (
                      <img key={`${image.slice(0, 20)}-${index}`} src={image} alt={`${blog.title} image ${index + 1}`} className="aspect-[4/3] w-full rounded-2xl object-cover" />
                    ))}
                  </div>
                )}
              </div>
            </article>
            <aside className="h-fit rounded-3xl border border-border/80 bg-card p-6 shadow-card lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-wider text-primary">More insights</p>
              <h2 className="mt-3 font-display text-xl font-black text-foreground">Explore all blogs</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Read more practical guidance from the Micronics Devlon team.</p>
              <Link to="/blogs" className="mt-5 inline-flex text-sm font-bold text-primary hover:underline">Back to blogs →</Link>
            </aside>
          </div>
        </Section>
        <FinalCta />
      </>
    );
  }
  const Icon = iconMap[item.icon] ?? CheckCircle2;
  const maybeProduct = item as Product;
  const maybeService = item as Service;

  const override = item.slug ? FRONTEND_CONTENT_OVERRIDES[item.slug] : undefined;
  const displayTitle = override?.title ?? item.title;
  const displayDescription = override?.description ?? item.shortDescription;
  const displayBody = override?.description ?? item.body;

  return (
    <>
      <PageHero
        title={section === "backup" ? `Backup for ${displayTitle}` : displayTitle}
        eyebrow={section}
        description={displayDescription}
        image={item.image}
        crumbs={[{ label: section, to: parentPath }, { label: displayTitle }]}
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <article className="min-w-0">
            {/* Sticky Section Nav */}
            <div className="sticky top-24 z-20 mb-8 flex gap-2 overflow-x-auto rounded-2xl border border-border/80 bg-card/95 p-2 shadow-card backdrop-blur-md">
              <a
                href="#overview"
                className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                Overview
              </a>
              <a
                href="#features"
                className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="rounded-xl px-4 py-2 text-sm font-bold text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                FAQ
              </a>
            </div>

            <section id="overview">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-6">
                <Icon className="size-8" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                {displayTitle.includes(" | ") ? (
                  <>
                    <span>{displayTitle.split(" | ")[0]}</span>
                    <span className="mt-2 block text-lg sm:text-xl font-bold text-muted-foreground/90">
                      <span className="text-primary/70 font-light mr-2">|</span>
                      {displayTitle.split(" | ").slice(1).join(" | ")}
                    </span>
                  </>
                ) : (
                  displayTitle
                )}
              </h2>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {displayBody}
              </p>
            </section>

            <section id="features" className="mt-14">
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Key capabilities & Specifications
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {(
                  maybeProduct.features ??
                  maybeService.included ??
                  (item as Solution).benefits ??
                  (item as Platform).benefits ?? [
                    "Cryptographic immutability & WORM storage locking",
                    "Sub-second RTO with instant mount and live verification",
                    "Automated daily restore drills with SLA audit certificates",
                    "Multi-tenant management console with granular role-based access",
                    "End-to-end AES-256 GCM encryption in transit & at rest",
                    "Zero-impact synthetic full backups and global deduplication",
                  ]
                ).map((feature) => (
                  <InteractiveCard key={feature} className="p-5">
                    <CheckCircle2 className="size-5 text-primary" />
                    <p className="mt-3 font-semibold text-card-foreground">{feature}</p>
                  </InteractiveCard>
                ))}
              </div>
            </section>

            {maybeProduct.requirements && (
              <section className="mt-14">
                <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                  Requirements
                </h2>
                <div className="mt-6 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card">
                  {maybeProduct.requirements.map((row) => (
                    <div
                      key={row.label}
                      className="grid gap-2 border-b border-border/60 p-4 last:border-0 sm:grid-cols-[180px_1fr]"
                    >
                      <strong className="text-foreground text-sm font-bold">{row.label}</strong>
                      <span className="text-muted-foreground text-sm">{row.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section id="pricing" className="mt-14">
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Pricing & Deployment
              </h2>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                {maybeProduct.price ?? "Custom enterprise deployment"} with 24/7 dedicated engineering support, SLA guarantees, and instant provisioning.
              </p>
            </section>

            <section id="faq" className="mt-14">
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 grid gap-4">
                {(
                  maybeProduct.faqs ??
                  maybeService.faqs ?? [
                    {
                      question: `How does ${item.title} integrate into existing environments?`,
                      answer: `${item.title} deploys seamlessly with agentless connectors and lightweight agents, connecting to your storage repositories and virtualization hypervisors within 5 minutes without requiring system restarts.`,
                    },
                    {
                      question: `What RTO/RPO targets does ${item.title} support?`,
                      answer: `Micronics Devlon provides sub-second RTO through instant VM and granular file mounting, and customizable RPO schedules down to continuous 1-minute transaction log snapshots.`,
                    },
                    {
                      question: `Is ${item.title} compliant with industry data protection standards?`,
                      answer: `Yes, all snapshots and backup repositories are cryptographically sealed with WORM immutability, meeting strict SOC-2 Type II, ISO 27001, HIPAA, and GDPR compliance mandates.`,
                    },
                  ]
                ).map((faq) => (
                  <InteractiveCard key={faq.question} className="p-5">
                    <h3 className="font-bold text-card-foreground text-base">{faq.question}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </InteractiveCard>
                ))}
              </div>
            </section>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <QuotePanel type={section === "services" ? "quote" : "demo"} />
          </aside>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
