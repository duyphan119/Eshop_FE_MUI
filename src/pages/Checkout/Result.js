import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Badge, Box, Button, FormControl, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TitleControl } from "../../components/Title";
import config from "../../config";
import { configAxiosAll } from "../../config/configAxios";
import { API_USER_COUPON_URL } from "../../constants";
import { formatThousandDigits, getThumbnailCartItem } from "../../utils";
const Result = ({ onCheckout, totalPrice, finalPrice, setCoupon }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );

  return (
    <Box pt={4} className={matches ? "order-result" : "order-result-tablet"}>
      <TitleControl>Đơn hàng ({selectedCartItems.count} sản phẩm)</TitleControl>

      {selectedCartItems.items.map((item, index) => (
        <div className="order-result-item" key={index}>
          <div className="order-result-item-img">
            <Badge badgeContent={item.quantity} color="primary">
              <img src={getThumbnailCartItem(item)} alt="" />
            </Badge>
          </div>
          <div className="order-result-item-center">
            <div className="order-result-item-name three-dot three-dot-2">
              {item.detail.product.name}
            </div>
            <div className="order-result-item-detail">
              {item.detail.color.value} / {item.detail.size.value}
            </div>
          </div>
          <div className="order-result-item-price">
            {formatThousandDigits(item.detail.product.price)}đ
          </div>
        </div>
      ))}
      <div className="order-result-separate"></div>
      <Coupon setCoupon={setCoupon} />
      <div className="order-result-separate"></div>
      <Item
        leftLabel="Tạm tính"
        rightLabel={`${formatThousandDigits(totalPrice)}đ`}
      />
      <Item leftLabel="Vận chuyển" rightLabel="0đ" />
      <Item
        leftLabel="Giảm giá"
        rightLabel={`${formatThousandDigits(totalPrice - finalPrice)}đ`}
      />
      <div className="order-result-separate"></div>
      <Item
        isLast={true}
        leftLabel="Tổng cộng"
        rightLabel={`${formatThousandDigits(finalPrice)}đ`}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
          alignItems: "center",
        }}
      >
        <Link className="order-result-back-to-cart" to={config.routes.cart}>
          <ArrowBackIosNewIcon className="order-result-back-to-cart-icon" />
          Quay về giỏ hàng
        </Link>
        <Button color="primary" variant="contained" onClick={onCheckout}>
          ĐẶT HÀNG
        </Button>
      </Box>
    </Box>
  );
};

const Coupon = ({ setCoupon }) => {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  const user = useSelector((state) => state.auth.currentUser);

  const dispatch = useDispatch();

  async function handleCheck() {
    try {
      const data = await configAxiosAll(user, dispatch).get(
        `${API_USER_COUPON_URL}?code=${code}`
      );
      if (data && data.length > 0) {
        setCoupon(data[0].coupon);
        setMsg({ type: "", text: "Mã giảm giá hợp lệ" });
      } else {
        setMsg({ type: "error", text: "Mã giảm giá không hợp lệ" });
      }
    } catch (error) {}
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
          paddingInline: "2px",
        }}
      >
        <FormControl>
          <TextField
            value={code}
            size="small"
            onChange={(e) => setCode(e.target.value)}
            placeholder="Nhập mã giảm giá"
          />
        </FormControl>
        <Button variant="outlined" size="small" onClick={handleCheck}>
          Sử dụng
        </Button>
      </Box>
      {code !== "" && msg.text !== "" && (
        <span
          style={{
            paddingInline: "2px",
            fontSize: 10,
            color: msg.type === "error" ? "var(--error-color)" : "inherit",
          }}
        >
          {msg.text}
        </span>
      )}
    </>
  );
};

const Item = ({ leftLabel, rightLabel, isLast }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "8px",
        paddingInline: "2px",
        fontSize: isLast ? "16px" : "14px",
      }}
    >
      <div
        style={{
          flex: "1",
        }}
      >
        {leftLabel}
      </div>
      <div
        style={{
          flex: "1",
          textAlign: "right",
          fontSize: isLast ? "18px" : "inherit",
          color: isLast ? "var(--main-color)" : "#000",
        }}
      >
        {rightLabel}
      </div>
    </Box>
  );
};

export default memo(Result);
