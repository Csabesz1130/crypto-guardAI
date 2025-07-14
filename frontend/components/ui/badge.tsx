"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline"
}

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  const styles =
    variant === "outline"
      ? "border border-border text-foreground"
      : "bg-primary text-primary-foreground"
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold",
        styles,
        className
      )}
      {...props}
    />
  )
}
Badge.displayName = "Badge"