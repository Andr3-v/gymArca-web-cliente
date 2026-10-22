"use client";

import { useState } from "react";
import Link from "next/link";
import { DATOS_FISCALES_DEFECTO, FACTURAS_HISTORIAL, HISTORIAL_PAGOS, DatosFiscales, FacturaEmitida } from "@/lib/mock-data";
import { ArrowLeft, FileText, CheckCircle2, Download, Building2, Save, FileCode, AlertCircle } from "lucide-react";

export default function FacturacionPage() {
  const [datosFiscales, setDatosFiscales] = useState<DatosFiscales>(DATOS_FISCALES_DEFECTO);
  const [facturas, setFacturas] = useState<FacturaEmitida[]>(FACTURAS_HISTORIAL);
  const [guardado, setGuardado] = useState(false);
  const [mensajeFactura, setMensajeFactura] = useState<string | null>(null);

  // Manejar actualización de formulario fiscal
  const handleGuardarDatos = (e: React.FormEvent) => {
    e.preventDefault();
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  // Simular solicitud y timbrado de un pago pendiente
const solicitarFactura = (folioPago: string, monto: number, concepto: string) => {
    const yaExiste = facturas.some((f) => f.folioPago === folioPago);
    if (yaExiste) {
      alert("Este pago ya cuenta con una factura electrónica emitida.");
      return;
    }

  const timestamp = new Date().getTime();
const aleatorio = typeof crypto !== "undefined" && crypto.randomUUID 
  ? crypto.randomUUID().substring(0, 8).toUpperCase() 
  : "SAT" + timestamp.toString().slice(-6);

const nuevaFactura: FacturaEmitida = {
  id: `fac-${timestamp}`,
  folioFiscalUuid: `${aleatorio}-CFDI-4000-8A1B-${timestamp}`,
  folioPago: folioPago,
  fechaEmision: "Justo ahora (Simulado PAC)",
  monto: monto,
  concepto: `${concepto} - CFDI 4.0`,
  estatus: "TIMBRADA",
};

    setFacturas([nuevaFactura, ...facturas]);
    setMensajeFactura(`¡Factura timbrada con éxito para el pago ${folioPago}!`);
    setTimeout(() => setMensajeFactura(null), 3500);
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
              <h1 className="text-2xl font-bold text-white">Facturación Electrónica (CFDI 4.0)</h1>
              <p className="text-xs text-zinc-400">Administra tu información fiscal ante el SAT y descarga tus comprobantes</p>
            </div>
          </div>
          <span className="text-xs font-mono bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-emerald-400 hidden sm:block">
            ● Servicio PAC en línea
          </span>
        </div>

        {mensajeFactura && (
          <div className="p-3.5 bg-emerald-950/60 border border-emerald-800/80 rounded-xl flex items-center gap-2 text-emerald-200 text-xs sm:text-sm animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{mensajeFactura}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Formulario de Datos Fiscales (SAT) */}
          <div className="lg:col-span-1 bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3">
              <Building2 className="h-5 w-5 text-red-500" />
              <h2 className="text-sm font-bold text-white">Mis Datos Fiscales</h2>
            </div>

            <form onSubmit={handleGuardarDatos} className="space-y-3 text-xs">
              <div>
                <label className="text-zinc-400 block mb-1">RFC del Titular</label>
                <input
                  type="text"
                  required
                  value={datosFiscales.rfc}
                  onChange={(e) => setDatosFiscales({ ...datosFiscales, rfc: e.target.value.toUpperCase() })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white font-mono uppercase focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Nombre o Razón Social</label>
                <input
                  type="text"
                  required
                  value={datosFiscales.razonSocial}
                  onChange={(e) => setDatosFiscales({ ...datosFiscales, razonSocial: e.target.value.toUpperCase() })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white uppercase focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Código Postal Fiscal</label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={datosFiscales.codigoPostal}
                  onChange={(e) => setDatosFiscales({ ...datosFiscales, codigoPostal: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Régimen Fiscal</label>
                <select
                  value={datosFiscales.regimenFiscal}
                  onChange={(e) => setDatosFiscales({ ...datosFiscales, regimenFiscal: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-600"
                >
                  <option value="605 - Sueldos y Salarios">605 - Sueldos y Salarios</option>
                  <option value="612 - Personas Físicas con Actividades Empresariales">612 - Personas Físicas con Actividades Empresariales</option>
                  <option value="626 - Régimen Simplificado de Confianza (RESICO)">626 - RESICO</option>
                  <option value="601 - General de Ley Personas Morales">601 - Personas Morales</option>
                </select>
              </div>

              <div>
                <label className="text-zinc-400 block mb-1">Uso de CFDI</label>
                <select
                  value={datosFiscales.usoCfdi}
                  onChange={(e) => setDatosFiscales({ ...datosFiscales, usoCfdi: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-white focus:outline-none focus:border-red-600"
                >
                  <option value="G03 - Gastos en general">G03 - Gastos en general</option>
                  <option value="D01 - Honorarios médicos y dentales">D01 - Gastos de salud</option>
                  <option value="S01 - Sin efectos fiscales">S01 - Sin efectos fiscales</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{guardado ? "¡Guardado!" : "Guardar Datos SAT"}</span>
              </button>
            </form>
          </div>

          {/* Listados de Facturas y Emisión */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Facturas Emitidas */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-500" />
                  <h2 className="text-sm font-semibold text-white">Facturas Disponibles para Descarga</h2>
                </div>
                <span className="text-xs text-zinc-400">{facturas.length} comprobante(s)</span>
              </div>

              <div className="divide-y divide-zinc-800/60">
                {facturas.map((fac) => (
                  <div key={fac.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-900/30 transition">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white">${fac.monto.toFixed(2)} MXN</span>
                        <span className="text-[10px] bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 font-semibold px-2 py-0.5 rounded">
                          {fac.estatus}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 mt-1">{fac.concepto}</p>
                      <p className="text-[11px] font-mono text-zinc-500 mt-0.5">UUID: {fac.folioFiscalUuid}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => alert(`Descargando XML timbrado (${fac.folioFiscalUuid}.xml)...`)}
                        className="flex items-center gap-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-2.5 py-1.5 rounded-lg transition"
                      >
                        <FileCode className="h-3.5 w-3.5 text-amber-400" />
                        <span>XML</span>
                      </button>
                      <button
                        onClick={() => alert(`Descargando Representación Impresa PDF (${fac.folioFiscalUuid}.pdf)...`)}
                        className="flex items-center gap-1 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 px-2.5 py-1.5 rounded-lg transition"
                      >
                        <Download className="h-3.5 w-3.5 text-red-400" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generar Factura de Pagos Recientes */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-4 w-4 text-zinc-400" />
                <h3 className="text-xs font-semibold text-zinc-300">Generar factura de pagos del mes</h3>
              </div>
              <div className="space-y-2">
                {HISTORIAL_PAGOS.map((p) => {
                  const yaFacturado = facturas.some((f) => f.folioPago === p.folio);
                  return (
                    <div key={p.id} className="p-3 bg-zinc-950 border border-zinc-800/80 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-zinc-400">{p.folio}</span> • <span className="text-white font-medium">{p.concepto}</span>
                        <p className="text-[11px] text-zinc-500">{p.fecha} • ${p.monto} MXN</p>
                      </div>
                      {yaFacturado ? (
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Facturado
                        </span>
                      ) : (
                        <button
                          onClick={() => solicitarFactura(p.folio, p.monto, p.concepto)}
                          className="bg-zinc-800 hover:bg-red-950/40 text-red-400 hover:text-red-300 border border-zinc-700 hover:border-red-900 px-3 py-1.5 rounded-lg transition font-medium"
                        >
                          Solicitar CFDI
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}