import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const DefaultLayout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowX: "hidden",
        paddingTop: "60px",
      }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
