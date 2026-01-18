"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { 
  Search, 
  User, 
  MapPin, 
  ShoppingBasket, 
  Plus, 
  Utensils 
} from "lucide-react"

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

// Helper to get image based on item name/category for demo purposes
const getItemImage = (item: MenuItem) => {
    const name = item.name.toLowerCase();
    if (name.includes('pizza')) return "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80";
    if (name.includes('burger')) return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80";
    if (name.includes('salad')) return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80";
    if (name.includes('pasta') || name.includes('carbonara') || name.includes('spaghetti')) return "https://images.unsplash.com/photo-1612874742237-982e9658cd6e?w=800&q=80";
    if (name.includes('dessert') || name.includes('cake') || name.includes('tiramisu')) return "https://images.unsplash.com/photo-1629806451634-1c64bc257f8a?w=800&q=80";
    if (name.includes('cocktail') || name.includes('mojito') || name.includes('wine')) return "https://images.unsplash.com/photo-1514362545857-3bc165497db5?w=800&q=80";
    if (name.includes('coffee') || name.includes('espresso')) return "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80";
    if (name.includes('steak') || name.includes('beef')) return "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80";
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80"; // Default food image
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

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/customer/params") // Assuming checkout flow or params check
      // Actually let's just push to checkout or receipt. 
      // Existing code went to /customer/checkout, so let's stick to that if it exists, or create it.
      router.push("/customer/checkout") 
    }
  }

  if (loading) return (
      <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
  )

  return (
    <div className="relative flex flex-col min-h-screen bg-muted/30 dark:bg-[#102216] font-sans pb-32">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6 md:px-10 py-4 lg:px-40">
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 text-primary flex items-center justify-center bg-primary/10 rounded-lg">
                <Utensils className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-extrabold leading-tight tracking-tight text-foreground">VISTA BISTRO</h2>
        </div>
        
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <MapPin className="w-4 h-4 text-primary" />
            <p className="text-sm font-semibold text-foreground">Table 12</p>
        </div>

        <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col min-w-40 h-10 max-w-64 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="w-4 h-4" />
                </div>
                <Input 
                    className="pl-10 h-full rounded-full bg-muted border-0 focus-visible:ring-1" 
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Button variant="secondary" size="icon" className="rounded-full w-10 h-10">
                <User className="w-5 h-5" />
            </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full">
        <div className="flex flex-col w-full max-w-[1200px] flex-1">
            {/* Headline Section */}
            <div className="px-6 md:px-10 lg:px-20 pt-10 pb-4">
                <h1 className="text-foreground tracking-tight text-4xl font-extrabold leading-tight">Welcome to Vista.</h1>
                <p className="text-muted-foreground text-lg font-medium mt-1">Hand-crafted flavors, delivered to your table.</p>
            </div>

            {/* Category Chips */}
            <div className="px-6 md:px-10 lg:px-20 py-4 flex gap-3 overflow-x-auto no-scrollbar scroll-smooth">
                {categories.map(category => (
                    <button 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 cursor-pointer transition-colors text-sm font-bold ${
                            selectedCategory === category 
                            ? 'bg-primary text-black' 
                            : 'bg-muted text-foreground hover:bg-muted/80'
                        }`}
                    >
                        <span className="capitalize">{category}</span>
                    </button>
                ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 md:p-10 lg:px-20">
                {filteredItems.map(item => (
                    <div key={item.id} className="flex flex-col gap-4 bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-primary/20">
                        <div className="w-full bg-muted aspect-[4/3] relative overflow-hidden">
                            <img 
                                src={getItemImage(item)} 
                                alt={item.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Optional Badge based on logic */}
                            {item.price > 20 && (
                                <div className="absolute top-4 right-4 bg-background/90 px-3 py-1 rounded-full text-xs font-bold text-primary backdrop-blur-sm">
                                    PREMIUM
                                </div>
                            )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-foreground text-lg font-bold leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                <span className="text-primary text-lg font-extrabold">₹{item.price}</span>
                            </div>
                            <p className="text-muted-foreground text-sm font-normal leading-relaxed mb-6 line-clamp-2">
                                {item.description}
                            </p>
                            <div className="mt-auto">
                                <Button 
                                    onClick={() => addToCart(item)}
                                    className="w-full rounded-full font-bold h-12 gap-2 shadow-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add to Order
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>

      {/* Floating View Cart Button */}
      {cart.length > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[480px] px-6">
            <button 
                onClick={handleCheckout}
                className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-16 bg-primary text-black text-lg font-extrabold leading-normal tracking-tight gap-4 px-8 border-4 border-background shadow-2xl transition-transform hover:scale-105 active:scale-95"
            >
                <div className="relative">
                    <ShoppingBasket className="w-6 h-6" />
                    <div className="absolute -top-2 -right-2 size-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center border-2 border-primary font-bold">
                        {cartItemCount}
                    </div>
                </div>
                <span className="truncate">Review Order (₹{cartTotal.toFixed(2)})</span>
            </button>
          </div>
      )}

      {/* Footer */}
      <footer className="pb-10 px-10 text-center">
        <p className="text-xs text-muted-foreground">Allergy information available upon request. Prices include VAT.</p>
      </footer>
    </div>
  )
}
