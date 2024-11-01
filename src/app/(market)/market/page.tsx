'use client'

import MarketClient from '@/components/market/_ui/market-client'
import React from 'react'
import { useCryptoData } from '@/hooks'

export default function MarketPage() {
const { data: cryptoData = [], isLoading, isFetching } = useCryptoData()

  if (isLoading) {
    return <div className={'flex justify-center items-center'}>Loading...</div>
  }

  if (isFetching) {
    return <div>isFetching</div>
  }

  return <MarketClient initialCryptoData={cryptoData} />
}
