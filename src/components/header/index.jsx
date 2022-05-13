import {
  Box,
  Typography,
  Button,
  Link,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import milvus_logo from "../../assets/images/header/milvus.svg";
import if_logo from "../../assets/images/header/lf_logo_light.svg";
import { useTranslation } from "react-i18next";
import GitHubButton from "../githubButton";
import { useState } from "react";
import classes from "./index.module.less";
import MenuBar from "./menu";
import MobileHeader from "./mobileHeader";

export default function Header() {
  const { t } = useTranslation();

  const [stat, setStat] = useState({ star: 0, forks: 0 });

  return (
    <Box className={classes.header}>
      <Box className={classes.inner}>
        <Box className={classes.leftPart}>
          <Box className={classes.logoSection}>
            <Link href="https://milvus.io/" target="_self" underline="none">
              <img src={milvus_logo} alt="Milvus" />
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Link
              href="https://lfaidata.foundation/projects/"
              target="_blank"
              underline="none"
            >
              <img src={if_logo} alt="Ifaidata" />
            </Link>
          </Box>

          <MenuBar className={classes.menuSection} />
        </Box>

        <Box className={classes.rightPart}>
          <Box className={classes.desktopHeader}>
            <Box className={classes.githubBtnsWrapper}>
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
                Forks
              </GitHubButton>
            </Box>
            <Button variant="conatined">{t("header.start")}</Button>
          </Box>

          <Box className={classes.mobileHeader}>
            <MobileHeader />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
