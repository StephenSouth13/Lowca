"use client"

import { useEffect } from "react"

// This stub safely wraps window.fetch to neutralize calls to FullStory's edge service
// without causing double-wrapping or infinite recursion. It prefers an existing
// saved original fetch if present (window.__ORIG_FETCH__) and marks the window
// so it won't wrap more than once.
export default function FullstoryStub() {
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      // avoid wrapping more than once
      if ((window as any).__FS_FETCH_WRAPPED__) return

      // prefer previously saved original fetch to avoid wrapping our own wrapper
      const savedOrig = (window as any).__ORIG_FETCH__ || window.fetch
      ;(window as any).__ORIG_FETCH__ = savedOrig
      ;(window as any).__FS_FETCH_WRAPPED__ = true

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const originalFetch = savedOrig

      // override fetch to short-circuit FullStory network calls and swallow errors
      // for other requests we delegate to originalFetch but catch network errors
      // to avoid third-party scripts breaking navigation/HMR.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.fetch = function (input: RequestInfo, init?: RequestInit) {
        try {
          const url = typeof input === "string" ? input : (input && (input as Request).url) || ""
          if (typeof url === "string" && url.includes("edge.fullstory.com")) {
            return Promise.resolve(new Response(null, { status: 204 }))
          }
        } catch (e) {
          return Promise.resolve(new Response(null, { status: 204 }))
        }

        try {
          // delegate to original fetch and swallow errors
          // @ts-ignore
          const r = originalFetch.call(this, input, init)
          if (r && typeof r.then === "function") {
            return r.catch(() => Promise.resolve(new Response(null, { status: 204 })))
          }
          return r
        } catch (err) {
          return Promise.resolve(new Response(null, { status: 204 }))
        }
      }

      return () => {
        try {
          // restore only if we set it (use saved original)
          if ((window as any).__ORIG_FETCH__) {
            // @ts-ignore
            window.fetch = (window as any).__ORIG_FETCH__
            delete (window as any).__ORIG_FETCH__
            delete (window as any).__FS_FETCH_WRAPPED__
          }
        } catch (e) {
          // ignore
        }
      }
    } catch (e) {
      // ignore
    }
  }, [])

  return null
}
