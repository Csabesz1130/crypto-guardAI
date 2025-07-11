'use client'

import { useEffect, useState } from 'react'
import { DashboardHeader } from '@/components/layout/dashboard-header'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { StatsOverview } from '@/components/dashboard/stats-overview'
import { TransactionMonitor } from '@/components/dashboard/transaction-monitor'
import { FraudDetectionCard } from '@/components/security/fraud-detection-card'
import { SecurityAlert } from '@/components/security/security-alert'
import { FraudTrendChart } from '@/components/charts/fraud-trend-chart'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Sample data for demonstration (replace with real API data)
const sampleTransactions = [
  {
    id: '1',
    hash: '0x1234567890abcdef',
    amount: '0.5',
    currency: 'ETH',
    riskLevel: 'LOW' as const,
    timestamp: new Date().toISOString(),
    from: '0xabc123',
    to: '0xdef456',
    status: 'confirmed' as const
  },
  {
    id: '2',
    hash: '0xfedcba0987654321',
    amount: '1.2',
    currency: 'BTC',
    riskLevel: 'HIGH' as const,
    timestamp: new Date().toISOString(),
    from: '0x789xyz',
    to: '0x456abc',
    status: 'pending' as const
  }
]

export default function DashboardPage() {
  const [apiStatus, setApiStatus] = useState<string>('Connecting...')

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
                  <TransactionMonitor transactions={sampleTransactions} />
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <TransactionMonitor 
                  transactions={sampleTransactions} 
                  title="All Transactions"
                />
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
