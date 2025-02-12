import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import CustomSelect from '../ui/CustomSelect';
import FileUploadField from '../ui/FileUploadField';
import InputField from '../ui/InputField';
import ValidationChecker from '../ui/ValidationChecker';
import CheckboxField from '../ui/CheckboxField';
import { apiPost } from '../../apiService';


const RegisterForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Состояния формы
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [role, setRole] = useState('');
    const [file, setFile] = useState(null);
    const [isFullnameValid, setIsFullnameValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isFileValid, setIsFileValid] = useState(false);
    const [isRoleSelected, setIsRoleSelected] = useState(false);
    const [isCheckbox1Checked, setIsCheckbox1Checked] = useState(false);
    const [isCheckbox2Checked, setIsCheckbox2Checked] = useState(false);
    // Флаг для показа поля загрузки файла (только для менторов)
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [fileErrorMessage, setFileErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [error, setError] = useState(null);

    const roles = {
        mentor: t('register.mentor'),
        student: t('register.student'),
    };

    // Валидация email
    const validateEmail = (email) => {
        const pattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email);
    };

    // Проверка сложности пароля
    const isStrongPassword = (password) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (password.length === 0) {
            setPasswordErrorMessage('');
            return false;
        }
        if (password.length < minLength) {
            setPasswordErrorMessage(
                t('register.passwordTooShort', 'Пароль должен содержать минимум 8 символов.')
            );
            return false;
        }
        if (!hasUppercase) {
            setPasswordErrorMessage(
                t('register.passwordNeedsUppercase', 'Пароль должен содержать хотя бы одну заглавную букву.')
            );
            return false;
        }
        if (!hasLowercase) {
            setPasswordErrorMessage(
                t('register.passwordNeedsLowercase', 'Пароль должен содержать хотя бы одну строчную букву.')
            );
            return false;
        }
        if (!hasNumber) {
            setPasswordErrorMessage(
                t('register.passwordNeedsNumber', 'Пароль должен содержать хотя бы одну цифру.')
            );
            return false;
        }
        setPasswordErrorMessage('');
        return true;
    };

    // Обработчики инпутов
    const handleFullnameChange = (e) => {
        const fullnameValue = e.target.value;
        const fullnamePattern = /^[A-Za-zА-Яа-яӘәІіҢңҒғҚқӨөҰұҮүҺһ\s]+$/;

        setFullname(fullnameValue);
        setIsFullnameValid(fullnamePattern.test(fullnameValue));
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setIsEmailValid(validateEmail(emailValue));
    };

    const handlePasswordChange = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);

        const isValid = isStrongPassword(passwordValue);
        setIsPasswordValid(isValid);

        if (isValid && passwordValue !== repeatPassword) {
            setPasswordErrorMessage(
                t('register.passwordMismatch', 'Пароли не совпадают.')
            );
            setIsPasswordValid(false);
        }
    };

    const handleRepeatPasswordChange = (e) => {
        const repeatPasswordValue = e.target.value;
        setRepeatPassword(repeatPasswordValue);

        if (repeatPasswordValue !== password) {
            setPasswordErrorMessage(
                t('register.passwordMismatch', 'Пароли не совпадают.')
            );
            setIsPasswordValid(false);
        } else {
            setPasswordErrorMessage('');
            setIsPasswordValid(isStrongPassword(password));
        }
    };

    // Обработчик выбора файла
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (role === roles.mentor) {
            if (selectedFile) {
                const isValidFormat = selectedFile.name.endsWith('.zip');
                const isValidSize = selectedFile.size <= 50 * 1024 * 1024; // 50MB

                setFile(selectedFile);
                setIsFileValid(isValidFormat && isValidSize);

                if (!isValidFormat) {
                    setFileErrorMessage(
                        t('register.invalidFileFormatText', 'Поддерживается только формат архивов (.zip)')
                    );
                } else if (!isValidSize) {
                    setFileErrorMessage(
                        t('register.fileTooLargeText', 'Файл слишком велик. Максимальный размер — 50MB.')
                    );
                } else {
                    setFileErrorMessage('');
                }
            } else {
                setFile(null);
                setIsFileValid(false);
                setFileErrorMessage(
                    t('register.noFileSelectedText', 'Файл не выбран.')
                );
            }
        }
    };

    // Обработчики чекбоксов
    const handleCheckbox1Change = (e) => {
        setIsCheckbox1Checked(e.target.checked);
    };

    const handleCheckbox2Change = (e) => {
        setIsCheckbox2Checked(e.target.checked);
    };

    // Обработчик выбора роли через кастомный селектор
    const handleRoleSelect = (selectedRole) => {
        if (selectedRole === 'mentor') {
            setRole(roles.mentor);
            setShowFileUpload(true); // Показываем поле загрузки файла для менторов
        } else if (selectedRole === 'student') {
            setRole(roles.student);
            setShowFileUpload(false);
            setFile(null);
            setIsFileValid(true); // Для не-менторов поле загрузки файла не требуется
        }
        setIsRoleSelected(true);
    };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            isFullnameValid &&
            isEmailValid &&
            isPasswordValid &&
            isFileValid &&
            isRoleSelected &&
            isCheckbox1Checked &&
            isCheckbox2Checked
        ) {
            // Разбиваем fullname на first_name и last_name (если возможно)
            const nameParts = fullname.split(" ");
            const payload = {
                username: fullname, // или можно использовать email как username
                email,
                password,
                password2: repeatPassword,
                first_name: nameParts[0],
                last_name: nameParts.slice(1).join(" "),
            };

            try {
                const response = await apiPost("/auth/register/", payload);
                if (response.email) {
                    // Регистрация успешна, можно перенаправить на логин
                    navigate("/login");
                    console.log('Пользователь создан успешно.')
                } else {
                    // Обработка ошибок от сервера
                    setError(t('login.error', 'Ошибка регистрации.'));
                    console.error("Ошибка регистрации:", response);
                }
            } catch (error) {
                setError(t('login.error', 'Ошибка регистрации.'));
                console.error("Ошибка регистрации:", error);
            }
        } else {
            setError(t('login.error', 'Валидация не пройдена.'));
            console.log("Валидация не пройдена");
        }
    };

    return (
        <div className="container-createacc">
            <form className="form" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}

                {/* Поле "ФИО" */}
                <InputField
                    label={t('register.fullname', 'ФИО')}
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={handleFullnameChange}
                    placeholder={t('register.fullname', 'ФИО')}
                    required
                    valid={isFullnameValid}
                />
                <ValidationChecker
                    isValid={isFullnameValid}
                    message={
                        isFullnameValid
                            ? t('register.fullnameAcceptedText', 'ФИО принято.')
                            : t('register.fullnameRejectedText', 'Заполните свое ФИО корректно.')
                    }
                    show={!!fullname}
                />

                {/* Поле email */}
                <InputField
                    label="E-mail"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="example@gmail.com"
                    required
                    valid={isEmailValid}
                />
                <ValidationChecker
                    isValid={isEmailValid}
                    message={
                        isEmailValid
                            ? t('register.emailAcceptedText', 'Почта принята')
                            : t('register.emailRejectedText', 'Неправильный формат адреса электронной почты')
                    }
                    show={!!email}
                />

                {/* Поля ввода пароля */}
                <div className="passw-cntr">
                    <InputField
                        label={t('register.password', 'Пароль')}
                        type="password"
                        id="new-password"
                        name="password1"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder={t('register.passwordPlaceholder', 'Придумайте пароль')}
                        required
                        valid={isPasswordValid}
                    />
                    <InputField
                        label={t('register.repeatPassword', 'Повторите пароль')}
                        type="password"
                        id="repeat-password"
                        name="password2"
                        value={repeatPassword}
                        onChange={handleRepeatPasswordChange}
                        placeholder={t('register.repeatPasswordPlaceholder', 'Повторите пароль')}
                        required
                        valid={isPasswordValid}
                    />
                </div>
                <ValidationChecker
                    isValid={isPasswordValid}
                    message={
                        passwordErrorMessage ||
                        t('register.passwordMatchRequirementsText', 'Пароли совпадают и соответствуют требованиям')
                    }
                    show={!!(password || repeatPassword)}
                />

                {/* Кастомный селектор выбора роли */}
                <CustomSelect
                    label={t('register.role', 'Роль')}
                    defaultText={t('register.selectRole', 'Выберите роль')}
                    selected={role}
                    options={roles}
                    onSelect={handleRoleSelect}
                    t={t}
                />

                {/* Поле загрузки файла – отображается только для менторов */}
                {showFileUpload && (
                    <FileUploadField
                        file={file}
                        onFileChange={handleFileChange}
                        errorMessage={fileErrorMessage}
                        t={t}
                    />
                )}

                {/* Чекбоксы */}
                <CheckboxField
                    id="usage_rules"
                    checked={isCheckbox1Checked}
                    onChange={handleCheckbox1Change}
                    label={t('register.usageRulesText', 'Я ознакомлен с')}
                    link="/usage_rules"
                    linkText={t('register.usageRulesLink', 'условиями использования')}
                />
                <CheckboxField
                    id="privacy_policy"
                    checked={isCheckbox2Checked}
                    onChange={handleCheckbox2Change}
                    label={t('register.privacyPolicyText', 'Я ознакомлен с')}
                    link="/privacy_policy"
                    linkText={t('register.privacyPolicyLink', 'политикой конфиденциальности')}
                />

                <input
                    type="submit"
                    className="send-form-btn"
                    value={t('register.submitButton', 'Создать аккаунт')}
                    id="submit_btn"
                    disabled={
                        !(
                            isFullnameValid &&
                            isEmailValid &&
                            isPasswordValid &&
                            isFileValid &&
                            isRoleSelected &&
                            isCheckbox1Checked &&
                            isCheckbox2Checked
                        )
                    }
                />
            </form>
            <div className="dne">
                <div className="dne-txt1">
                    {t('register.alreadyHaveAccount', 'Уже есть аккаунт?')}{' '}
                    <Link to="/login" className="dne-txt2">
                        {t('register.loginLink', 'Войти')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
