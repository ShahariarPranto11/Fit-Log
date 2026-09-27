import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/banner.png";

const Hero = () => {
  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Side */}
          <div>
            <p className="text-[#ccff00] text-sm font-semibold tracking-widest mb-4">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              TRAIN WITH INTENT.LOG
              <br />
              EVERY SET.
            </h1>

            <p className="text-zinc-400 mt-6 max-w-xl text-base md:text-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 mt-8"
            >
              BROWSE WORKOUTS
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right Side */}
          <div className="relative h-87.5 md:h-112.5">
            <Image
              src={heroBanner}
              alt="FitLog workout"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
