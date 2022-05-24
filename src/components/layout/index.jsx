import Header from '../commonComponents/header';
import Footer from '../commonComponents/footer';
import classes from './index.module.less';
import Head from 'next/head';
import { config } from '../commonComponents/config';

export default function Layout(props) {
  const { project = 'milvus', title = 'Milvus Codelab' } = config;
  const faviconPath = `/images/${project}.svg`;
  return (
    <div className={classes.layout}>
      <Head>
        <link rel="icon" href={faviconPath} />
        <meta
          name="description"
          content="Milvus Tutorials provide a guided, tutorial, hands-on milvus integration experience. Most
  Tutorials will step you through the process of building a small application, or adding a new feature to an existing
  application."
        />

        <title>{title}</title>
      </Head>
      <Header />
      <main className={classes.main}>{props.children}</main>

      <Footer darkMode={true} />
    </div>
  );
}
