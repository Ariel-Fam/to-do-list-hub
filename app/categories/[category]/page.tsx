'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { ArrowLeft, Clock3, LayoutGrid } from 'lucide-react'

import TodoInput from '@/app/components/TodoInput'
import TodoList from '@/app/components/TodoList'
import CompletedTodoList from '@/app/components/CompletedTodoList'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

type Task = {
  _id: Id<'tasks'>
  text: string
  completedAt?: number
  category?: string
  tracking?: boolean
}

const LABELS: Record<string, string> = {
  study: 'Study Tasks',
  productivity: 'Productivity Tasks',
  random: 'Random Tasks',
  spiritual: 'Spiritual Tasks',
  social: 'Social Tasks',
  creative: 'Creative Tasks',
  gratitude: 'Gratitude Tasks',
  research: 'Research Tasks',
  fitness: 'Fitness Tasks',
}

export default function CategoryViewPage() {
  const params = useParams()
  const category = typeof params.category === 'string' ? params.category : ''
  const label = useMemo(() => LABELS[category] ?? 'Tasks', [category])

  const [isCompletedSidebarOpen, setIsCompletedSidebarOpen] = useState(false)

  const activeTodos = (useQuery(api.tasks.listActive, { category }) as Task[] | undefined) || []
  const completedTodos = (useQuery(api.tasks.listCompleted, { category }) as Task[] | undefined) || []

  const addTask = useMutation(api.tasks.add)
  const completeTask = useMutation(api.tasks.complete)
  const undoTask = useMutation(api.tasks.undoComplete)
  const deleteTask = useMutation(api.tasks.deleteTask)
  const toggleTrack = useMutation(api.tasks.toggleTracking)

  const handleAddTodo = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    await addTask({ text: trimmed, category })
  }

  const handleToggleComplete = async (todo: Task) => {
    setIsCompletedSidebarOpen(true)
    await completeTask({ taskId: todo._id })
  }

  const handleUndoComplete = async (completedTodo: Task) => {
    await undoTask({ taskId: completedTodo._id })
  }

  const handleDeleteTodo = async (todoToDelete: Task) => {
    await deleteTask({ taskId: todoToDelete._id })
  }

  const handleToggleTrack = async (todo: Task) => {
    await toggleTrack({ taskId: todo._id })
  }

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-300">Category View</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{label}</h1>
            <p className="text-sm text-slate-400">Tasks in this focus area only.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 shadow-sm transition hover:border-indigo-400 hover:text-white"
            >
              <LayoutGrid size={16} />
              Categories
            </Link>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 shadow-sm transition hover:border-indigo-400 hover:text-white"
            >
              <Clock3 size={16} />
              Task history
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/60 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <ArrowLeft size={16} />
              Back to main
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <main className="lg:col-span-2">
            <TodoInput onAddTodo={handleAddTodo} />

            <TodoList
              todos={activeTodos}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
              onToggleTrack={handleToggleTrack}
              loadingAiTaskId={null}
              isAiLoading={false}
            />
          </main>

          <CompletedTodoList
            completedTodos={completedTodos}
            onUndoComplete={handleUndoComplete}
            onDelete={handleDeleteTodo}
            isOpen={isCompletedSidebarOpen}
            setIsOpen={setIsCompletedSidebarOpen}
          />
        </div>

        <button
          onClick={() => setIsCompletedSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110"
          aria-label="Show completed tasks"
        >
          Show Completed
        </button>
      </div>
    </div>
  )
}

