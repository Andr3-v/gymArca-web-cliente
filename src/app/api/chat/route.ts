import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { GYM_ACTUAL, SOCIO_EJEMPLO } from "@/lib/mock-data";


// Herramientas (Tools) definidas en la arquitectura del workpath
const TOOLS = {
  consultar_membresia: () => {
    return {
      socio: SOCIO_EJEMPLO.nombre,
      plan: SOCIO_EJEMPLO.membresia.plan,
      estatus: SOCIO_EJEMPLO.membresia.estatus,
      fechaVencimiento: SOCIO_EJEMPLO.membresia.fechaVencimiento,
      diasRestantes: SOCIO_EJEMPLO.membresia.diasRestantes,
    };
  },
  proximas_clases: () => {
    return [
      { clase: "Spinning Pro", horario: "18:00 hrs", instructor: "Roberto M.", cupoDisponible: 4 },
      { clase: "Entrenamiento Funcional", horario: "19:00 hrs", instructor: "Ana Karen G.", cupoDisponible: 8 },
      { clase: "Yoga y Movilidad", horario: "20:00 hrs", instructor: "Valeria S.", cupoDisponible: 2 },
    ];
  },
datos_contacto: () => {
  return {
    gym: GYM_ACTUAL.nombreComercial,
    horarios: `${GYM_ACTUAL.horarios.semana}. Fines de semana: ${GYM_ACTUAL.horarios.finDeSemana}.`,
    ubicacion: GYM_ACTUAL.direccion,
  };
},
};

export async function POST(request: Request) {
  try {
    const { mensaje } = await request.json();
    const cookieStore = await cookies();
    const sesionActiva = cookieStore.get("gymcore_session")?.value;

    const textoLimpio = (mensaje || "").toLowerCase();

    // Orquestación de herramientas basada en la intención de la consulta
    if (textoLimpio.includes("membresia") || textoLimpio.includes("vence") || textoLimpio.includes("pago") || textoLimpio.includes("dias")) {
      if (!sesionActiva) {
        return NextResponse.json({
          respuesta: "Para consultar el estatus de tu membresía o vigencia, debes iniciar sesión en el portal con tus credenciales de socio.",
          toolUsada: null,
        });
      }
      const datos = TOOLS.consultar_membresia();
      return NextResponse.json({
        respuesta: `Hola ${datos.socio}. Tu plan actual es "${datos.plan}" y se encuentra ${datos.estatus}. Tu fecha de corte es el ${datos.fechaVencimiento} (te quedan ${datos.diasRestantes} días activos).`,
        toolUsada: "consultar_membresia",
      });
    }

    if (textoLimpio.includes("clase") || textoLimpio.includes("horario de clase") || textoLimpio.includes("reserva")) {
      const clases = TOOLS.proximas_clases();
      const detalle = clases.map((c) => `• ${c.clase} a las ${c.horario} con ${c.instructor} (Cupos: ${c.cupoDisponible})`).join("\n");
      return NextResponse.json({
        respuesta: `Estas son las clases disponibles para hoy con lugares abiertos:\n\n${detalle}\n\nPuedes apartar tu lugar directamente desde el mostrador o confirmarlo con tu instructor.`,
        toolUsada: "proximas_clases",
      });
    }

    if (textoLimpio.includes("horario") || textoLimpio.includes("abren") || textoLimpio.includes("direccion") || textoLimpio.includes("donde")) {
      const info = TOOLS.datos_contacto();
      return NextResponse.json({
        respuesta: `Información de instalaciones GymArca:\n\nHorario de atención: ${info.horarios}\nUbicación: ${info.ubicacion}`,
        toolUsada: "datos_contacto",
      });
    }

    if (textoLimpio.includes("aparato") || textoLimpio.includes("dañado") || textoLimpio.includes("mantenimiento") || textoLimpio.includes("reportar")) {
      return NextResponse.json({
        respuesta: "Tu reporte ha sido canalizado al departamento de mantenimiento de equipo. Gracias por ayudarnos a conservar las instalaciones en óptimo estado.",
        toolUsada: "reportar_equipo",
      });
    }
    if (textoLimpio.includes("aparato") || textoLimpio.includes("dañado") || textoLimpio.includes("mantenimiento") || textoLimpio.includes("descompuesto") || textoLimpio.includes("roto") || textoLimpio.includes("reportar")) {
      return NextResponse.json({
        respuesta: "He generado una orden preliminar para el departamento de mantenimiento técnico. Puedes dar seguimiento al estado de la reparación ingresando a la sección 'Reportar Equipo' de tu panel.",
        toolUsada: "reportar_equipo",
      });
    }

    // Respuesta por defecto con guardarrail: no brindar asesoría médica ni dietética no autorizada
    return NextResponse.json({
      respuesta: "Soy el asistente virtual de GymArca. Puedo ayudarte a consultar el estado de tu membresía, clases disponibles, horarios del gimnasio o levantar reportes de equipo. Para ajustes a tu plan de dieta o rutina física, consúltalo con tu entrenador asignado.",
      toolUsada: null,
    });
  } catch {
    return NextResponse.json(
      { respuesta: "Ocurrió un error al procesar tu mensaje. Intenta nuevamente." },
      { status: 500 }
    );
  }
}