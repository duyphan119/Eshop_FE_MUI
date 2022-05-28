import { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import config from "../../../config";

export default function HeaderDrawer() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const [state, setState] = useState(false);
  const genderCategories = useSelector((state) => state.genderCategory.list);
  const [showGenderCategories, setShowGenderCategories] = useState(false);

  const toggleDrawer = (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setState(!state);
  };

  return (
    <>
      <MenuIcon onClick={toggleDrawer} />

      <Drawer
        anchor="right"
        open={state}
        onClose={toggleDrawer}
        variant={matches ? "permanent" : "temporary"}
      >
        <Box sx={{ width: 250 }} onKeyDown={() => setState(!state)}>
          <List>
            <Link
              to={config.routes.account}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItem button onClick={() => setState(!state)}>
                <ListItemIcon>
                  <AccountBoxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Thông tin tài khoản" />
              </ListItem>
            </Link>
            <Link
              to={config.routes.cart}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItem button onClick={() => setState(!state)}>
                <ListItemIcon>
                  <ShoppingCartOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Giỏ hàng" />
              </ListItem>
            </Link>
            <ListItem
              button
              onClick={() => setShowGenderCategories(!showGenderCategories)}
            >
              <ListItemIcon>
                <CategoryOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Danh mục" />
            </ListItem>
            {showGenderCategories &&
              genderCategories.map((genderCategory) => (
                <Link
                  to={`/${genderCategory.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <ListItem button key={genderCategory.slug + Math.random()}>
                    <ListItemText primary={genderCategory.short_name} />
                  </ListItem>
                </Link>
              ))}
            <Link
              to={config.routes.accountFavorite}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItem button onClick={() => setState(!state)}>
                <ListItemIcon>
                  <FavoriteBorderOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Yêu thích" />
              </ListItem>
            </Link>
            <ListItem button onClick={() => setState(!state)}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
