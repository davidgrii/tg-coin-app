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
  openModal: (crypto, index) => {
    console.log("Open modal:", crypto, index);
    set((state) => {
      if (state.selectedCrypto?.id === crypto.id) {
        // Не обновляем состояние, если объект не изменился
        return state;
      }
      return {
        isOpen: true,
        selectedCrypto: { ...crypto },
        index: index + 1,
      }
    })
  },
  closeModal: () => {
    console.log("Close modal");
    set({ isOpen: false, selectedCrypto: null });
  },
}));