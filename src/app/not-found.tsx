
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center text-white">
      <p className="mb-4 font-bold tracking-widest text-[#ccff00]">
        FITLOG — 404
      </p>

      <h1 className="text-7xl font-black sm:text-9xl">
        404
      </h1>

      <h2 className="mt-5 text-2xl font-bold uppercase">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-zinc-400">
        The workout or page you&apos;re looking for doesn&apos;t exist.
        Let&apos;s get you back to training.
      </p>

      <Link
        href="/"
        className="mt-8 flex items-center gap-2 bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:bg-white"
      >
        <ArrowLeft size={18} />
        Back to Workouts
      </Link>
    </main>
  );
};

export default NotFound;