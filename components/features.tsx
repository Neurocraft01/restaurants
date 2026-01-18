import { QrCode, Smartphone, ChefHat, BarChart3, Globe, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: <QrCode className="w-6 h-6" />,
    title: "QR Code Ordering",
    description: "Guests scan, order, and pay from their table. No app download required.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: <ChefHat className="w-6 h-6" />,
    title: "Kitchen Display System",
    description: "Digital tickets go straight to the kitchen. Reduce errors and improve ticket times.",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Real-Time Analytics",
    description: "Track sales, popular items, and staff performance live from any device.",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile POS",
    description: "Servers can take orders at the table with handheld devices. Faster turnarounds.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Online Ordering",
    description: "Accept pickup and delivery orders through your own branded website.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Enterprise Grade",
    description: "Secure, reliable, and scalable. 99.9% uptime guarantee for peace of mind.",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
            Everything your restaurant needs to grow
          </h2>
          <p className="text-lg text-muted-foreground">
            RestoHub replaces clunky legacy systems with a single, modern platform that connects every part of your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feature.bg} ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
