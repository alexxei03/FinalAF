import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useTranslation } from "react-i18next";
import Navbar from '../../components/layout/Navbar/Navbar';
import { apiGet } from "../../apiService";
import './css/CoursePage.css';

const courseData = {
    title: "React для начинающих",
    description: "Базовый курс по React. Изучите компоненты, хуки и маршрутизацию для создания современных веб-приложений.",
    instructor: {
        name: "Иван Иванов",
        photo: "/img/default/mentor.jpg",
        bio: "Опытный разработчик с многолетним стажем.",
    },
    duration: "8 недель",
    price: "Бесплатно",
    rating: 4.8,
    students: 1200,
    banner: "/img/default/course.png",
};

const coursePlan = [
    { week: 1, title: "Введение", topics: ["JSX", "Компоненты", "Props"] },
    { week: 2, title: "Хуки", topics: ["useState", "useEffect"] },
    { week: 3, title: "Маршрутизация", topics: ["React Router"] },
];

const reviews = [
    { name: "Анна Смирнова", rating: 5, comment: "Отличный курс!" },
    { name: "Максим Ковалев", rating: 4, comment: "Полезная информация, но хотелось бы больше примеров." },
];

const faqs = [
    { question: "Для кого курс?", answer: "Курс рассчитан на начинающих разработчиков." },
    { question: "Как долго длится курс?", answer: "Курс занимает 8 недель." },
];

const CoursePage = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedWeek, setExpandedWeek] = useState(null);
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const toggleWeek = (week) => setExpandedWeek(expandedWeek === week ? null : week);
    const toggleFAQ = (index) => setExpandedFAQ(expandedFAQ === index ? null : index);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await apiGet(`/courses/${id}/`);
                setCourse(data);
            } catch (error) {
                console.error("Ошибка загрузки данных курса:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    // Если данные не загружены, показываем загрузку
    if (loading) {
        return (
            <Navbar>
                <div className="course-info-page-container">
                    <p>{t("loading", "Загрузка...")}</p>
                </div>
            </Navbar>
        );
    }

    // Если по какой-то причине курс не найден
    if (!course) {
        return (
            <Navbar>
                <div className="course-info-page-container">
                    <p>{t("course.notFound", "Курс не найден")}</p>
                </div>
            </Navbar>
        );
    }

    // Используем данные с сервера или fallback-заглушки, если какие-то поля отсутствуют
    const {
        title = "Курс не указан",
        description = "Описание отсутствует",
        instructor = {},
        duration = "N/A",
        price = "N/A",
        rating = "N/A",
        students = "N/A",
        image = "/img/default/course.png",
    } = course;

    return (
        <Navbar>
            <div className="course-info-page-container">
                {/* Герой-секция */}
                <section
                    className="course-info-hero"
                    style={{ backgroundImage: `url(${image || "/img/default/course.png"})` }}
                >
                    <div className="hero-overlay">
                        <h1 className="course-info-title">{title}</h1>
                        <p className="course-info-subtitle">{description}</p>
                        <button className="enroll-btn">{t("course.enroll", "Записаться")}</button>
                    </div>
                </section>

                {/* Информация о курсе и преподавателе */}
                <section className="course-info-page">
                    <div className="course-info-details">
                        <p><strong>{t("course.duration", "Длительность:")}</strong> {duration}</p>
                        <p><strong>{t("course.price", "Цена:")}</strong> {course.price <= 0 ? "Бесплатно" : `${course.price}₸`}</p>
                        <p><strong>{t("course.students", "Студентов:")}</strong> {students}</p>
                        <p><strong>{t("course.rating", "Рейтинг:")}</strong> {rating} <Star size={18} color="#ed9b38" /></p>
                    </div>
                    <div className="instructor-info">
                        <img src={instructor.photo || "/img/default/mentor.jpg"} alt={instructor.name} />
                        <div className="instructor-details">
                            <h3>{instructor.name || courseData.instructor.name || t("course.noInstructor", "Информация отсутствует")}</h3>
                            <p>{instructor.bio || courseData.instructor.bio || ""}</p>
                        </div>
                    </div>
                </section>

                {/* План курса */}
                <section className="course-plan">
                    <h2>{t("course.plan", "План курса")}</h2>
                    {coursePlan.map((week) => (
                        <div key={week.week} className="week-container">
                            <div className="week-header" onClick={() => toggleWeek(week.week)}>
                                <h3>
                                    {t("course.week", "Неделя")} {week.week}: {week.title}
                                </h3>
                                {expandedWeek === week.week ? <ChevronUp /> : <ChevronDown />}
                            </div>
                            {expandedWeek === week.week && (
                                <ul className="topics-list">
                                    {week.topics.map((topic, idx) => (
                                        <li key={idx}>{topic}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>

                {/* FAQ */}
                <section className="faq-section">
                    <h2>FAQ</h2>
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="faq-item">
                            <div className="faq-question" onClick={() => toggleFAQ(idx)}>
                                <h4>{faq.question}</h4>
                                {expandedFAQ === idx ? <ChevronUp /> : <ChevronDown />}
                            </div>
                            {expandedFAQ === idx && <p className="faq-answer">{faq.answer}</p>}
                        </div>
                    ))}
                </section>

                {/* Отзывы */}
                <section className="reviews-section">
                    <h2>{t("course.reviews", "Отзывы")}</h2>
                    {reviews.length > 0 ? (
                        <div className="reviews-list">
                            {reviews.map((review, idx) => (
                                <div key={idx} className="review-card">
                                    <h4>{review.name}</h4>
                                    <div className="review-rating">
                                        {Array.from({ length: review.rating }).map((_, i) => (
                                            <Star key={i} size={16} color="#ed9b38" />
                                        ))}
                                    </div>
                                    <p>{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>{t("course.noReviews", "Нет отзывов.")}</p>
                    )}
                </section>
            </div>
        </Navbar>
    );
};

export default CoursePage;
