import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/nav.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const isAuthenticated = false;
  const userFullName = "User Name";

  return (
    <div className="navbar-landing-background">
      <div className="container">
        <nav className="navbar-landing">
          <div className="logo-landing">
            <Link to="/">
              {/* Путь к картинке из public: поместите файлы картинок в public/img/... */}
              <img src="/img/logo/logo%20black%20png%20row.png" alt="" />
            </Link>
          </div>
          <div className="nav-landing-links">
            <Link to="/">{t('navbar.main', 'Главная')}</Link>
            <Link to="/mentor">{t('navbar.mentor', 'Для менторов')}</Link>
          </div>
          <div className="nav-landing-elems-box">
            {isAuthenticated ? (
              <>
                <Link to="/home" className="nav-btn1">{userFullName}</Link>
                <Link to="/logout" className="nav-btn3">{t('navbar.logout', 'Выйти')}</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-btn1">{t('navbar.login', 'Вход')}</Link>
                <Link to="/register" className="nav-btn2">{t('navbar.register', 'Регистрация')}</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;