"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, ArrowLeft, LogIn } from "lucide-react"

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

export default function PublicMenuPage() {
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchMenuItems()
    // Load cart from local storage if exists
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
      // Redirect to customer checkout flow
      router.push("/customer/checkout")
    }
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
      {/* Public Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                <ArrowLeft className="w-5 h-5" />
             </Button>
             <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-lg">R</span>
                </div>
                <h1 className="text-2xl font-serif font-bold text-foreground hidden sm:block">The Tasty Spoon</h1>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/auth/login")}>
              <LogIn className="w-4 h-4 mr-2" />
              Staff Login
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-3">
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                   <div>
                        <h2 className="text-3xl font-serif font-bold text-foreground">Our Menu</h2>
                        <p className="text-muted-foreground">Freshly prepared dishes for you</p>
                   </div>
                   <Input
                        placeholder="Search for a dish..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-muted/50 border-border max-w-xs"
                    />
                </div>
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <TabsList className="bg-muted w-full sm:w-auto overflow-x-auto flex justify-start p-1">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize px-4 min-w-[80px]">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow border-border group cursor-pointer" onClick={() => addToCart(item)}>
                  <div className="relative h-48 bg-muted/30 flex items-center justify-center overflow-hidden">
                    <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300">🍽️</div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-sm">₹{item.price}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">{item.description}</p>
                    <Button
                      onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                      }}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Add to Order
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No items found.</p>
                </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-border shadow-md">
                <div className="p-4 bg-muted/40 border-b border-border">
                    <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                        Your Order
                    </h3>
                </div>

              <div className="p-4">
                {cart.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                            <ShoppingCart className="w-6 h-6 text-muted-foreground/50" />
                        </div>
                        <p className="text-muted-foreground text-sm">Your basket is empty</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">Add items to get started</p>
                    </div>
                ) : (
                    <>
                    <div className="space-y-4 mb-6 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                        {cart.map((item) => (
                        <div key={item.id} className="flex gap-3">
                             <div className="w-12 h-12 bg-muted rounded flex-shrink-0 flex items-center justify-center text-lg">🍽️</div>
                             <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                                    <p className="text-sm font-semibold ml-2">₹{item.price * item.quantity}</p>
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-xs text-destructive hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                             </div>
                        </div>
                        ))}
                    </div>

                    <div className="border-t border-border pt-4 space-y-4">
                        <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">Subtotal</span>
                        <span className="font-serif font-bold text-lg text-primary">₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <Button
                        onClick={handleCheckout}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-semibold shadow-lg shadow-primary/20"
                        >
                        Checkout
                        </Button>
                    </div>
                    </>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
