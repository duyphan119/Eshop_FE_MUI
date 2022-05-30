import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = ({ children }) => {
  const headerRef = useRef();
  const [style, setStyle] = useState({});
  useEffect(() => {
    setStyle({
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      overflowX: "hidden",
      paddingTop: `${
        headerRef.current
          ? headerRef.current.getBoundingClientRect().height
          : 60
      }px`,
    });
  }, []);
  return (
    <div style={style}>
      <Header headerRef={headerRef} />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
