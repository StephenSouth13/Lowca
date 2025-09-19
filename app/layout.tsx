import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import FullstoryStub from '@/components/fullstory-stub'

export const metadata: Metadata = {
  title: 'Lowca',
  description: 'Created with Long dev & CEO Đạt',
  generator: 'Đạt 09',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <FullstoryStub />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
