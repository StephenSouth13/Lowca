"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"

interface RecommendationSectionProps {
  onLocationClick?: (location: any) => void
}

export function RecommendationSection({ onLocationClick }: RecommendationSectionProps) {
  const recommendations = [
    {
      id: 1,
      name: "Bánh Mì Hu���nh Hoa",
      type: "Street Food",
      rating: 4.8,
      distance: "0.5 km",
      time: "5 min",
      image: "/banh-mi-sandwich-vietnamese-street-food.jpg",
      tags: ["Quick Bite", "Local Favorite"],
      priceRange: "15,000 - 25,000 VND",
    },
    {
      id: 2,
      name: "Saigon Skydeck",
      type: "Bar & Lounge",
      rating: 4.6,
      distance: "1.2 km",
      time: "12 min",
      image: "/rooftop-bar-saigon-city-view-night.jpg",
      tags: ["Rooftop", "City View"],
      priceRange: "200,000 - 500,000 VND",
    },
    {
      id: 3,
      name: "Bún Chả Hương Liên",
      type: "Vietnamese",
      rating: 4.7,
      distance: "0.8 km",
      time: "8 min",
      image: "/bun-cha-vietnamese-grilled-pork-noodles.jpg",
      tags: ["Authentic", "Must Try"],
      priceRange: "40,000 - 60,000 VND",
    },
    {
      id: 4,
      name: "L'Usine Coffee",
      type: "Coffee & Bakery",
      rating: 4.5,
      distance: "0.3 km",
      time: "3 min",
      image: "/modern-coffee-shop-industrial-design-saigon.jpg",
      tags: ["WiFi", "Work Friendly"],
      priceRange: "50,000 - 80,000 VND",
    },
  ]

  const handleItemClick = (item: any) => {
    if (onLocationClick) {
      onLocationClick(item)
    }
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">{"Recommendations for You"}</h2>

      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
        {recommendations.map((item) => (
          <Card
            key={item.id}
            className="p-4 bg-card border-border cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleItemClick(item)}
          >
            <div className="flex gap-3">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-card-foreground text-sm mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-muted-foreground text-xs mb-2">{item.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span>{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{item.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-secondary text-secondary-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Added price range display */}
                <div className="mt-2 text-xs text-muted-foreground">Price Range: {item.priceRange}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
