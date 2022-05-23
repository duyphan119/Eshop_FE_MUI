import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";
const banners = [
  {
    src: "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/slider_1.jpg?1647343206623",
    to: "/",
  },
  {
    src: "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/slider_2.jpg?1646486842767",
    to: "/",
  },
  {
    src: "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/slider_3.jpg?1646486842767",
    to: "/",
  },
  {
    src: "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/slider_4.jpg?1646486842767",
    to: "/",
  },
  {
    src: "https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/slider_5.jpg?1646486842767",
    to: "/",
  },
];
const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    autoplay: true,
    arrows: false,
  };
  return (
    <Slider {...settings}>
      {banners.map((item, index) => {
        return (
          <Link to={`/`} key={index}>
            <img
              src={item.src}
              alt=""
              style={{
                objectFit: "cover",
                width: "100%",
                height: "470px",
                position: "relative",
                cursor: "grab",
              }}
            />
          </Link>
        );
      })}
    </Slider>
  );
};

export default BannerSlider;
