import { useEffect } from 'react'

const useDisableZoom = () => {
  useEffect(() => {
    const handleFocus = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      if (target) {
        target.style.fontSize = '16px'; // Установка размера шрифта на время фокуса
      }
    };

    const handleBlur = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      if (target) {
        target.style.fontSize = '12px'; // Восстановление оригинального размера шрифта
      }
    };

    // Добавляем обработчики для инпутов и текстовых областей
    const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    // Удаляем обработчики при размонтировании
    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, []);
};

export default useDisableZoom;