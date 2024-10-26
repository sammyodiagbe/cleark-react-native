import { query } from "../_generated/server";
import { v } from "convex/values";


export const getTasks = query({
    args: { name: v.string(), description: v.string() },
 handler: async (ctx, args) => {
    const { name, description } = args;
    const tasks = await ctx.db.query("tasks").take(10);

    return tasks;
 }
})