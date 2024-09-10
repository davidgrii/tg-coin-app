'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { cn } from '@/components/ui/utils'

interface IProps {
  searchValue: string
  setSearchValue: (value: string) => void
  inputRef: React.RefObject<HTMLInputElement>
  className?: string
}

export const SearchInput: React.FC<IProps> = ({ searchValue, setSearchValue, inputRef, className }) => {

  const clearInput = () => {
    setSearchValue('')
    inputRef.current?.focus()
  }

  return (
    <div className={cn(className, 'relative ml-auto flex-1 md:grow-0')}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Search className={'absolute left-2.5 top-3 h-4 w-4 text-muted-foreground'} />

        <Input
          ref={inputRef}
          type="search"
          placeholder="Search coin..."
          className="font-medium pl-8 w-full"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {searchValue && (
          <button
            className="absolute right-2.5 top-3"
            onClick={clearInput}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </motion.div>
    </div>
  );
};
