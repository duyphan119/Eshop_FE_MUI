import { Link } from "react-router-dom";
import { Typography, Breadcrumbs } from "@mui/material";
const _Breadcrumbs = ({ items, text }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" fontSize="14px">
      {items.map((item, index) => (
        <Link to={item.to} key={index}>
          {item.text}
        </Link>
      ))}
      <Typography fontSize="14px" color="var(--main-color)">
        {text}
      </Typography>
    </Breadcrumbs>
  );
};

export default _Breadcrumbs;
