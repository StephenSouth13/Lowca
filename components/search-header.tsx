"use client"

import { useState, useImperativeHandle, forwardRef } from "react"
import { Search, SlidersHorizontal, Map, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FilterSheet, type FilterState } from "./filter-sheet"

interface SearchHeaderProps {
  onSearch?: (query: string, filters?: FilterState) => void
  onCurrentPicksClick?: () => void // Added callback for Current Picks button
  onMapClick?: () => void // Added callback for Map button
  isSearching?: boolean
  showMapView?: boolean
  onToggleMapView?: () => void
}

export interface SearchHeaderRef {
  clearAll: () => void
  clearFiltersOnly: () => void
  clearSearchQuery: () => void
  hasActiveFilters: () => boolean
}

export const SearchHeader = forwardRef<SearchHeaderRef, SearchHeaderProps>(
  (
    { onSearch, onCurrentPicksClick, onMapClick, isSearching: externalIsSearching, showMapView, onToggleMapView },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [activeFilters, setActiveFilters] = useState<FilterState | null>(null)
    const [internalIsSearching, setInternalIsSearching] = useState(false)

    const isSearching = externalIsSearching !== undefined ? externalIsSearching : internalIsSearching

    const handleSearch = (query: string) => {
      setSearchQuery(query)
      const searching = query.trim().length > 0
      setInternalIsSearching(searching)

      if (searching && onSearch) {
        onSearch(query, activeFilters || undefined)
      }
    }

    const handleFilterApply = (filters: FilterState) => {
      setActiveFilters(filters)
      setInternalIsSearching(true)

      if (onSearch) {
        onSearch(searchQuery, filters)
      }
    }

    const clearSearch = () => {
      setSearchQuery("")
      setInternalIsSearching(false)
      setActiveFilters(null)
    }

    const clearFiltersOnly = () => {
      setActiveFilters(null)
      // The parent component will handle showing recommended locations
    }

    const clearSearchQuery = () => {
      setSearchQuery("")
      // Keep in search mode but trigger search with empty query
      if (onSearch) {
        onSearch("", activeFilters || undefined)
      }
    }

    const checkHasActiveFilters = () => {
      return !!(
        activeFilters &&
        (activeFilters.locationTypes.length > 0 ||
          activeFilters.cuisineTypes.length > 0 ||
          activeFilters.tags.length > 0 ||
          activeFilters.priceRange[0] < 500000 ||
          activeFilters.distance[0] < 5 ||
          activeFilters.hasParking ||
          activeFilters.openingHours[0] < 18)
      )
    }

    useImperativeHandle(ref, () => ({
      clearAll: clearSearch,
      clearFiltersOnly: clearFiltersOnly,
      clearSearchQuery: clearSearchQuery,
      hasActiveFilters: checkHasActiveFilters,
    }))

    const hasActiveFilters = checkHasActiveFilters()

    return (
      <>
        <div className="px-4 pt-12 pb-6 bg-card">
          <div className="flex items-center gap-3 mb-4">
            {/* Search Bar with Filter */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search Lowca"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-12 h-12 bg-input border-border text-card-foreground placeholder:text-muted-foreground"
              />
              <Button
                size="sm"
                variant="ghost"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 h-8 w-8 ${
                  hasActiveFilters ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                {hasActiveFilters && <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />}
              </Button>
            </div>

            {!isSearching && (
              <>
                {/* Map Toggle */}
                <Button
                  size="sm"
                  variant="outline"
                  className="h-12 w-12 p-0 border-border bg-card hover:bg-secondary"
                  onClick={onMapClick}
                >
                  <Map className="w-5 h-5 text-card-foreground" />
                </Button>

                {/* Current Picks */}
                <Button
                  size="sm"
                  variant="outline"
                  className="h-12 w-12 p-0 border-border bg-card hover:bg-secondary"
                  onClick={onCurrentPicksClick}
                >
                  <List className="w-5 h-5 text-card-foreground" />
                </Button>
              </>
            )}

            {isSearching && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-12 w-12 p-0 border-border bg-card hover:bg-secondary"
                  onClick={onToggleMapView}
                >
                  {showMapView ? (
                    <List className="w-5 h-5 text-card-foreground" />
                  ) : (
                    <Map className="w-5 h-5 text-card-foreground" />
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="h-12 w-12 p-0 border-border bg-card hover:bg-secondary"
                  onClick={onCurrentPicksClick}
                >
                  <List className="w-5 h-5 text-card-foreground" />
                </Button>
              </>
            )}
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-2">
              {activeFilters.locationTypes.map((type) => (
                <div key={type} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {type}
                </div>
              ))}
              {activeFilters.cuisineTypes.map((cuisine) => (
                <div key={cuisine} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {cuisine}
                </div>
              ))}
              {activeFilters.tags.map((tag) => (
                <div key={tag} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  {tag}
                </div>
              ))}
              {activeFilters.priceRange[0] < 500000 && (
                <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Max {activeFilters.priceRange[0].toLocaleString("vi-VN")} VND
                </div>
              )}
              {activeFilters.distance[0] < 5 && (
                <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Within {activeFilters.distance[0]}km
                </div>
              )}
              {activeFilters.hasParking && (
                <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Has parking</div>
              )}
            </div>
          )}
        </div>

        <FilterSheet open={isFilterOpen} onOpenChange={setIsFilterOpen} onApplyFilters={handleFilterApply} />
      </>
    )
  },
)

SearchHeader.displayName = "SearchHeader"
