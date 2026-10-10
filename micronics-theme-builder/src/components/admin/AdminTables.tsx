import { useEffect, useMemo, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Download,
  Edit3,
  Plus,
  Trash2,
  Upload,
  Star,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Layers,
  Zap,
  ShieldCheck,
  Boxes,
  X,
  Sparkles,
  ArrowRight,
  Eye,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppData } from "@/lib/useAppData";
import {
  addMedia,
  deleteContent,
  deleteLead,
  deleteMedia,
  exportCsv,
  updateLead,
  updateSettings,
  updateUsers,
  upsertContent,
  type EditableItem,
} from "@/services/content";
import {
  iconMap,
  initialData,
  type AppData,
  type BaseItem,
  type ContentType,
  type Status,
  type Lead,
} from "@/data/mock";
import { cn } from "@/lib/utils";

const contentTypeTabs: { type: ContentType; label: string; countKey: keyof AppData; icon: any }[] = [
  { type: "solutions", label: "Solutions", countKey: "solutions", icon: Layers },
  { type: "features", label: "Features", countKey: "features", icon: Zap },
  { type: "services", label: "Services", countKey: "services", icon: ShieldCheck },
  { type: "products", label: "Products", countKey: "products", icon: Boxes },
  { type: "platforms", label: "Workloads / Directory", countKey: "platforms", icon: Layers },
  { type: "pricingPlans", label: "Pricing Plans", countKey: "pricingPlans", icon: Sparkles },
  { type: "faqs", label: "FAQs", countKey: "faqs", icon: CheckCircle2 },
  { type: "posts", label: "Resources & Articles", countKey: "posts", icon: Edit3 },
  { type: "testimonials", label: "Testimonials", countKey: "testimonials", icon: Star },
];

export function DashboardView() {
  const data = useAppData();
  const [activeTab, setActiveTab] = useState<ContentType>("solutions");
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null);

  const stats = [
    { label: "Solutions", value: data.solutions.length, icon: Layers, color: "text-blue-500 bg-blue-500/10" },
    { label: "Features", value: data.features.length, icon: Zap, color: "text-amber-500 bg-amber-500/10" },
    { label: "Services", value: data.services.length, icon: ShieldCheck, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Products", value: data.products.length, icon: Boxes, color: "text-indigo-500 bg-indigo-500/10" },
    { label: "Active Leads", value: data.leads.length, icon: CheckCircle2, color: "text-orange-500 bg-orange-500/10" },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/80 bg-card p-5 shadow-card transition-all hover:shadow-elevated"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={cn("flex size-8 items-center justify-center rounded-xl", stat.color)}>
                  <Icon className="size-4" />
                </div>
              </div>
              <p className="mt-3 font-display text-3xl font-black text-foreground">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* 2. Quick Action Create Buttons */}
      <div className="rounded-2xl border border-border/80 bg-gradient-to-r from-primary/5 via-card to-accent/5 p-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">
              Quick Content Creator
            </h3>
            <p className="text-xs text-muted-foreground">
              Directly add a new Solution, Feature, Service, or Product into the local catalog.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="orange"
              size="sm"
              onClick={() => {
                setActiveTab("solutions");
                setEditingItem({
                  title: "New Solution",
                  slug: "new-solution",
                  category: "Cloud Applications Backup",
                  starred: true,
                  shortDescription: "Short solution overview",
                  body: "Detailed technical architecture and restore blueprint.",
                  icon: "Cloud",
                  status: "published",
                  order: data.solutions.length + 1,
                  id: "",
                } as EditableItem);
              }}
            >
              <Plus className="size-4 mr-1" /> Add Solution
            </Button>
            <Button
              variant="blue"
              size="sm"
              onClick={() => {
                setActiveTab("features");
                setEditingItem({
                  title: "New Feature",
                  slug: "new-feature",
                  category: "New",
                  starred: true,
                  shortDescription: "Short feature capability overview",
                  body: "Detailed feature specs and compliance details.",
                  icon: "Zap",
                  status: "published",
                  order: data.features.length + 1,
                  id: "",
                } as EditableItem);
              }}
            >
              <Plus className="size-4 mr-1" /> Add Feature
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={() => {
                setActiveTab("services");
                setEditingItem({
                  title: "New Service",
                  slug: "new-service",
                  starred: true,
                  shortDescription: "Service description",
                  body: "Service scope and delivery methodology.",
                  icon: "ShieldCheck",
                  status: "published",
                  order: data.services.length + 1,
                  id: "",
                } as EditableItem);
              }}
            >
              <Plus className="size-4 mr-1" /> Add Service
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Main Live Content Manager Section */}
      <ContentManager defaultType={activeTab} />

      {/* 4. Leads & Activity Split Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Leads */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="font-display text-base font-bold text-foreground">Recent Inquiries & Trials</h3>
            <Button asChild variant="ghost" size="sm" className="text-xs text-primary">
              <Link to="/admin/leads">View all leads →</Link>
            </Button>
          </div>
          <div className="space-y-3">
            {data.leads.slice(0, 4).map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between rounded-xl bg-secondary/50 p-3 text-xs"
              >
                <div>
                  <span className="font-bold text-foreground block">{lead.name}</span>
                  <span className="text-muted-foreground">{lead.email} • {lead.company}</span>
                </div>
                <span className="rounded-md bg-primary/10 px-2 py-0.5 font-bold uppercase text-[10px] text-primary">
                  {lead.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log Stream */}
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card">
          <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="font-display text-base font-bold text-foreground">Admin Activity Trail</h3>
            <Button asChild variant="ghost" size="sm" className="text-xs text-primary">
              <Link to="/admin/activity">View full log →</Link>
            </Button>
          </div>
          <div className="space-y-2.5">
            {data.activity.slice(0, 4).map((act) => (
              <div key={act.id} className="flex items-center justify-between text-xs py-1.5 border-b border-border/40 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary" />
                  <span className="font-semibold text-foreground">{act.action}</span>
                  <span className="text-muted-foreground truncate max-w-[200px]">{act.target}</span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingItem && (
        <ContentEditor
          type={activeTab}
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}

export function ContentManager({
  defaultType = "solutions" as ContentType,
  allowedTypes,
  allowedCategories,
  initialCategory = "All",
  readOnlyTypes = [],
}: {
  defaultType?: ContentType;
  allowedTypes?: ContentType[];
  allowedCategories?: string[];
  initialCategory?: string;
  readOnlyTypes?: ContentType[];
}) {
  const data = useAppData();
  const [activeType, setActiveType] = useState<ContentType>(defaultType);
  const [selectedSubCategory, setSelectedSubCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<EditableItem | null>(null);
  const isReadOnly = readOnlyTypes.includes(activeType);
  const isSimplePage = activeType === "posts" || activeType === "blogs";

  // Get raw items from store
  const collection = ((data[activeType] as EditableItem[]) ?? []).filter(
    (item) =>
      !allowedCategories ||
      activeType === "testimonials" ||
      !("category" in item) ||
      allowedCategories.includes(item.category ?? ""),
  );

  // Extract distinct subcategories for filtering
  const distinctCategories = useMemo(() => {
    const cats = new Set<string>();
    collection.forEach((item) => {
      if ("category" in item && item.category) cats.add(item.category as string);
    });
    return ["All", ...Array.from(cats)];
  }, [collection]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return collection.filter((item) => {
      const matchesCat =
        selectedSubCategory === "All" ||
        ("category" in item && item.category === selectedSubCategory);

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.slug && item.slug.toLowerCase().includes(q)) ||
        ((item as any).shortDescription && (item as any).shortDescription.toLowerCase().includes(q));

      return matchesCat && matchesQuery;
    });
  }, [collection, selectedSubCategory, searchQuery]);

  const handleToggleStar = (item: EditableItem) => {
    const updated = { ...item, starred: !item.starred };
    upsertContent(activeType, updated as any);
    toast.success(
      updated.starred
        ? `★ Added "${item.title}" to header featured highlights!`
        : `Removed "${item.title}" from highlights`
    );
  };

  const handleDelete = (item: EditableItem) => {
    if (isReadOnly) return;
    setDeletingItem(item);
  };

  const handleAddNew = () => {
    const newTemplate: Partial<EditableItem> = {
      title: `New ${activeType.slice(0, -1)}`,
      slug: `new-${activeType.slice(0, -1)}-${Date.now().toString().slice(-4)}`,
      category:
        activeType === "solutions"
          ? "Cloud Applications Backup"
          : activeType === "features"
            ? "New"
            : activeType === "posts"
              ? "Company"
              : "General",
      starred: true,
      shortDescription: "Enter concise summary here.",
      body: "Detailed technical specifications, benefits, and operational blueprint.",
      icon: "ShieldCheck",
      image: "",
      status: "published",
      order: collection.length + 1,
      seoTitle: "",
      seoDescription: "",
      id: "",
    };
    setEditingItem(newTemplate as EditableItem);
  };

  return (
    <div className="space-y-6">
      {/* 1. Main Content Type Selector Pills */}
      <div className="flex flex-wrap gap-2 border-b border-border/60 pb-4">
        {contentTypeTabs.filter((tab) => !allowedTypes || allowedTypes.includes(tab.type)).map((tab) => {
          const Icon = tab.icon;
          const count = (data[tab.countKey] as any[])?.length ?? 0;
          const isActive = activeType === tab.type;
          return (
            <button
              key={tab.type}
              type="button"
              onClick={() => {
                setActiveType(tab.type);
                setSelectedSubCategory("All");
                setSearchQuery("");
                setEditingItem(null);
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "border border-border/80 bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="size-3.5" />
              <span>{tab.label}</span>
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-mono",
                  isActive ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Control Bar: Subcategories, Search, & Add Button */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Subcategory Pills */}
          {distinctCategories.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-muted-foreground font-semibold mr-1 flex items-center gap-1">
                <Filter className="size-3" /> Category:
              </span>
              {distinctCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedSubCategory(cat)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                    selectedSubCategory === cat
                      ? "bg-foreground text-background font-bold"
                      : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Search & Add Button */}
          <div className="flex items-center gap-3 sm:ml-auto">
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeType}...`}
                className="h-9 pl-8 text-xs rounded-xl bg-background"
              />
            </div>
            {!isReadOnly && (
              <Button variant="orange" size="sm" onClick={handleAddNew} className="whitespace-nowrap">
                <Plus className="size-4 mr-1" />
                Add {activeType.slice(0, -1)}
              </Button>
            )}
          </div>
        </div>

        {/* 3. Rich Data Table */}
        <div className="overflow-x-auto rounded-xl border border-border/80">
          <Table>
            <TableHeader className="bg-secondary/40">
              <TableRow>
                {!isSimplePage && <TableHead className="w-10">★</TableHead>}
                {!isSimplePage && <TableHead className="w-12">Icon</TableHead>}
                <TableHead>Title & Slug</TableHead>
                <TableHead>Category / Group</TableHead>
                <TableHead className="max-w-md">Description</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isSimplePage ? 5 : 7} className="py-12 text-center text-muted-foreground text-sm">
                      {isReadOnly
                        ? "No default About page was found."
                        : <>No items found matching your filter or query. Click &quot;Add {activeType.slice(0, -1)}&quot; to create one.</>}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRows.map((row) => {
                  const iconName = ((row as any).icon as string) ?? "ShieldCheck";
                  const Icon = iconMap[iconName] ?? CheckCircle2;
                  const isStarred = Boolean((row as any).starred);
                  return (
                    <TableRow key={row.id} className="hover:bg-secondary/30 transition-colors">
                      {/* Starred Button */}
                      {!isSimplePage && (
                        <TableCell>
                          <button
                            type="button"
                            onClick={() => handleToggleStar(row)}
                            title={isStarred ? "Remove star highlight" : "Star as featured highlight"}
                            className="text-muted-foreground hover:text-amber-500 transition-colors p-1"
                          >
                            <Star
                              className={cn(
                                "size-4",
                                isStarred
                                  ? "fill-amber-500 text-amber-500"
                                  : "opacity-40 hover:opacity-100"
                              )}
                            />
                          </button>
                        </TableCell>
                      )}

                      {/* Icon */}
                      {!isSimplePage && (
                        <TableCell>
                          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="size-4" />
                          </div>
                        </TableCell>
                      )}

                      {/* Title & Slug */}
                      <TableCell>
                        <div className="font-bold text-foreground text-sm flex items-center gap-1.5">
                          <span>{row.title}</span>
                          {isStarred && (
                            <span className="rounded bg-amber-500/15 px-1.5 py-0.2 text-[9px] font-bold text-amber-600 dark:text-amber-400">
                              Featured
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground">/{row.slug}</span>
                      </TableCell>

                      {/* Category */}
                      <TableCell>
                        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                          {(row as any).category ?? activeType}
                        </span>
                      </TableCell>

                      {/* Description */}
                      <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                        {(row as any).shortDescription ?? (row as any).body ?? "—"}
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
                            row.status === "published"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/15 text-amber-600"
                          )}
                        >
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              row.status === "published" ? "bg-emerald-500" : "bg-amber-500"
                            )}
                          />
                          {row.status}
                        </span>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingItem(row)}
                            title="Edit Item"
                            className="size-8 text-foreground hover:bg-primary/15 hover:text-primary"
                          >
                            <Edit3 className="size-3.5" />
                          </Button>
                          {!isReadOnly && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(row)}
                              title="Delete Item"
                              className="size-8 text-destructive hover:bg-destructive/15"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Slide-over Content Editor Drawer */}
      {editingItem && (
        <ContentEditor
          type={activeType}
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingItem && (
        <AlertDialog open={Boolean(deletingItem)} onOpenChange={(open) => !open && setDeletingItem(null)}>
          <AlertDialogContent className="rounded-2xl border-border bg-card p-6 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-foreground">
                Delete "{deletingItem.title}"?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-muted-foreground">
                Are you sure you want to permanently delete this {activeType.slice(0, -1)} from the database? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex flex-row items-center justify-end gap-2">
              <AlertDialogCancel className="rounded-xl border-border">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteContent(activeType, deletingItem.id);
                  toast.success(`Deleted "${deletingItem.title}" from database.`);
                  setDeletingItem(null);
                }}
                className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold"
              >
                Delete Item
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

interface ContentFormData {
  title: string;
  slug: string;
  category: string;
  starred: boolean;
  shortDescription: string;
  body: string;
  icon: string;
  image: string;
  status: Status;
  order: number;
  seoTitle: string;
  seoDescription: string;
  price: string;
  videoUrl: string;
  quote: string;
  person: string;
  company: string;
  author: string;
  galleryImages: string[];
}

function ContentEditor({
  type,
  item,
  onClose,
}: {
  type: ContentType;
  item: EditableItem;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ContentFormData>({
    title: item.title ?? "",
    slug: item.slug ?? "",
    category: ((item as any).category as string) ?? (type === "solutions" ? "Cloud Applications Backup" : "General"),
    starred: Boolean((item as any).starred),
    shortDescription: ((item as any).shortDescription as string) ?? "",
    body: ((item as any).body as string) ?? "",
    icon: ((item as any).icon as string) ?? "ShieldCheck",
    image: ((item as any).image as string) ?? "",
    status: (item.status as Status) ?? "published",
    order: item.order ?? 1,
    seoTitle: ((item as any).seoTitle as string) ?? "",
    seoDescription: ((item as any).seoDescription as string) ?? "",
    price: ((item as any).price as string) ?? "",
    videoUrl: ((item as any).videoUrl as string) ?? "",
    quote: ((item as any).quote as string) ?? "",
    person: ((item as any).person as string) ?? "",
    company: ((item as any).company as string) ?? "",
    author: ((item as any).author as string) ?? "",
    galleryImages: Array.isArray((item as any).galleryImages) ? (item as any).galleryImages : [],
  });
  const [mediaInputKey, setMediaInputKey] = useState(0);

  const availableIcons = [
    "Cloud",
    "Database",
    "Server",
    "HardDrive",
    "Lock",
    "ShieldCheck",
    "Zap",
    "Laptop",
    "Smartphone",
    "Boxes",
    "FileCheck",
    "Activity",
    "Mail",
    "KeyRound",
    "RefreshCw",
    "Star",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = type === "testimonials" ? (form.person.trim() || "Customer testimonial") : form.title.trim();
    if (!title) {
      toast.error("A title is required");
      return;
    }

    const payload: Record<string, any> = {
      ...item,
      ...form,
      status: (form.status ?? "published") as Status,
      title,
      galleryImages: form.galleryImages,
      author: form.author,
    };
    if (item.id && item.id.trim()) {
      payload.id = item.id.trim();
    } else {
      delete payload.id;
    }
    if (type !== "testimonials" && form.slug.trim()) {
      payload["slug"] = form.slug.trim();
    }
    if (type !== "blogs") delete payload.author;
    if (type !== "posts" && type !== "testimonials" && type !== "blogs") delete payload.galleryImages;
    if (type !== "testimonials") {
      delete payload.quote;
      delete payload.person;
      delete payload.company;
    }

    upsertContent(type, payload as any);

    toast.success(`Successfully saved "${title}"!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex h-full w-full max-w-xl flex-col border-l border-border bg-card p-6 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Content Editor • {type}
            </span>
            <h2 className="font-display text-xl font-black text-foreground">
              {item.id ? `Edit ${form.title}` : `Create New ${type.slice(0, -1)}`}
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="size-8">
            <X className="size-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {type !== "testimonials" && (
            <Field label="Item Title">
              <Input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Proxmox VE Backup"
                className="bg-background text-sm font-medium"
              />
            </Field>
          )}

          {type !== "testimonials" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Field label="URL Slug">
                  <Input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-generated-if-empty"
                    className="bg-background font-mono text-xs"
                  />
                </Field>

                <Field label="Category / Group">
                  <Input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Cloud Applications"
                    className="bg-background text-xs"
                  />
                </Field>
              </div>

              {/* Star Highlight Switch */}
              {type !== "posts" && type !== "blogs" && (
                <div className="flex items-center justify-between rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
                <div>
                  <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
                    <Star className="size-3.5 fill-amber-500 text-amber-500" />
                    Featured Highlight (★)
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Highlight this item with a star badge in header mega-menus.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={form.starred}
                  onChange={(e) => setForm({ ...form, starred: e.target.checked })}
                  className="size-4 rounded border-border text-primary cursor-pointer"
                />
                </div>
              )}

              {/* Icon Selector */}
              {type !== "posts" && type !== "blogs" && <Field label="Icon Picker">
                <div className="grid grid-cols-8 gap-2 bg-background/60 p-2.5 rounded-xl border border-border/80">
                  {availableIcons.map((ic) => {
                    const IconComponent = iconMap[ic] ?? CheckCircle2;
                    const isSelected = form.icon === ic;
                    return (
                      <button
                        key={ic}
                        type="button"
                        onClick={() => setForm({ ...form, icon: ic })}
                        className={cn(
                          "flex size-9 items-center justify-center rounded-lg transition-all",
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        )}
                        title={ic}
                      >
                        <IconComponent className="size-4" />
                      </button>
                    );
                  })}
                </div>
              </Field>}

              <Field label="Short Summary / Description">
                <Textarea
                  rows={2}
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  placeholder="1-2 sentences for card previews and search."
                  className="bg-background text-xs"
                />
              </Field>

              <Field label="Full Detailed Body / Specs">
                <Textarea
                  rows={5}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  placeholder="Full architectural specs, requirements, and restore blueprints."
                  className="bg-background text-xs"
                />
              </Field>
            </>
          )}

          {type === "testimonials" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <p className="text-xs text-muted-foreground sm:col-span-2">
                Add the customer details and testimonial content below.
              </p>
              <Field label="Person">
                <Input value={form.person} onChange={(e) => setForm({ ...form, person: e.target.value })} className="bg-background text-xs" />
              </Field>
              <Field label="Company">
                <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-background text-xs" />
              </Field>
              <Field label="Testimonial Quote">
                <Textarea rows={3} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} className="bg-background text-xs sm:col-span-2" />
              </Field>
            </div>
          )}

          {type === "blogs" && (
            <Field label="Author (optional)">
              <Input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="e.g. Micronics Devlon Team"
                className="bg-background text-xs"
              />
            </Field>
          )}

          {(type === "posts" || type === "testimonials") && (
            <Field label={type === "posts" ? "YouTube or Video URL" : "Optional Testimonial Video URL"}>
              <Input
                type="url"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
                className="bg-background text-xs"
              />
              <Input
                key={`video-${mediaInputKey}`}
                type="file"
                accept="video/*"
                className="mt-2 bg-background text-xs"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => setForm((current) => ({ ...current, videoUrl: String(reader.result ?? "") }));
                  reader.readAsDataURL(file);
                }}
              />
              {form.videoUrl && (
                <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2">
                  <span className="truncate text-[11px] text-muted-foreground">
                    {form.videoUrl.startsWith("data:") ? "Uploaded video selected" : "Video URL added"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setForm((current) => ({ ...current, videoUrl: "" }));
                      setMediaInputKey((key) => key + 1);
                    }}
                    className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-destructive hover:underline"
                  >
                    <X className="size-3" /> Remove
                  </button>
                </div>
              )}
              <p className="mt-1 text-[11px] text-muted-foreground">
                Paste a YouTube link or upload a video file. YouTube links embed automatically; uploaded videos show an HTML5 preview.
              </p>
            </Field>
          )}

          <Field label={type === "testimonials" ? "Customer Image (optional)" : "Preview Image URL or Upload"}>
            <Input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/images/example.jpg or hosted image URL"
              className="bg-background text-xs"
            />
            <Input
              key={`image-${mediaInputKey}`}
              type="file"
              accept="image/*"
              className="mt-2 bg-background text-xs"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => setForm((current) => ({ ...current, image: String(reader.result ?? "") }));
                reader.readAsDataURL(file);
              }}
            />
            {form.image && (
              <div className="mt-2 flex items-start gap-3">
                <img src={form.image} alt="Selected preview" className="h-24 w-40 rounded-lg object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setForm((current) => ({ ...current, image: "" }));
                    setMediaInputKey((key) => key + 1);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-destructive hover:underline"
                >
                  <X className="size-3" /> Remove
                </button>
              </div>
            )}
            {(type === "posts" || type === "testimonials") && (
              <div className="mt-4 border-t border-border/70 pt-4">
                <p className="mb-2 text-xs font-bold text-foreground">Additional Images (optional)</p>
                <Input
                  key={`gallery-${mediaInputKey}`}
                  type="file"
                  accept="image/*"
                  multiple
                  className="bg-background text-xs"
                  onChange={(e) => {
                    const files = Array.from(e.target.files ?? []);
                    files.forEach((file) => {
                      const reader = new FileReader();
                      reader.onload = () =>
                        setForm((current) => ({
                          ...current,
                          galleryImages: [...current.galleryImages, String(reader.result ?? "")],
                        }));
                      reader.readAsDataURL(file);
                    });
                  }}
                />
                {form.galleryImages.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {form.galleryImages.map((image, index) => (
                      <div key={`${image.slice(0, 24)}-${index}`} className="relative">
                        <img src={image} alt={`Gallery image ${index + 1}`} className="h-20 w-full rounded-lg object-cover" />
                        <button
                          type="button"
                          onClick={() => setForm((current) => ({
                            ...current,
                            galleryImages: current.galleryImages.filter((_, imageIndex) => imageIndex !== index),
                          }))}
                          className="absolute right-1 top-1 rounded-full bg-background/90 p-1 text-destructive shadow"
                          aria-label={`Remove gallery image ${index + 1}`}
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Select multiple images at once or add more images later. Remove any image before saving.
                </p>
              </div>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Publish Status">
              <select
                className="h-9 w-full rounded-xl border border-input bg-background px-3 text-xs font-semibold"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </Field>

            <Field label="Display Order">
              <Input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="bg-background text-xs"
              />
            </Field>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="orange" size="lg">
              Save & Apply Live
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function LeadsManager() {
  const data = useAppData();
  const [query, setQuery] = useState("");
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const rows = data.leads.filter((lead) =>
    JSON.stringify(lead).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Inbound Leads & Trial Requests</h2>
          <p className="text-xs text-muted-foreground">Manage prospect submissions, quotes, and demo requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads..."
            className="sm:max-w-xs text-xs h-9 bg-background"
          />
          <Button
            variant="blue"
            size="sm"
            onClick={() => exportCsv(rows as unknown as Record<string, unknown>[], "micronics_leads.csv")}
          >
            <Download className="size-3.5 mr-1" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/80">
        <Table>
          <TableHeader className="bg-secondary/40">
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Request Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground text-xs">
                  No inquiries recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <span className="font-bold text-foreground block text-sm">{row.name}</span>
                    <span className="text-xs text-muted-foreground">{row.email}</span>
                  </TableCell>
                  <TableCell className="text-xs font-medium">{row.company}</TableCell>
                  <TableCell>
                    <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                      {row.type}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                    {row.message}
                  </TableCell>
                  <TableCell>
                    <select
                      className="rounded-lg border border-input bg-background px-2 py-1 text-xs font-semibold"
                      value={row.status}
                      onChange={(e) => updateLead(row.id, { status: e.target.value as any })}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingLead(row)}
                      title="Delete Lead"
                      className="size-8 text-destructive hover:bg-destructive/15"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Lead Modal */}
      {deletingLead && (
        <AlertDialog open={Boolean(deletingLead)} onOpenChange={(open) => !open && setDeletingLead(null)}>
          <AlertDialogContent className="rounded-2xl border-border bg-card p-6 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-foreground">
                Delete inquiry from {deletingLead.name}?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-muted-foreground">
                Are you sure you want to permanently delete this lead inquiry from {deletingLead.email}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex flex-row items-center justify-end gap-2">
              <AlertDialogCancel className="rounded-xl border-border">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteLead(deletingLead.id);
                  toast.success("Lead removed from database.");
                  setDeletingLead(null);
                }}
                className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold"
              >
                Delete Lead
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export function NewsletterManager() {
  const data = useAppData();
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Newsletter Subscribers</h2>
          <p className="text-xs text-muted-foreground">Subscribed audience for recovery bulletins.</p>
        </div>
        <Button
          variant="blue"
          size="sm"
          onClick={() => exportCsv(data.newsletter as unknown as Record<string, unknown>[], "subscribers.csv")}
        >
          <Download className="size-3.5 mr-1" /> Export CSV
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border/80">
        <Table>
          <TableHeader className="bg-secondary/40">
            <TableRow>
              <TableHead>Email Address</TableHead>
              <TableHead>Subscribed Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.newsletter.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="font-semibold text-xs text-foreground">{sub.email}</TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(sub.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function MediaManager() {
  const data = useAppData();
  const [deletingMedia, setDeletingMedia] = useState<MediaItem | null>(null);

  return (
    <div className="space-y-6">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center shadow-card hover:border-primary transition-all">
        <Upload className="mb-2 size-8 text-primary" />
        <span className="font-bold text-sm text-foreground">Upload Media Assets</span>
        <span className="text-xs text-muted-foreground">Local image preview saved in browser memory.</span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) =>
            Array.from(e.target.files ?? []).forEach((file) =>
              addMedia({ name: file.name, type: file.type, url: URL.createObjectURL(file) })
            )
          }
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.media.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card group">
            <img src={item.url} alt={item.name} className="h-40 w-full object-cover group-hover:scale-105 transition-transform" />
            <div className="p-4">
              <p className="truncate font-bold text-xs text-foreground">{item.name}</p>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(item.url);
                    toast.success("URL copied to clipboard");
                  }}
                  className="text-xs flex-1"
                >
                  Copy URL
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeletingMedia(item)}
                  className="text-xs text-destructive hover:bg-destructive/15"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Media Modal */}
      {deletingMedia && (
        <AlertDialog open={Boolean(deletingMedia)} onOpenChange={(open) => !open && setDeletingMedia(null)}>
          <AlertDialogContent className="rounded-2xl border-border bg-card p-6 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-foreground">
                Delete "{deletingMedia.name}"?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-muted-foreground">
                Are you sure you want to delete this media asset? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex flex-row items-center justify-end gap-2">
              <AlertDialogCancel className="rounded-xl border-border">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteMedia(deletingMedia.id);
                  toast.success(`Deleted "${deletingMedia.name}".`);
                  setDeletingMedia(null);
                }}
                className="rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold"
              >
                Delete Asset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export function SettingsManager() {
  const data = useAppData();
  const [activeTab, setActiveTab] = useState<"brand" | "hero" | "legal">("brand");
  const [brandLogoSizeInput, setBrandLogoSizeInput] = useState("");
  const [deletingHeroItem, setDeletingHeroItem] = useState<{
    key: "heroSources" | "heroDestinations";
    index: number;
    label: string;
  } | null>(null);
  const [settings, setSettings] = useState({
    ...data.settings,
    privacyPolicy: data.settings.privacyPolicy || initialData.settings.privacyPolicy,
    termsOfService: data.settings.termsOfService || initialData.settings.termsOfService,
    heroSources: data.settings.heroSources?.length ? data.settings.heroSources : initialData.settings.heroSources,
    heroDestinations: data.settings.heroDestinations?.length ? data.settings.heroDestinations : initialData.settings.heroDestinations,
    brandLogo: data.settings.brandLogo || "",
    brandLogoSize: data.settings.brandLogoSize || 36,
    brandName: data.settings.brandName || data.settings.companyName,
    brandSubtitle: data.settings.brandSubtitle || "Data Protection",
  });
  useEffect(() => {
    setBrandLogoSizeInput(String(settings.brandLogoSize));
  }, [settings.brandLogoSize]);
  const readImage = (file: File, callback: (value: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => callback(String(reader.result));
    reader.readAsDataURL(file);
  };
  const updateHeroItem = (key: "heroSources" | "heroDestinations", index: number, patch: Partial<{ label: string; logo: string }>) => {
    const items = [...settings[key]];
    items[index] = { ...items[index], ...patch };
    setSettings({ ...settings, [key]: items });
  };

  return (
    <form
      className="mx-auto grid w-full max-w-5xl gap-5 rounded-2xl border border-border/80 bg-card p-5 shadow-card sm:p-7"
      onSubmit={(e) => {
        e.preventDefault();
        updateSettings(settings);
        toast.success("Site settings saved successfully!");
      }}
    >
      <div className="flex flex-wrap gap-2 border-b border-border/60 pb-3">
        {(["brand", "hero", "legal"] as const).map((tab) => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={cn("rounded-lg px-4 py-2 text-xs font-bold capitalize", activeTab === tab ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
            {tab === "brand" ? "Brand & contact" : tab === "hero" ? "Hero integrations" : "Legal pages"}
          </button>
        ))}
      </div>
      <div className={activeTab === "brand" ? "grid gap-5" : "hidden"}>
      <Field label="Navbar logo">
        <div className="flex items-center gap-3">
          {settings.brandLogo && <img src={settings.brandLogo} alt="Navbar logo preview" className="size-12 rounded-lg border border-border object-contain p-1" />}
          <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && readImage(e.target.files[0], (logo) => setSettings({ ...settings, brandLogo: logo }))} className="bg-background" />
          {settings.brandLogo && <Button type="button" variant="ghost" size="icon" onClick={() => setSettings({ ...settings, brandLogo: "" })}><X className="size-4" /></Button>}
        </div>
      </Field>
      <Field label={`Navbar logo size (${settings.brandLogoSize}px)`}>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="16"
            max="96"
            step="1"
            value={settings.brandLogoSize}
            onChange={(e) => setSettings({ ...settings, brandLogoSize: Number(e.target.value) })}
            className="w-full accent-primary"
          />
          <Input
            type="number"
            min="16"
            max="96"
            value={brandLogoSizeInput}
            onChange={(e) => setBrandLogoSizeInput(e.target.value)}
            onBlur={() => {
              const value = Number(brandLogoSizeInput);
              const nextSize = Number.isFinite(value) ? Math.min(96, Math.max(16, value)) : 36;
              setSettings({ ...settings, brandLogoSize: nextSize });
              setBrandLogoSizeInput(String(nextSize));
            }}
            className="w-24 bg-background"
          />
        </div>
        <span className="text-[11px] font-normal normal-case tracking-normal text-muted-foreground">
          Choose a size from 16px to 96px. The setting applies to the desktop and mobile navbar.
        </span>
      </Field>
      <Field label="Navbar brand name">
        <Input value={settings.brandName} onChange={(e) => setSettings({ ...settings, brandName: e.target.value })} className="bg-background" />
      </Field>
      <Field label="Navbar subtitle">
        <Input value={settings.brandSubtitle} onChange={(e) => setSettings({ ...settings, brandSubtitle: e.target.value })} className="bg-background" />
      </Field>
      <Field label="Company Name">
        <Input
          value={settings.companyName}
          onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
          className="bg-background"
        />
      </Field>
      <Field label="Tagline / Mission">
        <Textarea
          value={settings.tagline}
          onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
          className="bg-background"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Support Email">
          <Input
            value={settings.contactEmail}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            className="bg-background"
          />
        </Field>
        <Field label="Contact Phone">
          <Input
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            className="bg-background"
          />
        </Field>
      </div>
      <Field label="Footer Description">
        <Textarea
          rows={3}
          value={settings.footerText}
          onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
          className="bg-background text-xs"
        />
      </Field>
      </div>
      <div className="mt-4 border-t border-border/60 pt-6">
        <h2 className="font-display text-lg font-bold text-foreground">Legal pages</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Edit the public Privacy Policy and Terms of Service pages. Separate paragraphs with a blank line; the first line of each block becomes its heading.
        </p>
      </div>
      <div className={activeTab === "legal" ? "grid gap-5" : "hidden"}>
      <Field label="Privacy Policy">
        <Textarea
          rows={14}
          value={settings.privacyPolicy}
          onChange={(e) => setSettings({ ...settings, privacyPolicy: e.target.value })}
          className="bg-background text-sm leading-6"
        />
      </Field>
      <Field label="Terms of Service">
        <Textarea
          rows={14}
          value={settings.termsOfService}
          onChange={(e) => setSettings({ ...settings, termsOfService: e.target.value })}
          className="bg-background text-sm leading-6"
        />
      </Field>
      </div>
      <div className="mt-4 border-t border-border/60 pt-6">
        <h2 className="font-display text-lg font-bold text-foreground">Hero protection integrations</h2>
        <p className="mt-1 text-xs text-muted-foreground">Manage each platform name and uploaded logo from the Hero Integrations tab.</p>
      </div>
      <div className={activeTab === "hero" ? "grid gap-5" : "hidden"}>
        {(["heroSources", "heroDestinations"] as const).map((key) => (
          <div key={key} className="grid gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground">{key === "heroSources" ? "Back up from" : "Protect to"}</h3>
              <Button type="button" variant="outline" size="sm" onClick={() => setSettings({ ...settings, [key]: [...settings[key], { label: "New platform", logo: "" }] })}>
                <Plus className="mr-1 size-3.5" /> Add item
              </Button>
            </div>
            {settings[key].map((item, index) => (
              <div key={`${key}-${index}`} className="grid gap-3 rounded-xl border border-border/70 bg-background/60 p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
                <Input value={item.label} onChange={(e) => updateHeroItem(key, index, { label: e.target.value })} placeholder="Platform name" className="bg-background" />
                <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && readImage(e.target.files[0], (logo) => updateHeroItem(key, index, { logo }))} className="bg-background text-xs" />
                  {item.logo && <img src={item.logo} alt={`${item.label} preview`} className="size-10 rounded-lg border border-border object-contain bg-card p-1" />}
                  {item.logo && <Button type="button" variant="ghost" size="icon" onClick={() => updateHeroItem(key, index, { logo: "" })}><X className="size-4" /></Button>}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  title={`Delete ${item.label}`}
                  onClick={() => setDeletingHeroItem({ key, index, label: item.label })}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Button variant="orange" className="w-fit mt-2">
        Save Settings
      </Button>
      {deletingHeroItem && (
        <AlertDialog open={Boolean(deletingHeroItem)} onOpenChange={(open) => !open && setDeletingHeroItem(null)}>
          <AlertDialogContent className="rounded-2xl border-border bg-card p-6 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-foreground">
                Delete "{deletingHeroItem.label}"?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-muted-foreground">
                This integration will be removed from the hero after you save the settings. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex flex-row items-center justify-end gap-2">
              <AlertDialogCancel className="rounded-xl border-border">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const { key, index } = deletingHeroItem;
                  setSettings((current) => ({
                    ...current,
                    [key]: current[key].filter((_, itemIndex) => itemIndex !== index),
                  }));
                  setDeletingHeroItem(null);
                }}
                className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Integration
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </form>
  );
}

export function UsersManager() {
  const data = useAppData();
  const [users, setUsers] = useState(data.users);

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card space-y-4">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-foreground">Administrators & Roles</h2>
          <p className="text-xs text-muted-foreground">Manage demo administrator accounts and permissions.</p>
        </div>
        <Button
          variant="orange"
          size="sm"
          onClick={() => {
            const next = [
              {
                id: `user-${crypto.randomUUID()}`,
                name: "New Admin",
                email: "new.admin@micronicsdevlon.com",
                role: "Admin" as const,
                active: true,
                createdAt: new Date().toISOString(),
              },
              ...users,
            ];
            setUsers(next);
            updateUsers(next);
            toast.success("Created new administrator demo account.");
          }}
        >
          <Plus className="size-4 mr-1" /> Invite Administrator
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/80">
        <Table>
          <TableHeader className="bg-secondary/40">
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-bold text-xs text-foreground">{user.name}</TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={user.active ? "text-emerald-500 font-bold text-xs" : "text-muted-foreground text-xs"}>
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const next = users.map((u) => (u.id === user.id ? { ...u, active: !u.active } : u));
                      setUsers(next);
                      updateUsers(next);
                    }}
                    className="text-xs"
                  >
                    {user.active ? "Deactivate" : "Activate"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function ActivityManager() {
  const data = useAppData();
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-card space-y-4">
      <div className="border-b border-border/60 pb-4">
        <h2 className="font-display text-lg font-bold text-foreground">System & Content Audit Log</h2>
        <p className="text-xs text-muted-foreground">Historical records of all content modifications and administrator logins.</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border/80">
        <Table>
          <TableHeader className="bg-secondary/40">
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target Resource</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.activity.map((act) => (
              <TableRow key={act.id}>
                <TableCell className="text-xs font-mono text-muted-foreground">
                  {new Date(act.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-xs font-bold text-foreground">{act.actor}</TableCell>
                <TableCell>
                  <span className="rounded bg-secondary px-2 py-0.5 text-xs font-semibold text-foreground">
                    {act.action}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{act.target}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {label}
      {children}
    </label>
  );
}
