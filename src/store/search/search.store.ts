import { create } from 'zustand'
import { ISearchStore } from '@/types'

export const useSearchStore = create<ISearchStore>((set) => ({
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen})),
  closeSearch: () => set({ isSearchOpen: false})
}))
