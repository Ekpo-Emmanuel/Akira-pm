import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    kindeId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    organizationId: v.optional(v.id("organizations")),
  })
  .index("by_kinde_id", ["kindeId"])
  .index("by_email", ["email"]),

  organizations: defineTable({
    name: v.string(),
    ownerId: v.string(),
  })
  .index("by_ownerId", ["ownerId"]),

  invitations: defineTable({
    organizationId: v.id("organizations"),
    email: v.string(),
    role: v.string(),
    status: v.string(),
    senderId: v.string(),
  }).index("by_email_and_org", ["email", "organizationId"])
  .index("by_email", ["email"]),
  
  workspaces: defineTable({
    name: v.string(),
    organizationId: v.id("organizations"),
    createdBy: v.string(),
    color: v.string(), 
  }).index("by_organization", ["organizationId"]),

  workspaceMembers: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.string(),
    role: v.string(),
  }).index("by_workspace_and_user", ["workspaceId", "userId"]),
});