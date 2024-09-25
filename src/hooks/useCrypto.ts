import { useEffect, useState } from 'react'
import { ICrypto } from '@/types'

export const useCrypto = () => {
  const [cryptoData, setCryptoData] = useState<ICrypto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCryptoData = async () => {
    setIsLoading(true)

    try {
      const res = await fetch('/api/crypto-data', {
        headers: {
          'Cache-Control': 'no-store',
        }
      })

      if (!res.ok) {
        throw new Error('Failed to fetch crypto data')
      }

      const data = await res.json()
      setCryptoData(data)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCryptoData()

    const interval = setInterval(fetchCryptoData, 60000)

    return () => clearInterval(interval)
  }, [])

  return { cryptoData, isLoading, error }
}
