import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RiskBadgeProps {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  className?: string
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
  const variants = {
    LOW: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
    MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
    CRITICAL: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200'
  }

  return (
    <Badge 
      variant="outline" 
      className={cn(variants[level], className)}
    >
      {level}
    </Badge>
  )
}
