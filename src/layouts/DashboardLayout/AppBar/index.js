import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ClickAwayListener, Paper } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { DRAWER_WIDTH } from "../../../constants";
import { SocketContext } from "../../../context";

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const notifications = [
  {
    id: 1,
    type: "order",
    title: "Bạn có đơn hàng mới",
    href: "/dashboard/order",
    isRead: false,
  },
  {
    id: 2,
    type: "comment",
    title: "Người dùng đã đăng bài đánh giá mới",
    href: "/dashboard/comment",
    isRead: true,
  },
  {
    id: 3,
    type: "order",
    title: "Bạn có đơn hàng mới",
    href: "/dashboard/order",
    isRead: true,
  },
  {
    id: 4,
    type: "comment",
    title: "Người dùng đã đăng bài đánh giá mới",
    href: "/dashboard/comment",
    isRead: true,
  },
  {
    id: 5,
    type: "order",
    title: "Bạn có đơn hàng mới",
    href: "/dashboard/order",
    isRead: true,
  },
  {
    id: 6,
    type: "comment",
    title: "Người dùng đã đăng bài đánh giá mới",
    href: "/dashboard/comment",
    isRead: true,
  },
  {
    id: 7,
    type: "order",
    title: "Bạn có đơn hàng mới",
    href: "/dashboard/order",
    isRead: true,
  },
  {
    id: 8,
    type: "comment",
    title: "Người dùng đã đăng bài đánh giá mới",
    href: "/dashboard/comment",
    isRead: true,
  },
];

const AppBar = ({ open, toggleDrawer }) => {
  const socket = React.useContext(SocketContext);

  const [title, setTitle] = React.useState("");
  const [showNotifications, setShowNotifications] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    const handler = (item) => {
      console.log(item);
    };
    socket.on("receive-notify", handler);
    return () => socket.off("receive-notify", handler);
  }, [socket]);

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
    <StyledAppBar position="absolute" open={open}>
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
        <ClickAwayListener
          onClickAway={() => {
            setShowNotifications(false);
          }}
        >
          <IconButton
            color="inherit"
            sx={{ position: "relative" }}
            onClick={() => {
              setShowNotifications(!showNotifications);
            }}
          >
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
            {showNotifications && (
              <Paper
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "100%",
                  bgcolor: "#fff",
                  width: 300,
                  fontSize: 14,
                  maxHeight: 360,
                  overflowX: "hidden",
                  overflowY: "auto",
                  color: "#000",
                  boxShadow: " 0 0 2px 0 #666",
                }}
                className="custom-scrollbar"
              >
                {notifications.map((item, index) => (
                  <Link
                    to={item.href}
                    key={index}
                    onClick={() => {
                      setShowNotifications(false);
                    }}
                    style={{
                      display: "flex",
                      height: 60,
                      padding: 4,
                      backgroundColor: item.isRead ? "#fff" : "#eee",
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </Paper>
            )}
          </IconButton>
        </ClickAwayListener>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
