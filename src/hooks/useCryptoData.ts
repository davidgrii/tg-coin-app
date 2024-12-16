import { ICrypto } from '@/types'
import { useInfiniteQuery } from '@tanstack/react-query'

const fetchCryptoData = async ({ pageParam = 1 }): Promise<ICrypto[]> => {
  const limit = 50
  const res = await fetch(`http://localhost:5000/api/cryptos?page=${pageParam}&limit=${limit}`)

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных')
  }

  return await res.json()
}

export const useCryptoData = () => {
  return useInfiniteQuery({
    queryKey: ['cryptos'],
    queryFn: fetchCryptoData,
    staleTime: 3 * 60 * 1000,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
    select: (result) => result.pages.flatMap((page) => page.data)
  })
}





















// const previousData = localStorage.getItem('previous-data')
// const parsedData = previousData ? JSON.parse(previousData) : undefined
// if (query.data) {
//   localStorage.setItem('previous-data', JSON.stringify(query.data.slice(0, 10)))
// }
// placeholderData: parsedData,