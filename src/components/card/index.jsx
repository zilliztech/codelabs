import { Link, Typography, Stack, Box } from "@mui/material";
import { format } from "date-fns";
import "./index.less";
import milvuLogo from "../../assets/images/icons/milvus.svg";
import { useTranslation } from "react-i18next";

export default function TutorialCard(props) {
  const { t } = useTranslation();
  const { title, duration, updated, url, id } = props;

  const pdfLink = `https://github.com/zilliztech/codelabs/raw/master/pdf/${id}.pdf`;

  return (
    <Box className="tutorial-cara-wrapper">
      <Typography component="p" className="card-header">
        {title}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        className="card-duration"
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
        className="card-footer"
      >
        <img src={milvuLogo} alt="" />
        <Link
          href={`${pdfLink}`}
          target="_blank"
          title={`Download ${id}.pdf`}
          underline="none"
        >
          <svg width="32" height="32" viewBox="0 0 256 256">
            <g transform="translate(128 128) scale(0.72 0.72)">
              <g transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)">
                <path
                  d="M 45 47.357 c -0.633 0 -1.228 -0.246 -1.676 -0.693 l -10.63 -10.63 c -0.681 -0.68 -0.882 -1.694 -0.514 -2.583 c 0.369 -0.889 1.228 -1.463 2.19 -1.463 h 2.682 v -8.751 c 0 -1.307 1.063 -2.371 2.37 -2.371 h 11.155 c 1.308 0 2.371 1.063 2.371 2.371 v 8.751 h 2.682 c 0.964 0 1.823 0.575 2.19 1.465 c 0.367 0.888 0.165 1.901 -0.515 2.581 l -10.63 10.63 C 46.229 47.111 45.633 47.357 45 47.357 z M 35.89 34.987 l 9.11 9.11 l 9.109 -9.11 h -2.661 c -0.828 0 -1.5 -0.671 -1.5 -1.5 v -9.622 h -9.896 v 9.622 c 0 0.829 -0.671 1.5 -1.5 1.5 H 35.89 z"
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
                <path
                  d="M 77.474 17.28 L 61.526 1.332 C 60.668 0.473 59.525 0 58.311 0 H 15.742 c -2.508 0 -4.548 2.04 -4.548 4.548 v 80.904 c 0 2.508 2.04 4.548 4.548 4.548 h 58.516 c 2.508 0 4.549 -2.04 4.549 -4.548 V 20.496 C 78.807 19.281 78.333 18.138 77.474 17.28 z M 61.073 5.121 l 12.611 12.612 H 62.35 c -0.704 0 -1.276 -0.573 -1.276 -1.277 V 5.121 z M 15.742 3 h 42.332 v 13.456 c 0 2.358 1.918 4.277 4.276 4.277 h 13.457 v 33.2 H 14.194 V 4.548 C 14.194 3.694 14.888 3 15.742 3 z M 74.258 87 H 15.742 c -0.854 0 -1.548 -0.694 -1.548 -1.548 V 56.934 h 61.613 v 28.519 C 75.807 86.306 75.112 87 74.258 87 z"
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
                <path
                  d="M 31.116 62.679 h -5.944 c -0.829 0 -1.5 0.672 -1.5 1.5 v 9.854 v 6.748 c 0 0.828 0.671 1.5 1.5 1.5 s 1.5 -0.672 1.5 -1.5 v -5.248 h 4.444 c 2.392 0 4.338 -1.946 4.338 -4.338 v -4.177 C 35.454 64.625 33.508 62.679 31.116 62.679 z M 32.454 71.194 c 0 0.737 -0.6 1.338 -1.338 1.338 h -4.444 v -6.854 h 4.444 c 0.738 0 1.338 0.601 1.338 1.339 V 71.194 z"
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
                <path
                  d="M 46.109 82.28 h -5.652 c -0.829 0 -1.5 -0.672 -1.5 -1.5 V 64.179 c 0 -0.828 0.671 -1.5 1.5 -1.5 h 5.652 c 2.553 0 4.63 2.077 4.63 4.63 V 77.65 C 50.739 80.203 48.662 82.28 46.109 82.28 z M 41.957 79.28 h 4.152 c 0.898 0 1.63 -0.731 1.63 -1.63 V 67.309 c 0 -0.898 -0.731 -1.63 -1.63 -1.63 h -4.152 V 79.28 z"
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
                <path
                  d="M 64.828 62.679 h -8.782 c -0.828 0 -1.5 0.672 -1.5 1.5 V 80.78 c 0 0.828 0.672 1.5 1.5 1.5 s 1.5 -0.672 1.5 -1.5 v -6.801 h 4.251 c 0.828 0 1.5 -0.672 1.5 -1.5 s -0.672 -1.5 -1.5 -1.5 h -4.251 v -5.301 h 7.282 c 0.828 0 1.5 -0.672 1.5 -1.5 S 65.656 62.679 64.828 62.679 z"
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
              </g>
            </g>
          </svg>
        </Link>
        <Link
          href={`/${url}`}
          target="_self"
          underline="none"
          className="link-button"
        >
          Start
        </Link>
      </Stack>
    </Box>
  );
}
