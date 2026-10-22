import Navbar from "@/componentes/barranav";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function AvisoPrivacidadPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-white">Aviso de Privacidad Integral</h1>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">1. Identidad y Domicilio del Responsable</h2>
            <p>
              GymArca, con operaciones en la Zona Metropolitana del Valle de México, es responsable del uso, protección y tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">2. Datos Personales y Datos Sensibles Recabados</h2>
            <p>Para la prestación de los servicios de acondicionamiento físico, control de accesos y seguimiento de entrenamiento, recabamos:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400">
              <li><strong>Datos de identificación y contacto:</strong> Nombre completo, correo electrónico, teléfono y fotografía para credencial.</li>
              <li><strong>Datos financieros y de facturación:</strong> Registro de pagos y datos fiscales para emisión de comprobantes.</li>
              <li><strong>Datos sensibles de salud:</strong> Mediciones antropométricas (peso, estatura, porcentaje de grasa), lesiones previas y objetivos de rendimiento deportivo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">3. Finalidades del Tratamiento</h2>
            <p>
              Los datos recabados se emplean para: validar su membresía en los controles de acceso, estructurar programas de entrenamiento personalizados y permitir la consulta privada de sus avances a través del Portal Web del Socio. GymArca no transfiere información médica ni datos personales a terceros sin su consentimiento expreso.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">4. Ejercicio de Derechos ARCO</h2>
            <p>
              Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales presentando una solicitud formal en la administración del gimnasio o a través de los canales de soporte del sistema.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-red-500 hover:text-red-400 underline">
            ← Volver a la página principal
          </Link>
        </div>
      </div>
    </main>
  );
}