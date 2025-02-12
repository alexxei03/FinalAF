import React from 'react';
import './css/CheckboxField.css';

const CheckboxField = ({ id, checked, onChange, label, link, linkText }) => (
    <div className="confirm-block">
        <input type="checkbox" className="confirm-checkbox" id={id} checked={checked} onChange={onChange} required />
        <label className="confirm-text" htmlFor={id}>
            {label}{' '}
            {link && (
                <a href={link} target="_blank" rel="noreferrer" style={{ color: '#2655FF' }}>
                    {linkText}
                </a>
            )}
        </label>
    </div>
);

export default CheckboxField;
