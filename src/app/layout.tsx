import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/components/ui/utils'
import QueryProvider from '@/app/providers/query-provider'

const inter = Inter({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout(
  {
    children
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  return (
    <html lang="en">
    <head>
      <script src="https://telegram.org/js/telegram-web-app.js" defer></script>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    </head>
    <body className={cn(`bg-background ${inter.className}`)}>
    <React.StrictMode>
      <QueryProvider>
        {children}
      </QueryProvider>
    </React.StrictMode>
    </body>
    </html>
  )
}