import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { useCrypto } from '@/hooks/useCrypto'
import { ClearIcon } from '@/components/icons'
import { useCryptoFilter } from '@/hooks'
import { ICrypto } from '@/types'

interface IProps {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  isEmpty: boolean
  onAddCrypto: any
}

export const AddCrypto: React.FC<IProps> = ({ onAddCrypto, isOpen, setIsOpen, isEmpty }) => {
  const { cryptoData } = useCrypto()
  const [searchValue, setSearchValue] = useState('') // Состояние для поиска
  const [selectedCrypto, setSelectedCrypto] = useState<ICrypto | null>(null) // Состояние для выбранной криптовалюты
  const [quantity, setQuantity] = useState('') // Количество криптовалюты

  const { filteredCryptoData } = useCryptoFilter(cryptoData, searchValue)

  const handleCryptoSelect = (crypto: any) => {
    setSelectedCrypto(crypto)
    setSearchValue('')
  }

  const handleSubmit = () => {
    if (selectedCrypto && quantity) {
      onAddCrypto({ ...selectedCrypto, quantity })
      setSelectedCrypto(null)
      setQuantity('')
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
        <button className={'bg-background/0'}>
          <CirclePlus className={'w-9 h-9 cursor-pointer text-foreground transition-colors hover:text-muted-foreground'} />
        </button>
      </SheetTrigger>
      <SheetContent
        side={'top'}
        className={'bg-card rounded-2xl border-0 flex flex-col gap-6 items-center pt-10 pb-8'}
      >
        <SheetHeader className={`${searchValue && 'mt-16'} text-center mb-4`}>
          <SheetTitle className={'text-2xl'}>Add your coin</SheetTitle>
          {isEmpty &&
            <SheetDescription className={'text-sm pt-3 font-medium mx-auto'}>
              Add crypto that you own and monitor your portfolio balance in USD with real-time updates
            </SheetDescription>
          }
        </SheetHeader>

        {/* Отображение выбранной крипты */}
        {selectedCrypto ? (
          <div className="flex items-center justify-between w-full py-4 px-4 bg-[#282828] rounded-xl">
            <div className="flex items-center gap-3">
              <img src={selectedCrypto.image} alt={selectedCrypto.name} className="w-8 h-8" />
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
              placeholder={'Choose Coin'}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={'font-medium py-8 px-6 rounded-xl text-xs bg-[#282828] border-0'}
            />

            {searchValue && filteredCryptoData.length > 0 && (
              <div className="absolute bottom-full mb-2 w-full z-10">
                <div className={'bg-[#282828] rounded-xl shadow-md max-h-52 overflow-y-auto'}>
                  {filteredCryptoData.slice(0, 4).map((crypto) => (
                    <div
                      key={crypto.id}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-muted-foreground rounded-lg cursor-pointer"
                      onClick={() => handleCryptoSelect(crypto)}
                    >
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                      <p className="text-sm">{crypto.name} ({crypto.symbol.toUpperCase()})</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Input
          type={'number'}
          placeholder={'Quantity'}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className={'font-medium py-8 px-6 rounded-xl text-xs bg-[#282828] border-0'}
        />

        <Button
          onClick={handleSubmit}
          className={'bg-foreground py-8 rounded-xl text-lg text-background font-semibold mx-auto w-full transition-colors hover:bg-foreground/75'}
        >
          Add
        </Button>
      </SheetContent>
    </Sheet>
  )
}
