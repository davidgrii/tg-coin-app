import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ClearIcon } from '@/components/icons'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { IPortfolioItem } from '@/types/crypto.types'

interface IProps {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  item?: IPortfolioItem
  onEditCrypto: (updatedCrypto: IPortfolioItem) => void
}

export const EditCrypto: React.FC<IProps> = ({ isOpen, setIsOpen, item, onEditCrypto }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<IPortfolioItem | undefined>(item)
  const [quantity, setQuantity] = useState<number | undefined>(item?.quantity)
  const [purchase, setPurchase] = useState<number | undefined>(item?.purchasePrice)
  const [notice, setNotice] = useState<string>(item?.notice || '')

  const { t } = useTranslation()

  const handleSubmit = () => {
    if (!selectedCrypto) return

    const updatedCrypto = {
      _id: selectedCrypto._id,
      cryptoId: selectedCrypto.cryptoId,
      quantity: Number(quantity) || 0,
      purchasePrice: Number(purchase),
      notice: notice.trim() || '',
      crypto: selectedCrypto.crypto
    }

    onEditCrypto(updatedCrypto)
    setIsOpen(false)
  }

  useEffect(() => {
    setSelectedCrypto(item)
    setQuantity(item?.quantity)
    setPurchase(item?.purchasePrice)
    setNotice(item?.notice || '')
  }, [item])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side={'top'}
        className={'bg-card rounded-2xl border-0 flex flex-col gap-6 items-center pt-10 pb-8'}
      >
        <SheetHeader className={'text-center mb-4'}>
          <SheetTitle className={'text-2xl'}>{t('edit_crypto.edit_coin')}</SheetTitle>
        </SheetHeader>

        {selectedCrypto && (
          <div className="flex items-center justify-between w-full py-4 px-4 bg-[#282828] rounded-xl">
            <div className="flex items-center gap-3">
              <Image
                width={32}
                height={32}
                src={selectedCrypto.crypto.image}
                alt={selectedCrypto.crypto.name}
                className="w-8 h-8"
              />

              <div className={'flex-col'}>
                <p className="text-sm text-foreground ">{selectedCrypto.crypto.symbol.toUpperCase()}</p>
                <p className="text-[8px] text-muted-foreground">{selectedCrypto.crypto.name}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground">
              <ClearIcon />
            </button>
          </div>
        )}

        <div className={'flex  w-full gap-6'}>
          <Input
            type={'number'}
            placeholder={t('edit_crypto.quantity')}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={'font-medium py-8 px-6 rounded-xl text-xs bg-accent border-0'}
          />

          <Input
            type={'number'}
            placeholder={t('add_crypto.purchase')}
            onChange={(e) => setPurchase(Number(e.target.value))}
            className={'font-medium py-8 px-6 rounded-xl text-xs bg-accent border-0'}
          />
        </div>

        <Input
          type={'text'}
          placeholder={t('add_crypto.note')}
          onChange={(e) => setNotice(e.target.value)}
          className={'font-medium py-8 px-6 rounded-xl text-xs bg-accent border-0'}
        />


        <Button
          onClick={handleSubmit}
          className={'bg-foreground py-8 rounded-xl text-lg text-background font-semibold mx-auto w-full transition-colors hover:bg-foreground/75'}
        >
          {t('edit_crypto.btn')}
        </Button>
      </SheetContent>
    </Sheet>
  )
}
