"use client";
import {
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  Flame,
  Star,
  X,
  Dumbbell,
} from "lucide-react";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "@/components/Navbar";
import { Workout } from "@/types/workout";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const MyPlan = () => {
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [toast, setToast] = useState("");

  // Load saved data from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const storedPlan = JSON.parse(
          localStorage.getItem("fitlog-plan") || "[]",
        );

        const storedSaved = JSON.parse(
          localStorage.getItem("fitlog-saved") || "[]",
        );

        const storedCompleted = JSON.parse(
          localStorage.getItem("fitlog-done") || "[]",
        );

        setPlan(Array.isArray(storedPlan) ? storedPlan : []);
        setSaved(Array.isArray(storedSaved) ? storedSaved : []);
        setCompleted(Array.isArray(storedCompleted) ? storedCompleted : []);
      } catch {
        setPlan([]);
        setSaved([]);
        setCompleted([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    window.addEventListener("fitlog-update", loadData);

    return () => {
      window.removeEventListener("fitlog-update", loadData);
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  // Remove a workout from today's plan
  const removeFromPlan = (id: number) => {
    const updatedPlan = plan.filter((item) => item.id !== id);

    setPlan(updatedPlan);
    localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));

    window.dispatchEvent(new Event("fitlog-update"));

    showToast("Workout removed from today's plan");
  };

  // Remove a workout from saved list
  const removeFromSaved = (id: number) => {
    const updatedSaved = saved.filter((item) => item.id !== id);

    setSaved(updatedSaved);
    localStorage.setItem("fitlog-saved", JSON.stringify(updatedSaved));

    window.dispatchEvent(new Event("fitlog-update"));

    showToast("Workout removed from saved");
  };

  // Mark a workout as done
  const markAsDone = (id: number) => {
    if (completed.includes(id)) {
      showToast("Workout already completed");
      return;
    }

    const updatedCompleted = [...completed, id];

    setCompleted(updatedCompleted);
    localStorage.setItem("fitlog-done", JSON.stringify(updatedCompleted));

    showToast("Workout marked as done!");
  };

  // Sort current list
  const currentList = activeTab === "plan" ? plan : saved;

  const sortedWorkouts = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  // Today's Plan metrics
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className="fixed right-4 top-20 z-50 flex items-center gap-3 border border-[#ccff00] bg-zinc-900 px-5 py-4 shadow-xl">
          <CheckCircle className="text-[#ccff00]" size={20} />
          <span className="text-sm">{toast}</span>
        </div>
      )}

      <section className="mx-auto min-h-[70vh] max-w-7xl px-4 py-12">
        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#ccff00]">
              YOUR WORKOUT LOG
            </p>

            <h1 className="text-4xl font-black uppercase sm:text-6xl">
              MY PLAN
            </h1>

            <p className="mt-4 text-zinc-400">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 border border-zinc-700 px-5 py-3 text-sm font-bold transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            BROWSE WORKOUTS
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase text-zinc-400">
                Exercises
              </p>
              <Dumbbell className="text-[#ccff00]" size={20} />
            </div>

            <p className="mt-4 text-4xl font-black">{plan.length}</p>
            <p className="mt-2 text-xs text-zinc-500">
              Today&apos;s planned lifts
            </p>
          </div>

          <div className="border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase text-zinc-400">
                Minutes
              </p>
              <Clock className="text-[#ccff00]" size={20} />
            </div>

            <p className="mt-4 text-4xl font-black">{totalMinutes}</p>
            <p className="mt-2 text-xs text-zinc-500">Total workout time</p>
          </div>

          <div className="border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase text-zinc-400">
                Calories
              </p>
              <Flame className="text-[#ccff00]" size={20} />
            </div>

            <p className="mt-4 text-4xl font-black">{totalCalories}</p>
            <p className="mt-2 text-xs text-zinc-500">Estimated calories</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-5 border-b border-zinc-800 sm:flex-row sm:items-center">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("plan")}
              className={`border-b-2 pb-4 text-sm font-bold uppercase transition ${
                activeTab === "plan"
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-zinc-500 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({plan.length})
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`border-b-2 pb-4 text-sm font-bold uppercase transition ${
                activeTab === "saved"
                  ? "border-[#ccff00] text-[#ccff00]"
                  : "border-transparent text-zinc-500 hover:text-white"
              }`}
            >
              Saved ({saved.length})
            </button>
          </div>

          <div className="mb-3 flex items-center gap-3 sm:mb-0">
            <label
              htmlFor="sort-workouts"
              className="text-xs font-semibold uppercase text-zinc-500"
            >
              Sort By
            </label>

            <select
              id="sort-workouts"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white outline-none focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-60 items-center justify-center gap-4">
            <span className="loading loading-spinner loading-lg text-[#ccff00]" />
            <p className="text-zinc-400">Loading workouts...</p>
          </div>
        ) : sortedWorkouts.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-80 flex-col items-center justify-center py-16 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              <Dumbbell size={28} className="text-zinc-500" />
            </div>

            <h2 className="text-2xl font-black uppercase">NOTHING HERE YET</h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:bg-white"
            >
              Go to workouts
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          /* Workout Cards */
          <div className="mt-8 space-y-4">
            {sortedWorkouts.map((workout) => (
              <div
                key={workout.id}
                className="flex flex-col gap-5 border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-600 sm:flex-row sm:items-center"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-32 sm:w-40">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 160px"
                    className="object-cover"
                  />
                </div>

                {/* Workout Info */}
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="bg-zinc-800 px-2 py-1 text-xs font-semibold uppercase text-[#ccff00]"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-black uppercase">
                    {workout.name}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-400">
                    {workout.equipment}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1">
                      <Flame size={14} />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-[#ccff00]" />
                      {workout.rating}
                    </span>
                  </div>

                  {activeTab === "plan" && completed.includes(workout.id) && (
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#ccff00]">
                      <CheckCircle size={15} />
                      COMPLETED
                    </span>
                  )}
                </div>

                
                <div className="flex flex-wrap items-center gap-2 sm:w-44 sm:justify-end">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="flex flex-1 items-center justify-center border border-zinc-700 px-3 py-2 text-xs font-bold transition hover:border-[#ccff00] hover:text-[#ccff00] sm:flex-none"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" ? (
                    <button
                      onClick={() => markAsDone(workout.id)}
                      disabled={completed.includes(workout.id)}
                      className="flex flex-1 items-center justify-center gap-1 bg-[#ccff00] px-3 py-2 text-xs font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
                    >
                      <Check size={15} />
                      {completed.includes(workout.id) ? "Done" : "Mark as Done"}
                    </button>
                  ) : null}

                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    aria-label={`Remove ${workout.name}`}
                    className="flex h-9 w-9 items-center justify-center border border-zinc-700 text-zinc-400 transition hover:border-red-500 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row">
          <Link href="/" className="font-black tracking-widest">
            FIT<span className="text-[#ccff00]">LOG</span>
          </Link>

          <p className="text-sm text-zinc-500">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default MyPlan;
