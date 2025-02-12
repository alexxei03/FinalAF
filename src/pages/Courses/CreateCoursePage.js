import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/layout/Navbar/Navbar";
import InputFieldDB from "../../components/ui/InputFieldDB";
import ImageUploadField from "../../components/ui/ImageUploadField";
import ToggleSwitch from "../../components/ui/ToggleSwitch";
import ValidationChecker from "../../components/ui/ValidationChecker";
import CustomSelect from "../../components/ui/CustomSelect";
import BadgeAlert from "../../components/ui/BadgeAlert";
import './css/CreateCoursePage.css'
import { API_BASE_URL } from "../../config";

const CreateCoursePage = () => {
  const { t } = useTranslation();

  const [coverImage, setCoverImage] = useState(null);
  const [courseTitle, setCourseTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [certification, setCertification] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const categories = {
    programming: t("categories.programming", "Программирование"),
    design: t("categories.design", "Дизайн"),
    marketing: t("categories.marketing", "Маркетинг"),
    business: t("categories.business", "Бизнес"),
    languages: t("categories.languages", "Иностранные языки"),
    science: t("categories.science", "Наука"),
    other: t("categories.other", "Другое"),
  };

  const validateForm = () => {
    let newErrors = {};

    if (!courseTitle.trim()) newErrors.courseTitle = t("errors.courseTitle", "Введите название курса");
    if (!duration.trim() || isNaN(duration) || duration <= 0)
      newErrors.duration = t("errors.duration", "Введите корректную продолжительность (часы)");
    if (!description.trim()) newErrors.description = t("errors.description", "Добавьте описание курса");
    if (!category) newErrors.category = t("errors.category", "Выберите категорию");
    if (!price.trim() || isNaN(price) || price < 0) newErrors.price = t("errors.price", "Введите корректную цену");

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const formData = new FormData();
    formData.append("title", courseTitle);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("certification", certification);
    if (coverImage) {
      formData.append("image", coverImage);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/courses/create/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage(t("messages.courseCreated", "Курс успешно создан!"));
        setCourseTitle("");
        setDuration("");
        setCertification(false);
        setDescription("");
        setCategory("");
        setPrice("");
        setCoverImage(null);
      } else {
        const errorData = await response.json();
        setErrors(errorData);
        setErrorMessage(t("messages.courseError", "Возникла ошибка при создании курса."));
      }
    } catch (error) {
      setErrorMessage(t("messages.courseError", "Возникла ошибка при создании курса."));
      console.error("Ошибка при создании курса:", error);
    }
  };

  return (
    <Navbar>
      <div className="create-course-container">
        <div className="create-course-h1-box">
          <div className="create-course-h1">{t("createCourse.title", "Создание нового курса")}</div>
        </div>

        {/* Сообщения */}
        {successMessage &&
          <BadgeAlert type={'success'} text={successMessage} />
        }


        {errorMessage &&
          <BadgeAlert type={'error'} text={errorMessage} />
        }

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <ImageUploadField
              label={t("createCourse.uploadImageLavel", "Обложка курса")}
              file={coverImage}
              onFileChange={(e) => setCoverImage(e.target.files[0])}
              t={t}
              showPreview2={false}
              widthPreview1="400px"
              required
            />
          </div>

          <InputFieldDB
            label={t("createCourse.courseTitle", "Название курса")}
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
            maxWidth='800px'
            error={errors.courseTitle}
          />

          <div className="create-course-flex-container">
            <InputFieldDB
              label={t("createCourse.duration", "Продолжительность (часы)")}
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              maxWidth='100px'
              error={errors.duration}
            />

            <InputFieldDB
              label={t("createCourse.price", "Цена (₸)")}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              maxWidth='100px'
              error={errors.price}
            />
          </div>

          <InputFieldDB
            label={t("createCourse.description", "Описание курса")}
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxWidth='800px'
            error={errors.description}
            rows="4"
          />

          <CustomSelect
            label={t("createCourse.category", "Категория курса")}
            classLabel='custom-input-db-label'
            defaultText={t("createCourse.selector", "Категория курса")}
            selected={categories[category] || ""}
            options={categories}
            onSelect={(key) => setCategory(key)}
            required
            t={t}
          />
          {errors.category && <div className="custom-error">{errors.category}</div>}

          <ToggleSwitch
            id="certification"
            checked={certification}
            onChange={() => setCertification(!certification)}
            label={t("createCourse.certification", "Сертификация курса")}
          />

          <ValidationChecker
            isValid={Object.keys(errors).length === 0}
            message={t("errors.fillAllFields", "Заполните все обязательные поля")}
            show={true}
          />


          <div className="create-course-btn-box">
            <button type="submit" className="create-course-btn">
              {t("createCourse.submit", "Создать курс")}
            </button>
          </div>
        </form>
      </div>
    </Navbar>
  );
};

export default CreateCoursePage;
