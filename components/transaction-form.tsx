"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { Transaction } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface TransactionFormProps {
  onTransactionAdded: (transaction: Transaction) => void
  initialData?: Transaction
  onCancel?: () => void
  mode?: "add" | "edit"
}

export function TransactionForm({ onTransactionAdded, initialData, onCancel, mode = "add" }: TransactionFormProps) {
  const [amount, setAmount] = useState(initialData?.amount?.toString() || "")
  const [date, setDate] = useState(
    initialData?.date ? new Date(initialData.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
  )
  const [description, setDescription] = useState(initialData?.description || "")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !date || !description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const url = mode === "edit" && initialData?._id ? `/api/transactions/${initialData._id}` : "/api/transactions"

      const method = mode === "edit" ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: numAmount,
          date: new Date(date).toISOString(),
          description: description.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${mode} transaction`)
      }

      const transaction = await response.json()
      onTransactionAdded(transaction)

      if (mode === "add") {
        setAmount("")
        setDate(new Date().toISOString().split("T")[0])
        setDescription("")
      }

      toast({
        title: "Success",
        description: `Transaction ${mode === "edit" ? "updated" : "added"} successfully`,
      })

      if (onCancel) onCancel()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{mode === "edit" ? "Edit Transaction" : "Add New Transaction"}</CardTitle>
        <CardDescription>
          {mode === "edit" ? "Update the transaction details" : "Enter the details of your transaction"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter transaction description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "edit" ? "Update Transaction" : "Add Transaction"}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
