import { create } from 'zustand'
import { ICrypto } from '@/types'

interface ICryptoModalStore {
  isOpen: boolean
  selectedCrypto: ICrypto | null
  openModal: (crypto: ICrypto) => void
  closeModal: () => void
}
export const useCryptoModalStore = create<ICryptoModalStore>((set) => ({
  isOpen: false,
  selectedCrypto: null,
  openModal: (crypto) => set({ isOpen: true, selectedCrypto: crypto }),
  closeModal: () => set({ isOpen: false, selectedCrypto: null })
}))