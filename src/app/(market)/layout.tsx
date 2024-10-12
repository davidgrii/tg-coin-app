import React, { StrictMode } from 'react'
import { Dashboard } from '@/widgets/dashboard'
import { NavMenu } from '@/widgets/main-nav'


export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StrictMode>
        <div className={''}>
          <Dashboard variant={'public'} />
          {children}
          <NavMenu />
        </div>
      </StrictMode>
    </>
  )
}
