"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, List, Flag, ArrowLeft, Send } from "lucide-react";
import { QUESTIONS } from "@/data/agentic-ai";

export default function PresentationStructure() {
  const router = useRouter();
  const [introText, setIntroText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [conclusionText, setConclusionText] = useState("");

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        // 1. Try to fetch from the cloud database first
        const response = await fetch('/api/presentations?studentName=Jane&weekId=Week 1');
        if (response.ok) {
          const json = await response.json();
          if (json.data) {
            setIntroText(json.data.intro || "");
            setBodyText(json.data.body || "");
            setConclusionText(json.data.conclusion || "");
            return; // Exit early if cloud data exists
          }
        }
      } catch (e) {
        console.error("Cloud fetch failed, falling back to local storage", e);
      }

      // 2. Fallback to Local Storage Full Draft
      const savedDraft = localStorage.getItem('jane_final_speech');
      if (savedDraft) {
        try {
          const parsedDraft = JSON.parse(savedDraft);
          setIntroText(parsedDraft.intro || "");
          setBodyText(parsedDraft.body || "");
          setConclusionText(parsedDraft.conclusion || "");
          return;
        } catch (e) {
          console.error("Failed to parse saved draft");
        }
      }

      // 3. Fallback to Raw Q&A Answers
      const savedAnswers = localStorage.getItem('jane_qa_answers');
      if (savedAnswers) {
        try {
          const parsed = JSON.parse(savedAnswers);
          const formattedBody = parsed.map((answer: string, index: number) => {
            const questionText = QUESTIONS[index]?.text || `Question ${index + 1}`;
            return `Q: ${questionText}\n${answer}`;
          }).join('\n\n------------------------\n\n');
          
          setBodyText(formattedBody);
        } catch (e) {
          console.error("Failed to parse answers");
        }
      }
    };

    fetchDraft();
  }, []);

  const [isSaving, setIsSaving] = useState(false);

  const handleFinish = async (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();

    // 0. Frontend Validation Guard
    if (!introText.trim() || !bodyText.trim() || !conclusionText.trim()) {
      alert("Please draft all three sections (Introduction, Body, and Conclusion) before saving!");
      return;
    }

    setIsSaving(true);
    const finalSpeech = {
      studentName: 'Jane',
      weekId: 'Week 1',
      topic: 'Agentic AI',
      intro: introText,
      body: bodyText,
      conclusion: conclusionText
    };

    // 1. Keep saving to local storage for immediate UI hydration
    localStorage.setItem('jane_final_speech', JSON.stringify(finalSpeech));

    // 2. Send the data to MongoDB
    try {
      const response = await fetch('/api/presentations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalSpeech),
      });

      if (!response.ok) {
        throw new Error('Failed to save to database');
      }

      // 3. Navigate to the final view
      router.push('/week/1/monday/presentation/final');
    } catch (error) {
      console.error(error);
      // Use setTimeout to push the alert to the end of the execution queue
      setTimeout(() => alert("There was an issue saving to the cloud, but your local draft is safe!"), 100);
      router.push('/week/1/monday/presentation/final');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <Link
          href="/week/1/monday/presentation"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold"
        >
          <ArrowLeft size={20} />
          <span>Back to Outline</span>
        </Link>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Draft Your Presentation</h1>
      </div>

      <div className="space-y-12">
        {/* Introduction */}
        <section className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
              <Play size={20} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-black text-blue-900">1. Introduction (The Hook)</h2>
          </div>

          <div className="bg-white/60 rounded-2xl p-6 mb-6 border border-blue-100">
            <h3 className="text-blue-700 font-bold text-sm uppercase tracking-wider mb-4">Recommended Phrases:</h3>
            <ul className="space-y-3">
              <li className="text-slate-700 italic font-medium">"Today, I'd like to explore a fascinating shift in technology..."</li>
              <li className="text-slate-700 italic font-medium">"Have you ever wondered what happens when computers stop waiting for our commands?"</li>
              <li className="text-slate-700 italic font-medium">"The purpose of my presentation is to compare..."</li>
            </ul>
          </div>

          <textarea
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            className="w-full min-h-[150px] p-6 bg-white border-2 border-blue-100 rounded-2xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-300"
            placeholder="Draft your introduction here..."
          />
        </section>

        {/* Body */}
        <section className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-600 text-white rounded-xl flex items-center justify-center">
              <List size={20} />
            </div>
            <h2 className="text-2xl font-black text-amber-900">2. Body (The Evidence)</h2>
          </div>

          <div className="bg-white/60 rounded-2xl p-6 mb-6 border border-amber-100">
            <h3 className="text-amber-700 font-bold text-sm uppercase tracking-wider mb-4">Transition & Evidence:</h3>
            <ul className="space-y-3">
              <li className="text-slate-700 italic font-medium">"To illustrate this point, consider..."</li>
              <li className="text-slate-700 italic font-medium">"Furthermore, it is crucial to understand that..."</li>
              <li className="text-slate-700 italic font-medium">"On the other hand, a major challenge is..."</li>
            </ul>
          </div>

          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            className="w-full min-h-[250px] p-6 bg-white border-2 border-amber-100 rounded-2xl text-lg focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all placeholder:text-slate-300"
            placeholder="Draft the main body of your speech..."
          />
        </section>

        {/* Conclusion */}
        <section className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center">
              <Flag size={20} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-black text-emerald-900">3. Conclusion (The Takeaway)</h2>
          </div>

          <div className="bg-white/60 rounded-2xl p-6 mb-6 border border-emerald-100">
            <h3 className="text-emerald-700 font-bold text-sm uppercase tracking-wider mb-4">Wrapping Up:</h3>
            <ul className="space-y-3">
              <li className="text-slate-700 italic font-medium">"Ultimately, the key takeaway is..."</li>
              <li className="text-slate-700 italic font-medium">"To summarize, Agentic AI represents..."</li>
              <li className="text-slate-700 italic font-medium">"Thank you for your time. I'd be happy to answer any questions."</li>
            </ul>
          </div>

          <textarea
            value={conclusionText}
            onChange={(e) => setConclusionText(e.target.value)}
            className="w-full min-h-[150px] p-6 bg-white border-2 border-emerald-100 rounded-2xl text-lg focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all placeholder:text-slate-300"
            placeholder="Draft your concluding remarks..."
          />
        </section>
      </div>

      <div className="mt-12 flex flex-col items-center gap-6">
        <button
          onClick={handleFinish}
          disabled={isSaving}
          className="group flex items-center gap-3 px-12 py-6 bg-slate-900 text-white font-black rounded-3xl hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-2xl hover:shadow-slate-200 hover:-translate-y-1 text-xl"
        >
          <span>{isSaving ? 'Saving...' : 'Finish & Save'}</span>
          <Send size={24} className={`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isSaving ? 'animate-pulse' : ''}`} />
        </button>
        <p className="text-slate-400 font-medium text-center">
          Great job! Clicking above will save your draft and return you to the home dashboard.
        </p>
      </div>
    </div>
  );
}
