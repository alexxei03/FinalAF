import React, { useEffect } from 'react';
import { useDynamicCSS } from '../../hooks/useDynamicStyle';
import { useSpinner } from '../../context/SpinnerContext';
import Meta from '../../components/Meta';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import LandingMentorSection1 from './Mentor/Section1';
import LandingMentorSection2 from './Mentor/Section2';

const MentorPage = () => {
  const { setLoading } = useSpinner();
  const stylesLoaded = useDynamicCSS('/assets/css/landing/landingMentor.css');

  useEffect(() => {
    setLoading(!stylesLoaded);
  }, [stylesLoaded, setLoading]);

  if (!stylesLoaded) {
    return null;
  }

  return (
    <div className="mentorPage">
      <Meta />
      <Header />
      <LandingMentorSection1 />
      <LandingMentorSection2 />
      <Footer />
    </div>
  );
};

export default MentorPage;
