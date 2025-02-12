import React from 'react';
import './css/ValidationChecker.css';

const ValidationChecker = ({ isValid, message, show }) => {
    if (!show) return null;
    return (
        <div className="form-checker" style={{ display: 'flex' }}>
            {isValid ? <img className="success-form-check" src="/img/forms/success.svg" alt="Success" /> : <img className="danger-form-check" src="/img/forms/danger.svg" alt="Danger" />}
            <div className="form-checker-text">{message}</div>
        </div>
    );
};

export default ValidationChecker;
