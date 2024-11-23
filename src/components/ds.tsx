'use client'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Рендерим только если модалка открыта
  if (!isOpen) return null;

  // Закрытие по клавише Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Создаем портал для рендера модалки
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // Закрытие при клике на фон
    >
      <div
        className="bg-white rounded-lg p-4 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // Остановка всплытия клика
      >
        <button
          className="absolute top-2 right-2 p-1 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body // Рендерим модалку в конец body
  );
};