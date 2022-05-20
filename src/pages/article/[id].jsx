import React from 'react';
import { convertMkdToHtml } from '../../utils/common';
import Layout from '../../components/layout';
import classes from '../../../styles/article.module.less';
import 'highlight.js/styles/stackoverflow-light.css';
import axiosInstance from '../../http/axios';

export default function ArticleDetail(props) {
  return (
    <Layout>
      <div
        className={classes.article}
        dangerouslySetInnerHTML={{ __html: props.html }}
      ></div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const res = await axiosInstance.get('/paths');
  const paths = res.data.map(v => ({ params: { id: v.id } }));
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const fs = require('fs');
  const { id } = params;

  const meta = JSON.parse(
    fs.readFileSync(`public/${id}/codelab.json`).toString()
  );

  // const meta = data.filter(d => d.id === id)[0];
  const md = fs.readFileSync(`./codelabs/${meta.source}`);

  // build html
  const html = convertMkdToHtml(md);

  return {
    props: {
      html,
    },
  };
};
