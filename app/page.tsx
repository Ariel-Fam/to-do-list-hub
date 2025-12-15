'use client'

import { Authenticated, Unauthenticated } from 'convex/react'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

import MainUi from '@/components/MainUi'
import SignInPage from './sign-in/page'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Authenticated>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-2xl border border-indigo-500/30 bg-slate-900 shadow-inner shadow-indigo-500/10">
                  <Image
                    src="/todo.png"
                    alt="Todo logo"
                    fill
                    sizes="44px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="leading-tight">
                  <p className="text-xs uppercase tracking-[0.25em] text-indigo-300">Todo Hub</p>
                  <p className="text-lg font-semibold text-white">Stay on top of your day</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-sm text-slate-200 shadow-lg shadow-indigo-500/10 sm:flex">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.18)]" />
                  <span className="font-medium">Synced</span>
                </div>
                <div className="rounded-full border border-white/10 bg-slate-900/80 px-2 py-1 shadow-lg shadow-indigo-500/20">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: 'h-10 w-10',
                        userButtonTrigger:
                          'rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/80',
                        userButtonPopoverCard: 'bg-slate-900 text-slate-50 border border-slate-800 shadow-xl',
                        userButtonPopoverActionButton: 'hover:bg-slate-800 text-slate-100',
                        userButtonPopoverFooter: 'hidden',
                      },
                      variables: {
                        colorPrimary: '#818cf8',
                        colorText: '#e2e8f0',
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1">
            <Content />
          </main>
        </div>
      </Authenticated>
      <Unauthenticated>
        <SignInPage />
      </Unauthenticated>
    </div>
  )
}

function Content() {
  return <MainUi />
}