import Header from "../commonComponents/components/header";
import Footer from "../commonComponents/components/footer";

export default function Layout(props) {
  return (
    <>
      <Header />
      {props.children}
      <Footer darkMode={true} />
    </>
  );
}
