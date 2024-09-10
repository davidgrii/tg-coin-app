import React from 'react'
import { Layout } from '@/widgets/dashboard/_ui/layout'
import { DashboardData } from '@/widgets/dashboard/_ui/dashboard-data'
import { DashboardUserBalance } from '@/widgets/dashboard'

interface IProps {
  variant: 'public' | 'portfolio'
}

export const Dashboard: React.FC<IProps> = ({ variant }) => {
  const isPortfolio = variant !== 'public'

  return (
    <Layout
      dashboard={isPortfolio ? <DashboardUserBalance /> : <DashboardData />}
    />
  )
}
