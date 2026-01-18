import { type NextRequest, NextResponse } from "next/server"
import { dbOperations } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    // Get restaurant from session (simplified)
    const items = Array.from(((await dbOperations) as any).menuItems?.values?.() || [])
    return NextResponse.json({ items })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const item = await dbOperations.createMenuItem(data)
    return NextResponse.json({ item })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 })
  }
}
