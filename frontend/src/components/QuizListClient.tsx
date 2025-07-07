"use client";

import { useState } from "react";
import Link from "next/link";
import { QuizSummary } from "@/types/quiz";
import { deleteQuiz } from "@/services/api";

type Props = {
  quizzes: QuizSummary[];
};

export default function QuizListClient({ quizzes }: Props) {
  const [list, setList] = useState(quizzes);
  console.log(list);

  const handleDelete = async (id: number) => {
    try {
      await deleteQuiz(id);
      setList((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Failed to delete quiz", err);
    }
  };

  return (
    <ul className="space-y-6">
      {list.map((quiz) => (
        <li
          key={quiz.id}
          className="flex items-center justify-between p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <Link
            href={`/quizzes/${quiz.id}`}
            className="flex-1 cursor-pointer"
            aria-label={`View quiz ${quiz.title}`}
          >
            <h2 className="text-2xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
              {quiz.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {quiz.questionCount} question{quiz.questionCount !== 1 ? "s" : ""}
            </p>
          </Link>
          <button
            onClick={() => handleDelete(quiz.id)}
            className="ml-6 p-2 text-red-600 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label={`Delete quiz ${quiz.title}`}
            title="Delete quiz"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
