import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { GYM_ACTUAL } from "@/lib/mock-data";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-600/20 border border-red-600/50 flex items-center justify-center text-red-500 shrink-0">
            <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="truncate">
            <span className="font-bold text-white text-sm sm:text-base block leading-none truncate">
              {GYM_ACTUAL.nombreComercial}
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono tracking-tight block">
              Portal del Socio • GymCore
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-6 shrink-0">
          <Link href="/#planes" className="hidden sm:inline text-sm text-zinc-400 hover:text-white transition">
            Planes
          </Link>
          <Link href="/#horarios" className="hidden sm:inline text-sm text-zinc-400 hover:text-white transition">
            Horarios
          </Link>
          <Link
            href="/login"
            className="text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition"
          >
            Portal Socios
          </Link>
        </nav>
      </div>
    </header>
  );
}