"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
}

export function Progress({ value = 0, className, ...props }: ProgressProps) {
  return (
    <div className={cn("w-full h-2 rounded bg-muted", className)} {...props}>
      <div
        className="h-full rounded bg-primary"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
Progress.displayName = "Progress"