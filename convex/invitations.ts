import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createInvitation = mutation({
  args: {
    organizationId: v.id("organizations"),
    email: v.string(),
    role: v.string(),
  },
  handler: async (ctx, args) => {
    const { organizationId, email, role } = args;

    // Check if the user making the invitation is authenticated
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Check if the user is part of the organization (you might need to adjust this based on your user schema)
    const user = await ctx.db
      .query("users")
      .withIndex("by_kinde_id", (q) => q.eq("kindeId", identity.subject))
      .first();

    if (!user || user.organizationId !== organizationId) {
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
    });

    // Here you would typically send an email to the invited user
    // For now, we'll just log it
    console.log(`Invitation sent to ${email} for organization ${organizationId} with role ${role}`);

    return invitationId;
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

export const acceptInvitation = mutation({
  args: { invitationId: v.id("invitations"), userId: v.string() },
  handler: async (ctx, args) => {
    const { invitationId, userId } = args;
    
    const invitation = await ctx.db.get(invitationId);
    if (!invitation || invitation.status !== "pending") {
      throw new Error("Invalid or already processed invitation");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_kinde_id", (q) => q.eq("kindeId", userId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, { organizationId: invitation.organizationId });
    await ctx.db.patch(invitationId, { status: "accepted" });
  },
});

export const getPendingInvitations = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const pendingInvitations = await ctx.db
      .query("invitations")
      .withIndex("by_email_and_org", (q) => q.eq("email", args.email))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .collect();

    // Fetch organization details for each invitation
    const invitationsWithOrgDetails = await Promise.all(
      pendingInvitations.map(async (invitation) => {
        const organization = await ctx.db.get(invitation.organizationId);
        return {
          ...invitation,
          organizationName: organization?.name || "Unknown Organization"
        };
      })
    );

    return invitationsWithOrgDetails;
  },
});