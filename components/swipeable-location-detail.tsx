"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, Plus, ChevronUp, Star } from "lucide-react"
import { AddToPicksSheet } from "@/components/add-to-picks-sheet"
import { toast } from "@/hooks/use-toast"

interface LocationDetailProps {
  locations: Array<{
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
  }>
  initialIndex: number
  onBack: () => void
  currentPicks: any[]
  onAddToPick: (pickId: string, location: any) => void
  onCreateNewPick: (name: string, deleteTime: string, location: any) => void
}

export function SwipeableLocationDetail({
  locations,
  initialIndex,
  onBack,
  currentPicks,
  onAddToPick,
  onCreateNewPick,
}: LocationDetailProps) {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(initialIndex)
  const [showAddToPicks, setShowAddToPicks] = useState(false)
  const [expandedSection, setExpandedSection] = useState<"menu" | "reviews" | null>(null)

  const currentLocation = locations[currentLocationIndex]

  const generateMockLocationData = (index: number) => {
    const baseData = locations[index]
    const mockVariations = [
      {
        address: "123 Nguyen Hue Street, District 1, Ho Chi Minh City",
        rating: 4.5,
        tags: ["Vietnamese", "Authentic", "Popular", "Family-friendly"],
        foodImage: "/banh-mi-sandwich-vietnamese-street-food.jpg",
        locationImage: "/vietnamese-pho-restaurant-interior.jpg",
        menu: [
          { name: "Pho Bo", price: "65,000 VND", description: "Traditional beef noodle soup" },
          { name: "Banh Mi", price: "25,000 VND", description: "Vietnamese sandwich with pork" },
          { name: "Com Tam", price: "45,000 VND", description: "Broken rice with grilled pork" },
        ],
        reviews: [
          {
            user: "Minh T.",
            rating: 5,
            comment: "Amazing pho! Authentic taste and great service.",
            date: "2 days ago",
          },
          { user: "Sarah L.", rating: 4, comment: "Good food but a bit crowded during lunch.", date: "1 week ago" },
        ],
      },
      {
        address: "456 Le Loi Boulevard, District 1, Ho Chi Minh City",
        rating: 4.2,
        tags: ["Coffee", "Modern", "Cozy", "Wi-Fi"],
        foodImage: "/vietnamese-coffee-shop-vintage-decor.jpg",
        locationImage: "/upscale-restaurant-deck-riverside-saigon.jpg",
        menu: [
          {
            name: "Vietnamese Coffee",
            price: "35,000 VND",
            description: "Traditional drip coffee with condensed milk",
          },
          { name: "Croissant", price: "45,000 VND", description: "Fresh baked pastry" },
          { name: "Smoothie Bowl", price: "85,000 VND", description: "Tropical fruit smoothie bowl" },
        ],
        reviews: [
          { user: "Anna K.", rating: 4, comment: "Great coffee and atmosphere for working.", date: "3 days ago" },
          { user: "Tom H.", rating: 5, comment: "Best coffee in the area!", date: "1 week ago" },
        ],
      },
      {
        address: "789 Dong Khoi Street, District 1, Ho Chi Minh City",
        rating: 4.7,
        tags: ["Fine Dining", "Rooftop", "City View", "Romantic"],
        foodImage: "/rooftop-bar-saigon-city-view-night.jpg",
        locationImage: "/traditional-vietnamese-street-food-restaurant.jpg",
        menu: [
          { name: "Grilled Beef", price: "250,000 VND", description: "Premium beef with herbs" },
          { name: "Seafood Platter", price: "350,000 VND", description: "Fresh seafood selection" },
          { name: "Wine Selection", price: "150,000 VND", description: "Local and imported wines" },
        ],
        reviews: [
          { user: "Lisa M.", rating: 5, comment: "Perfect for special occasions. Amazing view!", date: "1 day ago" },
          { user: "John D.", rating: 4, comment: "Excellent food but a bit pricey.", date: "4 days ago" },
        ],
      },
    ]

    const variation = mockVariations[index % mockVariations.length]
    return {
      ...baseData,
      ...variation,
    }
  }

  const mockLocationData = generateMockLocationData(currentLocationIndex)

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/location/${currentLocation.id}`
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Link copied!",
      description: `Share link for ${currentLocation.name} copied to clipboard`,
    })
  }

  const handleAddToCurrentPicks = () => {
    setShowAddToPicks(true)
  }

  const toggleSection = (section: "menu" | "reviews") => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const goToLastLocation = () => {
    if (currentLocationIndex > 0) {
      setCurrentLocationIndex((prev) => prev - 1)
      setExpandedSection(null) // Reset expanded section when changing location
    }
  }

  const goToNextLocation = () => {
    if (currentLocationIndex < locations.length - 1) {
      setCurrentLocationIndex((prev) => prev + 1)
      setExpandedSection(null) // Reset expanded section when changing location
    }
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border bg-background z-10">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2 text-black hover:text-black">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="w-9" />
      </div>

      {currentLocationIndex > 0 && (
        <div className="absolute top-16 left-0 right-0 z-20 px-4">
          <Button
            variant="outline"
            size="sm"
            onClick={goToLastLocation}
            className="w-full bg-background/80 backdrop-blur-sm text-black border-border hover:text-black"
          >
            Last Location
          </Button>
        </div>
      )}

      <div className="absolute inset-0 top-16 bottom-16 flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-background border border-border rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out">
          <div className="flex gap-4 mb-4">
            {/* Left side - Images */}
            <div className="flex-shrink-0 w-24">
              <img
                src={mockLocationData.foodImage || "/placeholder.svg"}
                alt="Food"
                className="w-24 h-16 object-cover rounded-lg mb-2"
              />
              <img
                src={mockLocationData.locationImage || "/placeholder.svg"}
                alt="Location"
                className="w-24 h-16 object-cover rounded-lg"
              />
            </div>

            {/* Right side - Info and buttons */}
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-card-foreground mb-1 text-sm">{mockLocationData.name}</h2>
              <p className="text-xs text-muted-foreground mb-1 truncate">{mockLocationData.address}</p>
              <p className="text-xs text-muted-foreground mb-2">{mockLocationData.distance || "1.2km"} away</p>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium text-black">{mockLocationData.rating}</span>
                </div>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-xs text-muted-foreground">{mockLocationData.priceRange || "50k-100k VND"}</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {mockLocationData.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddToCurrentPicks} size="sm" className="flex-1 h-7 text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  size="sm"
                  className="flex-1 h-7 text-xs bg-transparent text-black border-border hover:text-black"
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Menu/Reviews Section */}
          <div className="flex flex-col">
            <div className="flex gap-2 mb-3">
              <Button
                variant={expandedSection === "menu" ? "default" : "outline"}
                onClick={() => toggleSection("menu")}
                size="sm"
                className={`flex-1 h-8 text-xs ${expandedSection === "menu" ? "" : "text-black border-border hover:text-black"}`}
              >
                Menu
              </Button>
              <Button
                variant={expandedSection === "reviews" ? "default" : "outline"}
                onClick={() => toggleSection("reviews")}
                size="sm"
                className={`flex-1 h-8 text-xs ${expandedSection === "reviews" ? "" : "text-black border-border hover:text-black"}`}
              >
                Reviews
              </Button>
            </div>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSection ? "h-48" : "h-20"}`}
            >
              {expandedSection === "menu" && (
                <div className="bg-muted/30 rounded-lg p-3 h-full flex flex-col animate-in fade-in-0 duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm text-card-foreground">Menu Items</h3>
                    <Button variant="ghost" size="sm" onClick={() => setExpandedSection(null)} className="h-6 w-6 p-0">
                      <ChevronUp className="h-3 w-3 text-black" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-2">
                    {mockLocationData.menu.map((item, index) => (
                      <div key={index} className="border-b border-border pb-2 last:border-b-0">
                        <div className="flex justify-between items-start text-black">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs">{item.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                          </div>
                          <span className="text-xs font-medium ml-2 flex-shrink-0">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {expandedSection === "reviews" && (
                <div className="bg-muted/30 rounded-lg p-3 h-full flex flex-col animate-in fade-in-0 duration-200">
                  <div className="flex items-center justify-between mb-2 text-center">
                    <h3 className="font-medium text-sm text-card-foreground">Customer Reviews</h3>
                    <Button variant="ghost" size="sm" onClick={() => setExpandedSection(null)} className="h-6 w-6 p-0">
                      <ChevronUp className="text-black w-10 h-10 flex-row mx-[px] px-0 py-0 pr-0" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-2">
                    {mockLocationData.reviews.map((review, index) => (
                      <div key={index} className="border-b border-border pb-2 last:border-b-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-xs">{review.user}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-2 w-2 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-3">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!expandedSection && (
                <div className="bg-muted/30 rounded-lg h-full flex items-center justify-center animate-in fade-in-0 duration-200">
                  <p className="text-xs text-muted-foreground">Select Menu or Reviews to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {currentLocationIndex < locations.length - 1 && (
        <div className="absolute bottom-16 left-0 right-0 z-20 px-4">
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextLocation}
            className="w-full bg-background/80 backdrop-blur-sm text-black border-border hover:text-black"
          >
            Next Location
          </Button>
        </div>
      )}

      <AddToPicksSheet
        isOpen={showAddToPicks}
        onOpenChange={setShowAddToPicks}
        location={mockLocationData}
        currentPicks={currentPicks}
        onAddToPick={onAddToPick}
        onCreateNewPick={onCreateNewPick}
      />
    </div>
  )
}
