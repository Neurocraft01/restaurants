import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora } from "next/font/google"
import "./globals.css"

const _playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const _lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "RestoHub - Restaurant Management Platform",
  description: "Premium restaurant ordering and management system. Streamline operations, delight customers.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

