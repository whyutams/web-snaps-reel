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
      <body className="bg-black text-white flex flex-col items-center justify-center h-screen">
        <h2>Terjadi Kesalahan!</h2>
        <button
          onClick={() => reset()}
          className="mt-4 bg-rose-600 text-white px-4 py-2 rounded-full"
        >
          Coba Lagi
        </button>
      </body>
    </html>
  );
}
