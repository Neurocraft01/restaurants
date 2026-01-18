import { type NextRequest, NextResponse } from "next/server"
import { dbOperations } from "@/lib/db"
import { setSession } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json()

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    // Check if user exists
    const existingUser = await dbOperations.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Create user
    const user = await dbOperations.createUser({
      email,
      password, // In production, hash with bcrypt
      name,
      role,
    })

    // Set session
    await setSession(user)

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
