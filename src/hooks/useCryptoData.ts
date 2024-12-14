import { ICrypto } from '@/types'
import { useQuery } from '@tanstack/react-query'

const fetchCryptoData = async (): Promise<ICrypto[]> => {
  const page = 1
  const limit = 1000
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cryptos?page=${page}&limit=${limit}`)

  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных')
  }

  return await res.json()
}

export const useCryptoData = () => {
  return useQuery<ICrypto[], Error>({
    queryKey: ['cryptos'],
    queryFn: fetchCryptoData,
    staleTime: 3 * 60 * 1000
    // placeholderData: parsedData,
  })
}

// const previousData = localStorage.getItem('previous-data')
// const parsedData = previousData ? JSON.parse(previousData) : undefined
// if (query.data) {
//   localStorage.setItem('previous-data', JSON.stringify(query.data.slice(0, 10)))
// }
