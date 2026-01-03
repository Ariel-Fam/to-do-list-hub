import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  tasks: defineTable({
    userId: v.string(),
    text: v.string(),
    status: v.union(v.literal('active'), v.literal('completed')),
    createdAt: v.number(),
    completedAt: v.optional(v.number()),
    category: v.optional(v.string()),
    tracking: v.optional(v.boolean()),
  })
    .index('by_user', ['userId'])
    .index('by_user_status', ['userId', 'status'])
    .index('by_user_category_status', ['userId', 'category', 'status'])
    .index('by_user_completed_at', ['userId', 'completedAt']),
  history: defineTable({
    userId: v.string(),
    text: v.string(),
    completedAt: v.optional(v.number()),
    deletedAt: v.number(),
    category: v.optional(v.string()),
    tracking: v.optional(v.boolean()),
  }).index('by_user', ['userId']),
})

