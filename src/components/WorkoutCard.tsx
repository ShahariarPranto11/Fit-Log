import { Workout } from "@/types/workout";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden border border-zinc-800 bg-zinc-900 transition hover:border-[#ccff00]"
    >
      {/* Workout Image */}
      <div className="relative h-52">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Workout Information */}
      <div className="p-5">
        {/* Muscle Groups */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="bg-zinc-800 px-2 py-1 text-xs font-semibold uppercase text-[#ccff00]"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold uppercase text-white transition group-hover:text-[#ccff00]">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-zinc-400">{workout.equipment}</p>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4 text-sm text-zinc-400">
          <span className="flex items-center gap-1">
            <Clock size={15} />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={15} />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <Star size={15} className="text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
