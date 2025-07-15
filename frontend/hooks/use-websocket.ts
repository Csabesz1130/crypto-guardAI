import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { useTransactionStore, Transaction } from '@/stores/transaction-store'

export function useTransactionWebSocket() {
  const addTransaction = useTransactionStore((state) => state.addTransaction)

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const socket: Socket = io(baseUrl, {
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('🔌 WebSocket connected')
    })

    socket.on('new_transaction', (tx: Transaction) => {
      addTransaction(tx)
    })

    socket.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('🔌 WebSocket disconnected')
    })

    return () => {
      socket.disconnect()
    }
  }, [addTransaction])
}