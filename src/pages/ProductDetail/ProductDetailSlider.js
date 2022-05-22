import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const ProductDetailSlider = ({ images }) => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    speed: 500,
    slidesToScroll: 1,
    dotsClass: "dots-slider-slick",
    draggable: true,
    arrows: true,
  };
  return (
    <Slider {...settings}>
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
