import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { apiRemoveCartItem, apiUpdateCart } from "../api/apiCart";
import EmptyCart from "../pages/EmptyCart";
import "./styles/cart_notify.css";
const CartNotify = () => {
  const cart = useSelector((state) => state.cart.list);

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

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
  return (
    <Box className="cart-notify">
      {cart.length === 0 && <EmptyCart />}
      {cart.length > 0 && (
        <>
          <div className="cart-notify-list">
            {cart.map((item) => {
              return (
                <div key={item.id} className="cart-notify-item">
                  <img
                    src={
                      item.product_color_size.product_color
                        .product_color_images[0].url
                    }
                    alt=""
                  />
                  <div className="cart-notify-item-text">
                    <Typography variant="body1">
                      {item.product_color_size.product_color.product.name}
                    </Typography>
                    <Typography variant="body2">
                      {item.product_color_size.product_color.color} /{" "}
                      {item.product_color_size.size_text}
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
            <Button variant="contained">Đi đến giỏ hàng</Button>
          </div>
        </>
      )}
    </Box>
  );
};

export default CartNotify;
