import { CreateQuizInput, Quiz, QuizSummary } from "@/types/quiz";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';


export async function getQuizzes(): Promise<QuizSummary[]> {
  const res = await fetch(`${API_URL}/quizzes`);
  if (!res.ok) throw new Error('Failed to fetch quizzes');
  return res.json();
}


export async function getQuiz(id: string): Promise<Quiz> {
  const res = await fetch(`${API_URL}/quizzes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch quiz');
  return res.json();
}

export async function createQuiz(data: CreateQuizInput): Promise<Quiz> {
  const res = await fetch(`${API_URL}/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.error || 'Failed to create quiz');
  }

  return res.json();
}

export async function deleteQuiz(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/quizzes/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete quiz');
}
