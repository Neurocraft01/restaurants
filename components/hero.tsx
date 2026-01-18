import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-medium">New: AI-Powered Menu Optimization</span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Elevate Your Restaurant Experience
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              RestoHub transforms the way you serve customers. From seamless digital menus to real-time kitchen
              management, orchestrate excellence across every touchpoint.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/signup" className="flex items-center gap-2">
                  Start Free Trial <ArrowRight size={20} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo">Book a Demo</Link>
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Trusted by 2,500+ restaurants worldwide</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="px-3 py-1 bg-muted rounded text-sm font-medium">5★ Rating</div>
                <div className="px-3 py-1 bg-muted rounded text-sm font-medium">98% Uptime</div>
                <div className="px-3 py-1 bg-muted rounded text-sm font-medium">24/7 Support</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-1 overflow-hidden">
              <div className="bg-background rounded-xl p-8 flex flex-col gap-4">
                <div className="h-12 bg-primary/10 rounded-lg flex items-center px-4">
                  <div className="h-2 w-20 bg-primary/30 rounded"></div>
                </div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <div className="h-3 bg-primary/10 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-16 bg-accent/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
