"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-serif font-bold">ℝ</span>
          </div>
          <span className="text-xl font-serif font-bold text-primary">RestoHub</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/menu" className="text-foreground hover:text-primary transition font-medium">
            Live Demo Menu
          </Link>
          <Link href="/admin" className="text-foreground hover:text-primary transition">
            Admin Suite
          </Link>
          <Link href="/analytics" className="text-foreground hover:text-primary transition">
            Analytics
          </Link>
          <Link href="/pricing" className="text-foreground hover:text-primary transition">
            Pricing
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Start Free Trial</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden p-2 hover:bg-muted rounded-lg" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/menu" className="text-foreground hover:text-primary">
                Menu Solutions
              </Link>
              <Link href="/admin" className="text-foreground hover:text-primary">
                Admin Suite
              </Link>
              <Link href="/analytics" className="text-foreground hover:text-primary">
                Analytics
              </Link>
              <Link href="/pricing" className="text-foreground hover:text-primary">
                Pricing
              </Link>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
