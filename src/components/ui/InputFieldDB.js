import React from "react";
import RequiredMarker from "./RequiredMarker";
import './css/InputFieldDB.css';

const CustomInputField = ({
    label,
    type = "text",
    id,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    cols,
    rows,
    maxlength,
    maxWidth,
    error,
}) => {
    const inputStyle = maxWidth ? { maxWidth: maxWidth } : {};

    return (
        <div className="custom-input-db-block">
            {label && (
                <label className="custom-input-db-label" htmlFor={id}>
                    {label} {required && <RequiredMarker />}
                </label>
            )}
            {type === "textarea" ? (
                <textarea
                    className={`custom-input-db ${error ? "custom-input-db-error" : ""}`}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    cols={cols}
                    rows={rows}
                    maxLength={maxlength}
                    style={inputStyle}
                />
            ) : (
                <input
                    className={`custom-input-db ${error ? "custom-input-db-error" : ""}`}
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    style={inputStyle}
                />
            )}
            {error && <div className="custom-error">{error}</div>}
        </div>
    );
};

export default CustomInputField;
