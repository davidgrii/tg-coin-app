import { CardContent } from '@/components/ui/card'
import { formatPrice, formatPriceWithoutDecimals } from '@/components/utils/utils'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { IPortfolioItem } from '@/types/crypto.types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DeleteIcon, EditIcon, EditV2Icon } from '@/components/icons/icons'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/components/ui/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'

interface IProps {
  item: IPortfolioItem
  onEdit: (_id: string) => void
  onDelete: (_id: string) => void
}

export const PortfolioItem: React.FC<IProps> = ({ item, onEdit, onDelete }) => {
  const { t } = useTranslation()

  const [agreeOpen, setAgreeOpen] = useState(false)

  if (!item || !item.crypto) {
    return null
  }

  const currentPrice = item?.crypto.current_price
  const quantity = item.quantity
  const purchasePrice = item.purchasePrice

  const investedUSD = quantity * purchasePrice
  const currentInvestmentValue = currentPrice * quantity
  const profitLossUSD = currentInvestmentValue - investedUSD
  const profitLossPercentage = ((currentPrice - purchasePrice) / purchasePrice) * 100

  return (
    <>
      <AccordionItem value={item._id}>
        <AccordionTrigger>
          <CardContent
            className={'p-0 flex w-full justify-between'}>
            <div className={'flex items-center gap-2'}>
              <Image
                width={36}
                height={36}
                src={item.crypto.image}
                alt={item.crypto.name}
                className="h-9 w-9"
              />

              <div className="grid gap-0.5 text-left">
                <p className="text-sm leading-none">
                  {item.crypto.symbol?.toUpperCase()}
                </p>
                <p className="text-[8.5px] font-semibold text-muted-foreground truncate">
                  {item.crypto?.name}
                </p>
              </div>
            </div>

            <div className={'flex items-center'}>
              <div className={'mr-4'}>
                <p
                  className={`text-sm text-foreground font-semibold  whitespace-nowrap`}>
                  {formatPrice(currentPrice)} $
                </p>
                <p
                  className={`${item.crypto.price_change_percentage_24h.toString().includes('-')
                    ? 'text-secondary'
                    : 'text-primary'}  text-[8.7px] text-right font-semibold`}
                >
                  {item.crypto.price_change_percentage_24h.toFixed(2)} %
                </p>
              </div>

              <div className={'w-24 mr-6'}>
                <p
                  className={`${item.crypto.current_price.toString().length > 8
                    ? 'text-[13px]'
                    : 'text-sm'
                  } text-foreground font-bold text-right  whitespace-nowrap`}
                >
                  {formatPriceWithoutDecimals(item.crypto.current_price * item.quantity)} $
                </p>
                <p
                  className={'text-muted-foreground text-[8.7px] text-right font-semibold'}
                >
                  {formatPrice(quantity)} {item.crypto.symbol.toUpperCase()}
                </p>
              </div>

            </div>
          </CardContent>
        </AccordionTrigger>
        <AccordionContent className={'flex gap-3.5 pl-1 items-start'}>

          <DropdownMenu>
            <DropdownMenuTrigger className={'p-1'}>
              <EditIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-0 backdrop-blur min-w-[8rem]">
              <DropdownMenuItem
                onClick={() => onEdit(item._id)}
                className={'flex text-sm text-foreground/85 justify-between cursor-pointer'}
              >
                {t('my_portfolio_page.edit')} <EditV2Icon />
              </DropdownMenuItem>
              <Separator className={'bg-foreground/10 my-1'} />
              <DropdownMenuItem
                className={'flex text-sm text-[#E40505] justify-between cursor-pointer '}
                onClick={() => setAgreeOpen(!open)}
              >
                {t('my_portfolio_page.delete')} <DeleteIcon />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={agreeOpen} onOpenChange={() => setAgreeOpen(false)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className={'text-center text-[16px]'}>Are you sure?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className={'bg-[#1C1C1E] border-0 text-foreground w-20 h-9  hover:bg-card hover:text-foreground rounded-lg'}
                >
                  No
                </AlertDialogCancel>
                <AlertDialogAction
                  className={'bg-[#1C1C1E] border-0 w-20 h-9 text-secondary hover:bg-card rounded-lg'}
                  onClick={() => onDelete(item._id)}
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className={'w-full text-[12px] font-medium text-muted-foreground mr-9'}>
            <div className={'flex justify-between pb-0 border-b border-border/30'}>
              <p>{t('my_portfolio_page.purchase')}</p>
              <p className={'text-foreground font-bold'}>
                {formatPrice(purchasePrice)}
              </p>
            </div>
            <div className={'flex justify-between  border-b border-border/30'}>
              <p>{t('my_portfolio_page.invested')}</p>
              <p className={'text-foreground font-bold'}>
                {formatPrice(investedUSD)} $
              </p>
            </div>
            <div className={'flex justify-between border-b border-border/30'}>
              <p>{t('my_portfolio_page.over_entry')} $</p>
              <p className={cn(profitLossUSD > 0 ? 'text-primary' : 'text-secondary', 'font-bold')}>
                {formatPrice(profitLossUSD)} $
              </p>
            </div>
            <div className={'flex justify-between '}>
              <p>{t('my_portfolio_page.over_entry')} %</p>
              <p className={cn(profitLossPercentage > 0 ? 'text-primary' : 'text-secondary', 'font-bold')}>
                {formatPrice(Number(profitLossPercentage.toFixed(2)))} %
              </p>
            </div>

            {item.notice &&
              <div className={'bg-accent text-foreground font-medium rounded-sm mt-2 w-full p-1 pl-2 text-[12px]'}>
                {item.notice}
              </div>
            }
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
