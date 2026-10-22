"use client";

import { useState } from "react";
import Link from "next/link";
import { REPORTES_EQUIPO_INICIALES, ReporteIncidencia } from "@/lib/mock-data";
import { ArrowLeft, Wrench, AlertTriangle, CheckCircle2, Plus, Clock, ShieldAlert } from "lucide-react";

export default function ReportesPage() {
  const [reportes, setReportes] = useState<ReporteIncidencia[]>(REPORTES_EQUIPO_INICIALES);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  // Campos del formulario
  const [equipo, setEquipo] = useState("");
  const [area, setArea] = useState<ReporteIncidencia["area"]>("Cardio");
  const [prioridad, setPrioridad] = useState<ReporteIncidencia["prioridad"]>("MEDIA");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!equipo.trim() || !descripcion.trim()) return;

    const nuevoReporte: ReporteIncidencia = {
      id: `rep-${Date.now().toString().slice(-4)}`,
      equipo,
      area,
      prioridad,
      descripcion,
      estatus: "REPORTADO",
      fechaReporte: new Date().toISOString().split("T")[0],
    };

    setReportes([nuevoReporte, ...reportes]);
    setEquipo("");
    setDescripcion("");
    setMostrarFormulario(false);
    setMensajeExito("¡Reporte generado y canalizado al personal de mantenimiento!");
    setTimeout(() => setMensajeExito(null), 3500);
  };

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
              <h1 className="text-2xl font-bold text-white">Reporte de Mantenimiento</h1>
              <p className="text-xs text-zinc-400">Ayúdanos a conservar los aparatos e instalaciones en óptimas condiciones</p>
            </div>
          </div>

          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-lg transition shadow-lg shadow-red-950/40"
          >
            <Plus className="h-4 w-4" />
            <span>Reportar Aparato</span>
          </button>
        </div>

        {mensajeExito && (
          <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl flex items-center gap-2 text-emerald-200 text-xs sm:text-sm animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{mensajeExito}</span>
          </div>
        )}

        {/* Formulario desplegable */}
        {mostrarFormulario && (
          <form
            onSubmit={handleSubmit}
            className="p-5 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-4 animate-in fade-in"
          >
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              <h2 className="text-sm font-bold text-white">Levantar Incidencia de Equipo</h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">Nombre o Número del Aparato</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Caminadora 2, Banco declinado..."
                  value={equipo}
                  onChange={(e) => setEquipo(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Área de las Instalaciones</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value as ReporteIncidencia["area"])}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-600"
                >
                  <option value="Cardio">Cardio</option>
                  <option value="Fuerza y Peso Libre">Fuerza y Peso Libre</option>
                  <option value="Salones">Salones de Clase</option>
                  <option value="Vestidores">Vestidores y Regaderas</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Nivel de Urgencia</label>
                <select
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value as ReporteIncidencia["prioridad"])}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-600"
                >
                  <option value="BAJA">Baja (Detalle estético o ruido leve)</option>
                  <option value="MEDIA">Media (Afecta el funcionamiento)</option>
                  <option value="ALTA">Alta (Riesgo de lesión o inoperable)</option>
                </select>
              </div>
            </div>

            <div className="text-xs">
              <label className="text-zinc-400 block mb-1">Descripción del problema</label>
              <textarea
                required
                rows={3}
                placeholder="Describe qué falla presenta el aparato..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-600 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMostrarFormulario(false)}
                className="px-3 py-1.5 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white text-xs"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-xs transition"
              >
                Enviar Reporte
              </button>
            </div>
          </form>
        )}

        {/* Listado de reportes activos */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-zinc-400" />
              <h2 className="text-sm font-semibold text-white">Estado de Incidencias</h2>
            </div>
            <span className="text-xs text-zinc-400">{reportes.length} registros</span>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {reportes.map((rep) => (
              <div key={rep.id} className="p-4 hover:bg-zinc-900/30 transition space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-red-400">{rep.id}</span>
                    <span className="font-semibold text-sm text-white">{rep.equipo}</span>
                    <span className="text-[10px] bg-zinc-800 border border-zinc-700 text-zinc-300 px-2 py-0.5 rounded">
                      {rep.area}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        rep.prioridad === "ALTA"
                          ? "bg-red-950/80 text-red-300 border border-red-800"
                          : rep.prioridad === "MEDIA"
                          ? "bg-amber-950/80 text-amber-300 border border-amber-800"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                      }`}
                    >
                      Prioridad {rep.prioridad}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        rep.estatus === "RESUELTO"
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                          : rep.estatus === "EN_REVISION"
                          ? "bg-blue-950/80 text-blue-300 border border-blue-800"
                          : "bg-zinc-800 text-zinc-300 border border-zinc-700"
                      }`}
                    >
                      {rep.estatus === "EN_REVISION" ? "En Reparación" : rep.estatus}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400">{rep.descripcion}</p>

                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                  <Clock className="h-3 w-3" />
                  <span>Reportado el {rep.fechaReporte}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}