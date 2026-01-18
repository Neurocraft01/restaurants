"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LogOut, Plus, Search, Building2 } from "lucide-react"

export default function RestaurantsPage() {
  const router = useRouter()
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newRestaurant, setNewRestaurant] = useState({ name: "", address: "", description: "" })

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      const res = await fetch("/api/admin/restaurants")
      if (res.ok) {
        const data = await res.json()
        setRestaurants(data.restaurants || [])
      }
    } catch (error) {
      console.error("Failed to fetch restaurants:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddRestaurant = async () => {
    try {
        const res = await fetch("/api/admin/restaurants", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newRestaurant)
        })
        if (res.ok) {
            setIsAddOpen(false)
            setNewRestaurant({ name: "", address: "", description: "" })
            fetchRestaurants() // Refresh list
        }
    } catch (error) {
        console.error("Failed to add restaurant", error)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  const filteredRestaurants = restaurants.filter((r) => r.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading restaurants...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/admin/overview")}>
              Back
            </Button>
            <h1 className="text-2xl font-serif font-bold text-foreground">Restaurants</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-4 flex-col sm:flex-row">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => router.push("/admin/restaurants/new")}>
              <Plus className="w-4 h-4 mr-2" />
              Add Restaurant
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant, idx) => (
              <Card key={idx} className="p-6 border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <Building2 className="w-8 h-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{restaurant.name}</h3>
                    <p className="text-sm text-muted-foreground">{restaurant.location || restaurant.address}</p>
                    <p className="text-xs text-muted-foreground mt-2">Orders: {restaurant.orders || 0}</p>
                    <p className="text-xs text-muted-foreground">{restaurant.description}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="col-span-full p-8 text-center border-border">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No restaurants found</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
