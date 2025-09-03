"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex h-screen items-center justify-center bg-gray-100">
        <div className="p-6 bg-white rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong!</h2>
          <p className="text-gray-700 mb-4">{error.message}</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
