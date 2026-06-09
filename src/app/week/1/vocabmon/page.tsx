"use client";

import Link from "next/link";
import { ArrowLeft, Gamepad2, ExternalLink, User, Key } from "lucide-react";

export default function VocabmonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold w-fit">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <Gamepad2 size={40} />
          </div>
          
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Time for Vocabmon!</h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Level up your vocabulary! Use your personal credentials below to log in and evolve your words.
          </p>

          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-10 max-w-md mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-500 font-bold uppercase tracking-wider text-sm">
                <User size={18} /> Login ID
              </div>
              <div className="text-2xl font-black text-slate-900 bg-white px-6 py-2 rounded-xl border border-slate-200 shadow-sm">
                jane
              </div>
            </div>
            
            <div className="h-px bg-slate-200 w-full" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-500 font-bold uppercase tracking-wider text-sm">
                <Key size={18} /> Password
              </div>
              <div className="text-2xl font-black text-slate-900 bg-white px-6 py-2 rounded-xl border border-slate-200 shadow-sm">
                1234
              </div>
            </div>
          </div>

          <a 
            href="https://vocabmon-app-beryl.vercel.app/login"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-rose-600 text-white text-lg font-black rounded-2xl hover:bg-rose-700 transition-all shadow-xl hover:shadow-rose-200 hover:-translate-y-1"
          >
            <span>Launch Vocabmon</span>
            <ExternalLink size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
