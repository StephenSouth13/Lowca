"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TrendingSectionProps {
  onLocationClick?: (location: any) => void
}

export function TrendingSection({ onLocationClick }: TrendingSectionProps) {
  const trendingItems = [
    {
      id: 1,
      name: "Phở Hòa Pasteur",
      type: "Vietnamese",
      image: "/vietnamese-pho-restaurant-interior.jpg",
      badge: "Trending",
      rating: 4.5,
      distance: "0.8km",
      priceRange: "50,000 - 80,000 VND",
    },
    {
      id: 2,
      name: "The Deck Saigon",
      type: "Fine Dining",
      image: "/upscale-restaurant-deck-riverside-saigon.jpg",
      badge: "Popular",
      rating: 4.8,
      distance: "1.2km",
      priceRange: "100,000 - 150,000 VND",
    },
    {
      id: 3,
      name: "Cộng Cà Phê",
      type: "Coffee",
      image: "/vietnamese-coffee-shop-vintage-decor.jpg",
      badge: "Hot",
      rating: 4.2,
      distance: "0.5km",
      priceRange: "30,000 - 50,000 VND",
    },
    {
      id: 4,
      name: "Quán Ăn Ngon",
      type: "Local Food",
      image: "/traditional-vietnamese-street-food-restaurant.jpg",
      badge: "Featured",
      rating: 4.0,
      distance: "2.0km",
      priceRange: "20,000 - 40,000 VND",
    },
  ]

  const handleItemClick = (item: any) => {
    if (onLocationClick) {
      onLocationClick(item)
    }
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">{"Trending & Paid Advertisements"}</h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {trendingItems.map((item) => (
          <Card
            key={item.id}
            className="flex-shrink-0 w-48 bg-card border-border overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleItemClick(item)}
          >
            <div className="relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-28 object-cover" />
              <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">{item.badge}</Badge>
            </div>
            <div className="p-3 h-28">
              <h3 className="font-medium text-card-foreground text-sm mb-1 line-clamp-1">{item.name}</h3>
              <p className="text-muted-foreground text-xs">{item.type}</p>
              <p className="text-muted-foreground text-xs">Rating: {item.rating}</p>
              <p className="text-muted-foreground text-xs">Distance: {item.distance}</p>
              <p className="text-muted-foreground text-xs">Price Range: {item.priceRange}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-4">
        {[0, 1, 2, 3].map((dot, index) => (
          <div key={dot} className={`w-2 h-2 rounded-full ${index === 0 ? "bg-primary" : "bg-border"}`} />
        ))}
      </div>
    </div>
  )
}
