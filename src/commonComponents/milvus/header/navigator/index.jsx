import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState, useMemo } from "react";

import { MENU } from "../constants.js";

export const Navigator = props => {
  const { styles } = props;

  const MenuDropDown = props => {
    const { subMenu, title, styles } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = useMemo(() => {
      return Boolean(anchorEl);
    }, [anchorEl]);

    return (
      <>
        <button onClick={handleClick} className={styles.menuItem}>
          {title}
        </button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          {subMenu.map(v => (
            <MenuItem key={v.label} onClick={handleClose}>
              <Link href={v.href} className={styles.menuLink} underline="none">
                {v.label}
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  return (
    <ul className={styles.menu}>
      {MENU.map(v => {
        return (
          <li key={v.label}>
            {v.href ? (
              <Link href="/docs" className={styles.menuItem} underline="none">
                {v.label}
              </Link>
            ) : (
              <MenuDropDown
                subMenu={v.subMenu}
                title={v.label}
                styles={styles}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export const MobileNavigator = props => {
  const { styles } = props;
  const [check, setCheck] = useState(false);

  const hanldeSwitchMenu = () => {
    setCheck(v => !v);
  };

  const CollapseMenu = () => {
    const { subMenu, title, styles } = props;
    return (
      <>
        <ListItemButton onClick={hanldeSwitchMenu}>
          <ListItemText primary={title} />
          {check ? <ExpandMore /> : <ExpandMore className={styles.turnLeft} />}
        </ListItemButton>

        <Collapse in={check} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemText
              primary={
                <>
                  {subMenu.map(v => (
                    <Link
                      href={v.href}
                      className={styles.mobileMenuLink}
                      underline="none"
                      key={v.label}
                      target={v.isExternal ? "_blank" : "_self"}
                    >
                      {v.label}
                    </Link>
                  ))}
                </>
              }
            />
          </List>
        </Collapse>
      </>
    );
  };

  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {MENU.map(v => {
        return v.href ? (
          <>
            <Link
              href={v.href}
              key={v.label}
              className={styles.menuLink}
              underline="none"
            >
              <ListItemButton>
                <ListItemText primary={v.label} />
                <ExpandMore className={styles.turnLeft} />
              </ListItemButton>
            </Link>

            <Divider variant="middle" />
          </>
        ) : (
          <>
            <CollapseMenu
              subMenu={v.subMenu}
              title={v.label}
              styles={styles}
              key={v.label}
            />
            <Divider variant="middle" />
          </>
        );
      })}
    </List>
  );
};
