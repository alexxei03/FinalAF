import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/assets/css/footer.css';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <footer className="footer">
            <div className="container-footer">
                <div className="columns">
                    <div className="col col-30">
                        <div>
                            <Link to="/">
                                <img src="/img/logo/white-logo-png.png" alt="" style={{ width: '165px', color: 'aliceblue' }} />
                            </Link>
                        </div>
                        <div className="logo-info">
                            {t('footer.innovation', 'Инновации для образования будущего.')}
                        </div>
                    </div>
                    <div className="col col-15">
                        <div className="footer-main">{t('footer.platform', 'Платформа')}</div>
                        <div className="footer-link">
                            <Link to="/courses">{t('footer.courses', 'Курсы')}</Link>
                        </div>
                        <div className="footer-link">
                            <Link to="/verify-certificate">{t('footer.certificateCheck', 'Проверка сертификатов')}</Link>
                        </div>
                        <div className="footer-link">
                            <a href="/files/requirements_for_course_placement_on_the_platformv2.pdf" target="_blank" rel="noreferrer">
                                {t('footer.forPartners', 'Для партнеров')}
                            </a>
                        </div>
                    </div>
                    <div className="col col-20">
                        <div className="footer-link">
                            <Link to="/certification">{t('footer.certification', 'Сертификация')}</Link>
                        </div>
                        <div className="footer-link">
                            <Link to="/mentor">{t('footer.forMentors', 'Для менторов')}</Link>
                        </div>
                        <div className="footer-link">
                            <Link to="/partnership">{t('footer.partnership', 'Сотрудничество')}</Link>
                        </div>
                    </div>
                    <div className="col col-20">
                        <div className="footer-main">{t('footer.access', 'Доступ')}</div>
                        <div className="footer-link">
                            <Link to="/register">{t('footer.register', 'Регистрация')}</Link>
                        </div>
                        <div className="footer-link">
                            <Link to="/login">{t('footer.login', 'Авторизация')}</Link>
                        </div>
                    </div>
                    <div className="col col-15">
                        <div className="footer-main">{t('footer.contactInfo', 'Контактная информация')}</div>
                        <div className="footer-link">Alexey Fedenko</div>
                        <div className="footer-link">+7 747 437 23 41</div>
                        <div className="footer-link">suppfed@gmail.com</div>
                    </div>
                </div>
                <div className="columns" style={{ paddingTop: '48px' }}>
                    <div className="col col-50 footer-btm">
                        © 2025 BlockchainStudy. {t('footer.allRightsReserved', 'Все права защищены.')}
                    </div>
                    <Link to="/privacy-policy" className="col col-30 footer-btm">
                        {t('footer.privacyPolicy', 'Политика конфиденциальности')}
                    </Link>
                    <Link to="/usage-rules" className="col col-20 footer-btm">
                        {t('footer.usageRules', 'Условия использования')}
                    </Link>
                    <a href="/files/requirements_for_course_placement_on_the_platformv2.pdf" target="_blank" rel="noreferrer" className="col col-20 footer-btm">
                        {t('footer.courseRequirements', 'Требования к размещению курсов на платформе')}
                    </a>

                    {/* Переключатель языков */}
                    <button
                        className="footer-btm"
                        onClick={() => i18n.changeLanguage('ru')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#98A2B3' }}
                    >
                        Русский
                    </button>
                    <button
                        className="footer-btm"
                        onClick={() => i18n.changeLanguage('en')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#98A2B3' }}
                    >
                        English
                    </button>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
