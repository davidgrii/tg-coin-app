'use client'

import React from 'react'
import { animated, useSpring } from 'react-spring'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/components/ui/utils'
import { motion } from 'framer-motion'
import { LogoIcon } from '@/components/icons/icons'
import { UserAvatar } from '@/components/friends/_ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useUserStore } from '@/store'
import { titles } from '@/utils/constants'
import { useTranslation } from 'react-i18next'
import { formatWitDecimals } from '@/components/utils/utils'

interface IProps {
  className?: string
}

// Функция для плавной анимации числового значения
const AnimatedCoins = ({ value }: { value: number }) => {
  const props = useSpring({
    from: { number: 0 },
    number: value,
    delay: 200,
    config: { mass: 1, tension: 180, friction: 12 }
  })

  return (
    <animated.span>
      {props.number.to((n) => formatWitDecimals(n))}
    </animated.span>
  )
}

type TitleKey =
  'Beginner'
  | 'Explorer'
  | 'Expert'
  | 'Knight'
  | 'Leader'
  | 'Hero'
  | 'Master'
  | 'Legend'
  | 'Titan'
  | 'Immortal'
  | 'King'
  | 'Emperor'
  | 'Lord'
  | 'The Almighty'

export const DashboardProfile: React.FC<IProps> = ({ className }) => {

  const { username, coins, getTitleByCoins, loading } = useUserStore()
  const title = getTitleByCoins(coins)

  const { t } = useTranslation()

  const formatCoins = (value: number) => {
    if (value === Infinity) {
      return '+'
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M'
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k'
    } else {
      return value.toString()
    }
  }

  return (
    <Card className={cn('flex py-4 pl-6 pr-8 items-center justify-between rounded-xl border-0', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
      >
        <CardHeader className={'p-0 flex flex-row items-center gap-2'}>

          <UserAvatar name={username} size={50} className={'rounded-full'} />

          <div className={'flex flex-col gap-0.5'}>
            <CardTitle className={'text-foreground text-xs'}>
              {username}
            </CardTitle>

            <Select value={title}>
              <SelectTrigger className={'flex gap-1.5 items-center text-xs text-[#01B2AA] h-full p-0 bg-card border-0'}>
                {t(`titles.${title as TitleKey}`)}
              </SelectTrigger>

              <SelectContent className={'bg-card pl-0 text-foreground rounded-lg h-full'}>
                {titles.map((item) => (
                  <SelectItem
                    className={cn('rounded-sm font-medium', title == item.key && 'border font-bold')}
                    style={{ color: item.color, borderColor: item.color }}
                    key={item.key}
                    value={item.key}
                  >
                    <span>{t(`titles.${item.key}`)}</span>
                    <span className={'text-foreground absolute right-1.5 top-1.5'}>
                      {formatCoins(item.coins.min)}
                    </span>
                  </SelectItem>
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
              {t('dashboard_friends.coin')}
            </span>

            <span className={'flex gap-1 items-center justify-end text-foreground font-bold text-sm'}>
  <AnimatedCoins value={coins} />
</span>
          </div>

          <LogoIcon width={24} height={24} />
        </CardContent>
      </motion.div>
    </Card>
  )
}
