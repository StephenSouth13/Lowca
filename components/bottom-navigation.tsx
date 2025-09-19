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
    <nav role="navigation" aria-label="Bottom Navigation" className="fixed bottom-0 left-0 right-0 md:hidden z-50">
      <div className="mx-4 mb-4 bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-lg">
        <div className="relative pt-3">
          {/* Floating center button */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-6">
            <Button
              asChild
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl bg-gradient-to-br from-primary to-primary/90 text-white border border-transparent"
            >
              <Link href="/" aria-current={isHome ? "page" : undefined}>
                <Home className="w-6 h-6" />
                <span className="sr-only">Home</span>
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-between px-6 py-3">
            {/* Left: Search */}
            {onSearchClick ? (
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 text-muted-foreground hover:text-card-foreground transition-colors"
                onClick={onSearchClick}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
                <span className="text-xs font-medium">Search</span>
              </Button>
            ) : (
              <Button asChild variant="ghost" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-card-foreground transition-colors">
                <Link href="/" aria-label="Search">
                  <Search className="w-5 h-5" />
                  <span className="text-xs font-medium">Search</span>
                </Link>
              </Button>
            )}

            {/* spacer to align with center float */}
            <div className="w-6" />

            {/* Right: Profile */}
            <Button asChild variant="ghost" className={cn(
              "flex flex-col items-center gap-1 text-muted-foreground hover:text-card-foreground transition-colors",
              isProfile ? "text-primary" : "",
            )}>
              <Link href="/profile" aria-current={isProfile ? "page" : undefined}>
                <User className="w-5 h-5" />
                <span className="text-xs font-medium">Profile</span>
              </Link>
            </Button>
          </div>

          {/* bottom indicator */}
          <div className="flex justify-center pb-3">
            <div className="w-28 h-1 bg-border rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  )
}
