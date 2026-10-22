import Navbar from "@/componentes/barranav";
import { PLANES_GYM, GYM_ACTUAL } from "@/lib/mock-data";
import { Check, Clock, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center max-w-4xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-red-500 font-semibold bg-red-950/40 border border-red-800/60 px-3 py-1 rounded-full">
  {GYM_ACTUAL.zona}
</span>
<h1 className="text-4xl sm:text-6xl font-extrabold mt-6 tracking-tight">
  Bienvenido a <span className="text-red-600">{GYM_ACTUAL.nombreComercial}</span>
</h1>
<p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
  Portal digital para socios. Consulta tus expedientes de avance físico, rutinas de entrenamiento y vigencia de membresía en cualquier momento.
</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="#planes"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Ver Planes
          </Link>
          <Link
            href="/login"
            className="border border-zinc-700 hover:bg-zinc-900 text-zinc-200 font-semibold px-6 py-3 rounded-lg transition"
          >
            Ingreso a Mi Cuenta
          </Link>
        </div>
      </section>

      {/* Planes y Tarifas */}
      <section id="planes" className="py-16 px-4 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Membresías Disponibles</h2>
          <p className="text-zinc-400 mt-2">Elige el plan que mejor se adapte a tus objetivos</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {PLANES_GYM.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl p-6 border flex flex-col justify-between ${
                plan.destacado
                  ? "border-red-600 bg-zinc-900/80 shadow-lg shadow-red-950/20"
                  : "border-zinc-800 bg-zinc-900/30"
              }`}
            >
              <div>
                {plan.destacado && (
                  <span className="text-xs bg-red-600 text-white font-bold px-2 py-0.5 rounded uppercase">
                    Más Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mt-2">{plan.nombre}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold">${plan.precio}</span>
                  <span className="text-zinc-400 ml-2">/ {plan.periodo}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.beneficios.map((b, i) => (
                    <li key={i} className="flex items-center text-sm text-zinc-300 gap-2">
                      <Check className="h-4 w-4 text-red-500 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/login"
                className="mt-8 block text-center bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2.5 rounded-lg transition"
              >
                Inscribirme
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Información y Horarios */}
      <section id="horarios" className="py-12 border-t border-zinc-900 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <Clock className="h-8 w-8 text-red-500 shrink-0" />
            <div>
        <p className="font-semibold text-white">Horario de Servicio</p>
<p className="text-sm text-zinc-400">{GYM_ACTUAL.horarios.semana}</p>
<p className="text-sm text-zinc-400">{GYM_ACTUAL.horarios.finDeSemana}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <MapPin className="h-8 w-8 text-red-500 shrink-0" />
            <div>
              <p className="font-semibold text-white">Ubicación</p>
              <p className="text-sm text-zinc-400">Zona Metropolitana CDMX</p>
              <p className="text-sm text-zinc-400">Instalaciones con estacionamiento</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <ShieldCheck className="h-8 w-8 text-red-500 shrink-0" />
            <div>
              <p className="font-semibold text-white">Acceso Seguro</p>
              <p className="text-sm text-zinc-400">Validación instantánea en mostrador</p>
              <p className="text-sm text-zinc-400">Credencial digital y código de barras</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}