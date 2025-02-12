import React from 'react';
import './css/InputField.css';
import RequiredMarker from "../../components/ui/RequiredMarker";

const InputField = ({
    label,
    type = 'text',
    id,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    valid
}) => {
    const shouldApplyStyles = valid !== undefined && value.trim() !== "";

    const inputStyle = shouldApplyStyles
        ? { border: `2px solid ${valid ? '#13C525' : '#F13D3D'}`, background: valid ? '#F6FFEC' : '#FFF0F0' }
        : {};

    return (
        <div className="input-block">
            {label &&
                <label className="form-hite" htmlFor={id}>
                    {label} {required && <RequiredMarker />}
                </label>}
            <input
                className="input"
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                style={inputStyle}
            />
        </div>
    );
};

export default InputField;
