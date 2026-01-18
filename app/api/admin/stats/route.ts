import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {
    const users = Array.from(db.users.values())
    const restaurants = Array.from(db.restaurants.values())
    const orders = Array.from(db.orders.values())
  
    const totalRevenue = orders.reduce((acc, order) => acc + (order.total || order.totalAmount || 0), 0)

    const stats = {
      totalRestaurants: restaurants.length,
      totalOrders: orders.length,
      totalRevenue,
      activeUsers: users.length,
    }

    // Generate mock chart data based on revenue
    const chartData = Array.from({ length: 7 }, (_, i) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      revenue: Math.floor(totalRevenue / 7) + Math.random() * 1000,
    }))

    return NextResponse.json({ stats, chartData })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
