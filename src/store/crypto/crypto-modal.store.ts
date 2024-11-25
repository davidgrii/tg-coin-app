import { create } from 'zustand'
import { ICrypto } from '@/types'

export interface ISelectedCrypto extends ICrypto {
  price?: number
  market_cap_rank?: number
}

interface ICryptoModalStore {
  isOpen: boolean
  selectedCrypto: ISelectedCrypto | null
  index: number
  openModal: (crypto: ICrypto, index: number) => void
  closeModal: () => void
}

export const useCryptoModalStore = create<ICryptoModalStore>((set) => ({
  index: 0,
  isOpen: false,
  selectedCrypto: null,
  openModal: (crypto, index) => set({ isOpen: true, selectedCrypto: crypto, index: index + 1 }),
  closeModal: () => set({ isOpen: false, selectedCrypto: null })
}))