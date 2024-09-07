import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBoard = mutation({
    args: {
      name: v.string(),
      description: v.string(),
      workspaceId: v.id("workspaces"),
      userId: v.id("users"),
    },
    handler: async (ctx, args) => {
      const boardId = await ctx.db.insert("boards", {
        name: args.name,
        description: args.description,
        workspaceId: args.workspaceId,
        createdBy: args.userId,
      });
      
      // Fetch the newly created board to return it
      const newBoard = await ctx.db.get(boardId);
      return newBoard;
    },
});

export const getBoards = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("boards")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .collect();
  },
});