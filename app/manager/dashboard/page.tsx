"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, ChefHat, TrendingUp } from "lucide-react"

interface Order {
  id: string
  customerName: string
  tableId?: string
  totalAmount: number
  status: string
  createdAt: string
  items: any[]
}

export default function ManagerDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({ totalOrders: 0, todayOrders: 0, totalRevenue: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    // Poll for new orders every 5 seconds
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch("/api/orders?manager=true")
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
        setStats(data.stats || {})
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        // Update local state
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
      }
    } catch (error) {
      console.error("Failed to update order:", error)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  const pendingOrders = orders.filter((o) => o.status === "pending")
  const preparingOrders = orders.filter((o) => o.status === "preparing")
  const readyOrders = orders.filter((o) => o.status === "ready")

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-50 text-blue-800 border-blue-200",
    preparing: "bg-purple-50 text-purple-800 border-purple-200",
    ready: "bg-green-50 text-green-800 border-green-200",
    completed: "bg-primary/10 text-primary border-primary/20",
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Manager Dashboard</h1>
        <p className="text-muted-foreground">Manage your restaurant orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today's Orders</p>
              <p className="text-3xl font-bold text-foreground mt-2">{stats.todayOrders}</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
                <ChefHat className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold text-primary mt-2">₹{stats.totalRevenue.toFixed(0)}</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
              <p className="text-3xl font-bold text-foreground mt-2">{pendingOrders.length}</p>
            </div>
            <div className={`p-2 rounded-lg flex items-center justify-center ${pendingOrders.length > 0 ? "bg-yellow-100" : "bg-muted"}`}>
              {pendingOrders.length > 0 ? (
                  <span className="text-yellow-800 font-bold">!</span>
              ) : (
                <ChefHat className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Order Tabs */}
      <Card className="border-border shadow-sm overflow-hidden">
        <Tabs defaultValue="pending" className="w-full">
          <div className="bg-muted/40 border-b px-4">
            <TabsList className="bg-transparent h-14 p-0">
              <TabsTrigger value="pending" className="relative h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                Pending
                {pendingOrders.length > 0 && (
                  <Badge className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-200">{pendingOrders.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="preparing" className="relative h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                Preparing
                {preparingOrders.length > 0 && (
                  <Badge className="ml-2 bg-purple-100 text-purple-800 border-purple-200">
                    {preparingOrders.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="ready" className="relative h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                Ready
                {readyOrders.length > 0 && (
                  <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">{readyOrders.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="pending" className="space-y-4 m-0">
              {pendingOrders.length === 0 ? (
                <EmptyState label="No pending orders" />
              ) : (
                pendingOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    statusColors={statusColors}
                    onStatusChange={updateOrderStatus}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="preparing" className="space-y-4 m-0">
              {preparingOrders.length === 0 ? (
                <EmptyState label="No preparing orders" />
              ) : (
                preparingOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    statusColors={statusColors}
                    onStatusChange={updateOrderStatus}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="ready" className="space-y-4 m-0">
              {readyOrders.length === 0 ? (
                <EmptyState label="No ready orders" />
              ) : (
                readyOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    statusColors={statusColors}
                    onStatusChange={updateOrderStatus}
                  />
                ))
              )}
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="text-center py-12 bg-muted/10 rounded-lg dashed border border-muted">
            <ChefHat className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">{label}</p>
        </div>
    )
}

function OrderCard({

  order,
  statusColors,
  onStatusChange,
}: {
  order: Order
  statusColors: Record<string, string>
  onStatusChange: (orderId: string, status: string) => void
}) {
  const statusFlow: Record<string, string[]> = {
    pending: ["confirmed"],
    confirmed: ["preparing"],
    preparing: ["ready"],
    ready: ["completed"],
    completed: [],
  }

  return (
    <div className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-serif font-bold text-foreground">Order {order.id.slice(0, 8)}</h3>
          <p className="text-sm text-muted-foreground">{order.customerName}</p>
          {order.tableId && (
            <Badge variant="outline" className="mt-1 bg-background text-foreground border-foreground/20">
                Table {order.tableId}
            </Badge>
          )}
        </div>
        <Badge className={`${statusColors[order.status] || statusColors.pending} border`}>
          {order.status.toUpperCase()}
        </Badge>
      </div>

      <div className="mb-4 p-3 bg-muted/50 rounded">
        <p className="text-sm font-medium text-foreground mb-2">Items:</p>
        {order.items.map((item: any) => (
          <p key={item.id} className="text-xs text-muted-foreground">
            • {item.menuItemName} × {item.quantity}
          </p>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="font-serif font-bold text-primary">₹{order.totalAmount.toFixed(2)}</p>
        <div className="flex gap-2">
          {statusFlow[order.status]?.map((nextStatus) => (
            <Button
              key={nextStatus}
              onClick={() => onStatusChange(order.id, nextStatus)}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground capitalize"
            >
              Mark {nextStatus}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
