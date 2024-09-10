import { create } from 'zustand'

interface ISearchStore {
  isSearchOpen: boolean
  toggleSearch: (state: boolean) => void
}

export const useSearchStore = create<ISearchStore>((set) => ({
  isSearchOpen: false,
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen}))
}))
