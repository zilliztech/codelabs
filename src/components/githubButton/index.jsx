import React from 'react';
import Divider from '@mui/material/Divider';
import github from '../../assets/images/header/github.svg';
import branch from '../../assets/images/header/branch.svg';
import * as styles from './index.module.less';

const GitHubButton = ({
  type = 'star', // star or fork
  href,
  className = '',
  children,
  stat,
}) => {
  const isStar = type === 'star';
  const icon = isStar ? github : branch;
  const link = isStar ? href : `${href}/fork`;
  const sublink = isStar ? `${href}/stargazers` : `${href}/network/members`;

  return (
    <div className={`${styles.gitBtnWrapper} ${className}`}>
      <a
        href={link}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={icon} alt="" />
        {/* <span className={styles.iconText}>{children}</span> */}
      </a>
      <Divider orientation="vertical" variant="middle" flexItem />
      <a
        href={sublink}
        className={`${styles.link} ${styles.num} `}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.stat}>{isStar ? stat.star : stat.forks}</span>
      </a>
    </div>
  );
};

export default GitHubButton;
