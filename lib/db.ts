// Mock database client for demonstration
// Replace with actual database integration (Supabase, Neon, etc.)

// In-memory storage for demo - Persisted across HMR
declare global {
    var mockDb: any
}

export const db = globalThis.mockDb || {
  users: new Map(),
  restaurants: new Map(),
  menuItems: new Map(),
  orders: new Map(),
  analytics: new Map(),
}

if (process.env.NODE_ENV !== 'production') globalThis.mockDb = db

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
    },
    {
      id: "item-13",
      name: "Calamari Fritti",
      description: "Golden fried squid rings served with spicy marinara and lemon",
      price: 11.99,
      category: "starter",
      restaurantId: "rest-1",
      available: true,
    },
    {
      id: "item-14",
      name: "Caprese Salad",
      description: "Vine-ripened tomatoes, fresh mozzarella, basil, and balsamic glaze",
      price: 10.99,
      category: "starter",
      restaurantId: "rest-1",
      available: true,
    },
    {
        id: "item-15",
        name: "Minestrone Soup",
        description: "Hearty vegetable soup with beans and pasta",
        price: 7.50,
        category: "starter",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-16",
        name: "Stuffed Mushrooms",
        description: "Mushroom caps filled with herbs, cheese, and breadcrumbs",
        price: 9.50,
        category: "starter",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-17",
        name: "Risotto Funghi",
        description: "Creamy arborio rice with wild mushrooms and truffle oil",
        price: 17.99,
        category: "main",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-18",
        name: "Lasagna Classica",
        description: "Layers of pasta, meat sauce, béchamel, and parmesan cheese",
        price: 16.50,
        category: "main",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-19",
        name: "Fettuccine Alfredo",
        description: "Fettuccine pasta tossed in a rich parmesan cream sauce",
        price: 15.50,
        category: "main",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-20",
        name: "Quattro Formaggi Pizza",
        description: "Pizza topped with mozzarella, gorgonzola, parmesan, and fontina",
        price: 14.99,
        category: "main",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-21",
        name: "Spaghetti Bolognese",
        description: "Traditional slow-cooked meat tomato sauce over spaghetti",
        price: 15.99,
        category: "main",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-22",
        name: "Ravioli Ricotta",
        description: "Homemade pasta pillows filled with spinach and ricotta cheese",
        price: 16.99,
        category: "main",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-23",
        name: "Grilled Vegetable Platter",
        description: "Seasonal vegetables grilled with olive oil and herbs",
        price: 13.99,
        category: "main",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-24",
        name: "Beef Tenderloin",
        description: "8oz grilled tenderloin steak with roasted potatoes",
        price: 28.99,
        category: "main",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-25",
        name: "Gelato Trio",
        description: "Three scoops of artisan Italian gelato (Chocolate, Pistachio, Strawberry)",
        price: 8.50,
        category: "dessert",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-26",
        name: "Cannoli Siciliani",
        description: "Crispy pastry shells filled with sweet ricotta cream and chocolate chips",
        price: 7.50,
        category: "dessert",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-27",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
        price: 9.99,
        category: "dessert",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-28",
        name: "Affogato",
        description: "Vanilla gelato drowned in hot espresso",
        price: 6.50,
        category: "dessert",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-29",
        name: "House Red Wine",
        description: "Glass of Cabernet Sauvignon",
        price: 8.00,
        category: "beverages",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-30",
        name: "Cappuccino",
        description: "Espresso with steamed milk foam",
        price: 4.50,
        category: "beverages",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-31",
        name: "Iced Peach Tea",
        description: "Freshly brewed iced tea with peach nectar",
        price: 3.99,
        category: "beverages",
        restaurantId: "rest-1",
        available: true,
    },
    {
        id: "item-32",
        name: "Fresh Lemonade",
        description: "Squeezed fresh daily with a hint of mint",
        price: 4.50,
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
