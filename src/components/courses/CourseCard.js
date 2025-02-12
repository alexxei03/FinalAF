import React from "react";
import "./css/CourseCard.css";

const CourseCard = ({ course }) => {
  const courseUrl = `/courses/${course.link || course.id}`;
  return (
    <div className="course-card">
      <img src={course.image || "/img/default/course.png"} alt={course.title} className="course-image" />
      <div className="course-info">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-mentor">{course.mentor}</p>
        <div className="course-footer">
          <span className="course-price">{course.price <= 0 ? "Бесплатно" : `${course.price}₸`}</span>
          <a href={courseUrl} className="course-link">Подробнее</a>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
