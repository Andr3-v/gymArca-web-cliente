// Configuración dinámica del gimnasio cliente (Tenant)
export interface GymTenant {
  id: string;
  nombreComercial: string; // Ej: "Iron Fitness Gym", "Sparta Club", etc.
  subtitulo: string;
  zona: string;
  colorTema?: string;
  horarios: {
    semana: string;
    finDeSemana: string;
  };
  direccion: string;
}

export const GYM_ACTUAL: GymTenant = {
  id: "tenant-001",
  nombreComercial: "PowerZone Fitness Club", // Puedes cambiar aquí el nombre de cualquier gimnasio
  subtitulo: "Centro de Entrenamiento Integral",
  zona: "Zona Metropolitana CDMX",
  direccion: "Av. Central 120, Col. Industrial, CDMX",
  horarios: {
    semana: "Lunes a Viernes de 6:00 a 22:00 hrs",
    finDeSemana: "Sábados y Domingos de 7:00 a 16:00 hrs",
  },
};

export interface Plan {
  id: string;
  nombre: string;
  precio: number;
  periodo: string;
  beneficios: string[];
  destacado?: boolean;
}

export const PLANES_GYM: Plan[] = [
  {
    id: "plan-basico",
    nombre: "Membresía Básica",
    precio: 450,
    periodo: "mes",
    beneficios: ["Acceso a pesas y cardio libre", "Uso de casilleros y regaderas", "Check-in por credencial con código de barras"],
  },
  {
    id: "plan-completo",
    nombre: "Membresía Pro + Rutinas",
    precio: 650,
    periodo: "mes",
    destacado: true,
    beneficios: ["Acceso total a las instalaciones", "Expediente físico y mediciones mensuales", "Rutinas personalizadas en el portal web", "Acceso a clases grupales"],
  },
  {
    id: "plan-anual",
    nombre: "Plan Anual Elite",
    precio: 6000,
    periodo: "año",
    beneficios: ["Todos los beneficios Pro", "Precio congelado por 12 meses", "Seguimiento antropométrico continuo", "Reservación preferencial de clases"],
  },
];

export const SOCIO_EJEMPLO = {
  id: "socio-101",
  nombre: "Carlos Mendoza García",
  numeroSocio: "SOC-2026-089",
  email: "carlos.mendoza@email.com",
  gymId: "tenant-001",
  membresia: {
    plan: "Membresía Pro + Rutinas",
    estatus: "ACTIVA",
    fechaVencimiento: "2026-10-28",
    diasRestantes: 14,
  },
  expediente: {
    peso: 76.5,
    estatura: 1.75,
    grasaCorporal: "18.2%",
    ultimoRegistro: "2026-09-30",
  },
};
export interface PagoHistorial {
  id: string;
  folio: string;
  fecha: string;
  concepto: string;
  monto: number;
  metodo: "Efectivo" | "Tarjeta" | "Transferencia";
  estatus: "PAGADO" | "PENDIENTE";
}

export const HISTORIAL_PAGOS: PagoHistorial[] = [
  { id: "1", folio: "REC-2026-0012", fecha: "2026-10-01", concepto: "Membresía Pro (Octubre)", monto: 650, metodo: "Tarjeta", estatus: "PAGADO" },
  { id: "2", folio: "REC-2026-0008", fecha: "2026-09-01", concepto: "Membresía Pro (Septiembre)", monto: 650, metodo: "Efectivo", estatus: "PAGADO" },
  { id: "3", folio: "REC-2026-0002", fecha: "2026-08-01", concepto: "Inscripción + Membresía Pro", monto: 950, metodo: "Transferencia", estatus: "PAGADO" },
];

export const HISTORIAL_PESO = [
  { mes: "May", peso: 81.0, grasa: 21.5 },
  { mes: "Jun", peso: 79.8, grasa: 20.3 },
  { mes: "Jul", peso: 78.5, grasa: 19.5 },
  { mes: "Ago", peso: 77.8, grasa: 18.9 },
  { mes: "Sep", peso: 76.5, grasa: 18.2 },
  { mes: "Oct", peso: 75.8, grasa: 17.6 },
];
export interface ClaseGym {
  id: string;
  nombre: string;
  salon: string;
  instructor: string;
  horario: string;
  duracion: string;
  cupoMaximo: number;
  cupoOcupado: number;
  reservadaPorMi?: boolean;
}

export const CLASES_DISPONIBLES: ClaseGym[] = [
  {
    id: "cls-01",
    nombre: "Spinning de Alta Intensidad",
    salon: "Salón de Ciclo Indoor",
    instructor: "Roberto Morales",
    horario: "07:00 - 08:00 hrs",
    duracion: "60 min",
    cupoMaximo: 15,
    cupoOcupado: 12,
    reservadaPorMi: false,
  },
  {
    id: "cls-02",
    nombre: "Entrenamiento Funcional y Core",
    salon: "Área de CrossFit / Funcional",
    instructor: "Ana Karen González",
    horario: "09:00 - 10:00 hrs",
    duracion: "60 min",
    cupoMaximo: 20,
    cupoOcupado: 20, // Llena
    reservadaPorMi: false,
  },
  {
    id: "cls-03",
    nombre: "Yoga y Movilidad Articular",
    salon: "Salón Polivalente A",
    instructor: "Valeria Soto",
    horario: "18:00 - 19:00 hrs",
    duracion: "60 min",
    cupoMaximo: 12,
    cupoOcupado: 7,
    reservadaPorMi: true, // Ya reservada
  },
  {
    id: "cls-04",
    nombre: "Box y Acondicionamiento Físico",
    salon: "Zona de Ring y Costales",
    instructor: "Marco Antonio Trejo",
    horario: "19:30 - 20:30 hrs",
    duracion: "60 min",
    cupoMaximo: 10,
    cupoOcupado: 6,
    reservadaPorMi: false,
  },
];

export interface DatosFiscales {
  rfc: string;
  razonSocial: string;
  regimenFiscal: string;
  codigoPostal: string;
  usoCfdi: string;
}

export interface FacturaEmitida {
  id: string;
  folioFiscalUuid: string;
  folioPago: string;
  fechaEmision: string;
  monto: number;
  concepto: string;
  estatus: "TIMBRADA" | "CANCELADA" | "EN_PROCESO";
}

export const DATOS_FISCALES_DEFECTO: DatosFiscales = {
  rfc: "MEGC980415HR8",
  razonSocial: "CARLOS MENDOZA GARCIA",
  regimenFiscal: "605 - Sueldos y Salarios e Ingresos Asimilados a Salarios",
  codigoPostal: "55000",
  usoCfdi: "G03 - Gastos en general",
};

export const FACTURAS_HISTORIAL: FacturaEmitida[] = [
  {
    id: "fac-01",
    folioFiscalUuid: "4A9B1C2D-3E4F-5A6B-7C8D-9E0F1A2B3C4D",
    folioPago: "REC-2026-0012",
    fechaEmision: "2026-10-01 11:24 hrs",
    monto: 650.0,
    concepto: "Membresía Pro (Octubre) - CFDI 4.0",
    estatus: "TIMBRADA",
  },
  {
    id: "fac-02",
    folioFiscalUuid: "8F7E6D5C-4B3A-2F1E-0D9C-8B7A6F5E4D3C",
    folioPago: "REC-2026-0008",
    fechaEmision: "2026-09-01 10:15 hrs",
    monto: 650.0,
    concepto: "Membresía Pro (Septiembre) - CFDI 4.0",
    estatus: "TIMBRADA",
  },
];


export interface SerieEjercicio {
  numero: number;
  repsObjetivo: string;
  pesoSugerido: number; // en kg
  pesoReal?: number;
  completada: boolean;
}

export interface EjercicioRutina {
  id: string;
  nombre: string;
  musculo: string;
  descanso: string;
  series: SerieEjercicio[];
}

export const RUTINA_DEL_DIA_INICIAL: EjercicioRutina[] = [
  {
    id: "ej-01",
    nombre: "Press de banca plano con barra",
    musculo: "Pecho",
    descanso: "90s",
    series: [
      { numero: 1, repsObjetivo: "12 reps", pesoSugerido: 50, pesoReal: 50, completada: true },
      { numero: 2, repsObjetivo: "10 reps", pesoSugerido: 60, pesoReal: 60, completada: true },
      { numero: 3, repsObjetivo: "10 reps", pesoSugerido: 65, completada: false },
      { numero: 4, repsObjetivo: "8 reps", pesoSugerido: 70, completada: false },
    ],
  },
  {
    id: "ej-02",
    nombre: "Press militar con mancuernas",
    musculo: "Hombro",
    descanso: "60s",
    series: [
      { numero: 1, repsObjetivo: "12 reps", pesoSugerido: 16, completada: false },
      { numero: 2, repsObjetivo: "12 reps", pesoSugerido: 18, completada: false },
      { numero: 3, repsObjetivo: "10 reps", pesoSugerido: 20, completada: false },
    ],
  },
  {
    id: "ej-03",
    nombre: "Extensiones de tríceps en polea alta",
    musculo: "Tríceps",
    descanso: "45s",
    series: [
      { numero: 1, repsObjetivo: "15 reps", pesoSugerido: 25, completada: false },
      { numero: 2, repsObjetivo: "15 reps", pesoSugerido: 25, completada: false },
      { numero: 3, repsObjetivo: "12 reps", pesoSugerido: 30, completada: false },
    ],
  },
];

export interface ReporteIncidencia {
  id: string;
  equipo: string;
  area: "Cardio" | "Fuerza y Peso Libre" | "Salones" | "Vestidores";
  descripcion: string;
  prioridad: "BAJA" | "MEDIA" | "ALTA";
  estatus: "REPORTADO" | "EN_REVISION" | "RESUELTO";
  fechaReporte: string;
}

export const REPORTES_EQUIPO_INICIALES: ReporteIncidencia[] = [
  {
    id: "rep-101",
    equipo: "Caminadora Matrix T70 (No. 4)",
    area: "Cardio",
    descripcion: "La banda de rodamiento se patina al superar los 8 km/h.",
    prioridad: "ALTA",
    estatus: "EN_REVISION",
    fechaReporte: "2026-10-19",
  },
  {
    id: "rep-102",
    equipo: "Polea Alta Dual",
    area: "Fuerza y Peso Libre",
    descripcion: "El cable de acero del lado izquierdo tiene hilos deshilachados.",
    prioridad: "MEDIA",
    estatus: "REPORTADO",
    fechaReporte: "2026-10-21",
  },
];