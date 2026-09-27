import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import { Workout } from "@/types/workout";


const getWorkouts = async () => {
  const response = await fetch("https://api.api-store.workers.dev/api/fitlog");

  const data = await response.json();

  return data;
};

const Home = async () => {
  const workouts: Workout[] = await getWorkouts();
  return (
    <>
      <Navbar />
      <Hero />
      

      <section id="library" className="bg-black py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-4xl font-black text-white">THE LIBRARY</h2>

          <p className="text-zinc-400 mt-2">
            Twelve lifts covering every major muscle group.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
