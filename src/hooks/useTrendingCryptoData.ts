import { useQuery } from '@tanstack/react-query'
import { ITrendingCrypto } from '@/types'

const fetchTrendingCrypto = async () => {
  try {
    const res = await fetch('https://priceme.store/api/trending')
    return await res.json()
  } catch (error) {
    console.error('Ошибка при загрузке трендовых данных:', error)
  }
}

export const useTrendingCryptoData = () => {
  return useQuery<ITrendingCrypto[]>({
    queryKey: ['trending-crypto'],
    queryFn: fetchTrendingCrypto,
    staleTime: 24 * 60 * 60 * 1000,
  })
}
