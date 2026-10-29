import { initialData, type AppData, type ContentType, type Lead, type NewsletterSubscriber, type Status } from "@/data/mock";
import { FRONTEND_CONTENT_OVERRIDES } from "@/data/overrides";

const STORAGE_KEY = "micronics-devlon-data-v4";
const AUTH_KEY = "micronics-devlon-admin-auth";
const CHANGE_EVENT = "micronics-data-change";
const API_BASE =
  typeof window !== "undefined"
    ? `http://${window.location.hostname}:8000/api`
    : "http://127.0.0.1:8000/api";

export type EditableCollection = AppData[ContentType];
export type EditableItem = EditableCollection[number];

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";
}

function applyFrontendOverrides(data: AppData): AppData {
  if (!data) return data;
  const collections: (keyof AppData)[] = ["products", "services", "solutions"];
  for (const col of collections) {
    const list = data[col];
    if (Array.isArray(list)) {
      for (const item of list as any[]) {
        if (item?.slug && FRONTEND_CONTENT_OVERRIDES[item.slug]) {
          const ov = FRONTEND_CONTENT_OVERRIDES[item.slug];
          if (ov) {
            item.title = ov.title;
            item.shortDescription = ov.description;
            item.body = ov.description;
            item.seoTitle = ov.title;
            item.seoDescription = ov.description;
          }
        }
      }
    }
  }
  return data;
}

function cloneInitial(): AppData {
  return applyFrontendOverrides(JSON.parse(JSON.stringify(initialData)) as AppData);
}

function canStore() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

const serverSnapshot: AppData = cloneInitial();
let clientSnapshot: AppData | null = null;
let isSyncing = false;
let backendConnected = false;

export function isBackendConnected() {
  return backendConnected;
}

export function getServerAppData(): AppData {
  return applyFrontendOverrides(serverSnapshot);
}

export async function fetchFromBackend(): Promise<AppData | null> {
  try {
    const res = await fetch(`${API_BASE}/app-data/`);
    if (res.ok) {
      const data = applyFrontendOverrides((await res.json()) as AppData);
      backendConnected = true;
      Object.assign(serverSnapshot, data);
      clientSnapshot = data;
      if (canStore()) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
      }
      return data;
    }
  } catch {
    backendConnected = false;
  }
  return null;
}

// Automatically sync on load (both SSR and browser)
if (!isSyncing) {
  isSyncing = true;
  fetchFromBackend().catch(() => undefined);
}

export function getAppData(): AppData {
  if (!canStore()) return applyFrontendOverrides(serverSnapshot);
  if (clientSnapshot !== null) return applyFrontendOverrides(clientSnapshot);

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    clientSnapshot = cloneInitial();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clientSnapshot));
    fetchFromBackend().catch(() => undefined);
    return clientSnapshot;
  }
  try {
    const parsed = JSON.parse(raw) as Partial<AppData>;
    clientSnapshot = applyFrontendOverrides({ ...cloneInitial(), ...parsed } as AppData);
    fetchFromBackend().catch(() => undefined);
    return clientSnapshot;
  } catch {
    clientSnapshot = cloneInitial();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clientSnapshot));
    fetchFromBackend().catch(() => undefined);
    return clientSnapshot;
  }
}

export function saveAppData(data: AppData) {
  clientSnapshot = data;
  if (!canStore()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function subscribeToData(callback: () => void) {
  if (!canStore()) return () => undefined;
  const storageHandler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          clientSnapshot = { ...cloneInitial(), ...JSON.parse(raw) };
        } catch {
          clientSnapshot = cloneInitial();
        }
      } else {
        clientSnapshot = cloneInitial();
      }
      callback();
    }
  };
  const changeHandler = () => {
    callback();
  };
  window.addEventListener(CHANGE_EVENT, changeHandler);
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, changeHandler);
    window.removeEventListener("storage", storageHandler);
  };
}

export function listPublished<T extends { status?: Status; order?: number }>(items: T[]) {
  return [...items].filter((item) => item.status !== "draft").sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function upsertContent(type: ContentType, input: Partial<EditableItem> & { title: string }) {
  const data = getAppData();
  const collection = [...(data[type] as EditableItem[])];
  const now = new Date().toISOString();
  const rawId = input.id && typeof input.id === "string" ? input.id.trim() : "";
  const id = rawId || `${type}-${crypto.randomUUID()}`;
  const existingIndex = rawId ? collection.findIndex((item) => item.id === rawId) : -1;
  const base = existingIndex >= 0 ? collection[existingIndex] : undefined;
  const next = {
    ...base,
    ...input,
    id,
    slug: input.slug ? slugify(input.slug) : slugify(input.title),
    status: input.status ?? base?.status ?? "published",
    order: input.order ?? base?.order ?? collection.length + 1,
    seoTitle: input.seoTitle ?? base?.seoTitle ?? `${input.title} | Micronics Devlon`,
    seoDescription: input.seoDescription ?? base?.seoDescription ?? (input as any).shortDescription ?? "Micronics Devlon content.",
    createdAt: base?.createdAt ?? now,
    updatedAt: now,
  } as EditableItem;
  if (existingIndex >= 0) collection[existingIndex] = next;
  else collection.push(next);
  (data[type] as EditableItem[]) = collection;
  (serverSnapshot[type] as EditableItem[]) = collection;
  addActivity(data, existingIndex >= 0 ? "Edited" : "Created", input.title);
  saveAppData(data);

  // Sync to Django Backend asynchronously
  if (typeof window !== "undefined") {
    fetch(`${API_BASE}/content/${type}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((saved) => {
        if (saved && saved.id) {
          const currentData = getAppData();
          const currList = [...(currentData[type] as EditableItem[])];
          const idx = currList.findIndex((item) => item.id === saved.id || item.id === id);
          if (idx >= 0) {
            currList[idx] = { ...currList[idx], ...saved };
            (currentData[type] as EditableItem[]) = currList;
            (serverSnapshot[type] as EditableItem[]) = currList;
            saveAppData(currentData);
          }
        }
      })
      .catch((err) => console.warn("Backend sync failed:", err));
  }

  return next;
}

export function deleteContent(type: ContentType, id: string) {
  const data = getAppData();
  const collection = data[type] as EditableItem[];
  const found = collection.find((item) => item.id === id);
  const nextList = collection.filter((item) => item.id !== id);
  (data[type] as EditableItem[]) = nextList;
  (serverSnapshot[type] as EditableItem[]) = nextList;
  addActivity(data, "Deleted", found?.title ?? id);
  saveAppData(data);

  // Sync to Django Backend asynchronously
  if (typeof window !== "undefined") {
    fetch(`${API_BASE}/content/${type}/${id}/`, {
      method: "DELETE",
    }).catch((err) => console.warn("Backend delete sync failed:", err));
  }
}

export function addLead(input: Omit<Lead, "id" | "status" | "notes" | "createdAt">) {
  const data = getAppData();
  const lead: Lead = { ...input, id: `lead-${crypto.randomUUID()}`, status: "new", notes: "", createdAt: new Date().toISOString() };
  data.leads = [lead, ...data.leads];
  addActivity(data, "Captured lead", `${input.type}: ${input.email}`);
  saveAppData(data);

  // Sync to Django Backend
  if (typeof window !== "undefined") {
    fetch(`${API_BASE}/leads/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    }).catch((err) => console.warn("Backend lead sync failed:", err));
  }

  return lead;
}

export function updateLead(id: string, patch: Partial<Lead>) {
  const data = getAppData();
  data.leads = data.leads.map((lead) => (lead.id === id ? { ...lead, ...patch } : lead));
  addActivity(data, "Updated lead", id);
  saveAppData(data);

  // Sync to Django Backend
  if (typeof window !== "undefined") {
    fetch(`${API_BASE}/leads/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }).catch((err) => console.warn("Backend lead update failed:", err));
  }
}

export function deleteLead(id: string) {
  const data = getAppData();
  data.leads = data.leads.filter((lead) => lead.id !== id);
  addActivity(data, "Deleted lead", id);
  saveAppData(data);

  // Sync to Django Backend
  if (typeof window !== "undefined") {
    fetch(`${API_BASE}/leads/${id}/`, {
      method: "DELETE",
    }).catch((err) => console.warn("Backend delete lead failed:", err));
  }
}

export function addSubscriber(email: string) {
  const data = getAppData();
  const exists = data.newsletter.some((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!exists) {
    const subscriber: NewsletterSubscriber = { id: `sub-${crypto.randomUUID()}`, email, createdAt: new Date().toISOString() };
    data.newsletter = [subscriber, ...data.newsletter];
    addActivity(data, "Added newsletter subscriber", email);
    saveAppData(data);

    // Sync to Django Backend
    if (typeof window !== "undefined") {
      fetch(`${API_BASE}/newsletter/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch((err) => console.warn("Backend newsletter sync failed:", err));
    }
  }
}

export function updateSettings(settings: AppData["settings"]) {
  const data = getAppData();
  data.settings = settings;
  addActivity(data, "Updated", "Site settings");
  saveAppData(data);

  // Sync to Django Backend
  if (typeof window !== "undefined") {
    fetch(`${API_BASE}/settings/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    }).catch((err) => console.warn("Backend settings sync failed:", err));
  }
}

export function updateUsers(users: AppData["users"]) {
  const data = getAppData();
  data.users = users;
  addActivity(data, "Updated", "Users and roles");
  saveAppData(data);

  // Sync to Django Backend
  if (typeof window !== "undefined") {
    fetch(`${API_BASE}/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users),
    }).catch((err) => console.warn("Backend users sync failed:", err));
  }
}

export function addMedia(file: { name: string; url: string; type: string }) {
  const data = getAppData();
  const item = { id: `media-${crypto.randomUUID()}`, createdAt: new Date().toISOString(), ...file };
  data.media = [item, ...data.media];
  addActivity(data, "Uploaded", file.name);
  saveAppData(data);

  // Sync to Django Backend
  if (typeof window !== "undefined") {
    fetch(`${API_BASE}/media/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    }).catch((err) => console.warn("Backend media sync failed:", err));
  }
}

export function deleteMedia(id: string) {
  const data = getAppData();
  data.media = data.media.filter((item) => item.id !== id);
  addActivity(data, "Deleted media", id);
  saveAppData(data);

  // Sync to Django Backend
  if (typeof window !== "undefined") {
    fetch(`${API_BASE}/media/${id}/`, {
      method: "DELETE",
    }).catch((err) => console.warn("Backend media delete failed:", err));
  }
}

export function exportCsv(rows: Record<string, unknown>[], filename: string) {
  if (!canStore()) return;
  const keys = Object.keys(rows[0] ?? { empty: "" });
  const body = [keys.join(","), ...rows.map((row) => keys.map((key) => JSON.stringify(row[key] ?? "")).join(","))].join("\n");
  const blob = new Blob([body], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function login(email: string, password: string) {
  const ok = email === "admin@micronicsdevlon.com" && password === "Admin123!";
  if (ok && canStore()) window.localStorage.setItem(AUTH_KEY, "true");

  if (typeof window !== "undefined") {
    fetch(`${API_BASE}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) {
          if (canStore()) window.localStorage.setItem(AUTH_KEY, "true");
        }
      })
      .catch(() => undefined);
  }

  return ok;
}

export function logout() {
  if (canStore()) window.localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn() {
  return canStore() && window.localStorage.getItem(AUTH_KEY) === "true";
}

function addActivity(data: AppData, action: string, target: string) {
  data.activity = [{ id: `activity-${crypto.randomUUID()}`, actor: "Demo Admin", action, target, createdAt: new Date().toISOString() }, ...data.activity].slice(0, 150);
}
