"use client"

import { useState } from "react"
import { ArrowLeft, MoreHorizontal, Share2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BottomNavigation } from "./bottom-navigation"
import { CurrentPicksDetail } from "./current-picks-detail" // Added import for detail component

interface CurrentPick {
  id: string
  name: string
  deleteTime: string
  createdAt: Date
}

interface CurrentPicksPageProps {
  onBack: () => void
  onSearchClick: () => void
}

export function CurrentPicksPage({ onBack, onSearchClick }: CurrentPicksPageProps) {
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

  const [editingPick, setEditingPick] = useState<CurrentPick | null>(null)
  const [editName, setEditName] = useState("")
  const [editDeleteTime, setEditDeleteTime] = useState("")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [viewingList, setViewingList] = useState<CurrentPick | null>(null)

  const handleShare = (pick: CurrentPick) => {
    const shareUrl = `${window.location.origin}/picks/${pick.id}`
    navigator.clipboard.writeText(shareUrl)
    // In a real app, you might show a toast notification here
    alert(`Share link copied to clipboard: ${shareUrl}`)
  }

  const handleEditSettings = (pick: CurrentPick) => {
    setEditingPick(pick)
    setEditName(pick.name)
    setEditDeleteTime(pick.deleteTime)
    setIsSettingsOpen(true)
  }

  const handleSaveSettings = () => {
    if (editingPick) {
      setCurrentPicks((picks) =>
        picks.map((pick) =>
          pick.id === editingPick.id ? { ...pick, name: editName, deleteTime: editDeleteTime } : pick,
        ),
      )
    }
    setIsSettingsOpen(false)
    setEditingPick(null)
  }

  const handleDeletePick = (pickId: string) => {
    setCurrentPicks((picks) => picks.filter((pick) => pick.id !== pickId))
    setIsSettingsOpen(false)
    setEditingPick(null)
  }

  const handleViewList = (pick: CurrentPick) => {
    setViewingList(pick)
  }

  const handleBackFromDetail = () => {
    setViewingList(null)
  }

  if (viewingList) {
    return (
      <CurrentPicksDetail listName={viewingList.name} onBack={handleBackFromDetail} onSearchClick={onSearchClick} />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 pt-12 pb-6 bg-card border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-card-foreground" />
            </Button>
            <h1 className="text-lg font-semibold text-card-foreground">Current picks</h1>
          </div>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="w-5 h-5 text-card-foreground" />
          </Button>
        </div>
      </div>

      {/* Current Picks List */}
      <div className="px-4 py-6 pb-24">
        {currentPicks.length > 0 ? (
          <div className="space-y-3">
            {currentPicks.map((pick) => (
              <div
                key={pick.id}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border cursor-pointer hover:bg-secondary/70 transition-colors"
                onClick={() => handleViewList(pick)}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-card-foreground">{pick.name}</h3>
                  <p className="text-sm text-muted-foreground">Deletes in {pick.deleteTime}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare(pick)
                    }}
                  >
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEditSettings(pick)
                    }}
                  >
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No current picks yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start searching to create your first pick list</p>
          </div>
        )}
      </div>

      {/* Settings Sheet */}
      <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <SheetContent side="bottom" className="h-64">
          

          {editingPick && (
            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                
                <Input className="text-black"
                  id="pick-name"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Enter list name"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-card-foreground px-3" htmlFor="delete-time">Auto-delete Timer</Label>
                <Select value={editDeleteTime} onValueChange={setEditDeleteTime}>
                  <SelectTrigger className="text-card-foreground">
                    <SelectValue placeholder="Select delete time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="4h">4 hours</SelectItem>
                    <SelectItem value="8h">8 hours</SelectItem>
                    <SelectItem value="24h">24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="destructive" className="flex-1" onClick={() => handleDeletePick(editingPick.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete List
                </Button>
                <Button className="flex-1" onClick={handleSaveSettings}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Fixed Bottom Navigation */}
      <BottomNavigation onSearchClick={onSearchClick} />
    </div>
  )
}
