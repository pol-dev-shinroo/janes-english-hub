"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Printer, Home, ArrowLeft, Mic2, Sparkles } from "lucide-react";

interface FinalSpeech {
  intro: string;
  body: string;
  conclusion: string;
}

export default function FinalPresentationPage() {
  const [speech, setSpeech] = useState<FinalSpeech | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinalSpeech = async () => {
      try {
        // Try Cloud First
        const response = await fetch('/api/presentations?studentName=Jane&weekId=Week 1');
        if (response.ok) {
          const json = await response.json();
          if (json.data) {
            setSpeech(json.data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error("Cloud fetch failed");
      }

      // Fallback to Local Storage
      const saved = localStorage.getItem('jane_final_speech');
      if (saved) {
        try {
          setSpeech(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse local speech");
        }
      }
      setLoading(false);
    };

    fetchFinalSpeech();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-bold animate-pulse">Preparing your speech...</p>
        </div>
      </div>
    );
  }

  if (!speech) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <h1 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">No speech draft found!</h1>
        <p className="text-slate-600 mb-8 max-w-md">It looks like you haven't completed your presentation draft yet.</p>
        <Link
          href="/"
          className="flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg"
        >
          <Home size={20} />
          <span>Return Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto print:max-w-none">
        {/* Header - Hidden in Print */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 print:hidden">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <Mic2 size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Final Presentation 🎤</h1>
              <p className="text-slate-500 font-medium">Ready for the spotlight! Good luck!</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/week/1/monday/presentation/structure"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Edit Draft</span>
            </Link>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-100"
            >
              <Printer size={18} />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Main Cue Card */}
        <div className="max-w-3xl mx-auto bg-white p-10 md:p-14 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] print:border-0 print:shadow-none print:p-0">
          <div className="flex items-center gap-2 mb-12 text-indigo-600 font-black uppercase tracking-widest text-sm print:hidden">
            <Sparkles size={16} />
            <span>Digital Cue Card</span>
          </div>

          <div className="space-y-12">
            {/* Introduction Section */}
            <div className="mb-10 pl-6 border-l-4 border-blue-400">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 text-xs font-black px-2 py-1 rounded uppercase tracking-widest">Part 1</span>
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">Introduction</h3>
              </div>
              <div className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap font-serif">
                {speech.intro || "No introduction drafted."}
              </div>
            </div>

            {/* Main Body Section */}
            <div className="mb-10 pl-6 border-l-4 border-amber-400">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-amber-100 text-amber-700 text-xs font-black px-2 py-1 rounded uppercase tracking-widest">Part 2</span>
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">Main Body</h3>
              </div>
              <div className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap font-serif">
                {speech.body ? speech.body.replace(/------------------------/g, '') : "No body drafted."}
              </div>
            </div>

            {/* Conclusion Section */}
            <div className="mb-10 pl-6 border-l-4 border-emerald-400">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-black px-2 py-1 rounded uppercase tracking-widest">Part 3</span>
                <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide">Conclusion</h3>
              </div>
              <div className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap font-serif">
                {speech.conclusion || "No conclusion drafted."}
              </div>
            </div>
          </div>
          
          <div className="mt-20 pt-12 border-t border-slate-100 text-center print:hidden">
            <p className="text-slate-400 font-medium italic mb-8">
              "Every great presentation starts with a single step. You've got this!"
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl"
            >
              <Home size={20} />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
