import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import { Badge, Box, Button, Typography } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useState } from "react";
import filter_icon from "../../assets/svg/svgexport-8.svg";
const Filter = ({
  filters,
  setFilters,
  colorFilters,
  sizeFilters,
  materialFilters,
}) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1000000);

  const [open, setOpen] = useState(false);

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
      newFilters.color = newFilters.color.filter((el) => el !== item);
    } else {
      // Chọn
      const index = newFilters.color.findIndex((el) => el === item);
      if (index === -1) {
        newFilters.color.push(item);
      } else {
        newFilters.color = newFilters.color.filter((el) => el !== item);
      }
    }
    setFilters({ ...newFilters });
  };

  // Lọc theo chất liệu
  const handleSelectMaterialFilter = (item, isActive) => {
    let newFilters = { ...filters };
    if (isActive) {
      // Bỏ chọn
      newFilters.material = newFilters.material.filter((el) => el !== item);
    } else {
      // Chọn
      const index = newFilters.material.findIndex((el) => el === item);
      if (index === -1) {
        newFilters.material.push(item);
      } else {
        newFilters.material = newFilters.material.filter((el) => el !== item);
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
    if (filters.material.length > 0) result += filters.material.length;
    if (filters.price.length > 0) result += 1;
    return result;
  };
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="filter-product">
        <Badge
          badgeContent={countSelectedFilters()}
          color="info"
          onClick={() => setOpen(!open)}
        >
          <img
            alt=""
            src={filter_icon}
            width="20px"
            height="20px"
            style={{ transform: "translateY(2px)", marginRight: "4px" }}
          />
          Lọc
        </Badge>
        {open && (
          <Box className="filter-product-box custom-scrollbar">
            <div
              className="filter-product-close"
              onClick={() => setOpen(false)}
            >
              <ClearOutlinedIcon />
            </div>
            {(filters.color.length !== 0 ||
              filters.size.length !== 0 ||
              filters.material.length !== 0 ||
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
                      {`Từ ${filters.price[0]} ₫ - ${filters.price[1]} ₫`}
                      <ClearOutlinedIcon />
                    </li>
                  )}
                  {filters.material.map((item, index) => {
                    return (
                      <li
                        key={Math.random()}
                        onClick={() => handleSelectMaterialFilter(item, true)}
                      >
                        {item} <ClearOutlinedIcon />
                      </li>
                    );
                  })}
                  {filters.color.map((item, index) => {
                    return (
                      <li
                        key={Math.random()}
                        onClick={() => handleSelectColorFilter(item, true)}
                      >
                        {item} <ClearOutlinedIcon />
                      </li>
                    );
                  })}
                  {filters.size.map((item, index) => {
                    return (
                      <li
                        key={Math.random()}
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
              Chát liệu
            </Typography>
            <ul className="filter-product-material">
              {materialFilters.map((item) => {
                let isActive = filters.material.find((el) => el === item);
                return (
                  <li
                    key={Math.random()}
                    className={`${isActive ? "active" : ""}`}
                    onClick={() => handleSelectMaterialFilter(item, isActive)}
                  >
                    {item}
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
              Màu sắc
            </Typography>
            <ul className="filter-product-color">
              {colorFilters.map((item) => {
                let isActive = filters.color.find((el) => el === item);
                return (
                  <li
                    key={Math.random()}
                    className={`${isActive ? "active" : ""}`}
                    onClick={() => handleSelectColorFilter(item, isActive)}
                  >
                    {item}
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
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Filter;
