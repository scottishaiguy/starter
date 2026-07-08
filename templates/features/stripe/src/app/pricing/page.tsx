import { CheckCircle2 } from "lucide-react";

const features = ["Practical onboarding", "Production-ready foundations", "Clear support path"];

export default function PricingPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">Pricing</p>
      <h1 className="mt-3 text-4xl font-semibold">Simple pricing for useful products.</h1>
      <div className="mt-10 max-w-md rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-[var(--muted-foreground)]">Starter</p>
        <p className="mt-3 text-4xl font-semibold">£49</p>
        <p className="mt-2 text-[var(--muted-foreground)]">Replace this plan with your Stripe Checkout flow.</p>
        <ul className="mt-6 space-y-3">
          {features.map((feature) => (
            <li className="flex items-center gap-3" key={feature}>
              <CheckCircle2 className="text-[var(--primary)]" size={18} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
