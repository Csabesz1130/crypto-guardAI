"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ScrollArea({ className, ...props }: ScrollAreaProps) {
  return <div className={cn("overflow-auto", className)} {...props} />
}
ScrollArea.displayName = "ScrollArea"