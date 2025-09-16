"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, Plus, ChevronDown, Star } from "lucide-react"
import { AddToPicksSheet } from "@/components/add-to-picks-sheet"
import { toast } from "@/hooks/use-toast"

interface LocationDetailProps {
  location: {
    id: number
    name: string
    type: string
    distance?: string
    rating?: number
    priceRange?: string
    address?: string
    tags?: string[]
    foodImage?: string
    locationImage?: string
  }
  onBack: () => void
  currentPicks: any[]
  onAddToPick: (pickId: string, location: any) => void
  onCreateNewPick: (name: string, deleteTime: string, location: any) => void
}

export function LocationDetail({ location, onBack, currentPicks, onAddToPick, onCreateNewPick }: LocationDetailProps) {
  const [showAddToPicks, setShowAddToPicks] = useState(false)
  const [showMenuReviews, setShowMenuReviews] = useState(false)

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/location/${location.id}`
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Link copied!",
      description: `Share link for ${location.name} copied to clipboard`,
    })
  }

  const handleAddToCurrentPicks = () => {
    setShowAddToPicks(true)
  }

  // Mock data for demonstration
  const mockLocation = {
    ...location,
    address: location.address || "123 Nguyen Hue Street, District 1, Ho Chi Minh City",
    rating: location.rating || 4.5,
    tags: location.tags || ["Vietnamese", "Authentic", "Popular", "Family-friendly"],
    foodImage: location.foodImage || "/banh-mi-sandwich-vietnamese-street-food.jpg",
    locationImage: location.locationImage || "/vietnamese-pho-restaurant-interior.jpg",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium text-card-foreground">{mockLocation.name}</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      <div className="pb-20">
        {/* Food Image */}
        <div className="px-4 py-4">
          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <img
              src={mockLocation.foodImage || "/placeholder.svg"}
              alt="Food"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-muted-foreground text-center">Featured dish</p>
          </div>
        </div>

        {/* Add to Current Picks Button */}
        <div className="px-4 mb-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <Button onClick={handleAddToCurrentPicks} className="w-full bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add to Current Picks
            </Button>
          </div>
        </div>

        {/* Location Details */}
        <div className="px-4 mb-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h2 className="font-semibold text-card-foreground mb-2">{mockLocation.name}</h2>
            <p className="text-sm text-muted-foreground mb-2">{mockLocation.address}</p>
            <p className="text-sm text-muted-foreground mb-2">{mockLocation.distance || "1.2km"} away</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{mockLocation.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{mockLocation.priceRange || "50,000 - 100,000 VND"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockLocation.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Menu and Reviews */}
        <div className="px-4 mb-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <Button
              variant="ghost"
              onClick={() => setShowMenuReviews(!showMenuReviews)}
              className="w-full justify-between p-0 h-auto"
            >
              <span className="text-sm text-muted-foreground">Menu and Reviews</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showMenuReviews ? "rotate-180" : ""}`} />
            </Button>
            {showMenuReviews && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Menu and reviews content would appear here...</p>
              </div>
            )}
          </div>
        </div>

        {/* Location Image */}
        <div className="px-4 mb-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <img
              src={mockLocation.locationImage || "/placeholder.svg"}
              alt="Location"
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <p className="text-sm text-muted-foreground text-center">Restaurant interior</p>
          </div>
        </div>

        {/* Share Button */}
        <div className="px-4">
          <Button variant="outline" onClick={handleShare} className="w-full bg-transparent">
            <Share2 className="h-4 w-4 mr-2" />
            Share Location
          </Button>
        </div>
      </div>

      <AddToPicksSheet
        isOpen={showAddToPicks}
        onOpenChange={setShowAddToPicks}
        location={mockLocation}
        currentPicks={currentPicks}
        onAddToPick={onAddToPick}
        onCreateNewPick={onCreateNewPick}
      />
    </div>
  )
}
