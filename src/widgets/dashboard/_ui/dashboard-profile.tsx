'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/components/ui/utils'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { LogoIcon } from '@/components/icons/icons'
import { UserAvatar } from '@/components/profile/_ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useUserStore } from '@/store/profile/useUserStore'
import { titles } from '@/utils/constants'

interface IProps {
  className?: string
}

export const DashboardProfile: React.FC<IProps> = ({ className }) => {

  const { t } = useTranslation()

  const { username, coins, fetchUserProfile, getTitleByCoins } = useUserStore()
  const title = getTitleByCoins(coins)

  useEffect(() => {
    const userId = '1422316270'

    fetchUserProfile(userId)
  }, [fetchUserProfile])

  return (
    <Card className={cn('flex py-4 pl-6 pr-8 items-center justify-between rounded-xl border-0', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
      >
        <CardHeader className={'p-0 flex flex-row items-center gap-2'}>

          <UserAvatar name={'aleko'} size={50} className={'rounded-full'} />

          <div className={'flex flex-col gap-0.5'}>
            <CardTitle className={'text-foreground text-xs'}>
              {username}
            </CardTitle>

            <Select>
              <SelectTrigger className={'flex gap-1.5 items-center text-xs text-[#01B2AA] h-full p-0 bg-card border-0'}>
                {title}
              </SelectTrigger>

              <SelectContent className={'bg-card text-foreground rounded-lg'}>
                {titles.map((item) => (
                  <SelectItem key={item.title} value="imortal">{item.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
      >
        <CardContent className={'p-0 flex gap-3 text-right items-center'}>
          <div className={'flex flex-col'}>
            <span className={'text-muted-foreground text-xs'}>
              Coins
            </span>

            <span className={'flex gap-1 items-center justify-end text-foreground font-bold text-sm'}>
              {coins}
            </span>
          </div>

          <LogoIcon width={24} height={24} />
        </CardContent>
      </motion.div>
    </Card>
  )
}
