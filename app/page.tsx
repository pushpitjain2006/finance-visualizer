"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionList } from "@/components/transaction-list"
import { MonthlyChart } from "@/components/monthly-chart"
import type { Transaction } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/transactions")
      if (!response.ok) throw new Error("Failed to fetch transactions")
      const data = await response.json()
      setTransactions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const handleTransactionAdded = (newTransaction: Transaction) => {
    setTransactions((prev) => [newTransaction, ...prev])
  }

  const handleTransactionUpdated = (updatedTransaction: Transaction) => {
    setTransactions((prev) => prev.map((t) => (t._id === updatedTransaction._id ? updatedTransaction : t)))
  }

  const handleTransactionDeleted = (deletedId: string) => {
    setTransactions((prev) => prev.filter((t) => t._id !== deletedId))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Personal Finance Visualizer</h1>
        <p className="text-muted-foreground">Track your expenses and visualize your spending patterns</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="add">Add Transaction</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{transactions.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0).toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹
                  {transactions
                    .filter((t) => new Date(t.date).getMonth() === new Date().getMonth())
                    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
                    .toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹
                  {transactions.length > 0
                    ? (transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / transactions.length).toFixed(2)
                    : "0.00"}
                </div>
              </CardContent>
            </Card>
          </div>
          <MonthlyChart transactions={transactions} />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionList
            transactions={transactions}
            onTransactionUpdated={handleTransactionUpdated}
            onTransactionDeleted={handleTransactionDeleted}
          />
        </TabsContent>

        <TabsContent value="add">
          <TransactionForm onTransactionAdded={handleTransactionAdded} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
