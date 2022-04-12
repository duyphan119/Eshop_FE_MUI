import { Link } from "react-router-dom";
import Slider from "../slider/Slider";
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
  return (
    <Slider autoplay={{
      delay: 2345,
      pauseOnMouseEnter: false,
      waitForTransition: true,
      disableOnInteraction: false
    }} numPreview={1}>
      {banners.map((item, index) => {
        return (
          <Link to={item.to} className="banner-slider__item-link" style={{
            width: "100vw"
          }} key={index}>
            <img style={{
              width: "100%",
              maxHeight: '470px',
              objectFit: 'cover',
            }} src={item.src} alt="" />
          </Link>
        );
      })}
    </Slider>
  );
};

export default BannerSlider;