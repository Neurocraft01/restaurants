import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  const users = Array.from(db.users.values())
  // Filter out passwords
  const safeUsers = users.map(({ password, ...user }) => user)

  return NextResponse.json({ users: safeUsers })
}
