import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserAvatar } from '@/components/profile/_ui/avatar'
import { cn } from '@/components/ui/utils'
import { TabsContent } from '@/components/ui/tabs'
import { useLeaderboardStore } from '@/store'

interface IProps {
  className?: string
}

export const Leaderboard: React.FC<IProps> = ({ className }) => {

  const { users, totalUsers } = useLeaderboardStore()

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

  return (
    <TabsContent className={'w-full pb-20'} value="leaderboard">
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
  )
}
