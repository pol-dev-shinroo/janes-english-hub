"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { READING_ARTICLE, READING_QUESTIONS } from "@/data/reading-comprehension";

export default function ReadingComprehensionPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch('/api/quiz?studentName=Jane&weekId=Week 1&quizId=reading-comp-ai');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setAnswers(json.data.answers);
            setScore(json.data.score);
            setShowResults(true);
          }
        }
      } catch (e) {
        console.error("Failed to fetch past quiz", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  const currentQuestion = READING_QUESTIONS[currentIndex];

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    
    setSelectedOption(optionId);
    setIsAnswered(true);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));

    if (optionId === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex < READING_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      try {
        await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentName: 'Jane',
            weekId: 'Week 1',
            quizId: 'reading-comp-ai',
            answers: answers,
            score: score,
            totalQuestions: READING_QUESTIONS.length
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
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setAnswers({});
    setShowResults(false);
  };

  const getOptionStyles = (optionId: string) => {
    if (!isAnswered) return "border-slate-200 hover:border-sky-300 hover:bg-slate-50 cursor-pointer";
    if (optionId === currentQuestion.correctAnswer) return "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold ring-2 ring-emerald-500/20";
    if (selectedOption === optionId && optionId !== currentQuestion.correctAnswer) return "border-red-400 bg-red-50 text-red-700 line-through";
    return "border-slate-200 opacity-50 cursor-default";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top Navbar Area */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 z-10">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>
        <div className="bg-sky-100 text-sky-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
          Reading Comprehension Check
        </div>
      </div>

      {/* Split Screen Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Article */}
        <div className="lg:w-1/2 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-slate-200 bg-white overflow-y-auto p-8 md:p-12 scroll-smooth">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
            {READING_ARTICLE.title}
          </h1>
          <div className="space-y-6">
            {READING_ARTICLE.content.map((paragraph, idx) => (
              <p key={idx} className="text-lg text-slate-700 leading-relaxed font-serif">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right Side: Quiz */}
        <div className="lg:w-1/2 h-1/2 lg:h-full bg-slate-50 overflow-y-auto p-8 md:p-12">
          {showResults ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`p-10 rounded-3xl text-center shadow-sm border-2 mb-8 ${score === READING_QUESTIONS.length ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'}`}>
                <h2 className="text-3xl font-black mb-4 text-slate-900">Test Completed!</h2>
                <p className="text-xl font-medium text-slate-700 mb-8">
                  You scored <span className="font-bold text-3xl mx-1">{score}</span> out of {READING_QUESTIONS.length}
                </p>
                <div className="flex justify-center gap-4">
                  <button onClick={handleRestart} className="flex items-center gap-2 px-6 py-3 bg-slate-100 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all">
                    <RotateCcw size={18} /> Try Again
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-sky-600" /> Answer Review
                </h3>
                {READING_QUESTIONS.map((q) => {
                  const isCorrect = answers[q.id] === q.correctAnswer;
                  const chosenOptionText = q.options.find(o => o.id === answers[q.id])?.text || "Did not answer";
                  return (
                    <div key={q.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                      <p className="font-bold text-slate-800 mb-3">{q.id}. {q.text}</p>
                      <div className={`p-3 rounded-lg border ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        <span className="font-semibold">Your Answer:</span> {chosenOptionText}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="flex items-center justify-between mb-8">
                <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">
                  Question {currentIndex + 1} of {READING_QUESTIONS.length}
                </span>
                <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-600 transition-all duration-500" style={{ width: `${((currentIndex) / READING_QUESTIONS.length) * 100}%` }} />
                </div>
              </div>

              <h2 className="text-2xl font-black text-slate-800 leading-tight mb-8">
                {currentQuestion.text}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    disabled={isAnswered}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${getOptionStyles(opt.id)}`}
                  >
                    <span className="font-black text-lg uppercase flex-shrink-0">{opt.id}.</span>
                    <span className="leading-relaxed text-[1.05rem] pt-0.5">{opt.text}</span>
                  </button>
                ))}
              </div>

              {isAnswered && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={`p-6 rounded-2xl border ${selectedOption === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                    <h4 className={`font-black mb-2 flex items-center gap-2 ${selectedOption === currentQuestion.correctAnswer ? 'text-emerald-800' : 'text-red-800'}`}>
                      {selectedOption === currentQuestion.correctAnswer ? '🎉 Correct!' : '❌ Incorrect'}
                    </h4>
                    <p className={`leading-relaxed ${selectedOption === currentQuestion.correctAnswer ? 'text-emerald-700' : 'text-red-700'}`}>
                      <span className="font-bold mr-2">Explanation:</span> 
                      {currentQuestion.explanation}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:-translate-y-1"
                    >
                      {currentIndex === READING_QUESTIONS.length - 1 ? 'Finish & Save' : 'Next Question'} 
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
