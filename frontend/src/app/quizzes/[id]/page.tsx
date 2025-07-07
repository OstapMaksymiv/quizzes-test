import { getQuiz } from "@/services/api";
import { notFound } from "next/navigation";

interface QuizPageProps {
  params: { id: string };
}

export default async function QuizDetailPage({ params }: QuizPageProps) {
  const { id } = params;
  let quiz;

  try {
    quiz = await getQuiz(params.id);
  } catch {
    notFound();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{quiz.title}</h1>

      <div className="space-y-6">
        {quiz.questions.map((q: any, idx: number) => (
          <div key={q.id} className="p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">
              {idx + 1}. {q.question}
            </h2>
            <p className="italic text-gray-600 mb-1">Type: {q.type}</p>

            {q.options && q.options.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {q.options.map((opt: string, i: number) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-2 text-sm text-gray-500 italic bg-gray-100 p-2 rounded">
                <span className="text-blue-400">ℹ️</span>
                {q.type === "boolean" ? (
                  <span>This question expects a True/False answer.</span>
                ) : (
                  <span>This question expects a free text answer.</span>
                )}
              </div>
            )}

            <p className="mt-2 text-green-600 font-medium">
              Correct answer
              {Array.isArray(q.correctAnswer) && q.correctAnswer.length > 1
                ? "s"
                : ""}
              :{" "}
              {Array.isArray(q.correctAnswer)
                ? q.correctAnswer.join(", ")
                : q.correctAnswer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
