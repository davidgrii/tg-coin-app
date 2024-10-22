import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UserAvatar } from '@/components/profile/_ui/avatar'
import { EmptyProfile } from '@/components/profile/_ui/empty-profile'
import { TabsContent } from '@/components/ui/tabs'
import { useUserStore } from '@/store'

interface IProps {
  className?: string
}

export const InvitedUsers: React.FC<IProps> = ({ className }) => {

  const { rank, invitedUsers } = useUserStore()

  return (
    <TabsContent className={'w-full pb-36'} value="invited">
      {invitedUsers.length > 0 ?
        <Card className={'border-0 bg-background'}>
          <CardHeader className={'p-3.5 pl-6 pr-8 flex flex-row justify-between'}>
            <CardTitle className={'text-lg'}>{invitedUsers.length} friends</CardTitle>
            <CardDescription>You #{rank}</CardDescription>
          </CardHeader>
          <CardContent className={'flex flex-col gap-5 text-sm pl-6 pr-8'}>
            {invitedUsers.map((user, index) => (
              <div key={index} className={'flex justify-between items-center'}>
                <div className={'flex items-center gap-2'}>
                  <UserAvatar name={user.username || 'unknown'} size={50} className={'rounded-full'} />

                  <span>{user.username || 'unknown'}</span>
                </div>

                <span>+111 Coins</span>
              </div>
            ))}
          </CardContent>
        </Card> : <EmptyProfile isProfileEmpty={true} />}

    </TabsContent>
  )
}
