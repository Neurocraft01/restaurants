"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LogOut, Plus, Edit2, Trash2 } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  available: boolean
}

export default function MenuManagementPage() {
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "main",
    available: true,
  })

  useEffect(() => {
    fetchMenuItems()
  }, [])

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const method = editingItem ? "PATCH" : "POST"
      const url = editingItem ? `/api/menu/${editingItem.id}` : "/api/menu"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number.parseFloat(formData.price),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (editingItem) {
          setMenuItems(menuItems.map((item) => (item.id === editingItem.id ? data.item : item)))
        } else {
          setMenuItems([...menuItems, data.item])
        }
        setIsOpen(false)
        setEditingItem(null)
        setFormData({ name: "", description: "", price: "", category: "main", available: true })
      }
    } catch (error) {
      console.error("Failed to save item:", error)
    }
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      available: item.available,
    })
    setIsOpen(true)
  }

  const handleDelete = async (itemId: string) => {
    if (confirm("Are you sure?")) {
      try {
        const res = await fetch(`/api/menu/${itemId}`, { method: "DELETE" })
        if (res.ok) {
          setMenuItems(menuItems.filter((item) => item.id !== itemId))
        }
      } catch (error) {
        console.error("Failed to delete item:", error)
      }
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-serif font-bold text-foreground">Menu</h1>
           <p className="text-muted-foreground">Create and manage your dishes</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingItem(null)
                  setFormData({ name: "", description: "", price: "", category: "main", available: true })
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md border-border">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Item" : "Add New Item"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Butter Chicken"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-muted/50 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Item description..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="bg-muted/50 border-border min-h-20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="bg-muted/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-muted/50"
                    >
                      <option value="appetizers">Appetizers</option>
                      <option value="main">Main Course</option>
                      <option value="desserts">Desserts</option>
                      <option value="beverages">Beverages</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="available"
                    name="available"
                    type="checkbox"
                    checked={formData.available}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-border"
                  />
                  <Label htmlFor="available" className="font-normal cursor-pointer">
                    Available
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
      </div>

      <div className="space-y-4">
          {menuItems.length === 0 ? (
            <Card className="p-12 text-center border-border shadow-sm">
              <p className="text-muted-foreground mb-4">No menu items yet</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-border hover:shadow-lg transition-all flex flex-col">
                <div className="relative h-40 bg-muted/50 flex items-center justify-center">
                    <span className="text-6xl grayscale group-hover:grayscale-0 transition-all">🍽️</span>
                    <Badge
                      className={`absolute top-2 right-2 ${
                        item.available
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }`}
                    >
                      {item.available ? "Available" : "Unavailable"}
                    </Badge>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1" title={item.name}>{item.name}</h3>
                        <span className="font-bold text-primary">₹{item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{item.description}</p>
                    <div className="flex justify-end gap-2 pt-4 border-t border-border/50">
                        <Button onClick={() => handleEdit(item)} size="sm" variant="ghost" className="h-8">
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                        <Button
                            onClick={() => handleDelete(item.id)}
                            size="sm"
                            variant="ghost"
                            className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>
              </Card>
            ))}
            </div>
          )}
        </div>
    </div>
  )
}
