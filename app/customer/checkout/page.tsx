"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [error, setError] = useState("")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    tableId: "",
    specialNotes: "",
  })
  const [isTableScanned, setIsTableScanned] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
    
    // Auto-fill table ID if present from QR scan
    const scannedTable = localStorage.getItem("tableId")
    if (scannedTable) {
        setFormData(prev => ({ ...prev, tableId: scannedTable }))
        setIsTableScanned(true)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: cartItems.map(i => ({ 
              menuItemId: i.id, 
              menuItemName: i.name, 
              quantity: i.quantity, 
              price: i.price 
          })), 
          totalAmount: total
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to place order")
      }

      const data = await res.json()
      setOrderId(data.order.id)
      setOrderPlaced(true)
      localStorage.removeItem("cart")

      setTimeout(() => {
        router.push(`/customer/receipt/${data.order.id}`)
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Order Placed!</h1>
          <p className="text-muted-foreground mb-2">Order ID: {orderId}</p>
          <p className="text-muted-foreground">Redirecting to receipt...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your order</p>
        </div>

        <Card className="p-8 border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  placeholder="John Doe"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="bg-muted/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input
                  id="customerPhone"
                  name="customerPhone"
                  placeholder="+91 98765 43210"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  required
                  className="bg-muted/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tableId">Table Number</Label>
                <Input
                  id="tableId"
                  name="tableId"
                  placeholder="e.g. 5"
                  value={formData.tableId}
                  onChange={handleChange}
                  className="bg-muted/50 border-border"
                  readOnly={isTableScanned} // Read-only if scanned
                />
                {formData.tableId && <p className="text-xs text-muted-foreground">Ordering for Table {formData.tableId}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerEmail">Email Address</Label>
              <Input
                id="customerEmail"
                name="customerEmail"
                type="email"
                placeholder="john@example.com"
                value={formData.customerEmail}
                onChange={handleChange}
                required
                className="bg-muted/50 border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialNotes">Special Instructions</Label>
              <Textarea
                id="specialNotes"
                name="specialNotes"
                placeholder="Any special requests or allergies..."
                value={formData.specialNotes}
                onChange={handleChange}
                className="bg-muted/50 border-border min-h-24"
              />
            </div>

            {error && (
              <div className="flex gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
