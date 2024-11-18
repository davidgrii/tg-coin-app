import { ICrypto } from '@/types'
import { useQuery } from '@tanstack/react-query'

const fetchCryptoData = async (): Promise<ICrypto[]> => {
  console.log('Fetching crypto data...')
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cryptos`)

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных')
  }

  const data = await res.json()
  console.log('Data loaded:', data)
  return data
}

export const useCryptoData = () => {
  return useQuery<ICrypto[], Error>({
    queryKey: ['cryptos'],
    queryFn: fetchCryptoData,
    staleTime: 3 * 60 * 1000,
  })
}