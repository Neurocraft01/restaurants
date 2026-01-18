"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminRedirect() {
  const router = useRouter()

  useState(() => {
    router.push("/admin/overview")
  }, [router])

  return <div />
}
