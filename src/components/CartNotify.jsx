import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { apiRemoveCartItem, apiUpdateCart } from "../api/apiCartItem";
import EmptyCart from "../pages/EmptyCart";
import "./styles/cart_notify.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { apiGetCartByUser } from "../api/apiCart";
const CartNotify = () => {
  const cart = useSelector((state) => state.cart.cart);

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    apiGetCartByUser(user, dispatch);
  }, [dispatch, user]);

  const handleUpdateCart = (item, value) => {
    try {
      let newQuantity = parseInt(value);
      if (!isNaN(newQuantity)) {
        if (newQuantity === 0) {
          apiRemoveCartItem(user, item.id, dispatch);
        } else if (
          newQuantity > 0 &&
          newQuantity <= item.product_color_size.amount
        ) {
          apiUpdateCart(
            user,
            {
              product_color_size_id: item.product_color_size.id,
              quantity: newQuantity,
            },
            dispatch
          );
        }
      }
    } catch (error) {}
  };
  const handleDeleteItem = (item) => {
    apiRemoveCartItem(user, item.id, dispatch);
  };
  console.log(cart);
  return (
    <Box className="cart-notify">
      {cart?.items?.length === 0 && <EmptyCart />}
      {cart?.items?.length > 0 && (
        <>
          <div className="cart-notify-list">
            {cart.items.map((item) => {
              return (
                <div key={Math.random()} className="cart-notify-item">
                  <img
                    src={(() => {
                      try {
                        return item.detail.product.images.find(
                          (image) => image.color_id === item.detail.color.id
                        ).url;
                      } catch (error) {
                        return "";
                      }
                    })()}
                    alt=""
                  />
                  <div className="cart-notify-item-text">
                    <Typography variant="body1">
                      {item.detail.product.name}
                    </Typography>
                    <Typography variant="body2">
                      {item.detail.color.value} / {item.detail.size.value}
                    </Typography>
                    <div>
                      <div
                        style={{
                          width: "84px",
                          display: "flex",
                          alignItems: "center",
                          overflow: "hidden",
                          borderRadius: "30px",
                          border: "1px solid #000",
                        }}
                      >
                        <button
                          className="cart-notify-item-btn-quantity"
                          onClick={() =>
                            handleUpdateCart(item, item.quantity - 1)
                          }
                        >
                          <RemoveOutlinedIcon style={{ fontSize: "14px" }} />
                        </button>
                        <input
                          type="text"
                          style={{
                            width: "28px",
                            border: "none",
                            outline: "none",
                            textAlign: "center",
                            backgroundColor: "inherit",
                          }}
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateCart(item, e.target.value)
                          }
                        />
                        <button
                          className="cart-notify-item-btn-quantity"
                          onClick={() =>
                            handleUpdateCart(item, item.quantity + 1)
                          }
                        >
                          <AddOutlinedIcon style={{ fontSize: "14px" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="cart-notify-item-remove"
                    onClick={() => handleDeleteItem(item)}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-notify-actions">
            <Button variant="contained">
              <Link
                to={`/cart`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Đi đến giỏ hàng
              </Link>
            </Button>
          </div>
        </>
      )}
    </Box>
  );
};

export default CartNotify;
