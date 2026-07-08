import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata = {
  title: "Insights | {{PROJECT_NAME}}",
  description: "Practical insight content for {{PROJECT_NAME}}."
};

export default function InsightsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">Insights</p>
      <h1 className="mt-3 text-4xl font-semibold">Useful thinking for practical AI products.</h1>
      <div className="mt-10 grid gap-5">
        {articles.map((article) => (
          <Link className="rounded-lg border border-[var(--border)] bg-white p-6 transition hover:border-[var(--primary)]" href={`/insights/${article.slug}`} key={article.slug}>
            <p className="text-sm text-[var(--muted-foreground)]">{article.date}</p>
            <h2 className="mt-2 text-2xl font-semibold">{article.title}</h2>
            <p className="mt-3 leading-7 text-[var(--muted-foreground)]">{article.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
