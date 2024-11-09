import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import Image from 'next/image'
import { ICrypto } from '@/types'
import { formatPrice, getDynamicFontSize } from '@/utils/formatters'
import { StarIcon } from '@/components/icons'
import { NotificationIcon } from '@/components/icons/icons'
import { DetailsCoinsData } from '@/components/details-coins-data'
import { DetailsMarketsData } from '@/components/details-markets-data'
import { DetailsCryptoChart } from '@/components/details-crypto-chart'

interface IProps {
  index: number
  crypto: ICrypto
  className?: string
}

export const CryptoItemDetails: React.FC<IProps> = ({ index, crypto, className }) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>

      <AlertDialogContent className={'w-full h-full overflow-y-auto rounded-none bg-[#1C1C1E] px-4'}>
        <AlertDialogCancel
          className={'absolute right-2.5 top-1 text-muted-foreground border-0 bg-background/0 px-0 py-0 h-8 w-8 hover:bg-background/0 hover:text-foreground'}>
          <CloseIcon />
        </AlertDialogCancel>

        <div className={'mx-auto flex-col justify-center items-start w-full max-w-3xl mt-4'}>
          <div className="flex justify-between w-full bg-accent items-center gap-3 px-7 py-4 rounded-[10px]">
            <div className={'flex items-center gap-2'}>
              <Image
                width={36}
                height={36}
                className="h-9 w-9"
                src={crypto.image}
                alt={crypto.name}
              />

              <div className="flex flex-col items-start">
                <div className={'flex gap-2'}>
                  <p className="text-[11px] font-semibold text-muted-foreground truncate">
                    {crypto.name.length > 10 ? `${crypto.name.slice(0, 14)}...` : crypto.name}
                  </p>

                  <span className="w-5 text-[11px] text-muted-foreground font-medium">#{index + 1}</span>
                </div>

                <p
                  className={`${getDynamicFontSize(crypto.current_price.toString().length)} text-foreground font-bold whitespace-nowrap`}>
                  {formatPrice(crypto.current_price)} $
                </p>
              </div>
            </div>

            <div className={'flex gap-5'}>
              {<StarIcon width={19} height={19} />}
              <NotificationIcon width={19} height={19} />
            </div>
          </div>

          <DetailsCryptoChart />

          <DetailsCoinsData />

          <DetailsMarketsData />
        </div>


      </AlertDialogContent>
    </AlertDialog>
  )
}
