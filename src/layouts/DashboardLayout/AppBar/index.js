import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
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

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, marginleft, width }) => ({
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
    if (location.pathname === "/dashboard/order") {
      _title = "Quản lý hoá đơn";
    } else if (location.pathname === "/dashboard/product") {
      _title = "Quản lý sản phẩm";
    } else if (location.pathname === "/dashboard/user") {
      _title = "Quản lý người dùng";
    } else if (location.pathname === "/dashboard/comment") {
      _title = "Quản lý bình luận";
    } else if (location.pathname === "/dashboard/statistics") {
      _title = "Báo cáo, thống kê";
    } else if (location.pathname === "/dashboard/category") {
      _title = "Quản lý danh mục";
    } else if (location.pathname === "/dashboard/banner") {
      _title = "Quản lý banner";
    } else if (location.pathname === "/dashboard") {
      _title = "Bảng điều khiển";
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
        <NotificationIcon />
      </Toolbar>
    </StyledAppBar>
  );
};

export default React.memo(AppBar);
