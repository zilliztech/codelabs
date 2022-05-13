import classes from "./index.module.less";
import menu from "../../../assets/images/header/menu.svg";
import close from "../../../assets/images/header/close.svg";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { CloseIcon, MenuIcon } from "../icons";
import { useState } from "react";
import MenuBar from "../menu";
import clsx from "clsx";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  const hanldeSwitchMenu = () => {
    setOpen(v => !v);
  };
  return (
    <Box className={classes.mebileHeaderWrapper}>
      <IconButton onClick={hanldeSwitchMenu} className={classes.menuIcon}>
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Collapse
        in={open}
        className={clsx(classes.dialog, {
          // [classes.show]: open,
        })}
      >
        <MenuBar isMobile={true} className={classes.dropdownMenu} />
      </Collapse>
    </Box>
  );
}
