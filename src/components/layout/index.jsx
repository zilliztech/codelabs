import MilvusHeader from "../../commomComponents/components/header/milvus";
import MilvusFooter from "../../commomComponents/components/footer/milvus";

export default function Layout(props) {
  return (
    <>
      <MilvusHeader />
      {props.children}
      <MilvusFooter darkMode={true} />
    </>
  );
}
