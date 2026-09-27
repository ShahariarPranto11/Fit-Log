"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, CheckCircle, Plus } from "lucide-react";

import Navbar from "@/components/Navbar";
import { Workout } from "@/types/workout";

const WorkoutDetails = () => {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(
          `https://api.api-store.workers.dev/api/fitlog/${id}`,
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data: Workout = await response.json();
        setWorkout(data);
      } catch {
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const addToPlan = () => {
    if (!workout) return;

    const currentPlan: Workout[] = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]",
    );

    if (currentPlan.some((item) => item.id === workout.id)) {
      showToast("Workout already in today's plan");
      return;
    }

    if (currentPlan.length >= 5) {
      showToast("Today's plan is full (5 workouts)");
      return;
    }

    const updatedPlan = [...currentPlan, workout];

    localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));

    window.dispatchEvent(new Event("fitlog-update"));

    showToast("Added to today's plan!");
  };

  const saveForLater = () => {
    if (!workout) return;

    const currentSaved: Workout[] = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]",
    );

    if (currentSaved.some((item) => item.id === workout.id)) {
      showToast("Workout already saved");
      return;
    }

    const updatedSaved = [...currentSaved, workout];

    localStorage.setItem("fitlog-saved", JSON.stringify(updatedSaved));

    window.dispatchEvent(new Event("fitlog-update"));

    showToast("Workout saved for later!");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-[#ccff00]" />
          <p className="ml-4 text-zinc-400">Loading workout...</p>
        </div>
      </main>
    );
  }

  if (!workout) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-black">WORKOUT NOT FOUND</h1>
          <Link
            href="/"
            className="bg-[#ccff00] px-6 py-3 font-bold text-black"
          >
            Back to Library
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed right-4 top-20 z-50 flex items-center gap-3 border border-[#ccff00] bg-zinc-900 px-5 py-4 text-white shadow-xl">
          <CheckCircle className="text-[#ccff00]" size={20} />
          <span>{toast}</span>
        </div>
      )}

      <section className="mx-auto max-w-7xl px-4 py-10">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-[#ccff00]"
        >
          <ArrowLeft size={18} />
          BACK TO LIBRARY
        </button>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left: Workout Image */}
          <div className="relative min-h-87.5 overflow-hidden border border-zinc-800 lg:min-h-[600px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right: Workout Details */}
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="bg-zinc-900 px-3 py-1 text-xs font-bold uppercase text-[#ccff00]"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-black uppercase leading-tight sm:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-5 leading-7 text-zinc-400">
              {workout.description}
            </p>

            {/* Key Specs */}
            <div className="mt-8 border border-zinc-800 bg-zinc-900 p-5">
              <h2 className="mb-4 text-lg font-bold uppercase">KEY SPECS</h2>

              <div className="divide-y divide-zinc-800">
                {[
                  ["Equipment", workout.equipment],
                  ["Difficulty", workout.difficulty],
                  ["Sets", workout.sets],
                  ["Reps", workout.reps],
                  ["Duration", `${workout.duration} min`],
                  ["Calories", `${workout.caloriesBurned} kcal`],
                  ["Rating", `${workout.rating} / 5`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <span className="uppercase text-zinc-500">{label}</span>
                    <span className="text-right font-semibold text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="mb-5 text-xl font-black uppercase">
                INSTRUCTIONS
              </h2>

              <div className="space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#ccff00] font-black text-black">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="pt-1 text-sm leading-6 text-zinc-400">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={addToPlan}
                className="flex flex-1 items-center justify-center gap-2 bg-[#ccff00] px-5 py-4 font-black uppercase text-black transition hover:bg-white"
              >
                <Plus size={20} />
                Add to today&apos;s plan
              </button>

              <button
                onClick={saveForLater}
                className="flex flex-1 items-center justify-center gap-2 border border-zinc-700 px-5 py-4 font-bold uppercase transition hover:border-[#ccff00] hover:text-[#ccff00]"
              >
                <Bookmark size={20} />
                Save for later
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row">
          <p className="font-black tracking-widest">
            FIT<span className="text-[#ccff00]">LOG</span>
          </p>
          <p className="text-sm text-zinc-500">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default WorkoutDetails;
