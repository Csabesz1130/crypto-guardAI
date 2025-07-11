import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  DollarSign
} from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'stable'
  icon: React.ComponentType<any>
  description?: string
}

function StatCard({ title, value, change, trend, icon: Icon, description }: StatCardProps) {
  const trendConfig = {
    up: { color: 'text-green-600', icon: TrendingUp, sign: '+' },
    down: { color: 'text-red-600', icon: TrendingDown, sign: '-' },
    stable: { color: 'text-gray-600', icon: TrendingUp, sign: '' }
  }

  const config = trend ? trendConfig[trend] : null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {config && change !== undefined && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <config.icon className={`h-3 w-3 ${config.color}`} />
            <span className={config.color}>
              {config.sign}{Math.abs(change)}%
            </span>
            <span>from last month</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export function StatsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Threats Detected"
        value="1,234"
        change={12.5}
        trend="up"
        icon={Shield}
        description="Total security threats identified"
      />
      <StatCard
        title="Transactions Analyzed"
        value="45.2K"
        change={5.2}
        trend="up"
        icon={DollarSign}
        description="Real-time transaction monitoring"
      />
      <StatCard
        title="Risk Score"
        value="Low"
        change={-8.1}
        trend="down"
        icon={CheckCircle}
        description="Overall platform risk level"
      />
      <StatCard
        title="Active Alerts"
        value="23"
        change={15.3}
        trend="up"
        icon={AlertTriangle}
        description="Require immediate attention"
      />
    </div>
  )
}
