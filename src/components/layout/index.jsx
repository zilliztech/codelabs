import Header from "../commonComponents/header";
import Footer from "../commonComponents/footer";
import classes from "./index.module.less";

export default function Layout(props) {
  return (
    <div className={classes.layout}>
      <Header />
      {props.children}
      <Footer darkMode={true} />
    </div>
  );
}
