import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/layout/Navbar/Navbar";
import CertificateCard from "../../components/courses/CertificateCard";
import './css/CertificatesPage.css'

const certificatesData = [
    {
        id: 1,
        title: 'Сертификат по React',
        date: '2025-01-15',
        file: '/files/default/certificate.pdf',
    },
    {
        id: 2,
        title: 'Сертификат по Node.js',
        date: '2024-12-10',
        file: '/files/default/certificate.pdf',
    },
    {
        id: 3,
        title: 'Сертификат по UX/UI дизайну',
        date: '2024-11-22',
        file: '/files/default/certificate.pdf',
    }
];

const CertificatesPage = () => {
    const { t } = useTranslation();

    return (
        <Navbar>
            <div className="certificates-page-container">
                <h2 className="page-title">{t("certificates.myCertificates", "Мои сертификаты")}</h2>
                <div className="certificates-list">
                    {certificatesData.length > 0 ? (
                        certificatesData.map((certificate) => (
                            <CertificateCard key={certificate.id} certificate={certificate} />
                        ))
                    ) : (
                        <p className="no-certificates">{t("certificates.noCertificates", "У вас пока нет сертификатов.")}</p>
                    )}
                </div>
            </div>
        </Navbar>
    );
};

export default CertificatesPage;
