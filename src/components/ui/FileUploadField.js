import React, { useEffect, useRef } from 'react';
import './css/FileUploadField.css';

const FileUploadField = ({ file, onFileChange, errorMessage, t }) => {
    const fileUploadRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fileUpload = fileUploadRef.current;

        const handleDragOver = (e) => {
            e.preventDefault();
            fileUpload.classList.add('active');
        };

        const handleDragLeave = () => {
            fileUpload.classList.remove('active');
        };

        const handleDrop = (e) => {
            e.preventDefault();
            fileUpload.classList.remove('active');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                onFileChange({ target: { files } });
            }
        };

        fileUpload.addEventListener('dragover', handleDragOver);
        fileUpload.addEventListener('dragleave', handleDragLeave);
        fileUpload.addEventListener('drop', handleDrop);

        return () => {
            fileUpload.removeEventListener('dragover', handleDragOver);
            fileUpload.removeEventListener('dragleave', handleDragLeave);
            fileUpload.removeEventListener('drop', handleDrop);
        };
    }, [onFileChange]);

    return (
        <>
            <div className="file-upload" ref={fileUploadRef} onClick={() => fileInputRef.current.click()}>
                <div className="file-upload-inner">
                    <img className="file-upload-img" src="/img/forms/fileupload.svg" alt="Upload" />
                    <div className="file-upload-text">
                        {file ? file.name : t('register.uploadConfirmationDocumentsText', 'Загрузите подтверждающие документы (.zip)')}
                    </div>
                </div>
                <input type="file" className="file-input" accept=".zip" name="documents" onChange={onFileChange} ref={fileInputRef} />
            </div>
            {file && (
                <div className="form-checker" id="form-checker2" style={{ display: 'flex' }}>
                    {file && !errorMessage ? <img className="success-form-check" src="/img/forms/success.svg" alt="Success" /> : <img className="danger-form-check" src="/img/forms/danger.svg" alt="Danger" />}
                    <div className="form-checker-text">{file && !errorMessage ? t('register.fileUploadedText', 'Файл загружен') : errorMessage}</div>
                </div>
            )}
        </>
    );
};

export default FileUploadField;
