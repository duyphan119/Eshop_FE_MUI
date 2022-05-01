import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Box, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderCategoryList from "./HeaderCategoryList";
import HeaderDrawer from "./HeaderDrawer";
import { useDispatch, useSelector } from "react-redux";
import CartNotify from "./CartNotify";
import { apiGetFavoriteListByUser } from "../api/apiProductUser";
import { getFavoriteList } from "../redux/productSlice";
import AccountNotify from "./AccountNotify";
import "./styles/header.css";
import { apiSearch } from "../api/apiProduct";
const Header = () => {
  // const theme = useTheme

  const cart = useSelector((state) => state.cart.list);
  const products = useSelector((state) => state.product.favoriteList);
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchProducts, setSearchProducts] = useState([]);
  const [formSearch, setFormSearch] = useState({
    q: "",
    maxResult: 4,
  });
  const [callApiOnlyOne, setCallApiOnlyOne] = useState(false);
  useEffect(() => {
    if (user && !callApiOnlyOne) {
      const callApi = async () => {
        const data = await apiGetFavoriteListByUser(user, dispatch);
        dispatch(getFavoriteList(data));
        setCallApiOnlyOne(true);
      };
      callApi();
    }
  }, [user, dispatch, callApiOnlyOne]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (formSearch.q !== "") {
        const callApi = async () => {
          const data = await apiSearch(
            user,
            `?limit=${formSearch.maxResult}&q=${formSearch.q}`,
            dispatch
          );
          setSearchProducts(data.products);
        };
        callApi();
      } else {
        setSearchProducts([]);
      }
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [formSearch, user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${formSearch.q}`);
    setFormSearch({ q: "", isVisible: false });
  };

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
      <Container>
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
            <div className="header-search">
              <form className="header-form-search" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  value={formSearch.q}
                  onChange={(e) =>
                    setFormSearch({ ...formSearch, q: e.target.value })
                  }
                />
                <button type="submit">
                  <SearchOutlinedIcon
                    style={{
                      color: "#000",
                    }}
                  />
                </button>
                {searchProducts && searchProducts.length !== 0 && (
                  <ul className="header-search-result">
                    {searchProducts.map((item) => {
                      console.log(item.product_colors[0].thumbnail);
                      return (
                        <li key={item.id + Math.random()}>
                          <Link
                            to={`/${item.slug}`}
                            className="header-search-result-link"
                          >
                            <img
                              src={item.product_colors[0].thumbnail}
                              alt=""
                            />
                            <div>
                              <div className="three-dot three-dot-2">
                                {item.name}
                              </div>
                              <div>
                                {item.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                đ
                              </div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                    <li className="header-search-result-view-all">
                      <Button
                        onClick={() => {
                          navigate(`/search?q=${formSearch.q}`);
                        }}
                        size="small"
                      >
                        Xem tất cả
                      </Button>
                    </li>
                  </ul>
                )}
              </form>
            </div>
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
                <Badge badgeContent={cart.length} color="secondary">
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
