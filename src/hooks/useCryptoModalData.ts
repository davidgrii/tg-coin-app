import { ICryptoDetails } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { ISelectedCrypto } from '@/store/crypto/crypto-modal.store'

const fetchCryptoDetailsData = async (id: string | undefined): Promise<ICryptoDetails> => {
  if (!id) throw new Error('No crypto ID provided')

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cryptos/${id}`)

  if (!res.ok) {
    console.log('Failed to fetch crypto details')
  }

  return res.json()
}

export const useCryptoModal = (selectedCrypto: ISelectedCrypto | null) => useQuery({
  queryKey: ['cryptoDetails', selectedCrypto?.id],
  queryFn: () => fetchCryptoDetailsData(selectedCrypto?.id),
  staleTime: 30 * 60 * 1000,
  enabled: !!selectedCrypto
})