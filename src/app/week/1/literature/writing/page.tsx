"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw, PenTool, Lightbulb } from "lucide-react";
import { WRITING_QUESTIONS } from "@/data/literature";

export default function WritingResponsePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draft, setDraft] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch('/api/writing?studentName=Jane&weekId=Week 1&assignmentId=literature-ch1-writing');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setAnswers(json.data.answers);
            setShowResults(true);
          }
        }
      } catch (e) {
        console.error("Failed to fetch past responses", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResponses();
  }, []);

  const currentQuestion = WRITING_QUESTIONS[currentIndex];

  const handleSubmitDraft = () => {
    if (!draft.trim()) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: draft }));
    setIsAnswered(true);
  };

  const handleNext = async () => {
    if (currentIndex < WRITING_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setDraft("");
      setIsAnswered(false);
    } else {
      try {
        await fetch('/api/writing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentName: 'Jane',
            weekId: 'Week 1',
            assignmentId: 'literature-ch1-writing',
            answers: answers
          })
        });
      } catch (e) {
        console.error("Failed to save to cloud", e);
      }
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setDraft("");
    setIsAnswered(false);
    setAnswers({});
    setShowResults(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- RESULTS SCREEN ---
  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="p-12 rounded-3xl text-center shadow-lg border-2 bg-emerald-50 border-emerald-200 mb-12">
          <h2 className="text-4xl font-black mb-4 text-slate-900">Assignment Completed!</h2>
          <p className="text-xl font-medium text-slate-700 mb-8 max-w-2xl mx-auto">
            Great job! You've analyzed all the questions. Review your final thoughts and the model answers below.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={handleRestart} className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              <RotateCcw size={20} /> Start Over
            </button>
            <Link href="/week/1/literature" className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl hover:-translate-y-1">
              Back to Hub <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="space-y-8">
          {WRITING_QUESTIONS.map((q) => (
            <div key={q.id} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
              <p className="font-bold text-xl text-slate-800 mb-6">{q.id}. {q.text}</p>
              
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                    <PenTool size={16} /> Your Answer
                  </h4>
                  <p className="text-lg text-slate-800 whitespace-pre-wrap italic">{answers[q.id]}</p>
                </div>
                
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-2">
                    <Lightbulb size={16} /> Model Answer
                  </h4>
                  <p className="text-lg text-emerald-900 whitespace-pre-wrap">{q.modelAnswer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- WRITING SCREEN ---
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/week/1/literature" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold">
          <ArrowLeft size={20} /> Back to Hub
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">
            Question {currentIndex + 1} of {WRITING_QUESTIONS.length}
          </span>
          <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 ease-out" 
              style={{ width: `${((currentIndex) / WRITING_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-8 duration-300">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-8">
          {currentQuestion.text}
        </h2>

        <div className="relative mb-6">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={isAnswered}
            placeholder="Type your response here..."
            className="w-full min-h-[200px] p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl text-lg text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all resize-y disabled:opacity-70 disabled:bg-slate-100"
          />
        </div>

        {!isAnswered ? (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmitDraft}
              disabled={!draft.trim()}
              className="px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:-translate-y-1"
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200">
              <h4 className="font-black mb-3 flex items-center gap-2 text-blue-800 uppercase tracking-wider text-sm">
                <CheckCircle size={18} /> Review Model Answer
              </h4>
              <p className="leading-relaxed text-lg text-blue-900">
                {currentQuestion.modelAnswer}
              </p>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-end gap-4">
              <button
                onClick={() => setIsAnswered(false)}
                className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm hover:-translate-y-1"
              >
                <PenTool size={20} /> Edit Answer
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1"
              >
                {currentIndex === WRITING_QUESTIONS.length - 1 ? 'Finish & Save' : 'Next Question'} 
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
