import path from "node:path";
import fs from "fs-extra";
import type { FeatureFlags } from "./types.js";

export async function writeEnvExample(projectDir: string, flags: FeatureFlags): Promise<void> {
  const lines = ["# App", "NEXT_PUBLIC_SITE_URL=http://localhost:3000", ""];

  if (flags.useConvex) {
    lines.push("# Convex", "NEXT_PUBLIC_CONVEX_URL=", "CONVEX_DEPLOYMENT=", "");
  }

  if (flags.useClerk) {
    lines.push(
      "# Clerk",
      "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=",
      "CLERK_SECRET_KEY=",
      "NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in",
      "NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up",
      ""
    );
  }

  if (flags.useStripe) {
    lines.push(
      "# Stripe",
      "STRIPE_SECRET_KEY=",
      "STRIPE_WEBHOOK_SECRET=",
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=",
      "NEXT_PUBLIC_STRIPE_PRICE_ID=",
      ""
    );
  }

  await fs.writeFile(path.join(projectDir, ".env.example"), `${lines.join("\n").trimEnd()}\n`);
}
