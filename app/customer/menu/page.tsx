"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, ShoppingCart, Home } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  available: boolean
}

interface CartItem extends MenuItem {
  quantity: number
}

export default function CustomerMenuPage() {
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchMenuItems()
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const fetchMenuItems = async () => {
    try {
      const res = await fetch("/api/menu")
      if (res.ok) {
        const data = await res.json()
        setMenuItems(data.items || [])
      }
    } catch (error) {
      console.error("Failed to fetch menu:", error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ["all", ...new Set(menuItems.map((item) => item.category))]

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch && item.available
  })

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/customer/checkout")
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">R</span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">RestoHub</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push("/customer/orders")}>
              <Home className="w-4 h-4 mr-2" />
              My Orders
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Our Menu</h2>
              <Input
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-muted/50 border-border"
              />
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <TabsList className="bg-muted">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border">
                  <div className="bg-gradient-to-br from-muted to-muted/50 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl">🍽️</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif font-bold text-lg text-foreground">{item.name}</h3>
                      <Badge className="bg-primary/10 text-primary border-0">₹{item.price}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <Button
                      onClick={() => addToCart(item)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-border p-6">
              <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Order Summary
              </h3>

              {cart.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-start pb-3 border-b border-border">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:bg-destructive/10 h-auto p-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">Total</span>
                      <span className="font-serif font-bold text-lg text-primary">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
