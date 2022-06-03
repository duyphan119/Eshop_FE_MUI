import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { configAxiosAll } from "../../config/configAxios";
import { API_CART_ITEM_URL } from "../../constants";
import {
  removeCartItem,
  updateCart,
  selectCartItem,
  deSelectCartItem,
} from "../../redux/cartSlice";
import {
  formatThousandDigits,
  getNewPrice,
  getThumbnailCartItem,
} from "../../utils";

const CartItem = ({ item, checked }) => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const hasDiscount = useMemo(() => {
    return (
      item.detail.product.discounts && item.detail.product.discounts.length > 0
    );
  }, [item.detail.product.discounts]);

  const hasDiscountCategory = useMemo(() => {
    return (
      item.detail.product.category.discounts &&
      item.detail.product.category.discounts.length > 0
    );
  }, [item.detail.product.category.discounts]);

  async function handleUpdateCart(value) {
    try {
      let newQuantity = parseInt(value);
      if (!isNaN(newQuantity)) {
        if (newQuantity === 0) {
          await configAxiosAll(user, dispatch).delete(
            `${API_CART_ITEM_URL}/${item.id}`
          );
          dispatch(removeCartItem(item));
        } else if (newQuantity > 0 && newQuantity <= item.detail.amount) {
          const data = await configAxiosAll(user, dispatch).put(
            `${API_CART_ITEM_URL}`,
            {
              id: item.id,
              product_detail_id: item.detail.id,
              quantity: newQuantity,
            }
          );
          dispatch(updateCart(data));
        }
      }
    } catch (error) {}
  }

  async function handleDeleteItem() {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_CART_ITEM_URL}/${item.id}`
      );
      dispatch(removeCartItem(item.id));
    } catch (error) {}
  }

  function handleCheck(e) {
    if (e.target.checked) {
      dispatch(selectCartItem(item));
    } else {
      dispatch(deSelectCartItem(item));
    }
  }

  if (!item) return "";
  console.log(item);
  return (
    <Grid
      container
      style={{
        alignItems: "center",
        backgroundColor: "#fff",
        marginBottom: "10px",
        paddingBlock: "8px",
        position: "relative",
      }}
    >
      <Grid
        item
        xs={12}
        md={7}
        style={{
          display: "flex",
          paddingLeft: "8px",
          width: "100%",
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheck} />}
        />
        <img
          src={getThumbnailCartItem(item)}
          alt=""
          style={{
            height: "80px",
            width: "68px",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: "10px",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "600",
            }}
          >
            <Link to={`/product/${item.detail.product.slug}`}>
              {item.detail.product.name}
            </Link>
          </Typography>
          <Typography variant="body2">
            {item.detail.color.value} / {item.detail.size.value}
          </Typography>
          <Typography variant="body2">
            {hasDiscountCategory ? (
              <span style={{ color: "var(--main-color)" }}>
                {formatThousandDigits(
                  getNewPrice(
                    item.detail.product.price,
                    item.detail.product.category.discounts[0].percent
                  )
                )}
                đ
              </span>
            ) : (
              hasDiscount && (
                <span style={{ color: "var(--main-color)" }}>
                  {formatThousandDigits(
                    item.detail.product.discounts[0].new_price
                  )}
                  đ
                </span>
              )
            )}
            <span
              style={
                hasDiscountCategory || hasDiscount
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
          <Box
            className=""
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              justifyContent: "space-between",
              alignItems: "center",
              width: "140px",
              position: "absolute",
              right: "8px",
              bottom: "8px",
            }}
          >
            <IconButton
              color="error"
              component="span"
              size="small"
              onClick={handleDeleteItem}
            >
              <DeleteIcon />
            </IconButton>
            <div className="cart-item-quantity-wrapper">
              <button onClick={() => handleUpdateCart(item.quantity - 1)}>
                <RemoveOutlinedIcon style={{ fontSize: "14px" }} />
              </button>
              <input
                type="text"
                value={item.quantity}
                onChange={(e) => handleUpdateCart(e.target.value)}
              />
              <button onClick={() => handleUpdateCart(item.quantity + 1)}>
                <AddOutlinedIcon style={{ fontSize: "14px" }} />
              </button>
            </div>
          </Box>
        </div>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: {
            md: "flex",
            xs: "none",
          },
          justifyContent: "center",
        }}
      >
        <div className="cart-item-quantity-wrapper">
          <button onClick={() => handleUpdateCart(item.quantity - 1)}>
            <RemoveOutlinedIcon style={{ fontSize: "14px" }} />
          </button>
          <input
            type="text"
            value={item.quantity}
            onChange={(e) => handleUpdateCart(e.target.value)}
          />
          <button onClick={() => handleUpdateCart(item.quantity + 1)}>
            <AddOutlinedIcon style={{ fontSize: "14px" }} />
          </button>
        </div>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: {
            md: "flex",
            xs: "none",
          },
          justifyContent: "center",
        }}
      >
        {formatThousandDigits(
          (hasDiscountCategory
            ? getNewPrice(
                item.detail.product.price,
                item.detail.product.category.discounts[0].percent
              )
            : hasDiscount
            ? item.detail.product.discounts[0].new_price
            : item.detail.product.price) * item.quantity
        )}
        đ
      </Grid>
      <Grid
        item
        xs={1}
        sx={{
          display: {
            md: "flex",
            xs: "none",
          },
          justifyContent: "center",
          paddingRight: "8px",
        }}
      >
        <IconButton color="error" component="span" onClick={handleDeleteItem}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CartItem;
