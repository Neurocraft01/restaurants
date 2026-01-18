// Mock database client for demonstration
// Replace with actual database integration (Supabase, Neon, etc.)

// In-memory storage for demo
export const db = {
  users: new Map(),
  restaurants: new Map(),
  menuItems: new Map(),
  orders: new Map(),
  analytics: new Map(),
}

// Seed data
function seedData() {
  if (db.users.size > 0) return

  // Seed Users
  const users = [
    {
      id: "user-cust",
      name: "Demo Customer",
      email: "customer@demo.com",
      password: "password123", // In real app, hash this
      role: "customer",
    },
    {
      id: "user-mgr",
      name: "Demo Manager",
      email: "manager@demo.com",
      password: "password123",
      role: "manager",
      restaurantId: "rest-1",
    },
    {
      id: "user-admin",
      name: "Demo Admin",
      email: "admin@demo.com",
      password: "password123",
      role: "admin",
    },
  ]

  users.forEach((u) => db.users.set(u.id, u))

  // Seed Restaurant
  const restaurant = {
    id: "rest-1",
    name: "The Tasty Spoon",
    description: "Best local cuisine in town",
    address: "123 Food Street",
  }
  db.restaurants.set(restaurant.id, restaurant)

  // Seed Menu Items
  const menuItems = [
    {
      id: "item-1",
      name: "Margherita Pizza",
      description: "Classic tomato and mozzarella",
      price: 12.99,
      category: "main",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-2",
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with caesar dressing",
      price: 8.99,
      category: "starter",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-3",
      name: "Tiramisu",
      description: "Coffee-flavoured Italian dessert",
      price: 6.99,
      category: "dessert",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-4",
      name: "Pasta Carbonara",
      description: "Spaghetti with egg, cheese, pancetta, and pepper",
      price: 14.99,
      category: "main",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-5",
      name: "Garlic Bread",
      description: "Toasted french baguette with garlic butter and herbs",
      price: 4.99,
      category: "starter",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-6",
      name: "Bruschetta",
      description: "Grilled bread rubbed with garlic and topped with olive oil and salt",
      price: 6.99,
      category: "starter",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-7",
      name: "Chicken Parmigiana",
      description: "Breaded chicken breast topped with marinara sauce and cheese",
      price: 16.99,
      category: "main",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-8",
      name: "Grilled Salmon",
      description: "Fresh salmon fillet with lemon butter sauce",
      price: 18.99,
      category: "main",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-9",
      name: "Panna Cotta",
      description: "Creamy vanilla custard with berry compote",
      price: 7.99,
      category: "dessert",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-10",
      name: "Limoncello",
      description: "Traditional Italian lemon liqueur",
      price: 5.99,
      category: "beverages",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-11",
      name: "Espresso",
      description: "Strong black coffee",
      price: 2.99,
      category: "beverages",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-12",
      name: "Mineral Water",
      description: "Sparkling or Still",
      price: 1.99,
      category: "beverages",
      restaurantId: "rest-1",
      available: true,
    }
  ]


  menuItems.forEach((i) => db.menuItems.set(i.id, i))
  
  // Seed Orders
  const orders = [
    {
      id: "ord-1",
      customerName: "Alice Smith",
      tableId: "5",
      restaurantId: "rest-1",
      items: [
        { menuItemId: "item-1", menuItemName: "Margherita Pizza", quantity: 2, price: 12.99 },
        { menuItemId: "item-3", menuItemName: "Tiramisu", quantity: 1, price: 6.99 }
      ],
      totalAmount: 32.97,
      status: "pending",
      createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
      updatedAt: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: "ord-2",
      customerName: "Bob Jones",
      tableId: "12",
      restaurantId: "rest-1",
      items: [
        { menuItemId: "item-4", menuItemName: "Pasta Carbonara", quantity: 1, price: 14.99 },
        { menuItemId: "item-2", menuItemName: "Caesar Salad", quantity: 1, price: 8.99 }
      ],
      totalAmount: 23.98,
      status: "preparing",
      createdAt: new Date(Date.now() - 1000 * 60 * 25), // 25 mins ago
      updatedAt: new Date(Date.now() - 1000 * 60 * 10)
    },
    {
      id: "ord-3",
      customerName: "Charlie Brown",
      tableId: "8",
      restaurantId: "rest-1",
      items: [
        { menuItemId: "item-1", menuItemName: "Margherita Pizza", quantity: 1, price: 12.99 }
      ],
      totalAmount: 12.99,
      status: "ready",
      createdAt: new Date(Date.now() - 1000 * 60 * 40), // 40 mins ago
      updatedAt: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: "ord-4",
      customerName: "David Lee",
      tableId: "3",
      restaurantId: "rest-1",
      items: [
        { menuItemId: "item-3", menuItemName: "Tiramisu", quantity: 2, price: 6.99 }
      ],
      totalAmount: 13.98,
      status: "completed",
      createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      updatedAt: new Date(Date.now() - 1000 * 60 * 90)
    }
  ]

  orders.forEach(o => db.orders.set(o.id, o))

  console.log("Database seeded successfully")
}

// Run seeding
seedData()

// Helper to generate IDs
export function generateId() {
  return Math.random().toString(36).substring(2, 15)
}

// Database operations will be replaced with actual DB calls
export const dbOperations = {
  // User operations
  async getUser(id: string) {
    return db.users.get(id)
  },
  async getUserByEmail(email: string) {
    for (const user of db.users.values()) {
      if (user.email === email) return user
    }
    return null
  },
  async createUser(user: any) {
    const id = generateId()
    const newUser = { ...user, id, createdAt: new Date(), updatedAt: new Date() }
    db.users.set(id, newUser)
    return newUser
  },

  // Restaurant operations
  async getRestaurant(id: string) {
    return db.restaurants.get(id)
  },
  async getAllRestaurants() {
    return Array.from(db.restaurants.values())
  },
  async createRestaurant(data: any) {
    const id = generateId()
    const restaurant = { ...data, id, createdAt: new Date(), updatedAt: new Date() }
    db.restaurants.set(id, restaurant)
    return restaurant
  },

  // Menu operations
  async getMenuItems(restaurantId: string) {
    return Array.from(db.menuItems.values()).filter((item) => item.restaurantId === restaurantId)
  },
  async createMenuItem(data: any) {
    const id = generateId()
    const item = { ...data, id, createdAt: new Date(), updatedAt: new Date() }
    db.menuItems.set(id, item)
    return item
  },
  async updateMenuItem(id: string, data: any) {
    const item = db.menuItems.get(id)
    if (!item) return null
    const updated = { ...item, ...data, updatedAt: new Date() }
    db.menuItems.set(id, updated)
    return updated
  },

  // Order operations
  async getOrders(restaurantId: string) {
    return Array.from(db.orders.values()).filter((order) => order.restaurantId === restaurantId)
  },
  async getOrder(id: string) {
    return db.orders.get(id)
  },
  async createOrder(data: any) {
    const id = generateId()
    const order = {
      ...data,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending",
    }
    db.orders.set(id, order)
    return order
  },
  async updateOrderStatus(id: string, status: string) {
    const order = db.orders.get(id)
    if (!order) return null
    const updated = { ...order, status, updatedAt: new Date() }
    db.orders.set(id, updated)
    return updated
  },
}
