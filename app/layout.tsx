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
        <script dangerouslySetInnerHTML={{__html: `(function(){try{var _f=window.fetch;window.fetch=function(input,init){try{var u=typeof input==='string'?input:(input&&input.url)||'';if(u&&u.indexOf('edge.fullstory.com')!==-1){return Promise.resolve(new Response(null,{status:204}));}}catch(e){}return _f.call(this,input,init);};}catch(e){}})();`}} />
        <FullstoryStub />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
