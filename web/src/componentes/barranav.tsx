import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { GYM_ACTUAL } from "@/lib/mock-data";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-600/50 flex items-center justify-center text-red-500">
            <Dumbbell className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-white text-base block leading-none">{GYM_ACTUAL.nombreComercial}</span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-tight">Portal del Socio • GymCore</span>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/#planes" className="text-sm text-zinc-400 hover:text-white transition">
            Planes
          </Link>
          <Link href="/#horarios" className="text-sm text-zinc-400 hover:text-white transition">
            Horarios
          </Link>
          <Link
            href="/login"
            className="text-sm bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Portal Socios
          </Link>
        </nav>
      </div>
    </header>
  );
}