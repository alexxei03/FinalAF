import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar/Navbar";
import CourseList from "../../components/courses/CourseList";
import CourseFilters from "../../components/courses/CourseFilters";
import SearchBar from "../../components/courses/SearchBar";
import './css/CourseListPage.css'

const CoursesListPage = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("popularity");
  const [filters, setFilters] = useState({ category: "", price: "all" });

  return (
    <Navbar>
      <div className="courses-page-container">
        {/* Заголовок */}
        <h2 className="page-title">Каталог курсов</h2>

        {/* Фильтры и поиск */}
        <div className="courses-controls">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CourseFilters filters={filters} setFilters={setFilters} setSortOption={setSortOption} />
        </div>

        {/* Список курсов */}
        <CourseList searchQuery={searchQuery} filters={filters} sortOption={sortOption} />
      </div>
    </Navbar>
  );
};

export default CoursesListPage;
