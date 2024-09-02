import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createWorkspace = mutation({
  args: {
    name: v.string(),
    organizationId: v.id("organizations"),
    color: v.string(),
    createdBy: v.string(), 
  },
  handler: async (ctx, args) => {
    const { name, organizationId, color, createdBy } = args;

    const workspace = await ctx.db.insert("workspaces", {
      name,
      organizationId,
      createdBy,
      color,
    });

   
    await ctx.db.insert("workspaceMembers", {
      workspaceId: workspace,
      userId: createdBy,
      role: "admin",
    });

    return workspace;
  },
});

export const getWorkspaces = query({
  args: { organizationId: v.id("organizations") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workspaces")
      .withIndex("by_organization", (q) => q.eq("organizationId", args.organizationId))
      .collect();
  },
});

export const getWorkspaceMembers = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workspaceMembers")
      .withIndex("by_workspace_and_user", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();
  },
});