import { CardContent } from '@/components/ui/card'
import { formatPrice, formatPriceWithoutDecimals } from '@/components/utils/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DeleteIcon, EditIcon, EditV2Icon } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { ICrypto } from '@/types'
import { useTranslation } from 'react-i18next'

interface IProps {
  crypto: ICrypto;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  className?: string
}

export const PortfolioItem: React.FC<IProps> = ({ crypto, index, onEdit, onDelete, className }) => {
  const { t } = useTranslation()
  return (
    <CardContent key={index} className={'p-0 flex justify-between'}>
      <div className={'flex items-center gap-2'}>
        <div className="h-9 w-9">
          <img src={crypto.image} alt={crypto.name} />
        </div>
        <div className="grid gap-0.5">
          <p className="text-sm leading-none">
            {crypto.symbol.toUpperCase()}
          </p>
          <p className="text-[8.5px] font-semibold text-muted-foreground truncate">
            {crypto.name}
          </p>
        </div>
      </div>

      <div className={'flex items-center'}>
        <div className={'mr-4'}>
          <p
            className={`text-sm text-foreground font-semibold  whitespace-nowrap`}>
            {formatPrice(crypto.current_price)} $
          </p>
          <p
            className={`${crypto.price_change_percentage_24h.toString().includes('-')
              ? 'text-secondary'
              : 'text-primary'}  text-[8.7px] text-right font-semibold`}
          >
            {crypto.price_change_percentage_24h.toFixed(2)} %
          </p>
        </div>

        <div className={'w-24 mr-3'}>
          <p
            className={`${crypto.current_price.toString().length > 8
              ? 'text-[13px]'
              : 'text-sm'
            } text-foreground font-bold text-right  whitespace-nowrap`}
          >
            {formatPriceWithoutDecimals(crypto.current_price * crypto.quantity)} $
          </p>
          <p
            className={'text-muted-foreground text-[8.7px] text-right font-semibold'}
          >
            {crypto.quantity}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className={'p-1'}>
            <EditIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card border-0 backdrop-blur min-w-[7rem]">
            <DropdownMenuItem
              onClick={() => onEdit(index)}
              className={'flex text-xs text-foreground/85 justify-between cursor-pointer'}>
              {t('my_portfolio_page.edit')} <EditV2Icon />
            </DropdownMenuItem>
            <Separator className={'bg-foreground/10 my-0.5'} />
            <DropdownMenuItem
              className={'flex text-xs text-[#E40505] justify-between cursor-pointer '}
              onClick={() => onDelete(index)}
            >
              {t('my_portfolio_page.delete')} <DeleteIcon />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardContent>
  )
}
