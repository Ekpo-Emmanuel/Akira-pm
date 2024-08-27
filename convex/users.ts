import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const upsertUser = mutation({
    args: {
      kindeId: v.string(),
      email: v.string(),
      name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const { kindeId, email, name } = args;
  
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_kinde_id", (q) => q.eq("kindeId", kindeId))
        .first();
  
      if (existingUser) {
        return await ctx.db.patch(existingUser._id, { email, name });
      } else {
        return await ctx.db.insert("users", { kindeId, email, name });
      }
    },
});

export const getUserOrganization = query({
  args: { kindeId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_kinde_id", (q) => q.eq("kindeId", args.kindeId))
      .first();
    
    if (!user || !user.organizationId) return null;

    const organization = await ctx.db.get(user.organizationId);
    return organization ? organization._id : null;
  },
});