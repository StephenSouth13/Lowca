"use client"

import { Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BottomNavigationProps {
  onSearchClick?: () => void
}

export function BottomNavigation({ onSearchClick }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 py-3 px-6 text-primary hover:bg-secondary"
          onClick={onSearchClick}
        >
          <Search className="w-5 h-5" />
          <span className="text-xs font-medium">{"Search"}</span>
        </Button>

        <Button
          variant="ghost"
          className="flex flex-col items-center gap-1 py-3 px-6 text-muted-foreground hover:bg-secondary hover:text-card-foreground"
        >
          <User className="w-5 h-5" />
          <span className="text-xs font-medium">{"Profile"}</span>
        </Button>
      </div>

      {/* Home indicator for iOS-style design */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-border rounded-full"></div>
      </div>
    </div>
  )
}
