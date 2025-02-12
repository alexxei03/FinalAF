import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

const LandingMentorSection1 = () => {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(1);

    const stepAnswers = {
        1: t(
            'mentor.step1',
            '<span><a href="/register" class="underlined yellow">Создание</a></span> аккаунта. Необходимо обязательно прикрепить следующие документы:<br>• Скан документа, удостоверяющего личность.<br>• Все необходимые сертификаты, подтверждающие уровень знаний.'
        ),
        2: t(
            'mentor.step2',
            'Подтверждение электронной почты. Для этого необходимо перейти по ссылке, отправленной на вашу почту.'
        ),
        3: t(
            'mentor.step3',
            'Ожидание обработки и проверки данных. Администратор вручную проверит ваши данные в течение 5 рабочих дней. Если всё верно, аккаунт будет активирован.'
        ),
        4: t(
            'mentor.step4',
            'Готово! Теперь вы ментор. Начните помогать обучающимся, создавайте собственные курсы и развивайте свои навыки.'
        )
    };

    return (
        <section className="sct1">
            <div className="container">
                <div className="sct1-h1">{t('mentor.title', 'Для менторов')}</div>
                <div className="two-columns">
                    <div className="column">
                        <div className="sct1-h2">
                            <Trans i18nKey="mentor.description" components={{ 1: <span className="stc1-h3" /> }} />
                        </div>
                        <div className="sct1-h2" style={{ marginTop: '20px', marginBottom: '8px' }}>
                            {t('mentor.possibilitiesTitle', 'Некоторые возможности платформы:')}
                        </div>
                        <div className="list-elem">
                            <div className="circle"></div>
                            <div className="stc1-h3">
                                {t('mentor.possibility1', 'Создание и разработка онлайн-курсов в удобной панели управления.')}
                            </div>
                        </div>
                        <div className="list-elem">
                            <div className="circle"></div>
                            <div className="stc1-h3">
                                {t('mentor.possibility2', 'Добавление видеолекций и интерактивных материалов в курсы.')}
                            </div>
                        </div>
                        <div className="list-elem">
                            <div className="circle"></div>
                            <div className="stc1-h3">
                                {t('mentor.possibility3', 'Создание тестирований для оценки знаний обучающихся.')}
                            </div>
                        </div>
                        <div className="list-elem">
                            <div className="circle"></div>
                            <div className="stc1-h3">
                                {t('mentor.possibility4', 'Возможность установки типа курса (открытый, платный, закрытый) с различными правилами доступа.')}
                            </div>
                        </div>
                        <div className="list-elem">
                            <div className="circle"></div>
                            <div className="stc1-h3">
                                {t('mentor.possibility5', 'Просмотр статистики и аналитики курса для оценки эффективности обучения.')}
                            </div>
                        </div>
                        <div className="list-elem">
                            <div className="circle"></div>
                            <div className="stc1-h3">
                                {t('mentor.possibility6', 'Система прокторинга для защиты тестирований от читинга.')}
                            </div>
                        </div>
                        <div className="list-elem">
                            <div className="circle"></div>
                            <div className="stc1-h3">
                                {t('mentor.possibility7', 'Детализация выполнения тестирований.')}
                            </div>
                        </div>
                        <div className="list-elem">
                            <div className="circle"></div>
                            <div className="stc1-h3">
                                {t('mentor.possibility8', 'Выдача сертификатов обучающимся по окончании успешного прохождения курсов.')}
                            </div>
                        </div>
                        <div className="list-elem">
                            <div className="circle"></div>
                            <div className="stc1-h3">
                                {t('mentor.possibility9', 'Использование технологии Blockchain для генерации уникальных идентификаторов сертификатов и обеспечения их подлинности.')}
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <img
                            className="sct1-img column-img"
                            src={`${process.env.PUBLIC_URL}/img/landing/landing-mentor-pic1.jpg`}
                            alt=""
                        />
                        <div>
                            <div className="tutor-h1">{t('mentor.howToBecome', 'Как стать ментором?')}</div>
                            <div className="tutor-nav">
                                <div className="tutor-steps">
                                    {[1, 2, 3, 4].map((step, index) => (
                                        <div
                                            key={step}
                                            className={`tutor-step ${activeStep === step ? 'active' : ''} ${index === 0 ? 'first-step' : ''}`}
                                            onClick={() => setActiveStep(step)}
                                        >
                                            {step}
                                        </div>
                                    ))}
                                </div>

                                <Link to="/register" className="tutor-btn" style={{ textDecoration: 'none' }}>
                                    {t('mentor.createAccount', 'Создать аккаунт')}
                                </Link>
                            </div>
                            <div
                                className="tutor-info"
                                dangerouslySetInnerHTML={{ __html: stepAnswers[activeStep] }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingMentorSection1;