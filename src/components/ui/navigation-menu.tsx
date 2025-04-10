import * as React from "react"
import { cn } from "../../lib/utils"
import { Link } from "react-router-dom"

export interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {
  isMobile?: boolean
}

export interface NavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  to: string
  isMobile?: boolean
  active?: boolean
}

const NavMenu = React.forwardRef<HTMLElement, NavMenuProps>(
  ({ className, isMobile = false, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        isMobile ? "flex flex-col space-y-2" : "flex items-center space-x-6",
        className
      )}
      {...props}
    />
  )
)
NavMenu.displayName = "NavMenu"

const NavItem = React.forwardRef<HTMLLIElement, NavItemProps>(
  ({ className, to, isMobile = false, active = false, children, ...props }, ref) => (
    <li ref={ref} className={cn("list-none", className)} {...props}>
      <Link
        to={to}
        className={cn(
          "transition-colors",
          isMobile
            ? "block py-2 text-white hover:text-red-500 border-b border-gray-800"
            : "text-white hover:text-red-500 transition-colors font-medium",
          active && "text-red-500"
        )}
      >
        {children}
      </Link>
    </li>
  )
)
NavItem.displayName = "NavItem"

export { NavMenu, NavItem }