import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyFavorite from "../../components/EmptyFavorite";
import FavoriteItem from "../../components/FavoriteItem";
import { TitleAccount } from "../../components/Title";
import { API_PRODUCT_URL, LIMIT_WISHLIST } from "../../constants";
import pageHeaderImg from "../../assets/imgs/search/bg-page-header.webp";
import Breadcrumbs from "../../components/Breadcrumbs";
import Product from "../../components/Product";
import config from "../../config";

const Favorite = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const products = useSelector((state) => state.product.list);

  const [limit, setLimit] = useState(LIMIT_WISHLIST);

  useEffect(() => {
    document.title = "Sản phẩm yêu thích";
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${pageHeaderImg})`,
          width: "100%",
          height: 260,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          paddingInline: 32,
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 8 }}>Sản phẩm yêu thích</div>
        <Box pl={2}>
          <Breadcrumbs
            sx={{ fontSize: 10 }}
            items={[
              {
                text: "TRANG CHỦ",
                to: config.routes.home,
              },
              {
                text: "SẢN PHẨM YÊU THÍCH",
              },
            ]}
          />
        </Box>
      </div>
      <Box mt={4}>
        <Grid container spacing={4} px={4}>
          {wishlist.map((product) => {
            return (
              <Grid key={product.slug} item xs={6} sm={4} md={3} mb={2}>
                <Product key={product.slug} product={product} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
    // <>
    //   <TitleAccount
    //     leftLabel="Sản phẩm yêu thích"
    //     rightLabel={`${wishlist.length} sản phẩm`}
    //   />
    //   <Box>
    //     {wishlist.length === 0 && <EmptyFavorite />}
    //     <Box p={1}>
    //       {[...wishlist].splice(0, limit).map((item, index) => (
    //         <FavoriteItem key={index} item={item} />
    //       ))}
    //     </Box>
    //   </Box>
    //   {wishlist.length > LIMIT_WISHLIST && (
    //     <Box display="flex" alignItems="center" justifyContent="center">
    //       <Button
    //         variant="contained"
    //         size="small"
    //         onClick={() => {
    //           if (wishlist.length <= limit) {
    //             setLimit(LIMIT_WISHLIST);
    //           } else {
    //             setLimit(limit + LIMIT_WISHLIST);
    //           }
    //         }}
    //       >
    //         {wishlist.length <= limit ? "Thu gọn" : "Xem thêm"}
    //       </Button>
    //     </Box>
    //   )}
    // </>
  );
};

export default Favorite;
