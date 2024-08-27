import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    kindeId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    organizationId: v.optional(v.id("organizations")),
  }).index("by_kinde_id", ["kindeId"]),

  organizations: defineTable({
    name: v.string(),
    ownerId: v.string(),
  }),

  invitations: defineTable({
    organizationId: v.id("organizations"),
    email: v.string(),
    role: v.string(),
    status: v.string(),
  }).index("by_email_and_org", ["email", "organizationId"]),
});