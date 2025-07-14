"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost"
  size?: "default" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyle =
      variant === "ghost"
        ? "bg-transparent hover:bg-muted"
        : "bg-primary text-primary-foreground hover:bg-primary/90"
    const sizeStyle = size === "icon" ? "h-8 w-8 p-0" : "px-4 py-2"

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50",
          variantStyle,
          sizeStyle,
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"