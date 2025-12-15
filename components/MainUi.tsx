'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { Check, History } from 'lucide-react'

import TodoInput from '@/app/components/TodoInput'
import TodoList from '@/app/components/TodoList'
import CompletedTodoList from '@/app/components/CompletedTodoList'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

type Task = {
  _id: Id<'tasks'>
  text: string
  completedAt?: number
}

export default function Home() {
  const [isCompletedSidebarOpen, setIsCompletedSidebarOpen] = useState(false)

  const activeTodos = (useQuery(api.tasks.listActive, {}) as Task[] | undefined) || []
  const completedTodos = (useQuery(api.tasks.listCompleted, {}) as Task[] | undefined) || []

  const addTask = useMutation(api.tasks.add)
  const completeTask = useMutation(api.tasks.complete)
  const undoTask = useMutation(api.tasks.undoComplete)
  const deleteTask = useMutation(api.tasks.deleteTask)

  const handleAddTodo = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    await addTask({ text: trimmed })
  }

  const handleToggleComplete = async (todo: Task) => {
    await completeTask({ taskId: todo._id })
  }

  const handleUndoComplete = async (completedTodo: Task) => {
    await undoTask({ taskId: completedTodo._id })
  }

  const handleDeleteTodo = async (todoToDelete: Task) => {
    await deleteTask({ taskId: todoToDelete._id })
  }

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-1">Todo List</h1>
              <p className="text-lg text-slate-400">Your productivty assistant.</p>
            </div>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 shadow-md transition hover:border-indigo-400 hover:text-white"
            >
              <History size={16} />
              Task history
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <main className="lg:col-span-2">
            <TodoInput
              onAddTodo={handleAddTodo}
            />

            <TodoList
              todos={activeTodos}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTodo}
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
          <Check size={24} />
        </button>
      </div>
    </div>
  )
}

