import { type NextRequest, NextResponse } from "next/server"
import { dbOperations } from "@/lib/db"

export async function GET() {
  const restaurants = await dbOperations.getAllRestaurants()
  
  const enrichedRestaurants = restaurants.map(r => ({
      ...r,
      orders: Math.floor(Math.random() * 100), 
      location: r.address || "Unknown Location"
  }))

  return NextResponse.json({ restaurants: enrichedRestaurants })
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const restaurant = await dbOperations.createRestaurant(data)
    return NextResponse.json({ restaurant })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create restaurant" }, { status: 500 })
  }
}
