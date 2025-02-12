import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import InputField from '../ui/InputField';
import ToggleSwitch from '../ui/ToggleSwitch';

const LoginForm = ({ onLogin }) => {
    const { t } = useTranslation();
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await onLogin({ username, password });
        } catch (err) {
            setError(t('login.error', 'Ошибка входа. Проверьте данные.'));
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}

            <InputField
                label="Username"
                type="text"
                id="email"
                name="username"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username"
                required
            />

            <InputField
                label={t('login.password', 'Пароль')}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.placeholder', 'Ваш пароль')}
                required
            />

            <div className="btm">
                <ToggleSwitch
                    id="remember_me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    label={t('login.rememberMe', 'Запомнить меня')}
                />
                <div className="forgot-passw">
                    <Link to="/password-reset" className="sct1-h2">
                        {t('login.forgotPassword', 'Забыли пароль?')}
                    </Link>
                </div>
            </div>

            <button type="submit" className="send-form-btn">
                {t('login.submit', 'Войти')}
            </button>

            <div className="dne">
                <span className="dne-txt1">
                    {t('login.noAccount', 'Нет аккаунта?')}{' '}
                    <Link to="/register" className="dne-txt2">
                        {t('login.create', 'Создать')}
                    </Link>
                </span>
            </div>
        </form>
    );
};

export default LoginForm;
