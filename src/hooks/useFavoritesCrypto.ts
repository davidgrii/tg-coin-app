import { useEffect, useState } from 'react'
import { ICrypto } from '@/types'
import { useCryptoStore } from '@/store'
import { useCrypto } from '@/hooks'


export const useFavoritesCrypto = () => {
  const [favoriteCryptoData, setFavoriteCryptoData] = useState<ICrypto[]>([])

  const { cryptoData, isLoading } = useCrypto()
  const { favorites } = useCryptoStore()

  useEffect(() => {
    const fetchFavoriteCryptoData = async () => {
      if (isLoading) return
      if (favorites.length === 0) {
        setFavoriteCryptoData([])
        return
      }

      const filteredFavorites = cryptoData.filter((crypto: any) => favorites.includes(crypto.id))
      setFavoriteCryptoData(filteredFavorites)
    }

    fetchFavoriteCryptoData()
  }, [favorites, cryptoData, isLoading])

  return { favoriteCryptoData, isLoading }
}