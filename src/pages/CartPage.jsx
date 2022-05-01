import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import CartResult from "../components/CartResult";
import EmptyCart from "./EmptyCart";
import "./style/cart.css";
const CartPage = () => {
  const cart = useSelector((state) => state.cart.list);

  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);

  return (
    <Box sx={{ minHeight: "100%", paddingBlock: "20px" }}>
      {!cart || cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <Container>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">Giỏ hàng</Typography>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2}>
            <Grid item lg={9}>
              <Grid container>
                <Grid item lg={12}>
                  <Grid container className="cart-header-container">
                    <Grid item lg={6} className="cart-header cart-total-item">
                      {cart.length} Sản phẩm
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
              {cart.map((item) => {
                return <CartItem key={item.id} item={item} />;
              })}
            </Grid>
            <Grid item lg={3}>
              <Grid container>
                <Grid item lg={12} className="cart-result-title">
                  HOÁ ĐƠN CỦA BẠN
                </Grid>
              </Grid>
              <CartResult />
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default CartPage;
