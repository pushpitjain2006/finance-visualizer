import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { Transaction } from "@/lib/models/transaction"

export async function GET() {
  try {
    await connectToDatabase()
    const transactions = await Transaction.find({}).sort({ date: -1 })
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const body = await request.json()

    const { amount, date, description } = body

    if (!amount || !date || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const transaction = new Transaction({
      amount: Number.parseFloat(amount),
      date: new Date(date),
      description: description.trim(),
    })

    await transaction.save()
    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
