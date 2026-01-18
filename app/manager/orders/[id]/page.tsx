"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { 
  ChevronRight, 
  Printer, 
  Flame, 
  CheckCircle, 
  Clock, 
  Edit, 
  PlusCircle, 
  MinusCircle, 
  Snowflake, 
  StickyNote, 
  Settings,
  QrCode,
  ArrowLeft
} from "lucide-react"

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch from API
    // const res = await fetch(`/api/manager/orders/${params.id}`)
    
    // For now, mocking the data structure based on the design since the API might not return this exact rich data yet
    // But I will try to fetch the real order first
    fetchOrder()
  }, [params.id])

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setOrder(data.order)
      } else {
         // Fallback mock if not found or API error (for demo purposes)
         setOrder({
             id: params.id as string,
             status: 'in-progress',
             tableId: 12,
             createdAt: new Date().toISOString(),
             customerName: 'Alex Chen',
             customerPhone: '+1 (555) 0123',
             total: 42.50,
             items: [
                 { id: 1, name: 'Truffle Umami Burger', quantity: 1, price: 18.50, modifiers: [{ name: 'Extra Truffle Mayo', type: 'add' }, { name: 'No Onions', type: 'remove' }] },
                 { id: 2, name: 'Parmesan Truffle Fries', quantity: 2, price: 14.00, note: 'Large Portion' },
                 { id: 3, name: 'Classic Lemonade', quantity: 2, price: 10.00, modifiers: [{ name: 'Less Ice', type: 'info' }] }
             ],
             note: 'Please pack the burgers and fries separately. Customer is sensitive to moisture. Thank you!'
         })
      }
    } catch (error) {
       console.error(error)
    } finally {
        setLoading(false)
    }
  }
  
  const handlePrint = () => {
      window.print()
  }

  if (loading) {
      return <div className="p-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }

  if (!order) return <div className="p-8">Order not found</div>

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-[#102216] font-sans pb-20">
      <style jsx global>{`
        @media print {
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { background: white !important; }
            .receipt-preview { 
                border: none !important; 
                box-shadow: none !important; 
                width: 80mm !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            /* Hide the main layout sidebar/header if they exist outside this component */
            nav, header, aside { display: none !important; }
        }
      `}</style>
      
      <main className="max-w-6xl mx-auto p-4 sm:p-8 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 no-print">
            <Button variant="ghost" size="sm" className="h-auto p-0 text-primary font-medium hover:bg-transparent hover:underline" onClick={() => router.push('/manager/orders')}>
                Orders
            </Button>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-semibold">Order #{order.id.slice(0, 8)}</span>
        </nav>

        {/* PageHeading */}
        <header className="flex flex-wrap justify-between items-end gap-4 border-b border-border pb-6 no-print">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Order #{order.id.slice(0, 8)}</h2>
                    <Badge variant="secondary" className="bg-primary/20 text-green-700 hover:bg-primary/30 uppercase tracking-wider">
                        {order.status}
                    </Badge>
                </div>
                <p className="text-muted-foreground text-lg flex items-center gap-2">
                    Table {order.tableId || 'N/A'} • {new Date(order.createdAt).toLocaleTimeString()} • <span className="text-primary font-bold italic">Live Order</span>
                </p>
            </div>
            <div className="flex gap-3">
                <Button variant="outline" className="rounded-full px-6 bg-secondary/50 border-0 hover:bg-secondary">
                    Cancel Order
                </Button>
                <Button className="rounded-full px-8 shadow-md">
                    Mark as Ready
                </Button>
            </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8 no-print">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="p-6 border-border/60 bg-card/50">
                        <p className="text-primary text-xs font-bold uppercase mb-1">Total Amount</p>
                        <p className="text-2xl font-black">₹{order.totalAmount || order.total}</p>
                        <div className="flex items-center gap-1 text-green-600 mt-2">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">Payment Verified</span>
                        </div>
                    </Card>
                    <Card className="p-6 border-border/60 bg-card/50">
                        <p className="text-primary text-xs font-bold uppercase mb-1">Items</p>
                        <p className="text-2xl font-black">{order.items?.length || 0} Items</p>
                        <p className="text-muted-foreground text-xs font-medium mt-2">Prepared in Kitchen</p>
                    </Card>
                    <Card className="p-6 border-border/60 bg-card/50">
                        <p className="text-primary text-xs font-bold uppercase mb-1">Customer</p>
                        <p className="text-2xl font-black truncate">{order.customerName || 'Guest'}</p>
                        <p className="text-muted-foreground text-xs font-medium mt-2">{order.customerPhone || 'N/A'}</p>
                    </Card>
                </div>

                {/* Order Breakdown */}
                <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                    <div className="p-5 border-b border-border flex justify-between items-center">
                        <h3 className="font-bold text-lg">Order Breakdown</h3>
                        <Button variant="ghost" className="text-primary text-sm font-bold gap-1 h-auto py-1">
                            <Edit className="w-4 h-4" /> Edit Items
                        </Button>
                    </div>
                    <div className="divide-y divide-border">
                        {order.items?.map((item: any, idx: number) => (
                             <div key={idx} className="p-5 flex justify-between items-start">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center font-bold text-lg">
                                        {item.quantity}x
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{item.name || item.menuItemName}</p>
                                        <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                                            {item.modifiers?.map((mod: any, mIdx: number) => (
                                                <div key={mIdx} className="flex items-center gap-1">
                                                    {mod.type === 'remove' ? <MinusCircle className="w-3 h-3 text-red-500" /> : <PlusCircle className="w-3 h-3 text-green-500" />}
                                                    <span>{mod.name}</span>
                                                </div>
                                            ))}
                                            {item.note && <p className="italic text-primary">{item.note}</p>}
                                        </div>
                                    </div>
                                </div>
                                <p className="font-bold text-lg">₹{(item.price || 0) * (item.quantity || 1)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Notes */}
                    {order.note && (
                        <div className="bg-primary/10 p-5 m-5 rounded-xl border-l-4 border-primary">
                            <div className="flex items-center gap-2 mb-1">
                                <StickyNote className="w-4 h-4 text-primary" />
                                <span className="text-xs font-bold uppercase text-primary">Special Instructions</span>
                            </div>
                            <p className="text-sm font-medium">{order.note}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Print Preview & Tools */}
            <div className="space-y-6">
                {/* Thermal Print UI */}
                <div className="bg-card rounded-xl border border-border p-6 sticky top-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6 no-print">
                        <h3 className="font-bold">Thermal Print Preview</h3>
                        <Button variant="ghost" size="icon" className="hover:bg-muted rounded-lg">
                            <Settings className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Receipt Preview Component */}
                    <div className="receipt-preview mx-auto bg-white text-black p-6 shadow-2xl border border-gray-100 rounded-sm font-mono text-sm w-[300px]">
                        <div className="text-center mb-4">
                            <p className="font-bold text-xl">THE BURGER LAB</p>
                            <p className="text-[10px]">123 Culinary Ave, Foodie City</p>
                            <p className="text-[10px]">Tel: (555) 012-3456</p>
                            <p className="text-[10px] mt-2">--------------------------------</p>
                        </div>
                        <div className="space-y-1 text-xs">
                            <div className="flex justify-between"><span>ORDER:</span> <span>#{order.id.slice(0, 6).toUpperCase()}</span></div>
                            <div className="flex justify-between"><span>TABLE:</span> <span>{order.tableId}</span></div>
                            <div className="flex justify-between"><span>DATE:</span> <span>{new Date().toLocaleString()}</span></div>
                            <p className="text-[10px]">--------------------------------</p>
                        </div>
                        <div className="space-y-3 my-4">
                             {order.items?.map((item: any, idx: number) => (
                                <div key={idx}>
                                    <div className="flex justify-between font-bold">
                                        <span>{item.quantity}x {item.name || item.menuItemName}</span>
                                        <span>{(item.price || 0) * item.quantity}</span>
                                    </div>
                                    {item.modifiers?.map((m: any, i:number) => (
                                         <p key={i} className="text-[10px] ml-4 uppercase">{m.type === 'remove' ? '- ' : '+ '}{m.name}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-dashed border-black pt-4">
                             <div className="flex justify-between"><span>SUBTOTAL</span> <span>₹{order.totalAmount || order.total}</span></div>
                             <div className="flex justify-between"><span>TAX (0%)</span> <span>₹0.00</span></div>
                             <div className="flex justify-between font-bold text-lg mt-2"><span>TOTAL</span> <span>₹{order.totalAmount || order.total}</span></div>
                        </div>
                         <div className="text-center mt-6 text-[10px] italic">
                            <p>Scan for Digital Invoice</p>
                            <div className="mt-2 w-16 h-16 bg-gray-200 mx-auto rounded flex items-center justify-center">
                                <QrCode className="w-10 h-10 text-gray-500" />
                            </div>
                            <p className="mt-4">Enjoy your meal!</p>
                        </div>
                        <div className="text-center mt-4 text-[10px]">
                          STITCH PLATFORM
                        </div>
                    </div>

                     {/* Print Controls */}
                    <div className="mt-8 space-y-4 no-print">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                            <div className="flex items-center gap-2">
                                <Printer className="w-4 h-4" />
                                <span className="text-sm font-medium">80mm Kitchen</span>
                            </div>
                            <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">ONLINE</span>
                        </div>
                        
                        <Button 
                            className="w-full h-12 rounded-full font-black text-white gap-3 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform" 
                            onClick={handlePrint}
                        >
                            <Printer className="w-5 h-5" />
                            PRINT RECEIPT
                        </Button>
                        <Button 
                            variant="outline" 
                            className="w-full h-12 rounded-full font-bold text-primary border-2 border-primary hover:bg-primary/5"
                        >
                            <Flame className="w-5 h-5 mr-2" />
                            SEND TO KITCHEN
                        </Button>
                    </div>

                </div>
            </div>
        </div>
      </main>
    </div>
  )
}
