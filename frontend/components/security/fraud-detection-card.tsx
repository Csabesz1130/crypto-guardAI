import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingUp, AlertTriangle } from "lucide-react"

interface FraudDetectionCardProps {
  confidence: number
  status: 'safe' | 'suspicious' | 'fraudulent'
  details: string
  modelVersion?: string
}

export function FraudDetectionCard({ 
  confidence, 
  status, 
  details, 
  modelVersion = "v1.0.0" 
}: FraudDetectionCardProps) {
  const statusConfig = {
    safe: {
      color: 'bg-green-100 text-green-800',
      icon: Shield,
      iconColor: 'text-green-600'
    },
    suspicious: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600'
    },
    fraudulent: {
      color: 'bg-red-100 text-red-800',
      icon: TrendingUp,
      iconColor: 'text-red-600'
    }
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${config.iconColor}`} />
            Fraud Detection
          </div>
          <Badge className={config.color}>
            {status.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Confidence Score</span>
            <span className="font-mono">{confidence}%</span>
          </div>
          <Progress value={confidence} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{details}</p>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Model Version: {modelVersion}</span>
            <span>Last Updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
