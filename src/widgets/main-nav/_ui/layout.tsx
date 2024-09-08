import React from 'react'


interface IProps {
  nav: React.ReactNode
  className?: string
}

export const Layout: React.FC<IProps> = ({ nav, className }) => {
  return (
    <div className={'flex justify-center border-t bg-background/65 backdrop-blur w-full p-4 fixed bottom-0 m-auto'}>
      {nav}
    </div>
  )
}
