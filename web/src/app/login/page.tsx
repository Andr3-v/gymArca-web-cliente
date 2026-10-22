"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      // Llamada al BFF de Next.js
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Redirigir al panel del socio
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4">
      <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white mb-8">
        <Dumbbell className="h-7 w-7 text-red-600" />
        <span>GYM ARCA</span>
      </Link>

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-white text-center">Portal del Socio</h2>
        <p className="text-sm text-zinc-400 text-center mt-1">
          Ingresa tus credenciales para ver tu avance y rutinas
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-950/50 border border-red-800/80 rounded-lg flex items-center gap-2 text-red-300 text-xs">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Correo electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="socio@ejemplo.com"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-600 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-2.5 rounded-lg transition text-sm mt-2 flex items-center justify-center gap-2"
          >
            {cargando ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Validando...</span>
              </>
            ) : (
              <span>Iniciar Sesión</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-500">
          ¿Problemas para acceder? Acude a recepción para reactivar tu cuenta.
        </div>
      </div>
    </div>
  );
}