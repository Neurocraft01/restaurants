// Authentication utilities
import { cookies } from "next/headers"

export async function getSession() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get("session")?.value

  if (!sessionToken) {
    return null
  }

  // Parse session token (in real app, verify JWT signature)
  try {
    const decoded = JSON.parse(Buffer.from(sessionToken, "base64").toString())
    return decoded
  } catch {
    return null
  }
}

export async function setSession(user: any) {
  const cookieStore = await cookies()
  const session = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    restaurantId: user.restaurantId,
  }

  const encoded = Buffer.from(JSON.stringify(session)).toString("base64")
  cookieStore.set("session", encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return session
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
