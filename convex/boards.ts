import { mutation, query } from "./_generated/server";
import { Column } from "@/app/types";
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
      
      const defaultColumns: Column[] = [
        { id: "task", name: "Task", type: "text" },
        { 
          id: "status", 
          name: "Status", 
          type: "status",
          options: [
            { id: 'notStarted', name: 'Not Started', color: '#797E93' },
            { id: 'inProgress', name: 'In Progress', color: '#F7BC63' },
            { id: 'completed', name: 'Completed', color: '#62D491' },
          ]
        },
        { id: "dueDate", name: "Due Date", type: "date" },
        { id: "assignees", name: "Assignees", type: "people" },
      ];


      await ctx.db.insert("tables", {
        boardId,
        name: "Main Table",
        description: "First table in this board",
        columns: defaultColumns,
        groups: [
          {
            id: "default",
            name: "Default Group",
            rows: [],
          }
        ],
        createdBy: args.userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

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

export const getSingleBoard = query({
  args: { boardId: v.id("boards") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.boardId);
  },
})