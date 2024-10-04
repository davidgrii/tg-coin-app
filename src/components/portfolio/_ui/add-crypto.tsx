import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { ClearIcon } from '@/components/icons'
import { useCryptoFilter } from '@/hooks'
import { ICrypto } from '@/types'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface IProps {
  isOpen: boolean
  cryptoData: ICrypto[]
  setIsOpen: (state: boolean) => void
  isEmpty: boolean
  onAddCrypto: (cryptoId: string, quantity: number, purchase: number, notice?: string) => void
}

export const AddCrypto: React.FC<IProps> = ({ cryptoData, onAddCrypto, isOpen, setIsOpen, isEmpty }) => {
  const [quantity, setQuantity] = useState('')
  const [purchase, setPurchase] = useState('')
  const [notice, setNotice] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [selectedCrypto, setSelectedCrypto] = useState<ICrypto | null>(null)

  const { t } = useTranslation()

  const { filteredCryptoData } = useCryptoFilter(cryptoData, searchValue)

  const handleCryptoSelect = (crypto: ICrypto) => {
    setSelectedCrypto(crypto)
    setSearchValue('')
  }

  const handleSubmit = () => {
    if (selectedCrypto && quantity && purchase) {
      const cryptoId = selectedCrypto.id
      const numericQuantity = Number(quantity)
      const purchasePrice = Number(purchase)

      if (isNaN(numericQuantity) || numericQuantity <= 0 || isNaN(purchasePrice) || purchasePrice <= 0) {
        console.error('Invalid quantity or purchase price')
        return
      }

      onAddCrypto(cryptoId, numericQuantity, purchasePrice, notice)

      setSelectedCrypto(null)
      setPurchase('')
      setQuantity('')
      setNotice('')
      setIsOpen(false)
    }
  }

  const handleRemoveCrypto = () => {
    setSelectedCrypto(null)
    setSearchValue('')
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <button className={'bg-background/0'}>
            <CirclePlus
              className={'w-9 h-9 cursor-pointer text-foreground transition-colors hover:text-muted-foreground'} />
          </button>
        </motion.div>
      </SheetTrigger>
      <SheetContent
        side={'top'}
        className={'bg-card rounded-2xl border-0 flex flex-col gap-6 items-center pt-10 pb-8'}
      >
        <SheetHeader className={`${searchValue && filteredCryptoData.length > 0 && 'mt-16'} text-center mb-4`}>
          <SheetTitle className={'text-2xl'}>{t('add_crypto.add_coin')}</SheetTitle>
          {isEmpty &&
            <SheetDescription className={'text-sm pt-3 font-medium mx-auto'}>
              {t('add_crypto.add_coin_desc')}
            </SheetDescription>
          }
        </SheetHeader>

        {selectedCrypto ? (
          <div className="flex items-center justify-between w-full py-4 px-4 bg-[#282828] rounded-xl">
            <div className="flex items-center gap-3">
              <Image
                width={32}
                height={32}
                src={selectedCrypto.image}
                alt={selectedCrypto.name}
                className="w-8 h-8"
              />

              <div className={'flex-col'}>
                <p className="text-sm text-foreground ">{selectedCrypto.symbol.toUpperCase()}</p>
                <p className="text-[8px] text-muted-foreground">{selectedCrypto.name}</p>
              </div>
            </div>
            <button onClick={handleRemoveCrypto} className="text-muted-foreground">
              <ClearIcon />
            </button>
          </div>
        ) : (
          <div className="relative w-full">
            <Input
              type={'text'}
              placeholder={t('add_crypto.choose')}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={'font-medium py-8 px-6 rounded-xl text-xs bg-[#282828] border-0'}
            />


            {searchValue && filteredCryptoData.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute bottom-full mb-2 w-full z-10">
                  <div className={'bg-[#282828] rounded-xl shadow-md max-h-52 overflow-y-auto'}>
                    {filteredCryptoData.slice(0, 4).map((crypto) => (
                      <motion.div
                        key={crypto.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <div
                          className="flex items-center gap-3 px-4 py-2 hover:bg-muted-foreground rounded-lg cursor-pointer"
                          onClick={() => handleCryptoSelect(crypto)}
                        >
                          <Image
                            width={24}
                            height={24}
                            src={crypto.image}
                            alt={crypto.name}
                            className="w-6 h-6"
                          />

                          <p
                            className="text-[13px] text-nowrap">
                            {crypto.name.length > 18 ? crypto.name.slice(0, 18) + '...' : crypto.name} ({crypto.symbol.toUpperCase()})
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </div>
        )}

        <div className={'flex  w-full gap-6'}>
          <Input
            type={'number'}
            placeholder={t('add_crypto.quantity')}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={'font-medium py-8 px-6 rounded-xl text-xs bg-accent border-0'}
          />

          <Input
            type={'number'}
            placeholder={t('add_crypto.purchase')}
            value={purchase}
            onChange={(e) => setPurchase(e.target.value)}
            className={'font-medium py-8 px-6 rounded-xl text-xs bg-accent border-0'}
          />
        </div>

        <Input
          type={'text'}
          placeholder={t('add_crypto.note')}
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          className={'font-medium py-8 px-6 rounded-xl text-xs bg-accent border-0'}
        />

        <Button
          onClick={handleSubmit}
          className={'bg-foreground py-8 rounded-xl text-lg text-background font-semibold mx-auto w-full transition-colors hover:bg-foreground/75'}
        >
          {t('add_crypto.btn')}
        </Button>
      </SheetContent>
    </Sheet>
  )
}
