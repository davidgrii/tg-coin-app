'use client'

import React, { useEffect, useState } from 'react'
import { Container, CryptoSkeleton } from '@/components'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { AddCrypto, BalanceTableHeader, EditCrypto, PortfolioItem } from '@/components/portfolio'
import { useInitializePortfolioStore, usePortfolioStore } from '@/store/portfolio/portfolio.store'
import i18n from '@/i18n'
import { useCryptoStore } from '@/store'
import { IPortfolioItem } from '@/types/crypto.types'
import { Accordion } from '@/components/ui/accordion'

export default function PortfolioPage() {
  const isBrowser = typeof window !== 'undefined'
  const bot = isBrowser ? window.Telegram.WebApp : null
  const userId = isBrowser ? String(bot?.initDataUnsafe?.user?.id || '1422316270') : 'defaultUserId'

  useInitializePortfolioStore(userId)

  const [isAddCryptoOpen, setIsAddCryptoOpen] = useState<boolean>(false)
  const [isEditCryptoOpen, setIsEditCryptoOpen] = useState<boolean>(false)
  const [activeCryptoId, setActiveCryptoId] = useState<string | null>(null)

  const [showSkeletons, setShowSkeletons] = useState<boolean>(false)

  const {
    isLoading,
    portfolio,
    addCrypto,
    updateCrypto,
    initializePortfolio,
    deleteCrypto,
    calculateTotalBalance,
    calculateTotalPercentageChange24h,
    calculateTotalProfitLoss,
    calculateTotalProfitLossPercentage,
    calculateTotalPriceChange24h
  } = usePortfolioStore()

  const { cryptoData } = useCryptoStore()

  useEffect(() => {
      if (portfolio.length > 0) {
        calculateTotalBalance()
        calculateTotalProfitLoss()
        calculateTotalProfitLossPercentage()
        calculateTotalPercentageChange24h()
        calculateTotalPriceChange24h()
      }
    },
    [portfolio,
      calculateTotalBalance,
      calculateTotalPercentageChange24h,
      calculateTotalProfitLoss,
      calculateTotalProfitLossPercentage,
      calculateTotalPriceChange24h
    ]
  )

  const handleAddCrypto = async (cryptoId: string, quantity: number, purchase: number, notice?: string) => {
    await addCrypto(userId, cryptoId, quantity, purchase, notice)
    await initializePortfolio(userId)

    calculateTotalBalance()
    calculateTotalProfitLoss()
    calculateTotalProfitLossPercentage()
    calculateTotalPercentageChange24h()
    calculateTotalPriceChange24h()
    setIsAddCryptoOpen(false)
  }

  const handleUpdateCrypto = async (userId: string, _id: string, updatedCrypto: IPortfolioItem) => {
    await updateCrypto(userId, _id, updatedCrypto)
    await initializePortfolio(userId)

    calculateTotalBalance()
    calculateTotalProfitLoss()
    calculateTotalProfitLossPercentage()
    calculateTotalPercentageChange24h()
    calculateTotalPriceChange24h()
  }

  const handleDeleteCrypto = async (_id: string) => {
    await deleteCrypto(userId, _id)

    if (activeCryptoId === _id) {
      setActiveCryptoId(null)
      setIsEditCryptoOpen(false)
    }

    await initializePortfolio(userId)

    calculateTotalBalance()
    calculateTotalProfitLoss()
    calculateTotalProfitLossPercentage()
    calculateTotalPercentageChange24h()
    calculateTotalPriceChange24h()
  }

  const handleEditCrypto = (_id: string) => {
    const cryptoToEdit = portfolio.find(crypto => crypto._id === _id)

    if (cryptoToEdit) {
      setActiveCryptoId(cryptoToEdit._id)
      setIsEditCryptoOpen(true)
    }
  }

  useEffect(() => {
    const bot = window.Telegram.WebApp

    const userLanguage = bot.initDataUnsafe?.user?.language_code || 'en'
    i18n.changeLanguage(userLanguage)
  }, [])

  useEffect(() => {
    if (!isLoading && portfolio.length === 0) {
      setIsAddCryptoOpen(true)
    }
  }, [portfolio.length, isLoading])

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      timer = setTimeout(() => {
        setShowSkeletons(true);
      }, 500);
    } else {
      setShowSkeletons(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  return (
    <Container className={'pt-0'}>
      <BalanceTableHeader />

      {showSkeletons ? (
        <motion.div
          className={'grid justify-start gap-8 pt-4'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {new Array(10).fill(null).map((_, index) => (
            <CryptoSkeleton key={index} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className={'bg-background grid border-0'}>
            <Accordion type="single" collapsible className="w-full">
              {portfolio.map((item) => (
                <motion.div
                  key={item.cryptoId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <PortfolioItem
                    item={item}
                    onEdit={handleEditCrypto}
                    onDelete={handleDeleteCrypto}
                  />
                </motion.div>
              ))}
            </Accordion>
          </Card>
        </motion.div>
      )}

      <div className={'flex flex-col items-center justify-center mt-10'}>
        {activeCryptoId !== null && (
          <EditCrypto
            isOpen={isEditCryptoOpen}
            setIsOpen={setIsEditCryptoOpen}
            onEditCrypto={(updatedCrypto) => handleUpdateCrypto(userId, activeCryptoId!, updatedCrypto)}
            item={portfolio.find(crypto => crypto._id === activeCryptoId)}
          />
        )}

        <AddCrypto
          cryptoData={cryptoData}
          onAddCrypto={handleAddCrypto}
          isOpen={isAddCryptoOpen}
          setIsOpen={setIsAddCryptoOpen}
          isEmpty={portfolio.length === 0}
        />
      </div>
    </Container>
  )
}
