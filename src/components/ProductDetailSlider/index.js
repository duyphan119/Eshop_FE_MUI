import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./product_detail_slider.css";
const ProductDetailSlider = ({ images }) => {
  const _settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    arrows: true,
  };
  return (
    <Slider {..._settings}>
      {images.map((item, index) => {
        return (
          <img
            key={index}
            src={item.url}
            alt=""
            style={{
              objectFit: "cover",
              width: "100%",
              height: "680px",
              position: "relative",
            }}
          />
        );
      })}
    </Slider>
  );
};

export default ProductDetailSlider;
