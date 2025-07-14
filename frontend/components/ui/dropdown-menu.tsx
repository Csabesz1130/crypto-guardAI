"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function DropdownMenu({ children }: React.PropsWithChildren<{}>) {
  return <div className="relative inline-block text-left">{children}</div>
}

interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}
export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, TriggerProps>(({ asChild, ...props }, ref) => {
  if (asChild && React.isValidElement(props.children)) {
    return React.cloneElement(props.children as any, { ref })
  }
  return <button ref={ref} {...props} />
})
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end"
}
export function DropdownMenuContent({ className, children, ...props }: ContentProps) {
  return (
    <div
      className={cn(
        "absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md border bg-popover shadow-lg focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}