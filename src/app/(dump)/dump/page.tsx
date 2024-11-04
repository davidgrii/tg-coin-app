import { Categories, Container } from '@/components'
import { ICrypto } from '@/types'
import React from 'react'
import DumpClientPage from '@/app/(dump)/dump/dump-client-page'

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

export default async function DumpPage() {

const dumpCryptoData = await fetchDumpCryptoData()

  return (
    <Container className={'pt-0'}>

      <Categories />

      {/*<DumpTableHeader />*/}
      <DumpClientPage initialData={dumpCryptoData}/>

    </Container>
  )
}
