import React, { useEffect } from 'react';
import { useDynamicCSS } from '../../hooks/useDynamicStyle';
import { useSpinner } from '../../context/SpinnerContext';
import { useTranslation } from 'react-i18next';
import Meta from '../../components/Meta';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import RegisterForm from '../../components/forms/RegisterForm';

const RegisterPage = () => {
    const { setLoading } = useSpinner();
    const { t } = useTranslation();

    const stylesLoaded = useDynamicCSS('/assets/css/landing/registration.css');

    useEffect(() => {
        setLoading(!stylesLoaded);
    }, [stylesLoaded, setLoading]);

    if (!stylesLoaded) {
        return null;
    }


    return (
        <div className="registerPage">
            <Meta />
            <Header />
            <div className="section two-columns padding-top-dynamic">
                <div className="column1 centered-content">
                    <div className="sct1-h1">{t('register.title', 'Создать аккаунт')}</div>
                    <RegisterForm />
                </div>
                <div className="column2">
                    <img src="/img/landing/auth/auth-backgr.jpg" alt="" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegisterPage;
