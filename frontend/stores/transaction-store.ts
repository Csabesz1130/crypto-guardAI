import { create } from 'zustand'

export interface Transaction {
  id: string
  hash: string
  amount: number
  currency: string
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  timestamp: string
  from: string
  to: string
  status: 'pending' | 'confirmed' | 'failed'
}

interface TransactionState {
  transactions: Transaction[]
  loading: boolean
  error?: string
  fetchTransactions: () => Promise<void>
  addTransaction: (tx: Transaction) => void
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  loading: false,
  error: undefined,
  fetchTransactions: async () => {
    set({ loading: true, error: undefined })
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/transactions`)
      if (!res.ok) throw new Error(`Status ${res.status}`)
      const data = await res.json()
      set({ transactions: data, loading: false })
    } catch (e: any) {
      set({ error: e.message ?? 'Failed to fetch transactions', loading: false })
    }
  },
  addTransaction: (tx: Transaction) =>
    set((state) => ({ transactions: [tx, ...state.transactions] })),
}))