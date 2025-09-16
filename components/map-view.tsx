"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Star, Share2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Location {
  id: number
  name: string
  type: string
  distance: string
  rating: number
  priceRange: string
  lat: number
  lng: number
}

interface MapViewProps {
  onBack: () => void
  onLocationClick: (location: Location) => void
  onShareLocation: (location: Location) => void
  onAddToCurrentPicks: (location: Location) => void
}

export function MapView({ onBack, onLocationClick, onShareLocation, onAddToCurrentPicks }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  // Mock F&B locations near user
  const nearbyLocations: Location[] = [
    {
      id: 1,
      name: "Phở Hòa Pasteur",
      type: "Vietnamese",
      distance: "0.5km",
      rating: 4.5,
      priceRange: "50,000 - 80,000 VND",
      lat: 10.7769,
      lng: 106.7009,
    },
    {
      id: 2,
      name: "The Coffee House",
      type: "Coffee",
      distance: "1.2km",
      rating: 4.2,
      priceRange: "30,000 - 60,000 VND",
      lat: 10.7751,
      lng: 106.7018,
    },
    {
      id: 3,
      name: "Saigon Skydeck",
      type: "Fine Dining",
      distance: "2.1km",
      rating: 4.8,
      priceRange: "200,000 - 500,000 VND",
      lat: 10.7722,
      lng: 106.7025,
    },
    {
      id: 4,
      name: "Bún Chả Hương Liên",
      type: "Vietnamese",
      distance: "0.8km",
      rating: 4.7,
      priceRange: "40,000 - 70,000 VND",
      lat: 10.7785,
      lng: 106.6995,
    },
    {
      id: 5,
      name: "Rooftop Bar EON",
      type: "Bar",
      distance: "1.5km",
      rating: 4.6,
      priceRange: "150,000 - 300,000 VND",
      lat: 10.7742,
      lng: 106.7035,
    },
  ]

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.log("Location access denied, using default location")
          // Default to Ho Chi Minh City center
          setUserLocation({ lat: 10.7769, lng: 106.7009 })
        },
      )
    } else {
      // Default location if geolocation is not supported
      setUserLocation({ lat: 10.7769, lng: 106.7009 })
    }
  }, [])

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
  }

  const handleLocationClick = (location: Location) => {
    onLocationClick(location)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 bg-card border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-10 w-10 p-0 hover:bg-secondary">
          <ArrowLeft className="h-5 w-5 text-black" />
        </Button>
        <h1 className="text-lg font-semibold text-card-foreground">Nearby F&B Spots</h1>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-muted">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-2" />
            <p className="text-sm">Interactive Map View</p>
            <p className="text-xs">Showing {nearbyLocations.length} nearby locations</p>
          </div>
        </div>

        {/* Location Pins */}
        {nearbyLocations.map((location, index) => (
          <button
            key={location.id}
            className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transition-all ${
              selectedLocation?.id === location.id
                ? "bg-primary scale-110 z-10"
                : "bg-red-500 hover:bg-red-600 hover:scale-105"
            }`}
            style={{
              left: `${20 + index * 15}%`,
              top: `${30 + (index % 3) * 20}%`,
            }}
            onClick={() => handleLocationSelect(location)}
          >
            {index + 1}
          </button>
        ))}

        {/* User Location Pin */}
        {userLocation && (
          <div
            className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          />
        )}
      </div>

      {/* Location Details */}
      {selectedLocation && (
        <div className="p-4 bg-card border-b border-border">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-card-foreground mb-1">{selectedLocation.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {selectedLocation.type} • {selectedLocation.distance}
              </p>
              <div className="flex items-center gap-2 text-sm mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-card-foreground">{selectedLocation.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{selectedLocation.priceRange}</span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleLocationClick(selectedLocation)}
                  className="bg-primary hover:bg-primary/90"
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onShareLocation(selectedLocation)}
                  className="h-8 w-8 p-0"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddToCurrentPicks(selectedLocation)}
                  className="h-8 px-3"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location List */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">All Nearby Locations</h2>
        <div className="space-y-3">
          {nearbyLocations.map((location) => (
            <div
              key={location.id}
              className={`p-4 bg-card border rounded-lg cursor-pointer transition-colors ${
                selectedLocation?.id === location.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
              }`}
              onClick={() => handleLocationSelect(location)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-card-foreground">{location.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {location.type} • {location.distance}
                  </p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-primary">★ {location.rating}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{location.priceRange}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      onShareLocation(location)
                    }}
                    className="h-8 w-8 p-0 text-black"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddToCurrentPicks(location)
                    }}
                    className="h-8 px-3 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
