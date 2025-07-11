import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskBadge } from "@/components/security/risk-badge"
import { ExternalLink, Clock, DollarSign } from "lucide-react"

interface Transaction {
  id: string
  hash: string
  amount: string
  currency: string
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  timestamp: string
  from: string
  to: string
  status: 'pending' | 'confirmed' | 'failed'
}

interface TransactionMonitorProps {
  transactions: Transaction[]
  title?: string
}

export function TransactionMonitor({ 
  transactions, 
  title = "Real-time Transaction Monitor" 
}: TransactionMonitorProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          {title}
          <Badge variant="outline" className="ml-auto">
            {transactions.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80 w-full">
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {tx.hash.slice(0, 10)}...
                    </code>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {tx.amount} {tx.currency}
                    </span>
                    <span>{new Date(tx.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RiskBadge level={tx.riskLevel} />
                  <Badge 
                    variant={tx.status === 'confirmed' ? 'default' : 'outline'}
                    className="capitalize"
                  >
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
