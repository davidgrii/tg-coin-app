import { useEffect } from 'react'

const useDisableZoom = () => {
  useEffect(() => {
    const handleFocus = (event: Event) => {
      // Проверяем, что целевой элемент является инпутом или текстовой областью
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      if (target) {
        // Устанавливаем стиль для предотвращения зума
        target.style.fontSize = '16px';
      }
    };

    const handleBlur = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      if (target) {
        // Восстанавливаем оригинальный стиль после потери фокуса
        target.style.fontSize = '';
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
