import { Button, Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatThousandDigits, getTotalPage } from "../../utils";

const CartResult = () => {
  const cart = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <Grid container className="cart-result-container">
      <Grid item lg={12} className="cart-result-item">
        <div className="cart-result-item-left">Thành tiền</div>
        <div className="cart-result-item-right">
          {formatThousandDigits(getTotalPage(cart))}đ
        </div>
      </Grid>
      <Grid item lg={12} className="cart-result-item">
        <div className="cart-result-item-left">Giảm giá</div>
        <div className="cart-result-item-right">Không</div>
      </Grid>
      <Grid item lg={12} className="cart-result-item">
        <div className="cart-result-item-left cart-result-last-item-left">
          Tổng cộng
        </div>
        <div className="cart-result-item-right cart-result-last-item-right">
          {formatThousandDigits(getTotalPage(cart))}đ
        </div>
      </Grid>
      <Grid
        item
        lg={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          sx={{
            flex: "1",
          }}
          onClick={handleCheckOut}
        >
          THANH TOÁN
        </Button>
      </Grid>
    </Grid>
  );
};

export default CartResult;
