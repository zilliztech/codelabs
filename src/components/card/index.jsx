import { Link, Typography, Stack, Button } from "@mui/material";
import { format } from 'date-fns';
import './index.less';
import milvuLogo from '../../assets/images/icons/milvus.svg';
import { useTranslation } from "react-i18next";

export default function TutorialCard(props) {
  const { t } = useTranslation();
  const { title, duration, updated, url } = props;

  return (
    <Link href={`/${url}`} target="_self" className="tutorial-cara-wrapper" underline="none">
      <Typography component="p" className="card-header">{title}</Typography>
      <Stack direction='row' justifyContent="space-between" className="card-duration">
        <Typography component="span" >{duration} min</Typography>
        <Typography component="span" >Updated {format(new Date(updated), "LLL dd, yyyy")}</Typography>
      </Stack>
      <Stack direction='row' justifyContent="space-between" alignItems="center" className="card-footer">
        <img src={milvuLogo} alt="" />
        <Button variant="contained" disableRipple>{t("card.start")}</Button>
      </Stack>
    </Link>
  );
}
