"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-6 max-w-3xl mx-auto text-center">
      <h2 className="text-xl font-bold text-red-600 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-500">{error.message}</p>
    </div>
  );
}
