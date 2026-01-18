"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { 
  AlertCircle, 
  Utensils, 
  ShieldCheck, 
  Activity, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Globe, 
  Moon 
} from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [role, setRole] = useState("manager") // 'manager' | 'admin'
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Login failed")
      }

      const data = await res.json()

      // Redirect based on user role from API or selected intent
      // For this demo, we trust the API response primarily, but user selector sets expectation
      if (data.user.role === "customer") {
        router.push("/customer/menu")
      } else if (data.user.role === "manager") {
        router.push("/manager/dashboard")
      } else if (data.user.role === "admin") {
        router.push("/admin/overview")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-[#102216] flex items-center justify-center p-4 font-sans">
      {/* Main Container */}
      <div className="w-full max-w-[1024px] grid grid-cols-1 md:grid-cols-2 bg-card rounded-3xl shadow-2xl overflow-hidden border border-border">
        
        {/* Left Side: Visual/Branding */}
        <div className="relative hidden md:flex flex-col justify-between p-12 bg-zinc-950 text-white">
            <div className="absolute inset-0 opacity-40">
                <div className="w-full h-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7GmUamyXqfKOOWVgZ8Ya3arG1FSyhBQu5hMUNDUmZ_YpZqo6UplUjTTss-y5mQI1C8WI1W2f1bIXfowhzzC_b-QNo-HqjmZF44dHIrmCrWZ7OVFQQXxdJXZLt77x6L9FhwEL_3G5tZffcyWmblnfYZ_JHmvicnU2Uhu5N4sWCfqZ24PWKolgQ2Pfw9q5ds-zMcyiPs_Jz_DXwEcIAqdNabIUt94FDVJqruRcVtHirB3YvXfiudPyM1pcp73ARWuUTHbU8jS-nqmI')] bg-center bg-no-repeat bg-cover"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#102216]/80 to-primary/20"></div>
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8">
                    <div className="bg-primary p-2 rounded-lg">
                        <Utensils className="text-black font-bold w-6 h-6" />
                    </div>
                    <span className="text-xl font-black tracking-tight">O-SYSTEM</span>
                </div>
                <h2 className="text-4xl font-bold leading-tight">Unified Management <br/>& Ordering Portal</h2>
                <p className="mt-4 text-zinc-400 max-w-xs">Securely access your restaurant dashboard, manage QR menus, and track live orders from one central hub.</p>
            </div>
            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <ShieldCheck className="text-primary w-5 h-5" />
                    <span>End-to-End Encrypted Access</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <Activity className="text-primary w-5 h-5" />
                    <span>Real-time Analytics Dashboard</span>
                </div>
            </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex flex-col p-8 md:p-12 justify-center bg-background">
            <div className="flex flex-col gap-2 mb-8">
                <p className="text-foreground text-3xl font-black leading-tight tracking-tight">Welcome Back</p>
                <p className="text-muted-foreground text-base">Please enter your details to continue.</p>
            </div>

            {/* Role Toggle */}
            <div className="flex mb-8 bg-muted rounded-full p-1">
                 <button 
                    type="button"
                    onClick={() => setRole('manager')}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${role === 'manager' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
                 >
                    Restaurant Admin
                 </button>
                 <button 
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${role === 'admin' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
                 >
                    Super Admin
                 </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <Label className="font-bold px-1">Email Address</Label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input 
                            className="pl-12 py-6 rounded-xl bg-background" 
                            placeholder="e.g. admin@restaurant.com" 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center px-1">
                        <Label className="font-bold">Password</Label>
                        <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot password?</Link>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input 
                            className="pl-12 pr-12 py-6 rounded-xl bg-background" 
                            placeholder="••••••••" 
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                         <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                         >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-1 mt-2">
                    <input id="remember" type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary border-muted-foreground/30 accent-primary" />
                    <label htmlFor="remember" className="text-sm text-muted-foreground">Keep me logged in for 30 days</label>
                </div>

                {error && (
                    <div className="flex gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                <Button 
                    type="submit" 
                    className="mt-4 w-full bg-primary hover:bg-primary/90 text-black font-black py-6 rounded-xl shadow-lg shadow-primary/20 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Login to Dashboard"}
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </form>

            <div className="mt-8 flex flex-col items-center gap-4 text-sm">
                <div className="bg-muted p-2 rounded text-xs text-center w-full">
                     <p><span className="font-bold">Manager:</span> manager@demo.com / password123</p>
                     <p><span className="font-bold">Admin:</span> admin@demo.com / password123</p>
                </div>
                <p className="text-muted-foreground">Need help? <a href="#" className="text-foreground font-bold hover:underline">Contact System Support</a></p>
            </div>
        </div>
      </div>
    </div>
  )
}
