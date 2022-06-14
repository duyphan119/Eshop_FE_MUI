import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, useMediaQuery } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useLocation } from "react-router-dom";

import { DRAWER_WIDTH } from "../../../constants";
import NotificationIcon from "./NotificationIcon";
import "./AppBar.css";
import config from "../../../config";

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, marginleft, width, bgcolor }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: marginleft,
    width,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const [title, setTitle] = React.useState("");

  const location = useLocation();

  React.useEffect(() => {
    let _title;
    if (location.pathname === config.routes.orderManagement) {
      _title = "Quản lý hoá đơn";
    } else if (location.pathname === config.routes.productManagement) {
      _title = "Quản lý sản phẩm";
    } else if (location.pathname === config.routes.userManagement) {
      _title = "Quản lý người dùng";
    } else if (location.pathname === config.routes.commentManagement) {
      _title = "Quản lý bình luận";
    } else if (location.pathname === config.routes.statistics) {
      _title = "Báo cáo, thống kê";
    } else if (location.pathname === config.routes.categoryManagement) {
      _title = "Quản lý danh mục";
    } else if (location.pathname === config.routes.websiteManagement) {
      _title = "Quản lý website";
    } else if (location.pathname === config.routes.dashboard) {
      _title = "Bảng điều khiển";
    } else if (location.pathname === config.routes.groupCategoryManagement) {
      _title = "Quản lý nhóm danh mục";
    } else if (location.pathname === config.routes.groupProductManagement) {
      _title = "Quản lý nhóm sản phẩm";
    } else if (location.pathname === config.routes.colorManagement) {
      _title = "Quản lý màu sắc";
    } else if (location.pathname === config.routes.sizeManagement) {
      _title = "Quản lý kích cỡ";
    } else if (location.pathname === config.routes.discountManagement) {
      _title = "Quản lý giảm giá";
    } else if (location.pathname === config.routes.roleManagement) {
      _title = "Quản lý quyền";
    } else if (location.pathname === config.routes.couponManagement) {
      _title = "Quản lý ưu đãi";
    }
    document.title = _title;
    setTitle(_title);
  }, [location.pathname]);

  return (
    <StyledAppBar
      position="absolute"
      open={open}
      marginleft={!matches ? "0" : `${DRAWER_WIDTH}px`}
      width={!matches ? "100%" : `calc(100% - ${DRAWER_WIDTH}px)`}
    >
      <Box bgcolor="var(--main-color)" color="#000">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
          {/* <NotificationIcon /> */}
          <Avatar
            src="https://yt3.ggpht.com/j7rWPU-0EVNxRlae3x01RpuKjRHoCXj9a7mm2FpORmMPG8iIQYL0xR79JbCrSZK44v9KfPI0OSI=s88-c-k-c0x00ffffff-no-rj"
            alt="Phan Khánh Duy"
          />
        </Toolbar>
      </Box>
    </StyledAppBar>
  );
};

export default React.memo(AppBar);
