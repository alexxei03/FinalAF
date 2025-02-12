import React, { useEffect } from 'react';
import { useDynamicCSS } from '../../hooks/useDynamicStyle';
import { useSpinner } from '../../context/SpinnerContext';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import Meta from '../../components/Meta';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import LoginForm from '../../components/forms/LoginForm';

const LoginPage = () => {
    const { setLoading } = useSpinner();
    const { t } = useTranslation();
    const { login } = useAuth();

    const stylesLoaded = useDynamicCSS('/assets/css/landing/login.css');

    useEffect(() => {
        setLoading(!stylesLoaded);
    }, [stylesLoaded, setLoading]);

    if (!stylesLoaded) {
        return null;
    }

    return (
        <div className="loginPage">
            <Meta />
            <Header />

            <div className="section two-columns">
                <div className="column1 centered-content">
                    <div className="container-login">
                        <h1 className="sct1-h1">{t('login.title', 'Войти в аккаунт')}</h1>
                        <LoginForm onLogin={login} /> 
                    </div>
                </div>
                <div className="column2">
                    <img src="/img/landing/auth/auth-backgr.jpg" alt="" />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default LoginPage;
