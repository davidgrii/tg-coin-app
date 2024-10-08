import { useEffect } from 'react'

const useDisableZoom = () => {
  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      target.style.fontSize = '16px'; // Увеличиваем размер шрифта при фокусе
    };

    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      target.style.fontSize = '12px'; // Восстанавливаем размер шрифта после потери фокуса
    };

    // Получаем все инпуты и текстовые области
    const inputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea');

    // Применяем обработчики событий
    inputs.forEach((input) => {
      input.addEventListener('focus', handleFocus as EventListener);
      input.addEventListener('blur', handleBlur as EventListener);
    });

    // Удаляем обработчики при размонтировании
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', handleFocus as EventListener);
        input.removeEventListener('blur', handleBlur as EventListener);
      });
    };
  }, []);
};

export default useDisableZoom;
