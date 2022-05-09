import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { Grid, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiRemoveCartItem, apiUpdateCart } from "../api/apiCartItem";

const CartItem = ({ item }) => {
  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  const handleUpdateCart = (value) => {
    try {
      let newQuantity = parseInt(value);
      if (!isNaN(newQuantity)) {
        if (newQuantity === 0) {
          apiRemoveCartItem(user, item.id, dispatch);
        } else if (newQuantity > 0 && newQuantity <= item.detail.amount) {
          apiUpdateCart(
            user,
            {
              id: item.id,
              product_detail_id: item.detail.id,
              quantity: newQuantity,
            },
            dispatch
          );
        }
      }
    } catch (error) {}
  };

  const handleDeleteItem = () => {
    apiRemoveCartItem(user, item.id, dispatch);
  };

  console.log(item);

  return (
    <Grid
      container
      style={{
        alignItems: "center",
        backgroundColor: "#fff",
        marginBottom: "10px",
        paddingBlock: "8px",
      }}
    >
      <Grid
        item
        lg={7}
        style={{
          display: "flex",
          paddingLeft: "8px",
        }}
      >
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
            <Link to={`/${item.detail.product.slug}`}>
              {item.detail.product.name}
            </Link>
          </Typography>
          <Typography variant="body2">
            {item.detail.color.value} / {item.detail.size.value}
          </Typography>
          <Typography variant="body2">
            {item.product_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            đ
          </Typography>
        </div>
      </Grid>
      <Grid
        item
        lg={2}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
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
            style={{
              width: "28px",
              height: "22px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              borderRight: "1px solid #000",
              cursor: "pointer",
            }}
            onClick={() => handleUpdateCart(item.quantity - 1)}
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
            onChange={(e) => handleUpdateCart(e.target.value)}
          />
          <button
            style={{
              width: "28px",
              height: "22px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              borderLeft: "1px solid #000",
              cursor: "pointer",
            }}
            onClick={() => handleUpdateCart(item.quantity + 1)}
          >
            <AddOutlinedIcon style={{ fontSize: "14px" }} />
          </button>
        </div>
      </Grid>
      <Grid
        item
        lg={2}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {(item.product_price * item.quantity)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
        đ
      </Grid>
      <Grid
        item
        lg={1}
        sx={{
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
