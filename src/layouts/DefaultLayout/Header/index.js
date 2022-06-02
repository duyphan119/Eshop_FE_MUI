import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Box, Container, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";
import config from "../../../config";
import {
  configAxiosAll,
  configAxiosResponse,
} from "../../../config/configAxios";
import {
  API_BANNER_URL,
  API_CART_URL,
  API_PRODUCT_URL,
} from "../../../constants";
import { getCart } from "../../../redux/cartSlice";
import { getWishlist } from "../../../redux/wishlistSlice";
import AccountNotify from "./AccountNotify";
import CartNotify from "./CartNotify";
import "./Header.css";
import HeaderCategoryList from "./HeaderCategoryList";
import HeaderDrawer from "./HeaderDrawer";
import SearchBar from "./SearchBar";
const Header = ({ headerRef }) => {
  const cart = useSelector((state) => state.cart.cart);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const user = useSelector((state) => state.auth.currentUser);

  const [banner, setBanner] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const promises = [];

    promises.push(
      new Promise((resolve, reject) => {
        resolve(
          configAxiosResponse().get(
            `${API_BANNER_URL}?position=above-header&page=/&isShow=true`
          )
        );
      })
    );

    if (user) {
      promises.push(
        new Promise((resolve, reject) => {
          resolve(
            configAxiosResponse().get(`${API_PRODUCT_URL}/user/${user.id}`)
          );
        })
      );

      promises.push(
        new Promise((resolve, reject) => {
          resolve(
            configAxiosAll(user, dispatch).get(
              `${API_CART_URL}/user/${user.id}`
            )
          );
        })
      );
    }

    Promise.allSettled(promises)
      .then((listRes) => {
        if (listRes[0].status === "fulfilled") {
          setBanner(listRes[0].value[0]);
        }
        if (listRes.length > 1) {
          if (listRes[1].status === "fulfilled") {
            dispatch(getWishlist(listRes[1].value));
          }
          if (listRes[2].status === "fulfilled") {
            dispatch(getCart(listRes[2].value));
          }
        }
      })
      .catch((err) => () => {});
  }, [user, dispatch]);
  return (
    <>
      <Box
        bgcolor="var(--main-color)"
        sx={{
          position: {
            xs: "absolute",
            sm: "fixed",
          },
          top: "0",
          left: "0",
          width: "100%",
          zIndex: "999",
        }}
        ref={headerRef}
      >
        {banner && (
          <Link to={banner.href}>
            <div
              style={{
                backgroundImage: `url(${banner.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "60px",
                width: "100%",
              }}
            ></div>
          </Link>
        )}
        <Container sx={{ position: "static" }}>
          <Grid
            container
            sx={{
              height: "60px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={3} xl={2} lg={2}>
              <Logo style={{ color: "#fff" }} />
            </Grid>
            <Grid
              item
              lg={6}
              sx={{
                height: "100%",
                display: {
                  xs: "none",
                  lg: "block",
                },
                justifyContent: "center",
              }}
            >
              <HeaderCategoryList />
            </Grid>
            <Grid
              item
              xs={9}
              sx={{
                justifyContent: "flex-end",
                height: "100%",
                position: "relative",
                display: {
                  xs: "flex",
                  lg: "none",
                },
              }}
            >
              <div className="label-header-right">
                <HeaderDrawer />
              </div>
            </Grid>
            <Grid
              item
              lg={4}
              sx={{
                justifyContent: "flex-end",
                height: "100%",
                position: "relative",
                display: {
                  xs: "none",
                  lg: "flex",
                },
              }}
            >
              <SearchBar />
              <div className="header-account">
                <Link to="/account" className="header-account-link">
                  <AccountBoxOutlinedIcon />
                </Link>
                <AccountNotify />
              </div>
              <Link
                to={config.routes.accountFavorite}
                className="header-favorite-link"
              >
                <Tooltip title="Sản phẩm yêu thích">
                  <Badge badgeContent={wishlist.length} color="secondary">
                    <FavoriteBorderOutlinedIcon />
                  </Badge>
                </Tooltip>
              </Link>
              <div className="header-cart">
                <Link to={config.routes.cart} className="header-cart-link">
                  <Tooltip title="Giỏ hàng của bạn">
                    <Badge
                      badgeContent={cart && cart.items ? cart.items.length : 0}
                      color="secondary"
                    >
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </Tooltip>
                </Link>
                <CartNotify />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Header;
