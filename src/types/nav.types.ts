import React from 'react'

export interface INavItem {
  href: string
  label: string
  exact?: boolean
  icon: React.ReactNode
}