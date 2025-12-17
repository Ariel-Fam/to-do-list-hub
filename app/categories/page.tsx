'use client'

import Link from 'next/link'
import { BookOpen, Zap, Shuffle, Sparkles, ArrowLeft, Clock3, Users, Palette, Heart, Microscope } from 'lucide-react'

const categories = [
  { slug: 'study', label: 'Study Tasks', icon: BookOpen, color: 'text-amber-300', bg: 'from-amber-500/10 to-amber-500/5' },
  { slug: 'productivity', label: 'Productivity Tasks', icon: Zap, color: 'text-emerald-300', bg: 'from-emerald-500/10 to-emerald-500/5' },
  { slug: 'random', label: 'Random Tasks', icon: Shuffle, color: 'text-blue-300', bg: 'from-blue-500/10 to-blue-500/5' },
  { slug: 'spiritual', label: 'Spiritual Tasks', icon: Sparkles, color: 'text-purple-300', bg: 'from-purple-500/10 to-purple-500/5' },
  { slug: 'social', label: 'Social Tasks', icon: Users, color: 'text-cyan-300', bg: 'from-cyan-500/10 to-cyan-500/5' },
  { slug: 'creative', label: 'Creative Tasks', icon: Palette, color: 'text-pink-300', bg: 'from-pink-500/10 to-pink-500/5' },
  { slug: 'gratitude', label: 'Gratitude Tasks', icon: Heart, color: 'text-rose-300', bg: 'from-rose-500/10 to-rose-500/5' },
  { slug: 'research', label: 'Research Tasks', icon: Microscope, color: 'text-lime-300', bg: 'from-lime-500/10 to-lime-500/5' },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-200">
            <Sparkles size={18} className="text-indigo-300" />
            <h1 className="text-2xl font-semibold">Choose a category</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
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

        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map(({ slug, label, icon: Icon, color, bg }) => (
            <Link
              key={slug}
              href={`/categories/${slug}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg transition hover:-translate-y-1 hover:border-indigo-400/70 hover:shadow-indigo-500/20"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${bg} opacity-50 group-hover:opacity-80 transition`} />
              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80">
                  <Icon className={color} size={24} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{label}</p>
                  <p className="text-sm text-slate-400">Track tasks tailored to this focus.</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

