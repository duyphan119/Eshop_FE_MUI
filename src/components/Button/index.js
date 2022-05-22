import { Button } from "@mui/material";
import { Link } from "react-router-dom";
export function isShowLoadMore(obj, limit, onClick) {
  if (obj && obj.items && obj.items.length > 0) {
    if (obj.items.length >= limit && obj.total_page > 1) {
      return (
        <Button variant="contained" onClick={onClick}>
          Xem thêm
        </Button>
      );
    }
  }
  return <></>;
}

export function isShowCollapse(obj, limit, onClick) {
  if (obj && obj.items && obj.items.length > 0) {
    if (obj.total_page === 1 && obj.items.length > limit) {
      return (
        <Button variant="contained" onClick={onClick}>
          Thu gọn
        </Button>
      );
    }
  }
  return <></>;
}
export const ButtonLink = ({ link, label }) => {
  return (
    <Link to={link}>
      <Button variant="contained">{label} </Button>
    </Link>
  );
};
