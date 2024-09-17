import { create } from 'zustand'
import { useEffect } from 'react'

interface ICryptoStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  initializeFavorites: () => void;
}

export const useCryptoStore = create<ICryptoStore>((set) => ({
  favorites: [],

  initializeFavorites: () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    set({ favorites: storedFavorites });
  },

  addFavorite: (id: string) => set((state) => {
    const updatedFavorites = Array.from(new Set([...state.favorites, id]));
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return { favorites: updatedFavorites };
  }),

  removeFavorite: (id: string) => set((state) => {
    const updatedFavorites = state.favorites.filter((fav) => fav !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return { favorites: updatedFavorites };
  })
}));

export const useInitializeCryptoStore = () => {
  const initializeFavorites = useCryptoStore((state) => state.initializeFavorites);

  useEffect(() => {
    initializeFavorites();
  }, [initializeFavorites]);
};
