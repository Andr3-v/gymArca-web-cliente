const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export async function obtenerCatalogoPublico(tenantSlug: string = "gym-esparta-cdmx") {
  try {
    const res = await fetch(`${BASE_URL}/public/tenants/${tenantSlug}/catalog`, {
      next: { revalidate: 60 }, // Cachear 60 segundos
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error al obtener catálogo:", error);
    return null;
  }
}

export async function loginBackend(credentials: { email: string; password: string; tenantSlug?: string }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tenantSlug: credentials.tenantSlug || "gym-esparta-cdmx",
      email: credentials.email,
      password: credentials.password,
      audience: "MEMBER",
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "Error en autenticación");
  }

  return await res.json(); // Devuelve TokenResponse: { accessToken, refreshToken, expiresIn }
}

export async function obtenerFichaSocio(memberId: string, token: string) {
  const res = await fetch(`${BASE_URL}/members/${memberId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("No se pudo obtener la información del socio");
  return await res.json();
}