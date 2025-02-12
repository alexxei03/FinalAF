import React from "react";
import { useTranslation } from "react-i18next";
import CustomSelect from "../../components/ui/CustomSelect";
import "./css/CourseFilters.css";

const CourseFilters = ({ filters, setFilters, sortOption, setSortOption }) => {
  const { t } = useTranslation();

  // Определяем отображаемое название для выбранных фильтров
  const categoryOptions = {
    "": t("filters.allCategories", "Все категории"),
    programming: t("categories.programming", "Программирование"),
    design: t("categories.design", "Дизайн"),
    marketing: t("categories.marketing", "Маркетинг"),
    business: t("categories.business", "Бизнес"),
    languages: t("categories.languages", "Иностранные языки"),
    science: t("categories.science", "Наука"),
    other: t("categories.other", "Другое"),
  };

  const priceOptions = {
    all: t("filters.allPrices", "Любая цена"),
    free: t("filters.free", "Бесплатные"),
  };

  return (
    <div className="filters-container">
      {/* Категория курса */}
      <CustomSelect
        defaultText={t("filters.allCategories", "Все категории")}
        selected={categoryOptions[filters.category] || t("filters.allCategories", "Все категории")}
        options={categoryOptions}
        onSelect={(value) => setFilters({ ...filters, category: value })}
        classLabel="filter-label"
      />

      {/* Фильтр по цене */}
      <CustomSelect
        defaultText={t("filters.allPrices", "Любая цена")}
        selected={priceOptions[filters.price] || t("filters.allPrices", "Любая цена")}
        options={priceOptions}
        onSelect={(value) => setFilters({ ...filters, price: value })}
        classLabel="filter-label"
      />
    </div>
  );
};

export default CourseFilters;
