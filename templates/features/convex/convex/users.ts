import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("users").order("desc").take(20);
  }
});

export const upsert = mutation({
  args: {
    name: v.string(),
    email: v.string()
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { name: args.name });
      return existing._id;
    }

    return ctx.db.insert("users", {
      ...args,
      createdAt: Date.now()
    });
  }
});
