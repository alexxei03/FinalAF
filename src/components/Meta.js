import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Meta = () => {
  const { t } = useTranslation();

  return (
    <Helmet>
      <title>BlockchainStudy</title>
      <meta 
        name="description" 
        content={t(
          'landing.metaDescription',
          'BlockchainStudy — инновационная образовательная платформа на базе блокчейна. Сертифицированные курсы и интерактивные лекции.'
        )}
      />
      <meta 
        name="keywords" 
        content={t(
          'landing.metaKeywords',
          'Blockchain, образовательная платформа, онлайн курсы, блокчейн технологии, квалифицированное обучение, цифровые сертификаты, blockchain study, blockchainstudy tech, blockchainstudy'
        )}
      />
      <link 
        rel="icon" 
        type="image/png" 
        sizes="16x16" 
        href={`${process.env.PUBLIC_URL}/img/logo/favicon4.png`} 
      />
    </Helmet>
  );
};

export default Meta;
