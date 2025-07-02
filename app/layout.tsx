import type { Metadata } from 'next'
import './globals.css'
import { Suspense } from 'react'
import Provider from './Provider'

export const metadata: Metadata = {
  title: 'Revionix',
  description: 'Revionix',
  generator: 'Kyaw Zin Htet',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Provider>{children}</Provider>
        </Suspense>
      </body>
    </html>
  )
}
