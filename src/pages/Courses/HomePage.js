import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/layout/Navbar/Navbar";
import CourseCard from "../../components/courses/CourseCard";
import StatisticsChart from "../../components/courses/StatisticsChart";
import { apiGet } from "../../apiService";
import "./css/HomePage.css";

const HomePage = () => {
    const { t } = useTranslation();
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendedCourses = async () => {
            try {
                // Эндпоинт для получения рекомендуемых курсов (реализуйте его на бэкенде)
                const data = await apiGet("/courses");
                setRecommendedCourses(data);
            } catch (error) {
                console.error("Ошибка загрузки рекомендуемых курсов:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendedCourses();
    }, []);

    return (
        <Navbar>
            <div className="homepage-container">
                {/* Заголовок */}
                <h1 className="homepage-title">
                    {t("homepage.welcome", "Добро пожаловать на платформу обучения!")}
                </h1>
                <p className="homepage-subtitle">
                    {t("homepage.subtitle", "Изучайте новые навыки, отслеживайте прогресс и получайте сертификаты.")}
                </p>

                {/* Статистика */}
                <div className="statistics-container">
                    <StatisticsChart />
                </div>

                {/* Рекомендуемые курсы */}
                <h2 className="homepage-section-title">
                    {t("homepage.recommendedCourses", "Рекомендуемые курсы")}
                </h2>
                <div className="courses-list">
                    {loading ? (
                        <p>{t("homepage.loading", "Загрузка...")}</p>
                    ) : recommendedCourses.length > 0 ? (
                        recommendedCourses.slice(0, 3).map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))
                    ) : (
                        <p>{t("homepage.noCourses", "Рекомендуемые курсы не найдены.")}</p>
                    )}
                </div>
            </div>
        </Navbar>
    );
};

export default HomePage;
