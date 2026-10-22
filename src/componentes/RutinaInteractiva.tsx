"use client";

import { useState } from "react";
import { RUTINA_DEL_DIA_INICIAL, EjercicioRutina } from "@/lib/mock-data";
import { CheckCircle2, Circle, Dumbbell, Save, Flame, Trophy } from "lucide-react";

export default function RutinaInteractiva() {
  const [ejercicios, setEjercicios] = useState<EjercicioRutina[]>(RUTINA_DEL_DIA_INICIAL);
  const [guardado, setGuardado] = useState(false);

  // Alternar completado de una serie
  const toggleSerie = (ejercicioId: string, serieNumero: number) => {
    setEjercicios((prev) =>
      prev.map((ej) => {
        if (ej.id === ejercicioId) {
          return {
            ...ej,
            series: ej.series.map((s) =>
              s.numero === serieNumero ? { ...s, completada: !s.completada } : s
            ),
          };
        }
        return ej;
      })
    );
  };

  // Actualizar peso levantado
  const cambiarPeso = (ejercicioId: string, serieNumero: number, nuevoPeso: number) => {
    setEjercicios((prev) =>
      prev.map((ej) => {
        if (ej.id === ejercicioId) {
          return {
            ...ej,
            series: ej.series.map((s) =>
              s.numero === serieNumero ? { ...s, pesoReal: nuevoPeso } : s
            ),
          };
        }
        return ej;
      })
    );
  };

  // Calcular métricas de progreso de la sesión
  const totalSeries = ejercicios.reduce((acc, ej) => acc + ej.series.length, 0);
  const seriesHechas = ejercicios.reduce(
    (acc, ej) => acc + ej.series.filter((s) => s.completada).length,
    0
  );
  const porcentaje = Math.round((seriesHechas / totalSeries) * 100);

  const handleGuardarSesion = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 space-y-5">
      {/* Cabecera de la rutina */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-red-950/60 border border-red-800/60 text-red-400 font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Sesión de Hoy
            </span>
            <span className="text-xs text-zinc-400">Torso • Empuje</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">Rutina de Entrenamiento Activa</h2>
        </div>

        {/* Barra de progreso de la sesión */}
        <div className="flex items-center gap-3 w-full sm:w-auto bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl">
          <Flame className={`h-5 w-5 ${porcentaje === 100 ? "text-emerald-400" : "text-amber-500"}`} />
          <div className="flex-1 sm:w-36">
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
              <span>Completado</span>
              <span className="font-bold text-white">{porcentaje}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 transition-all duration-300"
                style={{ width: `${porcentaje}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {guardado && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-lg text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
          <Trophy className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>¡Sesión de entrenamiento registrada con éxito en tu expediente!</span>
        </div>
      )}

      {/* Lista de ejercicios interactivos */}
      <div className="space-y-4">
        {ejercicios.map((ejercicio) => (
          <div
            key={ejercicio.id}
            className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-900 text-red-500 border border-zinc-800">
                  <Dumbbell className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{ejercicio.nombre}</h3>
                  <p className="text-[11px] text-zinc-500">Músculo: {ejercicio.musculo} • Descanso: {ejercicio.descanso}</p>
                </div>
              </div>
            </div>

            {/* Tabla de series */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs text-zinc-400 font-medium px-2 py-1 bg-zinc-900/50 rounded-lg">
              <span>Serie</span>
              <span>Objetivo</span>
              <span>Carga (kg)</span>
              <span>Estado</span>
            </div>

            <div className="space-y-1.5">
              {ejercicio.series.map((serie) => (
                <div
                  key={serie.numero}
                  className={`grid grid-cols-4 gap-2 items-center text-center p-2 rounded-lg border transition ${
                    serie.completada
                      ? "bg-zinc-900/60 border-emerald-900/40 text-zinc-200"
                      : "bg-zinc-900/20 border-zinc-800/60 text-zinc-400"
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-zinc-300">#{serie.numero}</span>
                  <span className="text-xs">{serie.repsObjetivo}</span>
                  
                  {/* Input de peso en kg */}
                 {/* Selector de peso y toggle adaptativo */}
<div className="flex justify-center">
  <input
    type="number"
    value={serie.pesoReal ?? serie.pesoSugerido}
    onChange={(e) => cambiarPeso(ejercicio.id, serie.numero, Number(e.target.value))}
    className="w-14 sm:w-16 bg-zinc-950 border border-zinc-700 rounded px-1.5 py-1 text-center text-xs text-white focus:outline-none focus:border-red-600 font-mono"
  />
</div>

<div className="flex justify-center">
  <button
    onClick={() => toggleSerie(ejercicio.id, serie.numero)}
    className="p-1 transition transform active:scale-90"
  >
    {serie.completada ? (
      <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
    ) : (
      <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-zinc-600 hover:text-zinc-400" />
    )}
  </button>
</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botón para guardar sesión */}
      <button
        onClick={handleGuardarSesion}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-red-950/30"
      >
        <Save className="h-4 w-4" />
        <span>Guardar Registro de Entrenamiento</span>
      </button>
    </div>
  );
}