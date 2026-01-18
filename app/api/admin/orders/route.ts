import { NextResponse } from "next/server"
import { dbOperations } from "@/lib/db"

export async function GET() {
  // Return all orders for the default restaurant
  const orders = await dbOperations.getOrders("rest-1")
  return NextResponse.json({ orders })
}


