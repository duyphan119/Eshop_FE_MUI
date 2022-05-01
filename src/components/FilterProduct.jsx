import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Badge, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import "./styles/filter_product.css";
const colorFilters = [
  {
    color: "Đỏ",
    color_code: "red",
  },
  {
    color: "Xanh dương",
    color_code: "blue",
  },
  {
    color: "Xanh lá cây",
    color_code: "green",
  },
  {
    color: "Trắng",
    color_code: "white",
  },
  {
    color: "Đen",
    color_code: "black",
  },
  {
    color: "Tím",
    color_code: "purple",
  },
];
const sizeFilters = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const FilterProduct = ({ filters, setFilters }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000000);

  // Lọc theo giá
  const handleSelectPriceFilter = (min, max) => {
    let newFilters = { ...filters };

    newFilters.price = [min, max];
    setFilters(newFilters);
  };

  // Huỷ lọc theo giá
  const handleDeselectPriceFilter = () => {
    let newFilters = { ...filters };
    newFilters.price = [];
    setFilters(newFilters);
  };

  // Lọc theo màu sắc
  const handleSelectColorFilter = (item, isActive) => {
    let newFilters = { ...filters };
    if (isActive) {
      // Bỏ chọn
      newFilters.color = newFilters.color.filter(
        (el) => el.color !== item.color
      );
    } else {
      // Chọn
      const index = newFilters.color.findIndex((el) => el.color === item.color);
      if (index === -1) {
        newFilters.color.push(item);
      } else {
        newFilters.color = newFilters.color.filter(
          (el) => el.color !== item.color
        );
      }
    }
    setFilters({ ...newFilters });
  };

  // Lọc theo kích cỡ
  const handleSelectSizeFilter = (item, isActive) => {
    let newFilters = { ...filters };
    if (isActive) {
      // Bỏ chọn
      newFilters.size = newFilters.size.filter((el) => el !== item);
    } else {
      // Chọn
      newFilters.size.push(item);
    }
    setFilters({ ...newFilters });
  };

  // Tính số lượng lọc
  const countSelectedFilters = () => {
    let result = 0;
    if (filters.size.length > 0) result += filters.size.length;
    if (filters.color.length > 0) result += filters.color.length;
    if (filters.price.length > 0) result += 1;
    return result;
  };
  return (
    <div className="filter-product">
      <label
        htmlFor="filter-product"
        style={{
          cursor: "pointer",
        }}
      >
        <Badge badgeContent={countSelectedFilters()} color="info">
          <FilterAltOutlinedIcon />
          Lọc
        </Badge>
      </label>
      <input id="filter-product" type="checkbox" hidden />
      <Box
        className="filter-product-box"
        sx={{
          cursor: "default",
        }}
      >
        <label htmlFor="filter-product" className="filter-product-close">
          <ClearOutlinedIcon />
        </label>
        {(filters.color.length !== 0 ||
          filters.size.length !== 0 ||
          filters.price.length !== 0) && (
          <>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              Đã chọn:
            </Typography>
            <ul className="filter-product-result-selected">
              {filters.price.length > 1 && (
                <li onClick={handleDeselectPriceFilter}>
                  {`Từ ${filters.price[0]}đ - ${filters.price[1]}đ`}
                  <ClearOutlinedIcon />
                </li>
              )}
              {filters.color.map((item) => {
                return (
                  <li
                    key={Math.random() + item}
                    onClick={() => handleSelectColorFilter(item, true)}
                  >
                    {item.color} <ClearOutlinedIcon />
                  </li>
                );
              })}
              {filters.size.map((item) => {
                return (
                  <li
                    key={Math.random() + item}
                    onClick={() => handleSelectSizeFilter(item, true)}
                  >
                    {item} <ClearOutlinedIcon />
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <Typography
          variant="body2"
          sx={{
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          Giá
        </Typography>
        <div className="filter-product-price">
          <form>
            <input
              type="number"
              value={min}
              min={0}
              onChange={(e) => setMin(parseInt(e.target.value))}
              onBlur={(e) => {
                if (parseInt(e.target.value) !== min.current)
                  handleSelectPriceFilter(parseInt(e.target.value), max);
              }}
            />
            <input
              type="number"
              min={min}
              value={max}
              onChange={(e) => setMax(parseInt(e.target.value))}
              onBlur={(e) =>
                handleSelectPriceFilter(min, parseInt(e.target.value))
              }
            />
          </form>
        </div>
        <Typography
          variant="body2"
          sx={{
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          Màu sắc
        </Typography>
        <ul className="filter-product-color">
          {colorFilters.map((item) => {
            let isActive = filters.color.find((el) => el.color === item.color);
            return (
              <li
                key={Math.random() + item.color}
                className={`${isActive ? "active" : ""}`}
                onClick={() => handleSelectColorFilter(item, isActive)}
              >
                <div
                  className="filter-product-color-preview"
                  style={{
                    backgroundColor: `${item.color_code}`,
                  }}
                ></div>
                {item.color}
              </li>
            );
          })}
        </ul>
        <Typography
          variant="body2"
          sx={{
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          Kích cỡ
        </Typography>
        <ul className="filter-product-size">
          {sizeFilters.map((item) => {
            let isActive = filters.size.find((el) => el === item);
            return (
              <li
                key={Math.random() + item}
                className={`${isActive ? "active" : ""}`}
                onClick={() => handleSelectSizeFilter(item, isActive)}
              >
                {item}
              </li>
            );
          })}
        </ul>
        <div className="filter-product-actions">
          <Button
            variant="outlined"
            sx={{
              marginRight: "4px",
            }}
            onClick={() => setFilters({ color: [], size: [], price: [] })}
          >
            Xoá lọc
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default FilterProduct;
