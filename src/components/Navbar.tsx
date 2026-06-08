"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tight text-indigo-700 hover:text-indigo-800 transition-colors">
          Jane's English Hub
        </Link>

        {!isHome && (
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-full hover:bg-slate-200 transition-all border border-slate-200"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
