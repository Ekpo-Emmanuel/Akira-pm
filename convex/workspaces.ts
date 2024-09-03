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

export const getUserWorkspaces = query({
  args: { 
    userId: v.string(),
    organizationId: v.id("organizations")
  },
  handler: async (ctx, args) => {
    const workspaceMemberships = await ctx.db
      .query("workspaceMembers")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    if (workspaceMemberships.length === 0) {
      return [];
    }

    const workspaceIds = workspaceMemberships.map((membership) => membership.workspaceId);

    const workspaces = await ctx.db
      .query("workspaces")
      .filter((q) => 
        q.and(
          q.eq(q.field("organizationId"), args.organizationId),
          q.or(...workspaceIds.map(id => q.eq(q.field("_id"), id)))
        )
      )
      .collect();

    return workspaces.map((workspace) => ({
      id: workspace._id,
      name: workspace.name,
      organizationId: workspace.organizationId,
      createdBy: workspace.createdBy,
      color: workspace.color,
    }));
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
