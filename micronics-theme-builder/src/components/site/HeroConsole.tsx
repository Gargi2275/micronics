import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Boxes,
  Database,
  HardDrive,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Clock,
  Server,
} from "lucide-react";

type WorkloadKey = "cloud" | "vm" | "db" | "nas";

interface WorkloadData {
  id: WorkloadKey;
  label: string;
  icon: typeof Cloud;
  status: string;
  count: string;
  dedup: string;
  rto: string;
  lastBackup: string;
  encryption: string;
  items: { name: string; size: string; status: "synced" | "verified" | "immutable" }[];
}

const workloads: Record<WorkloadKey, WorkloadData> = {
  cloud: {
    id: "cloud",
    label: "Cloud & SaaS",
    icon: Cloud,
    status: "100% Protected",
    count: "2,450 Mailboxes & Drives",
    dedup: "4.6x Saved",
    rto: "< 2.0s",
    lastBackup: "18s ago",
    encryption: "AES-256 GCM",
    items: [
      { name: "Microsoft 365 Exchange & Teams", size: "14.2 TB", status: "immutable" },
      { name: "Google Workspace Corporate Drive", size: "8.6 TB", status: "verified" },
      { name: "SharePoint Document Libraries", size: "19.4 TB", status: "synced" },
    ],
  },
  vm: {
    id: "vm",
    label: "Virtual Machines",
    icon: Boxes,
    status: "Zero RPO Drift",
    count: "128 Host Nodes & VMs",
    dedup: "5.2x Saved",
    rto: "< 1.4s",
    lastBackup: "45s ago",
    encryption: "Zero-Knowledge Key",
    items: [
      { name: "VMware vSphere Cluster (Prod)", size: "48.0 TB", status: "immutable" },
      { name: "Hyper-V Failover Core Node", size: "26.5 TB", status: "verified" },
      { name: "Proxmox Backup Virtual Disk", size: "12.0 TB", status: "synced" },
    ],
  },
  db: {
    id: "db",
    label: "Databases",
    icon: Database,
    status: "Continuous WAL Stream",
    count: "42 Multi-Master Instances",
    dedup: "3.9x Saved",
    rto: "< 0.8s",
    lastBackup: "4s ago",
    encryption: "Hardware HSM Token",
    items: [
      { name: "PostgreSQL Production Main (Primary)", size: "4.2 TB", status: "immutable" },
      { name: "Microsoft SQL Server OLTP", size: "7.8 TB", status: "verified" },
      { name: "Oracle Enterprise RAC Database", size: "15.1 TB", status: "synced" },
    ],
  },
  nas: {
    id: "nas",
    label: "NAS & Endpoints",
    icon: HardDrive,
    status: "Air-Gapped Sync",
    count: "450+ Managed Endpoints",
    dedup: "4.1x Saved",
    rto: "< 3.0s",
    lastBackup: "1m ago",
    encryption: "Hardware TPM 2.0",
    items: [
      { name: "Synology Enterprise Storage Array", size: "64.0 TB", status: "immutable" },
      { name: "QNAP Object Vault (Air-Gapped)", size: "32.0 TB", status: "verified" },
      { name: "Engineering Workstations Pool", size: "18.4 TB", status: "synced" },
    ],
  },
};

export function HeroConsole() {
  const [selected, setSelected] = useState<WorkloadKey>("cloud");
  const [restoring, setRestoring] = useState(false);
  const [restoreStep, setRestoreStep] = useState(0);
  const [restoreComplete, setRestoreComplete] = useState(false);

  const current = workloads[selected];

  const triggerRestoreSimulation = () => {
    if (restoring) return;
    setRestoring(true);
    setRestoreStep(1);
    setRestoreComplete(false);

    setTimeout(() => setRestoreStep(2), 500);
    setTimeout(() => setRestoreStep(3), 1100);
    setTimeout(() => {
      setRestoreStep(4);
      setRestoreComplete(true);
      setRestoring(false);
    }, 1800);
  };

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      {/* Luminous Backdrop Glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-amber-500/15 opacity-70 blur-2xl dark:opacity-80" />

      {/* Main Console Frame */}
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-950/85 p-1 text-slate-100 shadow-2xl backdrop-blur-2xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <span className="flex size-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="text-xs font-bold tracking-wide text-slate-200">
              MICRONICS LIVE VAULT
            </span>
            <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
              v4.8 • ACTIVE
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-emerald-400">
              <ShieldCheck className="size-3.5" /> Immutable Lock
            </span>
            <span className="font-mono text-[11px]">Lat: 12ms</span>
          </div>
        </div>

        {/* Workload Tab Selectors */}
        <div className="grid grid-cols-2 gap-1 p-2 sm:grid-cols-4 bg-white/[0.01] border-b border-white/5">
          {(Object.keys(workloads) as WorkloadKey[]).map((key) => {
            const item = workloads[key];
            const Icon = item.icon;
            const isActive = selected === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelected(key)}
                className={`group flex items-center justify-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white shadow-md shadow-blue-500/25 border border-blue-400/30"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-200 border border-transparent"
                }`}
              >
                <Icon className={`size-3.5 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Workload Display Area */}
        <div className="p-4 sm:p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {/* Telemetry Pills */}
              <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                  <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Status</div>
                  <div className="mt-0.5 text-xs font-bold text-emerald-400 flex items-center gap-1 truncate">
                    <CheckCircle2 className="size-3 shrink-0" />
                    {current.status}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                  <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Deduplication</div>
                  <div className="mt-0.5 text-xs font-bold text-blue-400 flex items-center gap-1">
                    <Zap className="size-3 text-amber-400" />
                    {current.dedup}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                  <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Recovery RTO</div>
                  <div className="mt-0.5 text-xs font-bold text-amber-400 flex items-center gap-1 font-mono">
                    <Clock className="size-3" />
                    {current.rto}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                  <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">Encryption</div>
                  <div className="mt-0.5 text-xs font-bold text-slate-200 flex items-center gap-1 truncate">
                    <Lock className="size-3 text-indigo-400" />
                    {current.encryption}
                  </div>
                </div>
              </div>

              {/* Workload Protected Items List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 px-1">
                  <span>Target Repositories</span>
                  <span>Sync Status</span>
                </div>
                {current.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2 text-xs transition-colors hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Server className="size-3.5 text-blue-400 shrink-0" />
                      <span className="font-medium text-slate-200 truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[11px] text-slate-400">{item.size}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          item.status === "immutable"
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            : item.status === "verified"
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Instant Restore Simulation Interactive Action */}
          <div className="mt-4 rounded-xl border border-indigo-500/30 bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900/60 p-3.5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                  <Sparkles className="size-3.5 text-amber-400" />
                  Instant Restore Engine
                </div>
                <div className="text-[11px] text-slate-400">
                  {restoring
                    ? "Executing sub-second sandbox restore verification..."
                    : restoreComplete
                    ? "Restore completed in 1.18s with 100% SHA-256 match ✅"
                    : "Simulate a live zero-downtime file & VM restore drill"}
                </div>
              </div>

              <button
                type="button"
                onClick={triggerRestoreSimulation}
                disabled={restoring}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-60"
              >
                {restoring ? (
                  <>
                    <RefreshCw className="size-3.5 animate-spin" />
                    Validating...
                  </>
                ) : (
                  <>
                    <Zap className="size-3.5" />
                    Test 1.2s Restore
                  </>
                )}
              </button>
            </div>

            {/* Stepper progress if restoring */}
            {restoring && (
              <div className="mt-3 space-y-1.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 via-amber-400 to-emerald-400"
                    initial={{ width: "10%" }}
                    animate={{ width: restoreStep === 1 ? "35%" : restoreStep === 2 ? "70%" : "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>
                    {restoreStep === 1 && "1/3 Verifying block checksums..."}
                    {restoreStep === 2 && "2/3 Decrypting policy key..."}
                    {restoreStep >= 3 && "3/3 Instant sandbox mounting..."}
                  </span>
                  <span className="text-emerald-400 font-bold">RTO &lt; 1.2s</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Console Footer Stats Ribbon */}
        <div className="border-t border-white/10 bg-black/40 px-4 py-2.5 text-slate-400 text-[11px] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-slate-300 font-semibold">Protected: 14,280 Workloads</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-emerald-400">Zero Restore Failures</span>
          </div>
          <span className="font-mono text-slate-400">Global Sync: 99.999% SLA</span>
        </div>
      </div>
    </div>
  );
}
