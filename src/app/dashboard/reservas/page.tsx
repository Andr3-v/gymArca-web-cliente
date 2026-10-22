"use client";

import { useState } from "react";
import Link from "next/link";
import { CLASES_DISPONIBLES, ClaseGym } from "@/lib/mock-data";
import { ArrowLeft, Calendar, Users, Clock, MapPin, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function ReservasPage() {
  const [clases, setClases] = useState<ClaseGym[]>(CLASES_DISPONIBLES);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const toggleReserva = (id: string) => {
    setClases((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const yaReservada = c.reservadaPorMi;
          const nuevoCupo = yaReservada ? c.cupoOcupado - 1 : c.cupoOcupado + 1;
          
          setMensajeExito(
            yaReservada
              ? `Cancelaste tu reservación para ${c.nombre}.`
              : `¡Lugar reservado con éxito para ${c.nombre}!`
          );

          // Ocultar mensaje después de 3 segundos
          setTimeout(() => setMensajeExito(null), 3000);

          return {
            ...c,
            reservadaPorMi: !yaReservada,
            cupoOcupado: nuevoCupo,
          };
        }
        return c;
      })
    );
  };

  const misReservas = clases.filter((c) => c.reservadaPorMi);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Reservación de Clases</h1>
              <p className="text-xs text-zinc-400">Reserva tu lugar en clases grupales con cupo limitado</p>
            </div>
          </div>
          <span className="text-xs bg-red-950/60 border border-red-800/60 text-red-300 font-medium px-3 py-1.5 rounded-lg">
            {misReservas.length} clase(s) agendada(s)
          </span>
        </div>

        {/* Notificación flotante de confirmación */}
        {mensajeExito && (
          <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl flex items-center gap-2 text-emerald-200 text-xs sm:text-sm animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{mensajeExito}</span>
          </div>
        )}

        {/* Cartelera de clases */}
        <div className="grid md:grid-cols-2 gap-4">
          {clases.map((clase) => {
            const lugaresLibres = clase.cupoMaximo - clase.cupoOcupado;
            const estaLlena = lugaresLibres <= 0 && !clase.reservadaPorMi;

            return (
              <div
                key={clase.id}
                className={`p-5 rounded-xl border transition flex flex-col justify-between ${
                  clase.reservadaPorMi
                    ? "bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/30 border-red-800/80 shadow-md shadow-red-950/20"
                    : "bg-zinc-900/40 border-zinc-800/80"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h2 className="text-base font-bold text-white">{clase.nombre}</h2>
                    {clase.reservadaPorMi ? (
                      <span className="text-[11px] font-bold bg-emerald-950/70 border border-emerald-800/80 text-emerald-300 px-2.5 py-0.5 rounded-full shrink-0">
                        Agendada
                      </span>
                    ) : estaLlena ? (
                      <span className="text-[11px] font-bold bg-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full shrink-0">
                        Sin cupo
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold bg-zinc-800 border border-zinc-700 text-zinc-300 px-2.5 py-0.5 rounded-full shrink-0">
                        {lugaresLibres} disponible(s)
                      </span>
                    )}
                  </div>

                  <div className="space-y-1.5 text-xs text-zinc-400 mt-3">
                    <p className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      <span>{clase.horario} ({clase.duracion})</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                      <span>{clase.salon}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                      <span>Instructor: <strong className="text-zinc-300 font-medium">{clase.instructor}</strong></span>
                    </p>
                  </div>
                </div>

                {/* Barra de progreso de aforo */}
                <div className="mt-5 pt-4 border-t border-zinc-800/60">
                  <div className="flex justify-between text-[11px] text-zinc-500 mb-1">
                    <span>Aforo ocupado</span>
                    <span>{clase.cupoOcupado} / {clase.cupoMaximo}</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        estaLlena ? "bg-amber-500" : "bg-red-600"
                      }`}
                      style={{ width: `${(clase.cupoOcupado / clase.cupoMaximo) * 100}%` }}
                    />
                  </div>

                  {/* Botón de acción */}
                  <button
                    onClick={() => toggleReserva(clase.id)}
                    disabled={estaLlena}
                    className={`w-full mt-4 py-2 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                      clase.reservadaPorMi
                        ? "bg-zinc-800 hover:bg-red-950/40 text-red-400 border border-zinc-700 hover:border-red-900"
                        : estaLlena
                        ? "bg-zinc-800/50 text-zinc-500 cursor-not-allowed border border-zinc-800"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {clase.reservadaPorMi ? (
                      <>
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Cancelar mi reservación</span>
                      </>
                    ) : estaLlena ? (
                      <>
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>Clase agotada</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Reservar mi lugar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}