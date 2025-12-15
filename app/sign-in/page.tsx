'use client';

import type { FormEvent } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import todoImage from "@/public/todo.png";
import { SignInButton, SignUpButton} from '@clerk/nextjs'

const featureHighlights = [
  {
    title: "Lightning-fast capture",
    description: "Add single tasks instantly and bulk add in one go.",
    Icon: ListChecks,
  },
  {
    title: "God-powered breakdowns",
    description: "Ask God to brainstorm subtasks and unblock big goals.",
    Icon: Sparkles,
  },
  {
    title: "Completion clarity",
    description: "Undo mistakes, archive wins, and keep things tidy.",
    Icon: CheckCircle2,
  },
  {
    title: "Local-first safety",
    description: "Your list is saved in-browser so refreshes stay safe.",
    Icon: ShieldCheck,
  },
];

export default function SignInPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-16 flex flex-col gap-10 lg:flex-row lg:items-center">
        <section className="flex-1 space-y-6">
          <span className="inline-flex items-center gap-2 w-fit rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-500/40">
            Launch Narrative Software
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Sign in to your smart to-do mission control.
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl">
              Capture tasks in seconds, ask God to break down big goals,
              and track every win with a clean completed view.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featureHighlights.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-200">
                    <Icon size={18} />
                  </span>
                  <p className="font-semibold">{title}</p>
                </div>
                <p className="mt-2 text-sm text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="bg-slate-900/80 border-slate-800 shadow-xl backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Sign in to continue organizing with AI. This UI is ready for
                your auth backend when you plug it in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>

                <div  className="w-ful flex items-center justify-center border-white border-1 rounded-3xl bg-emerald-500 text-emerald-950 hover:bg-yellow-500">
                  <SignInButton>
                    Sign in
                  </SignInButton>

                </div>
            
              </form>
              <p className="mt-3 text-xs text-slate-400">
                Demo-only: credentials are not sent anywhere yet. Wire this up
                to your auth provider when ready.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <div  className="w-full flex items-center justify-center border-white border-1 rounded-sm bg-purple-500 text-emerald-950 hover:bg-yellow-500">
                  
                  <SignUpButton>
                    Sign up
                  </SignUpButton>

                </div>
              
              <p className="text-center text-xs text-slate-400">
                Need an account? Launching soon. 
              </p>
            </CardFooter>
          </Card>
        </section>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-inner">
          <div className="absolute -top-10 -right-10 h-40 w-40 bg-emerald-500/25 blur-3xl" />
          <div className="grid gap-6 md:grid-cols-[1.05fr,0.95fr] items-center">
            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-semibold">How it keeps you moving</h2>
              <p className="text-slate-300">
                Move from idea to done without losing context. Add tasks,
                track your progress and flip to the completed sidebar to
                see wins.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 text-emerald-400" size={16} />
                  Fast add, delete, and complete flows.
                </li>
               
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 text-emerald-400" size={16} />
                  Local persistence so refreshes don&apos;t wipe your list.
                </li>
              </ul>
            </div>
            <div className="relative h-full w-full">
              <div className="relative m-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70 shadow-lg">
                <Image
                  src={todoImage}
                  alt="To-do list illustration"
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

