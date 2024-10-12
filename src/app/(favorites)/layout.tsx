import React from 'react'
import { Dashboard } from '@/widgets/dashboard'
import { NavMenu } from '@/widgets/main-nav'


export default function Layout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className={'overflow-y-auto h-full pb-[89px]'}>
        <Dashboard variant={'public'} />
        {children}
        <NavMenu />
      </div>
    </>
  )
};
