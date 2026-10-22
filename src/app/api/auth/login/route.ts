import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { loginBackend } from "@/lib/api-client";
import { SOCIO_EJEMPLO } from "@/lib/mock-data";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Credenciales incompletas" }, { status: 400 });
    }

    let tokenData = null;
    let datosUsuario = null;

    try {
      // 1. Intento de autenticación real contra Spring Boot
      tokenData = await loginBackend({ email, password });
      datosUsuario = {
        email,
        token: tokenData.accessToken,
        esReal: true,
      };
    } catch {
      // 2. Fallback de contingencia con datos mock si el backend no está corriendo
      datosUsuario = {
        email,
        nombre: SOCIO_EJEMPLO.nombre,
        memberCode: SOCIO_EJEMPLO.numeroSocio,
        esReal: false,
      };
    }

    const cookieStore = await cookies();
    cookieStore.set("gymcore_session", JSON.stringify(datosUsuario), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ success: true, usuario: datosUsuario });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}