"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface FilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApplyFilters: (filters: FilterState) => void
}

export interface FilterState {
  locationTypes: string[]
  cuisineTypes: string[]
  tags: string[]
  priceRange: number[]
  distance: number[]
  hasParking: boolean
  openingHours: number[]
}

const LOCATION_TYPES = ["Diner", "Cafe", "Takeout", "Restaurant", "Food Court", "Street Food"]
const CUISINE_TYPES = [
  "Vietnamese",
  "Korean",
  "Japanese",
  "Chinese",
  "Thai",
  "Western",
  "Coffee",
  "Tea",
  "Milk Tea",
  "Dessert",
]
const TAGS = [
  "Vegetarian options",
  "Hygiene-certified",
  "Michelin star",
  "Air-conditioned",
  "WiFi",
  "Pet-friendly",
  "Delivery available",
]

export function FilterSheet({ open, onOpenChange, onApplyFilters }: FilterSheetProps) {
  const [filters, setFilters] = useState<FilterState>({
    locationTypes: [],
    cuisineTypes: [],
    tags: [],
    priceRange: [500000], // Max 500k VND
    distance: [5], // Max 5km
    hasParking: false,
    openingHours: [18], // Open until 6 PM
  })

  const toggleSelection = (
    category: keyof Pick<FilterState, "locationTypes" | "cuisineTypes" | "tags">,
    item: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(item) ? prev[category].filter((i) => i !== item) : [...prev[category], item],
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onOpenChange(false)
  }

  const clearFilters = () => {
    setFilters({
      locationTypes: [],
      cuisineTypes: [],
      tags: [],
      priceRange: [500000],
      distance: [5],
      hasParking: false,
      openingHours: [18],
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] bg-card border-border md:h-auto md:max-h-[80vh] md:w-3/4 md:mx-auto md:rounded-lg md:top-1/2 md:-translate-y-1/2 md:transform">
        <SheetHeader className="pb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-card-foreground">Filters</SheetTitle>
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <X className="w-5 h-5 text-card-foreground" />
            </Button>
          </div>
        </SheetHeader>

        <div className="space-y-8 overflow-y-auto h-full pb-32 md:pb-6 px-4 md:px-6">
          {/* Location Types */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">Location Type</h3>
            <div className="flex flex-wrap gap-2">
              {LOCATION_TYPES.map((type) => (
                <Badge
                  key={type}
                  variant={filters.locationTypes.includes(type) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    filters.locationTypes.includes(type)
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground border-border hover:bg-secondary"
                  }`}
                  onClick={() => toggleSelection("locationTypes", type)}
                >
                  {filters.locationTypes.includes(type) && <Check className="w-3 h-3 mr-1" />}
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          {/* Cuisine Types */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">Cuisine Type</h3>
            <div className="flex flex-wrap gap-2">
              {CUISINE_TYPES.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant={filters.cuisineTypes.includes(cuisine) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    filters.cuisineTypes.includes(cuisine)
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground border-border hover:bg-secondary"
                  }`}
                  onClick={() => toggleSelection("cuisineTypes", cuisine)}
                >
                  {filters.cuisineTypes.includes(cuisine) && <Check className="w-3 h-3 mr-1" />}
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">Special Features</h3>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <Badge
                  key={tag}
                  variant={filters.tags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    filters.tags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground border-border hover:bg-secondary"
                  }`}
                  onClick={() => toggleSelection("tags", tag)}
                >
                  {filters.tags.includes(tag) && <Check className="w-3 h-3 mr-1" />}
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">
              Max Price: {filters.priceRange[0].toLocaleString("vi-VN")} VND
            </h3>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
              max={1000000}
              min={50000}
              step={50000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>50k VND</span>
              <span>1M VND</span>
            </div>
          </div>

          {/* Distance */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">Max Distance: {filters.distance[0]} km</h3>
            <Slider
              value={filters.distance}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, distance: value }))}
              max={20}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>1 km</span>
              <span>20 km</span>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="parking"
                checked={filters.hasParking}
                onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, hasParking: !!checked }))}
              />
              <label htmlFor="parking" className="text-card-foreground cursor-pointer">
                Has parking available
              </label>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-semibold text-card-foreground mb-3">Open until: {filters.openingHours[0]}:00</h3>
            <Slider
              value={filters.openingHours}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, openingHours: value }))}
              max={24}
              min={6}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>6:00</span>
              <span>24:00</span>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border md:relative md:mt-4 md:border-t-0 md:bg-transparent md:p-0">
          <div className="flex gap-3 flex-col md:flex-row md:items-center">
            <div className="flex w-full gap-3">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex-1 bg-transparent text-card-foreground border-border hover:bg-secondary"
              >
                Clear All
              </Button>
              <Button onClick={handleApply} className="flex-1 bg-primary text-primary-foreground">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
