import React from 'react'


interface IProps {
  nav: React.ReactNode
  className?: string
}

export const Layout: React.FC<IProps> = ({ nav, className }) => {
  return (
    <div className={'flex z-50 h-[89px] justify-center bg-background w-full p-4 pb-8 fixed bottom-0 left-0'}>
      {nav}
    </div>
  )
}
