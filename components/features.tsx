import { CheckCircle2, BarChart3, Users2, Zap, Lock, Clock } from "lucide-react"

const features = [
  {
    icon: <Users2 className="w-6 h-6" />,
    title: "Elegant Customer Interface",
    description: "Customers browse menus with beautiful food photography and intuitive ordering on any device",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Real-Time Analytics",
    description: "Track orders, revenue, and performance metrics with beautiful dashboards",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Kitchen Display",
    description: "Orders appear instantly on kitchen screens with smart prioritization",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance with GDPR, PCI-DSS standards",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Offline Functionality",
    description: "Continue operations even during internet outages with automatic sync",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "QR Code Integration",
    description: "Scan to order, pay, and receive updates without app installation",
  },
]

export function Features() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Purpose-built features designed for modern restaurants
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-card rounded-xl p-8 border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
