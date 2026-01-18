"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, ShoppingBag } from "lucide-react"

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      // Admin API or general orders API
      const res = await fetch("/api/admin/orders")
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'preparing': return 'bg-purple-100 text-purple-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const pendingOrders = orders.filter(o => o.status === 'pending')
  const completedOrders = orders.filter(o => o.status === 'completed')

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
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/admin/overview")}>
              Back
            </Button>
            <h1 className="text-2xl font-serif font-bold text-foreground">All Orders</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-muted mb-4">
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
             {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />
              ))
            ) : (
              <EmptyState message="No pending orders" />
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
             {completedOrders.length > 0 ? (
              completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} />
              ))
            ) : (
              <EmptyState message="No completed orders" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function OrderCard({ order, getStatusColor }: { order: any, getStatusColor: (s: string) => string }) {
    return (
        <Card className="p-4 border-border">
            <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <div>
                <p className="font-semibold text-foreground">Order {order.id.slice(0,8)}</p>
                <p className="text-sm text-muted-foreground">{order.customerName}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                </span>
                </div>
            </div>
            <div className="text-right">
                <p className="font-semibold text-foreground">₹{order.totalAmount?.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                </p>
            </div>
            </div>
        </Card>
    )
}

function EmptyState({ message = "No orders found" }: { message?: string }) {
    return (
        <Card className="p-8 text-center border-border">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{message}</p>
        </Card>
    )
}
