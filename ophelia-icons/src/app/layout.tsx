import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ophelia Icons - Modern Icon Library',
  description: 'A beautiful collection of modern icons with advanced customization options',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
