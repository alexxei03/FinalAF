import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import { apiGet } from "../../apiService";
import "./css/CourseList.css";


const CourseList = ({ searchQuery, filters, sortOption }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await apiGet("/courses/");
        setCourses(data);
      } catch (error) {
        console.error("Ошибка загрузки курсов:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  let filteredCourses = courses.filter((course) => {
    const matchTitle = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = filters.category ? course.category === filters.category : true;
    const matchPrice = filters.price === "free" ? parseFloat(course.price) === 0 : true;
    return matchTitle && matchCategory && matchPrice;
  });

  if (sortOption === "price") {
    filteredCourses.sort((a, b) => a.price - b.price);
  } else if (sortOption === "popularity") {
    filteredCourses.sort((a, b) => b.popularity - a.popularity);
  }

  return (
    <div className="course-list">
      {loading ? (
        <p>...</p>
      ) : filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))
      ) : (
        <p className="no-courses">Курсы не найдены.</p>
      )}
    </div>
  );
};

export default CourseList;
