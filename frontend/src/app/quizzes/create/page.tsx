"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionType } from "@/types/quiz";
import { createQuiz } from "@/services/api";

interface Question {
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
}

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", type: "input", correctAnswer: "" },
    ]);
  };

  const removeQuestion = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    await createQuiz({ title, questions });
    router.push("/quizzes");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quiz title"
        className="border p-2 mb-4 w-full"
      />

      {questions.map((q, i) => (
        <div key={i} className="border p-4 mb-4 rounded bg-white shadow">
          <input
            value={q.question}
            onChange={(e) => updateQuestion(i, "question", e.target.value)}
            placeholder="Question text"
            className="border p-2 w-full mb-2"
          />
          <select
            value={q.type}
            onChange={(e) => updateQuestion(i, "type", e.target.value)}
            className="border p-2 mb-2 w-full"
          >
            <option value="input">Input</option>
            <option value="boolean">Boolean</option>
            <option value="checkbox">Checkbox</option>
          </select>
          {q.type === "boolean" && (
            <>
              <p className="text-sm mb-1">Correct answer:</p>
              <select
                value={q.correctAnswer as string}
                onChange={(e) =>
                  updateQuestion(i, "correctAnswer", e.target.value)
                }
                className="border p-2 w-full"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </>
          )}
          {q.type === "input" && (
            <input
              value={q.correctAnswer as string}
              onChange={(e) =>
                updateQuestion(i, "correctAnswer", e.target.value)
              }
              placeholder="Correct answer"
              className="border p-2 w-full"
            />
          )}
          {q.type === "checkbox" && (
            <div className="space-y-2">
              <textarea
                placeholder="Options (comma separated)"
                className="border p-2 w-full"
                onChange={(e) =>
                  updateQuestion(i, "options", e.target.value.split(","))
                }
              />
              <input
                placeholder="Correct answers (comma separated)"
                className="border p-2 w-full"
                onChange={(e) =>
                  updateQuestion(i, "correctAnswer", e.target.value.split(","))
                }
              />
            </div>
          )}
          <button
            onClick={() => removeQuestion(i)}
            className="mt-2 text-red-500"
          >
            Remove Question
          </button>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Question
      </button>
      <button
        onClick={handleSubmit}
        className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
