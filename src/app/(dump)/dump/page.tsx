import { Container } from '@/components'
import { ICrypto } from '@/types'
import React from 'react'
import DumpClientPage from '@/app/(dump)/dump/dump-client-page'

const fetchDumpCryptoData = async (): Promise<ICrypto[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pumpdump`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'dump',
      limit: 50
    }),
    cache: 'no-store'
  })

  return await res.json()
}

export default async function DumpPage() {
  const dumpCryptoData = await fetchDumpCryptoData()

  return (
    <Container className={'pt-0'}>

      <DumpClientPage initialData={dumpCryptoData} />
    </Container>
  )
}
