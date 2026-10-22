import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  // Borrar la cookie de sesión httpOnly
  cookieStore.delete("gymcore_session");

  return NextResponse.json({ ok: true, message: "Sesión cerrada correctamente" });
}