import React, { useRef, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import CheckBox from "../custom/CheckBox";
import "./productfilter.scss";
const ProductsFilter = ({ filters, setFilters }) => {
  const color = useRef();
  const [menuColors, setMenuColors] = useState({
    colors: [
      {
        color: "Đỏ",
        colorCode: "red",
      },
      {
        color: "Xanh dương",
        colorCode: "blue",
      },
      {
        color: "Xanh lá cây",
        colorCode: "green",
      },
      {
        color: "Trắng",
        colorCode: "white",
      },
    ],
    isShowing: true,
  });
  const [menuSizes, setMenuSizes] = useState({
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    isShowing: true,
  });
  const [menuRangePrices, setMenuRangePrices] = useState({
    rangePrices: [
      { text: "Nhỏ hơn 100,000đ", value: ";999000" },
      {
        text: "Từ 100,000đ - 250,000đ",
        value: "100000;249000",
      },
      {
        text: "Từ 250,000đ - 500,000đ",
        value: "250000;500000",
      },
    ],
    isShowing: true,
  });
  const handleMouseEnter = (target, _color) => {
    color.current = target;
    target.style.border = "1px solid " + _color;
  };
  const handleMouseLeave = () => {
    color.current.style.border = "1px solid rgb(245, 245, 245)";
  };
  const handleFilter = (name, value) => {
    let _filters = [...filters];
    let index1 = _filters.findIndex((item1) => item1.name === name);
    if (index1 !== -1) {
      let index2 = _filters[index1].values.findIndex(
        (item2) => item2 === value
      );
      if (index2 === -1) _filters[index1].values.push(value);
      else _filters[index1].values.splice(index2, 1);

      setFilters(_filters);
    }
  };
  const showColors = () => {
    return menuColors.colors.map((item) => {
      return (
        <div
          className={`products-filter__menu-color products-filter__menu-item ${
            filters
              .find((it) => it.name === "color")
              .values.findIndex((x) => x === item.color) !== -1
              ? "active"
              : ""
          }`}
          key={item.color + item.colorCode}
          ref={color}
          onMouseEnter={(e) => handleMouseEnter(e.target, item.colorCode)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleFilter("color", item.color)}
        >
          <span
            style={{
              backgroundColor: item.colorCode,
            }}
          ></span>
          {item.color}
        </div>
      );
    });
  };

  const showSizes = () => {
    return menuSizes.sizes.map((item) => {
      return (
        <div
          className={`products-filter__menu-size products-filter__menu-item ${
            filters
              .find((it) => it.name === "size")
              .values.findIndex((x) => x === item) !== -1
              ? "active"
              : ""
          }`}
          key={item}
          onClick={() => handleFilter("size", item)}
        >
          {item}
        </div>
      );
    });
  };
  const showRangePrices = () => {
    return menuRangePrices.rangePrices.map((item, index) => {
      return (
        <div
          key={item.text}
          className="products-filter__menu-item products-filter__menu-range-range-price"
        >
          <CheckBox
            fields={{ name: "rangePrices", id: "rangePrices" + index }}
            label={item.text}
            onChange={() => handleFilter("newPrice", item.value)}
          />
        </div>
      );
    });
  };

  return (
    <Col xs={3} className="products-filter">
      <div className="products-filter__menu">
        <div
          className="products-filter__menu-title"
          onClick={() =>
            setMenuColors((prev) => {
              return {
                ...prev,
                isShowing: !prev.isShowing,
              };
            })
          }
        >
          <div className="products-filter__menu-text">Màu sắc</div>
          <div className="products-filter__menu-append">
            {menuColors.isShowing ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
        {menuColors.isShowing && (
          <div className="products-filter__menu-items products-filter__menu-colors">
            {showColors()}
          </div>
        )}
      </div>
      <div className="products-filter__menu">
        <div
          className="products-filter__menu-title"
          onClick={() =>
            setMenuSizes((prev) => {
              return {
                ...prev,
                isShowing: !prev.isShowing,
              };
            })
          }
        >
          <div className="products-filter__menu-text">Kích thước</div>
          <div className="products-filter__menu-append">
            {menuSizes.isShowing ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
        {menuSizes.isShowing && (
          <div className="products-filter__menu-items products-filter__menu-sizes">
            {showSizes()}
          </div>
        )}
      </div>
      <div className="products-filter__menu">
        <div
          className="products-filter__menu-title"
          onClick={() =>
            setMenuRangePrices((prev) => {
              return {
                ...prev,
                isShowing: !prev.isShowing,
              };
            })
          }
        >
          <div className="products-filter__menu-text">Khoảng giá (VNĐ)</div>
          <div className="products-filter__menu-append">
            {menuRangePrices.isShowing ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </div>
        {menuRangePrices.isShowing && (
          <div className="products-filter__menu-items products-filter__menu-range-range-prices">
            {showRangePrices()}
          </div>
        )}
      </div>
    </Col>
  );
};

export default ProductsFilter;
