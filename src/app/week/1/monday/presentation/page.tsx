"use client";

import { useState, KeyboardEvent, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, Edit3, Save, RefreshCcw, X, BookOpen } from "lucide-react";
import { QUESTIONS } from "@/data/agentic-ai";

type ViewState = 'answering' | 'reviewing' | 'summary';

export default function PresentationWizard() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewState, setViewState] = useState<ViewState>('answering');
  const [answers, setAnswers] = useState<string[]>(new Array(QUESTIONS.length).fill(""));
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    if (viewState === 'answering' && textareaRef.current) {
      textareaRef.current.focus();
      if (!currentAnswer) {
        setCurrentAnswer("• ");
      }
    }
  }, [viewState, currentQuestionIndex]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = currentAnswer.substring(0, start) + "\n• " + currentAnswer.substring(end);
      setCurrentAnswer(newValue);
      
      // Set cursor position after the bullet
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 3;
      }, 0);
    }
  };

  const handleSubmitAnswer = () => {
    if (currentAnswer.trim() === "•" || !currentAnswer.trim()) return;
    setViewState('reviewing');
  };

  const handleConfirm = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer("");
      setViewState('answering');
    } else {
      setViewState('summary');
    }
  };

  const handleEdit = () => {
    setViewState('answering');
  };

  if (viewState === 'summary') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-green-600 p-8 md:p-12 text-white text-center">
            <CheckCircle size={64} className="mx-auto mb-6" />
            <h1 className="text-4xl font-black mb-4">Presentation Ready!</h1>
            <p className="text-xl text-green-50/80 font-medium">
              You've completed all the checks. Use the notes below for your oral presentation.
            </p>
          </div>
          
          <div className="p-8 md:p-12 space-y-12">
            {QUESTIONS.map((q, idx) => (
              <div key={q.id} className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                <h3 className="text-indigo-700 font-bold uppercase tracking-wider text-sm mb-4">
                  Topic {idx + 1}: {q.type === 'quick' ? 'Quick Check' : 'Deep Dive'}
                </h3>
                <h2 className="text-2xl font-black text-slate-900 mb-6 leading-tight">
                  {q.text}
                </h2>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 whitespace-pre-wrap text-lg text-slate-700 leading-relaxed font-medium italic">
                  {answers[idx]}
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-center">
            <Link
              href="/week/1/monday"
              className="flex items-center gap-2 px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all border border-slate-200"
            >
              <ArrowLeft size={20} />
              <span>Back to Reading</span>
            </Link>
          </div>
          <div className="px-8 pb-12">
            <button
              onClick={() => {
                localStorage.setItem('jane_qa_answers', JSON.stringify(answers));
                router.push('/week/1/monday/presentation/structure');
              }}
              className="block w-full text-center bg-emerald-600 text-white font-black py-4 rounded-xl hover:bg-emerald-700 transition shadow-lg text-lg"
            >
              Draft Speech Structure 🗣️
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-black text-xl">
            {currentQuestionIndex + 1}
          </div>
          <div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
              Question {currentQuestionIndex + 1} of {QUESTIONS.length}
            </p>
            <h2 className="text-slate-900 font-bold">
              {currentQuestion.type === 'quick' ? 'Quick Check' : 'Deep Dive'}
            </h2>
          </div>
        </div>
        <div className="flex gap-1">
          {QUESTIONS.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-12 rounded-full transition-all duration-300 ${
                idx === currentQuestionIndex ? "bg-indigo-600" : idx < currentQuestionIndex ? "bg-green-500" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {viewState === 'answering' ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 md:p-12 animate-in fade-in slide-in-from-right-4 duration-300">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 text-center leading-tight">
            {currentQuestion.text}
          </h1>
          
          <div className="relative group">
            <div className="absolute top-4 left-4 text-slate-300 group-focus-within:text-indigo-300 transition-colors">
              <Edit3 size={24} />
            </div>
            <textarea
              ref={textareaRef}
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full min-h-[300px] p-12 pl-14 bg-slate-50 border-2 border-slate-100 rounded-3xl text-xl text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-inner font-medium leading-relaxed"
              placeholder="Start typing your points..."
            />
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmitAnswer}
              disabled={!currentAnswer.trim() || currentAnswer.trim() === "•"}
              className="flex items-center gap-3 px-12 py-5 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-indigo-200 hover:-translate-y-1 text-lg"
            >
              <span>Submit Answer</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-blue-50/50 rounded-3xl border-2 border-blue-100 p-8 flex flex-col">
            <h3 className="text-blue-700 font-bold uppercase tracking-wider text-xs mb-6 flex items-center gap-2">
              <Edit3 size={16} />
              <span>Your Answer</span>
            </h3>
            <div className="flex-1 whitespace-pre-wrap text-xl text-slate-800 leading-relaxed font-medium italic">
              {currentAnswer}
            </div>
            <button
              onClick={handleEdit}
              className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-white border border-blue-200 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition-colors"
            >
              <RefreshCcw size={18} />
              <span>Edit My Answer</span>
            </button>
          </div>

          <div className="bg-green-50/50 rounded-3xl border-2 border-green-100 p-8 flex flex-col">
            <h3 className="text-green-700 font-bold uppercase tracking-wider text-xs mb-6 flex items-center gap-2">
              <CheckCircle size={16} />
              <span>Model Answer</span>
            </h3>
            <div className="flex-1 whitespace-pre-wrap text-xl text-slate-800 leading-relaxed font-medium">
              {currentQuestion.modelAnswer}
            </div>
            <button
              onClick={handleConfirm}
              className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-lg"
            >
              <Save size={18} />
              <span>Confirm & Continue</span>
            </button>
            <button
              onClick={() => setIsArticleModalOpen(true)}
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              <BookOpen size={18} />
              <span>📖 View Source Article</span>
            </button>
          </div>
        </div>
      )}

      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white max-w-3xl w-full max-h-[80vh] overflow-y-auto rounded-2xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsArticleModalOpen(false)}
              className="sticky top-0 float-right p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            <div className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-slate-900 mb-6">The Era of Agentic AI: When Computers Start Taking Action</h2>
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-serif">
                <p>For years, artificial intelligence has acted like a highly advanced digital encyclopedia. You ask a question, and it gives you a written answer. It has been incredibly helpful, but it only speaks when spoken to. Now, a new leap in technology known as agentic AI is changing the rules. Instead of just answering questions, these new systems are taking action.</p>
                <p>To be an "agent" means to have the power to act. While a standard AI chatbot waits for your command, agentic AI is designed to be autonomous.</p>
                <p>It does not just react to your prompts; it is proactive. This means it can look ahead, anticipate what needs to be done, and start working without you constantly pushing buttons.</p>
                <p>Imagine telling an AI agent, "Plan my science fair project." It won't just give you a summary paragraph. It will create a step-by-step workflow on its own. It might search the web, download articles, read them, and write a full outline.</p>
                <p>Of course, these digital agents do not just run wild. Human developers set strict parameters to keep them focused, safe, and on-task. Think of these as guardrails on a highway.</p>
                <p>If the AI gets confused or encounters a roadblock it doesn't understand, it will pause. It will wait for human intervention before continuing, ensuring that humans always have the final say.</p>
                <p>As this technology grows rapidly, it forces us to ask a big question: if machines can do the organizing, planning, and acting for us, what skills should humans focus on learning next?</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
