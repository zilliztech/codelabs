import React from "react";
import clsx from "clsx";
import Link from "@mui/material/Link";
import * as styles from "./index.module.less";
import { Github, Slack, Twitter, Youtube } from "./icons";

const iconMap = {
  github: Github,
  slcak: Slack,
  twitter: Twitter,
  youtube: Youtube,
};

const footerJson = [
  {
    title: "resources",
    children: [
      { name: "Docs", trans: false, to: "/docs" },
      {
        name: "Blog",
        trans: false,
        to: "/blog",
      },
      { name: "Learn", trans: false, to: "https://zilliz.com/learn" },
    ],
  },
  {
    title: "tutorials",
    children: [
      { name: "bootcamp", trans: true, to: "/bootcamp" },
      { name: "demo", trans: true, to: "/milvus-demos" },
      {
        name: "video",
        trans: true,
        to: "https://www.youtube.com/c/MilvusVectorDatabase",
      },
    ],
  },
  {
    title: "tools",
    children: [
      { name: "Attu", trans: false, to: "https://github.com/zilliztech/attu" },
      {
        name: "Milvus_CLI",
        trans: false,
        to: "https://github.com/zilliztech/milvus_cli",
      },
      { name: "Sizing Tool", trans: false, to: "/tools/sizing" },
    ],
  },
  {
    title: "community",
    children: [
      { name: "getinvolved", trans: true, to: "/community" },
      { name: "Slack", trans: false, to: "https://slack.milvus.io" },
      {
        name: "Github",
        trans: false,
        to: "https://github.com/milvus-io/milvus",
      },
      { name: "forum", trans: true, to: "https://discuss.milvus.io/" },
    ],
  },
];

const socialJson = [
  {
    icon: Github,
    link: "https://github.com/milvus-io/milvus",
  },
  {
    icon: Slack,
    link: "https://slack.milvus.io/",
  },
  {
    icon: Twitter,
    link: "https://twitter.com/milvusio",
  },
  {
    icon: Youtube,
    link: "https://www.youtube.com/channel/UCMCo_F7pKjMHBlfyxwOPw-g",
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
        className={clsx(styles.container, { [`col-4 col-8 col-12`]: darkMode })}
      >
        <div className={`${styles.footContentWrapper} `}>
          {footerJson.map(f => (
            <div key={f.title} className={`${styles.footerItem} col-2`}>
              <span className={styles.itemTitle}>{f.title}</span>

              {f.children.map((c, index) => {
                if (c.to.startsWith("http")) {
                  return (
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
                  );
                }
                return (
                  <Link
                    key={`${index}-c.name`}
                    className={styles.itemEntry}
                    href={c.to}
                    underline="none"
                  >
                    {c.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
        <div className={styles.bottombar}>
          <span>{`Milvus. ${new Date().getFullYear()} All rights reserved.`}</span>

          <div className={styles.social}>
            {socialJson.map(s => {
              const Icon = s.icon;
              return (
                <a
                  key={s.link}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
