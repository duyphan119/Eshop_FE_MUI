import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyFavorite from "../../components/EmptyFavorite";
import FavoriteItem from "../../components/FavoriteItem";
import { TitleAccount } from "../../components/Title";
import { LIMIT_WISHLIST } from "../../constants";

const Favorite = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [limit, setLimit] = useState(LIMIT_WISHLIST);

  useEffect(() => {
    document.title = "Sản phẩm yêu thích";
  }, []);

  return (
    <>
      <TitleAccount
        leftLabel="Sản phẩm yêu thích"
        rightLabel={`${wishlist.length} sản phẩm`}
      />
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
