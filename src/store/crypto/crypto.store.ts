'use client'

import { create } from 'zustand'
import { useEffect } from 'react'
import { ICrypto } from '@/types'

interface ICryptoStore {
  favorites: string[]
  isLoading: boolean
  cryptoData: ICrypto[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  initializeFavorites: () => void
  setCryptoData: (data: ICrypto[]) => void
}

export const useCryptoStore = create<ICryptoStore>((set) => ({
  favorites: [],
  isLoading: true,
  cryptoData: [],

  initializeFavorites: () => {
    set({ isLoading: true })

    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    set({ favorites: storedFavorites, isLoading: false })
  },

  addFavorite: (id: string) => set((state) => {
    const updatedFavorites = Array.from(new Set([...state.favorites, id]))
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    return { favorites: updatedFavorites }
  }),

  removeFavorite: (id: string) => set((state) => {
    const updatedFavorites = state.favorites.filter((fav) => fav !== id)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    return { favorites: updatedFavorites }
  }),

  setCryptoData: (data: ICrypto[]) => set({ cryptoData: data }),
}))

export const useInitializeCryptoStore = () => {
  const initializeFavorites = useCryptoStore((state) => state.initializeFavorites)

  useEffect(() => {
    initializeFavorites()
  }, [initializeFavorites])
}