'use client'

import MarketClient from '@/components/market/market-client'
import { ICrypto } from '@/types'
import React, { useEffect, useState } from 'react'

const fetchCryptoData = async (): Promise<ICrypto[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/cryptos`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных')
  }
  return res.json()
}

const MemoizedMarketClient = React.memo(MarketClient, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.initialCryptoData) === JSON.stringify(nextProps.initialCryptoData)
})

export default function MarketPage() {
  const [cryptoData, setCryptoData] = useState<ICrypto[]>([])

  useEffect(() => {
    const loadCryptoData = async () => {
      try {
        const data = await fetchCryptoData()
        setCryptoData(data)
      } catch (error) {
        console.error('Ошибка при загрузке данных', error)
      }
    }
    loadCryptoData()
  }, [])

  return <MemoizedMarketClient initialCryptoData={cryptoData} />
}
