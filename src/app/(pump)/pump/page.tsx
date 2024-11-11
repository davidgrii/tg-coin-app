import { Container } from '@/components'
import { ICrypto } from '@/types'
import React from 'react'
import PumpClientPage from '@/app/(pump)/pump/pump-client-page'

const fetchPumpCryptoData = async (): Promise<ICrypto[]> => {
  const res = await fetch(`https://priceme.store/api/pumpdump`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'pump',
      limit: 50
    }),
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function PumpPage() {
  const pumpCryptoData = await fetchPumpCryptoData()

  return (
    <Container className={'pt-0'}>

      <PumpClientPage initialData={pumpCryptoData} />
    </Container>
  )
}
