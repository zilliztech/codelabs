import React from "react";
import data from "../codelab.json";
const fs = require("fs");
import { convertMkdToHtml } from "../../utils/common";
import Layout from "../../components/layout";

export default function ArticleDetail(props) {
  return (
    <Layout>
      <div className="" dangerouslySetInnerHTML={{ __html: props.html }}></div>
    </Layout>
  );
}

export const getStaticPaths = () => {
  const paths = data.map(v => ({
    params: { id: v.source.split("/")[1] },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const { id } = params;
  const md = fs.readFileSync(`./codelabs/${id}/index.md`);

  const html = convertMkdToHtml(md, id);

  return {
    props: {
      html,
    },
  };
};
