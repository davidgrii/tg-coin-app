import { create } from 'zustand'
import { ICrypto } from '@/types'

interface ICryptoModalStore {
  isOpen: boolean
  selectedCrypto: ICrypto | null
  index: number
  openModal: (crypto: ICrypto, index: number) => void
  closeModal: () => void
}
export const useCryptoModalStore = create<ICryptoModalStore>((set) => ({
  isOpen: false,
  selectedCrypto: null,
  openModal: (crypto, index) => set({ isOpen: true, selectedCrypto: crypto, index: index + 1 }),
  closeModal: () => set({ isOpen: false, selectedCrypto: null })
}))