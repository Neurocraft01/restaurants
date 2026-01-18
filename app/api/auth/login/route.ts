import { type NextRequest, NextResponse } from "next/server"
import { dbOperations } from "@/lib/db"
import { setSession } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // Get user by email
    const user = await dbOperations.getUserByEmail(email)

    if (!user || user.password !== password) {
      // In production, use bcrypt
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Set session
    await setSession(user)

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
