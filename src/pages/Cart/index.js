import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyCart from "../../components/EmptyCart";
import { TitlePage } from "../../components/Title";
import { getSelectedCartItems } from "../../redux/cartSlice";
import CartItem from "./CartItem";
import CartResult from "./CartResult";
import "./Cart.css";
const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);

  return (
    <Box px={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }} colSpan={2}>
              SẢN PHẨM
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>GIÁ</TableCell>
            <TableCell sx={{ textAlign: "center" }}>SỐ LƯỢNG</TableCell>
            <TableCell sx={{ textAlign: "center" }}>TỔNG</TableCell>
            <TableCell sx={{ textAlign: "center", width: 50 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.items.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
        </TableBody>
      </Table>
      <CartResult />
    </Box>
    // <Box sx={{ minHeight: "100%", paddingBlock: "20px" }}>

    //   {!cart || cart.items.length === 0 ? (
    //     <EmptyCart />
    //   ) : (
    //     <Container>
    //       <Grid container spacing={2}>
    //         <Grid item xs={12}>
    //           <TitlePage>Giỏ hàng</TitlePage>
    //         </Grid>
    //       </Grid>
    //       <Grid container spacing={2} className="cart-header-container">
    //         <Grid item xs={6} className="cart-header cart-total-item">
    //           {cart.count} Sản phẩm
    //         </Grid>
    //         <Grid
    //           item
    //           xs={6}
    //           sx={{
    //             textAlign: "right",
    //           }}
    //         >
    //           <Link
    //             to={`/`}
    //             className="cart-header cart-continue-shopping-link"
    //           >
    //             Tiếp tục mua hàng
    //           </Link>
    //         </Grid>
    //       </Grid>
    //       <Grid container columnSpacing={2}>
    //         <Grid item xs={12}>
    //           <Grid
    //             container
    //             sx={{
    //               display: {
    //                 lg: "flex",
    //                 xs: "none",
    //               },
    //             }}
    //           >
    //             <Grid item className="cart-checkout" lg={7}>
    //               <FormControlLabel
    //                 control={
    //                   <Checkbox
    //                     checked={
    //                       cart.items.length === selectedCartItems.items.length
    //                     }
    //                     onChange={handleChange}
    //                   />
    //                 }
    //               />
    //               Mặt hàng
    //             </Grid>
    //             <Grid item className="cart-checkout-quantity" lg={2}>
    //               Số lượng
    //             </Grid>
    //             <Grid item className="cart-checkout-total-price" lg={2}>
    //               Tổng tiền
    //             </Grid>
    //             <Grid item className="cart-checkout-actions" lg={1}></Grid>
    //           </Grid>
    //           {cart.items.map((item) => {
    //             return (
    //               <CartItem
    //                 key={item.id}
    //                 checked={
    //                   selectedCartItems.items.findIndex(
    //                     (el) => el.id === item.id
    //                   ) !== -1
    //                 }
    //                 item={item}
    //               />
    //             );
    //           })}
    //         </Grid>
    //         <CartResult />
    //       </Grid>
    //     </Container>
    //   )}
    // </Box>
  );
};

export default Cart;
