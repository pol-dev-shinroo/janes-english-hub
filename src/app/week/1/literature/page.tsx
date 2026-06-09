"use client";

import Link from "next/link";
import { BookOpen, CheckSquare, Edit3 } from "lucide-react";

export default function LiteratureHub() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <BookOpen size={32} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">The Giver: Chapter 1</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Complete both the comprehension check and the writing response below to finish your homework for this chapter.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Multiple Choice Card */}
        <Link 
          href="/week/1/literature/multiple-choice"
          className="group bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
            <CheckSquare size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Multiple Choice</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Test your basic understanding of the chapter's events, characters, and rules.
          </p>
          <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wider">
            Start Quiz →
          </div>
        </Link>

        {/* Writing Response Card */}
        <Link 
          href="/week/1/literature/writing"
          className="group bg-white border-2 border-slate-100 rounded-3xl p-8 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
            <Edit3 size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">Writing Response</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Analyze the text deeply and share your personal thoughts on the community's strict rules.
          </p>
          <div className="flex items-center text-emerald-600 font-bold text-sm uppercase tracking-wider">
            Start Writing →
          </div>
        </Link>
      </div>
    </div>
  );
}
