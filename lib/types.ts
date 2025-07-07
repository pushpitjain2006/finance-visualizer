export interface Transaction {
  _id: string
  amount: number
  date: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export interface MonthlyExpense {
  month: string
  amount: number
  sortKey: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}
