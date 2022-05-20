import Header from '../commonComponents/header';
import Footer from '../commonComponents/footer';
import classes from './index.module.less';
import Head from 'next/head';

export default function Layout(props) {
  return (
    <div className={classes.layout}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Milvus Tutorials provide a guided, tutorial, hands-on milvus integration experience. Most
  Tutorials will step you through the process of building a small application, or adding a new feature to an existing
  application."
        />

        <title>Milvus Tutorials</title>
      </Head>
      <Header />
      <main>{props.children}</main>

      <Footer darkMode={true} />
    </div>
  );
}
