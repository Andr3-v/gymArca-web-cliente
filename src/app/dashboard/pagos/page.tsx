"use client";

import Link from "next/link";
import { HISTORIAL_PAGOS, SOCIO_EJEMPLO } from "@/lib/mock-data";
import { ArrowLeft, CreditCard, Download, Receipt, CheckCircle } from "lucide-react";

export default function PagosPage() {
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
              <h1 className="text-2xl font-bold text-white">Historial de Pagos</h1>
              <p className="text-xs text-zinc-400">Consulta y descarga tus comprobantes de pago</p>
            </div>
          </div>
          <span className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-400 hidden sm:block">
            Socio: {SOCIO_EJEMPLO.numeroSocio}
          </span>
        </div>

        {/* Resumen */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center gap-4">
            <div className="p-3 bg-red-950/40 border border-red-900/40 rounded-lg text-red-500">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-zinc-400">Plan actual</p>
              <p className="text-lg font-bold text-white">{SOCIO_EJEMPLO.membresia.plan}</p>
              <p className="text-xs text-emerald-400">Estado: {SOCIO_EJEMPLO.membresia.estatus}</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center gap-4">
            <div className="p-3 bg-emerald-950/40 border border-emerald-900/40 rounded-lg text-emerald-500">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-zinc-400">Próximo vencimiento</p>
              <p className="text-lg font-bold text-white">{SOCIO_EJEMPLO.membresia.fechaVencimiento}</p>
              <p className="text-xs text-zinc-400">Restan {SOCIO_EJEMPLO.membresia.diasRestantes} días</p>
            </div>
          </div>
        </div>

        {/* Tabla de Pagos */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center gap-2">
            <Receipt className="h-5 w-5 text-zinc-400" />
            <h2 className="text-sm font-semibold text-white">Comprobantes emitidos</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Folio</th>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Concepto</th>
                  <th className="px-4 py-3">Método</th>
                  <th className="px-4 py-3">Monto</th>
                  <th className="px-4 py-3 text-right">Comprobante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {HISTORIAL_PAGOS.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-900/30 transition">
                    <td className="px-4 py-3 font-mono text-xs text-red-400">{p.folio}</td>
                    <td className="px-4 py-3 text-zinc-300">{p.fecha}</td>
                    <td className="px-4 py-3 font-medium text-white">{p.concepto}</td>
                    <td className="px-4 py-3 text-xs text-zinc-400">{p.metodo}</td>
                    <td className="px-4 py-3 font-bold text-white">${p.monto.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => alert(`Descargando comprobante oficial ${p.folio} en PDF...`)}
                        className="inline-flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-700 transition"
                      >
                        <Download className="h-3.5 w-3.5 text-zinc-400" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}