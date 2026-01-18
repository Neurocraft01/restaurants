"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold mb-4">Powerful Analytics</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Gain deep insights into your restaurant's performance with our advanced reporting tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 border-border">
             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <BarChart3 className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold mb-2">Sales Tracking</h3>
             <p className="text-muted-foreground">Monitor revenue in real-time across all your locations and channels.</p>
          </Card>
           <Card className="p-6 border-border">
             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <TrendingUp className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold mb-2">Menu Performance</h3>
             <p className="text-muted-foreground">Identify your best sellers and optimize your menu for maximum profitability.</p>
          </Card>
           <Card className="p-6 border-border">
             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                <Users className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold mb-2">Customer Insights</h3>
             <p className="text-muted-foreground">Understand customer preferences and ordering habits to improve retention.</p>
          </Card>
        </div>

        <div className="bg-muted p-12 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to optimize your business?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of restaurants using RestoHub analytics today.</p>
            <Button size="lg">Start Free Trial</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
