import { notFound } from "next/navigation";
import { articles } from "@/data/articles";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | {{PROJECT_NAME}}`,
    description: article.description
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">{article.date}</p>
      <h1 className="mt-3 text-4xl font-semibold">{article.title}</h1>
      <p className="mt-5 text-lg leading-8 text-[var(--muted-foreground)]">{article.description}</p>
      <div className="mt-10 rounded-lg border border-[var(--border)] bg-white p-6 leading-8 text-[var(--muted-foreground)]">
        {article.body}
      </div>
    </main>
  );
}
