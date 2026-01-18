"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"

export default function QRRedirectPage() {
  const router = useRouter()
  const params = useParams()
  const tableId = params.id as string

  useEffect(() => {
    if (tableId) {
      localStorage.setItem("tableId", tableId)
      router.replace("/menu")
    }
  }, [tableId, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Connecting to Table {tableId}...</p>
      </div>
    </div>
  )
}
