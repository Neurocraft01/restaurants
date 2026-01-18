import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden lg:block w-64 lg:shrink-0 overflow-y-auto">
        <DashboardSidebar role="admin" />
      </div>
      <main className="flex-1 overflow-y-auto p-4 lg:p-8">
        {children}
      </main>
    </div>
  )
}
