"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { LogOut, Settings } from "lucide-react"

export default function AdminSettingsPage() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/admin/overview")}>
              Back
            </Button>
            <h1 className="text-2xl font-serif font-bold text-foreground">System Settings</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Card className="p-6 border-border">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Platform Configuration
          </h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
                <Label>Platform Name</Label>
                <Input defaultValue="RestoHub" />
            </div>
            
            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Disable access for all users except admins</p>
                </div>
                <Switch />
            </div>

            <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label>New User Registration</Label>
                    <p className="text-sm text-muted-foreground">Allow new restaurants to register</p>
                </div>
                <Switch defaultChecked />
            </div>

             <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send system alerts to super admins</p>
                </div>
                <Switch defaultChecked />
            </div>
            
            <Button className="w-full">Save Changes</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
