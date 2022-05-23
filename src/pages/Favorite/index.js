import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyFavorite from "../../components/EmptyFavorite";
import FavoriteItem from "../../components/FavoriteItem";
import { LIMIT_WISHLIST } from "../../constants";

const Favorite = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [limit, setLimit] = useState(LIMIT_WISHLIST);

  useEffect(() => {
    document.title = "Sản phẩm yêu thích";
  }, []);

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        borderBottom="1px solid black"
      >
        <Typography color="var(--main-color)">Sản phẩm yêu thích</Typography>
        <Typography>{wishlist.length} sản phẩm</Typography>
      </Box>
      <Box>
        {wishlist.length === 0 && <EmptyFavorite />}
        <Box p={1}>
          {[...wishlist].splice(0, limit).map((item, index) => (
            <FavoriteItem key={index} item={item} />
          ))}
        </Box>
      </Box>
      {wishlist.length > LIMIT_WISHLIST && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              if (wishlist.length <= limit) {
                setLimit(LIMIT_WISHLIST);
              } else {
                setLimit(limit + LIMIT_WISHLIST);
              }
            }}
          >
            {wishlist.length <= limit ? "Thu gọn" : "Xem thêm"}
          </Button>
        </Box>
      )}
    </>
  );
};

export default Favorite;
