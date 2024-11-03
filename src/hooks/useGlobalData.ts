import { useQuery } from '@tanstack/react-query'
import { IGlobalMarketData } from '@/types'

const fetchGlobalData = async (): Promise<IGlobalMarketData> => {
  const res = await fetch(`https://priceme.store/api/global`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Ошибка при получении данных: ' + res.statusText)
  }

  const  response = await res.json()
  return response.data as IGlobalMarketData
}

export const useGlobalData = () => {
  return useQuery<IGlobalMarketData, Error>(
    { queryKey: ['globalData'],
      queryFn: fetchGlobalData,
      staleTime: 1000 * 60 * 5,
    })
}
