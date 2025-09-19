"use client"

import { useEffect } from "react"

export default function FullstoryStub() {
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const originalFetch = window.fetch
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.fetch = function (input: RequestInfo, init?: RequestInit) {
        try {
          const url = typeof input === "string" ? input : (input && (input as Request).url) || ""
          if (typeof url === "string" && url.includes("edge.fullstory.com")) {
            // Return a harmless empty response to prevent FullStory script from throwing
            return Promise.resolve(new Response(null, { status: 204 }))
          }
        } catch (e) {
          // ignore parsing errors
          return Promise.resolve(new Response(null, { status: 204 }))
        }

        try {
          // Call original fetch but swallow network errors so third-party scripts can't break HMR/Navigation
          // @ts-ignore
          const result = originalFetch.call(this, input, init)
          if (result && typeof result.then === 'function') {
            return result.catch(() => Promise.resolve(new Response(null, { status: 204 })))
          }
          return result
        } catch (err) {
          return Promise.resolve(new Response(null, { status: 204 }))
        }
      }

      return () => {
        // restore original fetch on cleanup
        // @ts-ignore
        if (window.fetch && window.fetch !== originalFetch) window.fetch = originalFetch
      }
    } catch (e) {
      // ignore
    }
  }, [])

  return null
}
