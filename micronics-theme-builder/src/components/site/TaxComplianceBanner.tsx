import { FileText, IndianRupee, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TaxComplianceBannerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const taxComplianceText = {
  firstParagraph:
    "Rule 46(8) of the Income-tax Rules 2026, effective 1 April 2026, requires every business or professional that keeps electronic books of account to take a daily backup and store it on servers physically located in India. The rule applies to entities covered under Sections 62 and 63 of the Income-tax Act 2025. Non-compliance can attract a penalty of ₹25,000, and auditors who certify incorrect details face an additional ₹10,000 penalty.",
  secondParagraph:
    "Rule 46(8) is already in force for the tax year 2026–27. The first tax audit reports under Form No. 26, which will request server location and backup details, will be filed for this year. Businesses that have not yet reviewed their backup setup, confirmed their service provider’s server location or implemented a daily automated backup are running a compliance gap that will surface at audit time.",
};

export function TaxComplianceBanner({ isOpen, onOpenChange }: TaxComplianceBannerProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(true)}
        className="group relative mt-6 block w-full overflow-hidden rounded-3xl border border-amber-300/70 bg-slate-950 text-left shadow-2xl shadow-amber-950/10 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-amber-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 dark:border-amber-500/30"
        aria-label="Open Rule 46(8) tax compliance guidance"
      >
        <img
          src="/images/tax-compliance-rule-46-8.svg"
          alt="Business professionals: why pay ₹25,000? Learn how to avoid this penalty with audit-ready backups."
          className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </button>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-3xl border-amber-200/70 bg-card p-0 shadow-2xl dark:border-amber-500/30">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-8 text-white sm:px-8">
            <DialogHeader className="text-left">
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/30">
                <ShieldCheck className="size-6" />
              </div>
              <DialogTitle className="font-display text-2xl font-black sm:text-3xl">
                Avoid the ₹25,000 compliance penalty
              </DialogTitle>
              <DialogDescription className="mt-2 text-slate-300">
                What businesses and professionals should prepare for Rule 46(8).
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-5 px-6 py-6 sm:px-8">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-200">
                <IndianRupee className="size-4" />
                Daily backup + India-located servers
              </div>
              <p className="mt-2 text-sm leading-6 text-amber-950/80 dark:text-amber-100/80">
                Review your backup setup, confirm your provider’s server location, and automate daily backups before audit time.
              </p>
            </div>

            <div className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>{taxComplianceText.firstParagraph}</p>
              <p>{taxComplianceText.secondParagraph}</p>
            </div>

            <a
              href="/references/En-Notified-IT-Rules-2026-20-03-2026.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-3 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
            >
              <FileText className="size-4 text-primary" />
              View reference notification (PDF)
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
