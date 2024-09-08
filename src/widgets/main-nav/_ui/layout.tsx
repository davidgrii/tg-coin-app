import React from 'react'


interface IProps {
  nav: React.ReactNode
  className?: string
}

export const Layout: React.FC<IProps> = ({ nav, className }) => {
  return (
    <div className={className}>
      {nav}
    </div>
  )
}
