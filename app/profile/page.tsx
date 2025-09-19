"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Phone, Star, User2, Wallet } from "lucide-react"
import Link from "next/link"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ProfilePage() {
  const user = {
    name: "South Stephen",
    email: "south.stephen@example.com",
    phone: "+84 912 345 678",
  }

  const upcomingBooking = {
    id: "bk_28973",
    place: {
      name: "Phở Hòa Pasteur",
      type: "Vietnamese",
      address: "260C Pasteur, Ward 8, District 3, HCMC",
      distance: "0.8 km",
      rating: 4.6,
    },
    date: "Fri, 22 Nov 2025",
    time: "19:30",
    partySize: 4,
    notes: "Window seat if available",
    priceRange: "50,000 - 80,000 VND",
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 py-6 md:py-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="p-2">
              <Link href="/">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  <span className="sr-only">Back to Home</span>
                </span>
              </Link>
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-card-foreground">Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your bookings and preferences</p>
            </div>
          </div>
        </div>

        {/* Top grid */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarImage src="/placeholder.svg" alt={user.name} />
                  <AvatarFallback>SS</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base md:text-lg">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="size-4 text-muted-foreground" />
                <span className="text-card-foreground">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User2 className="size-4 text-muted-foreground" />
                <span className="text-card-foreground">Member since 2024</span>
              </div>
              <Separator className="bg-border" />
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-xl font-semibold text-card-foreground">12</p>
                  <p className="text-xs text-muted-foreground">Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold text-card-foreground">8</p>
                  <p className="text-xs text-muted-foreground">Favorites</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold text-card-foreground">5</p>
                  <p className="text-xs text-muted-foreground">Reviews</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-3">
              <Button size="sm" className="flex-1">Edit Profile</Button>
              <Button size="sm" variant="outline" className="flex-1">Preferences</Button>
            </CardFooter>
          </Card>

          {/* Upcoming Booking */}
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base md:text-lg">Upcoming Booking</CardTitle>
                  <CardDescription>Mock booking preview</CardDescription>
                </div>
                <Badge className="bg-accent text-accent-foreground">Confirmed</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <img src="/placeholder.svg" alt={upcomingBooking.place.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-card-foreground">{upcomingBooking.place.name}</h3>
                      <p className="text-sm text-muted-foreground">{upcomingBooking.place.type}</p>
                      <div className="flex items-center gap-2 text-xs mt-1 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="size-3 fill-accent text-accent" />
                          <span>{upcomingBooking.place.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{upcomingBooking.place.distance}</span>
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 justify-end">
                        <Wallet className="size-3" />
                        <span>{upcomingBooking.priceRange}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="size-4" />
                      <span>{upcomingBooking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="size-4" />
                      <span>{upcomingBooking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User2 className="size-4" />
                      <span>{upcomingBooking.partySize} people</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="size-4" />
                      <span>{upcomingBooking.place.address}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">{upcomingBooking.notes}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-3">
              <Button className="flex-1">Modify</Button>
              <Button variant="outline" className="flex-1">Cancel</Button>
              <Button variant="outline" className="flex-1">Share</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Tabs for History / Favorites */}
        <Tabs defaultValue="history" className="mt-6 md:mt-8">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4 md:mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1,2,3,4,5,6].map((i) => (
                <Card key={i} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="py-4 flex items-center gap-3">
                    <img src="/placeholder.svg" alt="Visited place" className="w-14 h-14 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="font-medium text-card-foreground truncate">Visited Place #{i}</p>
                      <p className="text-xs text-muted-foreground truncate">Fine Dining • 2.1 km</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="favorites" className="mt-4 md:mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1,2,3].map((i) => (
                <Card key={i} className="hover:bg-muted/50 transition-colors">
                  <CardContent className="py-4 flex items-center gap-3">
                    <img src="/placeholder.svg" alt="Favorite place" className="w-14 h-14 rounded-lg object-cover" />
                    <div className="min-w-0">
                      <p className="font-medium text-card-foreground truncate">Favorite Place #{i}</p>
                      <p className="text-xs text-muted-foreground truncate">Coffee • 0.5 km</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
