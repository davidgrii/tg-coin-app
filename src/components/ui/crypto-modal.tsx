'use client'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const CryptoModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className="fixed w-full h-full inset-0 z-50 flex items-start justify-center bg-[#1C1C1E]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-lg overflow-hidden relative p-4 pt-11"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-2.5 text-gray-500 hover:text-white"
          onClick={onClose}
        >
          <CloseIcon/>
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}