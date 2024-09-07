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

  organizationMembers: defineTable({
    organizationId: v.id("organizations"),
    userId: v.string(),
    role: v.string(), 
  })
  .index("by_organization", ["organizationId"])
  .index("by_user", ["userId"]),

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
    description: v.optional(v.string()),
    visibility: v.string(),
    members: v.optional(v.array(v.id("users"))),
  }).index("by_organization", ["organizationId"]),

  workspaceMembers: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.string(),
    role: v.string(),
  }).index("by_workspace_and_user", ["workspaceId", "userId"]),

  boards: defineTable({
    workspaceId: v.id("workspaces"),
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.id("users"),
  }),

  tables: defineTable({
    boardId: v.id("boards"),
    name: v.string(),
    columns: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        type: v.union(v.literal("text"), v.literal("number"), v.literal("date"), v.literal("select"), v.literal("multiselect")),
        options: v.optional(v.array(v.string())),
      })
    ),
    groups: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
      })
    ),
    createdBy: v.id("users"),
  }),

  rows: defineTable({
    tableId: v.id("tables"),
    groupId: v.string(),
    // data: v.object({
    //   // This allows any string key with any value
    //   "": v.any()
    // }),
    createdBy: v.id("users"),
    updatedAt: v.number(),
  }),

});