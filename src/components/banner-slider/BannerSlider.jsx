import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./banner-slider.scss";
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
  const [indexBanner, setIndexBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndexBanner((prev) => {
        if (prev + 1 === banners.length) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="banner-slider">
      <div
        className="banner-slider__wrapper"
        style={{
          transform: `translateX(-${indexBanner * 100}vw)`,
        }}
      >
        <div className="banner-slider__list">
          {banners.map((item, index) => {
            return (
              <div className="banner-slider__item" key={index}>
                <Link to={item.to} className="banner-slider__item-link">
                  <img src={item.src} alt="" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <ul className="banner-slider__dots">
        {banners.map((item, index) => {
          return (
            <li
              className={`banner-slider__dot ${
                index === indexBanner ? "active" : ""
              }`}
              key={index}
              onClick={() => setIndexBanner(index)}
            ></li>
          );
        })}
      </ul>
    </div>
  );
};

export default BannerSlider;
