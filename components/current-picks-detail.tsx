"use client"

import { useState } from "react"
import { ArrowLeft, Share2, ChevronUp, ChevronDown, Map, TrendingUp, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BottomNavigation } from "./bottom-navigation"

interface Location {
  id: string
  name: string
  type: string
  rating: number
  distance: string
  image: string
  upvotes: number
  downvotes: number
  userVote: "up" | "down" | null
}

interface CurrentPicksDetailProps {
  listName: string
  onBack: () => void
  onSearchClick: () => void
}

export function CurrentPicksDetail({ listName, onBack, onSearchClick }: CurrentPicksDetailProps) {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      name: "Pho Thin Bo Ho",
      type: "Vietnamese Restaurant",
      rating: 4.5,
      distance: "0.8 km",
      image: "/vietnamese-pho-restaurant-interior.jpg",
      upvotes: 12,
      downvotes: 2,
      userVote: null,
    },
    {
      id: "2",
      name: "The Deck Saigon",
      type: "Fine Dining",
      rating: 4.8,
      distance: "1.2 km",
      image: "/upscale-restaurant-deck-riverside-saigon.jpg",
      upvotes: 8,
      downvotes: 1,
      userVote: "up",
    },
    {
      id: "3",
      name: "Cong Caphe",
      type: "Coffee Shop",
      rating: 4.3,
      distance: "0.5 km",
      image: "/vietnamese-coffee-shop-vintage-decor.jpg",
      upvotes: 15,
      downvotes: 3,
      userVote: null,
    },
  ])

  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [sortedLocations, setSortedLocations] = useState<Location[]>(locations)

  const handleVote = (locationId: string, voteType: "up" | "down") => {
    const updatedLocations = locations.map((location) => {
      if (location.id === locationId) {
        let newUpvotes = location.upvotes
        let newDownvotes = location.downvotes
        let newUserVote: "up" | "down" | null = voteType

        // Remove previous vote if exists
        if (location.userVote === "up") {
          newUpvotes -= 1
        } else if (location.userVote === "down") {
          newDownvotes -= 1
        }

        // Add new vote or remove if clicking same vote
        if (location.userVote === voteType) {
          // Clicking same vote removes it
          newUserVote = null
        } else {
          // Add new vote
          if (voteType === "up") {
            newUpvotes += 1
          } else {
            newDownvotes += 1
          }
        }

        return {
          ...location,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote,
        }
      }
      return location
    })

    setLocations(updatedLocations)
    setSortedLocations(updatedLocations)
  }

  const sortByVotes = () => {
    const sorted = [...locations].sort((a, b) => b.upvotes - b.downvotes - (a.upvotes - a.downvotes))
    setSortedLocations(sorted)
  }

  const randomizeOrder = () => {
    const shuffled = [...locations].sort(() => Math.random() - 0.5)
    setSortedLocations(shuffled)
  }

  const handleShare = (location: Location) => {
    const shareText = `Check out ${location.name} - ${location.type}`
    navigator.clipboard.writeText(shareText)
    console.log(`Shared: ${shareText}`)
  }

  const MapView = () => (
    <div className="px-4 py-6 pb-24">
      <div className="bg-card rounded-lg border border-border h-96 flex items-center justify-center">
        <div className="text-center">
          <Map className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Map view showing {locations.length} locations</p>
          <p className="text-sm text-muted-foreground mt-1">Interactive map would be displayed here</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 pt-12 pb-6 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-card-foreground" />
            </Button>
            <h1 className="text-lg font-semibold text-card-foreground">{listName}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={viewMode === "map" ? "default" : "ghost"}
            className={`h-8 px-3 ${viewMode === "map" ? "" : "text-card-foreground hover:bg-secondary"}`}
            onClick={() => setViewMode(viewMode === "map" ? "list" : "map")}
          >
            <Map className={`w-4 h-4 mr-1 ${viewMode === "map" ? "" : "text-card-foreground"}`} />
            Map
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-3 text-card-foreground hover:bg-secondary"
            onClick={sortByVotes}
          >
            <TrendingUp className="w-4 h-4 mr-1 text-card-foreground" />
            Sort by Votes
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-3 text-card-foreground hover:bg-secondary"
            onClick={randomizeOrder}
          >
            <Shuffle className="w-4 h-4 mr-1 text-card-foreground" />
            Random
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "map" ? (
        <MapView />
      ) : (
        <div className="px-4 py-6 pb-24">
          {sortedLocations.length > 0 ? (
            <div className="space-y-4">
              {sortedLocations.map((location, index) => (
                <div
                  key={location.id}
                  className={`bg-card rounded-lg border overflow-hidden ${
                    index === 0 ? "border-yellow-400 border-2 shadow-lg shadow-yellow-400/20" : "border-border"
                  }`}
                >
                  {index === 0 && (
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-medium px-3 py-1">
                      🏆 Top Pick
                    </div>
                  )}
                  <div className="aspect-video relative">
                    <img
                      src={location.image || "/placeholder.svg"}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-card-foreground mb-1">{location.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{location.type}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>★ {location.rating}</span>
                          <span>{location.distance}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-secondary"
                        onClick={() => handleShare(location)}
                      >
                        <Share2 className="w-4 h-4 text-card-foreground" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                      <Button
                        size="sm"
                        variant={location.userVote === "up" ? "default" : "ghost"}
                        className={`h-8 px-3 ${location.userVote === "up" ? "bg-green-600 hover:bg-green-700" : "text-card-foreground hover:bg-secondary"}`}
                        onClick={() => handleVote(location.id, "up")}
                      >
                        <ChevronUp
                          className={`w-4 h-4 mr-1 ${location.userVote === "up" ? "" : "text-card-foreground"}`}
                        />
                        {location.upvotes}
                      </Button>
                      <Button
                        size="sm"
                        variant={location.userVote === "down" ? "destructive" : "ghost"}
                        className={`h-8 px-3 ${location.userVote === "down" ? "" : "text-card-foreground hover:bg-secondary"}`}
                        onClick={() => handleVote(location.id, "down")}
                      >
                        <ChevronDown
                          className={`w-4 h-4 mr-1 ${location.userVote === "down" ? "" : "text-card-foreground"}`}
                        />
                        {location.downvotes}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No locations in this list yet</p>
              <p className="text-sm text-muted-foreground mt-1">Add some locations from your searches</p>
            </div>
          )}
        </div>
      )}

      {/* Fixed Bottom Navigation */}
      <BottomNavigation onSearchClick={onSearchClick} />
    </div>
  )
}
