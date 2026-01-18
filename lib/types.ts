// Database types for RestoHub platform
export enum UserRole {
  CUSTOMER = "customer",
  RESTAURANT_MANAGER = "manager",
  ADMIN = "admin",
}

export interface User {
  id: string
  email: string
  password: string // hashed
  name: string
  role: UserRole
  restaurantId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Restaurant {
  id: string
  name: string
  email: string
  phone: string
  address: string
  qrCode: string
  cuisineType: string
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
  ownerId: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  available: boolean
  restaurantId: string
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  restaurantId: string
  customerId?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  totalAmount: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"
  specialNotes?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
}

export interface OrderItem {
  id: string
  menuItemId: string
  menuItemName: string
  quantity: number
  price: number
  specialInstructions?: string
}

export interface Analytics {
  restaurantId: string
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  topMenuItems: MenuItem[]
  ordersToday: number
  date: Date
}
