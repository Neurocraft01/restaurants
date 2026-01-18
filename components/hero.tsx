import { Button } from "@/components/ui/button"
import { ArrowRight, ChefHat, Smartphone, Monitor } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-32 lg:pt-32">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 backdrop-blur px-3 py-1 text-sm text-muted-foreground mb-8">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Live Demo Available v2.0
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
          The Operating System for <br className="hidden md:block" />
          <span className="text-primary">Modern Hospitality</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Streamline every aspect of your restaurant. From QR code ordering to kitchen intelligence and simplified admin controls.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" className="h-12 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 w-full sm:w-auto" asChild>
            <Link href="/menu">
              <Smartphone className="mr-2 h-5 w-5" />
              Try Customer App
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full sm:w-auto" asChild>
            <Link href="/manager/dashboard">
              <ChefHat className="mr-2 h-5 w-5" />
              Kitchen View
            </Link>
          </Button>
          <Button size="lg" variant="secondary" className="h-12 px-8 text-base w-full sm:w-auto" asChild>
            <Link href="/admin/overview">
              <Monitor className="mr-2 h-5 w-5" />
              Admin Panel
            </Link>
          </Button>
        </div>

        {/* Live Simulation Card */}
        <div className="bg-card border border-border rounded-xl p-2 max-w-3xl mx-auto shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="bg-muted/50 rounded-lg p-6 md:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Interactive Floor Simulation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/table/5" className="group block">
                    <div className="bg-background border border-border p-4 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                                <span className="font-bold">05</span>
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-foreground">Scan Table 5</p>
                                <p className="text-xs text-muted-foreground">Start New Order Flow</p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                  <Link href="/table/12" className="group block">
                    <div className="bg-background border border-border p-4 rounded-lg flex items-center justify-between hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
                                <span className="font-bold">12</span>
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-foreground">Scan Table 12</p>
                                <p className="text-xs text-muted-foreground">Start New Order Flow</p>
                            </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                 Clicking these simulates scanning a QR code on a physical table.
                 <br /> It will persist your session as sitting at that specific table.
              </p>
           </div>
        </div>

      </div>
    </section>
  )
}
