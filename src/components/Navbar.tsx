"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      try {
        const plan = JSON.parse(localStorage.getItem("fitlog-plan") || "[]");

        const saved = JSON.parse(localStorage.getItem("fitlog-saved") || "[]");

        setPlanCount(Array.isArray(plan) ? plan.length : 0);
        setSavedCount(Array.isArray(saved) ? saved.length : 0);
      } catch {
        setPlanCount(0);
        setSavedCount(0);
      }
    };

    updateCounts();

    window.addEventListener("fitlog-update", updateCounts);
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener("fitlog-update", updateCounts);
      window.removeEventListener("storage", updateCounts);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-800 bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src={logo} alt="FitLog Logo" width={35} height={35} />

          <span className="font-bold text-white">FITLOG</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className={`text-sm font-semibold transition ${
              pathname === "/"
                ? "text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-semibold transition ${
              pathname === "/my-plan"
                ? "text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Plan and Saved Counters */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-bold text-black transition hover:bg-white sm:text-sm"
          >
            Plan {planCount}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-zinc-600 px-3 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-[#ccff00] hover:text-[#ccff00] sm:text-sm"
          >
            Saved {savedCount}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
