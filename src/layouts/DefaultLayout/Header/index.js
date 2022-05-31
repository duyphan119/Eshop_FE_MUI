import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Box, Container, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";
import config from "../../../config";
import {
  configAxiosAll,
  configAxiosResponse,
} from "../../../config/configAxios";
import { API_CART_URL, API_PRODUCT_URL } from "../../../constants";
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

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      (async function () {
        const promiseWishlist = new Promise((resolve, reject) => {
          resolve(
            configAxiosResponse().get(`${API_PRODUCT_URL}/user/${user.id}`)
          );
        });
        const promiseCart = new Promise((resolve, reject) => {
          resolve(
            configAxiosAll(user, dispatch).get(
              `${API_CART_URL}/user/${user.id}`
            )
          );
        });
        Promise.allSettled([promiseWishlist, promiseCart])
          .then((values) => {
            dispatch(getWishlist(values[0].value));
            dispatch(getCart(values[1].value));
          })
          .catch((err) => () => {});
      })();
    }
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
        <Link to="/thoi-trang-tre-em">
          <div
            style={{
              backgroundImage:
                "url(https://bizweb.sapocdn.net/100/438/408/themes/863105/assets/bannertop.jpg?1653901597354)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "60px",
              width: "100%",
            }}
          ></div>
        </Link>
        <Container sx={{ position: "relative" }}>
          <Grid
            container
            sx={{
              height: "60px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={3} xl={2} lg={2}>
              <Logo />
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
