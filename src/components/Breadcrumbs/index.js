import { Link } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
const _Breadcrumbs = ({ items, sx }) => {
  return (
    <Breadcrumbs sx={sx} fontSize="14px">
      {items.map((item, index) =>
        item.to ? (
          <Link to={item.to} key={index} className="hover-color-main-color">
            {item.text}
          </Link>
        ) : (
          <>{item.text}</>
        )
      )}
    </Breadcrumbs>
  );
};

export default _Breadcrumbs;
