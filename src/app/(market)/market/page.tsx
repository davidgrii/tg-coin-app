import MarketClient from '@/components/market/market-client'
import { ICrypto } from '@/types'

const fetchCryptoData = async (): Promise<ICrypto[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/cryptos`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных')
  }
  return res.json()
}

export default async function MarketPage() {
  let cryptoData: ICrypto[] = []
  try {
    cryptoData = await fetchCryptoData()
  } catch (error) {
    console.error('Ошибка при загрузке данных', error)
  }

  return <MarketClient initialCryptoData={cryptoData} />
}
