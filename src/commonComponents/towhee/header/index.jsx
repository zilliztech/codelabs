import Link from '@mui/material/Link';
import { NAV_LIST } from './constants';
import GitHubButton from 'react-github-btn';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useRef } from 'react';
import classes from './index.module.less';
import logo from '../images/logo-title.png';
import clsx from 'clsx';

const Header = () => {
  const content = useRef(null);

  const [openMask, setOPenMask] = useState(false);

  const handleToggleMobileMenu = () => {
    setOPenMask(v => !v);
  };

  const handleClickOutside = e => {
    if (e.target.contains(content.current) && e.target !== content.current) {
      setOPenMask(false);
    }
  };

  const NavSection = ({ navList, styles, isDeskTop = true }) => (
    <ul
      className={clsx(styles.navList, {
        [styles.desktopNav]: isDeskTop,
      })}
    >
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
      {navList.map(v => (
        <li key={v.label}>
          <Link href={v.href} target="_blank" underline="none">
            {v.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <section className={classes.headerWrapper}>
      <div className={classes.headerContent}>
        <div className={classes.leftPart}>
          <Link href="https://towhee.io/" className={classes.linkBtn}>
            <img src={logo} alt="Towhee" />
          </Link>
        </div>
        <div className={classes.rightPart}>
          <NavSection navList={NAV_LIST} styles={classes} />
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
          className={clsx(classes.menuMask, {
            [classes.active]: openMask,
          })}
          onClick={handleClickOutside}
        >
          <div className={classes.menuContent} ref={content}>
            <NavSection navList={NAV_LIST} styles={classes} isDeskTop={false} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
