import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addLead, addSubscriber } from "@/services/content";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().min(2, "Company is required").max(120),
  message: z.string().trim().min(8, "Add a short note").max(1000),
});

const newsletterSchema = z.object({ email: z.string().trim().email("Enter a valid email").max(255) });

export function LeadForm({ type = "contact", compact = false }: { type?: "contact" | "demo" | "trial" | "quote"; compact?: boolean }) {
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const label = type === "trial" ? "Start trial" : type === "quote" ? "Request quote" : type === "demo" ? "Request demo" : "Send message";
  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const parsed = leadSchema.safeParse(values);
        if (!parsed.success) {
          setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [issue.path[0] ?? "form", issue.message])));
          return;
        }
        addLead({ type, ...parsed.data });
        setValues({ name: "", email: "", company: "", message: "" });
        setErrors({});
        toast.success("Request submitted successfully", { description: "Thank you! Your inquiry has been received." });
      }}
    >
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field label="Name" error={errors["name"]}><Input value={values.name} onChange={(event) => setValues({ ...values, name: event.target.value })} placeholder="Your name" /></Field>
        <Field label="Work email" error={errors["email"]}><Input value={values.email} onChange={(event) => setValues({ ...values, email: event.target.value })} placeholder="you@company.com" /></Field>
      </div>
      <Field label="Company" error={errors["company"]}><Input value={values.company} onChange={(event) => setValues({ ...values, company: event.target.value })} placeholder="Company name" /></Field>
      <Field label="Message" error={errors["message"]}><Textarea value={values.message} onChange={(event) => setValues({ ...values, message: event.target.value })} placeholder="Tell us what you need to protect" rows={compact ? 3 : 5} /></Field>
      <Button type="submit" variant="orange" size="lg" className="w-full sm:w-fit">{label}<ArrowUpRight /></Button>
    </form>
  );
}

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const parsed = newsletterSchema.safeParse({ email });
        if (!parsed.success) {
          setError(parsed.error.issues[0]?.message ?? "Enter a valid email");
          return;
        }
        addSubscriber(parsed.data.email);
        setEmail("");
        setError("");
        toast.success("Subscribed successfully!", { description: "You will receive updates and bulletins." });
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">Email</label>
      <div className="min-w-0 flex-1">
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input id="newsletter-email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email address" className="pl-9" />
        </div>
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
      <Button type="submit" variant="orange">Join</Button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-foreground">
      {label}
      {children}
      {error && <span className="text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}
