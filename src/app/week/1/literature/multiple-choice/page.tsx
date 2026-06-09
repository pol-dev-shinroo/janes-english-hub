"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, ArrowRight, RotateCcw } from "lucide-react";
import { MULTIPLE_CHOICE_QUESTIONS } from "@/data/literature";

export default function MultipleChoiceQuiz() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Fetch existing quiz from database on load
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch('/api/quiz?studentName=Jane&weekId=Week 1&quizId=literature-ch1');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setAnswers(json.data.answers);
            setScore(json.data.score);
            setShowResults(true); // Jump straight to results if they already took it
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

  const currentQuestion = MULTIPLE_CHOICE_QUESTIONS[currentIndex];

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    
    setSelectedOption(optionId);
    setIsAnswered(true);
    
    // Record this specific answer
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));

    if (optionId === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex < MULTIPLE_CHOICE_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // End of quiz: Save to Database
      try {
        await fetch('/api/quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentName: 'Jane',
            weekId: 'Week 1',
            quizId: 'literature-ch1',
            answers: answers,
            score: score,
            totalQuestions: MULTIPLE_CHOICE_QUESTIONS.length
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
    if (!isAnswered) {
      return "border-slate-200 hover:border-blue-300 hover:bg-slate-50 cursor-pointer";
    }
    if (optionId === currentQuestion.correctAnswer) {
      return "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold ring-2 ring-emerald-500/20";
    }
    if (selectedOption === optionId && optionId !== currentQuestion.correctAnswer) {
      return "border-red-400 bg-red-50 text-red-700 line-through";
    }
    return "border-slate-200 opacity-50 cursor-default";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- RESULTS SCREEN ---
  if (showResults) {
    const isPerfect = score === MULTIPLE_CHOICE_QUESTIONS.length;
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className={`p-12 rounded-3xl text-center shadow-lg border-2 mb-12 ${isPerfect ? 'bg-emerald-50 border-emerald-200' : 'bg-blue-50 border-blue-200'}`}>
          <h2 className="text-4xl font-black mb-4 text-slate-900">Quiz Completed!</h2>
          <p className="text-2xl font-medium text-slate-700 mb-8">
            You scored <span className="font-bold text-4xl mx-1">{score}</span> out of {MULTIPLE_CHOICE_QUESTIONS.length}
          </p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={handleRestart} className="flex items-center gap-2 px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              <RotateCcw size={20} /> Try Again
            </button>
            <Link href="/week/1/literature" className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl hover:-translate-y-1">
              Back to Hub <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Answer Review Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <CheckCircle className="text-blue-600" /> Your Answer Review
          </h3>
          {MULTIPLE_CHOICE_QUESTIONS.map((q) => {
            const studentChoice = answers[q.id];
            const isCorrect = studentChoice === q.correctAnswer;
            const chosenOptionText = q.options.find(o => o.id === studentChoice)?.text || "Did not answer";

            return (
              <div key={q.id} className="p-6 md:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <p className="font-bold text-lg text-slate-800 mb-4">{q.id}. {q.text}</p>
                <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                  <p className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                    Your Answer: {chosenOptionText}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- QUIZ SCREEN ---
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/week/1/literature" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold">
          <ArrowLeft size={20} /> Back to Hub
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">
            Question {currentIndex + 1} of {MULTIPLE_CHOICE_QUESTIONS.length}
          </span>
          <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out" 
              style={{ width: `${((currentIndex) / MULTIPLE_CHOICE_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-right-8 duration-300">
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-10">
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
              <span className="leading-relaxed text-lg pt-0.5">{opt.text}</span>
              
              {isAnswered && opt.id === currentQuestion.correctAnswer && (
                <CheckCircle className="text-emerald-500 ml-auto flex-shrink-0 mt-1" size={24} />
              )}
              {isAnswered && selectedOption === opt.id && opt.id !== currentQuestion.correctAnswer && (
                <XCircle className="text-red-500 ml-auto flex-shrink-0 mt-1" size={24} />
              )}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-6 rounded-2xl border ${selectedOption === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
              <h4 className={`font-black mb-2 flex items-center gap-2 ${selectedOption === currentQuestion.correctAnswer ? 'text-emerald-800' : 'text-red-800'}`}>
                {selectedOption === currentQuestion.correctAnswer ? '🎉 Correct!' : '❌ Incorrect'}
              </h4>
              <p className={`leading-relaxed text-lg ${selectedOption === currentQuestion.correctAnswer ? 'text-emerald-700' : 'text-red-700'}`}>
                <span className="font-bold mr-2">Explanation:</span> 
                {currentQuestion.explanation}
              </p>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1"
              >
                {currentIndex === MULTIPLE_CHOICE_QUESTIONS.length - 1 ? 'Finish & View Results' : 'Next Question'} 
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
