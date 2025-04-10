import * as React from "react"
import { cn } from "../../lib/utils"
import { FaChevronDown } from "react-icons/fa"

export interface DropdownProps {
  title: string | React.ReactNode
  open?: boolean
  onToggle?: () => void
  titleClassName?: string
  className?: string
  children?: React.ReactNode
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>>(
  ({ className, title, open = false, onToggle, titleClassName, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative", className)}
      {...props}
    >
      <button
        className={cn("flex items-center justify-between w-full py-2 transition-colors", 
          titleClassName || "text-white hover:text-cyan-300")}
        onClick={onToggle}
      >
        {typeof title === 'string' ? <span>{title}</span> : title}
        <FaChevronDown className={cn("transition-transform ml-1 text-xs", open && "rotate-180")} />
      </button>

      {open && (
        <div className="mt-1 ml-4 grid gap-2 py-2">
          {children}
        </div>
      )}
    </div>
  )
)
Dropdown.displayName = "Dropdown"

const DropdownMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute top-full left-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-md rounded-md border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] overflow-hidden z-50 py-1",
        className
      )}
      {...props}
    />
  )
)
DropdownMenu.displayName = "DropdownMenu"

export { Dropdown, DropdownMenu }