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
    }
    return orgId;
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
  },
  handler: async (ctx, args) => {
    const { organizationId, email, role } = args;

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
    await ctx.db.insert("invitations", {
      organizationId,
      email,
      role,
      status: "pending",
    });

    // Here you would typically send an email to the invited user
    // For now, we'll just log it
    console.log(`Invitation sent to ${email} for organization ${organizationId} with role ${role}`);
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