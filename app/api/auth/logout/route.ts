import { type NextRequest, NextResponse } from "next/server"
import { clearSession } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    await clearSession()
    return NextResponse.json({ message: "Logged out" })
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
