import React, { useRef, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import CheckBox from "../custom/CheckBox";
import "./productfilter.scss";
const ProductsFilter = () => {
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
    ],
    isShowing: true,
  });
  const [menuSizes, setMenuSizes] = useState({
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
    isShowing: true,
  });
  const [menuRangePrices, setMenuRangePrices] = useState({
    rangePrices: [
      { text: "Nhỏ hơn 100,000đ", min: null, max: 100000 },
      {
        text: "Từ 100,000đ - 300,000đ",
        min: 100000,
        max: 300000,
      },
      {
        text: "Từ 300,000đ - 500,000đ",
        min: 300000,
        max: 500000,
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
  const handleShowColors = () => {
    return menuColors.colors.map((item) => {
      return (
        <div
          className="products-filter__menu-color products-filter__menu-item"
          key={item.color + item.colorCode}
          ref={color}
          onMouseEnter={(e) => handleMouseEnter(e.target, item.colorCode)}
          onMouseLeave={handleMouseLeave}
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
  const handleShowSizes = () => {
    return menuSizes.sizes.map((item) => {
      return (
        <div
          className="products-filter__menu-size products-filter__menu-item"
          key={item}
        >
          {item}
        </div>
      );
    });
  };
  const handleShowRangePrices = () => {
    return menuRangePrices.rangePrices.map((item, index) => {
      return (
        <div
          key={item.text}
          className="products-filter__menu-item products-filter__menu-range-range-price"
        >
          <CheckBox
            fields={{ name: "rangePrices", id: "rangePrices" + index }}
            label={item.text}
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
            {handleShowColors()}
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
            {handleShowSizes()}
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
            {handleShowRangePrices()}
          </div>
        )}
      </div>
    </Col>
  );
};

export default ProductsFilter;
