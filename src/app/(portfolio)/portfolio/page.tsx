'use client'

import { Container, CryptoSkeleton } from '@/components'
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { AddCrypto, BalanceTableHeader, EditCrypto, PortfolioItem } from '@/components/portfolio'
import { ICrypto } from '@/types'
import { useInitializePortfolioStore, usePortfolioStore } from '@/store/portfolio/portfolio.store'

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
          transition={{ duration: 0.7 }}
        >
          <Card className={'bg-background grid gap-8 border-0'}>
            {portfolio.map((crypto, index) => (
              <PortfolioItem
                key={index}
                crypto={crypto}
                index={index}
                onEdit={handleEditCrypto}
                onDelete={handleDeleteCrypto}
              />
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
