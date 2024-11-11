import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import Image from 'next/image'
import { formatPrice, getDynamicFontSize } from '@/utils/formatters'
import { StarFavoriteIcon, StarIcon } from '@/components/icons'
import { NotificationIcon } from '@/components/icons/icons'
import { DetailsCoinsData } from '@/components/details-coins-data'
import { DetailsMarketsData } from '@/components/details-markets-data'
import { DetailsCryptoChart } from '@/components/details-crypto-chart'
import { useCryptoModalStore } from '@/store/crypto/crypto-modal.store'

interface IProps {
  favorites: string[]

  className?: string
}

export const CryptoItemDetails: React.FC<IProps> = ({ favorites, className }) => {
  const { isOpen, closeModal, selectedCrypto} = useCryptoModalStore()
  const index = 1

  if (!isOpen || !selectedCrypto) return null

  const isFavorite = favorites.includes(selectedCrypto.id)

  return (
    <AlertDialog open={isOpen} onOpenChange={closeModal}>
      <AlertDialogContent className={'w-full h-full overflow-y-auto rounded-none bg-[#1C1C1E] px-4'}>
        <AlertDialogCancel
          className={'absolute right-2.5 top-1 text-muted-foreground border-0 bg-background/0 px-0 py-0 h-8 w-8 hover:bg-background/0 hover:text-foreground'}>
          <CloseIcon />
        </AlertDialogCancel>

        <AlertDialogTitle className={'mx-auto flex-col justify-center items-start w-full max-w-3xl mt-4'}>
          <div className="flex justify-between w-full bg-accent items-center gap-3 px-6 py-4 rounded-[10px]">
            <div className={'flex items-center gap-2'}>
              <Image
                width={36}
                height={36}
                className="h-9 w-9"
                src={selectedCrypto.image}
                alt={selectedCrypto.name}
              />

              <div className="flex flex-col items-start">
                <div className={'flex gap-1'}>
                  <p className="text-[11px] font-semibold text-muted-foreground truncate">
                    {selectedCrypto.name.length > 10 ? `${selectedCrypto.name.slice(0, 14)}...` : selectedCrypto.name}
                  </p>

                  <span className="w-5 text-[11px] text-muted-foreground font-medium">#{index}</span>
                </div>

                <p
                  className={`${getDynamicFontSize(selectedCrypto.current_price.toString().length)} text-foreground font-bold whitespace-nowrap`}>
                  {formatPrice(selectedCrypto.current_price)} $
                </p>
              </div>
            </div>

            <div className={'flex gap-6'}>
              {isFavorite ?
                <StarFavoriteIcon
                  width={18}
                  height={18}
                />
                :
                <StarIcon
                  width={18}
                  height={18}
                />
              }

              <NotificationIcon width={18} height={18} />
            </div>
          </div>

          <DetailsCryptoChart />

          <DetailsCoinsData />

          <DetailsMarketsData />
        </AlertDialogTitle>

      </AlertDialogContent>
    </AlertDialog>
  )
}
