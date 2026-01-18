import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Solutions() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Built for Every Role</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From customers to management, RestoHub empowers everyone
          </p>
        </div>

        <Tabs defaultValue="customer" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="manager">Manager</TabsTrigger>
            <TabsTrigger value="admin">Super Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="customer" className="space-y-6">
            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Order with Style</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Browse beautiful menus with high-quality food photography</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Customize dishes with dietary preferences and allergies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Real-time order tracking from kitchen to table</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Digital receipts and reorder history</span>
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="manager" className="space-y-6">
            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Manage with Confidence</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Live kitchen display system with color-coded priorities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Manage menu items, pricing, and availability in real-time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Monitor staff performance and order metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Integrated payment processing with settlement reports</span>
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <div className="bg-card rounded-xl p-8 border border-border">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Control Everything</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Oversee multiple restaurant locations from one dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>Advanced analytics and revenue forecasting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>User management and role-based access control</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">→</span>
                  <span>System integrations and API access</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
