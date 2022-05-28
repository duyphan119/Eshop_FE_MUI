import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyCart from "../../components/EmptyCart";
import { TitlePage } from "../../components/Title";
import { getSelectedCartItems } from "../../redux/cartSlice";
import "./Cart.css";
import CartItem from "./CartItem";
import CartResult from "./CartResult";
const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);

  function handleChange(e) {
    if (e.target.checked) {
      dispatch(getSelectedCartItems(cart));
    } else {
      dispatch(getSelectedCartItems({ items: [], count: 0 }));
    }
  }

  return (
    <Box sx={{ minHeight: "100%", paddingBlock: "20px" }}>
      {!cart || cart.items.length === 0 ? (
        <EmptyCart />
      ) : (
        <Container>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <TitlePage>Giỏ hàng</TitlePage>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item lg={12}>
              <Grid container>
                <Grid item lg={12}>
                  <Grid container className="cart-header-container">
                    <Grid item lg={6} className="cart-header cart-total-item">
                      {cart.count} Sản phẩm
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      sx={{
                        textAlign: "right",
                      }}
                    >
                      <Link
                        to={`/`}
                        className="cart-header cart-continue-shopping-link"
                      >
                        Tiếp tục mua hàng
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className="cart-checkout" lg={7}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          cart.items.length === selectedCartItems.items.length
                        }
                        onChange={handleChange}
                      />
                    }
                  />
                  Mặt hàng
                </Grid>
                <Grid item className="cart-checkout-quantity" lg={2}>
                  Số lượng
                </Grid>
                <Grid item className="cart-checkout-total-price" lg={2}>
                  Tổng tiền
                </Grid>
                <Grid item className="cart-checkout-actions" lg={1}></Grid>
              </Grid>
              {cart.items.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    checked={
                      selectedCartItems.items.findIndex(
                        (el) => el.id === item.id
                      ) !== -1
                    }
                    item={item}
                  />
                );
              })}
            </Grid>
            <Grid item lg={12} className="cart-result-title">
              <CartResult />
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default Cart;
