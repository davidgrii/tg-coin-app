import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/store'
import { useTranslation } from 'react-i18next'

interface IProps {
  selectedTab: string
  className?: string
}

export const InviteButton: React.FC<IProps> = ({ selectedTab, className }) => {

  const referralCode = useUserStore(state => state.referralCode)
  const { t } = useTranslation()

  const [buttonText, setButtonText] = useState(t('my_friends_page.invite_button'))

  const copyToClipboard = async () => {
    const inviteLink = `https://t.me/coinshouse_bot?start=ref=${referralCode}`
    try {
      await navigator.clipboard.writeText(inviteLink)
      setButtonText(t('my_friends_page.copied'))

      setTimeout(() => {
        setButtonText(t('my_friends_page.invite_button'))
      }, 1300)
    } catch (error) {
      console.error('Failed to copy the text: ', error)
      alert('Failed to copy the invite link.')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {selectedTab === 'invited' &&
          <Button
            className={`bg-foreground fixed bottom-24 max-w-3xl py-7 rounded-xl text-lg text-background 
            font-semibold w-[97%] transition-transform transform hover:bg-foreground/80 active:scale-95`
            }
          >
            {buttonText}
          </Button>}

      </AlertDialogTrigger>

      <AlertDialogContent className={'max-w-60 px-8'}>
        <AlertDialogHeader>
          <AlertDialogTitle className={'text-center'}>{t('my_friends_page.copy_text')}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={copyToClipboard}
            className={'bg-foreground text-background font-bold rounded-lg w-full hover:bg-foreground/80 transition-transform transform active:scale-95'}>
            {t('my_friends_page.copy_link')}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
