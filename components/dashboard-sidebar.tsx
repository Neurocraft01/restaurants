"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Users, 
  Store, 
  LogOut, 
  UtensilsCrossed, 
  ShoppingBag, 
  ChefHat,
  Menu as MenuIcon,
  Settings
} from "lucide-react"

interface SidebarProps {
  role: "admin" | "manager"
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const adminLinks = [
    { href: "/admin/overview", label: "Overview", icon: BarChart3 },
    { href: "/admin/restaurants", label: "Restaurants", icon: Store },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/orders", label: "Global Orders", icon: ShoppingBag },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  const managerLinks = [
    { href: "/manager/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/manager/menu-management", label: "Menu Management", icon: MenuIcon },
    { href: "/manager/orders", label: "Orders", icon: ChefHat }, // Assuming orders page exists or is dashboard
  ]

  const links = role === "admin" ? adminLinks : managerLinks

  return (
    <div className="flex flex-col h-full border-r bg-muted/10">
      <div className="h-16 flex items-center px-6 border-b">
        <Link href="/" className="flex items-center gap-2 font-serif font-bold text-xl">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          RestoHub
        </Link>
      </div>
      <div className="flex-1 py-6 px-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 mb-1 ${
                  isActive ? "font-semibold text-primary bg-primary/10" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Button>
            </Link>
          )
        })}
      </div>
      <div className="p-4 border-t">
        <form action="/api/auth/logout" method="POST">
             {/* Using API via fetch in component usually, but form action works without JS mostly. 
                 However, client side logic preferred for redirect. */}
             <LogoutButton />
        </form>
      </div>
    </div>
  )
}

function LogoutButton() {
    const { push } = require("next/navigation").useRouter()
    return (
        <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={async (e) => {
                e.preventDefault()
                await fetch("/api/auth/logout", { method: "POST" })
                push("/")
            }}
        >
            <LogOut className="w-5 h-5" />
            Logout
        </Button>
    )
}
