import { Box, Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatThousandDigits, getTotalPrice } from "../../utils";
import config from "../../config";
import { getCart, getSelectedCartItems } from "../../redux/cartSlice";
const CartResult = () => {
  const cart = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCheckOut = () => {
    if (cart.items.length > 0) {
      navigate(config.routes.checkout);
    }
  };

  function handleChange(e) {
    if (e.target.checked) {
      dispatch(getCart(cart));
    } else {
      dispatch(getCart({ items: [], count: 0 }));
    }
  }

  return (
    <Box display="flex" mt={4}>
      <Box flex={1}>
        <div style={{ marginBottom: 16 }}>GHI CHÚ</div>
        <textarea
          style={{
            width: "100%",
            fontSize: 16,
            padding: 8,
            outlineColor: "var(--main-color)",
          }}
          rows={5}
        ></textarea>
      </Box>
      <Box flex={1} textAlign="right">
        <div style={{ marginBottom: 16 }}>TỔNG TIỀN</div>
        <div style={{ fontSize: 26 }}>
          {formatThousandDigits(getTotalPrice(cart))} ₫
        </div>
        <div style={{ fontSize: 14 }}>
          Vận chuyển và thuế tính lúc thanh toán
        </div>
        <div style={{ height: 40, marginTop: 16 }}>
          <Button
            sx={{
              py: 1,
              px: 2,
              color: "var(--main-color)",
              bgcolor: "#fff",
              borderRadius: 0,
              border: "1px solid var(--main-color)",
              "&:hover": {
                bgcolor: "var(--main-color)",
                color: "#fff",
              },
              mr: 1,
            }}
          >
            TIẾP TỤC MUA HÀNG
          </Button>
          <Button
            sx={{
              py: 1,
              px: 2,
              bgcolor: "var(--main-color)",
              color: "#fff",
              border: "1px solid var(--main-color)",
              borderRadius: 0,
              opacity: 0.9,
              "&:hover": {
                bgcolor: "var(--main-color)",
                color: "#fff",
                opacity: 1,
              },
            }}
          >
            THANH TOÁN
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default CartResult;
