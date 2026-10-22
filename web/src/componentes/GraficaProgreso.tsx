"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { HISTORIAL_PESO } from "@/lib/mock-data";

export default function GraficaProgreso() {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-bold text-white">Evolución de Peso y Grasa</h2>
          <p className="text-xs text-zinc-400">Seguimiento semestral del expediente antropométrico</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-600 block"></span>
            <span className="text-zinc-300">Peso (kg)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
            <span className="text-zinc-300">% Grasa</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={HISTORIAL_PESO} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="mes" stroke="#71717a" fontSize={12} tickLine={false} />
            <YAxis stroke="#71717a" fontSize={12} domain={['dataMin - 2', 'dataMax + 2']} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "0.5rem" }}
              labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
            />
            <Line type="monotone" dataKey="peso" stroke="#dc2626" strokeWidth={2.5} dot={{ fill: "#dc2626", r: 4 }} />
            <Line type="monotone" dataKey="grasa" stroke="#f59e0b" strokeWidth={2} dot={{ fill: "#f59e0b", r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}