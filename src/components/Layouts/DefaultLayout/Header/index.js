import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Box, Container, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { configAxiosAll } from "../../../../config/configAxios";
import { API_CART_URL } from "../../../../constants";
import { getCart } from "../../../../redux/cartSlice";
import AccountNotify from "./AccountNotify";
import CartNotify from "./CartNotify";
import "./Header.css";
import HeaderCategoryList from "./HeaderCategoryList";
import HeaderDrawer from "./HeaderDrawer";
import SearchBar from "./SearchBar";
const Header = () => {
  // const theme = useTheme

  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.product.favoriteList);
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      (async function () {
        const data = await configAxiosAll(user, dispatch).get(
          `${API_CART_URL}/user/${user.id}`
        );
        console.log(data);
        dispatch(getCart(data));
      })();
    }
  }, [user, dispatch]);
  // const [callApiOnlyOne, setCallApiOnlyOne] = useState(false);
  // useEffect(() => {
  //   if (user && !callApiOnlyOne) {
  //     const callApi = async () => {
  //       const data = await apiGetFavoriteListByUser(user, dispatch);
  //       dispatch(getFavoriteList(data));
  //       setCallApiOnlyOne(true);
  //     };
  //     callApi();
  //   }
  // }, [user, dispatch, callApiOnlyOne]);

  return (
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
    >
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
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: "500",
              }}
            >
              CHICKEN DEV
            </Link>
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
            <Link to="/favorite" className="header-favorite-link">
              <Badge badgeContent={products.length} color="secondary">
                <FavoriteBorderOutlinedIcon />
              </Badge>
            </Link>
            <div className="header-cart">
              <Link to="/cart" className="header-cart-link">
                <Badge
                  badgeContent={cart && cart.items ? cart.items.length : 0}
                  color="secondary"
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </Link>
              <CartNotify />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
