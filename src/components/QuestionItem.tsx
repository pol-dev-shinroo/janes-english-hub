"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";

interface QuestionItemProps {
  text: string;
}

export default function QuestionItem({ text }: QuestionItemProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div
      onClick={() => setIsCompleted(!isCompleted)}
      className="flex items-start gap-3 p-3 rounded-md hover:bg-slate-50 cursor-pointer transition-colors group"
    >
      <div className={`mt-1 transition-colors ${isCompleted ? "text-green-500" : "text-slate-300 group-hover:text-slate-400"}`}>
        <CircleCheck size={20} />
      </div>
      <p className={`text-sm leading-relaxed ${isCompleted ? "text-slate-400 line-through" : "text-slate-700"}`}>
        {text}
      </p>
    </div>
  );
}
