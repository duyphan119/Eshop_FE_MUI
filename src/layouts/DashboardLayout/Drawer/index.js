import BarChartIcon from "@mui/icons-material/BarChart";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import WebIcon from "@mui/icons-material/Web";
import { Box, Tooltip, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../components/Logo";
import config from "../../../config";
import { DRAWER_WIDTH } from "../../../constants";
const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
    }),
  },
}));

const items = [
  {
    text: "Bảng điều khiển",
    to: config.routes.dashboard,
    icon: DashboardIcon,
  },
  {
    text: "Danh mục",
    to: config.routes.categoryManagement,
    icon: CategoryIcon,
  },
  {
    text: "Sản phẩm",
    to: config.routes.productManagement,
    icon: InventoryIcon,
  },
  {
    text: "Bình luận",
    to: config.routes.commentManagement,
    icon: ModeCommentIcon,
  },
  {
    text: "Người dùng",
    to: config.routes.userManagement,
    icon: PeopleIcon,
  },
  {
    text: "Hoá đơn",
    to: config.routes.orderManagement,
    icon: ReceiptIcon,
  },
  // {
  //   text: "Website",
  //   to: config.routes.websiteManagement,
  //   icon: WebIcon,
  // },
  {
    text: "Thống kê",
    to: config.routes.statistics,
    icon: BarChartIcon,
  },
];

const Drawer = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const location = useLocation();

  return (
    <StyledDrawer variant={matches ? "permanent" : "temporary"} open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <Logo
          style={{
            color: "var(--main-color)",
            fontSize: 60,
          }}
        />
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link to={item.to} key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                bgcolor:
                  location.pathname === item.to
                    ? "var(--main-color)"
                    : "inherit",
                color: location.pathname === item.to ? "#fff" : "gray",
                "&:hover": {
                  bgcolor: "var(--main-color)",
                  color: "#fff",
                },
              }}
            >
              {open ? (
                <Icon />
              ) : (
                <Tooltip title={item.text} placement="right">
                  <Icon />
                </Tooltip>
              )}

              <div style={{ marginLeft: theme.spacing(2) }}>
                {open ? item.text : ""}
              </div>
            </Box>
          </Link>
        );
      })}
    </StyledDrawer>
  );
};

export default Drawer;
