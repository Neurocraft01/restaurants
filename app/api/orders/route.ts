import { type NextRequest, NextResponse } from "next/server"
import { dbOperations } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const isManager = req.nextUrl.searchParams.get("manager")
    const isCustomer = req.nextUrl.searchParams.get("customer")

    // Get orders (simplified - would filter by user in production)
    const orders = await dbOperations.getOrders("rest-1")

    // Calculate stats
    const stats = {
      todayOrders: orders.length,
      totalRevenue: orders.reduce((sum: number, o: any) => sum + o.totalAmount, 0),
    }

    return NextResponse.json({ orders, stats })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    // Force restaurantId for prototype
    const orderData = { ...data, restaurantId: "rest-1" }
    const order = await dbOperations.createOrder(orderData)
    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
