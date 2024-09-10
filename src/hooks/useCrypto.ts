import { useEffect, useState } from 'react'
import { ICrypto } from '@/types'

export const useCrypto = () => {
  const [cryptoData, setCryptoData] = useState<ICrypto[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCryptoData = async () => {
      const res = await fetch('/api/crypto-data')
      const data = await res.json()

      setIsLoading(false)
      setCryptoData(data)
    }

    fetchCryptoData()
  }, [isLoading])

  return { cryptoData, isLoading}
}
