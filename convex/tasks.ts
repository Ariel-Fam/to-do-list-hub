import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

const requireUserId = async (ctx: { auth: any }) => {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) {
    throw new Error('Not authenticated')
  }
  return identity.subject
}

export const listActive = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, { category }) => {
    const userId = await requireUserId(ctx)
    const baseQuery = category
      ? ctx.db
          .query('tasks')
          .withIndex('by_user_category_status', (q) => q.eq('userId', userId).eq('category', category).eq('status', 'active'))
      : ctx.db.query('tasks').withIndex('by_user_status', (q) => q.eq('userId', userId).eq('status', 'active'))
    return await baseQuery.order('desc').collect()
  },
})

export const listCompleted = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, { category }) => {
    const userId = await requireUserId(ctx)
    const baseQuery = category
      ? ctx.db
          .query('tasks')
          .withIndex('by_user_category_status', (q) => q.eq('userId', userId).eq('category', category).eq('status', 'completed'))
      : ctx.db.query('tasks').withIndex('by_user_status', (q) => q.eq('userId', userId).eq('status', 'completed'))

    const tasks = await baseQuery.collect()
    return tasks.sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0))
  },
})

export const add = mutation({
  args: { text: v.string(), category: v.optional(v.string()) },
  handler: async (ctx, { text, category }) => {
    const userId = await requireUserId(ctx)
    return await ctx.db.insert('tasks', {
      userId,
      text,
      status: 'active',
      createdAt: Date.now(),
      category,
      tracking: false,
    })
  },
})

export const complete = mutation({
  args: { taskId: v.id('tasks') },
  handler: async (ctx, { taskId }) => {
    const userId = await requireUserId(ctx)
    const task = await ctx.db.get(taskId)
    if (!task) {
      throw new Error('Task not found')
    }
    if (task.userId !== userId) {
      throw new Error('Unauthorized')
    }
    if (task.status === 'completed') return taskId
    await ctx.db.patch(taskId, { status: 'completed', completedAt: Date.now() })
    return taskId
  },
})

export const undoComplete = mutation({
  args: { taskId: v.id('tasks') },
  handler: async (ctx, { taskId }) => {
    const userId = await requireUserId(ctx)
    const task = await ctx.db.get(taskId)
    if (!task) {
      throw new Error('Task not found')
    }
    if (task.userId !== userId) {
      throw new Error('Unauthorized')
    }
    await ctx.db.patch(taskId, { status: 'active', completedAt: undefined })
    return taskId
  },
})

export const deleteTask = mutation({
  args: { taskId: v.id('tasks') },
  handler: async (ctx, { taskId }) => {
    const userId = await requireUserId(ctx)
    const task = await ctx.db.get(taskId)
    if (!task) {
      return null
    }
    if (task.userId !== userId) {
      throw new Error('Unauthorized')
    }

    await ctx.db.insert('history', {
      userId,
      text: task.text,
      completedAt: task.completedAt,
      deletedAt: Date.now(),
      category: task.category,
      tracking: task.tracking,
    })

    await ctx.db.delete(taskId)
    return taskId
  },
})

export const replaceWithSubtasks = mutation({
  args: { taskId: v.id('tasks'), subtasks: v.array(v.string()) },
  handler: async (ctx, { taskId, subtasks }) => {
    const userId = await requireUserId(ctx)
    const task = await ctx.db.get(taskId)
    if (!task) {
      throw new Error('Task not found')
    }
    if (task.userId !== userId) {
      throw new Error('Unauthorized')
    }
    await ctx.db.delete(taskId)

    const inserts = subtasks.map((text) =>
      ctx.db.insert('tasks', {
        userId,
        text,
        status: 'active',
        createdAt: Date.now(),
        category: task.category,
        tracking: false,
      }),
    )
    await Promise.all(inserts)
    return true
  },
})

export const toggleTracking = mutation({
  args: { taskId: v.id('tasks') },
  handler: async (ctx, { taskId }) => {
    const userId = await requireUserId(ctx)
    const task = await ctx.db.get(taskId)
    if (!task) throw new Error('Task not found')
    if (task.userId !== userId) throw new Error('Unauthorized')
    const next = !task.tracking
    await ctx.db.patch(taskId, { tracking: next })
    return next
  },
})

export const listHistory = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUserId(ctx)
    const entries = await ctx.db
      .query('history')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
    return entries.sort((a, b) => b.deletedAt - a.deletedAt)
  },
})

export const clearHistory = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUserId(ctx)
    const entries = await ctx.db
      .query('history')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect()
    await Promise.all(entries.map((entry) => ctx.db.delete(entry._id)))
    return entries.length
  },
})

