"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CurrentPick {
  id: string
  name: string
  deleteTime: string
  createdAt: Date
}

interface AddToPicksSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  location: any
  currentPicks: CurrentPick[]
  onAddToPick: (pickId: string, location: any) => void
  onCreateNewPick: (name: string, deleteTime: string, location: any) => void
}

export function AddToPicksSheet({
  isOpen,
  onOpenChange,
  location,
  currentPicks,
  onAddToPick,
  onCreateNewPick,
}: AddToPicksSheetProps) {
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [newPickName, setNewPickName] = useState("")
  const [newPickDeleteTime, setNewPickDeleteTime] = useState("4h")

  const handleAddToExisting = (pickId: string) => {
    onAddToPick(pickId, location)
    onOpenChange(false)
  }

  const handleCreateNew = () => {
    if (newPickName.trim()) {
      onCreateNewPick(newPickName.trim(), newPickDeleteTime, location)
      setNewPickName("")
      setNewPickDeleteTime("4h")
      setIsCreatingNew(false)
      onOpenChange(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[500px]">
        <SheetHeader>
          <SheetTitle>Add to Current Picks</SheetTitle>
          <SheetDescription>Choose an existing list or create a new one for {location?.name}</SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {!isCreatingNew ? (
            <>
              {/* Existing Picks */}
              {currentPicks.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium text-sm text-card-foreground">Add to existing list:</h3>
                  {currentPicks.map((pick) => (
                    <Button
                      key={pick.id}
                      variant="outline"
                      className="w-full justify-start h-auto p-4 bg-transparent border-border hover:bg-secondary"
                      onClick={() => handleAddToExisting(pick.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium text-card-foreground">{pick.name}</div>
                        <div className="text-sm text-muted-foreground">Deletes in {pick.deleteTime}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}

              {/* Create New Button */}
              <div className="pt-4 border-t border-border">
                <Button variant="default" className="w-full" onClick={() => setIsCreatingNew(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New List
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Create New Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-pick-name">List Name</Label>
                  <Input className="text-popover-foreground"
                    id="new-pick-name"
                    value={newPickName}
                    onChange={(e) => setNewPickName(e.target.value)}
                    placeholder="Enter list name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-delete-time">Auto-delete Timer</Label>
                  <Select value={newPickDeleteTime} onValueChange={setNewPickDeleteTime}>
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
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent border-border text-card-foreground hover:bg-secondary"
                    onClick={() => setIsCreatingNew(false)}
                  >
                    Back
                  </Button>
                  <Button className="flex-1" onClick={handleCreateNew} disabled={!newPickName.trim()}>
                    Create & Add
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
