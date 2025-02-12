import React from 'react';
import { useTranslation } from 'react-i18next';

const LandingMainSection1 = () => {
    const { t } = useTranslation();
    return (
        <section className="sct1">
            <div className="container">
                <div className="sct1-imgs">
                    <img className="sct1-img1" src="/img/landing/ellipse-circle.svg" alt="" />
                    <img className="sct1-img2" src="/img/landing/ellipse-circle.svg" alt="" />
                </div>
                <div className="centered-content">
                    <div className="sct1-h1">
                        {t('landing.title', 'Образовательная блокчейн платформа')} <br />
                        <span style={{ color: '#2655FF' }}>«Blockchain Study»</span>
                    </div>
                    <div className="sct1-h2">
                        {t(
                            'landing.subtitle',
                            'Получите востребованные знания и настоящий цифровой сертификат с транскриптом Вашей успеваемости совершенно бесплатно. Наш портал построен на базе блокчейн технологии, поэтому все ваши данные защищены и никто не сможет внести изменения в вашу академическую успеваемость.'
                        )}
                    </div>
                    <div className="sct1-btns">
                        <a href="#section1" className="sct1-btn1">{t('landing.moreInfo', 'Подробнее')}</a>
                        <a href="/register" className="sct1-btn2">{t('landing.register', 'Регистрация')}</a>
                    </div>
                    <div className="sct-more">
                        <a href="#section1" className="sct-more-link">
                            <div className="text">{t('landing.learnMore', 'Узнать больше')}</div>
                            <img className="sct1-pointer" src="/img/landing/pointer.svg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingMainSection1;