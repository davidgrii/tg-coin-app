import React from 'react'
import { Layout } from '@/widgets/dashboard/_ui/layout'
import { DashboardData } from '@/widgets/dashboard/_ui/dashboard-data'
import { DashboardUserBalance } from '@/widgets/dashboard'
import { DashboardProfile } from '@/widgets/dashboard/_ui/dashboard-profile'

interface IProps {
  variant: 'public' | 'portfolio' | 'profile'
}

export const Dashboard: React.FC<IProps> = ({ variant }) => {
  let dashboardContent

  if (variant === 'portfolio') {
    dashboardContent = <DashboardUserBalance />;
  } else if (variant === 'profile') {
    dashboardContent = <DashboardProfile />;
  } else {
    dashboardContent = <DashboardData />;
  }

  return (
    <Layout dashboard={dashboardContent} />
  )
}
