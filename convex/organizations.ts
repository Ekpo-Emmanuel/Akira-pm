import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const createOrganization = mutation({
  args: { 
    name: v.string(), 
    userId: v.string() 
  },
  handler: async (ctx, args) => {
    const orgId = await ctx.db.insert("organizations", { 
      name: args.name, 
      ownerId: args.userId 
    });

    const user = await ctx.db
      .query("users")
      .withIndex("by_kinde_id", (q) => q.eq("kindeId", args.userId))
      .first();
    
    if (user) {
      await ctx.db.patch(user._id, { organizationId: orgId });
      
      await ctx.db.insert("organizationMembers", {
        organizationId: orgId,
        userId: user._id,
        role: "admin",
      });

      // Create default workspace
      const workspaceId = await ctx.db.insert("workspaces", {
        name: "Default Workspace",
        organizationId: orgId,
        createdBy: user._id,
        color: "#000000",
        visibility: "public", 
        members: [user._id], 
        description: "" 
      });

      // Add the creator as an admin member of the workspace
      await ctx.db.insert("workspaceMembers", {
        workspaceId,
        userId: user._id,
        role: "admin",
      });

      return { orgId, workspaceId };
    } else {
      throw new Error("User not found");
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
  args: { 
    organizationId: v.id("organizations"), 
    userId: v.string() 
  },
  handler: async (ctx, args) => {
    const { organizationId, userId } = args;

    const existingMembership = await ctx.db.query("organizationMembers")
      .filter(q => q.eq(q.field("organizationId"), organizationId))
      .filter(q => q.eq(q.field("userId"), userId))
      .first();

    if (existingMembership) {
      throw new Error("User is already a member of this organization.");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_kinde_id", (q) => q.eq("kindeId", args.userId))
      .first();

    if(user) {
      await ctx.db.insert("organizationMembers", {
        organizationId: organizationId,
        userId: user._id,
        role: "member",
      });
  
      const organization = await ctx.db.get(args.organizationId);
      if (!organization) {
        throw new Error("Organization not found");
      }
  
      return {
        id: organization._id,
        name: organization.name,
        creatorId: organization.ownerId,
      };
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
    const user = await ctx.db
      .query("users")
      .withIndex("by_kinde_id", (q) => q.eq("kindeId", args.kindeId))
      .first();


      if(user) {
        const organizationMemberships = await ctx.db
          .query("organizationMembers")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .collect();
    
        const memberOrganizationIds = organizationMemberships.map(membership => membership.organizationId);
    
        // Get organizations created by the user
        const createdOrganizations = await ctx.db
          .query("organizations")
          .withIndex("by_ownerId", (q) => q.eq("ownerId", user._id))
          .collect();
    
        const createdOrganizationIds = createdOrganizations.map(org => org._id);
    
        // Combine both sets of organization IDs
        const allOrganizationIds = Array.from(new Set([...memberOrganizationIds, ...createdOrganizationIds]));
    
        // Fetch all relevant organizations
        return await ctx.db
          .query("organizations")
          .filter(q => q.or(...allOrganizationIds.map(id => q.eq(q.field("_id"), id))))
          .collect();
      }
  },
});

export const getOrganizationUsers = query({
  args: { organizationId: v.id("organizations") },
  handler: async (ctx, args) => {
    // First, get all member IDs for the organization
    const memberships = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organization", (q) => q.eq("organizationId", args.organizationId))
      .collect();

    const memberIds = memberships.map(member => member.userId);

    // Then, fetch all users with these IDs
    return await ctx.db
      .query("users")
      .filter((q) => q.or(...memberIds.map(id => q.eq(q.field("kindeId"), id))))
      .collect();
  },
});

export const getOrganizationMembers = query({
  args: { organizationId: v.id("organizations") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("organizationMembers")
      .withIndex("by_organization", (q) => q.eq("organizationId", args.organizationId))
      .collect();

    const membersWithDetails = await Promise.all(members.map(async (member) => {
      const user = await ctx.db
        .query("users")
        .filter(q => q.eq(q.field("_id"), member.userId))
        .first();

      return {
        ...member,
        name: user?.name || "Unknown",
        email: user?.email
      };
    }));

    return membersWithDetails;
  },
});

export const getOrganization = query({
  args: { orgId: v.id("organizations") },
  handler: async (ctx, args) => {
    const organization = await ctx.db.get(args.orgId);
    if (!organization) {
      throw new Error("Organization not found");
    }
    return organization;
  },
});