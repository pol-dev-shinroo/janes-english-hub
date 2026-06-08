import { Question, VocabularyDictionary } from "@/types/reading";

export const VOCABULARY: VocabularyDictionary = {
  "agentic ai": {
    word: "Agentic AI",
    type: "noun",
    definition: "AI that can independently make choices and take actions to reach a goal."
  },
  "autonomous": {
    word: "Autonomous",
    type: "adj",
    definition: "Operating completely on its own without human help."
  },
  "proactive": {
    word: "Proactive",
    type: "adj",
    definition: "Taking action before a problem happens, rather than just waiting."
  },
  "workflow": {
    word: "Workflow",
    type: "noun",
    definition: "A series of steps needed to finish a complex project."
  },
  "parameters": {
    word: "Parameters",
    type: "noun",
    definition: "The rules or limits that tell a system what it is allowed to do."
  },
  "intervention": {
    word: "Intervention",
    type: "noun",
    definition: "Stepping in to change, correct, or stop a situation."
  },
  "encyclopedia": {
    word: "Encyclopedia",
    type: "noun",
    definition: "A comprehensive collection of information on many different subjects."
  },
  "anticipate": {
    word: "Anticipate",
    type: "verb",
    definition: "To predict what will happen and prepare for it in advance."
  },
  "guardrails": {
    word: "Guardrails",
    type: "noun",
    definition: "Rules or limits designed to keep a process safe and on the right track."
  },
  "roadblock": {
    word: "Roadblock",
    type: "noun",
    definition: "An unexpected problem or obstacle that stops progress."
  }
};

export const QUESTIONS: Question[] = [
  { 
    id: 'q1', 
    text: 'What is the primary difference between traditional AI and Agentic AI?', 
    type: 'quick',
    modelAnswer: '• Traditional AI waits for your prompts to answer questions.\n• Agentic AI takes proactive action independently to achieve a goal.'
  },
  { 
    id: 'q2', 
    text: 'Why are parameters and human intervention important for Agentic AI?', 
    type: 'quick',
    modelAnswer: '• Parameters keep the AI focused and safe.\n• Human intervention allows us to step in if the AI gets stuck or makes a mistake.'
  },
  { 
    id: 'd1', 
    text: 'How might having an autonomous digital coworker change what you learn in school?', 
    type: 'deep',
    modelAnswer: '• Students might focus less on memorization and repetitive tasks.\n• The focus will shift to managing projects, creative thinking, and high-level problem solving.'
  }
];
