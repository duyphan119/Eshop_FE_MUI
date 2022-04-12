import React from "react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./slider.scss";

const Slider = ({
  children,
  numPreview,
  autoplay,
  spaceItems,
  breakpoints,
}) => {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={spaceItems ? spaceItems : 0}
      slidesPerView={numPreview ? numPreview : 1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(_swiper) => {}}
      onSlideChange={() => {}}
      autoplay={autoplay}
      breakpoints={breakpoints}
    >
      {React.Children.map(children, (child) => {
        return <SwiperSlide>{child}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default Slider;
