"use client"

import { Search, User, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  onSearchClick?: () => void
}

export function BottomNavigation({ onSearchClick }: BottomNavigationProps) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isProfile = pathname?.startsWith("/profile")

  return (
    <nav role="navigation" aria-label="Bottom Navigation" className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-4 mb-4 bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-lg">
        <div className="relative pt-3">
          <div className="flex items-center justify-between px-6 py-3 md:px-8 md:py-4 md:gap-6 md:justify-around">
            {/* Left: Search */}
            {/* Left: Search */}
            {onSearchClick ? (
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 text-muted-foreground hover:text-card-foreground transition-colors md:flex-row md:gap-2"
                onClick={onSearchClick}
                aria-label="Search"
              >
                <Search className="w-5 h-5 md:w-5 md:h-5" />
                <span className="text-xs font-medium md:text-sm md:inline">Search</span>
              </Button>
            ) : (
              <Button asChild variant="ghost" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-card-foreground transition-colors md:flex-row md:gap-2">
                <Link href="/" aria-label="Search">
                  <Search className="w-5 h-5 md:w-5 md:h-5" />
                  <span className="text-xs font-medium md:text-sm md:inline">Search</span>
                </Link>
              </Button>
            )}

            {/* Center: on larger screens show Home inline */}
            <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
              <Button asChild variant="ghost" className={cn(
                "flex items-center gap-2 text-muted-foreground hover:text-card-foreground transition-colors",
                isHome ? "text-primary" : "",
              )}>
                <Link href="/" aria-current={isHome ? "page" : undefined}>
                  <Home className="w-5 h-5" />
                  <span className="text-sm font-medium">Home</span>
                </Link>
              </Button>
            </div>

            {/* Right: Profile */}
            <Button asChild variant="ghost" className={cn(
              "flex flex-col items-center gap-1 text-muted-foreground hover:text-card-foreground transition-colors md:flex-row md:gap-2",
              isProfile ? "text-primary" : "",
            )}>
              <Link href="/profile" aria-current={isProfile ? "page" : undefined}>
                <User className="w-5 h-5" />
                <span className="text-xs font-medium md:text-sm md:inline">Profile</span>
              </Link>
            </Button>
          </div>

          {/* bottom indicator */}
          <div className="flex justify-center pb-3 md:pb-2">
            <div className="w-28 h-1 bg-border rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  )
}
