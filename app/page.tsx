"use client"

import { useState, useRef } from "react"
import { SearchHeader, type SearchHeaderRef } from "@/components/search-header"
import { TrendingSection } from "@/components/trending-section"
import { RecommendationSection } from "@/components/recommendation-section"
import { BottomNavigation } from "@/components/bottom-navigation"
import type { FilterState } from "@/components/filter-sheet"
import { CurrentPicksPage } from "@/components/current-picks-page"
import { AddToPicksSheet } from "@/components/add-to-picks-sheet"
import { SwipeableLocationDetail } from "@/components/swipeable-location-detail"
import { MapView } from "@/components/map-view"
import { Button } from "@/components/ui/button"
import { Share2, Plus } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CurrentPick {
  id: string
  name: string
  deleteTime: string
  createdAt: Date
}

export default function HomePage() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showCurrentPicks, setShowCurrentPicks] = useState(false)
  const [showAddToPicks, setShowAddToPicks] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [showLocationDetail, setShowLocationDetail] = useState(false)
  const [allLocations, setAllLocations] = useState<any[]>([])
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0)
  const [showMapView, setShowMapView] = useState(false)
  const [showSearchResultsMap, setShowSearchResultsMap] = useState(false)
  const searchHeaderRef = useRef<SearchHeaderRef>(null)

  const [currentPicks, setCurrentPicks] = useState<CurrentPick[]>([
    {
      id: "1",
      name: "Current picks #1",
      deleteTime: "4h",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Current picks #2",
      deleteTime: "8h",
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Current picks #3",
      deleteTime: "24h",
      createdAt: new Date(),
    },
  ])

  const trendingLocations = [
    {
      id: 4,
      name: "Bún Chả Hương Liên",
      type: "Vietnamese",
      distance: "0.8km",
      rating: 4.7,
      priceRange: "40,000 - 70,000 VND",
    },
    {
      id: 5,
      name: "Rooftop Bar EON",
      type: "Bar",
      distance: "1.5km",
      rating: 4.6,
      priceRange: "150,000 - 300,000 VND",
    },
    {
      id: 6,
      name: "Cộng Cà Phê",
      type: "Coffee",
      distance: "0.3km",
      rating: 4.3,
      priceRange: "25,000 - 50,000 VND",
    },
  ]

  const recommendedLocations = [
    {
      id: 7,
      name: "Quán Ăn Ngon",
      type: "Vietnamese",
      distance: "1.1km",
      rating: 4.4,
      priceRange: "60,000 - 120,000 VND",
    },
    {
      id: 8,
      name: "Bitexco SkyBar",
      type: "Fine Dining",
      distance: "2.3km",
      rating: 4.9,
      priceRange: "300,000 - 600,000 VND",
    },
  ]

  const handleSearch = (query: string, filters?: FilterState) => {
    console.log("[Đạt] Search triggered:", { query, filters })
    setIsSearching(query.trim().length > 0 || !!filters)

    if (query.trim().length > 0 || filters) {
      setSearchResults([
        {
          id: 1,
          name: "Phở Hòa Pasteur",
          type: "Vietnamese",
          distance: "0.5km",
          rating: 4.5,
          priceRange: "50,000 - 80,000 VND",
        },
        {
          id: 2,
          name: "The Coffee House",
          type: "Coffee",
          distance: "1.2km",
          rating: 4.2,
          priceRange: "30,000 - 60,000 VND",
        },
        {
          id: 3,
          name: "Saigon Skydeck",
          type: "Fine Dining",
          distance: "2.1km",
          rating: 4.8,
          priceRange: "200,000 - 500,000 VND",
        },
      ])
    } else {
      setSearchResults([])
    }
  }

  const handleClearFilters = () => {
    const hasActiveFilters = searchHeaderRef.current?.hasActiveFilters?.()

    if (hasActiveFilters) {
      searchHeaderRef.current?.clearFiltersOnly()
      setSearchResults(recommendedLocations)
    }
    // Do nothing when there are no active filters
  }

  const handleBackToLanding = () => {
    setIsSearching(false)
    setSearchResults([])
    setShowCurrentPicks(false)
    searchHeaderRef.current?.clearAll()
  }

  const handleCurrentPicksClick = () => {
    setShowCurrentPicks(true)
  }

  const handleBackFromCurrentPicks = () => {
    setShowCurrentPicks(false)
  }

  const handleShareLocation = (location: any) => {
    const shareUrl = `${window.location.origin}/location/${location.id}`
    navigator.clipboard.writeText(shareUrl)
    toast({
      title: "Link copied!",
      description: `Share link for ${location.name} copied to clipboard`,
    })
  }

  const handleAddToCurrentPicks = (location: any) => {
    setSelectedLocation(location)
    setShowAddToPicks(true)
  }

  const handleAddToPick = (pickId: string, location: any) => {
    toast({
      title: "Added to Current Picks!",
      description: `${location.name} has been added to your selected list`,
    })
  }

  const handleCreateNewPick = (name: string, deleteTime: string, location: any) => {
    const newPick: CurrentPick = {
      id: Date.now().toString(),
      name,
      deleteTime,
      createdAt: new Date(),
    }
    setCurrentPicks((prev) => [...prev, newPick])
    toast({
      title: "New list created!",
      description: `${location.name} has been added to "${name}"`,
    })
  }

  const handleLocationClick = (location: any, sourceArray?: any[]) => {
    let locationsToShow: any[] = []
    let clickedIndex = 0

    if (sourceArray) {
      // If source array is provided, use it
      locationsToShow = sourceArray
      clickedIndex = sourceArray.findIndex((loc) => loc.id === location.id)
    } else if (isSearching) {
      // If searching, use search results
      locationsToShow = searchResults
      clickedIndex = searchResults.findIndex((loc) => loc.id === location.id)
    } else {
      // If on landing page, combine trending and recommended
      locationsToShow = [...trendingLocations, ...recommendedLocations]
      clickedIndex = locationsToShow.findIndex((loc) => loc.id === location.id)
    }

    setAllLocations(locationsToShow)
    setSelectedLocationIndex(Math.max(0, clickedIndex))
    setShowLocationDetail(true)
  }

  const handleBackFromLocationDetail = () => {
    setShowLocationDetail(false)
    setAllLocations([])
    setSelectedLocationIndex(0)
  }

  const handleMapClick = () => {
    setShowMapView(true)
  }

  const handleBackFromMap = () => {
    setShowMapView(false)
  }

  const handleToggleSearchResultsMap = () => {
    setShowSearchResultsMap(!showSearchResultsMap)
  }

  if (showLocationDetail && allLocations.length > 0) {
    return (
      <SwipeableLocationDetail
        locations={allLocations}
        initialIndex={selectedLocationIndex}
        onBack={handleBackFromLocationDetail}
        currentPicks={currentPicks}
        onAddToPick={handleAddToPick}
        onCreateNewPick={handleCreateNewPick}
      />
    )
  }

  if (showMapView) {
    return (
      <MapView
        onBack={handleBackFromMap}
        onLocationClick={handleLocationClick}
        onShareLocation={handleShareLocation}
        onAddToCurrentPicks={handleAddToCurrentPicks}
      />
    )
  }

  if (showCurrentPicks) {
    return <CurrentPicksPage onBack={handleBackFromCurrentPicks} onSearchClick={handleBackToLanding} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="pb-20 max-w-screen-xl mx-auto">
        <SearchHeader
          ref={searchHeaderRef}
          onSearch={handleSearch}
          onCurrentPicksClick={handleCurrentPicksClick}
          onMapClick={handleMapClick}
          isSearching={isSearching}
          showMapView={showSearchResultsMap}
          onToggleMapView={handleToggleSearchResultsMap}
        />

        {isSearching ? (
          <div className="px-4 py-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-card-foreground">
                {showSearchResultsMap ? "Search Results - Map View" : "Search Results"}
              </h2>
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearFilters}
                className="h-8 px-3 border-border bg-card hover:bg-secondary text-black"
              >
                Clear Filter
              </Button>
            </div>
            {searchResults.length > 0 ? (
              showSearchResultsMap ? (
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4 mb-4 text-center text-sm text-muted-foreground">
                    📍 Map View - {searchResults.length} locations found
                  </div>
                  <div className="grid gap-3">
                    {searchResults.map((result, index) => (
                      <div
                        key={result.id}
                        className="relative bg-card border border-border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleLocationClick(result, searchResults)}
                      >
                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-card-foreground">{result.name}</h3>
                            <p className="text-sm text-muted-foreground mb-1">
                              📍 {result.distance} • {result.type}
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-primary">★ {result.rating}</span>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-muted-foreground">{result.priceRange}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleShareLocation(result)
                              }}
                              className="h-8 w-8 p-0 border-border hover:bg-secondary"
                            >
                              <Share2 className="h-4 w-4 text-card-foreground" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleAddToCurrentPicks(result)
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
              ) : (
                <div className="space-y-3">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-4 bg-card border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleLocationClick(result, searchResults)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-card-foreground">{result.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {result.type} • {result.distance}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-primary">★ {result.rating}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">{result.priceRange}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleShareLocation(result)
                            }}
                            className="h-8 w-8 p-0 border-border hover:bg-secondary"
                          >
                            <Share2 className="h-4 w-4 text-card-foreground" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAddToCurrentPicks(result)
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
              )
            ) : (
              <p className="text-muted-foreground">No results found. Try adjusting your filters.</p>
            )}
          </div>
        ) : (
          <>
            <TrendingSection onLocationClick={(location) => handleLocationClick(location, trendingLocations)} />
            <RecommendationSection
              onLocationClick={(location) => handleLocationClick(location, recommendedLocations)}
            />
          </>
        )}
      </div>

      <AddToPicksSheet
        isOpen={showAddToPicks}
        onOpenChange={setShowAddToPicks}
        location={selectedLocation}
        currentPicks={currentPicks}
        onAddToPick={handleAddToPick}
        onCreateNewPick={handleCreateNewPick}
      />

      {/* Fixed Bottom Navigation */}
      <BottomNavigation onSearchClick={handleBackToLanding} />
    </div>
  )
}
