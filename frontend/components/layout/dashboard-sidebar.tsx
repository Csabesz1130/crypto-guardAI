import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Shield, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  Database
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: "Overview", active: true },
    { icon: Shield, label: "Security", badge: "3" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Database, label: "Transactions" },
    { icon: AlertTriangle, label: "Alerts", badge: "12" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className={cn("flex flex-col w-64 border-r bg-background", className)}>
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
