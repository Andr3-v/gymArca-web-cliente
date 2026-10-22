import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Cuando A1 entregue el endpoint real, aquí se hace el fetch hacia la API de Spring Boot
  // Por ahora validamos y generamos la cookie de sesión del BFF:
  if (email && password) {
    const cookieStore = await cookies();
    cookieStore.set("gymcore_session", "session_token_socio_001", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 día
    });

    return NextResponse.json({ ok: true, user: { email, nombre: "Carlos Mendoza" } });
  }

  return NextResponse.json({ ok: false, message: "Credenciales inválidas" }, { status: 401 });
}