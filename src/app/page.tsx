"use client";

import { useEffect, useState } from "react";
import Navbar from "@/componentes/barranav";
import ChatbotWidget from "@/componentes/ChatbotWidget";
import Link from "next/link";
import { Check, Dumbbell, Clock, MapPin } from "lucide-react";
import { PLANES_GYM, GYM_ACTUAL, Plan } from "@/lib/mock-data";
import { obtenerCatalogoPublico } from "@/lib/api-client";

interface PlanRemotoBackend {
  id: string;
  code: string;
  name: string;
  description?: string;
  billingPeriod: string;
  price?: {
    amount: string;
    currency: string;
  };
}

export default function Home() {
  const [nombreGimnasio, setNombreGimnasio] = useState(GYM_ACTUAL.nombreComercial);
  const [planes, setPlanes] = useState<Plan[]>(PLANES_GYM);
  const [horario, setHorario] = useState(
    `${GYM_ACTUAL.horarios.semana}. ${GYM_ACTUAL.horarios.finDeSemana}`
  );
  const [direccion, setDireccion] = useState(GYM_ACTUAL.direccion);

  useEffect(() => {
    async function cargarDatosRemotos() {
      try {
        const catalogo = await obtenerCatalogoPublico("gym-esparta-cdmx");
        if (catalogo) {
          if (catalogo.tenantName) setNombreGimnasio(catalogo.tenantName);
          if (catalogo.branches?.[0]?.openingHoursText) {
            setHorario(catalogo.branches[0].openingHoursText);
          }
          if (catalogo.branches?.[0]?.address) {
            setDireccion(catalogo.branches[0].address);
          }
          if (catalogo.plans && catalogo.plans.length > 0) {
            const formateados: Plan[] = catalogo.plans.map((p: PlanRemotoBackend) => ({
              id: p.id,
              nombre: p.name,
              precio: Number(p.price?.amount || 0),
              periodo: p.billingPeriod === "MONTHLY" ? "mes" : "anual",
              beneficios: [p.description || "Acceso general"],
              destacado: p.code === "PLAN-MENSUAL",
            }));
            setPlanes(formateados);
          }
        }
      } catch {
        // En caso de que el backend no esté activo, mantiene los valores por defecto sin romperse
      }
    }

    cargarDatosRemotos();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center max-w-4xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-red-500 font-semibold bg-red-950/40 border border-red-800/60 px-3 py-1 rounded-full">
          {GYM_ACTUAL.zona}
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold mt-6 tracking-tight">
          Bienvenido a <span className="text-red-600">{nombreGimnasio}</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
          Portal digital para socios. Consulta tus expedientes de avance físico, rutinas de entrenamiento y vigencia de membresía en cualquier momento.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/login"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-red-950/40"
          >
            Acceder a mi Portal
          </Link>
          <a
            href="#planes"
            className="border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-semibold px-6 py-3 rounded-xl transition"
          >
            Ver Planes
          </a>
        </div>
      </section>

      {/* Horarios */}
      <section id="horarios" className="py-12 border-y border-zinc-800/80 bg-zinc-900/20">
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="p-3 bg-red-600/10 border border-red-600/30 rounded-xl text-red-500 shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-white">Horario de Servicio</p>
              <p className="text-xs sm:text-sm text-zinc-400">{horario}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="p-3 bg-red-600/10 border border-red-600/30 rounded-xl text-red-500 shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-white">Ubicación</p>
              <p className="text-xs sm:text-sm text-zinc-400">{direccion}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Planes de Membresía */}
      <section id="planes" className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">Membresías Disponibles</h2>
        <p className="text-center text-zinc-400 text-sm mb-12">Elige el plan que mejor se adapte a tus objetivos</p>

        <div className="grid md:grid-cols-3 gap-6">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-6 border transition flex flex-col justify-between ${
                plan.destacado
                  ? "bg-zinc-900 border-red-600/80 shadow-xl shadow-red-950/20"
                  : "bg-zinc-900/40 border-zinc-800"
              }`}
            >
              <div>
                <h3 className="text-lg font-bold text-white">{plan.nombre}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">${plan.precio}</span>
                  <span className="text-xs text-zinc-400">/{plan.periodo}</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                  {plan.beneficios.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-red-500 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/login"
                className={`mt-8 w-full py-2.5 rounded-xl text-center text-xs font-semibold transition block ${
                  plan.destacado
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white"
                }`}
              >
                Inscribirme
              </Link>
            </div>
          ))}
        </div>
      </section>

      <ChatbotWidget />
    </main>
  );
}