import React from 'react';
import { Download, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import './css/CertificateCard.css';

const CertificateCard = ({ certificate }) => {
    const { t } = useTranslation();

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = certificate.file;
        link.download = certificate.title;
        link.click();
    };

    const handleOpen = () => {
        window.open(certificate.file, '_blank');
    };

    return (
        <div className="certificate-card">
            <div className="certificate-info">
                <h3 className="certificate-title">{certificate.title}</h3>
                <p className="certificate-date">{t("certificates.issueDate", "Дата выдачи")}: {certificate.date}</p>
            </div>
            <div className="certificate-actions">
                <button onClick={handleDownload} className="certificate-button">
                    <Download size={18} /> {t("certificates.download", "Скачать")}
                </button>
                <button onClick={handleOpen} className="certificate-button open-btn">
                    <ExternalLink size={18} /> {t("certificates.open", "Открыть")}
                </button>
            </div>
        </div>
    );
};

export default CertificateCard;
