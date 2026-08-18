import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-2">Halaman Tidak Ditemukan</h2>
      <p className="text-zinc-400 mb-6">Halaman yang Anda cari tidak ada.</p>
      <Link
        href="/"
        className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-full font-semibold transition-all"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
