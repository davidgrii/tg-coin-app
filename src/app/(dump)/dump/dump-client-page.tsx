'use client'

import { Categories, CryptoSkeleton } from '@/components'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useCryptoStore } from '@/store'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import { useQuery } from '@tanstack/react-query'
import { ICrypto } from '@/types'
import { DumpCryptoItem, DumpTableHeader } from '@/components/dump'
import React from 'react'

const fetchDumpCryptoData = async (): Promise<ICrypto[]> => {
  const res = await fetch(`https://priceme.store/api/pumpdump`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'dump',
      limit: 50
    })
  })

  return await res.json()
}

interface IProps {
  initialData: ICrypto[]
}

export default function DumpClientPage({ initialData }: IProps) {

  const { data: dumpCryptoData = initialData, isLoading, isFetching } = useQuery<ICrypto[], Error>({
    queryKey: ['dump-cryptos'],
    queryFn: fetchDumpCryptoData,
    initialData
  })

  const { favorites, addFavorite, removeFavorite } = useCryptoStore()
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  return (
    <>
      <Categories />

      <DumpTableHeader />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card className={'bg-background grid gap-8 border-0'}>
          {isFetching && isLoading ? (
            new Array(10).fill(null).map((_, index) => (
              <CryptoSkeleton className={'justify-start'} key={index} />
            ))
          ) : (
            dumpCryptoData.map((crypto, index) => (
              <DumpCryptoItem
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
    </>
  )
}
