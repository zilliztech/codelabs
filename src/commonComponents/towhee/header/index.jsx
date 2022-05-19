import Link from "@mui/material/Link";
import { NAV_LIST } from "./constants";
import GitHubButton from "react-github-btn";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef } from "react";
import classes from "./index.module.less";
import logo from "../images/logo-title.png";

const Header = () => {
  const menuMask = useRef(null);
  const content = useRef(null);

  const handleToggleMobileMenu = () => {
    menuMask.current.classList.toggle("active");
  };

  const handleClickOutside = e => {
    if (e.target.contains(content.current) && e.target !== content.current) {
      menuMask.current.classList.remove("active");
    }
  };

  return (
    <header className={classes.headerWrapper}>
      <div className={classes.headerContent}>
        <div className={classes.leftPart}>
          <Link href="https://towhee.io/" className={classes.linkBtn}>
            <img src={logo} alt="Towhee" />
          </Link>
        </div>
        <div className={classes.rightPart}>
          <ul className={classes.navList}>
            <li key="github">
              <GitHubButton
                href="https://github.com/towhee-io/towhee"
                data-size="large"
                data-show-count="true"
                aria-label="Star towhee-io/towhee on GitHub"
              >
                Star
              </GitHubButton>
            </li>
            {NAV_LIST.map(v => (
              <li key={v.label}>
                <Link href={v.href} target="_blank">
                  {v.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={classes.loginBtn} key="signIn">
            <a href="https://towhee.io/user/login" target="_blank">
              Sign In
            </a>
          </div>
          <div className={classes.menuWrapper} onClick={handleToggleMobileMenu}>
            <MenuIcon />
          </div>
        </div>
        <div
          className={classes.menuMask}
          ref={menuMask}
          onClick={handleClickOutside}
        >
          <div className={classes.menuContent} ref={content}>
            <ul className={classes.navList}>
              <li key="github">
                <GitHubButton
                  href="https://github.com/towhee-io/towhee"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star towhee-io/towhee on GitHub"
                >
                  Star
                </GitHubButton>
              </li>
              {NAV_LIST.map(v => (
                <li key={v.label}>
                  <Link href={v.href}>{v.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
