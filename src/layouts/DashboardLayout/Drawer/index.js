import BarChartIcon from "@mui/icons-material/BarChart";
import CategoryIcon from "@mui/icons-material/Category";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import StraightenIcon from "@mui/icons-material/Straighten";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import RedeemIcon from "@mui/icons-material/Redeem";
import DiscountIcon from "@mui/icons-material/Discount";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Box, Tooltip, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const Drawer = ({ open, toggleDrawer }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const location = useLocation();

  const [items, setItems] = React.useState([
    {
      text: "Bảng điều khiển",
      to: config.routes.dashboard,
      icon: DashboardIcon,
    },
    {
      text: "Danh mục",
      icon: CategoryIcon,
      children: [
        {
          text: "Nhóm danh mục",
          to: config.routes.groupCategoryManagement,
          icon: WidgetsIcon,
        },
        {
          text: "Danh mục",
          to: config.routes.categoryManagement,
          icon: CategoryIcon,
        },
      ],
      isShowChildren:
        location.pathname === config.routes.groupCategoryManagement ||
        location.pathname === config.routes.categoryManagement,
    },
    {
      text: "Sản phẩm",
      icon: InventoryIcon,
      children: [
        {
          text: "Màu sắc",
          to: config.routes.colorManagement,
          icon: ColorLensIcon,
        },
        {
          text: "Kích cỡ",
          to: config.routes.sizeManagement,
          icon: StraightenIcon,
        },
        {
          text: "Nhóm sản phẩm",
          to: config.routes.groupProductManagement,
          icon: WidgetsIcon,
        },
        {
          text: "Sản phẩm",
          to: config.routes.productManagement,
          icon: InventoryIcon,
        },
        {
          text: "Giảm giá",
          to: config.routes.discountManagement,
          icon: DiscountIcon,
        },
      ],
      isShowChildren:
        location.pathname === config.routes.colorManagement ||
        location.pathname === config.routes.productManagement ||
        location.pathname === config.routes.groupProductManagement ||
        location.pathname === config.routes.discountManagement ||
        location.pathname === config.routes.sizeManagement,
    },
    {
      text: "Bình luận",
      to: config.routes.commentManagement,
      icon: ModeCommentIcon,
    },
    {
      text: "Người dùng",
      icon: PeopleIcon,
      children: [
        {
          text: "Quyền",
          to: config.routes.roleManagement,
          icon: PermIdentityIcon,
        },
        {
          text: "Người dùng",
          to: config.routes.userManagement,
          icon: PeopleIcon,
        },
      ],
      isShowChildren:
        location.pathname === config.routes.roleManagement ||
        location.pathname === config.routes.userManagement,
    },
    {
      text: "Đơn hàng",
      icon: ReceiptIcon,
      children: [
        {
          text: "Ưu đãi",
          to: config.routes.couponManagement,
          icon: RedeemIcon,
        },
        {
          text: "Đơn hàng",
          to: config.routes.orderManagement,
          icon: ReceiptIcon,
        },
      ],
      isShowChildren:
        location.pathname === config.routes.roleManagement ||
        location.pathname === config.routes.userManagement,
    },
    {
      text: "Thống kê",
      to: config.routes.statistics,
      icon: BarChartIcon,
    },
  ]);

  const navigate = useNavigate();

  function handleClick(item, index) {
    const _items = [...items];
    _items[index].isShowChildren = !_items[index].isShowChildren;
    setItems(_items);
    if (item.to) {
      navigate(item.to);
    }
  }

  return (
    <StyledDrawer variant={matches ? "permanent" : "temporary"} open={open}>
      <Box bgcolor="#fff" height="100vh">
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
            position: "fixed",
            top: 0,
            left: 0,
            bgcolor: "#fff",
            overflow: "hidden",
            width: DRAWER_WIDTH,
          }}
        >
          <Logo
            style={{
              color: "#000",
              fontSize: 52,
            }}
            sx={{ height: 64, ml: 1 }}
          />
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <div
          style={{
            marginTop: 64,
            height: "calc(100vh - 64px)",
            overflowY: "overlay",
          }}
          className="custom-scrollbar"
        >
          <Divider />
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 1,
                    px: 2,
                    bgcolor:
                      item.to && location.pathname === item.to
                        ? "var(--main-color)"
                        : "inherit",
                    color:
                      item.to && location.pathname === item.to
                        ? "#000"
                        : "#000",
                    "&:hover": {
                      bgcolor: "lightgray",
                      color: "#000",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => handleClick(item, index)}
                >
                  {open ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Icon />
                        <div style={{ marginLeft: theme.spacing(2) }}>
                          {item.text}
                        </div>
                      </div>
                      {item.children && <KeyboardArrowDownIcon />}
                    </div>
                  ) : (
                    <Tooltip title={item.text} placement="right">
                      <Icon />
                    </Tooltip>
                  )}
                </Box>
                <Box>
                  {item.children &&
                    item.isShowChildren &&
                    item.children.map((element, index) => {
                      const Icon = element.icon;
                      return (
                        <Link to={element.to} key={index}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              py: 1,
                              pl: open ? 4 : 2,
                              pr: 2,
                              fontSize: 14,
                              userSelect: "none",
                              bgcolor:
                                location.pathname === element.to
                                  ? "var(--main-color)"
                                  : "inherit",
                              color:
                                location.pathname === element.to
                                  ? "#000"
                                  : "#000",
                              "&:hover": {
                                bgcolor: "lightgray",
                                color: "#000",
                              },
                            }}
                          >
                            {open ? (
                              <Icon sx={{ fontSize: 20 }} />
                            ) : (
                              <Tooltip title={element.text} placement="right">
                                <Icon />
                              </Tooltip>
                            )}

                            <div style={{ marginLeft: theme.spacing(2) }}>
                              {open ? element.text : ""}
                            </div>
                          </Box>
                        </Link>
                      );
                    })}
                </Box>
              </Box>
            );
          })}
        </div>
      </Box>
    </StyledDrawer>
  );
};

export default Drawer;
