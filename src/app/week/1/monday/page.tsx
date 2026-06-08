"use client";

import { useState } from "react";
import Link from "next/link";
import { Maximize2, Minimize2, BookOpen } from "lucide-react";
import VocabularyHighlight from "@/components/VocabularyHighlight";
import { VOCABULARY } from "@/data/agentic-ai";

export default function ArticlePage() {
  const [isFocusMode, setIsFocusMode] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Main Content Area */}
        <article className={`transition-all duration-500 ${isFocusMode ? "w-full max-w-3xl mx-auto" : "flex-1"}`}>
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">
            <header className="bg-indigo-700 p-8 md:p-12 text-white relative">
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-2">
                  <span className="inline-block w-fit px-3 py-1 bg-indigo-500/30 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-400/30">
                    Reading Comprehension
                  </span>
                  <span className="text-indigo-200 text-xs font-semibold uppercase tracking-wider">
                    Reading Time: 3 mins
                  </span>
                </div>
                <button
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm border border-white/20 text-sm font-medium"
                >
                  {isFocusMode ? (
                    <>
                      <Minimize2 size={18} /> Exit Focus
                    </>
                  ) : (
                    <>
                      <Maximize2 size={18} /> Focus Mode
                    </>
                  )}
                </button>
              </div>
              <h1 className="text-3xl md:text-5xl font-black leading-tight">
                The Era of Agentic AI: When Computers Start Taking Action
              </h1>
            </header>

            <div className="p-8 md:p-12">
              <div className="space-y-6 text-lg md:text-xl text-slate-800 leading-relaxed font-serif">
                <p>
                  For years, artificial intelligence has acted like a highly advanced digital <VocabularyHighlight wordKey="encyclopedia">encyclopedia</VocabularyHighlight>. You ask a question, and it gives you a written answer. It has been incredibly helpful, but it only speaks when spoken to. Now, a new leap in technology known as <VocabularyHighlight wordKey="agentic ai">agentic AI</VocabularyHighlight> is changing the rules. Instead of just answering questions, these new systems are taking action.
                </p>

                <img src="/ai-concept.png" alt="AI Concept" className="w-full rounded-xl my-8 shadow-md object-cover" />

                <p>
                  To be an "agent" means to have the power to act. While a standard AI chatbot waits for your command, agentic AI is designed to be <VocabularyHighlight wordKey="autonomous">autonomous</VocabularyHighlight>.
                </p>

                <p>
                  It does not just react to your prompts; it is <VocabularyHighlight wordKey="proactive">proactive</VocabularyHighlight>. This means it can look ahead, <VocabularyHighlight wordKey="anticipate">anticipate</VocabularyHighlight> what needs to be done, and start working without you constantly pushing buttons.
                </p>

                <p>
                  Imagine telling an AI agent, "Plan my science fair project." It won't just give you a summary paragraph. It will create a step-by-step <VocabularyHighlight wordKey="workflow">workflow</VocabularyHighlight> on its own. It might search the web, download articles, read them, and write a full outline.
                </p>

                <p>
                  Of course, these digital agents do not just run wild. Human developers set strict <VocabularyHighlight wordKey="parameters">parameters</VocabularyHighlight> to keep them focused, safe, and on-task. Think of these as <VocabularyHighlight wordKey="guardrails">guardrails</VocabularyHighlight> on a highway.
                </p>

                <p>
                  If the AI gets confused or encounters a <VocabularyHighlight wordKey="roadblock">roadblock</VocabularyHighlight> it doesn't understand, it will pause. It will wait for human <VocabularyHighlight wordKey="intervention">intervention</VocabularyHighlight> before continuing, ensuring that humans always have the final say.
                </p>

                <p>
                  As this technology grows rapidly, it forces us to ask a big question: if machines can do the organizing, planning, and acting for us, what skills should humans focus on learning next?
                </p>

                <Link href="/week/1/monday/presentation" className="block w-full text-center bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg mt-12">
                  Make Presentation 🎤
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        {!isFocusMode && (
          <aside className="w-full md:w-80 lg:w-96 sticky top-24 space-y-6">
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-indigo-700 font-bold uppercase tracking-wider text-xs">
                <BookOpen size={16} />
                <span>Vocabulary Bank</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.values(VOCABULARY).map((v) => (
                  <button
                    key={v.word}
                    onClick={() => {
                      const el = document.getElementById(`vocab-${v.word.toLowerCase().replace(/\s+/g, '-')}`);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        el.classList.remove('animate-flash'); // Reset if clicked twice
                        void el.offsetWidth; // Trigger reflow
                        el.classList.add('animate-flash');
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 hover:scale-105 hover:text-indigo-700 hover:border-indigo-200 border border-transparent rounded-lg text-sm font-medium text-slate-700 transition-all cursor-pointer"
                  >
                    {v.word}
                  </button>
                ))}
              </div>
            </section>
          </aside>
        )}
      </div>
    </div>
  );
}
