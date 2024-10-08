import { useEffect } from 'react'

const useDisableZoom = () => {
  useEffect(() => {
    const handleFocus = (event) => {
      // Устанавливаем стиль для предотвращения зума
      event.target.style.fontSize = '16px';
    };

    const handleBlur = (event) => {
      // Восстанавливаем оригинальный стиль после потери фокуса
      event.target.style.fontSize = '';
    };

    // Добавляем обработчики для инпутов и текстовых областей
    const inputs = document.querySelectorAll('input, textarea');
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
