import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const createTable = mutation({
    args: {
      boardId: v.id("boards"),
      name: v.string(),
      description: v.optional(v.string()),
      createdBy: v.id("users"),
    },
    handler: async (ctx, args) => {
      const tableId = await ctx.db.insert("tables", {
        boardId: args.boardId,
        name: args.name,
        description: args.description,
        columns: [],
        rows: [],
        createdBy: args.createdBy,
        updatedAt: Date.now(),
      });
      return tableId;
    },
});

export const getTables = query({
    args: { boardId: v.id("boards") },
    handler: async (ctx, args) => {
      return await ctx.db
        .query("tables")
        .withIndex("by_boardId", (q) => q.eq("boardId", args.boardId))
        .collect();
    },
});

export const getTable = query({
  args: { tableId: v.id("tables") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.tableId);
  },
})

function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const addRow = mutation({
  args: { 
    tableId: v.id("tables"),
    rowData: v.object({})
  },
  handler: async (ctx, args) => {
    const table = await ctx.db.get(args.tableId);
    if (!table) throw new Error("Table not found");

    const newRow = {
      id: generateId(), 
      cells: args.rowData
    };

    await ctx.db.patch(args.tableId, {
      rows: [...table.rows, newRow],
      updatedAt: Date.now()
    });

    return newRow.id;
  }
});
