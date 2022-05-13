import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import { useState, useMemo } from "react";
import classes from "./index.module.less";
import { ArrowRight } from "../icons";

const MENU = [
  {
    label: "docs",
    href: "#",
  },
  {
    label: "tutorials",
    subMenu: [
      {
        label: "bootcamp",
        href: "#",
      },
      {
        label: "demo",
        href: "#",
      },
      {
        label: "video",
        href: "#",
      },
    ],
  },
  {
    label: "tools",
    subMenu: [
      {
        label: "attu",
        href: "#",
      },
      {
        label: "cli",
        href: "#",
      },
      {
        label: "sizing",
        href: "#",
      },
    ],
  },
  {
    label: "blog",
    href: "#",
  },
  {
    label: "community",
    href: "#",
  },
];

export default function MenuBar(props) {
  const { className, isMobile = false } = props;

  return (
    <Box className={className}>
      {MENU.map(v => {
        return v.href ? (
          <Link
            href={v.href}
            key={v.label}
            underline="none"
            className={classes.link}
          >
            {v.label}
          </Link>
        ) : isMobile ? (
          <MenuCollapse title={v.label} subMenu={v.subMenu} key={v.label} />
        ) : (
          <MenuDropDown title={v.label} subMenu={v.subMenu} key={v.label} />
        );
      })}
    </Box>
  );
}

const MenuDropDown = props => {
  const { subMenu, title } = props;

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
      <Button
        onClick={handleClick}
        className={classes.menuWrapper}
        disableRipple
      >
        {title}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {subMenu.map(v => (
          <MenuItem key={v.label} onClick={handleClose}>
            <Link href={v.href} underline="none" className={classes.link}>
              {v.label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const MenuCollapse = props => {
  const { subMenu, title } = props;
  const [check, setCheck] = useState(false);

  const hanldeSwitchMenu = () => {
    setCheck(v => !v);
  };
  return (
    <Box className={classes.collapseMenuWrapper}>
      <Button
        variant="text"
        endIcon={<ArrowRight />}
        fullWidth
        onClick={hanldeSwitchMenu}
        className={classes.dropdownBtn}
      >
        {title}
      </Button>
      <Collapse in={check}>
        {subMenu.map(v => (
          <Link href={v.href} key={v.label}>
            {v.label}
          </Link>
        ))}
      </Collapse>
    </Box>
  );
};
