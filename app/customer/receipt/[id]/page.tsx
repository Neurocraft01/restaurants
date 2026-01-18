"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Printer, Download, Home } from "lucide-react"

interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  tableId?: string
  totalAmount: number
  status: string
  items: any[]
  createdAt: string
}

export default function ReceiptPage() {
  const router = useRouter()
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [params.id])

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setOrder(data.order)
      }
    } catch (error) {
      console.error("Failed to fetch order:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Would implement PDF download
    console.log("Download receipt")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading receipt...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 border-border text-center">
          <p className="text-muted-foreground mb-4">Order not found</p>
          <Button onClick={() => router.push("/customer/menu")}>Return to Menu</Button>
        </Card>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-800 border-yellow-200",
    confirmed: "bg-blue-50 text-blue-800 border-blue-200",
    preparing: "bg-purple-50 text-purple-800 border-purple-200",
    ready: "bg-green-50 text-green-800 border-green-200",
    completed: "bg-primary/10 text-primary border-primary/20",
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 print:bg-white">
      {/* Header - Hidden on Print */}
      <div className="max-w-3xl mx-auto mb-8 print:hidden">
        <div className="flex justify-between items-center gap-4">
          <h1 className="text-3xl font-serif font-bold text-foreground">Order Receipt</h1>
          <div className="flex gap-3">
            <Button onClick={handlePrint} variant="outline" size="sm" className="border-border bg-transparent">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm" className="border-border bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button onClick={() => router.push("/customer/menu")} variant="outline" size="sm" className="border-border">
              <Home className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Receipt Card */}
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 border-border print:border-0 print:shadow-none">
          {/* Logo and Header */}
          <div className="text-center mb-8 pb-8 border-b border-border print:pb-6">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-3 print:w-10 print:h-10">
              <span className="text-primary-foreground font-serif font-bold text-lg">R</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground">RestoHub</h2>
            <p className="text-sm text-muted-foreground">Order Confirmation</p>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-8 mb-8 print:gap-6">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Order Number</p>
              <p className="text-lg font-serif font-bold text-foreground">{order.id.slice(0, 8)}</p>
              {order.tableId && (
                <div className="mt-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Table</p>
                    <p className="text-lg font-bold text-primary">#{order.tableId}</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Order Status</p>
              <Badge className={`${statusColors[order.status] || statusColors.pending} border mt-1`}>
                {order.status.toUpperCase()}
              </Badge>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Order Date</p>
              <p className="text-sm text-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Order Time</p>
              <p className="text-sm text-foreground">{new Date(order.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-8 pb-8 border-b border-border print:pb-6">
            <h3 className="font-serif font-bold text-foreground mb-4">Customer Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{order.customerName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{order.customerPhone}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8 pb-8 border-b border-border print:pb-6">
            <h3 className="font-serif font-bold text-foreground mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium text-foreground">{item.menuItemName}</p>
                    <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="space-y-2 text-right">
            <div className="flex justify-end gap-4 text-sm mb-4 pb-4 border-t border-border print:border-t-0 print:pt-4">
              <span className="font-medium text-foreground">Total Amount:</span>
              <span className="font-serif font-bold text-lg text-primary">₹{order.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Footer Message */}
          <div className="text-center pt-8 border-t border-border text-xs text-muted-foreground print:border-t-0 print:pt-4">
            <p>Thank you for your order!</p>
            <p>Your meal will be prepared with care</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
