import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useLocation } from "react-router-dom";
import { DRAWER_WIDTH } from "../../../../constants";
import { SocketContext } from "../../../../context";

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
const AppBar = ({ open, toggleDrawer }) => {
  const socket = React.useContext(SocketContext);

  const [title, setTitle] = React.useState("");

  const location = useLocation();

  React.useEffect(() => {
    const handler = (item) => {
      console.log(item);
    };
    socket.on("receive-notify", handler);
    return () => socket.off("receive-notify", handler);
  }, [socket]);

  React.useEffect(() => {
    if (location.pathname === "/dashboard/order") {
      setTitle("Quản lý hoá đơn");
    } else if (location.pathname === "/dashboard/product") {
      setTitle("Quản lý sản phẩm");
    } else if (location.pathname === "/dashboard/user") {
      setTitle("Quản lý người dùng");
    } else if (location.pathname === "/dashboard/comment") {
      setTitle("Quản lý bình luận");
    } else if (location.pathname === "/dashboard/statistics") {
      setTitle("Báo cáo, thống kê");
    } else if (location.pathname === "/dashboard/category") {
      setTitle("Quản lý danh mục");
    } else if (location.pathname === "/dashboard") {
      setTitle("Bảng điều khiển");
    }
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
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
