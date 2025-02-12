import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/layout/Navbar/Navbar";
import InputFieldDB from "../../components/ui/InputFieldDB";
import ImageUploadField from "../../components/ui/ImageUploadField";
import BadgeAlert from "../../components/ui/BadgeAlert";
import './css/settings.css'
import { apiPatch, apiPost, apiGet } from "../../apiService";
import { API_BASE_URL } from "../../config";


const SettingsPage = () => {
  const { t } = useTranslation();

  // Дополнительные состояния для предзаполнения (ФИО, email)
  const [fullName, setFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Состояния
  const [activeTab, setActiveTab] = useState("account"); // account или security
  const [photo, setPhoto] = useState(null); // может быть File или URL
  const [phone, setPhone] = useState("");
  const [info, setInfo] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);

  // При монтировании страницы запрашиваем данные профиля
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiGet("/auth/profile/");
        // Предполагаем, что API возвращает: username, email, first_name, last_name, phone, info, photo
        const name = `${data.first_name} ${data.last_name}`.trim() || data.username;
        setFullName(name);
        setUserEmail(data.email);
        setPhone(data.phone || "");
        setInfo(data.info || "");
        if (data.photo) {
          // data.photo должен быть URL, который передается в ImageUploadField
          setPhoto(data.photo);
        }
      } catch (error) {
        console.error("Ошибка загрузки профиля", error);
      }
    };
    fetchProfile();
  }, []);

  // Валидация пароля
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&.]/.test(password);
    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  // Обработчик для формы настроек аккаунта
  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!phone.trim()) {
      newErrors.phone = t("settings.phoneRequired", "Пожалуйста, введите номер телефона.");
    } else {
      // Пример проверки: номер телефона должен начинаться с +7 и содержать ровно 11 символов (+ и 10 цифр)
      const phoneRegex = /^\+7\d{10}$/;
      if (!phoneRegex.test(phone)) {
        newErrors.phone = t(
          "settings.invalidPhone",
          "Неверный формат номера телефона. Пример: +71234567890"
        );
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Здесь должна быть логика отправки данных на сервер

    console.log("Account settings submitted:", { photo, phone, info });
    try {
      let responseData;
      if (photo) {
        // Если фото выбрано, используем FormData для отправки файла
        const formData = new FormData();
        formData.append("phone", phone);
        formData.append("info", info);
        formData.append("photo", photo);

        const response = await fetch(`${API_BASE_URL}/settings/`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            // Не устанавливаем Content-Type для FormData
          },
          body: formData,
        });
        responseData = await response.json();
      } else {
        // Если фото не выбрано, отправляем JSON
        const payload = { phone, info };
        responseData = await apiPatch("/settings/", payload);
      }
      console.log("Настройки обновлены:", responseData);
      setMessages([{ type: "success", text: t("settings.accountUpdated", "Настройки аккаунта обновлены.") }]);
    } catch (error) {
      console.error("Ошибка обновления настроек", error);
      setMessages([{ type: "error", text: t("settings.updateFailed", "Ошибка обновления настроек.") }]);
    }
  };

  // Обработчик для формы смены пароля
  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!oldPassword.trim()) {
      newErrors.oldPassword = t("settings.oldPasswordRequired", "Пожалуйста, введите старый пароль.");
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = t("settings.newPasswordRequired", "Пожалуйста, введите новый пароль.");
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword = t(
        "settings.passwordRequirements",
        "Пароль должен содержать: минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один специальный символ."
      );
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t("settings.passwordsMismatch", "Новый пароль и подтверждение не совпадают.");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Здесь должна быть логика смены пароля на сервере
    console.log("Security settings submitted:", { oldPassword, newPassword });
    try {
      const payload = { old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword };
      const responseData = await apiPost("/settings/change-password/", payload);
      console.log("Пароль успешно изменен:", responseData);
      setMessages([{ type: "success", text: t("settings.passwordUpdated", "Пароль успешно изменен.") }]);
      // Очистка полей смены пароля (при необходимости)
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Ошибка смены пароля", error);
      setMessages([{ type: "error", text: t("settings.changePasswordFailed", "Ошибка смены пароля.") }]);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessages([]);
  };

  return (
    <Navbar>
      <div className="profile-main-container">
        {/* Навигация */}
        <div className="profile-navigation">
          <button
            className={`profile-navigation-btn ${activeTab === "account" ? "active" : ""}`}
            onClick={() => handleTabChange("account")}
          >
            {t("settings.accountSettings", "Настройки аккаунта")}
          </button>
          <button
            className={`profile-navigation-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => handleTabChange("security")}
          >
            {t("settings.securitySettings", "Вход и Безопасность")}
          </button>
        </div>

        {/* Сообщения */}
        {messages.map((msg, idx) => (
          <BadgeAlert key={idx} type={msg.type} text={msg.text} />
        ))}

        {/* Форма настроек аккаунта */}
        {activeTab === "account" && (
          <form className="profile-form" onSubmit={handleAccountSubmit}>
            {/* Загрузка фото */}
            <div className="profile-photo-box">
              <ImageUploadField
                label={t("profile.photo3x4", "Ваше фото 3х4 в хорошем качестве")}
                placeholderText={t("register.uploadImageText", "Загрузите фото")}
                required
                file={photo}
                onFileChange={(e) => setPhoto(e.target.files[0])}
                errorMessage={errors.photo}
                t={t}
              />
            </div>

            {/* Поля ввода */}
            <div className="profile-data-box">
              <InputFieldDB
                label={t("settings.fullName", "Ваше ФИО")}
                type="text"
                value="Иванов Иван Иванович" // Пример данных
                disabled
                required
              />
              <InputFieldDB
                label="Email"
                type="email"
                value="example@example.com" // Пример данных
                disabled
                required
              />
              <InputFieldDB
                label={t("settings.phone", "Номер телефона")}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+71234567890"
                maxWidth='200px'
                error={errors.phone}
                required
              />
            </div>

            {/* Дополнительная информация */}
            <InputFieldDB
              label={t("settings.additionalInfo", "Дополнительная информация")}
              type="textarea"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder={t("settings.additionalInfoPlaceholder", "Информация о Вас")}
              rows='4'
              maxlength='500'
              maxWidth='700px'
            />

            {/* Кнопки */}
            <div className="profile-btn-box">
              <button type="submit" className="profile-btn-submit">
                {t("settings.save", "Сохранить")}
              </button>
            </div>
          </form>
        )}

        {/* Форма смены пароля */}
        {activeTab === "security" && (
          <form className="profile-form" onSubmit={handleSecuritySubmit}>
            <div className="profile-input-label">
              {t("settings.changePassword", "Сменить пароль")}
            </div>
            <div className="profile-data-box">
              <InputFieldDB
                label={t("settings.oldPassword", "Старый пароль")}
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder={t("settings.oldPasswordPlaceholder", "Старый пароль")}
                error={errors.oldPassword}
                required
              />
              <InputFieldDB
                label={t("settings.newPassword", "Новый пароль")}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t("settings.newPasswordPlaceholder", "Новый пароль")}
                error={errors.newPassword}
                required
              />
              <InputFieldDB
                label={t("settings.confirmPassword", "Повторите новый пароль")}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("settings.confirmPasswordPlaceholder", "Новый пароль")}
                error={errors.confirmPassword}
                required
              />
            </div>

            {/* Кнопки */}
            <div className="profile-btn-box">
              <button type="submit" className="profile-btn-submit">
                {t("settings.save", "Сохранить")}
              </button>
            </div>
          </form>
        )}
      </div>
    </Navbar>
  );
};

export default SettingsPage;