"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { LogOut, Search, Store, CreditCard, QrCode, ClipboardCheck, ArrowLeft, Save, Rocket, Copy, Check } from "lucide-react"

export default function RestaurantOnboardingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "Luna Pizzeria",
    cuisine: "Authentic Italian",
    ownerName: "Marco Rossi",
    email: "marco.rossi@luna.it",
    plan: "pro"
  })

  const [step] = useState(2)

  const handleSave = async () => {
      // In a real app, this would save to the DB
      console.log("Saving restaurant", formData)
      router.push("/admin/restaurants") // Go back to list
  }
  
  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background pb-20 font-sans">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 sm:px-6 lg:px-40 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-lg text-primary-foreground">
                <Store className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold leading-tight hidden sm:block">Admin Dashboard</h2>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-6 items-center">
             <Button variant="ghost" onClick={() => router.push("/admin/overview")}>Overview</Button>
             <Button variant="ghost" size="icon" className="rounded-full bg-muted">
                <LogOut className="w-4 h-4" onClick={() => router.push("/")} />
             </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* PageHeading */}
        <div className="flex flex-col gap-3 mb-8">
          <h1 className="text-4xl font-black leading-tight tracking-tight">Onboard New Restaurant</h1>
          <p className="text-primary/80 text-lg">Set up a new restaurant profile and generate their unique QR menu in minutes.</p>
        </div>

        {/* ProgressBar */}
        <div className="bg-card p-6 rounded-xl border border-border mb-8 shadow-sm">
          <div className="flex flex-col gap-3">
            <div className="flex gap-6 justify-between items-center">
              <p className="font-bold">Step 2: Plan & QR Setup</p>
              <span className="text-xs font-medium px-3 py-1 bg-primary/20 text-primary rounded-full">66% Complete</span>
            </div>
            <div className="rounded-full bg-muted h-3 overflow-hidden">
              <div className="h-full rounded-full bg-primary w-2/3"></div>
            </div>
            <div className="flex justify-between mt-1 text-xs font-medium text-muted-foreground">
              <span>1. Basic Details</span>
              <span className="text-primary font-bold">2. Plan & QR</span>
              <span>3. Confirmation</span>
            </div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Section: Restaurant Details */}
            <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Store className="w-5 h-5 text-primary" />
                Restaurant & Owner Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Restaurant Name</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-12 bg-muted/50 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cuisine Type</Label>
                  <Input 
                    value={formData.cuisine}
                    onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
                    className="h-12 bg-muted/50 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Owner Full Name</Label>
                  <Input 
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                    className="h-12 bg-muted/50 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Contact Email</Label>
                  <Input 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="h-12 bg-muted/50 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Section: Plan Selection */}
            <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Subscription Plan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col gap-2 transition-all ${formData.plan === 'pro' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                    onClick={() => setFormData({...formData, plan: 'pro'})}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-bold uppercase ${formData.plan === 'pro' ? 'text-primary' : 'text-muted-foreground'}`}>Professional</span>
                    {formData.plan === 'pro' && <Check className="w-5 h-5 text-primary" />}
                  </div>
                  <p className="text-2xl font-black">$49/mo</p>
                  <p className="text-xs text-muted-foreground">Unlimited menu items, QR branding, & Analytics</p>
                </div>

                <div 
                    className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col gap-2 transition-all ${formData.plan === 'basic' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                     onClick={() => setFormData({...formData, plan: 'basic'})}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-bold uppercase ${formData.plan === 'basic' ? 'text-primary' : 'text-muted-foreground'}`}>Basic</span>
                    {formData.plan === 'basic' && <Check className="w-5 h-5 text-primary" />}
                  </div>
                  <p className="text-2xl font-black">$19/mo</p>
                  <p className="text-xs text-muted-foreground">Up to 50 items, Standard QR code</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card p-8 rounded-xl border border-border shadow-sm sticky top-28">
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-full aspect-square bg-muted/30 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center p-6 transition-all group hover:border-primary/50 relative">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-muted-foreground/30 group-hover:text-primary/30 transition-colors" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[1px] rounded-lg">
                      <Button className="rounded-full shadow-lg gap-2">
                         <QrCode className="w-4 h-4" />
                         Generate QR
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Unique Menu Link</p>
                  <div className="flex items-center gap-2 bg-muted/50 p-3 rounded-full border border-border">
                    <span className="text-xs flex-1 truncate text-muted-foreground">
                        menu.restohub.io/{formData.name.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-primary">
                        <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border w-full">
                  <p className="text-xs text-muted-foreground">A unique QR code and menu slug will be generated for the restaurant's public access.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-card rounded-xl border border-border shadow-lg">
          <Button variant="outline" className="rounded-full px-8 h-12 border-border" onClick={() => router.push("/admin/restaurants")}>
            Back to List
          </Button>
          <div className="flex gap-4 w-full sm:w-auto">
            <Button variant="secondary" className="rounded-full px-8 h-12 flex-1 sm:flex-none">
              Save Draft
            </Button>
            <Button className="rounded-full px-10 h-12 gap-2 shadow-lg shadow-primary/20 flex-1 sm:flex-none" onClick={handleSave}>
              Complete & Live
              <Rocket className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
