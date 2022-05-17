import Header from "../commonComponents/header";
import Footer from "../commonComponents/footer";

export default function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer darkMode={true} />
    </>
  );
}
