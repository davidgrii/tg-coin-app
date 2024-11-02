'use client'

import React, { useEffect, useState } from 'react'
import { Container } from '@/components'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLeaderboardStore, useUserStore } from '@/store'
import { Leaderboard } from '@/components/friends/_ui/leaderboard'
import { InvitedUsers } from '@/components/friends/_ui/invited-users'
import { InviteButton } from '@/components/friends/_ui/invite-button'
import { t } from 'i18next'
import { useTelegramUser } from '@/hooks/useTelegramUser'

export default function FriendsPage() {

  const { data } = useTelegramUser()
  const userId = data?.userId || ''
  const fetchUserProfile = useUserStore(state => state.fetchUserProfile)
  const fetchLeaderboard = useLeaderboardStore(state => state.fetchLeaderboard)

  const [selectedTab, setSelectedTab] = useState('invited')

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        await fetchUserProfile(userId)
      } catch (error) {
        console.error('Ошибка при получении профиля пользователя:', error)
      }
    }

    loadUserProfile()
  }, [fetchUserProfile, userId])

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  return (
    <Container className={'flex h-full flex-col items-center justify-between gap-10 pb-[100px] -mb-[100px]'}>
      <Tabs
        defaultValue="invited"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full flex flex-col items-start"
      >
        <TabsList className="grid grid-cols-3 gap-1.5 text-nowrap">
          <TabsTrigger
            className={'border px-6 py-2 rounded-lg'}
            value="invited"
          >
            {t('my_friends_page.invite')}
          </TabsTrigger>
          <TabsTrigger
            className={'border px-6 py-2 rounded-lg'}
            value="leaderboard"
          >
            {t('my_friends_page.leaderboard')}
          </TabsTrigger>
          <TabsTrigger
            disabled={true}
            className={'border px-6 py-2 rounded-lg opacity-45 cursor-not-allowed'}
            value="tasks"
          >
            {t('my_friends_page.tasks')}
          </TabsTrigger>
        </TabsList>

        <InvitedUsers />

        <Leaderboard />
      </Tabs>

      <InviteButton
        selectedTab={selectedTab}
      />
    </Container>
  )
}