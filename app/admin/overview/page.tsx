"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Building2, 
  TrendingUp, 
  Users, 
  QrCode, 
  Search, 
  Calendar, 
  Bell, 
  MoreVertical,
  MapPin,
  Utensils,
  Coffee,
  Flame
} from "lucide-react"

export default function AdminOverviewPage() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeUsers: 0,
    activeSessions: 1842 // Mocked for design match
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats")
      if (res.ok) {
        const data = await res.json()
        setStats(prev => ({ ...prev, ...data.stats }))
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  if (loading) return null

  return (
    <div className="space-y-8 font-sans">
      {/* Top Navigation Bar Placeholder (if layout doesn't provide it exactly like design) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
           <input 
             className="w-full bg-muted/50 border-0 rounded-full pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/50" 
             placeholder="Search venues, orders, reports..." 
             type="text"
           />
        </div>
        <div className="flex items-center gap-3">
            <Button className="rounded-full font-bold shadow-sm">Export Global Report</Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-border bg-card">
                <Calendar className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-border bg-card relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-card"></span>
            </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
            title="Total Revenue" 
            value={`₹${stats.totalRevenue.toLocaleString()}`} 
            change="+12.5%" 
            isPositive={true}
            progress={75}
        />
        <StatsCard 
            title="Active Restaurants" 
            value={stats.totalRestaurants.toString()} 
            change="+5.2%" 
            isPositive={true}
            caption="8 new this month"
        />
        <StatsCard 
            title="Avg. Order Value" 
            value="₹450" 
            change="-1.2%" 
            isPositive={false}
            caption="Target: ₹500"
        />
        <StatsCard 
            title="Active QR Sessions" 
            value={stats.activeSessions.toLocaleString()} 
            change="+18%" 
            isPositive={true}
            caption="Live real-time scans"
        />
      </div>

      {/* Main Layout: Map & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Regional Map Placeholder */}
        <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Regional Activity</h3>
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="rounded-full text-xs font-bold h-7 bg-card border border-border">Global</Button>
                    <Button variant="secondary" size="sm" className="rounded-full text-xs font-bold h-7 bg-primary/10 text-primary border border-primary/20">India</Button>
                    <Button variant="secondary" size="sm" className="rounded-full text-xs font-bold h-7 bg-card border border-border">Asia</Button>
                </div>
            </div>
            <div className="relative w-full aspect-[21/9] bg-muted/30 rounded-3xl overflow-hidden border border-border flex items-center justify-center group">
                 <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAN2xzxgYCF9W8Z7BwdZVML2jztiMt7UhE_x6xx2vcpEB-gfN-PyvhZNdFHGMZfYU-eRktI_gcW86z16mT5VUjJ3zEu-0738w9IEfw_fC3tab0ALGc6BGqsSv4z8ndB_rakq6DoAIkoXx4HDLk__-MMs_xUJS4rBDL0XisDqHMC2uZs01V9tpjtRU9vh8tI5kMqdNM9WLKp3Nen9fbxOf_gdqX11VrrnwldV_tmZFKFJeyC6jwuTLaS36Dlfnz40cBnkw4sNoCjdoE')] bg-cover bg-center opacity-30 mix-blend-multiply dark:mix-blend-overlay"></div>
                 <p className="z-10 text-muted-foreground font-medium">Interactive Map Data Visualization</p>
                 
                 {/* Mock Pins */}
                 <div className="absolute top-1/3 left-1/2 group-hover:scale-110 transition-transform cursor-pointer">
                    <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0 opacity-75"></div>
                    <div className="w-4 h-4 bg-primary rounded-full relative shadow-lg shadow-primary/50"></div>
                 </div>
            </div>
        </div>

        {/* Right: Performance List */}
        <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Top Performing Venues</h3>
            <div className="flex flex-col gap-3 bg-card p-4 rounded-3xl border border-border">
                <VenueRow rank={1} name="Skyline Rooftop" location="Mumbai, IN" revenue="₹42,800" orders="982" />
                <VenueRow rank={2} name="Urban Grill" location="Bangalore, IN" revenue="₹38,200" orders="845" />
                <VenueRow rank={3} name="Pasta Garden" location="Delhi, IN" revenue="₹31,500" orders="720" />
                <Button variant="ghost" className="w-full mt-2 text-sm font-bold text-primary hover:text-primary/80 py-2 h-auto">View All Venues</Button>
            </div>
        </div>
      </div>

      {/* Bottom Section: Detailed Reports Table */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent System Activity</h3>
            <div className="flex items-center gap-4">
                <select className="bg-transparent border-none text-sm font-semibold focus:ring-0 cursor-pointer outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                </select>
                <Button variant="link" className="text-primary font-bold decoration-0">See full log</Button>
            </div>
        </div>
        <div className="bg-card rounded-3xl border border-border overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Restaurant</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Live Scans</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">Revenue MTD</th>
                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        <TableRow 
                            name="The Green Bowl" 
                            icon={<Utensils className="w-4 h-4 text-primary" />} 
                            iconBg="bg-primary/20"
                            status="Active" 
                            scans="42" 
                            revenue="₹12,450.00" 
                        />
                        <TableRow 
                            name="Fire & Ice Grill" 
                            icon={<Flame className="w-4 h-4 text-orange-500" />} 
                            iconBg="bg-orange-100 dark:bg-orange-900/20"
                            status="Active" 
                            scans="18" 
                            revenue="₹8,920.50" 
                        />
                        <TableRow 
                            name="Morning Dew Coffee" 
                            icon={<Coffee className="w-4 h-4 text-gray-500" />} 
                            iconBg="bg-gray-100 dark:bg-gray-800"
                            status="Inactive" 
                            scans="0" 
                            revenue="₹3,120.00" 
                        />
                    </tbody>
                </table>
             </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, change, isPositive, caption, progress }: any) {
    return (
        <div className="bg-card p-6 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
            <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-muted-foreground">{title}</p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'text-primary bg-primary/10' : 'text-red-400 bg-red-400/10'}`}>
                    {change}
                </span>
            </div>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            {progress ? (
                <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${progress}%` }}></div>
                </div>
            ) : (
                <p className="text-xs text-muted-foreground mt-2">{caption}</p>
            )}
        </div>
    )
}

function VenueRow({ rank, name, location, revenue, orders }: any) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-muted/50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-xl font-bold text-primary">{rank}</div>
                <div className="flex flex-col">
                    <p className="text-sm font-bold">{name}</p>
                    <p className="text-xs text-muted-foreground">{location}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold">{revenue}</p>
                <p className="text-[10px] text-primary">{orders} orders</p>
            </div>
        </div>
    )
}

function TableRow({ name, icon, iconBg, status, scans, revenue }: any) {
    return (
        <tr className="hover:bg-muted/30 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
                        {icon}
                    </div>
                    <span className="text-sm font-bold">{name}</span>
                </div>
            </td>
            <td className="px-6 py-4">
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    {status === 'Active' && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>}
                    <span className={`text-sm font-medium ${status !== 'Active' ? 'text-muted-foreground' : ''}`}>{scans} Scans</span>
                </div>
            </td>
            <td className="px-6 py-4 text-sm font-bold">{revenue}</td>
            <td className="px-6 py-4 text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </td>
        </tr>
    )
}
