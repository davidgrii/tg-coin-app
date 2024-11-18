import { useQuery } from '@tanstack/react-query'
import { ITrendingCrypto } from '@/types'

const fetchTrendingCrypto = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/trending`)
    return await res.json()
  } catch (error) {
    console.error('Ошибка при загрузке трендовых данных:', error)
  }
}

export const useTrendingCryptoData = (initialData: ITrendingCrypto[]) => {
  return useQuery<ITrendingCrypto[]>({
    queryKey: ['trending-crypto'],
    queryFn: fetchTrendingCrypto,
    initialData,
    staleTime: 30 * 60 * 1000,
  })
}
