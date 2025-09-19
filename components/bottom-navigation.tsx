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
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {onSearchClick ? (
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 py-3 px-6 text-primary hover:bg-secondary"
            onClick={onSearchClick}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs font-medium">Search</span>
          </Button>
        ) : (
          <Button asChild variant="ghost" className="flex flex-col items-center gap-1 py-3 px-6 text-primary hover:bg-secondary">
            <Link href="/">
              <Search className="w-5 h-5" />
              <span className="text-xs font-medium">Search</span>
            </Link>
          </Button>
        )}

        <Button asChild variant="ghost" className={cn(
          "flex flex-col items-center gap-1 py-3 px-6 hover:bg-secondary",
          isHome ? "text-primary" : "text-muted-foreground hover:text-card-foreground",
        )}>
          <Link href="/">
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </Link>
        </Button>

        <Button asChild variant="ghost" className={cn(
          "flex flex-col items-center gap-1 py-3 px-6 hover:bg-secondary",
          isProfile ? "text-primary" : "text-muted-foreground hover:text-card-foreground",
        )}>
          <Link href="/profile">
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </Button>
      </div>

      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-border rounded-full"></div>
      </div>
    </div>
  )
}
