'use client'

import React, { useEffect, useState } from 'react'
import { Container } from '@/components'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLeaderboardStore, useUserStore } from '@/store'
import { Leaderboard } from '@/components/profile/_ui/leaderboard'
import { InvitedUsers } from '@/components/profile/_ui/invited-users'
import { InviteButton } from '@/components/profile/_ui/invite-button'

export default function PortfolioPage() {

  const fetchUserProfile = useUserStore(state => state.fetchUserProfile)
  const fetchLeaderboard = useLeaderboardStore(state => state.fetchLeaderboard)

  const [selectedTab, setSelectedTab] = useState('invited')

  useEffect(() => {
    const userId = '1422316270'

    fetchUserProfile(userId)
  }, [fetchUserProfile])

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
          <TabsTrigger className={'rounded-l-lg rounded-r-none'} value="invited">Invited</TabsTrigger>
          <TabsTrigger className={'rounded-r-lg rounded-l-none'} value="leaderboard">Leaderboard</TabsTrigger>
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