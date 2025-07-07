"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import type { Transaction } from "@/lib/types"
import { TrendingUp } from "lucide-react"

interface MonthlyChartProps {
  transactions: Transaction[]
}

export function MonthlyChart({ transactions }: MonthlyChartProps) {
  const monthlyData = useMemo(() => {
    const monthlyExpenses: { [key: string]: number } = {}

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      const monthName = date.toLocaleDateString("en-US", { year: "numeric", month: "short" })

      if (!monthlyExpenses[monthKey]) {
        monthlyExpenses[monthKey] = 0
      }
      monthlyExpenses[monthKey] += Math.abs(transaction.amount)
    })

    return Object.entries(monthlyExpenses)
      .map(([key, amount]) => {
        const [year, month] = key.split("-")
        const date = new Date(Number.parseInt(year), Number.parseInt(month) - 1)
        return {
          month: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
          amount: Number.parseFloat(amount.toFixed(2)),
          sortKey: key,
        }
      })
      .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
      .slice(-12) // Show last 12 months
  }, [transactions])

  const chartConfig = {
    amount: {
      label: "Amount",
      color: "hsl(var(--chart-1))",
    },
  }

  const totalExpenses = monthlyData.reduce((sum, data) => sum + data.amount, 0)
  const averageMonthly = monthlyData.length > 0 ? totalExpenses / monthlyData.length : 0

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Monthly Expenses</CardTitle>
          <CardDescription>Showing total expenses for the last 12 months</CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Total</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">₹{totalExpenses.toFixed(2)}</span>
          </div>
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">Average</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">₹{averageMonthly.toFixed(2)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {monthlyData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <TrendingUp className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No data to display</h3>
            <p className="text-muted-foreground">Add some transactions to see your monthly spending chart.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `₹${value}`} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-40"
                      nameKey="amount"
                      labelFormatter={(value) => `${value}`}
                      formatter={(value) => [`₹${value}`, "Expenses"]}
                    />
                  }
                />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
