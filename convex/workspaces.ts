import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createWorkspace = mutation({
  args: {
    name: v.string(),
    organizationId: v.id("organizations"),
    color: v.string(),
    createdBy: v.string(), 
    description: v.optional(v.string()),
    visibility: v.string(),
    members: v.optional(v.array(v.id("users"))),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.insert("workspaces", {
      ...args,
      members: args.visibility === 'private' ? args.members || [] : [],
    });
   
    await ctx.db.insert("workspaceMembers", {
      workspaceId: workspace,
      userId: args.createdBy,
      role: "admin",
    });

    const createdWorkspace = await ctx.db.get(workspace);
    return createdWorkspace; 
  },
});

export const getUserWorkspaces = query({
  args: { 
    userId: v.string(),
    organizationId: v.id("organizations")
  },
  handler: async (ctx, args) => {
    // Fetch all workspace memberships for the user
    const workspaceMemberships = await ctx.db
      .query("workspaceMembers")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    // Extract workspace IDs from memberships
    const workspaceIds = workspaceMemberships.map((membership) => membership.workspaceId);

    // Fetch all workspaces in the organization
    const allWorkspaces = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("organizationId"), args.organizationId))
      .collect();

    // Filter workspaces based on visibility and membership
    const visibleWorkspaces = allWorkspaces.filter((workspace) => 
      workspace.visibility === 'public' || 
      workspaceIds.includes(workspace._id) || 
      workspace.createdBy === args.userId
    );

    // Map the workspaces to the desired format
    return visibleWorkspaces.map((workspace) => ({
      id: workspace._id,
      name: workspace.name,
      organizationId: workspace.organizationId,
      createdBy: workspace.createdBy,
      color: workspace.color,
      visibility: workspace.visibility,
    }));
  },
});

//Get single Workspace
export const getWorkspace = query({
  args: { id: v.id('workspaces') },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.id);
    
    if (!workspace) {
      return null;
    }

    return {
      id: workspace._id,
      name: workspace.name,
      description: workspace.description,
      color: workspace.color,
      createdBy: workspace.createdBy,
      organizationId: workspace.organizationId,
    };
  },
});

//get all workspaces
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

export const deleteWorkspace = mutation({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const { workspaceId } = args;

    await ctx.db.delete(workspaceId);

    const workspaceMembers = await ctx.db.query("workspaceMembers")
      .filter(q => q.eq(q.field("workspaceId"), workspaceId))
      .collect();

    for (const member of workspaceMembers) {
      await ctx.db.delete(member._id);
    }

    return { success: true };
  },
});