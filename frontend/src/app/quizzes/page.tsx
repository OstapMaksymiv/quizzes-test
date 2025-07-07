import QuizListClient from "@/components/QuizListClient";
import { getQuizzes } from "@/services/api";
import Link from "next/link";

export default async function QuizListPage() {
  const quizzes = await getQuizzes();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        href="/quizzes/create"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        + Create Quiz
      </Link>
      <h1 className="text-2xl font-bold mb-4">Quizzes</h1>
      <QuizListClient quizzes={quizzes} />
    </div>
  );
}
