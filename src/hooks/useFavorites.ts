import { ICrypto } from '@/types'
import { useQuery } from '@tanstack/react-query'

const fetchFavoritesCrypto = async ({ userId }): Promise<ICrypto[]> => {
  const res = await fetch(`http://localhost:5000/api/users/${userId}/favorites`)

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных')
  }

  return await res.json()
}

export const useFavoritesData = (userId: string) => {
  return useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => fetchFavoritesCrypto({ userId }),
    select: (result) => result.data,
    staleTime: 3 * 60 * 1000,
    enabled: !!userId
  })
}