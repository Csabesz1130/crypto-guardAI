import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertTriangle, Ban, Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface SecurityAlertProps {
  title: string
  message: string
  type: 'info' | 'warning' | 'critical' | 'success'
  className?: string
}

export function SecurityAlert({ title, message, type, className }: SecurityAlertProps) {
  const config = {
    info: {
      icon: Info,
      className: 'border-blue-200 bg-blue-50',
      iconColor: 'text-blue-600'
    },
    warning: {
      icon: AlertTriangle,
      className: 'border-yellow-200 bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    critical: {
      icon: Ban,
      className: 'border-red-200 bg-red-50',
      iconColor: 'text-red-600'
    },
    success: {
      icon: Shield,
      className: 'border-green-200 bg-green-50',
      iconColor: 'text-green-600'
    }
  }

  const { icon: Icon, className: alertClass, iconColor } = config[type]

  return (
    <Alert className={cn(alertClass, className)}>
      <Icon className={cn("h-4 w-4", iconColor)} />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
