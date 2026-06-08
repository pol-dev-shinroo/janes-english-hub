export interface VocabularyWord {
  word: string;
  type: string;
  definition: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'quick' | 'deep';
  modelAnswer?: string;
}

export type VocabularyDictionary = Record<string, VocabularyWord>;
