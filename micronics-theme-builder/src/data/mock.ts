import {
  Activity,
  ArchiveRestore,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CheckCircle2,
  Cloud,
  Database,
  FileCheck,
  FileLock2,
  Globe2,
  HardDrive,
  Headphones,
  KeyRound,
  Laptop,
  Layers,
  LifeBuoy,
  Lock,
  LockKeyhole,
  Mail,
  Network,
  Radio,
  RefreshCcw,
  RefreshCw,
  Server,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Status = "draft" | "published";
export type LeadStatus = "new" | "contacted" | "qualified" | "closed";
export type ContentType =
  | "products"
  | "services"
  | "solutions"
  | "features"
  | "platforms"
  | "pricingPlans"
  | "faqs"
  | "testimonials"
  | "posts"
  | "blogs"
  | "heroSlides";

export interface HeroSlide {
  id: string;
  title: string;
  slug: string;
  category?: string | undefined;
  starred?: boolean | undefined;
  badge?: string | undefined;
  headline: string;
  keyword: string;
  subheading: string;
  primaryCta: string;
  primaryLink: string;
  secondaryCta: string;
  secondaryLink: string;
  image: string;
  alt: string;
  order: number;
  active: boolean;
  status: Status;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface BaseItem {
  id: string;
  title: string;
  slug: string;
  category?: string | undefined;
  starred?: boolean | undefined;
  badge?: string | undefined;
  shortDescription: string;
  body: string;
  icon: string;
  image: string;
  status: Status;
  order: number;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product extends BaseItem {
  features: string[];
  platforms: string[];
  requirements: { label: string; value: string }[];
  faqs: { question: string; answer: string }[];
  price: string;
  related: string[];
}

export interface Service extends BaseItem {
  included: string[];
  process: string[];
  audience: string[];
  faqs: { question: string; answer: string }[];
}

export interface Solution extends BaseItem {
  benefits: string[];
}

export interface Platform extends BaseItem {
  category: string;
  benefits: string[];
}

export interface PricingPlan extends BaseItem {
  price: string;
  cadence: string;
  popular?: boolean;
  features: string[];
}

export interface FAQItem extends BaseItem {
  question: string;
  answer: string;
  category: string;
}

export interface Testimonial extends BaseItem {
  quote: string;
  person: string;
  company: string;
  videoUrl?: string;
  galleryImages?: string[];
}

export interface ResourcePost extends BaseItem {
  category: string;
  readTime: string;
  videoUrl?: string;
  galleryImages?: string[];
}

export interface Blog extends BaseItem {
  author?: string;
  galleryImages?: string[];
}

export interface Lead {
  id: string;
  type: "contact" | "demo" | "trial" | "quote";
  name: string;
  email: string;
  company: string;
  message: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  address: string;
  footerText: string;
  privacyPolicy: string;
  termsOfService: string;
  heroSources: { label: string; logo: string }[];
  heroDestinations: { label: string; logo: string }[];
  brandLogo: string;
  brandLogoSize: number;
  brandName: string;
  brandSubtitle: string;
  defaultTheme: "light" | "dark" | "system";
  maintenanceMode: boolean;
  socials: { label: string; url: string }[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
  active: boolean;
  createdAt: string;
}

export interface ActivityLogItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
}

export interface AppData {
  heroSlides: HeroSlide[];
  products: Product[];
  services: Service[];
  solutions: Solution[];
  features: BaseItem[];
  platforms: Platform[];
  pricingPlans: PricingPlan[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  posts: ResourcePost[];
  blogs: Blog[];
  leads: Lead[];
  newsletter: NewsletterSubscriber[];
  media: MediaItem[];
  settings: SiteSettings;
  users: AdminUser[];
  activity: ActivityLogItem[];
}

export const iconMap: Record<string, LucideIcon> = {
  Activity,
  ArchiveRestore,
  BadgeCheck,
  Boxes,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CheckCircle2,
  Cloud,
  Database,
  FileCheck,
  FileLock2,
  Globe2,
  HardDrive,
  Headphones,
  KeyRound,
  Laptop,
  Layers,
  LifeBuoy,
  Lock,
  LockKeyhole,
  Mail,
  Network,
  Radio,
  RefreshCcw,
  RefreshCw,
  Server,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Workflow,
  Zap,
};

export const imageBank = {
  dataCenter: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85",
  network: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2200&q=85",
  cyber: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2200&q=85",
  team: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2200&q=85",
  servers: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85",
  ops: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=85",
  cloud: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=85",
};

export const initialData: AppData = {
  heroSlides: [],
  products: [],
  services: [],
  solutions: [],
  features: [],
  platforms: [],
  pricingPlans: [],
  faqs: [],
  testimonials: [],
  posts: [],
  blogs: [],
  leads: [],
  newsletter: [],
  media: [],
  settings: {
    companyName: "Micronics Devlon",
    tagline: "Enterprise Backup, Disaster Recovery & Data Protection",
    contactEmail: "hello@micronicsdevlon.com",
    phone: "+1 (555) 014-2026",
    address: "Los Angeles, CA",
    footerText: "Resilient backup operations for modern infrastructure. Protect cloud applications, virtual machines, databases, NAS storage, and endpoints with sub-second restore confidence.",
    privacyPolicy: `Last updated: October 9, 2026

Micronics Devlon respects your privacy. This policy explains what information we collect, why we use it, and the choices available to you when you visit our website or use our backup and recovery services.

Information we collect
We may collect contact details, company information, support requests, newsletter subscriptions, account information, usage data, device information, and technical logs. We only request information needed to provide, secure, improve, and support our services.

How we use information
We use information to respond to enquiries, provide and administer services, process requests, communicate service updates, improve product reliability, prevent misuse, meet legal obligations, and maintain security records.

Sharing and international transfers
We share information only with service providers and professional advisers who support our operations, or when required by law. Providers must protect information and use it only for the agreed purpose. Where information crosses borders, we use appropriate contractual and technical safeguards.

Security and retention
We use access controls, encryption, monitoring, and backup safeguards appropriate to the information involved. No internet service can guarantee absolute security. We retain information only for as long as needed for the stated purpose, legal requirements, dispute resolution, and security records.

Your choices
You may request access, correction, deletion, restriction, or a copy of personal information, subject to applicable law. You may unsubscribe from marketing communications at any time. Contact hello@micronicsdevlon.com to make a request.

Cookies and updates
We may use essential cookies and similar technologies to operate and understand the website. We may update this policy from time to time and will publish the revised date on this page.`,
    termsOfService: `Last updated: October 9, 2026

These Terms of Service govern access to the Micronics Devlon website, products, and services. By using them, you agree to these terms and any service-specific order or agreement.

Services and accounts
You must provide accurate information, keep account credentials confidential, and ensure that users acting for your organization have appropriate authority. You are responsible for your systems, data, retention choices, and recovery procedures.

Acceptable use
You may not misuse the services, interfere with their operation, attempt unauthorized access, upload unlawful material, or use the services to harm people, systems, or data. We may suspend access where reasonably necessary to protect customers or the service.

Data and security
You retain rights in your data. You authorize Micronics Devlon to process it only to provide, secure, maintain, and improve the contracted services. You should maintain independent recovery procedures and verify that your selected retention, backup, and restore settings meet your requirements.

Intellectual property
Micronics Devlon and its licensors retain rights in the software, documentation, trademarks, and service materials. We grant you a limited, non-exclusive right to use them during the applicable subscription or service term.

Disclaimers and liability
Services are provided with commercially reasonable care, but no backup or recovery service can guarantee that every file, workload, or recovery objective will be available in every circumstance. To the extent permitted by law, liability is limited to the fees paid for the affected service during the applicable period.

Changes and contact
We may update these terms when our services or legal requirements change. Material changes will be communicated through the service or website. Questions about these terms may be sent to hello@micronicsdevlon.com.`,
heroSources: [
  { label: "Google Workspace", logo: "https://cdn.simpleicons.org/google" },
  { label: "Microsoft 365", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
  { label: "VMware", logo: "https://cdn.simpleicons.org/vmware" },
  { label: "Hyper-V", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
  { label: "Microsoft Exchange", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
  { label: "Microsoft SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original.svg" },
  { label: "Oracle", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
  { label: "MySQL", logo: "https://cdn.simpleicons.org/mysql" },
  { label: "MariaDB", logo: "https://cdn.simpleicons.org/mariadb" },
  { label: "Backup File", logo: "https://cdn.simpleicons.org/files" },
  { label: "QNAP NAS", logo: "https://cdn.simpleicons.org/qnap" },
  { label: "Synology NAS", logo: "https://cdn.simpleicons.org/synology" },
  { label: "Android", logo: "https://cdn.simpleicons.org/android" },
  { label: "iOS", logo: "https://cdn.simpleicons.org/apple" },
  { label: "Linux Bare Metal", logo: "https://cdn.simpleicons.org/linux" },
  { label: "Tibero", logo: "https://cdn.simpleicons.org/database" },
  { label: "Proxmox VE", logo: "https://cdn.simpleicons.org/proxmox" },
  { label: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql" },
],
heroDestinations: [
  { label: "Aliyun", logo: "https://cdn.simpleicons.org/alibabacloud" },
  { label: "Amazon S3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
  { label: "Backblaze B2", logo: "https://cdn.simpleicons.org/backblaze" },
  { label: "CTYun", logo: "https://cdn.simpleicons.org/cloudflare" },
  { label: "Dropbox", logo: "https://cdn.simpleicons.org/dropbox" },
  { label: "Google Cloud Storage", logo: "https://cdn.simpleicons.org/googlecloud" },
  { label: "Google Drive", logo: "https://cdn.simpleicons.org/googledrive" },
  { label: "Microsoft Azure", logo: "https://cdn.simpleicons.org/cloudflare" },
  { label: "OneDrive", logo: "https://cdn.simpleicons.org/cloudflare" },
  { label: "OpenStack", logo: "https://cdn.simpleicons.org/openstack" },
  { label: "Rackspace", logo: "https://cdn.simpleicons.org/cloudflare" },
  { label: "Wasabi", logo: "https://cdn.simpleicons.org/wasabi" },
  { label: "Local / Network Share", logo: "https://cdn.simpleicons.org/files" },
  { label: "USB Drive", logo: "https://cdn.simpleicons.org/files" },
],
brandLogo: "",
brandLogoSize: 36,
brandName: "Micronics Devlon",
brandSubtitle: "Data Protection",
defaultTheme: "light",
    maintenanceMode: false,
    socials: [
      { label: "LinkedIn", url: "https://linkedin.com" },
      { label: "Twitter / X", url: "https://x.com" },
      { label: "GitHub", url: "https://github.com" },
      { label: "YouTube", url: "https://youtube.com" },
    ],
  },
  users: [],
  activity: [],
};
