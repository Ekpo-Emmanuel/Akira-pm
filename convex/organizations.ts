import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrganization = mutation({
  args: { name: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    const orgId = await ctx.db.insert("organizations", { name: args.name, ownerId: args.userId });
    const user = await ctx.db
      .query("users")
      .withIndex("by_kinde_id", (q) => q.eq("kindeId", args.userId))
      .first();
    
    if (user) {
      await ctx.db.patch(user._id, { organizationId: orgId });
      
      // Create default workspace
      const workspaceId = await ctx.db.insert("workspaces", {
        name: "Default Workspace",
        organizationId: orgId,
        createdBy: user._id,
        color: "#000000",
      });

      // Add the creator as an admin member
      await ctx.db.insert("workspaceMembers", {
        workspaceId,
        userId: user._id,
        role: "admin",
      });


      return { orgId, workspaceId };
    }
  },
});

export const getOrganizationDetails = query({
  args: { organizationId: v.id("organizations") },
  handler: async (ctx, args) => {
    const organization = await ctx.db.get(args.organizationId);
    if (!organization) {
      throw new Error("Organization not found");
    }
    return organization;
  },
});

export const joinOrganization = mutation({
  args: { orgId: v.id("organizations"), userId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_kinde_id", (q) => q.eq("kindeId", args.userId))
      .first();
    
    if (user) {
      await ctx.db.patch(user._id, { organizationId: args.orgId });
    }
  },
});

export const inviteUserToOrganization = mutation({
  args: {
    organizationId: v.id("organizations"),
    email: v.string(),
    role: v.string(),
    senderId: v.string(), 
  },
  handler: async (ctx, args) => {
    const { organizationId, email, role, senderId } = args;

    // Check if the sender is part of the organization
    const sender = await ctx.db
      .query("users")
      .withIndex("by_kinde_id", (q) => q.eq("kindeId", senderId))
      .first();

    if (!sender || sender.organizationId !== organizationId) {
      throw new Error("Not authorized to invite to this organization");
    }

    // Check if invitation already exists
    const existingInvitation = await ctx.db
      .query("invitations")
      .withIndex("by_email_and_org", (q) => 
        q.eq("email", email).eq("organizationId", organizationId)
      )
      .first();

    if (existingInvitation) {
      throw new Error("Invitation already sent to this email for this organization");
    }

    // Create new invitation
    const invitationId = await ctx.db.insert("invitations", {
      organizationId,
      email,
      role,
      status: "pending",
      senderId,
    });

    console.log(`Invitation created for ${email} for organization ${organizationId} with role ${role} by sender ${senderId}`);

    return invitationId;
  },
});

export const getOrganizationInvitations = query({
  args: { organizationId: v.id("organizations") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("invitations")
      .filter((q) => q.eq(q.field("organizationId"), args.organizationId))
      .collect();
  },
});

export const getUserOrganizations = query({
  args: { kindeId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("organizations")
      .withIndex("by_ownerId", (q) => q.eq("ownerId", args.kindeId)) // Use the correct index and field
      .collect();
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