import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, MonitorPlay, BarChartBig, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Solutions() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">One Platform, Endless Possibilities</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how RestoHub empowers every member of your team
          </p>
        </div>

        <Tabs defaultValue="customer" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-12 h-auto p-1 bg-muted/50 rounded-full gap-2">
            <TabsTrigger value="customer" className="rounded-full py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Customer Experience
            </TabsTrigger>
            <TabsTrigger value="manager" className="rounded-full py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Kitchen & Manager
            </TabsTrigger>
            <TabsTrigger value="admin" className="rounded-full py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              Owner & Admin
            </TabsTrigger>
          </TabsList>

          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm">
            <TabsContent value="customer" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-6">
                      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                          <Smartphone className="w-7 h-7" />
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-foreground">Frictionless Ordering</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                          Give your guests the power to order and pay from their phone. No generic PDFs, but a full interactive menu with photos, customization, and instant checkout.
                      </p>
                      <ul className="space-y-3">
                          {["Direct QR Scan Entry", "Apple Pay / Google Pay Support", "Real-time Order Status Updates"].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                  {item}
                              </li>
                          ))}
                      </ul>
                      <Button asChild className="space-x-2">
                          <Link href="/menu">
                             <span>View Customer Demo</span>
                             <ArrowRight className="w-4 h-4" />
                          </Link>
                      </Button>
                  </div>
                  <div className="flex-1 w-full relative h-[300px] bg-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center">
                      <div className="text-9xl">📱</div>
                      <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur p-4 rounded-xl border border-border text-sm">
                         Guest scans QR code &rarr; Browses Menu &rarr; Pays
                      </div>
                  </div>
              </div>
            </TabsContent>

            <TabsContent value="manager" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-6">
                      <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                          <MonitorPlay className="w-7 h-7" />
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-foreground">Kitchen Intelligence</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                          Ditch the noisy ticket printer. Orders appear instantly on the KDS (Kitchen Display System) with clear priorities, modifications, and timers.
                      </p>
                      <ul className="space-y-3">
                          {["Color-coded status (New, Preparing, Ready)", "Ticket Timer Alerts", "Waitstaff Notifications"].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                  {item}
                              </li>
                          ))}
                      </ul>
                      <Button asChild className="space-x-2" variant="default">
                          <Link href="/manager/dashboard">
                             <span>View Kitchen Demo</span>
                             <ArrowRight className="w-4 h-4" />
                          </Link>
                      </Button>
                  </div>
                  <div className="flex-1 w-full relative h-[300px] bg-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center">
                      <div className="text-9xl">👨‍🍳</div>
                       <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur p-4 rounded-xl border border-border text-sm">
                         Chef taps "Prepare" &rarr; Guest notified instantly
                      </div>
                  </div>
              </div>
            </TabsContent>

            <TabsContent value="admin" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1 space-y-6">
                      <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
                          <BarChartBig className="w-7 h-7" />
                      </div>
                      <h3 className="font-serif text-3xl font-bold text-foreground">Command Center</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                          Manage your entire operation from one screen. Update menus in seconds, view live sales data, and manage staff permissions.
                      </p>
                      <ul className="space-y-3">
                          {["Live Sales Dashboard", "Menu Item Management", "Staff & Role Configuration"].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                  {item}
                              </li>
                          ))}
                      </ul>
                      <Button asChild className="space-x-2" variant="default">
                          <Link href="/admin/overview">
                             <span>View Admin Demo</span>
                             <ArrowRight className="w-4 h-4" />
                          </Link>
                      </Button>
                  </div>
                  <div className="flex-1 w-full relative h-[300px] bg-muted rounded-2xl overflow-hidden border border-border flex items-center justify-center">
                      <div className="text-9xl">📊</div>
                       <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur p-4 rounded-xl border border-border text-sm">
                         Owner checks sales &rarr; Updates menu price &rarr; Live everywhere
                      </div>
                  </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  )
}
