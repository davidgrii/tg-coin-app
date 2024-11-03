import { useEffect, useState } from 'react'
import { ICrypto } from '@/types'
import { useCryptoStore } from '@/store'
import { useCryptoData } from '@/hooks/useCryptoData'

export const useFavoritesCrypto = () => {
  const { favorites, isLoading: storeLoading } = useCryptoStore()
  const { data: cryptoData, isLoading: queryLoading } = useCryptoData()
  const isLoading = storeLoading || queryLoading
  const [favoriteCryptoData, setFavoriteCryptoData] = useState<ICrypto[]>([])

  useEffect(() => {
    if (isLoading || !cryptoData) {
      return
    }

    if (favorites.length === 0) {
      setFavoriteCryptoData([])
      return
    }

    const filteredFavorites = cryptoData.filter((crypto: ICrypto) => favorites.includes(crypto.id))
    setFavoriteCryptoData(filteredFavorites)
  }, [favorites, cryptoData, isLoading])

  return { favoriteCryptoData }
}
