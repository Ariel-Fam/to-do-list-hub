'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { ArrowLeft, Trash2, Clock3 } from 'lucide-react'

import { api } from '@/convex/_generated/api'

export default function HistoryPage() {
  const history = useQuery(api.tasks.listHistory, {}) || []
  const clearHistory = useMutation(api.tasks.clearHistory)
  const [isClearing, setIsClearing] = useState(false)

  const handleClear = async () => {
    try {
      setIsClearing(true)
      await clearHistory({})
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-slate-200">
            <Clock3 size={18} className="text-indigo-300" />
            <h1 className="text-2xl font-semibold">Task history</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              disabled={isClearing || history.length === 0}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-100 shadow-sm transition hover:border-red-400 hover:text-white disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-500"
            >
              <Trash2 size={16} />
              {isClearing ? 'Clearing...' : 'Clear history'}
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/60 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <ArrowLeft size={16} />
              Back to tasks
            </Link>
          </div>
        </header>

        {history.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-slate-400">
            Deleted completed tasks will show up here. Nothing yet!
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((entry) => (
              <div
                key={entry._id}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm shadow-indigo-500/10"
              >
                <p className="text-slate-100">{entry.text}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-200 border border-slate-700">
                    {entry.category ? `${entry.category.charAt(0).toUpperCase()}${entry.category.slice(1)} category` : 'Uncategorized'}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                  <span>
                    Completed:{' '}
                    {entry.completedAt ? new Date(entry.completedAt).toLocaleString() : 'Unknown completion time'}
                  </span>
                  <span>Deleted: {new Date(entry.deletedAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

