"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";

interface Mensaje {
  remitente: "bot" | "user";
  texto: string;
}

export default function ChatbotWidget() {
  const [abierto, setAbierto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      remitente: "bot",
      texto: "¡Hola! Soy el asistente virtual de GymArca. ¿Tienes dudas sobre horarios, clases o el estado de tu membresía?",
    },
  ]);
  const [input, setInput] = useState("");

  const enviarMensaje = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || cargando) return;

    const textoUsuario = input;
    setInput("");
    setMensajes((prev) => [...prev, { remitente: "user", texto: textoUsuario }]);
    setCargando(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: textoUsuario }),
      });

      const data = await res.json();
      setMensajes((prev) => [
        ...prev,
        { remitente: "bot", texto: data.respuesta || "No pude obtener una respuesta." },
      ]);
    } catch {
      setMensajes((prev) => [
        ...prev,
        { remitente: "bot", texto: "Hubo un problema de conexión con el asistente." },
      ]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {abierto && (
        <div className="w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px] mb-3">
          <div className="bg-zinc-950 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Asistente GymArca</p>
                <p className="text-[11px] text-emerald-400">● Conectado al sistema</p>
              </div>
            </div>
            <button
              onClick={() => setAbierto(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {mensajes.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.remitente === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2 text-xs sm:text-sm whitespace-pre-line ${
                    m.remitente === "user"
                      ? "bg-red-600 text-white rounded-br-none"
                      : "bg-zinc-800 text-zinc-200 border border-zinc-700/60 rounded-bl-none"
                  }`}
                >
                  {m.texto}
                </div>
              </div>
            ))}
            {cargando && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 text-zinc-400 px-3 py-2 rounded-xl text-xs flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Consultando información...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={enviarMensaje} className="p-3 bg-zinc-950 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta por clases, horarios o membresía..."
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-600"
            />
            <button
              type="submit"
              disabled={cargando}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white p-2 rounded-lg transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setAbierto(!abierto)}
        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg shadow-red-950/40 transition hover:scale-105 flex items-center justify-center ml-auto"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
}