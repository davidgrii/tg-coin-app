import { useMemo } from 'react'
import { ICrypto } from '@/types'

export const useCryptoFilter = (cryptoData: ICrypto[], searchValue: string) => {

  const filteredCryptoData = useMemo(() => {
    if (!Array.isArray(cryptoData)) {
      return []
    }

    return cryptoData.filter((crypto) => (
      crypto.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchValue.toLowerCase())
    ))
  }, [cryptoData, searchValue])

  return { filteredCryptoData }
}