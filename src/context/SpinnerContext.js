import React, { createContext, useState, useContext } from 'react';
import Spinner from '../components/Spinner/Spinner';

const SpinnerContext = createContext();

export const SpinnerProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <SpinnerContext.Provider value={{ loading, setLoading }}>
      {/* Spinner всегда рендерится, но его видимость зависит от loading */}
      <Spinner isVisible={loading} />
      {children}
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => useContext(SpinnerContext);
