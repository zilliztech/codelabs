import Header from '../header';
import Footer from '../footer';




export default function Layout(props) {

  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
