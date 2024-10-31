import { ICrypto } from '@/types'
import { useQuery } from '@tanstack/react-query'

const fetchCryptoData = async (): Promise<ICrypto[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/cryptos`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных')
  }
  return res.json()
}

export const useCryptoData = () => {
  return useQuery<ICrypto[], Error>({
    queryKey: ['cryptos'],
    queryFn: fetchCryptoData,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 2 * 60 * 1000,
  })
}