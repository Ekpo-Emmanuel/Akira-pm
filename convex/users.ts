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
      .filter((q) => q.eq(q.field("kindeId"), args.kindeId))
      .first();
    
      if (!user) return null;

      const organizationMembership = await ctx.db
        .query("organizationMembers")
        .filter((q) => q.eq(q.field("userId"), user.kindeId))
        .first();
  
      if (!organizationMembership) return null;
  
      return {
        organizationId: organizationMembership.organizationId,
        role: organizationMembership.role
      };
  },
});

export const getOrganizationUsers = query({
  args: { organizationId: v.id("organizations") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("organizationId"), args.organizationId))
      .collect();
  },
});

export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_kinde_id", (q) => q.eq("kindeId", args.userId))
      .first();
  },
});