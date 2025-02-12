import React, { useEffect } from 'react';
import { useDynamicCSS } from '../../hooks/useDynamicStyle';
import { useSpinner } from '../../context/SpinnerContext';
import Meta from '../../components/Meta';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import LandingMainSection1 from './Main/Section1'; 
import LandingMainSection2 from './Main/Section2'; 
import LandingMainSection3 from './Main/Section3'; 
import LandingMainSection4 from './Main/Section4'; 


const LandingPage = () => {
  const { setLoading } = useSpinner();
  const stylesLoaded = useDynamicCSS('/assets/css/landing/landingMain.css');

  useEffect(() => {
    setLoading(!stylesLoaded);
  }, [stylesLoaded, setLoading]);

  if (!stylesLoaded) {
    return null;
  }


  return (
    <div className="mainPage">
      <Meta />
      <Header />
      <LandingMainSection1 />
      <LandingMainSection2 />
      <LandingMainSection3 />
      <LandingMainSection4 />
      <Footer />
    </div>
  );
};

export default LandingPage;
