import { NextResponse } from "next/server"

export async function GET() {
  // Mock invoices data
  const invoices = [
    {
      invoiceNumber: "INV-001",
      customerName: "John Doe",
      amount: 5000,
      date: "2024-01-15",
      status: "paid",
    },
    {
      invoiceNumber: "INV-002",
      customerName: "Jane Smith",
      amount: 7500,
      date: "2024-01-16",
      status: "pending",
    },
  ]

  return NextResponse.json({ invoices })
}

export async function POST(request: Request) {
  const body = await request.json()

  // Create new invoice
  const newInvoice = {
    invoiceNumber: `INV-${Date.now()}`,
    ...body,
    date: new Date().toISOString().split("T")[0],
    status: "pending",
  }

  return NextResponse.json({ invoice: newInvoice }, { status: 201 })
}
