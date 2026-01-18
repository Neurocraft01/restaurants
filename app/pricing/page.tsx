"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "₹999",
      period: "/month",
      description: "Perfect for small restaurants",
      features: [
        "Up to 50 menu items",
        "Basic order management",
        "5 staff accounts",
        "Email support",
        "Mobile ordering",
        "Daily reports",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Professional",
      price: "₹2,999",
      period: "/month",
      description: "For growing restaurants",
      features: [
        "Unlimited menu items",
        "Advanced order management",
        "25 staff accounts",
        "Priority support",
        "Delivery integration",
        "Advanced analytics",
        "Kitchen display system",
        "Inventory management",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For restaurant chains",
      features: [
        "Multiple location support",
        "Unlimited everything",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom integrations",
        "API access",
        "Advanced security",
        "White label options",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your restaurant. Scale as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 flex flex-col border-border transition-all duration-300 ${
                  plan.highlighted ? "ring-2 ring-primary transform scale-105" : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-primary text-primary-foreground text-center text-sm font-semibold py-2 px-4 rounded-lg mb-4">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-serif font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
                </div>

                <Button
                  className={`mb-6 ${
                    plan.highlighted ? "bg-primary hover:bg-primary/90" : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Still not sure?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Try RestoHub free for 14 days. No credit card required. All features included.
            </p>
            <Button className="bg-primary hover:bg-primary/90">Start Your Free Trial</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
