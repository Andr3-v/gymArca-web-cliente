"use client";

import Link from "next/link";
import { GYM_ACTUAL, SOCIO_EJEMPLO } from "@/lib/mock-data";
import { Dumbbell, Calendar, Activity, CreditCard, User, LogOut, CheckCircle2, AlertTriangle, FileText, Wrench } from "lucide-react";
import ChatbotWidget from "@/componentes/ChatbotWidget";
import GraficaProgreso from "@/componentes/GraficaProgreso";
import RutinaInteractiva from "@/componentes/RutinaInteractiva";

export default function DashboardPage() {
  const socio = SOCIO_EJEMPLO;

const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  window.location.href = "/login";
};
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Barra superior del panel */}
 {/* Cabecera del Dashboard adaptativa */}
<header className="flex flex-col gap-4 border-b border-zinc-800 pb-5">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-600/50 flex items-center justify-center text-red-500 shrink-0">
        <Dumbbell className="h-5 w-5" />
      </div>
      <div>
        <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">
          Hola, {SOCIO_EJEMPLO.nombre.split(" ")[0]}
        </h1>
        <p className="text-[11px] sm:text-xs text-zinc-400 font-mono">
          {SOCIO_EJEMPLO.numeroSocio} • {GYM_ACTUAL.nombreComercial}
        </p>
      </div>
    </div>

    <button
      onClick={handleLogout}
      className="p-2 sm:px-3 sm:py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs flex items-center gap-1.5 transition"
      title="Cerrar sesión"
    >
      <LogOut className="h-4 w-4 text-red-500" />
      <span className="hidden sm:inline">Salir</span>
    </button>
  </div>

  {/* Barra de accesos directos scrolleable en móvil */}
  <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
    <Link
      href="/dashboard/pagos"
      className="shrink-0 flex items-center gap-1.5 text-xs text-zinc-200 border border-zinc-800 bg-zinc-900/80 px-3 py-2 rounded-lg hover:border-zinc-700 transition"
    >
      <CreditCard className="h-3.5 w-3.5 text-red-500" />
      <span>Mis Pagos</span>
    </Link>
    <Link
      href="/dashboard/reservas"
      className="shrink-0 flex items-center gap-1.5 text-xs text-zinc-200 border border-zinc-800 bg-zinc-900/80 px-3 py-2 rounded-lg hover:border-zinc-700 transition"
    >
      <Calendar className="h-3.5 w-3.5 text-red-500" />
      <span>Reservar</span>
    </Link>
    <Link
      href="/dashboard/facturacion"
      className="shrink-0 flex items-center gap-1.5 text-xs text-zinc-200 border border-zinc-800 bg-zinc-900/80 px-3 py-2 rounded-lg hover:border-zinc-700 transition"
    >
      <FileText className="h-3.5 w-3.5 text-red-500" />
      <span>Facturación</span>
    </Link>
    <Link
      href="/dashboard/reportes"
      className="shrink-0 flex items-center gap-1.5 text-xs text-zinc-200 border border-zinc-800 bg-zinc-900/80 px-3 py-2 rounded-lg hover:border-zinc-700 transition"
    >
      <Wrench className="h-3.5 w-3.5 text-red-500" />
      <span>Reportar Equipo</span>
    </Link>
  </div>
</header>

      {/* Contenido principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Banner de bienvenida y estatus de membresía */}
        <section className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950/30 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-red-500">Resumen de cuenta</span>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1 text-white">Hola, {socio.nombre.split(" ")[0]}</h1>
            <p className="text-sm text-zinc-400 mt-1">Plan contratado: <strong className="text-zinc-200">{socio.membresia.plan}</strong></p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-950/80 border border-zinc-800 px-4 py-3 rounded-xl">
            {socio.membresia.estatus === "ACTIVA" ? (
              <CheckCircle2 className="h-7 w-7 text-emerald-500 shrink-0" />
            ) : (
              <AlertTriangle className="h-7 w-7 text-amber-500 shrink-0" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-medium">Estado:</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                  {socio.membresia.estatus}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Vence el {socio.membresia.fechaVencimiento} ({socio.membresia.diasRestantes} días restantes)
              </p>
            </div>
          </div>
        </section>

        {/* Tarjetas de métricas del expediente físico */}
        <section className="grid sm:grid-cols-3 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-red-950/40 text-red-500 border border-red-900/40">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-zinc-400">Peso actual</p>
              <p className="text-2xl font-extrabold text-white mt-0.5">{socio.expediente.peso} kg</p>
              <p className="text-[11px] text-zinc-500">Última medición: {socio.expediente.ultimoRegistro}</p>
              <GraficaProgreso />
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700">
              <User className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-zinc-400">Estatura</p>
              <p className="text-2xl font-extrabold text-white mt-0.5">{socio.expediente.estatura} m</p>
              <p className="text-[11px] text-zinc-500">Índice IMC: 25.0 (Normal)</p>
              <GraficaProgreso />
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-amber-950/40 text-amber-500 border border-amber-900/40">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-zinc-400">% Grasa corporal</p>
              <p className="text-2xl font-extrabold text-white mt-0.5">{socio.expediente.grasaCorporal}</p>
              <p className="text-[11px] text-emerald-400">Objetivo en progreso</p>
              <GraficaProgreso />
            </div>
          </div>
        </section>

        {/* Sección de Rutina del Día (Avance de la propuesta de valor) */}
       <RutinaInteractiva />
      
      {/* Pie de página con enlace legal */}
      <footer className="border-t border-zinc-800/80 py-8 text-center text-xs text-zinc-500 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {GYM_ACTUAL.nombreComercial}. Todos los derechos reservados. Impulsado por GymCore.</p>
          <div className="flex gap-4">
            <Link href="/aviso-privacidad" className="hover:text-zinc-300 underline transition">
              Aviso de Privacidad
            </Link>
          </div>
        </div>
      </footer>
      </main>

      {/* Widget Flotante del Chatbot */}
      <ChatbotWidget />
    </div>
  );
}