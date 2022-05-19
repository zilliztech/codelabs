import { Link, Typography, Stack, Button, Box } from "@mui/material";
import { format } from "date-fns";
import classes from "./index.module.less";
import Image from "next/image";

export default function TutorialCard(props) {
  const { title, duration, updated, url } = props;

  return (
    <Box className={classes.tutorialCardWrapper}>
      <Typography component="p" className={classes.cardHeader}>
        {title}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        className={classes.cardDuration}
      >
        <Typography component="span">{duration} min</Typography>
        <Typography component="span">
          Updated {format(new Date(updated), "LLL dd, yyyy")}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={classes.cardFooter}
      >
        <Image src="/images/milvus.svg" width={32} height={32} alt="Milvus" />
        <Link
          href={`/${url}`}
          target="_self"
          underline="none"
          className={classes.linkBtn}
        >
          Start
        </Link>
      </Stack>
    </Box>
  );
}
