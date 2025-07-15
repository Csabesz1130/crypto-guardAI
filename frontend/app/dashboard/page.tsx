'use client'

import { useEffect, useState } from 'react'
import { DashboardHeader } from '@/components/layout/dashboard-header'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { StatsOverview } from '@/components/dashboard/stats-overview'
import { TransactionMonitor } from '@/components/dashboard/transaction-monitor'
import { FraudDetectionCard } from '@/components/security/fraud-detection-card'
import { SecurityAlert } from '@/components/security/security-alert'
import dynamic from 'next/dynamic'

const FraudTrendChart = dynamic(() => import('@/components/charts/fraud-trend-chart').then(m => m.FraudTrendChart), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTransactionStore } from '@/stores/transaction-store'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ErrorMessage } from '@/components/ui/error-message'
import { useTransactionWebSocket } from '@/hooks/use-websocket'

export default function DashboardPage() {
  const [apiStatus, setApiStatus] = useState<string>('Connecting...')
  const { transactions, loading, error, fetchTransactions } = useTransactionStore()

  // establish WebSocket connection once per page load
  useTransactionWebSocket()

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then(res => res.json())
      .then(data => setApiStatus(`✅ ${data.status} - ${data.service}`))
      .catch(() => setApiStatus('❌ Backend not connected'))
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Alert Section */}
            <SecurityAlert
              title="High Risk Transaction Detected"
              message="Transaction 0xfedcba... shows suspicious patterns and requires manual review."
              type="warning"
            />

            {/* Stats Overview */}
            <StatsOverview />

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FraudDetectionCard
                    confidence={85}
                    status="suspicious"
                    details="Multiple risk factors detected including high transaction amount and new address activity."
                  />
                  {error ? (
                    <ErrorMessage message={error} />
                  ) : loading ? (
                    <LoadingSpinner />
                  ) : (
                    <TransactionMonitor transactions={transactions} />
                  )}
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                {error ? (
                  <ErrorMessage message={error} />
                ) : loading ? (
                  <LoadingSpinner />
                ) : (
                  <TransactionMonitor
                    transactions={transactions}
                    title="All Transactions"
                  />
                )}
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <FraudTrendChart />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
