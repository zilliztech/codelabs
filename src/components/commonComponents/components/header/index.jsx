import React, { useState, useRef, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import milvusLogo from "../../images/milvus_logo.svg";
import GitHubButton from "../githubButton";
import { getGithubStatis } from "../../http";
import * as styles from "./index.module.less";

import { Navigator, MobileNavigator } from "./navigator";

const Header = ({ darkMode = false, className = "" }) => {
  const [isLightHeader, setIsLightHeader] = useState(!darkMode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTutOpen, setIsTutOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);

  const [stat, setStat] = useState({ star: 0, forks: 0 });
  const headerRef = useRef(null);
  let isDesktop = true;
  if (typeof navigator !== "undefined") {
    isDesktop =
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      );
  }

  // get env in vite
  const isDev = import.meta.env.MODE === "development";

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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
    if (link && link.tagName.toLowerCase() === "a") {
      e.preventDefault();
      e.stopPropagation();
      link.click();
      setIsDesktopTutOpen(false);
    }
  };

  const logoSection = (
    <div className={styles.logoSection}>
      <Link href="https://milvus.io" underline="none">
        <img src={milvusLogo} alt="milvus-logo" />
      </Link>
      <Divider
        variant="middle"
        sx={{
          margin: "0 13px",
          opacity: "0.3",
          border: "1px solid #d1d1d1",
          transform: "scaleX(0.5)",
          "@media(max-width: 1024px)": {
            margin: "0 10px",
          },
          "@media(max-width: 744px)": {
            margin: "0 6px",
          },
        }}
      />

      <a
        href="https://lfaidata.foundation/projects/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", lineHeight: 0 }}
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
          href="https://github.com/milvus-io/milvus/fork"
        >
          Forks
        </GitHubButton>
      </div>
    </div>
  );

  const header = (
    <header
      className={`${styles.header} ${
        isLightHeader ? styles.light : ""
      } ${className} ${!darkMode ? styles.posSticky : ""}`}
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
          className={`${styles.hamburg} ${isMenuOpen ? styles.active : ""}`}
        >
          <span className={styles.top}></span>
          <span className={styles.middle}></span>
          <span className={styles.bottom}></span>
        </button>
      </div>
      {!isDesktop && (
        <div className={`${styles.overlay}  ${isMenuOpen ? styles.open : ""}`}>
          <nav className={`${styles.nav} col-4 col-8 col-12`}>
            <MobileNavigator styles={styles} />

            {actionBar}

            <Divider
              variant="fullwidth"
              sx={{ position: "absolute", bottom: "78px", width: "100%" }}
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
