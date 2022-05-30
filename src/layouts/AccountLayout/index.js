import React, { useEffect, useRef, useState } from "react";
import Header from "../DefaultLayout/Header";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HistoryIcon from "@mui/icons-material/History";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LockResetIcon from "@mui/icons-material/LockReset";
import Footer from "../DefaultLayout/Footer";
import { Container, Grid, Box, Typography } from "@mui/material";

import Drawer from "./Drawer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLocation } from "react-router-dom";
const items = [
  {
    to: "/account",
    title: "Thông tin tài khoản",
    breadcrumb: "Tài khoản",
    icon: AccountBoxOutlinedIcon,
  },
  {
    to: "/account/order",
    title: "Đơn hàng của tôi",
    breadcrumb: "Đơn hàng",
    icon: ReceiptIcon,
  },
  {
    to: "/account/latest",
    title: "Đã xem gần đây",
    breadcrumb: "Gần đây",
    icon: HistoryIcon,
  },
  {
    to: "/account/favorite",
    title: "Sản phẩm yêu thích",
    breadcrumb: "Yêu thích",
    icon: FavoriteIcon,
  },
  {
    to: "/account/change-password",
    title: "Đổi mật khẩu",
    breadcrumb: "Tài khoản",
    icon: LockResetIcon,
  },
];
const AccountLayout = ({ children }) => {
  const [indexItem, setIndexItem] = useState();

  const location = useLocation();

  const headerRef = useRef();

  useEffect(() => {
    const index = items.findIndex((item) => item.to === location.pathname);
    setIndexItem(index === -1 ? 0 : index);
  }, [location.pathname]);
  return (
    <>
      <Header headerRef={headerRef} />
      <div
        style={{
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
          backgroundColor: "rgb(249,249,249)",
        }}
      >
        <Box
          alignItems="center"
          style={{ paddingTop: "30px", paddingBottom: "10px" }}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Breadcrumbs
            text={items[indexItem] ? items[indexItem].breadcrumb : ""}
            items={[
              {
                text: "Trang chủ",
                to: "/",
              },
            ]}
          />
          {items[indexItem] ? (
            <Typography
              textTransform="uppercase"
              fontSize="18px"
              fontWeight="600"
              color="var(--main-color)"
            >
              {items[indexItem].title}
            </Typography>
          ) : (
            ""
          )}
        </Box>
        <Container
          style={{ paddingTop: "10px", paddingBottom: "40px", height: "100%" }}
        >
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={3}>
              <Drawer
                items={items}
                indexItem={indexItem}
                getIndexItem={(index) => setIndexItem(index)}
              />
            </Grid>
            <Grid item xs={9}>
              <Box
                minHeight="calc(100vh - 200px)"
                height="100%"
                bgcolor="#fff"
                position="relative"
              >
                {children}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AccountLayout;
