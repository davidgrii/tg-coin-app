'use client'

import MarketClient from '@/components/market/_ui/market-client'
import React from 'react'
import { useCryptoData } from '@/hooks'

// const isAuth = true

export default function MarketPage() {
const { data: cryptoData, isLoading } = useCryptoData()

  // if (isLoading) {
  //   return <div className={'flex justify-center items-center'}>Loading...</div>
  // }
  //
  // if (isFetching) {
  //   return <div>isFetching</div>
  // }

  if (!cryptoData) {
    return
  }

  return <MarketClient initialCryptoData={cryptoData} />
}
