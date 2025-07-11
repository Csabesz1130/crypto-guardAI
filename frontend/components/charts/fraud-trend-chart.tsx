'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', threats: 65, prevented: 58 },
  { name: 'Feb', threats: 78, prevented: 72 },
  { name: 'Mar', threats: 90, prevented: 85 },
  { name: 'Apr', threats: 81, prevented: 78 },
  { name: 'May', threats: 95, prevented: 92 },
  { name: 'Jun', threats: 88, prevented: 85 }
]

export function FraudTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fraud Detection Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="threats" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Threats Detected"
            />
            <Line 
              type="monotone" 
              dataKey="prevented" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Threats Prevented"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
