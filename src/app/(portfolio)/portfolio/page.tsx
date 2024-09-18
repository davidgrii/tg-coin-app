'use client'

import { Container, CryptoSkeleton } from '@/components'
import React, { useEffect, useState } from 'react'
import { AddCrypto } from '@/components/portfolio/_ui/add-crypto'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { DeleteIcon, EditIcon, EditV2Icon } from '@/components/icons'
import { BalanceTableHeader } from '@/components/portfolio'
import { usePortfolioStore } from '@/store'
import { EditCrypto } from '@/components/portfolio/_ui/edit-crypto'
import { ICrypto } from '@/types'
import { useInitializePortfolioStore } from '@/store/portfolio/portfolio.store'

export default function PortfolioPage() {
  useInitializePortfolioStore()

  const [isAddCryptoOpen, setIsAddCryptoOpen] = useState<boolean>(false)
  const [isEditCryptoOpen, setIsEditCryptoOpen] = useState<boolean>(false)
  const [activeCryptoIndex, setActiveCryptoIndex] = useState<number | null>(null)

  const {
    isLoading,
    portfolio,
    addCrypto,
    updateCrypto,
    deleteCrypto,
    calculateTotalBalance,
    calculateTotalPercentageChange
  } = usePortfolioStore()

  const formatPriceWithoutDecimals = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const handleUpdateCrypto = (index: number, updatedCrypto: ICrypto) => {
    updateCrypto(index, updatedCrypto)
    calculateTotalBalance()
    calculateTotalPercentageChange()
  }

  const handleAddCrypto = (newCrypto: any) => {
    addCrypto(newCrypto)
    calculateTotalBalance()
    calculateTotalPercentageChange()
    setIsAddCryptoOpen(false)
  }

  const handleDeleteCrypto = (index: number) => {
    deleteCrypto(index)
    calculateTotalPercentageChange()
    calculateTotalBalance()
  }

  const handleEditCrypto = (index: number) => {
    setActiveCryptoIndex(index)
    setIsEditCryptoOpen(true)
  }

  useEffect(() => {
    if (!isLoading && portfolio.length === 0) {
      setIsAddCryptoOpen(true)
    }

    calculateTotalBalance();
    calculateTotalPercentageChange();
  }, [portfolio.length, isLoading, calculateTotalBalance, calculateTotalPercentageChange])

  return (
    <Container className={'pt-0 mb-20'}>
      <BalanceTableHeader />

      {isLoading ?
        <div className={'grid justify-start gap-8'}>
          {new Array(10).fill(null).map((_, index) => (
            <CryptoSkeleton key={index} />
          ))}
        </div>
        : <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={'bg-background grid gap-8 border-0'}>
            {portfolio.map((crypto, index) => (
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
                      className={`${crypto.current_price.toString().length > 8
                        ? 'text-[12px]'
                        : 'text-sm'} text-foreground font-semibold  whitespace-nowrap`}>
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
                        ? 'text-[12px]'
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
                        onClick={() => handleEditCrypto(index)}
                        className={'flex text-xs text-foreground/85 justify-between cursor-pointer'}>
                        Edit <EditV2Icon />
                      </DropdownMenuItem>
                      <Separator className={'bg-foreground/10 my-0.5'} />
                      <DropdownMenuItem
                        className={'flex text-xs text-[#E40505] justify-between cursor-pointer '}
                        onClick={() => handleDeleteCrypto(index)}
                      >
                        Delete <DeleteIcon />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            ))}
          </Card>
        </motion.div>
      }

      <div className={'flex flex-col items-center justify-center mt-10'}>
        {activeCryptoIndex !== null && (
          <EditCrypto
            isOpen={isEditCryptoOpen}
            setIsOpen={setIsEditCryptoOpen}
            onEditCrypto={(updatedCrypto) => handleUpdateCrypto(activeCryptoIndex!, updatedCrypto)}
            crypto={portfolio[activeCryptoIndex]}
          />
        )}

        <AddCrypto
          onAddCrypto={handleAddCrypto}
          isOpen={isAddCryptoOpen}
          setIsOpen={setIsAddCryptoOpen}
          isEmpty={portfolio.length === 0}
        />
      </div>
    </Container>
  )
}
