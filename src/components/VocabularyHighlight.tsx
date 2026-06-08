"use client";

import { useState, useRef, useEffect } from "react";
import { VOCABULARY } from "@/data/agentic-ai";

interface VocabularyHighlightProps {
  wordKey: string;
  children?: React.ReactNode;
}

export default function VocabularyHighlight({ wordKey, children }: VocabularyHighlightProps) {
  const [showPopover, setShowPopover] = useState(false);
  const data = VOCABULARY[wordKey.toLowerCase()];
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setShowPopover(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!data) return <>{children || wordKey}</>;

  return (
    <span id={`vocab-${wordKey.toLowerCase().replace(/\s+/g, '-')}`} className="relative inline-block group scroll-mt-24">
      <button
        onClick={() => setShowPopover(!showPopover)}
        className="text-blue-600 font-bold underline decoration-blue-300 decoration-2 underline-offset-4 hover:text-blue-800 hover:decoration-blue-500 transition-all cursor-help"
      >
        {children || data.word}
      </button>

      {showPopover && (
        <div
          ref={popoverRef}
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-white border border-slate-200 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-1">
              <h4 className="font-bold text-slate-900">{data.word}</h4>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                {data.type}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              {data.definition}
            </p>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45 -mt-[7px]"></div>
        </div>
      )}
    </span>
  );
}
