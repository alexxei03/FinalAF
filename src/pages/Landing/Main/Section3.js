import React from 'react';
import { useTranslation } from 'react-i18next';

const LandingMainSection3 = () => {
    const { t } = useTranslation();
    const courses = [];
    return (
        <section className="sct3">
            <div className="container">
                <div className="sct3-h1">{t('landing.popularCourses', 'Популярные курсы')}</div>
                <div className="card-container">
                    {courses.length > 0 ? (
                        courses.map((course) => (
                            <div key={course.id} className="card">
                                <div>
                                    <a href={`/course/${course.id}`} style={{ display: 'block' }}>
                                        <img className="card-img" src={course.photo || '/img/coursesLogo/default2.jpg'} alt={course.title} />
                                    </a>
                                </div>
                                <div className="card-category">{course.language || ''}</div>
                                <div className="card-course-title">
                                    <a href={`/course/${course.id}`} style={{ textDecoration: 'none', color: 'black' }} title={course.title}>
                                        {course.title}
                                    </a>
                                </div>
                                <div className="rating-block">
                                    {!course.average_rating ? (
                                        <div className="rating">{t('landing.noRatings', 'Нет оценок')}</div>
                                    ) : (
                                        <>
                                            <div className="rating">{course.average_rating}</div>
                                            <div className="stars">
                                                <img className="star" src="/img/landing/star.svg" alt="" />
                                            </div>
                                        </>
                                    )}
                                    <div className="counts">({course.reviews_count})</div>
                                </div>
                                <div className="mentor-block">
                                    <div>
                                        <div
                                            className="mentor-photo-new"
                                            style={{
                                                background: `url(${course.mentor && course.mentor.photo ? course.mentor.photo : '/img/default/mentor2.jpg'}) no-repeat center center`,
                                                backgroundSize: 'cover',
                                                marginRight: '5px'
                                            }}
                                        ></div>
                                    </div>
                                    <div className="mentor-info">
                                        <div className="mentor-name">{course.mentor ? course.mentor.fullname : ''}</div>
                                        <div className="mentor-spec">
                                            {course.mentor && course.mentor.interests ? course.mentor.interests : t('landing.mentorDefault', 'Ментор курса')}
                                        </div>
                                    </div>
                                    <div className="price">
                                        <a className="price" href={`/course/${course.id}`} style={{ textDecoration: 'none' }}>
                                            {course.course_type === 'paid' && course.price > 0 ? `${course.price} ₸` : 'Free'}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>{t('landing.noCourses', 'Курсы не найдены')}</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default LandingMainSection3;