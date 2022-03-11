import React, { useRef, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
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
    </Col>
  );
};

export default ProductsFilter;
