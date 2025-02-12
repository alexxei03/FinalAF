import React from 'react';
import { useTranslation } from 'react-i18next';

const LandingMainSection2 = () => {
    const { t } = useTranslation();
    return (
        <section className="sct2" id="section1" style={{ paddingTop: '80px' }}>
            <div className="container">
                <div className="sct2-h1">{t('landing.advantagesTitle', 'Основные преимущества платформы')}</div>
                <div className="two-columns">
                    <div className="column">
                        <div className="sct2-block">
                            <div className="sct2-txt">
                                <div className="sect2-square"></div>
                                <div className="sct2-h2">{t('landing.advantage1', 'Квалифицированные курсы')}</div>
                            </div>
                            <div className="sct2-h3">
                                {t(
                                    'landing.advantage1Desc',
                                    'Получайте доступ к широкому выбору онлайн-курсов от опытных педагогов и экспертов в различных областях знаний. Каждый курс разработан с учетом актуальных требований и академических стандартов для максимально полезного и интересного обучения.'
                                )}
                            </div>
                        </div>
                        <div className="sct2-block">
                            <div className="sct2-txt">
                                <div className="sect2-square"></div>
                                <div className="sct2-h2">{t('landing.advantage2', 'Интерактивные лекции и тестирования')}</div>
                            </div>
                            <div className="sct2-h3">
                                {t(
                                    'landing.advantage2Desc',
                                    'Получайте доступ к увлекательным видеолекциям от опытных менторов и проходите тестирования, связанные с лекциями. Финальное тестирование в конце курса влияет на получение сертификата.'
                                )}
                            </div>
                        </div>
                        <div className="sct2-block">
                            <div className="sct2-txt">
                                <div className="sect2-square"></div>
                                <div className="sct2-h2">{t('landing.advantage3', 'Надежная система прокторинга')}</div>
                            </div>
                            <div className="sct2-h3">
                                {t(
                                    'landing.advantage3Desc',
                                    'Мы обеспечим честность выполнения тестирований с помощью надежной системы прокторинга, включающей защиту от читинга, контроль лицевых движений и отслеживание активности во время тестирований.'
                                )}
                            </div>
                        </div>
                        <div className="sct2-block">
                            <div className="sct2-txt">
                                <div className="sect2-square"></div>
                                <div className="sct2-h2">{t('landing.advantage4', 'Сертификаты с интеграцией Blockchain')}</div>
                            </div>
                            <div className="sct2-h3">
                                {t(
                                    'landing.advantage4Desc',
                                    'После успешного окончания курса вы получаете сертификат с уникальным идентификатором на основе технологии Blockchain, подтверждающим ваше достижение.'
                                )}
                            </div>
                        </div>
                        <div className="sct2-btn" style={{ gap: '5px' }}>
                            <a href="/register" className="btn">{t('landing.register', 'Зарегистрироваться')}</a>
                            <a href="/mentor" className="btn">{t('landing.forMentors', 'Менторам')}</a>
                        </div>
                    </div>
                    <div className="column">
                        <img className="sct2-img column-img" src="/img/landing/landing-main-pic1.jpg" alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingMainSection2;