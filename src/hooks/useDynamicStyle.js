import { useState, useEffect } from 'react';

export const useDynamicCSS = (href) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    link.onload = () => {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready
          .then(() => {
            // Дополнительная задержка 10 мс после загрузки шрифтов
            setTimeout(() => setLoaded(true), 10);
          })
          .catch(() => {
            setLoaded(true);
          });
      } else {
        setLoaded(true);
      }
    };

    link.onerror = () => {
      console.error('Ошибка загрузки CSS: ' + href);
      setLoaded(true);
    };

    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [href]);

  return loaded;
};
