"use client"

import React from "react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNavigation />
    </>
  )
}
