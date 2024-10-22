'use client'

import React, { useEffect } from 'react'
import { Container } from '@/components'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserAvatar } from '@/components/profile/_ui/avatar'
import { EmptyProfile } from '@/components/profile/_ui/empty-profile'
import { cn } from '@/components/ui/utils'
import { useLeaderboardStore, useUserStore } from '@/store'
import FlyingCoins from '@/components/gift-coins'

export default function PortfolioPage() {

  const { users, totalUsers, fetchLeaderboard } = useLeaderboardStore()
  const { rank, referralCode, invitedUsers, fetchUserProfile } = useUserStore()

  const getMedal = (index: number) => {
    switch (index) {
      case 0:
        return '🥇'
      case 1:
        return '🥈'
      case 2:
        return '🥉'
      default:
        return '#' + (index + 1)
    }
  }

  const copyToClipboard = async () => {
    const inviteLink = `${window.location.origin}/invite?ref=${referralCode}`

    try {
      await navigator.clipboard.writeText(inviteLink)
    } catch (error) {
      console.error('Failed to copy the text: ', error)
      alert('Failed to copy the invite link.')
    }
  }

  useEffect(() => {
    const userId = '1422316270'

    fetchUserProfile(userId)
  }, [fetchUserProfile])

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])
  return (
    <Container className={'flex h-full flex-col items-center justify-between gap-10 pb-[100px] -mb-[100px]'}>

      <FlyingCoins/>

      <Tabs defaultValue="invited" className="w-full flex flex-col items-center">
        <TabsList className="grid w-full grid-cols-2 border rounded-lg">
          <TabsTrigger className={'rounded-l-lg rounded-r-none'} value="invited">Invited</TabsTrigger>
          <TabsTrigger className={'rounded-r-lg rounded-l-none'} value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent className={'w-full'} value="invited">
          {invitedUsers.length > 0 ?
            <Card className={'border-0 bg-background'}>
              <CardHeader className={'p-3.5 pl-6 pr-8 flex flex-row justify-between'}>
                <CardTitle className={'text-lg'}>{invitedUsers.length} friends</CardTitle>
                <CardDescription>You #{rank}</CardDescription>
              </CardHeader>
              <CardContent className={'text-sm pl-6 pr-8'}>
                <div className={'flex justify-between items-center'}>
                  <div className={'flex items-center gap-2'}>
                    <UserAvatar name={invitedUsers[0].username || 'unknown'} size={50} className={'rounded-full'} />

                    <span>{invitedUsers[0].username || 'unknown'}</span>
                  </div>

                  <span>+111 Coins</span>
                </div>
              </CardContent>
            </Card> : <EmptyProfile isProfileEmpty={true} />}

        </TabsContent>

        <TabsContent className={'w-full'} value="leaderboard">
          <Card className={'border-0 bg-background'}>
            <CardHeader className={'p-3.5 pl-6 pr-8 '}>
              <CardTitle className={'text-lg'}>{totalUsers.toLocaleString()} Users 🎉</CardTitle>
            </CardHeader>
            <CardContent className={'flex flex-col text-sm pl-6 pr-8 gap-5'}>
              {users.map((user, index) => (
                <div
                  key={index}
                  className={'flex items-center gap-2 justify-between'}
                >
                  <div className={'flex gap-2 items-center text-xs items-left'}>
                    <UserAvatar name={user.username?.toString() || 'unknown'} size={50} className={'rounded-full'} />

                    <div className={'flex flex-col'}>
                      <span className={''}>{user.username || 'unknown'}</span>
                      <span className={'text-muted-foreground'}>{user.coins}</span>
                    </div>
                  </div>

                  <span className={cn(index >= 3 ? 'text-sm' : 'text-xl', 'w-6 text-right')}>{getMedal(index)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className={'bg-foreground py-7 rounded-xl text-lg text-background font-semibold mx-auto w-full transition-colors hover:bg-foreground/75'}
          >
            Invite
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className={'max-w-60 px-8'}>
          <AlertDialogHeader>
            <AlertDialogTitle className={'text-center'}>Invite friends and get more Coins</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={copyToClipboard}
              className={'bg-foreground text-background font-bold rounded-lg transition-colors hover:bg-foreground/80'}>
              Copy invite link
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Container>
  )
}