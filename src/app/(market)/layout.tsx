import React, { StrictMode } from 'react'
import { Dashboard } from '@/widgets/dashboard'
import { NavMenu } from '@/widgets/main-nav'


export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StrictMode>
        <body className={'overflow-y-auto h-full'}>
          <Dashboard variant={'public'} />
          {children}
          <NavMenu />
        </body>
      </StrictMode>
    </>
  )
}
