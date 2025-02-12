import React, { useEffect, useState, useRef } from 'react';
import './Spinner.css';

const Spinner = ({ isVisible }) => {
  // shouldRender определяет, остается ли компонент в DOM
  const [shouldRender, setShouldRender] = useState(isVisible);
  // displayClass определяет, какой класс применять (show или hide)
  const [displayClass, setDisplayClass] = useState(isVisible ? 'show' : 'hide');
  const mountTimeRef = useRef(Date.now());

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setDisplayClass('show');
      mountTimeRef.current = Date.now(); // обновляем время, когда спиннер снова показывается
    } else {
      const minDisplayTime = 0; // минимальное время отображения спиннера в мс
      const fadeOutTime = 1000;   // длительность fade-out (должна совпадать с transition в CSS)
      const elapsed = Date.now() - mountTimeRef.current;
      const delay = Math.max(0, minDisplayTime - elapsed);

      // Через delay меняем класс на hide (начинается fade-out)
      const timeoutId1 = setTimeout(() => {
        setDisplayClass('hide');
      }, delay);

      // После delay + fadeOutTime удаляем спиннер из DOM
      const timeoutId2 = setTimeout(() => {
        setShouldRender(false);
      }, delay + fadeOutTime);

      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
      };
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div className={`loading_overlay ${displayClass}`}>
      <div className="spinner_container"></div>
    </div>
  );
};

export default Spinner;
