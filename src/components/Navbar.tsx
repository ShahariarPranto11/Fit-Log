import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="FitLog Logo" width={35} height={35} />

          <span className="font-bold text-white">FITLOG</span>
        </Link>

        {/* Navigation */}
        <div className="flex gap-6">
          <Link href="/" className="text-zinc-400">
            Workouts
          </Link>

          <Link href="/my-plan" className="text-zinc-400">
            My Plan
          </Link>
        </div>

        
        <div className="flex gap-2">
          <Link
            href="/my-plan"
            className="bg-[#CCFF00] text-black px-3 py-1 rounded-full text-sm"
          >
            Plan 0
          </Link>

          <Link
            href="/my-plan"
            className="border border-zinc-600 text-mist-400 px-3 py-1 rounded-full text-sm"
          >
            Saved 0
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
