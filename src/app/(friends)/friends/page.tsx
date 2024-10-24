'use client'

import React, { useEffect, useState } from 'react'
import { Container } from '@/components'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLeaderboardStore, useTelegramStore, useUserStore } from '@/store'
import { Leaderboard } from '@/components/friends/_ui/leaderboard'
import { InvitedUsers } from '@/components/friends/_ui/invited-users'
import { InviteButton } from '@/components/friends/_ui/invite-button'
import { t } from 'i18next'

export default function FriendsPage() {

  const userId = useTelegramStore(state => state.userId)
  const fetchUserProfile = useUserStore(state => state.fetchUserProfile)
  const fetchLeaderboard = useLeaderboardStore(state => state.fetchLeaderboard)

  const [selectedTab, setSelectedTab] = useState('invited')

  useEffect(() => {
    fetchUserProfile(userId)
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
        className="w-full flex flex-col items-center"
      >
        <TabsList className="grid w-full grid-cols-2 border rounded-lg">
          <TabsTrigger className={'rounded-l-lg rounded-r-none'} value="invited">{t('my_friends_page.invite')}</TabsTrigger>
          <TabsTrigger className={'rounded-r-lg rounded-l-none'} value="leaderboard">{t('my_friends_page.leaderboard')}</TabsTrigger>
        </TabsList>

        <InvitedUsers />

        <Leaderboard/>
      </Tabs>

      <InviteButton
        selectedTab={selectedTab}
      />
    </Container>
  )
}