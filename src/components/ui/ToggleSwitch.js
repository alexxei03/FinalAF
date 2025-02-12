import React from 'react';
import './css/ToggleSwitch.css';

const ToggleSwitch = ({ id, checked, onChange, label }) => {
    return (
        <div className="confirmation-toggle">
            <label className="switch">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={onChange}
                />
                <span className="slider round"></span>
            </label>
            <span className="slider-h2">{label}</span>
        </div>
    );
};

export default ToggleSwitch;
