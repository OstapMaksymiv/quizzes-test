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

export interface QuizSummary {
  id: number;
  title: string;
  questionCount: number;
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  questions: {
    id: number;
    question: string;
    type: QuestionType;
    options: string[];
    correctAnswer: string[];
  }[];
}
