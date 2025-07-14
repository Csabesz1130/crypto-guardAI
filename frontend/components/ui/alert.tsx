"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "error" | "warning" | "success"
}

export function Alert({ variant = "default", className, ...props }: AlertProps) {
  const style =
    variant === "error"
      ? "bg-red-50 text-red-900 border-red-200"
      : variant === "warning"
      ? "bg-yellow-50 text-yellow-900 border-yellow-200"
      : variant === "success"
      ? "bg-green-50 text-green-900 border-green-200"
      : "bg-muted text-foreground border-border"
  return <div className={cn("rounded-md border p-4", style, className)} {...props} />
}
Alert.displayName = "Alert"

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
}
AlertTitle.displayName = "AlertTitle"

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}
AlertDescription.displayName = "AlertDescription"