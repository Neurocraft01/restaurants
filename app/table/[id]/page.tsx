"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed, QrCode } from "lucide-react"

export default function TableLandingPage() {
  const router = useRouter()
  const params = useParams()
  const tableId = params.id as string
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Store table info
    if (tableId) {
      localStorage.setItem("tableId", tableId)
      // Clear previous cart to ensure fresh order for this table session
      // localStorage.removeItem("cart") 
      // Actually, maybe we keep cart? Let's clear it to be safe for a "New Session" feel
      // or we can ask the user. For now, let's keep it simple and just set the table.
    }
    
    const timer = setTimeout(() => {
        setLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [tableId])

  const handleStartOrdering = () => {
    router.push("/menu")
  }

  return (
    <div className="min-h-screen bg-primary/5 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center border-border shadow-xl">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500">
            <QrCode className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Welcome to RestoHub</h1>
        <p className="text-xl text-primary font-medium mb-6">Table {tableId}</p>
        
        <div className="space-y-4">
            <p className="text-muted-foreground">
                You have successfully scanned the QR code for Table {tableId}. 
                You can now browse our menu and place your order directly.
            </p>
            
            <Button 
                onClick={handleStartOrdering} 
                size="lg" 
                className="w-full text-lg h-12 font-semibold shadow-lg shadow-primary/20"
            >
                Start Ordering
            </Button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
                Need a waiter? <button className="text-primary underline">Call for service</button>
            </p>
        </div>
      </Card>
    </div>
  )
}
