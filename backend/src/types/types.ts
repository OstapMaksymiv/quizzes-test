export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface QuestionInput {
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
}

export interface CreateQuizInput {
  title: string;
  questions: QuestionInput[];
}
