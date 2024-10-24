'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserAvatar } from '@/components/friends/_ui/avatar'
import { EmptyProfile } from '@/components/friends/_ui/empty-profile'
import { TabsContent } from '@/components/ui/tabs'
import { useUserStore } from '@/store'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'


interface IProps {
  className?: string
}

export const InvitedUsers: React.FC<IProps> = ({ className }) => {

  const { invitedUsers } = useUserStore()
  const { t } = useTranslation()

  const [showEmptyMessage, setShowEmptyMessage] = useState(false)

  useEffect(() => {
    if (invitedUsers.length === 0) {
      const timer = setTimeout(() => {
        setShowEmptyMessage(true)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setShowEmptyMessage(false)
    }
  }, [invitedUsers])

  return (
    <TabsContent className={'w-full pb-36'} value="invited">

      <Card className={'border-0 bg-background'}>
        <CardHeader className={'p-3.5 pl-6 pr-8 flex flex-row justify-between'}>
          <CardTitle className={'text-lg'}>{invitedUsers.length} {t('my_friends_page.friends')}</CardTitle>
        </CardHeader>
        <CardContent className={'flex flex-col gap-5 text-sm pl-6 pr-8'}>
          {showEmptyMessage ? (
            <EmptyProfile isProfileEmpty={true} />
          ) : (
            invitedUsers.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className={'flex justify-between items-center'}>
                  <div className={'flex items-center gap-2'}>
                    <UserAvatar name={user.username || 'unknown'} size={50} className={'rounded-full'} />
                    <span>{user.username || 'unknown'}</span>
                  </div>
                  <span>+1,111 {t('my_friends_page.coin')}</span>
                </div>
              </motion.div>
            ))
          )}
        </CardContent>
      </Card>

    </TabsContent>
  )
}
