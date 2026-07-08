import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--primary)]">Protected dashboard</p>
      <h1 className="mt-3 text-4xl font-semibold">Welcome{user?.firstName ? `, ${user.firstName}` : ""}</h1>
      <p className="mt-4 max-w-2xl leading-7 text-[var(--muted-foreground)]">
        This route is protected by Clerk middleware and ready for product-specific dashboard work.
      </p>
    </main>
  );
}
