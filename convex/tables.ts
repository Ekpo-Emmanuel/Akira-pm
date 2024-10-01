import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const createTable = mutation({
  args: {
    boardId: v.id("boards"),
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const defaultColumns = [
      { id: "task", name: "Task", type: "text" },
      { 
        id: "status", 
        name: "Status", 
        type: "status",
        config: {
          options: [
            { id: 'notStarted', name: 'Not Started', color: '#797E93' },
            { id: 'inProgress', name: 'In Progress', color: '#F7BC63' },
            { id: 'completed', name: 'Completed', color: '#62D491' },
          ]
        }
      },
      { id: "dueDate", name: "Due Date", type: "date" },
      { id: "assignees", name: "Assignees", type: "people" },
    ];

    const tableId = await ctx.db.insert("tables", {
      boardId: args.boardId,
      name: args.name,
      description: args.description,
      columns: defaultColumns,
      groups: [
        {
          id: "default",
          name: "Default Group",
          rows: [],
        }
      ],
      createdBy: args.createdBy,
      createdAt: Date.now(),
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

// export const addRow = mutation({
//   args: { 
//     tableId: v.id("tables"),
//     rowData: v.object({})
//   },
//   handler: async (ctx, args) => {
//     const table = await ctx.db.get(args.tableId);
//     if (!table) throw new Error("Table not found");

//     const newRow = {
//       id: generateId(), 
//       cells: args.rowData
//     };

//     await ctx.db.patch(args.tableId, {
//       rows: [...table.rows, newRow],
//       updatedAt: Date.now()
//     });

//     return newRow.id;
//   }
// });
