import prisma from '../lib/prisma';
import { CreateQuizInput } from '../types/types';

export class QuizService {
  async createQuiz(data: CreateQuizInput) {
    return prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((q) => ({
            question: q.question,
            type: q.type,
            options: q.options ?? [],
            correctAnswer: Array.isArray(q.correctAnswer)
            ? { set: q.correctAnswer }
            : { set: [q.correctAnswer] },
          })),
        },
      },
      include: { questions: true },
    });
  }

  async getAllQuizzes() {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz._count.questions,
    }));
  }

  async getQuizById(id: number) {
    return prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });
  }

  async deleteQuizById(id: number) {
    return prisma.quiz.delete({
      where: { id },
    });
  }
}
export const quizService = new QuizService(); 