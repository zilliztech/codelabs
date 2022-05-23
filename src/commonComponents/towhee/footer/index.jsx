import React from 'react';
import { RectAngle, Github, Slack, Twitter } from './icons';
import logo from '../images/logo-title.png';
import classes from './index.module.less';

export default function TowheeFooter() {
  return (
    <footer className={classes.footerWrapper}>
      <div className={classes.footerContent}>
        <div className={classes.topContent}>
          <a href="https://towhee.io" className={classes.logoWrapper}>
            <img src={logo} alt="logo" />
          </a>

          <nav>
            <ul>
              <li>
                <a href="https://github.com/towhee-io/towhee" target="_blank">
                  Contribute
                </a>
              </li>
              <li>
                <a href="https://towhee.io/pipelines">Pipelines</a>
              </li>
              <li>
                <a href="https://towhee.io/operators">Operators</a>
              </li>
              <li>
                <a href="https://docs.towhee.io/" target="_blank">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://demos.towhee.io/" target="_blank">
                  Demo
                </a>
              </li>
            </ul>
          </nav>

          <ul className={classes.socials}>
            <li>
              <a href="https://slack.towhee.io" target="_blank">
                <Slack />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/towheeio" target="_blank">
                <Twitter />
              </a>
            </li>
            <li>
              <a href="https://github.com/towhee-io/towhee" target="_blank">
                <Github />
              </a>
            </li>
          </ul>
        </div>

        <div className={classes.btmContent}>
          <nav className={classes.footNav}>
            <ul>
              <li>
                <a href="https://github.com/towhee-io/towhee" target="_blank">
                  Contribute
                </a>
              </li>
              <li>
                <a href="https://towhee.io/pipelines">Pipelines</a>
              </li>
              <li>
                <a href="https://towhee.io/operators">Operators</a>
              </li>
              <li>
                <a href="https://docs.towhee.io/" target="_blank">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://demos.towhee.io/" target="_blank">
                  Demo
                </a>
              </li>
            </ul>
          </nav>

          <div className={classes.copyrightSection}>
            <div className={classes.blocksWrapper}>
              <span>
                <RectAngle />
              </span>
              <span className={classes.rectangl}>
                <RectAngle />
              </span>
            </div>
            <p className={classes.copyright}>
              © {new Date().getFullYear()} Towhee. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
