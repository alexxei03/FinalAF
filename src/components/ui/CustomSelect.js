import React, { useState, useEffect, useRef } from 'react';
import RequiredMarker from "../../components/ui/RequiredMarker";
import './css/CustomSelect.css';

const CustomSelect = ({
    label,
    defaultText,
    selected,
    options,
    onSelect,
    classLabel,
    required,
    t
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectWrapperRef = useRef(null);

    const toggleOptions = (e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (key) => {
        onSelect(key);
        setIsOpen(false);
    };

    const handleClickOutside = (e) => {
        if (selectWrapperRef.current && !selectWrapperRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="custom-select-wrapper" ref={selectWrapperRef}>
            <div className={`${classLabel || 'form-hite'}`}>{label} {required && <RequiredMarker />} </div>
            <div className="custom-select">
                <div className="selected-option" onClick={toggleOptions}>
                    {selected || defaultText || t('selector.selectText', 'Выберите')}
                    <svg
                        className="arrow"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                    >
                        <path
                            d="M4.75 7.125L9.5 11.875L14.25 7.125"
                            stroke="#2655FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                {isOpen && (
                    <ul className="options">
                        {Object.keys(options).map((key) => (
                            <li className="select-option" key={key} onClick={() => handleOptionClick(key)}>
                                {options[key]}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <input type="hidden" name="role" value={selected} />
        </div>
    );
};

export default CustomSelect;
