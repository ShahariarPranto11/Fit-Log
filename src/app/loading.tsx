const Loading = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex items-center gap-3 text-white">
        <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
        <p className="text-zinc-400">Loading workouts...</p>
      </div>
    </main>
  );
};

export default Loading;