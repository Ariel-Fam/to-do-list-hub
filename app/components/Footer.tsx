import Image from "next/image";
import Link from "next/link";

import softwareLogo from "@/public/softwareLogo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-500 via-green-500 to-blue-500  border-t border-slate-800 text-black">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-slate-800 ring-1 ring-slate-700">
            <Image
              src={softwareLogo}
              alt="Launch Narrative Software logo"
              fill
              className="object-contain p-1.5"
              sizes="48px"
              priority
            />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-semibold">Launch Narrative Software</p>
            <p className="text-sm text-black">
            Stay on top of your tasks with our intuitive to-do list app! 
            </p>
          </div>
        </div>

        <p className="text-xs text-black">
          Built with Next.js 15, Tailwind, and shadcn/ui.
        </p>
      </div>
    </footer>
  );
}

