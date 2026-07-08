import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const latest = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("messages").order("desc").take(10);
  }
});

export const create = mutation({
  args: {
    body: v.string()
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("messages", {
      body: args.body,
      createdAt: Date.now()
    });
  }
});
