import React from 'react';
import CookieConsent from 'react-cookie-consent';
import * as styles from './milvusCookieConsent.module.less';

const MilvusCookieConsent = () => {

  return (
    <CookieConsent
      buttonText="Accept"
      disableStyles
      containerClasses={styles.cookieContainer}
      buttonClasses={styles.button}
      buttonWrapperClasses={styles.buttonWrapper}
      expires={150}
    >
      <div className={styles.textContainer}>
        <p className={styles.headerContent}>How we use cookies</p>
        <p className={styles.textContent}>
          This website stores cookies on your computer. By continuing to browse or by clicking ‘Accept’, you agree to the storing of cookies on your device to enhance your site experience and for analytical purposes.
        </p>
      </div>
    </CookieConsent>
  );
};

export default MilvusCookieConsent;
