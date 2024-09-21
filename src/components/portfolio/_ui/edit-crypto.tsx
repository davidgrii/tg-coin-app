import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ClearIcon } from '@/components/icons'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ICrypto } from '@/types'
import { useTranslation } from 'react-i18next'

interface IProps {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  crypto: ICrypto
  onEditCrypto: (updatedCrypto: ICrypto) => void
  className?: string
}

export const EditCrypto: React.FC<IProps> = ({ isOpen, setIsOpen, crypto, onEditCrypto, className }) => {
  const [selectedCrypto, setSelectedCrypto] = useState<ICrypto>(crypto)
  const [quantity, setQuantity] = useState(crypto?.quantity)

  const {t} = useTranslation()

  const handleSubmit= () => {
    const updatedCrypto = {
      ...selectedCrypto,
      quantity: Number(quantity)
    }
    onEditCrypto(updatedCrypto)
    setIsOpen(false)
  }

  useEffect(() => {
    setSelectedCrypto(crypto)
    setQuantity(crypto?.quantity)
  }, [crypto])

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
              <img src={selectedCrypto.image} alt={selectedCrypto.name} className="w-8 h-8" />
              <div className={'flex-col'}>
                <p className="text-sm text-foreground ">{selectedCrypto.symbol.toUpperCase()}</p>
                <p className="text-[8px] text-muted-foreground">{selectedCrypto.name}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground">
              <ClearIcon />
            </button>
          </div>
        )}

        <Input
          type={'number'}
          placeholder={t('edit_crypto.quantity')}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className={'font-medium py-8 px-6 rounded-xl text-xs bg-[#282828] border-0'}
        />

        <Button
          onClick={handleSubmit}
          className={'bg-foreground py-8 rounded-xl text-lg text-background font-semibold mx-auto w-full transition-colors hover:bg-foreground/75'}
        >
          {t('edit_crypto.btn')}
        </Button>
      </SheetContent>
    </Sheet>
  );
};
