import React from "react";
import { convertMkdToHtml } from "../utils/common";
import Layout from "../components/layout";

export default function ArticleDetail(props) {
  return (
    <Layout>
      <div className="" dangerouslySetInnerHTML={{ __html: props.html }}></div>
    </Layout>
  );
}

export const getServerSideProps = ({ params }) => {
  const fs = require("fs");
  const { id } = params;
  // get meta
  const meta = JSON.parse(
    fs.readFileSync(`public/${id}/codelab.json`).toString()
  );

  // const meta = data.filter(d => d.id === id)[0];
  const md = fs.readFileSync(`./codelabs/${meta.source}`);

  // build html
  const html = convertMkdToHtml(md, id);

  return {
    props: {
      html,
    },
  };
};
