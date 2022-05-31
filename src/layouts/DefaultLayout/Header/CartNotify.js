import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { memo } from "react";
import EmptyCart from "../../../components/EmptyCart";
import config from "../../../config";
import { configAxiosAll } from "../../../config/configAxios";
import { API_CART_ITEM_URL } from "../../../constants";
import { removeCartItem } from "../../../redux/cartSlice";
import { showToastMessage } from "../../../redux/toastSlice";
import { formatThousandDigits, getThumbnailCartItem } from "../../../utils";

const CartNotify = () => {
  const cart = useSelector((state) => state.cart.cart);

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const handleDeleteItem = (item) => {
    configAxiosAll(user, dispatch)
      .delete(`${API_CART_ITEM_URL}/${item.id}`)
      .then((res) => {
        dispatch(removeCartItem(item));
        dispatch(
          showToastMessage({
            type: "success",
            text: "Xoá thành công",
            isOpen: true,
          })
        );
      })
      .catch((err) => {
        dispatch(
          showToastMessage({
            type: "error",
            text: "Xoá thất bại",
            isOpen: true,
          })
        );
      });
  };

  return (
    <Box className="cart-notify">
      {cart?.items?.length === 0 && <EmptyCart />}
      {cart?.items?.length > 0 && (
        <>
          <div className="cart-notify-list">
            {cart.items.map((item) => {
              const hasDiscount =
                item.detail.product.discounts &&
                item.detail.product.discounts.length;
              return (
                <div key={Math.random()} className="cart-notify-item">
                  <img src={getThumbnailCartItem(item)} alt="" />
                  <div className="cart-notify-item-text">
                    <Typography variant="body1">
                      {item.detail.product.name}
                    </Typography>
                    <Typography variant="body2">
                      {item.detail.color.value} / {item.detail.size.value}
                    </Typography>
                    <Typography variant="body2">
                      {hasDiscount ? (
                        <span style={{ color: "var(--main-color)" }}>
                          {formatThousandDigits(
                            item.detail.product.discounts[0].new_price
                          )}
                          đ
                        </span>
                      ) : (
                        ""
                      )}
                      <span
                        style={
                          hasDiscount
                            ? {
                                textDecoration: "line-through",
                                marginLeft: "4px",
                                color: "gray",
                              }
                            : {}
                        }
                      >
                        {formatThousandDigits(item.detail.product.price)}đ
                      </span>
                    </Typography>
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
                to={config.routes.cart}
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

export default memo(CartNotify);
