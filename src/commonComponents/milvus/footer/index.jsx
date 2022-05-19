import React from "react";
import clsx from "clsx";
import Link from "@mui/material/Link";
import * as styles from "./index.module.less";
import { Github, Slack, Twitter, Youtube } from "./icons";

export const LINK_JSON = [
  {
    title: "Resources",
    children: [
      { name: "Docs", trans: false, to: "https://milvus.io/docs" },
      {
        name: "Blog",
        trans: false,
        to: "https://milvus.io/blog",
      },
      { name: "Learn", trans: false, to: "https://zilliz.com/learn" },
    ],
  },
  {
    title: "Codelabs",
    children: [
      { name: "Bootcamp", trans: true, to: "https://milvus.io/bootcamp" },
      { name: "Demo", trans: true, to: "https://milvus.io/milvus-demos" },
      {
        name: "Video",
        trans: true,
        to: "https://www.youtube.com/c/MilvusVectorDatabase",
      },
    ],
  },
  {
    title: "Tools",
    children: [
      { name: "Attu", trans: false, to: "https://github.com/zilliztech/attu" },
      {
        name: "Milvus_CLI",
        trans: false,
        to: "https://github.com/zilliztech/milvus_cli",
      },
      {
        name: "Sizing Tool",
        trans: false,
        to: "https://milvus.io/tools/sizing",
      },
    ],
  },
  {
    title: "Community",
    children: [
      { name: "Get involved", trans: true, to: "https://milvus.io/community" },
      { name: "Slack", trans: false, to: "https://slack.milvus.io" },
      {
        name: "Github",
        trans: false,
        to: "https://github.com/milvus-io/milvus",
      },
      { name: "Forum", trans: true, to: "https://discuss.milvus.io/" },
    ],
  },
];

export const SOCIAL_JSON = [
  {
    icon: Github,
    link: "https://github.com/milvus-io/milvus",
    alt: "GitHub",
  },
  {
    icon: Slack,
    link: "https://slack.milvus.io/",
    alt: "Slack",
  },
  {
    icon: Twitter,
    link: "https://twitter.com/milvusio",
    alt: "Twitter",
  },
  {
    icon: Youtube,
    link: "https://www.youtube.com/channel/UCMCo_F7pKjMHBlfyxwOPw-g",
    alt: "YouTube",
  },
];

const Footer = ({ darkMode = true, className }) => {
  return (
    <div
      className={clsx(styles.footer, {
        [className]: className,
        [styles.dark]: darkMode,
      })}
    >
      <div
        className={clsx(styles.container, {
          [styles.darkContainer]: darkMode,
        })}
      >
        <div className={`${styles.footContentWrapper} `}>
          {LINK_JSON.map(f => (
            <div key={f.title} className={`${styles.footerItem}`}>
              <span className={styles.itemTitle}>{f.title}</span>

              {f.children.map((c, index) => (
                <Link
                  key={`${index}-c.name`}
                  className={styles.itemEntry}
                  href={c.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.bottombar}>
          <span>{`Milvus. ${new Date().getFullYear()} All rights reserved.`}</span>

          <div className={styles.social}>
            {SOCIAL_JSON.map(s => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.link}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
