export interface ContentOverride {
  title: string;
  description: string;
}

export const FRONTEND_CONTENT_OVERRIDES: Record<string, ContentOverride> = {
  // 1. CrestVault Server
  "crestvault-server": {
    title: "SQL Backup & Server Cloud Data Backup System | CrestVault Server",
    description:
      "Advanced server data backup system for Microsoft SQL, MySQL, VMware, Hyper-V, and Tally Prime Server. CrestVault Server offers continuous data protection, sub-minute RPO, and application-aware cloud backup for business continuity.",
  },
  // 2. CrestVault Endpoint
  "crestvault-endpoint": {
    title: "Endpoint Data Backup Software for PC & Mac | CrestVault Endpoint",
    description:
      "Automated cloud data backup for corporate laptops and desktops. CrestVault Endpoint provides silent background sync, granular file recovery, and ransomware rollback without impacting employee productivity.",
  },
  // 3. CrestVault GO
  "crestvault-go": {
    title: "Instant Tally Backup & Desktop Cloud Backup Solution | CrestVault GO",
    description:
      "1-Click automated Tally backup and PC data protection. CrestVault GO is a plug-and-play cloud data backup solution designed for SMEs and CAs. Start securing your financial data in under 60 seconds.",
  },
  // 4. Statutory Compliance Vault
  "statutory-compliance": {
    title: "DPDP Act & IT Rule 46 Compliant Cloud Data Backup | Micronics Devlon",
    description:
      "Ensure legal compliance with our WORM-immutable data backup system. Engineered for the DPDP Act 2023 and Income Tax Rule 46, guaranteeing 7-year data retention and zero-loss audit readiness in sovereign Indian data centers.",
  },
  // 5. Google Workspace / Microsoft 365 SaaS Backup
  "saas-backup": {
    title: "Cloud-to-Cloud Data Backup for Google Workspace & M365 | Micronics Devlon",
    description:
      "Comprehensive cloud data backup software for Google Drive, Gmail, and Microsoft 365. Safeguard your SaaS data against accidental deletion and cyber threats with automated scheduling and unlimited retention.",
  },
  // 6. CrestVault Core
  "crestvault-core": {
    title: "Centralized Cloud Data Backup Management System | CrestVault Core",
    description:
      "Multi-tenant cloud backup console for IT administrators. Manage all data backup software endpoints, monitor storage usage, configure global encryption policies, and generate compliance reports from a single pane of glass.",
  },
};
