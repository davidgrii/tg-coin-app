'use client'

import { create } from 'zustand'
import { useEffect } from 'react'
import { ICryptoStore } from '@/types'

export const useCryptoStore = create<ICryptoStore>((set) => ({
  favorites: [''],
  favoritesCryptoData: [],
  isLoading: true,

  initializeFavorites: async (userId: string) => {
    set({ isLoading: true })

    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}/favorites`)

      if (res.ok) {
        const { data, favorites } = await res.json()
        set({ favoritesCryptoData: data, favorites: favorites || [], isLoading: false })
      } else {
        console.error('Error fetching favorites:', res.statusText)
        set({ isLoading: false })
      }

    } catch (error) {
      console.error('Error fetching favorites', error)
      set({ isLoading: false })
    }
  },

  addFavorite: async (userId: string, id: string) => {
    try {
      const res = await fetch(`https://priceme.store/api/users/${userId}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cryptoId: id })
      })

      if (res.ok) {
        const updatedUser = await res.json()
        set({ favorites: updatedUser.favorites })
      } else {
        console.error('Error adding favorite:', res.statusText)
      }
    } catch (error) {
      console.error('Error adding favorite:', error)
    }
  },

  removeFavorite: async (userId: string, id: string) => {
    try {
      const res = await fetch(`https://priceme.store/api/users/${userId}/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cryptoId: id })
      })

      if (res.ok) {
        const updatedUser = await res.json()
        set({ favorites: updatedUser.favorites })

        set((state) => ({
          favoritesCryptoData: state.favoritesCryptoData.filter(crypto => crypto.id !== id)
        }))
      } else {
        console.error('Error removing favorite:', res.statusText)
      }
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  },
}))

export const useInitializeCryptoStore = (userId: string) => {
  const initializeFavorites = useCryptoStore((state) => state.initializeFavorites)

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        await initializeFavorites(userId)
      }
    }

    fetchFavorites()
  }, [initializeFavorites, userId])
}