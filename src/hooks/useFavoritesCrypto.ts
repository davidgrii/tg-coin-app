import { useEffect, useState } from 'react'
import { ICrypto } from '@/types'
import { useCryptoStore } from '@/store'

export const useFavoritesCrypto = () => {
  const { cryptoData, favorites, isLoading } = useCryptoStore()
  const [favoriteCryptoData, setFavoriteCryptoData] = useState<ICrypto[]>([])

  useEffect(() => {
    if (isLoading) return

    if (favorites.length === 0) {
      setFavoriteCryptoData([])
      return
    }

    const filteredFavorites = cryptoData.filter((crypto: ICrypto) => favorites.includes(crypto.id))
    setFavoriteCryptoData(filteredFavorites)
  }, [favorites, cryptoData, isLoading])

  return { favoriteCryptoData }
}
