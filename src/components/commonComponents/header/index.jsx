import React, { useState, useRef, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import GitHubButton from '../githubButton';
import { getGithubStatis } from '../http';
import * as styles from './index.module.less';

const MilvusLogo = () => (
  <svg
    width="148"
    height="35"
    viewBox="0 0 148 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35.2688 5.48219C28.6499 -1.16073 17.9169 -1.16073 11.298 5.48219L0.479631 16.3395C-0.159877 16.9821 -0.159877 18.0166 0.479631 18.6591L11.298 29.5165C17.9169 36.1594 28.6499 36.1594 35.2688 29.5274C41.8984 22.8953 41.8984 12.1251 35.2688 5.48219ZM32.7108 26.3366C27.8505 31.2153 19.9633 31.2153 15.103 26.3366L7.14117 18.3542C6.67219 17.8859 6.67219 17.1236 7.14117 16.6445L15.0924 8.67297C19.9526 3.79423 27.8399 3.79423 32.7001 8.67297C37.5711 13.5517 37.5711 21.4579 32.7108 26.3366Z"
      fill="#4FC4F9"
    />
    <path
      d="M49.4444 16.3503L44.6801 11.4825C44.3923 11.1884 43.9126 11.4607 44.0086 11.8636C44.8293 15.5771 44.8293 19.454 44.0086 23.1675C43.9233 23.5704 44.4029 23.8317 44.6801 23.5486L49.4444 18.6808C50.0732 18.0274 50.0732 16.9928 49.4444 16.3503Z"
      fill="#4FC4F9"
    />
    <path
      d="M23.9589 26.0426C28.568 26.0426 32.3044 22.2249 32.3044 17.5157C32.3044 12.8064 28.568 8.98877 23.9589 8.98877C19.3497 8.98877 15.6133 12.8064 15.6133 17.5157C15.6133 22.2249 19.3497 26.0426 23.9589 26.0426Z"
      fill="#4FC4F9"
    />
    <path
      d="M59.4219 16.0124C59.4219 15.1055 59.5749 14.3237 59.881 13.667C60.1871 13.0102 60.6155 12.4474 61.1665 11.9783C61.7174 11.5092 62.3602 11.1652 63.0947 10.9463C63.8293 10.7274 64.6557 10.6023 65.5127 10.6023C66.5839 10.6023 67.5327 10.7899 68.3897 11.1652C69.2161 11.5405 69.9201 12.0408 70.4404 12.6975C70.9607 12.0408 71.6341 11.5405 72.4605 11.1652C73.2869 10.7899 74.2357 10.6023 75.3069 10.6023C76.1639 10.6023 76.9597 10.7274 77.6943 10.9463C78.4288 11.1652 79.0716 11.5092 79.6225 11.9783C80.1735 12.4474 80.6019 13.0102 80.908 13.667C81.2141 14.3237 81.3671 15.1055 81.3671 16.0124V24.9562H77.0515V17.2632C77.0515 16.3251 76.8679 15.6684 76.5006 15.2618C76.1333 14.8553 75.613 14.6677 74.909 14.6677C74.2051 14.6677 73.6542 14.9178 73.195 15.3869C72.7665 15.856 72.5523 16.6065 72.5523 17.6698V24.9874H68.2367V17.6698C68.2367 16.6378 68.0225 15.8873 67.594 15.3869C67.1655 14.9178 66.6145 14.6677 65.9106 14.6677C65.2372 14.6677 64.6863 14.8553 64.319 15.2618C63.9211 15.6684 63.7375 16.3251 63.7375 17.2632V24.9562H59.4219V16.0124Z"
      fill="#4FC4F9"
    />
    <path
      d="M84.9492 7.25614C84.9492 6.56815 85.1635 5.97399 85.6226 5.50491C86.0817 5.03583 86.6326 4.78564 87.3366 4.78564C88.0099 4.78564 88.5915 5.03583 89.0506 5.50491C89.5097 5.97399 89.7545 6.56815 89.7545 7.25614C89.7545 7.94412 89.5097 8.5383 89.0506 9.00738C88.5915 9.47646 88.0099 9.69536 87.3366 9.69536C86.6632 9.69536 86.0817 9.47646 85.6226 9.00738C85.1941 8.50702 84.9492 7.94412 84.9492 7.25614ZM85.1941 12.9476C85.1941 12.2284 85.4083 11.728 85.8062 11.4466C86.2041 11.1651 86.755 11.0088 87.4284 11.0088C87.9181 11.0088 88.3466 11.0713 88.7445 11.1964C89.1424 11.3215 89.3872 11.3841 89.5097 11.4153V24.9874H85.1941V12.9476Z"
      fill="#4FC4F9"
    />
    <path
      d="M93.4883 6.72452C93.4883 6.00526 93.7025 5.50491 94.1004 5.22346C94.4983 4.94201 95.0492 4.78564 95.7226 4.78564C96.2123 4.78564 96.6408 4.84819 97.0387 4.97328C97.4366 5.09837 97.6814 5.16091 97.8039 5.19218V24.9561H93.4883V6.72452Z"
      fill="#4FC4F9"
    />
    <path
      d="M105.699 24.9561C105.148 23.9554 104.597 22.9234 104.077 21.8602C103.557 20.7969 103.067 19.7962 102.639 18.8893C102.21 17.9825 101.843 17.1694 101.567 16.5439C101.292 15.8872 101.108 15.4807 101.016 15.2931C100.863 14.9178 100.71 14.5113 100.557 14.0734C100.374 13.6044 100.312 13.1978 100.312 12.8538C100.312 12.3535 100.496 11.9157 100.863 11.5404C101.231 11.1964 101.751 11.0088 102.486 11.0088C103.067 11.0088 103.526 11.0713 103.894 11.1964C104.261 11.3215 104.444 11.3841 104.506 11.4153C104.812 12.3222 105.118 13.2291 105.485 14.136C105.822 15.0429 106.158 15.8872 106.465 16.669C106.771 17.4508 107.046 18.1388 107.322 18.733C107.566 19.3272 107.75 19.7337 107.872 19.9839C107.995 19.7337 108.148 19.3271 108.393 18.7643C108.638 18.2014 108.882 17.5446 109.158 16.8567C109.433 16.1687 109.709 15.4494 109.984 14.7614C110.26 14.0735 110.505 13.448 110.688 12.9789C110.811 12.6975 110.903 12.4473 111.056 12.1971C111.178 11.947 111.362 11.7593 111.545 11.5717C111.729 11.3841 111.974 11.259 112.219 11.1651C112.494 11.0713 112.831 11.0401 113.198 11.0401C113.565 11.0401 113.871 11.0713 114.177 11.1651C114.453 11.2277 114.728 11.3215 114.943 11.4153C115.157 11.5091 115.341 11.603 115.463 11.6655C115.585 11.7593 115.677 11.7906 115.708 11.8219C115.647 12.1658 115.463 12.6349 115.188 13.3229C114.912 13.9796 114.606 14.7614 114.239 15.6058C113.871 16.4501 113.474 17.357 113.045 18.2952C112.617 19.2333 112.188 20.1402 111.79 21.0158C111.392 21.8915 110.994 22.6733 110.627 23.3925C110.26 24.0805 109.984 24.6434 109.801 25.0187H105.699V24.9561Z"
      fill="#4FC4F9"
    />
    <path
      d="M122.261 18.4515C122.261 20.3591 123.087 21.2973 124.771 21.2973C126.454 21.2973 127.28 20.3591 127.28 18.4515V12.9477C127.28 12.2284 127.495 11.728 127.893 11.4466C128.29 11.1651 128.841 11.0088 129.515 11.0088C130.004 11.0088 130.433 11.0713 130.831 11.1964C131.229 11.3215 131.474 11.3841 131.596 11.4153V19.2646C131.596 20.2966 131.412 21.1722 131.076 21.9227C130.739 22.6733 130.249 23.2987 129.637 23.799C129.025 24.2994 128.321 24.6747 127.464 24.9248C126.638 25.175 125.72 25.3001 124.771 25.3001C123.791 25.3001 122.904 25.175 122.077 24.9248C121.251 24.6747 120.516 24.2994 119.904 23.799C119.292 23.2987 118.833 22.6733 118.466 21.9227C118.129 21.1722 117.945 20.2653 117.945 19.2646V12.9477C117.945 12.2284 118.16 11.728 118.557 11.4466C118.955 11.1651 119.506 11.0088 120.18 11.0088C120.669 11.0088 121.098 11.0713 121.496 11.1964C121.894 11.3215 122.138 11.3841 122.261 11.4153V18.4515Z"
      fill="#4FC4F9"
    />
    <path
      d="M135.967 20.7032C136.12 20.8282 136.334 20.9533 136.671 21.1097C137.008 21.2661 137.406 21.4224 137.865 21.5475C138.324 21.6726 138.844 21.7977 139.426 21.8915C140.007 21.9853 140.619 22.0479 141.262 22.0479C141.997 22.0479 142.548 21.9853 142.915 21.829C143.282 21.7039 143.466 21.4537 143.466 21.1097C143.466 20.7344 143.313 20.4843 143.007 20.3592C142.701 20.2341 142.211 20.109 141.538 20.0152L140.13 19.8588C139.426 19.765 138.752 19.6399 138.11 19.4523C137.467 19.2647 136.885 19.0145 136.396 18.6705C135.906 18.3265 135.508 17.8887 135.233 17.3571C134.957 16.8254 134.804 16.1687 134.804 15.3556C134.804 14.6677 134.927 14.0422 135.171 13.4793C135.416 12.9164 135.784 12.4161 136.304 11.9783C136.824 11.5405 137.498 11.1965 138.293 10.9776C139.089 10.7274 140.069 10.6023 141.17 10.6023C142.303 10.6023 143.252 10.6648 144.078 10.8212C144.904 10.9776 145.578 11.1965 146.19 11.5092C146.527 11.6968 146.802 11.9157 147.016 12.1659C147.231 12.4161 147.322 12.7601 147.322 13.1353C147.322 13.4168 147.261 13.6982 147.139 13.9171C147.016 14.136 146.894 14.3549 146.741 14.5113C146.588 14.6677 146.435 14.7928 146.312 14.8866C146.19 14.9804 146.098 15.0429 146.068 15.0429C146.006 14.9804 145.853 14.8866 145.639 14.7302C145.394 14.5738 145.088 14.4488 144.66 14.2924C144.262 14.1673 143.772 14.0422 143.221 13.9171C142.67 13.792 142.027 13.7608 141.293 13.7608C140.497 13.7608 139.916 13.8546 139.609 14.0422C139.303 14.2299 139.15 14.48 139.15 14.7927C139.15 15.1055 139.303 15.3244 139.579 15.4495C139.854 15.5745 140.283 15.6996 140.864 15.7935L143.313 16.1374C143.925 16.2313 144.507 16.3564 145.057 16.544C145.608 16.7316 146.129 16.9818 146.557 17.2945C146.986 17.6385 147.353 18.045 147.598 18.5454C147.843 19.0457 147.996 19.6712 147.996 20.4217C147.996 21.954 147.414 23.1424 146.282 24.018C145.149 24.8623 143.558 25.3002 141.538 25.3002C140.497 25.3002 139.548 25.2376 138.722 25.0812C137.895 24.9249 137.222 24.7685 136.61 24.5809C136.028 24.3933 135.539 24.1744 135.171 23.9867C134.804 23.7678 134.559 23.6115 134.406 23.5176L135.967 20.7032Z"
      fill="#4FC4F9"
    />
  </svg>
);

import { Navigator, MobileNavigator } from './navigator';

const Header = ({ darkMode = false, className = '' }) => {
  const [isLightHeader, setIsLightHeader] = useState(!darkMode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTutOpen, setIsTutOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);

  const [stat, setStat] = useState({ star: 0, forks: 0 });
  const headerRef = useRef(null);
  let isDesktop = true;
  if (typeof navigator !== 'undefined') {
    isDesktop =
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      );
  }

  useEffect(() => {
    (async function getData() {
      try {
        const { stargazers_count, forks_count } = await getGithubStatis();
        setStat({ star: stargazers_count, forks: forks_count });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!darkMode) {
      return;
    }
    const onScroll = e => {
      const scrollTop = e.target.documentElement.scrollTop;
      setIsLightHeader(scrollTop > 90);
      if (scrollTop < 78) {
        headerRef.current.classList.remove(styles.hideHeader);
        headerRef.current.classList.remove(styles.posFixed);
        headerRef.current.classList.remove(styles.showHeader);
      }
      if (scrollTop > 78 && scrollTop < 90) {
        headerRef.current.classList.add(styles.hideHeader);
      }
      if (scrollTop > 90) {
        headerRef.current.classList.add(styles.posFixed);
        headerRef.current.classList.add(styles.showHeader);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLightHeader, darkMode]);

  const openTutorial = open => {
    let isOpen = open;
    if (isOpen === undefined) {
      isOpen = !isTutOpen;
    }
    setIsTutOpen(isOpen);
  };

  const openTool = open => {
    let isOpen = open;
    if (isOpen === undefined) {
      isOpen = !isToolOpen;
    }
    setIsToolOpen(isOpen);
  };

  const handleMenuLinkClick = e => {
    const link = e.target?.children[0];
    if (link && link.tagName.toLowerCase() === 'a') {
      e.preventDefault();
      e.stopPropagation();
      link.click();
      setIsDesktopTutOpen(false);
    }
  };

  const logoSection = (
    <div className={styles.logoSection}>
      <Link href="https://milvus.io" underline="none">
        <MilvusLogo />
      </Link>
      <Divider
        variant="middle"
        sx={{
          margin: '0 13px',
          opacity: '0.3',
          border: '1px solid #d1d1d1',
          transform: 'scaleX(0.5)',
          '@media(max-width: 1024px)': {
            margin: '0 10px',
          },
          '@media(max-width: 744px)': {
            margin: '0 6px',
          },
        }}
      />

      <a
        href="https://lfaidata.foundation/projects/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-block', lineHeight: 0 }}
      >
        <span className={styles.lfaiLogo} />
      </a>
    </div>
  );

  const actionBar = (
    <div className={styles.actionBar}>
      <div className={styles.gitBtnsWrapper}>
        <GitHubButton
          stat={stat}
          type="star"
          href="https://github.com/milvus-io/milvus"
        >
          Star
        </GitHubButton>

        <GitHubButton
          stat={stat}
          type="fork"
          href="https://github.com/milvus-io/milvus"
        >
          Fork
        </GitHubButton>
      </div>
    </div>
  );

  const header = (
    <header
      className={`${styles.header} ${
        isLightHeader ? styles.light : ''
      } ${className} ${!darkMode ? styles.posSticky : ''}`}
      ref={headerRef}
    >
      <div className={`${styles.headerContainer} headerContainer`}>
        {logoSection}
        <div className={styles.desktopHeaderBar}>
          <div className={styles.leftSection}>
            <Navigator styles={styles} />
          </div>

          <div className={styles.rightSection}>
            {isDesktop && actionBar}
            <Link
              href="https://milvus.io/docs/example_code.md"
              className={styles.startBtn}
              underline="none"
            >
              Get Started
            </Link>
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${styles.hamburg} ${isMenuOpen ? styles.active : ''}`}
        >
          <span className={styles.top}></span>
          <span className={styles.middle}></span>
          <span className={styles.bottom}></span>
        </button>
      </div>
      {!isDesktop && (
        <div className={`${styles.overlay}  ${isMenuOpen ? styles.open : ''}`}>
          <nav className={`${styles.nav} col-4 col-8 col-12`}>
            <MobileNavigator styles={styles} />

            {actionBar}

            <Divider
              variant="fullwidth"
              sx={{ position: 'absolute', bottom: '78px', width: '100%' }}
            />
            <Link
              href="https://milvus.io/docs/install_standalone-docker.md"
              underline="none"
            >
              <button className={styles.startBtn}>Get Started</button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );

  return header;
};

export default Header;
