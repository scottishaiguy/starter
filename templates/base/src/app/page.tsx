import { ArrowRight, Blocks, BrainCircuit, CheckCircle2, ShieldCheck } from "lucide-react";
import { stackItems } from "@/data/stack";

const features = [
  {
    title: "Content-first structure",
    description: "A clean App Router foundation for service pages, product pages, and insight-led growth."
  },
  {
    title: "Production-minded defaults",
    description: "Typed folders, practical standards, and space for Convex, Clerk, Stripe, MDX, and assistant features."
  },
  {
    title: "Built for iteration",
    description: "Small components, clear boundaries, and a starter that is ready to grow without a rewrite."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="mx-auto flex w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--primary)] text-sm font-bold text-white">
              SAG
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                Scottish AI Guy
              </p>
              <p className="text-sm text-[var(--muted-foreground)]">{{PROJECT_TYPE}}</p>
            </div>
          </div>
          <a
            className="hidden rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--primary)] sm:inline-flex"
            href="#stack"
          >
            View stack
          </a>
        </header>

        <div className="grid min-h-[70vh] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 inline-flex rounded-md bg-[var(--accent)] px-3 py-1 text-sm font-medium text-[var(--primary)]">
              Scottish AI Guy starter
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-normal sm:text-6xl">
              Build practical AI-ready products with calm, production-grade foundations.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
              {{PROJECT_NAME}} starts with Next.js, TypeScript, Tailwind, sensible folders, and standards for shipping
              useful systems without ceremony.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-foreground)] transition hover:opacity-90"
                href="#cta"
              >
                Start building
                <ArrowRight size={18} />
              </a>
              <a
                className="inline-flex items-center justify-center rounded-md border border-[var(--border)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--primary)]"
                href="#stack"
              >
                Explore stack
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[var(--muted-foreground)]">Starter readiness</p>
                <h2 className="text-2xl font-semibold">Practical by default</h2>
              </div>
              <ShieldCheck className="text-[var(--primary)]" size={28} />
            </div>
            <div className="space-y-4">
              {["App Router", "Server Components", "British English", "SEO and AEO", "Small correct changes"].map(
                (item) => (
                  <div className="flex items-center gap-3 rounded-md bg-[var(--muted)] p-3" key={item}>
                    <CheckCircle2 className="text-[var(--primary)]" size={18} />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-3 sm:px-8 lg:px-10">
          {features.map((feature) => (
            <article className="rounded-lg border border-[var(--border)] p-6" key={feature.title}>
              <Blocks className="mb-5 text-[var(--primary)]" size={26} />
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="mt-3 leading-7 text-[var(--muted-foreground)]">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10" id="stack">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">Stack</p>
            <h2 className="mt-2 text-3xl font-semibold">Ready for the Scottish AI Guy way of working.</h2>
          </div>
          <BrainCircuit className="hidden text-[var(--primary)] sm:block" size={34} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stackItems.map((item) => (
            <div className="rounded-lg border border-[var(--border)] bg-white p-5" key={item.name}>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#101827] px-6 py-16 text-white" id="cta">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#9ee5d8]">Next move</p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold">Shape the starter into the product your users need.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Replace the placeholder content, wire your services, and keep the architecture documents close while the
            app grows.
          </p>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© {{YEAR}} {{PROJECT_NAME}}.</p>
        <p>Built with the Scottish AI Guy starter.</p>
      </footer>
    </main>
  );
}
