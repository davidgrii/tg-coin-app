'use client'

import { CryptoSkeleton } from '@/components'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useCryptoStore } from '@/store'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import { useQuery } from '@tanstack/react-query'
import { ICrypto } from '@/types'
import { PumpCryptoItem } from '@/components/pump'
import React from 'react'

const fetchPumpCryptoData = async (): Promise<ICrypto[]> => {
  const res = await fetch(`https://priceme.store/api/pumpdump`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'pump',
      limit: 50
    })
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

interface IProps {
  initialData: ICrypto[]
}

export default function PumpClientPage({ initialData }: IProps) {
  const { data: pumpCryptoData = initialData, isLoading} = useQuery<ICrypto[], Error>({
    queryKey: ['pump-cryptos'],
    queryFn: fetchPumpCryptoData,
    staleTime: 30 * 60 * 1000,
    initialData
  })

  const { favorites, addFavorite, removeFavorite } = useCryptoStore()
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card className={'bg-background grid gap-8 border-0'}>
        {isLoading ? (
          new Array(10).fill(null).map((_, index) => (
            <CryptoSkeleton className={'justify-start'} key={index} />
          ))
        ) : (
          pumpCryptoData.map((crypto, index) => (
            <PumpCryptoItem
              userId={userId}
              key={crypto.id}
              crypto={crypto}
              index={index}
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          ))
        )}
      </Card>
    </motion.div>
  )
}
