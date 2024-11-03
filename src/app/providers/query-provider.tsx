'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function QueryProvider({ children }: { children: ReactNode }) {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * 60 * 1000
      }
    }
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </QueryClientProvider>
  )
}