"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, ShoppingBag, ChefHat } from "lucide-react"

export default function ManagerOrdersPage() {
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
      const res = await fetch("/api/orders?manager=true")
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

  const pendingOrders = orders.filter(o => o.status === 'pending')
  const preparingOrders = orders.filter(o => o.status === 'preparing')
  const readyOrders = orders.filter(o => o.status === 'ready')
  const completedOrders = orders.filter(o => o.status === 'completed')

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'preparing': return 'bg-purple-100 text-purple-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">All Orders</h1>
        <p className="text-muted-foreground">View order history</p>
      </div>

      <div className="max-w-7xl mx-auto py-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-muted mb-4 flex-wrap h-auto p-2">
            <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="preparing">Preparing ({preparingOrders.length})</TabsTrigger>
            <TabsTrigger value="ready">Ready ({readyOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <OrderList value="all" orders={orders} getStatusColor={getStatusColor} />
          <OrderList value="pending" orders={pendingOrders} getStatusColor={getStatusColor} />
          <OrderList value="preparing" orders={preparingOrders} getStatusColor={getStatusColor} />
          <OrderList value="ready" orders={readyOrders} getStatusColor={getStatusColor} />
          <OrderList value="completed" orders={completedOrders} getStatusColor={getStatusColor} />
          
        </Tabs>
      </div>
    </div>
  )
}

function OrderList({ value, orders, getStatusColor }: { value: string, orders: any[], getStatusColor: (s: string) => string }) {
    return (
        <TabsContent value={value} className="space-y-4">
            {orders.length > 0 ? (
                orders.map((order) => (
                    <Card key={order.id} className="p-4 border-border">
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
                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() + ' ' + new Date(order.createdAt).toLocaleTimeString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                        {/* Optional: Show Items summary */}
                         <div className="mt-2 text-sm text-muted-foreground pl-10">
                            {order.items?.map((i: any) => `${i.menuItemName} x${i.quantity}`).join(', ')}
                        </div>
                    </Card>
                ))
            ) : (
                <div className="text-center py-12 bg-muted/10 rounded-lg border border-muted border-dashed">
                     <p className="text-muted-foreground">No orders in this category</p>
                </div>
            )}
        </TabsContent>
    )
}
