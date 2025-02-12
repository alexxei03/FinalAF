import React, { useState, useEffect, useRef } from "react";
import RequiredMarker from "../../components/ui/RequiredMarker";
import "./css/ImageUploadField.css";

const ImageUploadField = ({
    file,
    onFileChange,
    errorMessage,
    required,
    label,
    placeholderText,
    classLabel,
    showPreview2 = true,
    widthPreview1 = "150px",
    t
}) => {
    const [previewUrl, setPreviewUrl] = useState("");
    const uploadRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (file) {
            if (typeof file === "string") {
                setPreviewUrl(file);
            } else {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreviewUrl(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setPreviewUrl("");
        }
    }, [file]);

    const handleDragOver = (e) => {
        e.preventDefault();
        if (uploadRef.current) {
            uploadRef.current.classList.add("active");
        }
    };

    const handleDragLeave = () => {
        if (uploadRef.current) {
            uploadRef.current.classList.remove("active");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (uploadRef.current) {
            uploadRef.current.classList.remove("active");
        }
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            onFileChange({ target: { files: droppedFiles } });
        }
    };

    return (
        <>
            <div className={`${classLabel || 'custom-input-db-label'} upload-image-margin-bottom`}>{label || 'Загрузите изображение'} {required && <RequiredMarker />}</div>
            <div className="image-upload-container">
                {/* Если превью отсутствует – показываем область для загрузки */}
                {!previewUrl && (
                    <div
                        className="image-upload-box"
                        ref={uploadRef}
                        style={{ width: widthPreview1 }}
                        onClick={() => inputRef.current && inputRef.current.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="image-upload-inner">
                            <img className="image-upload-icon" src="/img/forms/fileupload.svg" alt="" />
                            <div className="image-upload-text">
                                {placeholderText || t("forms.uploadImageText", "Изображение")}
                            </div>
                        </div>
                    </div>
                )}
                {/* Элемент input всегда отрендерен, но скрыт через CSS */}
                <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="image-input"
                    onChange={onFileChange}
                    ref={inputRef}
                />
            </div>
            {/* Если превью существует – показываем его */}
            {previewUrl && (
                <div className="image-preview-box">
                    <img
                        className="preview-image"
                        src={previewUrl}
                        alt="Preview"
                        style={{ width: widthPreview1 }}
                        onClick={() => inputRef.current && inputRef.current.click()}
                    />
                    {showPreview2 && (
                        <img
                            className="preview-image2"
                            src={previewUrl}
                            alt="Preview Thumbnail"
                            onClick={() => inputRef.current && inputRef.current.click()}
                        />
                    )}
                </div>
            )}
            {errorMessage && <div className="image-error">{errorMessage}</div>}
        </>
    );
};

export default ImageUploadField;
