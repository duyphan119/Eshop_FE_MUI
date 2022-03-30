import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import BannerTop from "../bannertop/BannerTop";
import Navbar from "../navbar/Navbar";
import TopBar from "../topbar/TopBar";
import "./header.scss";
const Header = () => {
  const headerRef = useRef();
  const [headerClassName, setHeaderClassName] = useState("");
  // const [showHeader, setShowHeader] = useState(false);
  // useEffect(() => {
  //   const scrollHeader = () => {
  //     if (headerRef.current) {
  //       const rect = headerRef.current.getBoundingClientRect();
  //       if (window.scrollY < rect.height) {
  //         setShowHeader(false);
  //       } else {
  //         setShowHeader(true);
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", scrollHeader);
  //   return () => {
  //     window.removeEventListener("scroll", scrollHeader);
  //   };
  // }, []);

  // useEffect(() => {
  //   setHeaderClassName(showHeader ? "show" : "");
  // }, [showHeader]);
  return (
    <header ref={headerRef} className={headerClassName}>
      <BannerTop />
      <Container>
        <TopBar />
      </Container>
      <Container className="my-navbar__container">
        <Navbar />
      </Container>
    </header>
  );
};

export default Header;
