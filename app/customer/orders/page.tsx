"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogOut } from "lucide-react"

interface Order {
  id: string
  customerName: string
  totalAmount: number
  status: string
  createdAt: string
  items: any[]
}

export default function CustomerOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders?customer=true")
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-50 text-blue-800 border-blue-200",
    preparing: "bg-purple-50 text-purple-800 border-purple-200",
    ready: "bg-green-50 text-green-800 border-green-200",
    completed: "bg-primary/10 text-primary border-primary/20",
    cancelled: "bg-red-50 text-red-800 border-red-200",
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-foreground">My Orders</h1>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/customer/menu")}>
              Continue Shopping
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          <Card className="p-12 text-center border-border">
            <p className="text-muted-foreground mb-4">No orders yet</p>
            <Button onClick={() => router.push("/customer/menu")}>Browse Menu</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="p-6 border-border hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/customer/receipt/${order.id}`)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="font-serif font-bold text-lg text-foreground">Order {order.id.slice(0, 8)}</h3>
                      <Badge className={`${statusColors[order.status] || statusColors.pending} border`}>
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Items</p>
                        <p className="font-medium text-foreground">{order.items.length} items</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-serif font-bold text-primary">₹{order.totalAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/customer/receipt/${order.id}`)
                    }}
                  >
                    View Receipt
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
